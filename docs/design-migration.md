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
      `AnchorTabs` (fix nach dem Hero), `SectionHeader`, `FactsBand`, `IconCard`, `SpecItem`,
      `FaqList`, `FormField`/`ConsentCheckbox`, `ComparisonTable`; `Statement layout="feature"`;
      `BrandStar` `product` | `facts` | `statementRight`; `TopNav` ohne Abschnittslinks (Pille rechts).
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
      Abschnittslinks führen zur Startseite, „Privacy-led AI" gilt als aktiv (entfallen 02.10.2026).
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

- [ ] **Startseite Nacht (Designstudie, 12.11.2026)** — `/de|en/lavender/nacht/`, neben der
      bisherigen Vorschau-Startseite zum Vergleichen. Gleiche Texte und Schlüssel wie
      `LavenderHome`, dunkle Seite (`PageShell surface="inverse"`) mit Sternenhimmel und Milchglas.
      Andere Bausteine, wo der Inhalt es verlangt: Leistungen als drei Reiter mit allen vier
      Leistungen offen (statt Karussell mit Aufklapp-Zeilen), Kundenstimmen als ein Zitat plus
      Auswahl aller sieben Namen (statt Slider), Vorgehen als drei offene Zeilen (statt Akkordeon).
      Reiter kommen aus `src/components/ui/tabs` (shadcn/Radix), nur das Verhalten.
      Neu, nur für diese Seite: `.lav-sky`, `.lav-glass`, Typostufe `.lav-mega` (44/72/112),
      `rounded-frame` (40 px), `public/images/hamburg-skyline.webp`.
      Hero ohne Glas (Doppelstern frei, folgt dem Zeiger leicht), dunkle Nav. Eigene Fußzeile
      `FooterNight` statt `ClosingBlock`: eine Schlusszeile, Kontaktzeile, Hamburg-Skyline als
      Abschluss. Reiter-Inhalte per `forceMount` im HTML (alle 12 Leistungen, alle 7 Zitate).
      Produktbilder ohne farbige Bühne: `public/images/nacht-*.webp`.
      Komponenten nach orchid.ai umgebaut (12.11.2026, Wunsch Dennis): ein Grundbaustein
      `FeatureRow` (Textspalte neben großem Glasfeld, Seiten abwechselnd; der Stern des
      Abschnitts liegt hinter dem Feld). Leistungen = je Feld eine Zeile, die vier Leistungen als
      Liste, die gewählte zeigt ihre Beschreibung als Karte im Feld. Produkte = dieselbe Zeile
      mit Screenshot. Kundenstimmen = Firmenleiste, die von selbst weiterläuft (hält bei Zeiger/
      Fokus, stoppt nach Auswahl, nicht bei reduzierter Bewegung), ein Zitat darunter. Vorgehen =
      drei hohe Glasfelder. Neu: `.lav-glass-clear`, `.lav-progress-run`.
      Variante `/de|en/lavender/nacht-hamburg/` (`HomeNightLavender city="hero"`): die Glasstadt
      steht im Hero statt am Seitenende, Text zentriert darüber; der Leitstern startet über der
      Stadt und steigt beim Scrollen nach oben, am Ende gibt es keine Landung. Zum Vergleichen.
      Kopfzeile `NightNav` statt `TopNav` (Wunsch Dennis, 12.11.2026): kein Hintergrund, Logo
      links (blendet nach dem Seitenanfang aus), „Kontakt aufnehmen“ mittig, Menü rechts. Menü =
      shadcn `Sheet` von rechts als helle, abgerundete Fläche mit großen nummerierten Abschnitts-
      links, darunter alle Produktseiten, Kontakt, Rechtliches, Sprachwahl. Keine AnchorTabs mehr
      auf diesen Seiten (deren Navy-Leiste fuhr beim Scrollen ein). Hintergrundsterne bleiben
      Punkte (max. 1,7 px), der Leitstern ist größer.
      Himmel als eine feste Canvas hinter der Seite (`nightSky.ts`, ohne React): kleine Sterne
      als feste Punkte, die nur in der Helligkeit flackern (kein Zoom, keine Bewegung beim
      Scrollen; Entscheidung Dennis 12.11.2026, das Hineinfliegen war zu viel). Einzig der
      Leitstern (Doppelstern) bewegt sich: Er folgt dem Zeiger mit Verzögerung hinter dem Inhalt;
      im Hero der Fassung „unten“ ist er groß und neigt sich nur. Die Sterne der Abschnitte
      stehen fest hinter ihren Glasfeldern (`StarField`). Bei reduzierter Bewegung steht alles.
      Funkeln: alle paar Sekunden glitzert ein zufälliger Stern irgendwo im Bild kurz auf (feines
      Kreuz, 3 bis 9 px), nie mehr als zwei gleichzeitig. Knöpfe der Nachtseiten: Hover wechselt
      die Farbe (Blau ↔ Weiß, Kontur füllt sich), Druck staucht auf 96 %; im Hero nur noch ein
      Knopf („Unsere Leistungen ansehen“, weiß).
      Variante „Hamburg oben“ (`/lavender/nacht-hamburg/`): der Hero ist genau einen Bildschirm
      groß und bleibt stehen (sticky); darüber schiebt sich beim Scrollen die **Tag-Ebene**
      (`DayLayer`, `data-surface="light"`), ein helles Blatt mit allen Inhalten. Am Ende rollt
      das Blatt oben hinaus und dieselbe Bühne (Himmel, Stadt) steht wieder da, jetzt mit dem
      Schlusstext statt dem Hero-Text: `ClosingStage` ist der `<footer>`, liegt per negativem
      Rand über dem letzten Bildschirm und klebt am unteren Rand (sticky). Getauscht wird, während
      das Blatt den Bildschirm ganz bedeckt (`closing` in HomeNightLavender). Das Logo bleibt beim
      Scrollen stehen und wird auf dem Blatt dunkel.
      Stand 2026-11-12 (Rückmeldung Dennis): Auf dem Blatt sind Leistungen, Kundenstimmen und
      „So arbeiten wir“ die Komponenten der heutigen Lavender-Startseite (`ServicesCarousel`,
      `TestimonialSlider`, `ProcessAccordion`); aus der Studie bleiben Statement, Produktzeilen
      und Privacy-Led. Der Footer (`ClosingStage`) ist wie `Footer` aufgebaut (Zeile links,
      Kontakt rechts), darunter die
      Skyline. Das Blatt hat unten runde Ecken und rollt am Ende ganz hinaus. Die Leiste mit
      Impressum, Datenschutz, LinkedIn und „Nach oben“ ist ein normaler Block ganz am
      Seitenende: Auf den letzten Pixeln schiebt sie die Skyline nach oben und erscheint
      darunter; der Schlusstext bleibt dabei stehen.
      Zeichenlast (Rückmeldung: Inhalte erschienen beim Scrollen verspätet): Die Studie nutzt
      eigene Sternbilder in Anzeigegröße (`nacht-stern-*.webp`, 1200 px, statt der rund
      3000 px großen PNGs mit etwa 36 MB je Bild im Speicher), auf dem Blatt vorab
      weichgezeichnete Kopien (`-weich.webp`) statt CSS-Filter, kurze Schatten, keine
      `loading="lazy"`-Bilder; Bühne und Himmel werden nicht gezeichnet, solange das Blatt
      sie verdeckt. Auf dem Blatt bekommt die Navigation eine dunkle Leiste von Logo bis
      Menü; neben dem Menü-Icon steht der aktuelle Abschnitt (Leistungen, Produkte, Vorgehen,
      Privacy-led AI). Hover ist ein System (globals.css): Das Licht des Doppelsterns wandert in das
      Element unter dem Zeiger. Flächen (Knöpfe, runde Icon-Knöpfe, Logo, Pfeile und Pillen
      der Lavender-Bausteine) füllen sich mit dem Verlauf (`.lav-star-hover`), Text (Links,
      Labels, Akkordeon-Titel) nimmt ihn als Schriftfarbe an (`.lav-star-text`); derselbe
      Verlauf markiert im Menü den aktuellen Abschnitt. Leitstern und Stadtlicht erlöschen
      über allem Klickbaren. Das Menü passt ohne Scrollen auf einen Bildschirm.
      „Unsere Leistungen“: Aus zehn Varianten hat Dennis am 2026-11-12 „Tabs mit Sternfeld“
      gewählt (statt des Karussells): je Feld ein Tab, links die vier Leistungen mit
      Beschreibung, rechts groß der Stern des Felds. Die Arbeitsseite mit den zehn Varianten
      ist wieder entfernt (Commit 095d6a6 enthält sie).
      Kundenstimmen: eigene Fassung statt `TestimonialSlider`, weil dessen Zitate in
      Überschriftengröße über zwei Bildschirme liefen: ein Zitat zur Zeit in Lesegröße
      (24 px) auf einer hellen Lila-Fläche, mit Zähler und Pfeilen; passt auf einen Bildschirm.
      Navigation der übrigen Vorschauseiten (2026-11-13): Alle Lavender-Unterseiten nutzen
      jetzt `NightNav` statt `TopNav` (`bar="always"`: die dunkle Leiste von Anfang an). Seiten
      mit Abschnitten geben sie als `sections` mit: Die Leiste nennt den aktuellen Abschnitt,
      das Menü listet sie als große Links. Die `AnchorTabs`-Zeile entfällt dort; `TopNav` und
      `AnchorTabs` nutzt nur noch die bisherige Startseite `LavenderHome`.
      Kundenlogos: `LogoCarousel` steht auf dem hellen Blatt direkt unter dem Statement (die
      Logodateien brauchen hellen Grund). Produkte und Privacy-Led zeigen die Bilder der
      Lavender-Startseite (`lavender-*.png`, `privacy-led.jpg`) statt eigener Screenshots. Neue Tokens: `--text-small`, `--radius-frame-inner`,
      `--container-measure(-lead|-wide)` für Zeilenlängen.
      Stand 2026-11-13 abends: Alle Vorschauseiten enden mit `NightClosing` / `NightFooter`
      (NightFooter.tsx: Schlusszeile, Glas-Skyline, Leiste mit „Based in Hamburg.“, Impressum,
      Datenschutz, LinkedIn, Nach oben) statt `ClosingBlock` / `Footer`. Sprünge zu Abschnitten
      laufen über `glide.ts` (folgt dem Ziel, auch wenn sich die Seite verschiebt). Die Skyline
      ist eine neue Fassung (FLORA, FLUX 3; 2600 × 1114; Stand 13.11. nachmittags: in einem Zug aus einer
      einheitlich weichgezeichneten Vorlage gerendert und unverändert übernommen. Merke: Vorlagen
      aus ausgeschnittenen Teilen übernimmt FLUX samt Schnittkanten, das Ergebnis wirkt wie Patchwork): von West nach Ost Köhlbrandbrücke,
      Landungsbrücken, dahinter die Tanzenden Türme, Fernsehturm, Rickmer Rickmers, Michel,
      Elbphilharmonie, dahinter St. Nikolai, Rathaus, dahinter St. Petri, Speicherstadt. Die
      Gebäude überlappen sich wieder in der Tiefe. Im Hero tritt die Stadt nur direkt hinter dem
      Text zurück (`textHaze.ts`: weiche Löcher um jede Textzeile und den Knopf statt eines großen
      Ovals). Das Stadtlicht ist rund; das beleuchtete Bild ist kräftig eingefärbt (Blau und Lila in
      schrägen Bändern, sodass ein Lichtfleck beide enthält) und hat einen eingerechneten Schein
      über die Kanten (kein `mix-blend-mode`, nur das Bild selbst). Alle Seiten enden im selben Bild (`ClosingText`: Schlusszeile
      mittig, Stadt am unteren Rand, Leiste mit Textlinks darunter); beleuchtet = dieselbe Fassung in
      Blau/Lila eingefärbt). Durchsicht mit drei Skill-Sammlungen (taste-skill, impeccable,
      Emil Kowalski): Fokusring auf dunklem Grund, einheitliche Außenkanten, Abstände in den
      Textblöcken (16/24/32), Leistungen mit fester Höhe beim Tab-Wechsel, Autor neben dem
      Zitat, Hero-Auftakt beim Laden, animierte Druck- und Farbwechsel, Verhalten auf Touch.
      Das Stadtlicht ist seitdem ein kleines rundes Fenster auf das beleuchtete Bild, das nur
      verschoben, skaliert und ein-/ausgeblendet wird (vorher: Maske und weichgezeichneter
      Verlauf über die ganze Skyline, bei jeder Zeigerbewegung neu gezeichnet).
      Prüfung auf sieben Bildschirmgrößen (360 bis 1920, de/en): Kundenstimmen unter 1280
      gestapelt, Menü-Links zweispaltig mit größeren Tippflächen, Logo-Link 44 px hoch. Im Footer stehen keine Kontaktdaten mehr (Kontaktseite). Die durchgehend dunkle Variante `/lavender/nacht/` ist unverändert der
      frühere Stand. Die Bausteine sind dieselben wie auf dem Nachthimmel: ihre
      Farben kommen aus `lav-ink` und `lav-ground` (globals.css), die je Fläche getauscht werden;
      `.lav-glass`/`.lav-glass-clear` haben eine helle Fassung. Der Leitstern wird auf der Ebene
      groß (halbe Bildschirmbreite) und liegt dort auf einer eigenen Leinwand über dem Weiß und
      hinter dem Inhalt; im Hero bleibt er klein. Die Ebene hat bewusst kein `overflow` und
      keine `backdrop-filter`: beides zusammen ließ die Seite auf echten Grafikkarten ruckeln
      und teils abreißen. Die Glasfelder zeichnen dort ihren eigenen Stern einmalig weich
      (`::before`), der Himmel beschneidet den Leitstern selbst und zeichnet nur bei Änderung. Die Stadt ist dafür jetzt ein Bildpaar mit
      transparentem Grund (`hamburg-glas-*.webp`), ohne `mix-blend-mode`: sie darf damit in
      sticky/transformierten Eltern stehen. NightNav schaltet auf der Ebene Menü-Icon und
      Hover auf Navy (`data-ground` am Header).
      Abschluss: `HamburgGlass` statt Strichzeichnung: Hamburg als Milchglas-Skulptur, zwei
      deckungsgleiche Bilder (`hamburg-glas-dunkel/-licht.webp`), in Ruhe dunkel, das Licht folgt
      dem Zeiger; ohne Zeiger (Touch) wandert es von Wahrzeichen zu Wahrzeichen. Der Leitstern
      folgt unten dem Zeiger und schrumpft über der Stadt weg, dort übernimmt das Licht im Glas.
      Bewusste Ausnahme von „Licht und Linie“ (Entscheidung Dennis, 12.11.2026); Footer immer dunkel.
      Bewegung (Durchsicht 13.11.2026): Kundenlogos als eine Reihe, die mit der Seite läuft
      (`LogoStream`: nur `transform`, an die Scrollposition gebunden, steht bei reduzierter
      Bewegung als ruhiger Block; oben und unten gleich viel Luft, je eine halbe
      Sektions-Polsterung zusätzlich zu der der Nachbarn). Hover nur hinter `(hover: hover) and (pointer: fine)`,
      Tastaturfokus überall. Menü und Schleier setzen beim schnellen Schließen/Öffnen dort
      fort, wo sie stehen (`--lav-menu-from`, `--lav-veil-from`). Ankerlinks und „Nach oben“
      gleiten über `glide.ts`, von der Tastatur aus springen sie. Das Stadtlicht läuft auf
      60 und 120 Hz gleich schnell. Die Skyline wird mit der Seite vorgeladen (`preload`).
      Offen: nicht in Figma; Kundenlogos fehlen (Dateien sind für hellen Grund gemacht);
      EN nicht geprüft; Intro (Stern entsteht) aus dem Prototyp nicht übernommen; Leistung der
      Canvas auf schwachen Geräten nicht gemessen.
      Durchsicht vor dem PR (13.11.2026): `NightNav` mit `bar="always"` steht schon im
      statischen HTML (vorher stand das weiße Logo bis zum Laden des Skripts auf hellem Grund).
      Die Rechtsleiste weicht dem schwebenden Usercentrics-Knopf aus (44 px / 24 px Abstand unter
      768 px, 64 px / 40 px darüber, im Usercentrics-Admin eingestellt): auf dem Handy rückt die
      Zeile nach oben (`--lav-strip-h` 140 statt 84 px, gilt auch für Skyline und Schlussbühne),
      ab 640 px bleibt rechts Platz (`--lav-uc-corner`), „Nach oben“ unter 1024 px nur als Pfeil.
      Skyline-Skript und Original-Rendering liegen in `scripts/skyline/` (README: Aufruf und die
      Stellen, die beim Austausch mitmüssen).
      Arbeitsseiten entfernt (Entscheidung Dennis, 13.11.2026): `/lavender/nacht/` (die durchgehend
      dunkle Fassung) mit dem `city='end'`-Pfad in `HomeNightLavender` (Hero, Leistungs-, Produkt-,
      Kundenstimmen-, Vorgehens- und Privacy-Zeilen, `FeatureRow`, `StarField`, Schluss mit Stadt)
      und `nightSky.ts` (großer Hero-Stern, Landung über der Stadt am Seitenende), dazu die
      CSS-Klassen `.lav-mega`, `.lav-glass(-clear)`, `.lav-progress-run` und sechs Bilder
      (`nacht-empco|iknow|analytics-agent.webp`, `nacht-stern-*-weich.webp`). Ebenso
      `/lavender/bausteine/` mit den Bibliotheksbausteinen (Magic UI, Aceternity), ihren Paketen
      (`motion`, `@tabler/icons-react`, `@radix-ui/react-icons`), `src/lib/utils.ts` und ihren
      Animationen. Die neue Startseite bleibt vorerst Vorschau unter `/lavender/nacht-hamburg/`.
      Neue Vorschau-Startseite (Entscheidung Dennis, 13.11.2026): `/<lang>/lavender/` zeigt jetzt
      `HomeNightLavender` (Metadaten und JSON-LD der Seite bleiben), `LavenderHome` ist entfernt.
      `/lavender/nacht-hamburg/` leitet per 301 auf `/lavender/` (`public/_redirects`). Damit führen
      Logo und Menü-Abschnittslinks der Unterseiten auf die neue Startseite. Die echte Startseite `/`
      bleibt bis zum Umzug unverändert. Nur von `LavenderHome` genutzte Bausteine (u. a. `TopNav`,
      `AnchorTabs`, `ServicesCarousel`, `TestimonialSlider`, `LogoCarousel`, `ClosingBlock`) sind noch
      im Design-System und können beim Aufräumen weg.

### Phase 2 — Shell vereinheitlichen
Seit dem Vorschau-Beschluss (2026-10-01) gilt das für die Vorschauseiten, nicht für die
Live-Seiten — die bekommen die neue Hülle mit ihrem Livegang.
- [x] Eine Hülle für alle Vorschauseiten: `PageShell nav={…} footer={…}` ordnet Sprungmarke
      („Zum Inhalt springen"), `<header>` (TopNav), `<main id="main">` und Footer an — jede Seite
      hat dieselben Landmarken, der Footer steht nie in `main`.
- [x] Burger-Menü als Disclosure statt ARIA-Menü: Enter/Leertaste öffnen es auch auf Desktop,
      Escape schließt und gibt den Fokus zurück, Wegtabben/Klick daneben schließt; auf Touch
      44 × 44 px Trefferfläche um das 22/24-px-Icon (wie Figma). Abschnitts-Dropdown der
      kompakten Pille ebenso (entfallen 02.10.2026). LinkedIn-Label übersetzt.
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
- [x] CPT „Mehrwerte“: 24 statt 40 px zwischen den Karten auch auf Desktop (Figma von Dennis). IconCard-
      Text trennt Wörter ab 14 Buchstaben — bei 1250 px liefen „Kampagnenbezeichnungen“ und
      „Entscheidungsgrundlagen“ über den Kartenrand.
- [x] CPT ohne Preis-Section und Reiter „Preise“ — Stufen und Preis stehen schon in der Kaufbox
      (Idee Dennis, 02.10.2026). Den Text von `ct.pricing.description` erklärt jetzt der neue
      Baustein `InfoTip` hinter „1 Parameter-Raum“ (Info-Icon, Karte per Klick; Escape/Klick
      daneben schließt). Neu: `lavender.common.moreInfo` als Name des Icon-Buttons.
- [x] Labels über Kontaktdaten (Footer, Kontaktseite) als Eyebrow „ANFRAGEN/TELEFON“ statt
      „(Anfragen)/(Telefon)“ (Entscheidung Dennis, 02.10.2026; Override in lavender-overrides.ts,
      live unverändert). Damit steht im Impressum „Telefon: …“ statt „(Telefon): …“. Eyebrow nutzt
      jetzt `lav-small` (Text-Trim wie Figma, vorher 21 statt 10 px hoch). E-Mail auf der
      Kontaktseite ohne Silbentrennung, bricht bei 1024–1090 px nach dem „@“.
- [x] Überlauf zwischen 1024 und 1250 px (Scan aller Vorschau-Seiten DE/EN, 390–1440 px):
      `.lav-hyphenate` (Regel der Überschriften: Wörter ab 14 Buchstaben) für IconCard, SpecItem,
      EmpCo-Verbotsliste und Datenschutz-Tabelle; CPT-Mehrwerte 4 und EmpCo-Schritte 5 nebeneinander
      erst ab 1200 px (`min-[75rem]`), darunter 2 bzw. 3 (02.10.2026).
- [x] Hinweise Dennis (02.10.2026): Intelligentic Search „Funktionsweise“ → „So funktioniert's“
      (wie iKnow/CPT, Override); alle Unterseiten TopNav ohne Abschnittslinks — ohne AnchorTabs nach
      80 px kompakt rechts; BurgerMenu mit Kopfzeile Home | Neuigkeiten und eigener Gruppe
      „Prinzipien“/„Principles“ (Privacy-led AI), neuer Key `burgerMenu.principles`.
- [x] „Buche dein Erstgespräch“ öffnet überall das `ConsultModal` statt der Kontaktseite (9 Seiten,
      ClosingBlock und Kaufboxen): Netlify-Formular „contact“ + Feld `topic` (in public/__forms.html
      ergänzt), auf Produktseiten mit dem Produkt vorausgefüllt. Neuer Key `lavender.consult.topic`.
- [x] Privacy-led AI als dunkle Prinzipien-Seite (Entwurf B, abgestimmt 02.10.2026): `PageShell
      surface="inverse"`, helle Nav (`TopNav surface="light"`, schwarzes Logo, helles BurgerMenu),
      Hero mit Eyebrow „Prinzipien“ und Mint-Stern (`BrandStar principles`, nur Desktop),
      Problem zweispaltig (Lösung in Blau), vier `PrincipleCard`s — ab 1200 px 2×2 Schachbrett,
      darunter einzeln abwechselnd. Texte unverändert (privacy.*). Figma DE/EN × 3 Breiten, alte
      Frames als „Stand vor Prinzipien-Seite“ darunter.
- [x] Startseite wie die Produktseiten (Idee Dennis, 02.10.2026): keine Abschnittslinks mehr in
      der TopNav; AnchorTabs unter dem Kunden-Carousel (Leistungen, Produkte, Vorgehen,
      Privacy-led AI — Labels der früheren Nav-Links), die beim Scrollen haften, die Nav dockt
      ein. ServicesCarousel/ProductShowcase/ProcessAccordion nehmen dafür `className`
      (ANCHOR_SCROLL_MARGIN). Der Abschnitts-Pfad der TopNav (Links, mittige Pille, Dropdown,
      Props `sections`/`sectionsHref`/`activeSection`) ist entfernt; TopNav nimmt nur noch
      `logoHref` und `surface`. Die Reiter der Startseite stehen wie bei den Produktseiten als
      `tabs` in LavenderHome (`HOME_NAV_SECTIONS`/`NavSection` entfallen).
- [x] Kompakte Desktop-Pille ohne Abschnitte (beginnt mit dem CTA): links 8 statt 16 px, wie
      oben/unten — der CTA sitzt konzentrisch (Dennis, 02.10.2026). Startseite unverändert.
- [x] Abstände (Dennis, 02.10.2026): `--section-pad-v` Desktop 64 → 80, zwischen zwei Bausteinen
      also 160 (Tablet 112, Mobil 96 unverändert). Hero, ProductHead, Statement-Button, FactsBand
      (vorher 96) und LogoCarousel hängen jetzt an derselben Variable; Logo-Felder so hoch wie das
      größte erlaubte Logo (44/36/28), damit Hero → Logos sichtbar 160 sind. Großes EmpCo-Statement
      bleibt bewusst höher.
- [x] Am Footer verlässt die eingebettete Menüleiste mit der Ankerleiste den Bildschirm
      (`--anchor-push` aus AnchorTabs, TopNav folgt pixelgenau; Hinweis Dennis, 02.10.2026).
- [x] Ankerleiste nur noch fix (Idee Dennis, 02.10.2026): AnchorTabs nimmt keinen Platz mehr im
      Seitenfluss ein, wo sie steht, bleibt nur eine Marke (Ende Hero/ProductHead, auf der
      Startseite nach den Logos). Ist die Marke oben vorbei, fährt die Navy-Leiste oben ein und
      die Nav dockt ein (80 / 56 px); davor läuft die Nav wie gehabt. ProductHead → erster
      Baustein damit 160 statt Leiste dazwischen. Am Footer schiebt `main` die Leiste hinaus.
      Tab in die versteckte Leiste scrollt zur Marke, damit sie mit der Nav erscheint.
      Figma: statische Leisten aus allen Seiten-Frames entfernt, Beschreibung am Baustein.
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
