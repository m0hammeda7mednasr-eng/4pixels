const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { auth, adminAuth } = require('../middleware/auth');

// Shopify OAuth Configuration
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_SCOPES = 'read_products,write_products,read_orders,write_orders,read_customers';
const REDIRECT_URI = process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:5000/api/shopify/callback';

// Store file path
const STORES_FILE = path.join(__dirname, '../data/shopify-stores.json');

// Helper: Read stores from file
const readStores = async () => {
  try {
    const data = await fs.readFile(STORES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper: Write stores to file
const writeStores = async (stores) => {
  await fs.writeFile(STORES_FILE, JSON.stringify(stores, null, 2));
};

// Helper: Generate nonce for security
const generateNonce = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Helper: Verify HMAC
const verifyHmac = (query) => {
  const { hmac, ...params } = query;
  const message = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const generatedHash = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex');

  return generatedHash === hmac;
};

// @route   GET /api/shopify/auth
// @desc    Initiate Shopify OAuth
// @access  Public
router.get('/auth', (req, res) => {
  const { shop } = req.query;

  if (!shop) {
    return res.status(400).json({ error: 'Shop parameter is required' });
  }

  // Validate shop domain
  const shopRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/;
  if (!shopRegex.test(shop)) {
    return res.status(400).json({ error: 'Invalid shop domain' });
  }

  const nonce = generateNonce();
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${REDIRECT_URI}&state=${nonce}`;

  // Store nonce in session or temporary storage (for production, use Redis or database)
  // For now, we'll pass it through the state parameter
  res.json({ installUrl, nonce });
});

// @route   GET /api/shopify/callback
// @desc    Shopify OAuth callback
// @access  Public
router.get('/callback', async (req, res) => {
  const { code, hmac, shop, state } = req.query;

  // Verify HMAC
  if (!verifyHmac(req.query)) {
    return res.status(400).send('HMAC validation failed');
  }

  try {
    // Exchange code for access token
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code
    });

    const { access_token } = response.data;

    // Get shop info
    const shopInfoResponse = await axios.get(`https://${shop}/admin/api/2024-01/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': access_token
      }
    });

    const shopInfo = shopInfoResponse.data.shop;

    // Save store info
    const stores = await readStores();
    const existingStoreIndex = stores.findIndex(s => s.shop === shop);

    const storeData = {
      shop,
      accessToken: access_token,
      shopInfo: {
        name: shopInfo.name,
        email: shopInfo.email,
        domain: shopInfo.domain,
        currency: shopInfo.currency,
        timezone: shopInfo.timezone
      },
      connectedAt: new Date().toISOString(),
      isActive: true
    };

    if (existingStoreIndex >= 0) {
      stores[existingStoreIndex] = storeData;
    } else {
      stores.push(storeData);
    }

    await writeStores(stores);

    // Redirect to success page
    res.redirect(`${process.env.CLIENT_URL}/admin/shopify/success?shop=${shop}`);
  } catch (error) {
    console.error('Shopify OAuth error:', error.response?.data || error.message);
    res.redirect(`${process.env.CLIENT_URL}/admin/shopify/error`);
  }
});

// @route   GET /api/shopify/stores
// @desc    Get all connected stores
// @access  Private (Admin only)
router.get('/stores', auth, adminAuth, async (req, res) => {
  try {
    const stores = await readStores();
    // Don't send access tokens to client
    const sanitizedStores = stores.map(({ accessToken, ...store }) => store);
    res.json(sanitizedStores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stores' });
  }
});

// @route   DELETE /api/shopify/stores/:shop
// @desc    Disconnect a store
// @access  Private (Admin only)
router.delete('/stores/:shop', auth, adminAuth, async (req, res) => {
  try {
    const { shop } = req.params;
    const stores = await readStores();
    const filteredStores = stores.filter(s => s.shop !== shop);
    await writeStores(filteredStores);
    res.json({ message: 'Store disconnected successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to disconnect store' });
  }
});

// @route   GET /api/shopify/products/:shop
// @desc    Get products from a specific store
// @access  Private (add auth middleware in production)
router.get('/products/:shop', async (req, res) => {
  try {
    const { shop } = req.params;
    const stores = await readStores();
    const store = stores.find(s => s.shop === shop);

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const response = await axios.get(`https://${shop}/admin/api/2024-01/products.json`, {
      headers: {
        'X-Shopify-Access-Token': store.accessToken
      }
    });

    res.json(response.data.products);
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// @route   GET /api/shopify/orders/:shop
// @desc    Get orders from a specific store
// @access  Private (add auth middleware in production)
router.get('/orders/:shop', async (req, res) => {
  try {
    const { shop } = req.params;
    const stores = await readStores();
    const store = stores.find(s => s.shop === shop);

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const response = await axios.get(`https://${shop}/admin/api/2024-01/orders.json`, {
      headers: {
        'X-Shopify-Access-Token': store.accessToken
      },
      params: {
        status: 'any',
        limit: 50
      }
    });

    res.json(response.data.orders);
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
