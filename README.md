# Technical Test - Lead Frontend Developer

## 🎯 Project Overview

This is a Next.js application implementing a podcast platform design with animations, dynamic content, and responsive layouts. Built for a technical assessment demonstrating modern React/Next.js practices.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📋 Features Implemented

- ✅ **Responsive Design**: Desktop & mobile layouts
- ✅ **Animations**: Parallax scroll, CTA rotation, gradient hover effects, number incrementation
- ✅ **Custom API**: `/api/numbers` endpoint for statistics
- ✅ **External API Integration**: DummyJSON for articles with dynamic routing
- ✅ **Server Components**: Optimized data fetching with ISR
- ✅ **TypeScript**: Full type safety throughout
- ✅ **Testing**: Unit tests for hooks, components, and API functions

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 16.0.5 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Testing**: Jest + React Testing Library

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── articles/           # Dynamic article pages
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections (Hero, Articles, etc.)
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and API clients
│   ├── api/               # API functions
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
└── public/                # Static assets
```

## 📊 Data Fetching Strategy

See [TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md) for detailed justifications.

### Summary

- **Server Components**: Used for initial data fetching (Articles, static content)
- **ISR (Incremental Static Regeneration)**: 1-hour revalidation for articles
- **Client-side Fetching**: Custom hook (`useNumbers`) for statistics with fallback values
- **API Routes**: Custom `/api/numbers` endpoint for statistics data

## 🧪 Testing

Tests are located in `__tests__` directories co-located with source files.

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

**Test Coverage:**
- Custom hooks (data fetching, cleanup)
- Components (rendering, user interactions)
- API functions (error handling, fallbacks)

## 🎨 Design Implementation

- **Figma Design**: Fully integrated with responsive breakpoints
- **Animations**:
  - Parallax scroll on hero section
  - CTA button rotation on hover
  - Radial gradient filter on article cards
  - Animated number counters on scroll
- **Fonts**: Darker Grotesque (headings), Open Sans (body)

## 📦 Build & Deploy

```bash
npm run build  # Production build
npm start      # Start production server
```

The application is optimized for production with:
- Static page generation (SSG)
- Image optimization (Next.js Image)
- Font optimization (next/font)
- Code splitting

## 🔧 Development

### Code Quality

- **ESLint**: Configured with Next.js rules
- **Prettier**: Code formatting
- **TypeScript**: Strict mode enabled
- **Git**: Conventional commits

### Best Practices

- Component composition and reusability
- Custom hooks for data fetching
- Type safety throughout
- Error handling and fallbacks
- Performance optimizations

## 📝 Notes

- All animations use Framer Motion for smooth, performant interactions
- API error handling includes fallback values for graceful degradation
- Responsive design tested across common breakpoints
- Build passes with no errors or warnings

## 🚀 Future Improvements

- Error boundaries for better error handling
- Loading skeletons for better UX
- Accessibility enhancements (ARIA labels, keyboard navigation)
- E2E tests with Playwright
- Performance monitoring

---

Built with ❤️ for the technical assessment
