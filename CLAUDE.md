# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16 (React 19, TypeScript)** marketing website for icompetence.de, a Data & AI consulting company. It is configured as a **static site export** (`output: 'export'` in next.config.js).

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build and export static site to /out
npm run lint     # Run Next.js built-in ESLint
```

No testing framework is configured.

## Architecture

### Routing & Entry Points

- `app/` — Next.js App Router pages and API routes
- `app/page.tsx` — Home page; renders `src/App.tsx`
- `app/layout.tsx` — Root layout; includes Google Tag Manager and Usercentrics consent integration
- `app/api/contact/route.ts` — Contact form API endpoint (email service not yet integrated)
- Tool pages live at `/campaign-parameter-tool`, `/icu-user-journey-explorer`, `/intelligentic-search`, `/privacy-led-ai`

### Source Code (`src/`)

- `src/App.tsx` — Main component that composes all homepage sections
- `src/contexts/LanguageContext.tsx` — Custom i18n context providing `useLanguage()` hook with `en`/`de` translations (100+ keys)
- `src/components/` — All React components; `ui/` contains 46 Radix UI primitives
- `src/imports/` — Figma-generated design system components (Aurora effects, Frame components)
- `src/index.css` — Global styles with Tailwind CSS v4

### Key Patterns

**i18n:** All user-facing strings must use the `useLanguage()` hook. Translations are defined inline in `LanguageContext.tsx` — add both `en` and `de` entries when adding new text.

**Animations:** Three animation systems are in use — GSAP (scroll-based), Framer Motion (component transitions), and custom CSS Aurora effects (background gradients). Do not mix concerns between them.

**Static export constraints:** `next/image` optimization is disabled (`unoptimized: true`). API routes work only at build time or when running `next start`; they are not available in the static `/out` export.

**Path alias:** `@/*` maps to `./src/*` (configured in `tsconfig.json`).

**Peer deps:** `.npmrc` sets `legacy-peer-deps=true` for Radix UI compatibility — keep this when adding packages.
