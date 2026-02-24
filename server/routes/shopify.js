const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const SHOPIFY_SCOPES = 'read_products,write_products,read_orders,write_orders,read_customers';
const REDIRECT_URI = process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:5001/api/shopify/callback';
const CLIENT_URL = process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:3000';
const SHOP_REGEX = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/i;
const STORES_FILE = path.join(__dirname, '../data/shopify-stores.json');

const ensureShopifyConfigured = (_req, res, next) => {
  if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET) {
    return res.status(503).json({ error: 'Shopify integration is not configured' });
  }

  return next();
};

const normalizeShop = (shop) => String(shop || '').trim().toLowerCase();

const isValidShop = (shop) => SHOP_REGEX.test(normalizeShop(shop));

const readStores = async () => {
  try {
    const data = await fs.readFile(STORES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (_error) {
    return [];
  }
};

const writeStores = async (stores) => {
  await fs.writeFile(STORES_FILE, JSON.stringify(stores, null, 2), 'utf8');
};

const generateNonce = () => {
  return crypto.randomBytes(16).toString('hex');
};

const verifyHmac = (query) => {
  const { hmac, ...params } = query;
  if (!hmac || typeof hmac !== 'string' || !SHOPIFY_API_SECRET) {
    return false;
  }

  const message = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  const generatedHash = crypto
    .createHmac('sha256', SHOPIFY_API_SECRET)
    .update(message)
    .digest('hex');

  const generatedBuffer = Buffer.from(generatedHash, 'utf8');
  const providedBuffer = Buffer.from(hmac, 'utf8');

  if (generatedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(generatedBuffer, providedBuffer);
};

// Initiate Shopify OAuth (Admin only)
router.get('/auth', auth, adminAuth, ensureShopifyConfigured, (req, res) => {
  const shop = normalizeShop(req.query.shop);

  if (!shop) {
    return res.status(400).json({ error: 'Shop parameter is required' });
  }

  if (!isValidShop(shop)) {
    return res.status(400).json({ error: 'Invalid shop domain' });
  }

  const nonce = generateNonce();
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=${nonce}`;

  return res.json({ installUrl, nonce });
});

// Shopify OAuth callback
router.get('/callback', ensureShopifyConfigured, async (req, res) => {
  const code = String(req.query.code || '');
  const hmac = String(req.query.hmac || '');
  const shop = normalizeShop(req.query.shop);
  const state = String(req.query.state || '');

  if (!code || !hmac || !shop || !state) {
    return res.status(400).send('Missing required OAuth parameters');
  }

  if (!isValidShop(shop)) {
    return res.status(400).send('Invalid shop domain');
  }

  if (!verifyHmac(req.query)) {
    return res.status(400).send('HMAC validation failed');
  }

  try {
    const tokenResponse = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code
    });

    const accessToken = tokenResponse.data.access_token;

    const shopInfoResponse = await axios.get(`https://${shop}/admin/api/2024-01/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken
      }
    });

    const shopInfo = shopInfoResponse.data.shop;
    const stores = await readStores();
    const existingStoreIndex = stores.findIndex((store) => store.shop === shop);

    const storeData = {
      shop,
      accessToken,
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

    return res.redirect(`${CLIENT_URL}/admin/shopify/success?shop=${encodeURIComponent(shop)}`);
  } catch (error) {
    console.error('Shopify OAuth error:', error.response?.data || error.message);
    return res.redirect(`${CLIENT_URL}/admin/shopify?status=error`);
  }
});

// Get all connected stores (Admin only)
router.get('/stores', auth, adminAuth, async (_req, res) => {
  try {
    const stores = await readStores();
    const sanitizedStores = stores.map(({ accessToken, ...store }) => store);
    return res.json(sanitizedStores);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch stores' });
  }
});

// Disconnect a store (Admin only)
router.delete('/stores/:shop', auth, adminAuth, async (req, res) => {
  const shop = normalizeShop(req.params.shop);
  if (!isValidShop(shop)) {
    return res.status(400).json({ error: 'Invalid shop domain' });
  }

  try {
    const stores = await readStores();
    const filteredStores = stores.filter((store) => store.shop !== shop);
    await writeStores(filteredStores);
    return res.json({ message: 'Store disconnected successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to disconnect store' });
  }
});

// Get products from a store (Admin only)
router.get('/products/:shop', auth, adminAuth, async (req, res) => {
  const shop = normalizeShop(req.params.shop);
  if (!isValidShop(shop)) {
    return res.status(400).json({ error: 'Invalid shop domain' });
  }

  try {
    const stores = await readStores();
    const store = stores.find((item) => item.shop === shop);

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const response = await axios.get(`https://${shop}/admin/api/2024-01/products.json`, {
      headers: {
        'X-Shopify-Access-Token': store.accessToken
      }
    });

    return res.json(response.data.products);
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get orders from a store (Admin only)
router.get('/orders/:shop', auth, adminAuth, async (req, res) => {
  const shop = normalizeShop(req.params.shop);
  if (!isValidShop(shop)) {
    return res.status(400).json({ error: 'Invalid shop domain' });
  }

  try {
    const stores = await readStores();
    const store = stores.find((item) => item.shop === shop);

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

    return res.json(response.data.orders);
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
