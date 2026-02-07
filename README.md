# Mobile GANJ - E-commerce POS System

> A modern, full-featured e-commerce platform with POS capabilities, built with Next.js 16, React 19, and TypeScript.

## 🚀 Project Overview

Mobile GANJ is a hybrid e-commerce POS system that combines:
- **B2C E-commerce** - Public storefront for online shopping
- **POS System** - Point of sale for in-store transactions
- **Inventory Management** - Complete stock management
- **Pre-Order System** - Dubai import with 3-7 days delivery
- **EMI Facility** - 0% interest installment plans

## ✨ Features

### Landing Page (Complete ✅)
- 🏠 Home page with hero banner and product sections
- 🛍️ Shop page with advanced filters
- 📱 Buy Phone page (phone-specific)
- 💵 Sell Phone page (sell old phones)
- 🎧 Accessories page (category-based)
- 📦 Product details with variants (Storage, Color, RAM, Region)
- 🚀 Pre-order system (Dubai import)
- 💰 Offers page (discounted products)
- 📞 Contact page with multiple contact methods

### Key Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Framer Motion animations
- ✅ Advanced product filtering
- ✅ Product variants (like Apple Gadgets BD)
- ✅ EMI calculator (0% interest)
- ✅ Cart system (Zustand)
- ✅ Floating contact button
- ✅ Toast notifications
- ✅ Dark mode support

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Components:** Radix UI + Shadcn/ui
- **State Management:** Zustand
- **Data Fetching:** TanStack React Query (ready)
- **Notifications:** Sonner
- **Forms:** React Hook Form + Zod

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd mobileganj

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## 📂 Project Structure

```
mobileganj/
├── src/
│   ├── app/
│   │   ├── (main-layout)/        # Public website
│   │   │   ├── (home)/          # Home page
│   │   │   ├── shop/            # Shop page
│   │   │   ├── buy-phone/       # Buy phone page
│   │   │   ├── accessories/     # Accessories page
│   │   │   ├── product/[slug]/  # Product details
│   │   │   ├── pre-order/       # Pre-order page
│   │   │   ├── offers/          # Offers page
│   │   │   └── contact/         # Contact page
│   │   ├── (dashboard-layout)/   # Admin/POS (to be built)
│   │   └── (auth-layout)/        # Auth pages (to be built)
│   ├── components/
│   │   ├── shared/              # Shared components
│   │   └── ui/                  # UI components
│   ├── hooks/                   # Custom hooks
│   ├── lib/                     # Utilities
│   └── types/                   # TypeScript types
├── LANDING_PAGE_DOCS.md         # Complete documentation
├── QUICK_START.md               # Quick start guide
├── SUMMARY_BANGLA.md            # Bengali summary
├── API_INTEGRATION_GUIDE.md     # API integration guide
└── PROJECT_SUMMARY.md           # Project summary
```

## 🎯 Current Status

### ✅ Completed
- [x] Landing page (9 pages)
- [x] 25+ reusable components
- [x] Cart system (Zustand)
- [x] EMI calculator
- [x] Pre-order system
- [x] Sell phone system
- [x] Product variants
- [x] Responsive design
- [x] Animations
- [x] Mock data

### 🚧 To Do
- [ ] Backend API
- [ ] Dashboard/POS interface
- [ ] Authentication
- [ ] Payment gateway
- [ ] Order management
- [ ] Invoice generation

## 📖 Documentation

- **[Landing Page Docs](./LANDING_PAGE_DOCS.md)** - Complete landing page documentation
- **[Quick Start](./QUICK_START.md)** - Quick start guide
- **[API Integration](./API_INTEGRATION_GUIDE.md)** - Step-by-step API integration
- **[Project Summary](./PROJECT_SUMMARY.md)** - Detailed project summary
- **[Bengali Summary](./SUMMARY_BANGLA.md)** - বাংলা সারাংশ

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🎨 Design Inspiration

- Apple Gadgets BD - Product details and variant selection
- Rafsaan Riyad - UX patterns and user flow

## 📱 Pages

1. **Home** (`/`) - Hero, categories, products, pre-order section
2. **Shop** (`/shop`) - All products with advanced filters
3. **Buy Phone** (`/buy-phone`) - Phone-specific products
4. **Sell Phone** (`/sell-phone`) - Sell old phones form
5. **Accessories** (`/accessories`) - Accessories with category filters
6. **Product Details** (`/product/[slug]`) - Full product page with variants
7. **Pre-Order** (`/pre-order`) - Pre-order system and info
8. **Offers** (`/offers`) - Discounted products
9. **Contact** (`/contact`) - Contact form and info

## 🔌 API Integration

The project is ready for API integration. Follow the [API Integration Guide](./API_INTEGRATION_GUIDE.md) for step-by-step instructions.

Currently using mock data from `src/lib/mock-data.ts`. Replace with your API calls.

## 🎯 Key Features

### Product Management
- Product listing with filters
- Product search
- Product variants (Storage, Color, RAM, Region)
- Stock management
- Price with offers

### Shopping Experience
- Add to cart (working)
- Wishlist (UI ready)
- EMI calculator
- Pre-order system
- Multiple contact methods

### UI/UX
- Smooth animations (Framer Motion)
- Responsive design
- Dark mode support
- Toast notifications
- Loading states
- Error handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 📞 Support

For support, email info@mobileganj.com or contact through the website.

---

**Built with ❤️ for Mobile GANJ**