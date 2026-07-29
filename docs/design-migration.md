# Design-Migration: neues Lavender-Design auf die ganze Site

Die `/lavender`-Seite (`src/components/LavenderHome.tsx`) ist das neue Design (künftige
Homepage). Dieses Dokument ist die lebende Roadmap, um **alle** anderen
icompetence.de-Seiten nach und nach auf dieses Design zu ziehen.

## Ausgangslage: zwei parallele Systeme

| | **Lavender (neu)** | **Rest (alt)** |
|---|---|---|
| Umfang | 1 Monolith-Datei (~3.200 Zeilen) | 13 Page-Komponenten + `App.tsx`/`Home.tsx` |
| Styling | Inline-Styles + Konstanten, JS-Breakpoints | Tailwind + shadcn/ui |
| i18n | eigener `LangContext` + inline `t('en','de')` | Projekt-`LanguageContext` / `useLanguage` (~400 Keys) |
| Chrome | eigene `TopNav`/`Footer`/Burger im selben File | altes Layout |

## Gelockte Entscheidungen (2026-07-29)

1. **Fundament zuerst** — Design-System aus Lavender extrahieren, dann Seiten migrieren.
2. **Tailwind-Tokens** — Lavender-Tokens ins Tailwind-Theme; geteilte Komponenten in Tailwind.
3. **i18n = Projekt-System (`useLanguage`)** — Lavender-Texte dorthin migrieren (1 Seite statt 13 umbauen).
4. **Build-Pipeline (Option A)** — echter Tailwind-Build statt eingefrorenem CSS-Snapshot.

## Phasenplan

### Phase 1 — Design-System extrahieren (Foundation)

- [x] **PR 1 – Tailwind-Build + Design-Tokens.** `tailwindcss@4.1.3` + `@tailwindcss/postcss`
      installiert, `postcss.config.mjs`, `globals.css` als echte v4-Quelle (`@import "tailwindcss"`
      + `@source`), Layout-Import `index.css` → `globals.css`. Lavender-Tokens im `@theme`:
      Farben (`bg-lav-navy`, `-lavender`, `-page`, `-blue`, `-white`; Alphas via `/opacity`),
      `font-brand`, Typo (`text-mega/h1/h2/h3/sub/body`), Radien (`rounded-pill/card/card-sm`),
      Section-Spacing-Vars, `max-w-frame` (1440).
- [ ] **PR 2 – Layout-Primitiven + Basis-UI.** `<Section>` (Außen/Innen-Padding, `max-w-frame`),
      Button/CTA-Pill, Eyebrow/Typo-Helper — in Tailwind auf den Tokens.
- [ ] **PR 3 – Chrome:** `TopNav` + `Footer` + Sprach-Toggle als geteilte Komponenten,
      an `useLanguage` angebunden.
- [ ] **PR 4 – Reiche Komponenten:** Accordion, (finites) Carousel, Testimonial-Slider,
      ProductTeaser, LogoCarousel, Aurora-Visuals.
- [ ] **PR 5 – `LavenderHome` auf die Library umbauen** + Texte nach `useLanguage` migrieren
      (Beweis: Optik 1:1; erledigt die i18n-Konvergenz für Lavender).

### Phase 2 — Shell vereinheitlichen
- [ ] Neue `TopNav`+`Footer` ins geteilte Layout → jede Seite bekommt die neue Hülle.

### Phase 3 — Seiten migrieren (je eine pro PR)
- [ ] Homepage `/` (Flaggschiff; Lavender-Inhalt wandert nach `/`)
- [ ] Info-Seiten: contact, imprint, thank-you
- [ ] Produkt-/Tool-Seiten: empco-audit, iknow, analytics-agent, intelligentic-search,
      icu-user-journey-explorer, campaign-parameter-tool, ai-workshop, privacy-led-ai
      (**mit** SEO/Schema — siehe unten)
- [ ] whats-new, EmpCo-Cluster-Pages

### Phase 4 — Aufräumen
- [ ] Alte shadcn/Tailwind-Reste entfernen, Duplikate löschen
- [ ] `/lavender`-Route in `/` auflösen, `robots:noindex` entfernen + Sitemap-Block aktivieren

## Durchgängige Regeln
- **Eine Seite/Slice pro PR** (klein, reviewbar, revertbar).
- **SEO/LLM-Kriterien** pro migrierter Seite mitziehen (NOTIZEN): echtes `<h1>`, crawlbarer
  Inhalt (kein reines JS-Rendering von Kerncontent), Schema/JSON-LD, hreflang, `img alt`.
- **Live-Seiten nie brechen** — auf Branch bauen, gegen Alt-Design verifizieren, dann mergen.
- `/lavender` bleibt `noindex`, bis die echte Homepage steht.

## Offene Aufräumpunkte (Follow-up, nicht dringend)
- `src/index.css` (alter, eingefrorener Snapshot) wird nicht mehr importiert → in einem
  Cleanup entfernen. Ebenso der tote Vite-Entry `src/main.tsx`.
- Kommentar in `EmpCoClusterPage.tsx` („precompiled Tailwind snapshot … utilities not in CSS")
  ist seit dem Live-Build **veraltet** — neue Utilities werden jetzt kompiliert.
