# Alliance Volleyball Club - Shop Documentation

## Shop Features

The shop functionality is available on the website. This document explains what features are available and how to manage them.

### Available Features

1. **Shop Page** (`/shop`)
   - Product listings
   - Product customization

2. **Cart** (`/cart`)
   - View cart items
   - Remove items
   - Proceed to checkout

3. **Checkout** (`/checkout`)
   - Customer information form
   - Team membership confirmation
   - Order submission
   - Confirmation page

4. **Product Pages** (`/products/[id]`)
   - Product details with front and back views
   - Customization options
   - Add to cart functionality

### Database Integration

The shop is integrated with a Neon PostgreSQL database with the following tables:
- `products`: Stores product information
- `orders`: Stores order information
- `order_items`: Stores individual items in an order
- `customers`: Stores customer information
- `colorways`: Stores color options

### API Endpoints

The following API endpoints are available for the shop:
- `GET /api/orders`: Get all orders (requires authentication)
- `POST /api/orders`: Create a new order
- `GET /api/check-orders`: Check recent orders (requires authentication)
- `GET /api/db-schema`: View database schema (requires authentication)
- `GET /api/fix-schema`: Fix database schema issues (requires authentication)
- `GET /api/fix-constraints`: Fix foreign key constraints (requires authentication)

### Environment Variables

The shop functionality requires the following environment variables:
- `DATABASE_URL`: Neon database connection string
- `NEXT_PUBLIC_WEBSITE_URL`: URL of the main website
- `NEXT_PUBLIC_ADMIN_URL`: URL of the admin website
- `NEXT_PUBLIC_ADMIN_API_URL`: URL of the admin API
- `API_KEY`: API key for authentication (server-side only)

### Security Notes

- API authentication is handled server-side only
- Sensitive keys are never exposed to the client
- All API endpoints that access sensitive data require authentication
\`\`\`

Now, let's update the checkout page to ensure we're not using the API key in client code:
