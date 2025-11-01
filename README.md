# Symphony Shop

This is the initial state of an e-commerce website built with the below technologies

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4.5-orange?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-2.0-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3.23-3E67B1?style=for-the-badge)

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

- **Next.js 16** - React framework with App Router & Server Components
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Zustand** - Cart state management
- **Zod** - Schema validation
- **React Hook Form** - Form handling
- **Framer Motion** - Animations
- **shadcn/ui** - UI components

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
