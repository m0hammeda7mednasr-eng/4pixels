# Shopify OAuth Integration Setup Guide

## Overview
This guide will help you set up Shopify OAuth integration for the 4Pixels Digital Agency platform.

## Prerequisites
- A Shopify Partner account (free to create)
- Node.js and npm installed
- The 4Pixels application running locally

## Step 1: Create a Shopify Partner Account

1. Go to [Shopify Partners](https://partners.shopify.com/)
2. Sign up for a free account
3. Complete the registration process

## Step 2: Create a Custom App

1. Log in to your Shopify Partner Dashboard
2. Click on "Apps" in the left sidebar
3. Click "Create app" button
4. Select "Custom app"
5. Fill in the app details:
   - **App name**: 4Pixels Integration
   - **App URL**: `http://localhost:3000` (for development)
   - **Allowed redirection URL(s)**: `http://localhost:5000/api/shopify/callback`

## Step 3: Get Your API Credentials

1. After creating the app, you'll see your credentials:
   - **API key** (Client ID)
   - **API secret key** (Client Secret)
2. Copy these credentials - you'll need them in the next step

## Step 4: Configure Environment Variables

1. Open `server/.env` file (create it if it doesn't exist)
2. Add the following variables:

```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Shopify OAuth Configuration
SHOPIFY_API_KEY=your_api_key_here
SHOPIFY_API_SECRET=your_api_secret_here
SHOPIFY_REDIRECT_URI=http://localhost:5000/api/shopify/callback
```

3. Replace `your_api_key_here` and `your_api_secret_here` with your actual Shopify credentials

## Step 5: Configure API Scopes

The integration requests the following scopes:
- `read_products` - Read product data
- `write_products` - Create and update products
- `read_orders` - Read order data
- `write_orders` - Create and update orders
- `read_customers` - Read customer data

You can modify these scopes in `server/routes/shopify.js` if needed.

## Step 6: Start the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend (in a new terminal):
```bash
cd client
npm start
```

## Step 7: Connect a Shopify Store

1. Navigate to `http://localhost:3000/admin/shopify`
2. Enter your Shopify store name (e.g., `my-store` for `my-store.myshopify.com`)
3. Click "Connect to Shopify"
4. You'll be redirected to Shopify to authorize the app
5. After authorization, you'll be redirected back to the success page

## Testing with a Development Store

If you don't have a live Shopify store, you can create a development store:

1. Go to your Shopify Partner Dashboard
2. Click "Stores" in the left sidebar
3. Click "Add store" → "Development store"
4. Fill in the store details and create it
5. Use this store to test the integration

## API Endpoints

The integration provides the following endpoints:

### Authentication
- `GET /api/shopify/auth?shop=store-name.myshopify.com` - Initiate OAuth flow
- `GET /api/shopify/callback` - OAuth callback (handled automatically)

### Store Management
- `GET /api/shopify/stores` - Get all connected stores
- `DELETE /api/shopify/stores/:shop` - Disconnect a store

### Data Access
- `GET /api/shopify/products/:shop` - Get products from a store
- `GET /api/shopify/orders/:shop` - Get orders from a store

## Security Notes

1. **Never commit your `.env` file** - It contains sensitive credentials
2. **Use HTTPS in production** - Update redirect URIs to use HTTPS
3. **Implement proper authentication** - Add auth middleware to protect routes
4. **Validate all inputs** - The current implementation includes basic validation
5. **Store tokens securely** - Consider using encryption for stored access tokens

## Production Deployment

When deploying to production:

1. Update the App URL in Shopify Partner Dashboard
2. Update the Allowed redirection URL(s) to your production domain
3. Update environment variables:
   - `CLIENT_URL` - Your production frontend URL
   - `SHOPIFY_REDIRECT_URI` - Your production callback URL
4. Enable HTTPS for all connections
5. Implement rate limiting and error handling
6. Add proper logging and monitoring

## Troubleshooting

### "Invalid shop domain" error
- Ensure the shop name is in the format: `store-name.myshopify.com`
- Don't include `https://` in the shop name

### "HMAC validation failed" error
- Check that your API secret is correct
- Ensure you're not modifying the callback URL parameters

### "Failed to connect to Shopify" error
- Verify your API credentials are correct
- Check that the redirect URI matches exactly in Shopify settings
- Ensure your server is running and accessible

### Store not appearing in connected stores
- Check the `server/data/shopify-stores.json` file
- Verify the OAuth callback completed successfully
- Check server logs for errors

## Additional Resources

- [Shopify OAuth Documentation](https://shopify.dev/docs/apps/auth/oauth)
- [Shopify API Reference](https://shopify.dev/docs/api)
- [Shopify Partner Dashboard](https://partners.shopify.com/)

## Support

For issues or questions:
1. Check the server logs for detailed error messages
2. Review the Shopify API documentation
3. Contact the development team

---

**Note**: This integration is designed for custom app development. For public app distribution, additional steps and app review are required.
