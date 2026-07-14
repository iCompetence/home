# Kriterien: Auffindbarkeit der Content-Pages für Suchmaschinen & LLMs

Der Inhalt der neuen Content-Pages muss die folgenden Kriterien erfüllen:

1. **SEO-konforme Struktur:** Die Inhalte müssen strukturell optimal für SEO aufbereitet sein. Dazu zählt auch, dass SEO-relevante Keywords genutzt werden.
2. **LLM-Content-Konformität:** Die unten stehenden Kriterien/Strategien müssen so gut/weit es geht erfüllt werden — damit die Inhalte nicht nur bei Suchmaschinen schnell gefunden werden, sondern vor allem auch von LLMs.
3. **Lesbarkeit für Menschen:** Struktur und Inhalte müssen dennoch ansprechend und lesbar für Menschen sein.

## Strategien & Maßnahmen (LLM-Optimierung)

| Strategie | Konkrete Maßnahme | Ziel / LLM-Nutzen |
|---|---|---|
| Präzision & Direktheit (Answer-First) | Die direkteste Antwort auf die Kernfrage (Suchintention) im ersten Absatz platzieren (Fettung nutzen). | Ermöglicht LLMs die schnelle Extraktion prägnanter, zusammenfassbarer Informationen für SGE-Antworten. |
| Präzision & Direktheit (keine Umschweife) | Überflüssige Einleitungen und Füllmaterial vermeiden; auf Fakten konzentrieren. | Reduziert die Verarbeitungslast und erhöht die Wahrscheinlichkeit, dass der Kerninhalt korrekt übernommen wird. |
| Strukturierte Daten (Listen/Tabellen) | Prozessschritte, Spezifikationen oder Vergleiche in HTML-Listen (`<ul>`, `<ol>`) oder Tabellen (`<table>`) umwandeln. | Ideale Struktur zur direkten Übernahme in KI-Antworten und Vergleichsformate. |
| Strukturierte Daten (Q&A) | Frage-Antwort-Format mit klaren H3-/H4-Überschriften (z. B. „Wann tritt die EmpCo in Kraft?") und schema.org-Auszeichnung nutzen. | Direkter Input für FAQ-Snippets und generative Antworten auf explizite Nutzerfragen. |
| Semantische Auszeichnung (Überschriften) | H2- und H3-Überschriften spezifisch, inhaltsbeschreibend und logisch hierarchisch halten. | LLMs nutzen die H-Struktur zur Gliederung und Kontextualisierung des Textes. |
| Semantische Auszeichnung (Schema Markup) | Passendes, validiertes Schema Markup (z. B. Person, Organization, FAQPage) auf relevanten Seiten implementieren. | Signalisiert die Art des Inhalts an die KI und erhöht die Chance auf Rich-Snippet-Anzeige. |
| Interne Kohärenz (Terminologie) | Durchgängig konsistente Verwendung von Produktnamen und Fachbegriffen über die gesamte Website sichern. | Verhindert Verwirrung und stellt sicher, dass das LLM die korrekte Entität erfasst. |
| Interne Kohärenz (Verlinkung) | Begriffe/Entitäten, die an anderer Stelle ausführlich erklärt werden, explizit intern verlinken. | Zeigt dem LLM die thematische Tiefe und Autorität (E-E-A-T) der Website. |

## Was noch sichergestellt werden muss

- Sind die Inhalte wirklich von Google crawl- und lesbar?

Die aktuelle EmpCo-Audit-Tool-Seite (`/de/empco-audit/`) bietet eine gute Orientierung für die Erfüllung der oben genannten Kriterien.

---

## Technischer Ist-Zustand der EmpCo-Audit-Seite (dokumentiert aus dem Code)

So sind die Inhalte aktuell eingebettet — diese Mechanismen gelten auch für die neuen Cluster-Pages:

### Rendering & Crawlbarkeit (JS)

- **Static Export:** Die Site wird als statisches HTML exportiert (`output: 'export'` in next.config.js). Auch `'use client'`-Komponenten werden beim Build vorgerendert → Fließtext, Überschriften, Listen und Tabellen stehen **ohne JS-Ausführung** im HTML. Crawler und LLM-Bots, die kein JS ausführen, sehen den Inhalt trotzdem.
- **⚠️ Accordion-Caveat:** Die Accordion-Komponente rendert Antwort-Texte erst beim Aufklappen ins DOM. **Inhalte in Accordions (FAQ-Antworten, „EmpCo-Richtlinie erklärt"-Block) stehen NICHT im crawlbaren HTML** — nur die Fragen/Titel (H3). Kompensiert wird das über server-seitiges JSON-LD (s. u.). Konsequenz für neue Inhalte: Alles, was als sichtbarer Text crawlbar sein soll, muss außerhalb von Accordions liegen (normale Sektionen, Listen, Tabellen).
- **Consent-Banner (Usercentrics) & GTM:** liegen als Overlay über der Seite, blockieren aber nicht das HTML — Inhalt ist für Crawler unabhängig vom Consent im DOM.

### Strukturierte Daten (JSON-LD)

- **Pillar-Page:** `FAQPage`- und `HowTo`-Schema werden server-seitig in `app/[lang]/empco-audit/page.tsx` gerendert (stehen im statischen HTML) — nur auf der deutschen URL, weil der JSON-LD-Text deutsch ist.
- **Cluster-Pages:** je ein `FAQPage`-Schema pro Seite, gleiche Stelle (route-eigene `page.tsx`).
- **Google-Policy beachten:** JSON-LD-Text muss 1:1 dem sichtbaren Seiteninhalt entsprechen. Bei jeder Änderung an FAQ-Texten (i18n) muss das JSON-LD in der `page.tsx` mitgezogen werden — das ist aktuell ein manueller Sync.

### Meta, URLs & Indexierung

- **Meta pro Seite:** `title` + `description` je Sprache über `generateMetadata`; Keywords aus der Excel-Matrix in Title/Description/H1.
- **Canonical + hreflang:** über `src/lib/i18n-meta.ts` (`alternates()`): de/en + `x-default` → Deutsch. Die DE-only Cluster-Pages setzen Canonical + x-default manuell nur auf `de`.
- **robots:** `index, follow` pro Seite; im `[lang]/layout.tsx` zusätzlich googleBot-Maxima (`max-snippet: -1`, `max-image-preview: large`, `max-video-preview: -1`) — großzügige Snippet-Freigabe für SGE/AI Overviews.
- **URLs:** sprechende, keyword-tragende Slugs mit Trailing Slash (`trailingSlash: true`); Cluster unter `/de/empco-audit/<slug>/` (Hub-and-Spoke auch in der URL-Struktur).
- **Sitemap:** `public/sitemap.xml` wird **manuell** gepflegt (inkl. hreflang-Alternates + lastmod) — neue Seiten müssen dort eingetragen werden. 301-Redirects liegen in `public/_redirects` (Netlify).
- **Anchor-IDs:** Alle Sektionen haben `id`-Attribute (`#faq-section`, `#form-section` …) → deep-linkbare Fragmente, die auch von AI-Zitaten genutzt werden können.

### Inhaltliche Konventionen (bereits umgesetzt)

- H-Hierarchie: genau eine H1 (Hero), H2 je Sektion, H3 für Zwischenüberschriften/FAQ-Fragen.
- Vergleiche als echte `<table>` (ComparisonTable-Modul), Aufzählungen als echte `<ul>`.
- Jede FAQ-Antwort ist eigenständig verständlich und nennt eine konkrete Zahl/Regel (AI-Search-Zitierfähigkeit, §5/§6 der Content-Strategie).
- Interne Verlinkung: Cluster → Pillar + verwandte Cluster (Inline-Links im Fließtext mit Keyword-Ankertexten); Pillar → alle Cluster („EmpCo Wissen"-Block).
- Konsistente Terminologie: „EmpCo-Richtlinie (EU 2024/825)", „EmpCo Audit" (Produkt), Stichtag „27. September 2026".

### Abgleich mit den Kriterien — Status (Stand 14.07.2026)

1. ✅ **Answer-First-Fettung:** Jede Cluster-Page beginnt jetzt mit der gefetteten Direktantwort auf die Kernfrage im ersten Absatz; das Reddit-Zitat folgt danach.
2. ✅ **FAQ-Antworten im sichtbaren HTML:** FAQ auf den Cluster-Pages ist jetzt eine immer sichtbare Q&A-Sektion (H3-Frage + Antwort) statt Accordion → Antworten stehen im crawlbaren statischen HTML und decken sich 1:1 mit dem FAQPage-JSON-LD. *(Auf der Pillar-Page bleibt das Accordion — dort bewusst nicht angefasst.)*
3. ✅ **BreadcrumbList-Schema:** auf allen 5 Cluster-Pages ergänzt (iCompetence → EmpCo Audit → Seite). `Organization`-Schema war bereits sitewide vorhanden (Layout) — kein Handlungsbedarf.
4. ⚠️ **Schema-Validierung:** JSON-LD ist als JSON valide und der Sichtbarkeits-Abgleich ist im Build geprüft; formale Prüfung per Google Rich Results Test steht noch aus (geht erst gegen die deployte URL sinnvoll).

Verifiziert im statischen Export: sichtbarer Textumfang jetzt 1.256–1.480 Wörter je Cluster-Page (Ziel 1.200–1.800), alle FAQ-Antworten im HTML, JSON-LD-Typen pro Seite: Organization, FAQPage, BreadcrumbList.

---

## Juristische Validierung (Recherche gegen Primärquellen, 14.07.2026)

Alle Rechtsaussagen der Cluster-Pages + Pillar-FAQ wurden per Web-Recherche gegen Primärquellen geprüft (EUR-Lex CELEX:32024L0825, BGBl. 2026 I Nr. 43, BGH-PM, AGCM-PMs, Gerichts-PMs). Ergebnis:

### Bestätigt (mit Primärquelle)

- EmpCo in Kraft seit 26.03.2024; Umsetzungsfrist 27.03.2026; Anwendung ab 27.09.2026; **keine Übergangs-/Aufbrauchsfrist** (EU + DE)
- DE-Umsetzung: „Drittes Gesetz zur Änderung des UWG" v. 12.02.2026, verkündet 19.02.2026, **BGBl. 2026 I Nr. 43**, im Wesentlichen in Kraft ab 27.09.2026; neue Per-se-Verbote in der schwarzen Liste (u. a. Nr. 2a, 4a–4c, 23d ff.)
- § 5 UWG heute abmahnfähig; „Wettbewerber und Verbände" als zulässige Vereinfachung von § 8 Abs. 3 UWG
- Abmahnungs-Mechanik (§ 13 UWG), Kostenerstattung (§ 13 Abs. 3), einstweilige Verfügung (Dringlichkeitsvermutung § 12 UWG)
- Kompensationsverbot (Anhang I Nr. 4c), Siegel-Regel (Nr. 2a + Art. 2 lit. r), Zukunftsversprechen (Art. 6 Abs. 2 lit. d), keine KMU-Ausnahme, Obsoleszenz-Praktiken (Nr. 23d–23j)
- BGH „klimaneutral": **Urt. v. 27.06.2024 – I ZR 98/23** (Katjes) — Erläuterung muss **in der Werbung selbst** erfolgen (Website/QR reicht nicht)
- Shein: **1 Mio. € Bußgeld, AGCM, 04.08.2025 (PS12709)** — echte Green Claims (Kreislauffähigkeit, Klimaziele vs. gestiegene Emissionen)

### Korrigiert (war falsch oder verkürzt — in DE+EN eingearbeitet)

1. **Armani ist KEIN Greenwashing-Fall:** AGCM 3,5 Mio. € (04.08.2025, PS12793) betraf irreführende **Ethik-/Sozialaussagen** (Arbeitsbedingungen bei Subunternehmern), keinen Umwelt-Claim; angefochten, nicht rechtskräftig. → Überall umgelabelt („für irreführende Ethik-Aussagen"), auf der Fallseite als bewusster „Nachbarfall" eingeordnet, aus reinen Greenwashing-Aufzählungen entfernt.
2. **Apple nur erstinstanzlich:** LG Frankfurt a. M., Urt. v. 26.08.2025 – 3-06 O 8/24 (Klage DUH), **nicht rechtskräftig**; Gegenstand „CO₂-neutrales Produkt" (Apple Watch), Kompensation über Waldprojekt Paraguay nicht langfristig gesichert. → „gerichtlich untersagt" überall zu „erstinstanzlich untersagt (nicht rechtskräftig)" präzisiert.
3. **4-%-Bußgeld präzisiert:** Gilt bei **weitverbreiteten Verstößen mit EU-Dimension** (CPC-VO / Art. 13 UGP-RL; in DE § 19 UWG, zuständig u. a. Bundesamt für Justiz); Bezugsgröße = Jahresumsatz **in den betroffenen Mitgliedstaaten**; Normalfall der Durchsetzung in DE ist zivilrechtlich (Abmahnung/Klage). → Überall entsprechend eingeschränkt.
4. **GCD-Status korrigiert:** Rücknahme im Juni 2025 nur **angekündigt**, Verfahren ruht seither (EP Legislative Train: „pending"); formale Rücknahme bis 14.07.2026 nicht dokumentiert. → „wurde zurückgezogen" zu „Rücknahme angekündigt; Verfahren liegt auf Eis".
5. **BGH-Formulierung geschärft:** „im Werbeumfeld" → „in der Werbung selbst" (entspricht dem Urteil); Aussage auf **mehrdeutige** Begriffe bezogen; Az. ergänzt.
6. **Vertragsstrafe relativiert:** „bei jedem Verstoß empfindlich" → „regelmäßig; für kleine Unternehmen sieht § 13a UWG Grenzen vor".
7. **Begriffsliste präzisiert (#4):** Verbotsmaßstab = „allgemeine Umweltaussage" ohne Nachweis **anerkannter hervorragender Umweltleistung** (Nr. 4a); Begriffsbeispiele stammen aus den Erwägungsgründen.

### Nicht extern belegbar — Entscheidung nötig

1. **„Branchenüblich mittlerer bis hoher fünfstelliger Aufwand"** für die manuelle Website-Prüfung (auf #10, #6, #7 + Pillar-FAQ a17): eigene Marktbehauptung aus der Strategie, kein externer Beleg gefunden. Optionen: (a) intern belegen (Projekterfahrung dokumentieren), (b) abschwächen („kann schnell einen fünfstelligen Betrag erreichen"), (c) streichen.
2. **Apple-Berufungsstatus** (ob Berufung eingelegt wurde) war nicht ermittelbar → durch „nicht rechtskräftig" sauber abgedeckt, keine Aktion nötig; vor Deploy ggf. kurz prüfen, ob es inzwischen eine OLG-Entscheidung gibt.
