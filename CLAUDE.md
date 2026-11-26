# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16 (React 19, TypeScript)** marketing website for icompetence.de, a Data & AI consulting company. It is configured as a **static site export** (`output: 'export'` in next.config.js).

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build and export static site to /out (first refreshes src/data/consent-services.json from Usercentrics, see scripts/consent-services.mjs)
npm run lint     # Run ESLint with the Next.js rules (flat config in eslint.config.mjs)
```

No testing framework is configured.

## Architecture

### Routing & Entry Points

- `app/[lang]/` — Next.js App Router pages; `lang` is `de` (English is switched off, see `SITE_LANGS` in `src/design-system/routes.ts`)
- `app/[lang]/layout.tsx` — Root layout: Google Tag Manager, Usercentrics consent, the `LanguageProvider` (`variant="lavender"`), both stylesheets
- `app/[lang]/page.tsx` — Home page; renders `src/components/lavender/HomeNightLavender.tsx`
- Product pages: `/empco-audit`, `/iknow`, `/analytics-agent`, `/intelligentic-search`, `/icu-user-journey-explorer`, `/campaign-parameter-tool`, `/ai-workshop`, `/privacy-led-ai`
- Info pages: `/contact`, `/imprint`, `/privacy-policy`, `/whats-new`, `/thank-you`, `/404`
- Media Monitoring app legal pages (German and English): `/privacy-media-monitoring`, `/data-deletion-media-monitoring`, `/terms-media-monitoring`
- `app/api/contact/route.ts` — Contact form API endpoint (not used by the static export; forms post to Netlify)
- `public/_redirects` — legacy addresses, `/en/*` → `/de/*` while English is off, and the 404 page

The redesign ("Licht und Linie") went live on these routes on 26.11.2026; see `docs/design-migration.md`, section "Livegang". The old page components (`src/components/*Page.tsx`, `src/App.tsx`) are no longer routed and wait for the cleanup.

### Source Code (`src/`)

- `src/App.tsx` — Main component that composes all homepage sections (Hero → ScrollRevealText → Offer → Carousels → Process → Metrics → FAQ → Footer)
- `src/contexts/LanguageContext.tsx` — Custom i18n context providing `useLanguage()` hook with `en`/`de` translations (~400 keys)
- `src/components/` — All React components; `ui/` contains ~48 shadcn/ui (Radix UI) primitives
- `src/components/campaign-tool/` — Campaign Parameter Tool sub-components (11 files, prefixed `CT*`)
- `src/imports/` — Figma-generated design system components (Aurora effects, Frame wrappers); do not manually edit these
- `src/styles/globals.css` — the design system's styles (Tailwind CSS v4); `src/index.css` is the old site's frozen snapshot, still loaded underneath until the cleanup
- `src/styles/fonts.css` — Inter from our own server (`src/styles/fonts/`); do not load fonts from Google or another third party
- `src/REUSABLE_COMPONENTS.md` — Component API docs with usage examples for major reusable components

### Key Patterns

**i18n:** All user-facing strings must use the `useLanguage()` hook. Translations are defined inline in `LanguageContext.tsx` — add both `en` and `de` entries when adding new text. Keys follow a namespace convention: `section.key` (e.g., `hero.title`, `offer.left.title`, `faq.q1`, `footer.imprint`).

**Animations:** Three animation systems are in use — GSAP (scroll-based word reveals in `ScrollReveal.tsx`, `AnimatedContent.tsx`), Framer Motion (velocity-based carousels in `BrandBanner.tsx`, `ScrollVelocity.tsx`), and custom CSS Aurora effects (`src/imports/Aurora*.tsx`, `AuroraFooter.tsx`). Do not mix concerns between them. Scroll animations auto-disable on mobile (≤768px).

**Static export constraints:** `next/image` optimization is disabled (`unoptimized: true`). API routes work only at build time or when running `next start`; they are not available in the static `/out` export. `trailingSlash: true` is set — all internal links must include trailing slashes.

**Client components:** Most components use React hooks and must include `'use client'` directive. Only `app/layout.tsx` and metadata-only pages are server components.

**Path alias:** `@/*` maps to `./src/*` (configured in `tsconfig.json`).

**Peer deps:** `.npmrc` sets `legacy-peer-deps=true` for Radix UI compatibility — keep this when adding packages.

**Responsive breakpoint:** Mobile detection throughout the codebase uses `window.innerWidth <= 768`.
