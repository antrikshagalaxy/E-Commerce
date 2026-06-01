# Genz-X | Premium Full-Stack E-Commerce Platform

Genz-X is a production-ready, full-stack (MERN) e-commerce clothing application. It features a modern, responsive customer storefront, a detailed admin control panel, secure authentication, dynamic database state synchronization, and an integrated Stripe payment system.

This codebase has been built with modularity, performance, and scalability in mind—making it a perfect addition to a software development resume.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Navigation Structure](#navigation-structure)
- [Key Components](#key-components)
- [Context & State Management](#context--state-management)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Code Conventions](#code-conventions)
- [License](#license)

---

## Project Overview
**Genz-X** is designed to replicate a real-world online clothing boutique. The platform connects three decoupled systems:
1. **Express & Node.js API Backend**: Provides RESTful services, manages database schemas, secures user authentication, and interfaces with Stripe and Cloudinary.
2. **Customer Storefront (Vite + React)**: Allows users to explore collections, filter products, manage their cart in real-time, register/login, and place secure orders.
3. **Admin Dashboard (Vite + React)**: Provides shop managers with product creation (including multi-image upload), stock lists, and live order tracking and status controls.

---

## Tech Stack

### Frontend & Admin Dashboard
- **React.js** (v18) - Interactive component-driven UI
- **Vite** - High-performance frontend bundler
- **React Router DOM** - Single Page Application client-side routing
- **Axios** - Promise-based HTTP client for API communication
- **TailwindCSS** - Responsive utility-first CSS styling
- **React Toastify** - Non-blocking user notification toast alerts

### Backend API
- **Node.js** - JavaScript runtime environment
- **Express.js** - Server framework for RESTful routing and API requests
- **JWT (JSON Web Tokens)** - Token-based authorization for stateless sessions
- **Bcrypt.js** - Secure salted hashing of user and admin credentials
- **Multer** - Multipart form data parsing for local file uploads

### Cloud Services & Database
- **MongoDB Atlas** - Cloud database using Mongoose ODM for schemas
- **Cloudinary API** - Cloud storage for hosting high-resolution product media
- **Stripe API** - Secure hosted checkout and payment processing in Rupees (INR)

---

## Features

### 🛒 1. Customer Storefront
- **Responsive Design**: Mobile-first fluid layouts scaling seamlessly from small smartphone screens to large desktop monitors.
- **Dynamic Collection Filtering**: Categorize garments by main groups (Men, Women, Kids) and sub-types (Topwear, Bottomwear, Winterwear), combined with price sorting.
- **Smart Search Bar**: Instant product search with search input debouncing.
- **Persistent Cart State**: Dynamic cart updates, subtotal calculations, and item counts saved to local storage when logged out, and synchronized with MongoDB when authenticated.
- **Size Selection**: Required size selector per product before item is added to cart.

### 🛡️ 2. Admin Dashboard
- **Create Products**: Admin panel form supporting multi-image file selection (up to 4 images), price, category, subcategory, sizes, description, and bestseller highlight toggle.
- **Live Inventory List**: List products directly from MongoDB with options to delete items, removing assets from Cloudinary automatically.
- **Live Order status controls**: List, monitor, and update customer order states using a clean dropdown selector.

### 💳 3. Checkout & Stripe Payments
- **Secure Stripe Checkout**: Seamlessly generates Stripe payment sessions in **Indian Rupees (INR)** and redirects the client to Stripe's payment gateway.
- **Stripe Redirect Verification**: Handles payment completion redirects securely. Upon successful checkout, verifies the transaction on the backend, updates MongoDB status, and clears the user's cart.
- **Cash on Delivery (COD)**: Supports standard cash-on-delivery orders.
- **Pending Payments Filter**: Orders placed via Stripe are hidden from customer and admin panels until payment is successfully confirmed.

---

## Project Structure

```
Clothing/
├── Admin/                   # React Admin Dashboard (Vite)
│   ├── src/
│   │   ├── assets/          # Static assets & icons
│   │   ├── Components/      # Navbar, Sidebar, Login components
│   │   ├── Pages/           # Add Product, List Products, Orders Panel
│   │   ├── App.jsx          # Route management & state
│   │   └── main.jsx         # App entry point
│
├── backend/                 # Express API Server (Node.js)
│   ├── config/              # MongoDB & Cloudinary connectors
│   ├── controllers/         # Request handlers (User, Product, Cart, Order)
│   ├── middleware/          # JWT auth & Admin access filters
│   ├── models/              # Mongoose database schemas
│   ├── routes/              # Express API endpoints
│   ├── server.js            # Express server entry point
│   └── .env.example         # Template for environment configuration
│
├── frontend/                # React Customer Storefront (Vite)
│   ├── src/
│   │   ├── assets/          # Brand visuals & static images
│   │   ├── Components/      # Reusable UI parts (Navbar, Footer, CartTotal, etc.)
│   │   ├── Context/         # ShopContext (global cart, currency & auth state)
│   │   ├── Pages/           # Home, Collection, Product, Cart, PlaceOrder, Verify, Orders
│   │   ├── App.jsx          # Customer-facing layout & navigation routes
│   │   └── main.jsx         # App entry point
```

---

## Environment Variables

### Backend Configuration
Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/clothing"
JWT_SECRET="your_custom_jwt_jwt_secret"
ADMIN_EMAIL="admin@email.com"
ADMIN_PASSWORD="your_admin_password"
CLOUDINARY_API_KEY="your_cloudinary_key"
CLOUDINARY_SECRET_KEY="your_cloudinary_secret"
CLOUDINARY_NAME="your_cloudinary_cloud_name"
STRIPE_SECRET_KEY="your_stripe_secret_key"
```

### Frontend Configuration
Create a `.env` file in the `frontend/` directory:
```env
VITE_BACKEND_URL="http://localhost:4000"
```

### Admin Configuration
Create a `.env` file in the `Admin/` directory:
```env
VITE_BACKEND_URL="http://localhost:4000"
```

---

## Installation & Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/antrikshagalaxy/E-Commerce.git
cd E-Commerce
```

### Step 2: Install Dependencies
Install dependencies for each decoupled workspace folder:

```bash
# Install backend dependencies
cd backend
npm install

# Install customer frontend dependencies
cd ../frontend
npm install

# Install admin dashboard dependencies
cd ../Admin
npm install
```

---

## Running the Project

Run all three development processes locally in separate terminal tabs:

### 1. Start backend server (Port: 4000)
```bash
cd backend
npm run server
```

### 2. Start customer frontend (Port: 5173)
```bash
cd frontend
npm run dev
```

### 3. Start admin panel (Port: 5174)
```bash
cd Admin
npm run dev
```

---

## Navigation Structure

### Customer Storefront Routing
- `/` - Home landing page with bestsellers and latest arrivals
- `/collection` - Inventory page with category toggles and search bar
- `/product/:productId` - Detail view for product description, sizes, and images
- `/cart` - Checkout basket showing item details and quantities
- `/login` - Secure user login and account creation
- `/placeorder` - Shipping forms and checkout payment method selectors
- `/verify` - Secure redirect handler confirming Stripe checkout completion
- `/orders` - Customer page listing historical purchases and tracking statuses
- `/about` - Core values and company vision page
- `/contacts` - Customer support details and query cards

---

## Key Components

- **ShopContext (State Management)**: Global provider handling user authentication state, dynamic cart synchronization with MongoDB, and currency configuration.
- **ProductItem**: Grid component displaying product information, pricing, and routing links.
- **CartTotal**: Reusable calculation widget computing cart subtotals, delivery fees, and order grand totals.
- **RelatedProducts**: Algorithms selecting related products dynamically based on matching categories/subcategories.

---

## Context & State Management

The application utilizes **React Context API** (`ShopContext`) to manage global storefront state. This avoids prop-drilling and ensures clean data flow across components.

```javascript
// Sample structure of ShopContext value exports
const contextValue = {
    products,          // Loaded from database
    cartItems,         // Reactive user cart state
    setCartItems,      
    addToCart,         // Dynamic quantity increments
    getCartCount,      // Cart bubble indicators
    updateQuantity,    // Direct DB/State writes
    getTotalCartAmount,// Grand totals helper
    token,             // Current JWT auth session
    setToken,
    backendUrl,        // Shared server URI
    currency           // Unified currency token (₹)
}
```

---

## API Integration

### User Auth Endpoints
| Action | Method | Path |
|---|---|---|
| User Register | `POST` | `/api/user/register` |
| User Login | `POST` | `/api/user/login` |
| Admin Login | `POST` | `/api/user/admin` |

### Product Endpoints
| Action | Method | Path |
|---|---|---|
| Add Product | `POST` | `/api/product/add` (Admin Auth) |
| List Products | `GET` | `/api/product/list` |
| Remove Product | `POST` | `/api/product/remove` (Admin Auth) |
| Single Product | `POST` | `/api/product/single` |

### Cart Endpoints
| Action | Method | Path |
|---|---|---|
| Get User Cart | `POST` | `/api/cart/get` (User Auth) |
| Sync Add Cart | `POST` | `/api/cart/add` (User Auth) |
| Sync Update Cart | `POST` | `/api/cart/update` (User Auth) |

### Order Endpoints
| Action | Method | Path |
|---|---|---|
| Place Order (COD) | `POST` | `/api/order/place` (User Auth) |
| Place Order (Stripe) | `POST` | `/api/order/stripe` (User Auth) |
| Verify Stripe Payment | `POST` | `/api/order/verifyStripe` (User Auth) |
| Get Customer Orders | `POST` | `/api/order/userorders` (User Auth) |
| List All Shop Orders | `POST` | `/api/order/list` (Admin Auth) |
| Update Order Status | `POST` | `/api/order/status` (Admin Auth) |

---

## Troubleshooting

- **Stripe Session Fails**: Ensure `STRIPE_SECRET_KEY` is defined in `backend/.env`. If the key is missing, the backend returns a clean JSON error response instead of crashing the Node process.
- **ES Modules import error**: Node relative imports require the `.js` extension (e.g. `import schema from "./models/orderModel.js"`). Neglecting this throws `ERR_MODULE_NOT_FOUND` errors on startup.
- **Images don't render**: Ensure your Cloudinary credentials are fully valid and that images were uploaded through the admin panel.

---

## Code Conventions

- **File Casing**: Reusable React components use `PascalCase` (e.g. `CartTotal.jsx`). Page views are grouped under `Pages/`.
- **Arrow Functions**: Implicit arrow returns returning object literals are wrapped in parentheses to prevent syntax parsing issues:
  ```javascript
  const line_items = items.map((item) => ({
      price_data: { ... },
      quantity: item.quantity
  }))
  ```

---

## License

This project is licensed under the [MIT License](LICENSE).