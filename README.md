# Symphony Shop

This is the initial state of an e-commerce website. If you like it make sure to check out the console and also write "Pass" anywhere on the page 🎊

## Quick Start

Download the repostiory and run:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

**Core (Phase 1 Requirements)**

- Product list with DummyJSON API integration
- Product detail pages with dynamic routing
- Shopping cart with add/remove items
- Persistent cart state (localStorage)
- Responsive navigation with cart counter

**Extras**

- Search functionality with debounced input
- Category and price range filtering
- Contact form with validation
- Smooth animations and transitions
- Accessible UI with ARIA labels and keyboard support
- Loading states and error handling

## Tech Stack

| Technology | Purpose |
|------------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js&logoColor=white) | React framework with App Router for server-side rendering, static generation, and file-based routing |
| ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black) | Component-based UI library for building interactive user interfaces |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white) | Type safety and enhanced developer experience with static type checking |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Utility-first CSS framework for rapid UI development and responsive design |
| ![Zustand](https://img.shields.io/badge/Zustand-5.0-orange?style=flat) | Lightweight state management for shopping cart with localStorage persistence |
| ![Zod](https://img.shields.io/badge/Zod-3.25-3E67B1?style=flat) | Schema validation for API responses and form inputs with TypeScript inference |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.54-EC5990?style=flat&logo=reacthookform&logoColor=white) | Performant form handling with built-in validation and error management |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat&logo=framer&logoColor=white) | Animation library for smooth transitions, hover effects, and page animations |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?style=flat) | Accessible component library built on Radix UI primitives with customizable styling |
| ![Vitest](https://img.shields.io/badge/Vitest-2.1-6E9F18?style=flat&logo=vitest&logoColor=white) | Fast unit testing framework with native TypeScript support and React Testing Library integration |
| ![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-1.5-000000?style=flat&logo=vercel&logoColor=white) | Real-time web analytics for tracking page views and performance metrics |

## Project Structure

```
app/
├── page.tsx              # Home with featured categories
├── products/
│   ├── page.tsx          # Product catalog with filters
│   └── [id]/page.tsx     # Product details
├── cart/page.tsx         # Shopping cart
└── layout.tsx            # Root layout with header

components/
├── product-card.tsx      # Product display component
├── header.tsx            # Navigation with cart
└── ui/                   # Reusable UI components

lib/
├── api/products.ts       # DummyJSON API client
├── store/cart-store.ts   # Zustand cart store
└── schemas/product.ts    # Zod validation schemas
```

## Known Limitations

- No backend - uses DummyJSON API
- Contact form only logs to console
- No user authentication
- No payment processing
- Cart not synced across devices
- Discount badges only show for discounts >= 1% (in my opinion there is no point to them if they are 0%)

## Future Improvements

- Backend integration
- User authentication & order history
- Payment gateway (Stripe)
- Product reviews & ratings
- Saving to favourites, having such screen
- Discount codes and vouchers
- User profile flow and settings
- Internationalization (i18n)
- Analytics & monitoring

## License

MIT
