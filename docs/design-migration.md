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
- [x] **PR 2 – Layout-Primitiven + Basis-UI.** `<Section>` (Außen/Innen-Padding, `max-w-frame`),
      Button/CTA-Pill, Eyebrow/Typo-Helper — in Tailwind auf den Tokens.
- [x] **PR 3 – Chrome:** `TopNav` + `Footer` + Sprach-Toggle als geteilte Komponenten,
      an `useLanguage` angebunden.
- [x] **PR 4 – Reiche Komponenten:** Accordion, (finites) Carousel, Testimonial-Slider,
      ProductTeaser, LogoCarousel, Aurora-Visuals.
- [x] **PR 5 – `LavenderHome` auf die Library umbauen** + Texte nach `useLanguage` migrieren
      (Beweis: Optik 1:1; erledigt die i18n-Konvergenz für Lavender).

- [x] **PR 6 – Lücken schließen: alles, was Lavender ausmacht, ist jetzt Komponente.**
      Vier Bausteine lagen noch inline in `LavenderHome` und fehlten damit im
      Design-System (und im Migrationstool): `BrandStar` (der großflächige
      Marken-Stern, vorher 4× dupliziert), `Statement` (+ eigenes CTA-Band),
      `FeatureBlock` (Bild + Text + CTA, `side`/`stacked` — deckt sowohl das
      Feature-Produkt als auch die Privacy-Led-Sektion ab), `ProductShowcase`
      (Feature + Teaser-Reihe) und `CTABand` (aus `ClosingBlock` herausgelöst).
      `LavenderHome` komponiert nur noch; Optik auf 1440/800/420 pixelgleich.

### Vorschau-Bereich `/lavender/…` (entschieden 2026-10-01)

Die bestehenden Seiten werden **nicht** umgebaut. Jede neu gestaltete Seite entsteht
daneben unter `/<lang>/lavender/<route>/` und zieht erst zum Livegang an ihren
endgültigen Platz.

- **Rahmen:** `app/[lang]/lavender/layout.tsx` setzt für alles darunter `noindex` und
  stellt den `LanguageProvider` mit `variant="lavender"` bereit.
- **Links:** Das Design-System baut interne Links über `siteHref(language, route)`
  (`src/design-system/routes.ts`). Routen, die es in der Vorschau schon gibt
  (`PREVIEW_ROUTES`), bleiben in der Vorschau; alle anderen zeigen auf die Live-Seite.
  Neue Vorschau-Seite = Route dort eintragen.
- **Texte:** Geänderter Wortlaut (du-Form, EN Satzschreibung/US-Schreibweise) steht in
  `src/contexts/lavender-overrides.ts` und gilt nur mit `variant="lavender"`. Die
  gemeinsamen Schlüssel in `LanguageContext.tsx` bleiben für die Live-Seiten unverändert.
- **Seiten-Komponenten:** `src/components/lavender/<Seite>Lavender.tsx`, komponiert aus
  `src/design-system`. Die alten Komponenten bleiben unangetastet.
- **Globale Regeln** (Fokusring, Hover, Typo-Klassen `lav-*`) hängen an `.lavender-page`
  bzw. an eigenen Klassen und wirken nicht auf die Live-Seiten.
- **Formulare** posten an dieselben Netlify-Formulare wie die Live-Seiten.

Livegang einer Seite: Ordner `app/[lang]/lavender/<route>` eine Ebene nach oben, alte
Komponente löschen, Route aus `PREVIEW_ROUTES` nehmen, Overrides in `translations`
übernehmen, `noindex` fällt mit dem Layout weg, Sitemap ergänzen. Für alle auf einmal:
`PREVIEW_BASE = ''`.

Stand:
- [x] Rahmen, Link-Helfer, Text-Overrides, `PageShell`
- [x] **EmpCo Audit** (Pilot, Figma „Entwurf B") — `/de|en/lavender/empco-audit/`.
      Neue Bausteine: `ProductHead`, `MediaGallery`, `Breadcrumb`, `CheckItem`,
      `AnchorTabs` (haftend), `SectionHeader`, `FactsBand`, `IconCard`, `SpecItem`,
      `FaqList`, `FormField`/`ConsentCheckbox`, `ComparisonTable`; `Statement layout="feature"`;
      `BrandStar` `product` | `facts` | `statementRight`; `TopNav sections={[]}` (Pille rechts).
- [x] **iKnow** — `/de|en/lavender/iknow/`. Neu: `ImageText` (16:9-Video oder Bild neben
      Titel und Text, Video spielt nur im Sichtbereich und nicht bei reduzierter Bewegung);
      `SectionHeader leadIn`; `MediaGallery aspectClassName`; `ClosingBlock id` (Reiter „Kontakt").
      Abweichung von Figma: Der Bildschirm-Rundgang (6 Screenshots) hat Vorschaubilder wie
      die Produktgalerie; Figma zeigt nur das erste Bild ohne Steuerung.
- [x] **Analytics Agent** — `/de|en/lavender/analytics-agent/`. Gleicher Aufbau wie iKnow;
      Zitat-Abschnitt als gemeinsamer Baustein `QuoteIntro` (auch auf iKnow), Bilder statt
      Videos in `ImageText`. Abweichung wie bei iKnow: Vorschaubilder unter dem Rundgang.
- [x] **User Journey Explorer** — `/de|en/lavender/icu-user-journey-explorer/`. Neu: `FaqSection`
      (auch auf EmpCo); Ankerleiste und Alt-Texte, die live fest auf Englisch stehen, als
      `lavender.icu.*`-Schlüssel (DE nach `docs/i18n-luecken.md` §3). Zweites Galeriebild ist ein
      Standbild aus `ic_layers.mov` (`public/images/icu-layers.jpg`; `public/assets/` ist per `.gitignore` ausgeschlossen), wie in Figma.
      Mitkorrigiert: `Statement` (Band) mit Trim, FAQ-Zeile auf Tablet/Mobil 74 px und Antwort
      ohne rechten Abstand, FAQ-Abstand Titel→Liste auf Mobil 32 px.
- [x] **Intelligentic Search** — `/de|en/lavender/intelligentic-search/`. Amazon-Zitat wörtlich
      (englisch auf beiden Sprachen, Quelle verlinkt wie live); `QuoteIntro` mit Quellen-Link und
      Zeilenumbrüchen; `LoopVideo` (Architektur-Video); `ComparisonTable icons` (Häkchen/Minus).
      Zweites Galeriebild: Standbild aus `ICS_Image_Search.mp4` (`public/images/is-image-search.jpg`).
      Mitkorrigiert: Tabellenkopf in der H3-Stufe und mit 12 px Abstand oben (Tablet/Mobil, auch EmpCo).
- [x] **KI-Workshop** — `/de|en/lavender/ai-workshop/`. Die Live-Seite ist nur deutsch und fest
      verdrahtet; die Vorschau nutzt neue `workshop.*`-Schlüssel (DE in „du", EN = Entwurf aus
      `docs/i18n-luecken.md` §2, wie in Figma). Neu: `ProductHead media` (Experten-Bühne statt
      Galerie), `Badge`, `ConsentCheckbox value`. Formular `ai-workshop` wie live (gleiche Feldnamen,
      Terminwert bleibt „Individuellen Termin buchen"); Danke-Seite jetzt in der Seitensprache.
- [x] **Campaign Parameter Tool** — `/de|en/lavender/campaign-parameter-tool/`. Kaufbox mit
      Preisstufen-Umschalter (`SegmentedControl`) und `PriceTag`; `PricingCard`, `ReviewCard`,
      `TextAreaField`, `Badge tone`, `ComparisonTable firstColumn="number"`. Testzugang/Demo als
      `TrialModal` (Radix Dialog: Fokusfalle, Escape, Scroll-Sperre; scrollt auf kleinen Bildschirmen,
      mobil 16 px Innenabstand, damit reCAPTCHA passt). Gleiches Netlify-Formular „trial" wie live,
      gesendet an `/__forms.html` (live: `/`, das per 301 nach `/de/` umleitet — prüfen).
      Abschnitte Use Cases, Why now und Demo-CTA der Live-Seite sind in Figma nicht vorgesehen.
- [x] **Privacy-led AI** — `/de|en/lavender/privacy-led-ai/`. Prinzip-Seite (Hero, Statement,
      ProcessAccordion). Live fest auf Englisch; neue `privacy.*`-Schlüssel (DE = Entwurf §1 wie in
      Figma, EN mit „organization" und Satzschreibung). `TopNav sectionsHref/activeSection`: die
      Abschnittslinks führen zur Startseite, „Privacy-led AI" gilt als aktiv.
- [x] Trim-Durchgang: Hero, CTABand, Footer (neue Stufe `lav-display` 40/56/80 mit Laufweite),
      ProcessAccordion/ProcessRow und ProductTeaser auf die Figma-Stufen und -Abstände gebracht —
      Startseite und Unterseiten jetzt auf 0–4 px genau (vorher bis +90 px).
- [x] **Kontakt, Danke, 404** — `/de|en/lavender/contact/`, `…/thank-you/`, `…/404/`. Kontakt: Hero
      nur mit Titel, Adressspalte neben dem Netlify-Formular „contact" (Felder ohne Sternchen).
      Danke/404: Hero mit Button zur Startseite. Die Danke-Seite prüft live wieder den Formular-
      Erfolg (nur in der Vorschau immer sichtbar). `Hero` bricht `\n` jetzt auf allen Breiten um.
- [x] **Impressum, Datenschutzerklärung, Neuigkeiten** — `…/imprint/`, `…/privacy-policy/` (neue
      Seite; Adresse am 02.10.2026 bestätigt), `…/whats-new/`. Neu: `SplitBlock` (H2 links, Inhalt rechts, Linie oben)
      und `NewsEntry`. Der Datenschutzteil des Live-Impressums ist jetzt eigene Seite; die sechs
      Dienste stehen als FAQ-Akkordeon (`FaqList` nimmt jetzt auch Links in der Antwort). DE in „du",
      TMG → DDG; EN-Dienste-Texte bleiben englisch wie im Code (Figma-EN zeigt sie deutsch).
      Footer-Link „Datenschutz" zeigt auf die neue Seite. Leere Aktionsrahmen der Figma-Heroes
      (Kontakt, Impressum, Datenschutz, Neuigkeiten) sind im Code weggelassen.

### Phase 2 — Shell vereinheitlichen
Seit dem Vorschau-Beschluss (2026-10-01) gilt das für die Vorschauseiten, nicht für die
Live-Seiten — die bekommen die neue Hülle mit ihrem Livegang.
- [x] Eine Hülle für alle Vorschauseiten: `PageShell nav={…} footer={…}` ordnet Sprungmarke
      („Zum Inhalt springen"), `<header>` (TopNav), `<main id="main">` und Footer an — jede Seite
      hat dieselben Landmarken, der Footer steht nie in `main`.
- [x] Burger-Menü als Disclosure statt ARIA-Menü: Enter/Leertaste öffnen es auch auf Desktop,
      Escape schließt und gibt den Fokus zurück, Wegtabben/Klick daneben schließt; auf Touch
      44 × 44 px Trefferfläche um das 22/24-px-Icon (wie Figma). Abschnitts-Dropdown der
      kompakten Pille ebenso. LinkedIn-Label übersetzt.
- [x] Schon vorher erledigt: Tablet nur Burger, globaler Fokusring, Schlussstern 70 %.
- [x] Haftende Ankerleiste in Navy (Idee/Entscheidung 02.10.2026, Figma zuerst): sobald die Reiter
      oben haften, wird die Leiste Navy (weiße Reiter, keine Linie). Desktop: Die Menüleiste der
      Produktseiten bleibt groß, bis die Reiter haften, und wird erst dann zur Pille, die rechts in
      der Navy-Leiste aufgeht (`useAnchorTabsStuck` in AnchorTabs.tsx, gelesen von TopNav).
      Tablet/Mobil (nachgeschärft, zu viel Höhe): eine 56-px-Zeile statt Pille + Reiter — die
      Pille weicht „Kontakt aufnehmen“ + Burger (Tablet) bzw. dem Burger (Mobil) an derselben
      Stelle; die Pille bleibt unsichtbar im Layout, damit nichts springt. Reiter haften überall
      bei top 0 und enden vor der Navigation. Haftende Zeilen 56 / 80 px wie Figma.
      Startseite und Infoseiten unverändert (schrumpfen nach 80 px). Burger: „Privacy-led AI“.
- [x] Kaufbox: Primary- und Outline-Button als Gruppe mit 16 statt 32 px (`ButtonStack`, Figma-Gruppe
      „Aktionen“, space/16; Entscheidung 02.10.2026, zuerst 24), zum übrigen Inhalt bleiben 32 px.
- [x] Produktkopf ohne Eyebrow „Produkt“ über dem Namen — der Breadcrumb „Produkte › …“ ordnet schon
      ein (02.10.2026). Die Teaser „Weitere Produkte“ behalten ihr Eyebrow.
- [x] CPT ohne Preis-Section und Reiter „Preise“ — Stufen und Preis stehen schon in der Kaufbox
      (Idee Dennis, 02.10.2026). Den Text von `ct.pricing.description` erklärt jetzt der neue
      Baustein `InfoTip` hinter „1 Parameter-Raum“ (Info-Icon, Karte per Klick; Escape/Klick
      daneben schließt). Neu: `lavender.common.moreInfo` als Name des Icon-Buttons.
- [x] Labels über Kontaktdaten (Footer, Kontaktseite) als Eyebrow „ANFRAGEN/TELEFON“ statt
      „(Anfragen)/(Telefon)“ (Entscheidung Dennis, 02.10.2026; Override in lavender-overrides.ts,
      live unverändert). Damit steht im Impressum „Telefon: …“ statt „(Telefon): …“. Eyebrow nutzt
      jetzt `lav-small` (Text-Trim wie Figma, vorher 21 statt 10 px hoch). E-Mail auf der
      Kontaktseite ohne Silbentrennung, bricht bei 1024–1090 px nach dem „@“.
- [x] Am Footer verlässt die eingebettete Menüleiste mit der Ankerleiste den Bildschirm
      (`--anchor-push` aus AnchorTabs, TopNav folgt pixelgenau; Hinweis Dennis, 02.10.2026).
- [x] Formularzustände wie Figma (FormField State=focus|error): Fokus = 2 px Navy-Rand (der
      globale Ring gilt nur noch für Links, Knöpfe, Checkboxen), Fehler = 2 px `lav-error`
      (#b3433d, 5,55 : 1) + Meldung statt Hinweis. `ValidatedForm` prüft beim Absenden mit den
      Browser-Regeln (Pflicht, E-Mail, URL) ohne Browser-Blasen, setzt `aria-invalid`/
      `aria-describedby` und fokussiert das erste fehlerhafte Feld; `FormError` zeigt reCAPTCHA-
      und Sendefehler über dem Knopf (`submitNetlifyForm` hat dafür `onError`, live bleibt
      `alert()`). Texte: `form.error.*` (`docs/i18n-luecken.md` §12, freigegeben).

### Phase 3 — Seiten migrieren (je eine pro PR)
Durch den Vorschau-Bereich ersetzt: Jede Seite ist unter `/lavender/` fertig und zieht beim
Livegang nach oben (siehe „Livegang einer Seite" oben). Die Liste bleibt als Reihenfolge.
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

## Fallstricke, die uns schon Zeit gekostet haben

- **`!important` in `@layer base` schlägt jede Utility.** `h1 { font-size: 40px !important }`
  aus dem alten Design hat die Lavender-Hero-Headline seit dem ersten Build auf
  40px/700 statt 80px/500 gehalten — unauffällig, weil h2/h3 korrekt blieben.
  Die Regel ist jetzt auf `h1:not(.lavender-page h1)` eingegrenzt. Merke: eine
  `!important`-Deklaration gewinnt gegen *alle* normalen Deklarationen, egal in
  welchem Layer und in welcher Reihenfolge.
- **`cn()` verwirft `leading-*` vor `text-*`.** tailwind-merge behandelt
  font-size als konfliktierend mit line-height, entfernt also ein früher
  gelistetes `leading-[1.1]`. In `cn()` gehört das Leading **hinter** die
  Größenklassen. (Traf `FeatureBlock` und `ServicesCarousel`.)
- **Utilities prüft man am Element, nicht am Stylesheet.** `document.styleSheets`
  zu durchlaufen führt in die Irre; ein Probe-Element mit der fraglichen Klasse
  und `getComputedStyle` beantwortet die Frage in einem Schritt.

## Offene Aufräumpunkte (Follow-up, nicht dringend)
- `src/index.css` (alter, eingefrorener Snapshot) wird nicht mehr importiert → in einem
  Cleanup entfernen. Ebenso der tote Vite-Entry `src/main.tsx`.
- Kommentar in `EmpCoClusterPage.tsx` („precompiled Tailwind snapshot … utilities not in CSS")
  ist seit dem Live-Build **veraltet** — neue Utilities werden jetzt kompiliert.
