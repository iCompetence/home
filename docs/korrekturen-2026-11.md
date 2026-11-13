# Korrekturen des Content-Teams zu den DE-Vorschauseiten (November 2026)

Quelle: PDF „Neue Webseite Korrektur…“ (11 Seiten), Feedback zu `https://icompetence.de/de/lavender/…`.
Ausgewertet am 13.11.2026 gegen den Code auf `main` (Stand 139f187).

**Arten**

- **1** = klare Textkorrektur (Ersetzen, Streichen, Ergänzen, konkrete Formulierung). Wird umgesetzt.
- **2** = offene Frage oder unklare Stelle. Entscheidung bei Dennis, Vorschlag steht dabei.
- **3** = Design- oder UX-Vorschlag. Entscheidung bei Dennis, Vorschlag steht dabei.

**Status**

- ✅ umgesetzt (in den Commits nach dieser Liste auf Branch `claude/de-korrekturen-lavender-92af91`, je Seite ein Commit)
- ☑️ schon erledigt: Der Code ist seit dem Lesen des Prüfers weiter (SEO-Überarbeitung der EmpCo-Seite vom 26.10.2026, Commit 760c26d). Die Anmerkung ist damit inhaltlich abgedeckt.
- ❓ offen, Entscheidung nötig
- ⏳ freigegeben, noch nicht umgesetzt (in Abstimmung mit einer anderen Session oder wartet auf Material)
- ➖ entschieden: bleibt so, entfällt oder wird woanders erledigt

**Wo die Änderungen liegen.** Schlüssel, die auch die alten Live-Seiten nutzen (`ct.*`, `is.*`, `icu.*`, `analyticsAgent.*`, `iknow.*`, `empco.*`, `cta.*`), sind als Override in `src/contexts/lavender-overrides.ts` geändert. `lavender.*` nutzt nur die Vorschau und ist direkt in `src/contexts/LanguageContext.tsx` geändert. Die Live-Seiten bleiben unverändert.

**Form.** Wo der Prüfer grob formuliert hat, ist die Form angepasst: du/dein klein, „eure“ → „deine“, Gedankenstrich „–“ statt „-“, Anführungszeichen „…“. Am Inhalt ist nichts geändert.

---

## Allgemein (gilt für alle Seiten)

| # | Anmerkung | Art | Status |
|---|---|---|---|
| G-1 | Schrift vor dem kräftigen Blau lieber weiß oder sehr hellgrau, mehr Kontrast. Auf Privacy-led AI noch einmal: „Schwarz auf Blau unglücklich“. | 3 | ➖ bleibt |
| G-2 | Bilder per Klick (Doppelklick) als Overlay vergrößern, damit man die Screenshots lesen kann. Wiederholt bei CPT „Produkte und Tools“, Intelligentic Search, ICU, EmpCo. | 3 | ✅ |
| G-3 | Gibt es Bildbeschreibungen (Barrierefreiheit)? | 2 | ✅ |

**G-1 Vorschlag:** So lassen. Gemeint sind die blauen Buttons (`lav-blue` #24a1da) mit dunkler Schrift (#0b2231). Gemessen: dunkel auf Blau hat 5,58 : 1 und besteht WCAG AA. Weiß auf Blau hätte nur 2,92 : 1 und fällt durch (AA verlangt 4,5 : 1). Genau deshalb wurde im A11y-Audit vom 30.09.2026 auf dunkle Schrift umgestellt, ein dunkleres Blau wurde damals verworfen. Wenn die Buttons trotzdem schwer lesbar wirken, ginge die Beschriftung in Halbfett (600 statt 500), ohne an Farbe oder Kontrastwert etwas zu ändern.

**G-2 Vorschlag:** Lightbox im Design-System einbauen, einmal für `ProductHead`/`MediaGallery` und `ImageText`. Klick oder Enter auf ein Bild öffnet es seitenfüllend, Escape oder Klick daneben schließt, Fokus bleibt im Overlay und springt danach zurück. Doppelklick als Auslöser würde ich nicht nehmen, das erwartet im Web niemand. Für die EmpCo-Seite zusätzlich den Wunsch aus E-12 (Screenshot einer Audit-Analyse in voller Breite) mitdenken.

**G-3 Vorschlag:** Geprüft im HTML aller DE-Vorschauseiten: Jedes große Bild hat einen Alt-Text, die meisten über Schlüssel wie `lavender.products.*.imageAlt`. Leer ist der Alt-Text nur bei den Vorschaubildchen der Galerien. Die sitzen in Buttons, die nur „Bild anzeigen 2“ usw. heißen. Ich würde (a) die Button-Beschriftung um den Alt-Text des Bildes ergänzen und (b) die dünnen Alt-Texte nachschärfen, z. B. „Intelligentic Search Demo“ (fest im Code, vom alten Live-Stand übernommen), damit sie beschreiben, was auf dem Screenshot zu sehen ist.

---

## Startseite `/de/lavender/` (gleiche Schlüssel auf `/de/lavender/nacht-hamburg/`)

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| H-1 | Kontrast der lilafarbenen Ausklappfenster in den Leistungen zu gering? Fettere Schrift oder hellerer Hintergrund? | 3 | `ServicesCarousel.tsx` (Pill aufgeklappt) | ➖ entfällt |
| H-2 | KI-Workshops: „Praxis statt PowerPoint …“ | 1 | `lavender.services.workshops.ai.desc` | ✅ |
| H-3 | Executive Briefings: „… messbar voranbringt und echten ROI stiftet.“ | 1 | `lavender.services.workshops.briefings.desc` | ✅ |
| H-4 | Generative KI: „ausliefern – sicher, überprüfbar, (was heißt mit dem Betrieb dahinter?)“ | 2 | `lavender.services.ai.genai.desc` | ✅ |
| H-5 | EmpCo Audit: „… welche zum Risiko werden. wo Handlungsbedarf besteht.“ | 2 | `lavender.products.empco.desc` | ✅ |

**H-2**
- vorher: „Ein fokussierter Tag praktisches Prototyping. Dein Team geht mit einem funktionierenden KI-Use-Case nach Hause – nicht mit Folien.“
- nachher: „Ein fokussierter Tag praktisches Prototyping. Praxis statt PowerPoint: Du gehst mit einem einsatzbereiten, funktionierenden KI-Use-Case nach Hause.“
- Der erste Satz war nicht markiert und bleibt. „Du“ nach dem Doppelpunkt groß, weil ein ganzer Satz folgt.

**H-3**
- vorher: „Ein nüchterner Blick darauf, wo KI dein Geschäft wirklich voranbringt – und wo nicht.“
- nachher: „Ein nüchterner Blick darauf, wo KI dein Geschäft messbar voranbringt und echten ROI stiftet.“

**H-1 Vorschlag:** Die aufgeklappte Pill zeigt die Beschreibung in 14 px, dunkel mit 70 % Deckkraft auf Lavendel (#f5e1ff). Das ergibt 5,6 : 1, besteht AA, wirkt aber blass. Ich würde die Beschreibung auf 100 % Deckkraft setzen (etwa 14 : 1) und auf 15 px anheben. Den Hintergrund würde ich lassen, er ist die Markenfarbe der Pill.

**H-4 Vorschlag:** Der Satz übersetzt „safety, evaluation, and ops“ wörtlich. Neu: „Produktionsreife GenAI-Funktionen, die sicher laufen und deren Ergebnisse geprüft sind. Auch den Betrieb danach übernehmen wir.“ Bitte bestätigen, dass iCompetence den Betrieb wirklich übernimmt (die EN-Fassung sagt das).

**H-5 Vorschlag:** Ich lese die Notiz so, dass „welche zum Risiko werden“ durch „wo Handlungsbedarf besteht“ ersetzt werden soll: „Innerhalb weniger Stunden weißt du, welche Nachhaltigkeitsaussagen belegbar sind und wo Handlungsbedarf besteht.“ Der gleiche Satz steht als Untertitel auf der EmpCo-Seite (`empco.hero.subtitle`, siehe E-1). Beide sollten gleich bleiben.

---

## Campaign Parameter Tool `/de/lavender/campaign-parameter-tool/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| C-1 | „14 Tage Free Trial“ → „14 Tage kostenlos testen“ | 1 | `ct.pricing.trialBadge` | ✅ |
| C-2 | „Konsistente UTM-Parameter – über alle Kanäle“, konsequent deutsch auf der DE-Seite | 1 | `ct.values.card1.title` | ✅ |
| C-2a | Folgeänderung: dieselbe Wendung „über alle Channels“ in der Vergleichstabelle | 1 | `ct.why.solution.item1` | ✅ |
| C-3 | „Definiert einmal, genutzt überall. Standardisierte Parameterlogs …“ kommentarlos zitiert | 2 | `ct.values.card1.description` | ✅ |
| C-4 | „in Echtzeit“ ergänzen | 1 | `ct.values.card3.description` | ✅ |
| C-5 | 04 Multi-User Workflow: statt „auf einmal“ „in einem einzigen, zentralen Arbeitsgang“ | 1 | `ct.features.item4.description` | ✅ |
| C-6 | 01–08: bei jedem Punkt in wenigen Worten den Vorteil nennen, z. B. bei 04 „… in Sekundenschnelle die Struktur, für die dein Team sonst Monate (?) braucht!“ | 2 | `ct.features.item1–8.description` | ✅ |
| C-7 | „Warum saubere UTM-Parameter entscheidend sind“: Schlusssatz „Mit dem iCompetence Parameter Tool vermeidest du diese Probleme und erhältst einfach, kostengünstig und effizient valide UTM-Parameter für dein Marketing.“ | 2 | `ct.why.description` | ✅ |
| C-8 | „Experten vertrauen uns“: Zitate mit Anführungszeichen, kursiv und etwas größer | 3 | `ReviewCard` / Testimonials | ✅ (13.11., Branch `claude/unterseiten-licht-und-linie-d96d42`) |
| C-9 | FAQ „Kann ich eigene Parameterstrukturen definieren?“: „Ja – sämtliche Parameterstrukturen lassen sich flexibel an eure internen Standards anpassen“ | 1 | `ct.faq.item2.answer` | ✅ |
| C-10 | „Produkte und Tools“: Bilder per Klick vergrößern (→ G-2), ganze Karte als Link statt nur „Mehr erfahren“ | 3 | `ProductRow` | ✅ |
| C-11 | CTA „Bereit, dein Unternehmen für die Agentic Era zu befähigen?“ zu lang, CTA zu spät. Stattdessen „Bist du agentic? Jetzt Erstgespräch buchen!“ und dann der Button | 3 | `cta.headline` (alle Produktseiten) | ➖ woanders |

**C-1**
- vorher: „14 Tage Free Trial“
- nachher: „14 Tage kostenlos testen“

**C-2 / C-2a**
- vorher: „Konsistente UTM-Parameter – über alle Channels“ / „Standardisierte Parameter über alle Channels“
- nachher: „Konsistente UTM-Parameter – über alle Kanäle“ / „Standardisierte Parameter über alle Kanäle“

**C-4**
- vorher: „… Parameter werden automatisch generiert und dokumentiert.“
- nachher: „… Parameter werden automatisch in Echtzeit generiert und dokumentiert.“

**C-5**
- vorher: „Generiere hunderte Kampagnen-URLs auf einmal via CSV-Import oder API.“
- nachher: „Generiere hunderte Kampagnen-URLs in einem einzigen, zentralen Arbeitsgang via CSV-Import oder API.“

**C-9**
- vorher: „Ja – komplett konfigurierbar. Du kannst eigene Templates, …“
- nachher: „Ja – sämtliche Parameterstrukturen lassen sich flexibel an deine internen Standards anpassen. Du kannst eigene Templates, …“ („eure“ → „deine“, die Seite spricht eine Person an)

**C-3 Vorschlag:** Der Prüfer hat den Satz ohne Kommentar zitiert. Vermutlich stört „Parameterlogs“, gemeint ist wohl „Parameterlogik“. Neu: „Einmal definiert, überall genutzt. Eine einheitliche Parameterlogik verhindert Wildwuchs, Tippfehler und unklare Kampagnenbezeichnungen.“ Bitte bestätigen, ob das gemeint war.

**C-6 Vorschlag:** Erst die Zuordnung reparieren. Bei 6 von 8 Funktionen passen Titel und Beschreibung nicht zusammen (bekannt seit der Figma-Inventur, z. B. „03 Logging & Dokumentation“ mit dem Text zur URL-Oberfläche). Dazu braucht es Input, was jede Funktion wirklich kann. Danach je Punkt einen Nutzen-Halbsatz ergänzen. Die „Monate“ aus dem Beispiel bitte nur mit belegbarer Zahl.

**C-7 Vorschlag:** Den Abschlusssatz aufnehmen, aber ohne die Dreierreihe: „Mit dem Campaign Parameter Tool vermeidest du diese Probleme und bekommst valide UTM-Parameter für dein Marketing, ohne Mehraufwand.“ Produktname wie im Rest der Seite („Campaign Parameter Tool“ bzw. „iCPT“).

**C-8 Vorschlag:** Typografische Anführungszeichen „…“ im Bauteil setzen (nicht in den Texten), Schrift eine Stufe größer. Kursiv würde ich weglassen, längere kursive Absätze lesen sich schlechter. Gilt dann auch für die Zitate auf der Startseite.
**C-8 umgesetzt:** CPT nutzt das Zitatmodul der Startseite (`QuotePanel`): ein Zitat zur Zeit auf der Lila-Fläche in Lesegröße (Lead, medium), Anführungszeichen setzt das Bauteil (DE „…“, EN “…”; Zitate, die schon welche haben, bleiben, wie die der Startseite), nicht kursiv. `ReviewCard` ist entfernt.

**C-10 Vorschlag:** Ganze Karte klickbar machen, „Mehr erfahren“ bleibt als sichtbarer Linktext (der Link spannt per Overlay über die Karte, Screenreader lesen weiterhin nur einen Link). Gilt für alle Produktteaser.

**C-11 Vorschlag:** Kürzere Überschrift, Button bleibt („Buche dein Erstgespräch“). „Jetzt Erstgespräch buchen!“ würde den Button wiederholen. Neu: „Bist du schon agentic?“ Gilt für alle Produktseiten (`cta.headline`, als Lavender-Override, damit die Live-Seiten bleiben).

---

## Intelligentic Search `/de/lavender/intelligentic-search/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| I-1 | „Intelligentic Search ist“ streichen: „Präziser als herkömmliche KI-Suchen“ | 1 | `is.features.step1.label` | ✅ |
| I-2 | „Die echte KI“ (gleiche Kürzung) | 1 | `is.features.step3.label` | ✅ |
| I-3 | „Antworten in Millisekunden“ | 1 | `is.features.step4.label` | ✅ |
| I-4 | Bild auf Klick groß (→ G-2) | 3 | `ProductHead` | ✅ |
| I-5 | „So funktioniert's“: Pfeil nach unten kann weg? | 3 | Button im Produktkopf | ➖ bleibt |
| I-6 | Fließtext so groß wie die H2, die Alleinstellungsmerkmale kleiner. Fließtext so klein wie die Merkmale? | 3 | `lav-lead` in den Abschnitten | ✅ |
| I-7 | „… bis Amazon und Google: KI-Suche …“: Doppelpunkt durch Strich ersetzen | 1 | `is.quote.text` | ✅ |
| I-8 | „Teil davon sein:“ → „!“, „Wir bieten die Next-Level-Suche“, „Tech-Konzernen.“ → „!“ | 1 | `is.quote.text` | ✅ |
| I-9 | Groß über die ganze Seitenbreite: „Wir wissen, dass du es kannst. Intelligentic Search.“ | 3 | `QuoteIntro` (conclusion) | ✅ |
| I-10 | „… die nur KI bieten kann“: „!“ ergänzen | 1 | `is.features.subline1` | ✅ |
| I-11 | „Modular und dynamisch“ ohne Punkt, es ist eine Überschrift | 1 | `is.modular.title` | ✅ |

**I-1 bis I-3** (Stichpunkte im Produktkopf und Titel im Abschnitt „It's a match!“)
- vorher: „Intelligentic Search ist präziser als herkömmliche KI-Suchen“ / „Intelligentic Search ist die echte KI“ / „Millisekunden-Antwortzeiten“
- nachher: „Präziser als herkömmliche KI-Suchen“ / „Die echte KI“ / „Antworten in Millisekunden“

**I-7 / I-8**
- vorher: „… Von OpenAI und ChatGPT bis Amazon und Google: KI-Suche und KI-Shopping sind das Thema. ¶ Mit Intelligentic Search kannst du Teil davon sein: Mehr Features … ¶ Wir bieten Next-Level-Suche für kleine und mittlere Unternehmen. Überlass deine Kunden nicht den großen Tech-Konzernen.“
- nachher: „… Von OpenAI und ChatGPT bis Amazon und Google – KI-Suche und KI-Shopping sind das Thema. ¶ Mit Intelligentic Search kannst du Teil davon sein! Mehr Features … ¶ Wir bieten die Next-Level-Suche für kleine und mittlere Unternehmen. Überlass deine Kunden nicht den großen Tech-Konzernen!“
- Lesart der Notiz: „(:)!“ und „(.)!“ = alt in Klammern, neu dahinter. Das passt zum Code (dort steht „:“ bzw. „.“).

**I-10**
- vorher: „Vergiss, was du über Filter wusstest - erlebe die Flexibilität und Hyper-Personalisierung, die nur KI bieten kann“
- nachher: „… die nur KI bieten kann!“

**I-11**
- vorher: „Modular und dynamisch.“
- nachher: „Modular und dynamisch“

**I-5 Vorschlag:** Pfeil behalten. Er zeigt, dass der Button auf der Seite nach unten springt und keine neue Seite öffnet. Die Sprung-Buttons auf iKnow, Analytics Agent, UJE, EmpCo, KI-Workshop und der Startseite haben denselben Pfeil.

**I-6 Vorschlag:** Mit E-2 und U-1 zusammen entscheiden (Schriftgrößen). Längere Fließtexte auf den Produktseiten von `lav-lead` auf `lav-paragraph` setzen, `lav-lead` nur noch für ein- bis zweizeilige Einleitungen. Die Alleinstellungsmerkmale bleiben, wie sie sind. Das ist eine Änderung im Design-System, erst in Figma, dann im Code.

**I-9 Vorschlag:** Den Schlusssatz in `QuoteIntro` optional unter beide Spalten setzen, volle Breite in der Statement-Größe. Nur auf dieser Seite einschalten, auf iKnow und Analytics Agent bleibt der Schlusssatz kurz in der rechten Spalte.

---

## User Journey Explorer `/de/lavender/icu-user-journey-explorer/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| U-1 | Bilder vergrößern / Schriftgröße wie bei Intelligentic Search | 3 | → G-2, I-6 | ✅ |
| U-2 | „Für Nicht-Analysten gemacht – und natürlich auch für Analysten“ | 1 | `icu.carousel.item2.title` | ✅ |
| U-3 | Viel Text für die Schriftgröße. Einleitenden Satz behalten, Kernfeatures als Checkliste (drei Punkte vorgeschlagen). Dazu fett „Zielgruppen-FAQ“ über dem jetzigen Absatz | 2/3 | `icu.intro.text` (Statement) | ✅ |
| U-4 | Umbruch auf 2/3 der Seite unverständlich: „Erkunde echte User Journeys …“ | 3 | `icu.guidance.subline` | ➖ bleibt |
| U-5 | Danach mehr Abstand vor dem nächsten Abschnitt | 3 | Abschnitt „guidance“ | ✅ |
| U-6 | FAQ „Brauche ich technisches Wissen …?“: „Nein. ICU ist intuitiv für Nicht-Analysten konzipiert – liefert aber gleichzeitig die Granularität, die Data- und Analytics-Teams erwarten.“ | 1 | `icu.faq.q2.content` | ✅ |

**U-2**
- vorher: „Für Nicht-Analysten gemacht“
- nachher: „Für Nicht-Analysten gemacht – und natürlich auch für Analysten“ (Stichpunkt im Produktkopf und Titel im Karussell)

**U-6**
- vorher: „Nein. ICU ist für Nicht-Analysten konzipiert. ↵ Marketing-Teams, …“
- nachher: „Nein. ICU ist intuitiv für Nicht-Analysten konzipiert – liefert aber gleichzeitig die Granularität, die Data- und Analytics-Teams erwarten. ↵ Marketing-Teams, …“ (der zweite Absatz bleibt)

**U-3 Vorschlag:** Das Statement auf den ersten Satz kürzen und die drei Punkte des Prüfers als Checkliste darunter setzen. Die Formulierungen des Prüfers nutzen „statt“ und eine Dreierreihe, deshalb leicht geglättet:
- „Die meisten Analytics-Tools zeigen die Journeys, die du bei deinen Nutzern vermutest. ICU zeigt die, die tatsächlich stattgefunden haben.“
- ✓ Echte Pfade aus deinen Daten, in Echtzeit rekonstruiert
- ✓ Rückkehrer und Abbrüche auf einen Blick
- ✓ Ohne Dashboard-Konfiguration und ohne Data-Science-Wissen

Unklar ist „Zielgruppen-FAQ“. Soll der restliche Absatz in eine eigene FAQ für Zielgruppen wandern, oder ist das nur die Beschriftung des Prüfers? Bitte klären.

**U-4 Vorschlag:** Der Umbruch ist Absicht. Einleitungen sind auf 820 px Zeilenbreite begrenzt, damit die Zeilen lesbar bleiben (Design-System `SectionHeader`). Ändern würde ich das nicht. Wenn es stört, kann der Satz kürzer werden: „Erkunde echte User Journeys auf visuellen Karten oder frag einfach nach den Erkenntnissen, die du brauchst.“

**U-5 Vorschlag:** Abstand zwischen den Abschnitten in Figma und Code messen. Wenn er hier kleiner ist als auf den anderen Seiten, angleichen, sonst so lassen.

---

## Analytics Agent `/de/lavender/analytics-agent/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| A-1 | „Sofort einsatzbereit mit Google Analytics 4“ statt „Google Analytics 4 – sofort einsatzbereit“ | 1 | `analyticsAgent.card5.title` | ✅ |
| A-2 | „riesig“ durch „umfangreich“, „erheblich“ oder „groß“ ersetzen | 1 | `analyticsAgent.intro.p1` | ✅ |
| A-3 | Statt „Aber GA4 ist nur der Anfang.“: „Du arbeitest mit einem anderen Tool als GA4, vielleicht sogar mit einer individuellen Lösung? Kein Problem.“ | 1 | `analyticsAgent.what.p3` | ✅ |
| A-4 | „semantisches Verständnis deiner Daten im Kontext“: Ist „semantisch“ verständlich? Besser „setzt … in den Kontext“? | 2 | `analyticsAgent.card4.description` | ✅ |
| A-5 | „… beliebtesten Anwendungsfälle für den iCompetence Analytics Agent“ ergänzen | 1 | `analyticsAgent.card5.description` | ✅ |
| A-6 | Unterüberschrift „Die Frage ist nicht, ob du Daten hast. Sondern ob du sie nutzen kannst.“ irritiert unter „Sieh den Analytics Agent in Aktion“ und kann dort weg | 1 | `AnalyticsAgentLavender.tsx` (`leadIn`) | ✅ |
| A-7 | Die Zeile lieber als Claim für die ganze Seite: H1, Subline/Claim, Kurztext, Button „Jetzt Demo anfragen“ | 2 | Produktkopf | ➖ nicht übernommen |

**A-1**
- vorher: „Google Analytics 4 – sofort einsatzbereit“
- nachher: „Sofort einsatzbereit mit Google Analytics 4“ (Stichpunkt im Produktkopf und Kartentitel)

**A-2**
- vorher: „Dein Unternehmen sammelt jeden Tag riesige Datenmengen …“
- nachher: „Dein Unternehmen sammelt jeden Tag große Datenmengen …“ (von den drei Vorschlägen das schlichteste Wort)

**A-3**
- vorher: „Aber GA4 ist nur der Anfang. Der Analytics Agent kann mit jeder erdenklichen Datenquelle verbunden werden …“
- nachher: „Du arbeitest mit einem anderen Tool als GA4, vielleicht sogar mit einer individuellen Lösung? Kein Problem. Der Analytics Agent kann mit jeder erdenklichen Datenquelle verbunden werden …“

**A-5**
- vorher: „Die GA4-Integration ist einer der beliebtesten Anwendungsfälle. Verbinde …“
- nachher: „Die GA4-Integration ist einer der beliebtesten Anwendungsfälle für den iCompetence Analytics Agent. Verbinde …“

**A-6**
- vorher: Abschnitt „Sieh den Analytics Agent in Aktion“ mit Unterzeile „Die Frage ist nicht, ob du Daten hast. Sondern ob du sie nutzen kannst.“
- nachher: Unterzeile entfernt, der Absatz „Mit dem Analytics Agent wird jedes Teammitglied …“ bleibt. Der Text liegt weiter im Override, falls er in den Produktkopf wandert (A-7).
- Gilt auch für die EN-Vorschau, weil es dasselbe Bauteil ist.

**A-4 Vorschlag:** „semantisch“ raus, ohne neuen Fachbegriff: „Eine Wissensbasis unter dem Agenten sorgt dafür, dass er deine Daten richtig einordnet. Sie weiß, was deine Metriken bedeuten und wie dein Business funktioniert, und liefert Erkenntnisse, die wirklich Sinn ergeben.“ Den Vorschlag „setzt … in den Kontext“ würde ich nicht nehmen, er sagt etwas anderes. Dasselbe Wort steht auch in `analyticsAgent.what.p3` („semantische Verständnis“), dort genauso anpassen.

**A-7 Vorschlag:** Nicht übernehmen. „Die Frage ist nicht, ob …, sondern ob …“ ist genau das Muster, das nach KI-Text klingt (steht so ähnlich auch auf iKnow, `iknow.howItWorks.p1`). Der Produktkopf hat mit „Deine Daten. Deine Fragen. Sofortige Antworten.“ schon eine Subline. Der Button „Jetzt Demo anfragen“ würde den einheitlichen Erstgespräch-Button aller Produktseiten ersetzen. Wenn ein neuer Claim gewünscht ist, schreibe ich gern einen ohne dieses Muster.

---

## iKnow `/de/lavender/iknow/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| K-1 | Stichpunkte im Produktkopf verständlicher machen (sechs Zeilen mit Ergänzungen) | 1 | `iknow.card1/5/6.title` | ✅ |
| K-2 | „Wie das geht? Mit iKnow:“ entweder als eigene Überschrift ohne Doppelpunkt, oder mit Punkt und fett/kursiv in Absatzgröße | 3 | `iknow.intro.p3` (Schlusssatz `QuoteIntro`) | ✅ |

**K-1** (Stichpunkte im Produktkopf und Titel der Nutzenkarten, beide nutzen denselben Schlüssel)
- „Alle Wissensquellen vereint“ → „Alle Wissensquellen deines Unternehmens vereint an einem Ort“
- „Aufgeräumt und strukturiert“ bleibt
- „Optional: Nutze auch Gespräche“ bleibt
- „Wissen von heute für morgen“ bleibt
- „Sicherheit und Souveränität“ → „Sicherheit und Souveränität in einer volatilen Welt“
- „Bereit für deine Unternehmens-KI“ → „Die Grundlage für deine Unternehmens-KI“
- Lesart: Klammern ohne „neu:“ sind ebenfalls Ergänzungen, im Code steht der Text ohne sie.

**K-2 Vorschlag:** Die Variante mit Punkt: „Wie das geht? Mit iKnow.“ in Absatzgröße, aber halbfett in voller Deckkraft (heute schon „medium“, also stärker absetzen). Eine eigene Überschrift für drei Wörter würde den Abschnitt zerreißen. Gleiches Bauteil wie I-9, beides zusammen entscheiden.

---

## EmpCo Audit `/de/lavender/empco-audit/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| E-1 | „Greenwashing“ in den Einstieg, z. B. Untertitel „… welche zum Risiko werden, sich dem Vorwurf des Greenwashings auszusetzen“. Weiter unten stattdessen: H1 „Das iCompetence EmpCo Audit: Schütze deine Website vor Greenwashing-Vorwürfen und Abmahnungen.“, Subline „Innerhalb weniger Stunden identifiziert der automatisierte Audit unzulässige Umweltaussagen auf deiner Website und zeigt konkreten Handlungsbedarf.“ | 2 | Produktkopf | ➖ erledigt (SEO-Session) |
| E-2 | Schriftgrößen tanzen, kleinste Schriftgröße abschaffen (auf allen Seiten), nur Absatzgröße | 3 | Typo-Stufen | ✅ |
| E-3 | Einleitungsabsatz ergänzen: „… kommunizieren dürfen, ohne in den Verdacht des Greenwashings zu geraten.“ | 1 | `empco.why.p1` | ☑️ |
| E-4 | Rosa Kacheln: kleinste Schrift ok; die zwei Absätze darüber größer; aufklappbare Sublines in Absatzgröße | 3 | `IconCard`, `ProcessAccordion` | ✅ |
| E-5 | Bilder größer klicken (→ G-2); nach „Sehen, was der Audit findet“ ein Screenshot einer Audit-Analyse in voller Breite | 3 | Abschnitt „test“ | ✅ |
| E-6 | CTA „Kostenlose Probeseite anfordern“ doppelt sich. Überschrift: „Unser Angebot: Deine kostenlose Probeseite“ | 1 | `empco.form.title` | ✅ |
| E-6a | Button „hier kostenlose Probeseite anfordern“ | 2 | `empco.hero.ctaPrimary`, `empco.test.cta` | ➖ bleibt |
| E-7 | Hinweis sieht aus wie ein Mail-Zitat: Seitenbalken weg, nicht kursiv, Pfeil vor „Hinweis“ | 3 | Formular-Hinweis (`EmpCoAuditLavender.tsx`) | ✅ |
| E-8 | Im rosa Kasten zwei Absätze mit *, davor ein Leerzeichen, das müsste weg | 3 | `FormField.tsx` (Pflichtfeld-Stern) | ✅ |
| E-9 | „Das verbietet die EmpCo-Richtlinie“ | 1 | `empco.seo.banned.title` | ✅ |
| E-10 | Tabelle: „In Kraft – wird seit dem 27. September 2026 verbindlich angewendet.“ | 1 | `empco.seo.compare.r1.empco` | ✅ |
| E-11 | „Green Claims Directive (GCD)“ → „Green-Claims-Richtlinie“? Sonst ist die Tabelle denglisch | 2 | `empco.seo.compare.colGcd` u. a. | ✅ |
| E-12 | FAQ „Ab wann gilt die EmpCo-Richtlinie?“: neue Antwort im Perfekt/Präteritum | 1 | `empco.seo.faq.a2` | ✅ |
| E-13 | FAQ „Ist ‚klimaneutral‘ noch erlaubt?“: letzter Satz „… sind seit dem 27. September 2026 unzulässig und abmahngefährdet.“ | 1 | `empco.seo.faq.a6` | ✅ |
| E-14 | „Nur mit echtem Reduktionsnachweis“ → „Nur mit belegbarem Nachweis“ | 1 | `empco.seo.faq.a6` | ✅ |
| E-15 | „Was ist der Unterschied zwischen der EmpCo-Richtlinie und der Green Claims Directive?“ | 1 | `empco.seo.faq.q8` | ✅ |
| E-16 | „Wurde die Green Claims Directive zurückgezogen?“: im Absatz auch „seit dem 27. …“ | 1 | `empco.seo.faq.a9` | ☑️ |
| E-17 | UWG-Antwort: „trat … in Kraft“, „muss seitdem angepasst sein“ | 1 | `empco.seo.faq.a11` | ☑️ |
| E-18 | Übergangsfrist-Antwort: „Seit dem 27. September 2026 …“, „umgehend prüfen“ | 1 | `empco.seo.faq.a12` | ☑️ |
| E-19 | FAQ „Sind CO₂-Kompensationen (Carbon Offsets) Betrug?“ streichen, auch auf Englisch (verharmlosend, Beleg: MPG-Studie, nur rund 16 % der Zertifikate wirken) | 1 | `empco.seo.faq.q14/a14` | ✅ |
| E-20 | „Wer haftet … – Marketing, Geschäftsführung oder Nachhaltigkeitsmanagement?“, folgerichtig in der Antwort „Das Marketing formuliert, das Nachhaltigkeitsmanagement liefert Daten, die Rechtsabteilung prüft“ | 1 | `empco.seo.faq.q19/a19` | ✅ |

**E-6**
- vorher: Überschrift über dem Formular „Kostenlose Probeseite anfordern“
- nachher: „Unser Angebot: deine kostenlose Probeseite“ („deine“ klein, nach dem Doppelpunkt folgt kein ganzer Satz)

**E-9**
- vorher: „Das verbietet die EmpCo“
- nachher: „Das verbietet die EmpCo-Richtlinie“

**E-10**
- vorher: „In Kraft, gilt seit 27.09.2026“ (der Prüfer las noch „gilt ab“)
- nachher: „In Kraft, wird seit dem 27. September 2026 verbindlich angewendet“ (Komma wie bisher statt Strich, ohne Schlusspunkt wie die übrigen Tabellenzellen)

**E-12**
- vorher: „Die EmpCo-Richtlinie gilt seit dem 27. September 2026 verbindlich. Die EU-Mitgliedstaaten mussten sie bis zum 27. März 2026 in nationales Recht umsetzen, Deutschland hat das über das UWG getan. Eine Übergangsfrist für bereits im Markt befindliche Produkte gibt es nicht – seit dem Stichtag müssen alle kommerziellen Aussagen den neuen Regeln entsprechen.“
- nachher: „Die EmpCo-Richtlinie wird seit dem 27. September 2026 verbindlich angewendet. Die EU-Mitgliedstaaten mussten sie bis zum 27. März 2026 in nationales Recht umsetzen, Deutschland hat das über das UWG getan. Eine Übergangsfrist gibt es nicht – seitdem müssen alle kommerziellen Aussagen den Vorgaben entsprechen.“
- Der Prüfer las noch die Zukunftsform. Die Zeitform war mit der SEO-Überarbeitung schon korrigiert. Übernommen ist sein Wortlaut, der Halbsatz zu Deutschland und dem UWG aus der SEO-Überarbeitung bleibt.

**E-13 / E-14**
- vorher: „Nur mit echtem Reduktionsnachweis. … Aussagen wie „klimaneutral durch Kompensation“ sind seit dem 27. September 2026 nicht mehr erlaubt.“
- nachher: „Nur mit belegbarem Nachweis. … Aussagen wie „klimaneutral durch Kompensation“ sind seit dem 27. September 2026 unzulässig und abmahngefährdet.“
- Der Mittelteil hat sich seit dem Lesen geändert („… auf tatsächlicher Emissionsminderung beruht …“) und bleibt. Dort steht, worauf sich der Nachweis beziehen muss.
- Nicht geändert, zur Entscheidung: Schritt 4 der fünf Schritte sagt weiterhin „durch echte Reduktionsnachweise ersetzen“ (`empco.seo.step4.desc`). Wenn der Begriff weg soll, dort mitziehen.

**E-15**
- vorher: „Was ist der Unterschied zwischen EmpCo und der Green Claims Directive?“
- nachher: „Was ist der Unterschied zwischen der EmpCo-Richtlinie und der Green Claims Directive?“

**E-19**
- In der Vorschau entfernt, DE und EN, auch aus den strukturierten Daten (FAQPage), weil die aus denselben Texten erzeugt werden. Die Nummerierung der Schlüssel bleibt, die Seite überspringt Nummer 14.
- Zum Go-live: Schlüssel `empco.seo.faq.q14/a14` löschen und den Eintrag aus dem JSON-LD der Live-Seite (`app/[lang]/empco-audit/page.tsx`) nehmen.

**E-20**
- vorher: „Wer haftet im Unternehmen für Greenwashing – Marketing, Recht oder Nachhaltigkeit?“ / „… Marketing formuliert, Nachhaltigkeit liefert Daten, Recht prüft – aber niemand hat den Gesamtüberblick …“
- nachher: „Wer haftet im Unternehmen für Greenwashing – Marketing, Geschäftsführung oder Nachhaltigkeitsmanagement?“ / „… Das Marketing formuliert, das Nachhaltigkeitsmanagement liefert Daten, die Rechtsabteilung prüft – aber niemand hat den Gesamtüberblick …“

**Schon erledigt (☑️)**
- E-3: Der Satz „Die EU Green Claims Directive und die EmpCo verändern, was Unternehmen … kommunizieren dürfen“ existiert nicht mehr. Der neue Einleitungsabsatz endet mit „Greenwashing ist teuer geworden.“, der Begriff steht also drin.
- E-16: „… verpflichtet seit dem 27. September 2026 dazu …“ steht so im Code.
- E-17: „Es ist im Wesentlichen am 27. September 2026 in Kraft getreten“ und „muss seitdem den neuen Regeln entsprechen“ stehen so im Code.
- E-18: „Seit dem 27. September 2026 müssen …“ und „Wer Bestände und Kommunikationsmittel noch nicht geprüft hat, sollte das jetzt nachholen.“ stehen so im Code.

**E-1 Vorschlag:** Seit der SEO-Überarbeitung steht direkt unter der H1 „EmpCo Audit“ die Zeile „Website auf Greenwashing prüfen.“ (`empco.hero.headline`). Auf der Live-Seite ist das die zweite H1-Zeile, in der Vorschau nur ein Absatz unter der H1. Der Begriff steht also schon im Einstieg. Den Untertitel würde ich nicht um „sich dem Vorwurf des Greenwashings auszusetzen“ verlängern (grammatisch wackelig). Zwei Wege: (a) wie live die Zeile „Website auf Greenwashing prüfen.“ in die H1 der Vorschau nehmen (kleine Änderung in `ProductHead`), oder (b) die H1-Variante des Prüfers mit „Greenwashing-Vorwürfen und Abmahnungen“. Ich empfehle (a), weil das Keyword-Ziel der Seite von der SEO-Session so festgelegt wurde. Bitte mit ihr abstimmen.

**E-2 / E-4 Vorschlag:** Mit I-6 zusammen. Die kleinste Stufe (`lav-small`, 14 px) bleibt für Kacheln, Hinweise und Formulare. Längere Fließtexte rücken eine Stufe hoch. Die Beschreibungen der aufklappbaren Schritte (`ProcessAccordion`) auf Absatzgröße. Erst Figma, dann Code.

**E-5 Vorschlag:** Für die Vorschau nach „Sehen, was der Audit findet“ ein Bild einer Beispielanalyse in voller Breite, mit der Lightbox aus G-2. Dafür braucht es einen anonymisierten Screenshot (Kategorie, Textstelle, Vorschlag, Kommentar sichtbar). Bitte liefern oder freigeben.

**E-6a Vorschlag:** Button so lassen („Kostenlose Probeseite anfordern“). Mit der neuen Überschrift (E-6) doppelt sich nichts mehr. „hier …“ in einem Button ist unüblich und für Screenreader schwächer.

**E-7 Vorschlag:** Seitenbalken und Kursiv weg, „Hinweis:“ halbfett. Einen Pfeil würde ich nicht setzen, Pfeile stehen auf der Seite für Links. In Figma (Block Formular) mitziehen.

**E-8 Vorschlag:** Leerzeichen vor dem Stern entfernen. Das betrifft das Bauteil `FormField` und damit alle Formulare (Kontakt, Workshop, EmpCo) und die Figma-Komponente. Im Deutschen ist „E-Mail-Adresse*“ ohne Leerzeichen üblich.

**E-11 Vorschlag:** In der Tabelle und den FAQ einheitlich deutsch: „Green-Claims-Richtlinie (GCD)“, analog zu „EmpCo-Richtlinie“. Der englische Name steht einmal bei der ersten Nennung in Klammern („Green Claims Directive“). Betrifft mehrere Schlüssel (`compare.colGcd`, `compare.title`, `faq.q8`, `faq.q9`, `faq.a8`, `faq.a9`). Ich würde es umsetzen, wenn Dennis zustimmt. Ob der englische Begriff für die Suche wichtig ist, bitte vorher mit der SEO-Session klären.

---

## KI-Workshop `/de/lavender/ai-workshop/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| W-1 | „JETZT BEWERBEN“ mit Ausrufezeichen? | 2 | `workshop.anchor.apply`, `workshop.form.title` | ➖ bleibt |

**W-1 Vorschlag:** Ohne Ausrufezeichen lassen. Keiner der anderen Buttons und Überschriften hat eines („Kontakt aufnehmen“, „Demo anfragen“, „Buche dein Erstgespräch“).

---

## Privacy-led AI `/de/lavender/privacy-led-ai/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| P-1 | Die vier Prinzipien klingen nach KI (Dreiklänge, „nicht so, sondern so“) | 2 | `privacy.guidance.step1–4.desc` | ✅ |
| P-2 | Schwarz auf Blau schlecht lesbar, sanftes Weiß oder leuchtende Farbe | 3 | → G-1 | ➖ bleibt |

**P-1 Vorschlag** (ohne Dreierreihen und ohne „nicht X, sondern Y“):
- Klarheit: „Bevor wir etwas bauen, klären wir mit dir, welche Daten betroffen sind und welche Anwendungsfälle sich mit ihnen sicher umsetzen lassen. So entscheidest du auf Grundlage von Fakten, wo sich KI für dich lohnt.“
- Verantwortung: „Interne KI-Systeme müssen sich an dieselben Regeln halten wie dein Team. Wir bauen sie so, dass sie deine Governance und deine Datengrenzen einhalten. Gegenüber Kunden und Mitarbeitenden kannst du dann jede Verarbeitung begründen.“
- Transparenz: „Gerade bei sensiblen Daten willst du wissen, was mit ihnen passiert. Wir dokumentieren Architektur und Datenflüsse so, dass du jederzeit nachvollziehen kannst, welches System welche Daten verarbeitet und warum.“
- Sicherheit: „Deine Daten bleiben in deiner Umgebung. Wir setzen die KI direkt in deiner Infrastruktur auf, sodass Datenschutz und Prüfbarkeit gewahrt bleiben und du die Kontrolle behältst.“
- Die Unterzeile darüber (`privacy.guidance.subline`) hat dieselbe Dreierreihe wie das alte „Klarheit“ („was möglich ist, was sicher ist und was …“). Vorschlag: „KI in sensiblen Umgebungen wirft Fragen auf. Wir helfen dir herauszufinden, was in deiner Organisation sicher machbar ist und sich wirklich lohnt.“

---

## Was ist neu `/de/lavender/whats-new/`

| # | Anmerkung | Art | Status |
|---|---|---|---|
| N-1 | EmpCo Audit und Dennis' neues Whitepaper fehlen | 2 | ➖ zurückgestellt |
| N-2 | Liste lang, Monatsdaten machen die Seite alt (letzte Meldung März 2026). Daten entfernen, Seite in „Aktuelle Produkt-Updates“ umbenennen, Top 3 nach oben: EmpCo Audit Tool, Whitepaper (aktuelle Ausgabe), Intelligentic Search Release | 2/3 | ➖ zurückgestellt |

**N-1 Vorschlag:** Neue Einträge anlegen. Dafür brauche ich je Eintrag Titel, ein bis zwei Sätze, Datum und Link (Whitepaper: Titel und wo es liegt).

**N-2 Vorschlag:** Die Daten behalten und stattdessen neue Meldungen ergänzen. Ohne Datum ist eine News-Seite schwer einzuordnen, und für KI-Suche und Google zählt Aktualität mit sichtbarem Datum. Mit EmpCo Audit und Whitepaper oben wirkt die Seite nicht mehr still. Die Umbenennung in „Aktuelle Produkt-Updates“ passt nicht, sobald ein Whitepaper dabei ist. Ich würde „Was ist neu“ behalten.

---

## Kontakt, Danke-Seite

Laut Prüfer ok, keine Änderung.

---

## Impressum `/de/lavender/imprint/`

| # | Anmerkung | Art | Fundstelle | Status |
|---|---|---|---|---|
| M-1 | „info@iCompetence.de“ mit großem C, sonst überall klein | 1 | `LegalLavender.tsx` (fest im Code) | ✅ |

**M-1**
- vorher: „info@iCompetence.de“ (Linktext und `mailto:`)
- nachher: „info@icompetence.de“

**Nebenbefund:** Direkt davor steht fest im Code „Email:“, auf der DE-Seite wäre „E-Mail:“ richtig (Telefon kommt schon übersetzt aus `footer.phone`). Nicht angemerkt, deshalb nicht geändert.

---

## Datenschutz `/de/lavender/privacy-policy/`

| # | Anmerkung | Art | Status |
|---|---|---|---|
| D-1 | Stammen auch die EmpCo-Datenschutzangaben von Siebert/eRecht24 oder nur die allgemeinen? | 2 | ❓ |
| D-2 | Die Links in „Klicke hier, um …“ sehen aus wie normaler Text. Gewollt? | 3 | ✅ |
| D-3 | Sind die Rechtstexte von Siebert bzw. den Tool-Anbietern vorgegeben? | 2 | ❓ |

**D-1 / D-3:** Frage an Dennis, aus dem Code nicht zu beantworten. Der EmpCo-Abschnitt kommt aus den Schlüsseln `imprint.empco.*`, die Dienste-Texte aus `ServiceAccordion.tsx` (Usercentrics).

**D-2 Befund und Vorschlag:** Nicht gewollt, das ist ein Fehler. Die Links tragen die Klasse `underline`, aber `PageShell.tsx` setzt global `.lavender-page a { text-decoration: none; }` ohne Layer. Ungeschichtete Regeln schlagen alle Tailwind-Utilities, deshalb ist kein Inline-Link der Vorschau unterstrichen (auch die Mail-Adresse im Impressum nicht). Links im Fließtext müssen sich ohne Farbe abheben (WCAG 1.4.1). Fix: die Regel in `@layer base` verschieben, dann greift `underline`, wo es gesetzt ist. Vorher alle Seiten auf ungewollte Unterstreichungen durchsehen.

---

## 404 `/de/lavender/404/`

| # | Anmerkung | Art | Status |
|---|---|---|---|
| F-1 | Seite nutzen, um Besucher weiterzuleiten. Headline „Hier ging es leider nicht weiter.“, Subline mit Lösungen und Kontakt, zwei Buttons „Zu den KI-Tools“ und „Kontakt aufnehmen“. „Dennis: Was meinst du?“ | 2 | ✅ |

**F-1 Vorschlag:** Gute Idee, in du-Form (der Vorschlag ist in Sie-Form):
- Headline: „Hier geht es leider nicht weiter.“ („404“ bleibt klein darüber)
- Subline: „Die Seite, die du suchst, gibt es nicht mehr oder sie wurde verschoben. Schau dir unsere Produkte an oder schreib uns.“
- Buttons: „Zu den Produkten“ (Startseite `#products`) und „Kontakt aufnehmen“. „KI-Tools“ würde ich nicht einführen, die Seite nennt sie überall „Produkte & Tools“.

---

## Zweite Runde: Entscheidungen von Dennis (13.11.2026)

Dennis hat die Vorschläge oben freigegeben, mit diesen Abweichungen und Ergänzungen:

- **G-1 / P-2 Schrift auf Blau:** bleibt dunkel (5,58 : 1).
- **H-1 Ausklappfenster Startseite:** entfällt, die Leistungen sind inzwischen ein anderes Bauteil.
- **H-4:** iCompetence betreibt die KI auf Wunsch auch. Text: „Produktionsreife GenAI-Funktionen, die sicher laufen und deren Ergebnisse geprüft sind. Auf Wunsch übernehmen wir auch den Betrieb.“
- **C-6 CPT-Funktionen:** Die Zuordnung war seit dem ersten Commit (21.01.2026) falsch. Die acht Beschreibungen passen zu den Icons der Live-Seite, die Titel kamen aus einer anderen Liste. Neu nach den Begriffen des CPT-Produktblatts, je Punkt mit Nutzen: Generierung, Namenskonventionen, Governance, Prüfung, Massenerstellung, Anbindung, Links, Historie (DE und EN, nur Vorschau).
- **C-11 Abschluss-Satz:** in der Session „iC | Website“ entschieden (Abschlusszeile der Startseite jetzt auf allen Unterseiten).
- **F-1 404:** Button „Produkte ansehen“ statt „Zu den Produkten“, weil Buttons seit 13.11. im Infinitiv stehen.
- **N-1 / N-2 Was ist neu:** zurückgestellt, die Seite wird erst insgesamt aktualisiert.
- **D-2 / Link-Fehler:** behoben im Branch `claude/unterseiten-licht-und-linie-d96d42` (Commit dc3645e), dort liegt die Reset-Regel in `PageShell.tsx` in `@layer base`. Mit derselben Änderung geprüft: auf allen DE-Vorschauseiten unterstrichen sind nur die Links im Datenschutz und Impressum, dazu neu die Quellenangabe „Amazon“ auf Intelligentic Search. Sonst hat sich nichts verändert.
- **E-7, E-8, I-9, K-2, U-3, A-4, C-3, C-7, H-5, P-1, E-14 (Schritt 4), Impressum „E-Mail:“:** wie vorgeschlagen umgesetzt.
- **E-1 Greenwashing in der H1:** erledigt von der SEO/GEO-Session (Branch `claude/seo-geo-lavender-342459`, neues Prop `sublineInHeading` in `ProductHead`). Die H1 lautet im HTML „EmpCo Audit: Website auf Greenwashing prüfen.“, die Optik bleibt. Die H1 des Prüfers würde das Suchziel verschieben und wird nicht übernommen.
- **E-11 Green-Claims-Richtlinie:** mit der SEO/GEO-Session abgestimmt und umgesetzt. Tabellenkopf „Green-Claims-Richtlinie (GCD)“, Überschrift „EmpCo-Richtlinie und Green-Claims-Richtlinie (Green Claims Directive) im Vergleich“, FAQ q8 und a8 deutsch, q9 „Wurde die Green-Claims-Richtlinie (Green Claims Directive) zurückgezogen? Was gilt jetzt?“. Der englische Name bleibt damit an genau zwei Stellen sichtbar, weil danach gesucht wird.

**Noch offen (⏳):**
- Erledigt in der vierten Runde: C-10 (Produktzeile als Link), Schriftstufen (I-6, E-2, E-4), Abstand UJE (U-5). C-8 (Zitate) hat der Branch `claude/unterseiten-licht-und-linie-d96d42` erledigt.
- D-1 / D-3 (Herkunft der Rechtstexte): Frage des Prüfers an Dennis.

---

## Dritte Runde: Lightbox und Alt-Texte (13.11.2026)

- **G-2, I-4, U-1 Lightbox:** neuer Baustein `ZoomImage` (`src/design-system/ZoomImage.tsx`). Das Bild bleibt im Seiten-HTML, liegt aber in einem Button; ein Klick oder Enter öffnet es bildschirmfüllend auf Navy, Escape, der Schließen-Button oder ein Klick daneben schließen, der Fokus kehrt zurück. Ein kleines Lupen-Abzeichen zeigt, dass man vergrößern kann. Eingesetzt in jeder Galerie (`MediaGallery`: Produktköpfe und „in Aktion“), in den Standbildern von `ImageText` (Videos bleiben) und beim CPT-Bild „So funktioniert das Tool“.
- **E-5:** Kein neuer Screenshot nötig. Das vorhandene Tool-Bild zeigt schon eine Analyse (Befunde, Zitate, Notizen, Zweitbewertung). Es steht jetzt in voller Breite direkt nach „Sehen, was der Audit findet“ und ist vergrößerbar. Der Abschnitt „Was ist der Audit“ ist dafür reiner Text, sonst stünde dasselbe Bild dreimal auf der Seite.
- **G-3:** Galerie-Vorschaubilder heißen „Bild anzeigen 2: <Alt-Text>“ statt nur mit Nummer. Die dünnen, fest eingebauten englischen Alt-Texte („How it works“, „iKnow Chat“, „Analytics Agent Dashboard“ …) sind durch übersetzte Beschreibungen ersetzt (`lavender.alt.*`), auf CPT, Intelligentic Search, Analytics Agent und iKnow.
- **Private Adresse entfernt:** Der iKnow-Screenshot „Connectoren“ (`public/assets/iknow/connectoren.png`) zeigte im Feld „Verbindung“ eine private Gmail-Adresse, in der Lightbox gut lesbar. Auf Dennis' Wunsch ersetzt durch „name@beispiel.de“ in Schrift und Farbe der Oberfläche (Inter), nur dieser Bildbereich ist geändert. Das Bild nutzt auch die Live-Seite. Das Connectoren-Video zeigt nur Logos und ist unkritisch.

---

## Vierte Runde: Produktzeile als Link, Schriftstufen, Abstand (13.11.2026)

- **C-10:** Jede Produktzeile ist als Ganzes ein Link (`ProductRow`: Startseite mit EmpCo, iKnow, Analytics Agent und Privacy-led, dazu „Weitere Produkte“ am Ende der Produktseiten). Ein Klick auf Überschrift, Text oder Bild führt zur Produktseite. Die Klickfläche reicht so weit wie das Bild, auch dort, wo es bis an den Rand läuft. Im HTML bleibt es ein Link mit dem Button-Text als Namen, Tastatur und Screenreader merken keinen Unterschied, der Fokusrahmen liegt am Button. Fährt die Maus irgendwo über die Zeile, färbt sich der Button mit dem Stern-Verlauf, beim Drücken gibt er nach wie jeder Button. Der Button ist dafür ein gezeichnetes `span` im Link; die Regel „A button drawn inside a link“ in `globals.css` gibt ihm Hover, Fokus und Druck des Links.
- Nebenwirkung: Text in der Zeile lässt sich mit der Maus nicht mehr markieren, weil die Klickfläche darüber liegt. Bei Teasern, die zu einer eigenen Seite führen, ist das üblich.
- **I-6, E-2, E-4 Schriftstufen:** Auf Dennis' Wunsch nur im Code, Figma bleibt. Die Regel jetzt: Absätze stehen immer in Absatzgröße (`lav-body`, 16 px auf allen Breiten). Größer (`lav-lead`, 24 px ab Tablet) sind nur noch einzelne Sätze, die einleiten: die Subline im Seitenkopf, der hervorgehobene Satz unter einem Titel (iKnow „Die Frage ist nicht …“), die Einladung zum Workshop-Formular. 14 px nur für Hinweise, Beschriftungen, Formulare und das Aktualisierungsdatum. Hervorgehobene Schlusszeilen („Genau hier setzt der EmpCo Audit an.“, „Wie das geht? Mit iKnow.“ usw.) stehen in Absatzgröße und halbfett, wie für K-2 entschieden.
  - Umgestellt von 24 auf 16 px: Einleitungsabsätze unter Abschnittstiteln (`SectionHeader`), die Texte in `QuoteIntro` und `ImageText`, der erste Absatz im Erklärteil (`Explainer`, die Kernantwort bleibt fett), die Abschnitte „Warum“ und „Was ist“ auf EmpCo, iKnow und Analytics Agent, „It's a match!“, „Modular und dynamisch“ und „Ohne Umweg zum Produkt“ auf Intelligentic Search, die Einleitung des KI-Workshops, die Problembeschreibung auf Privacy-led. Die längste davon hatte 8 Zeilen in 24 px.
  - Von 15 auf 16 px (auf dem Handy, `lav-paragraph` → `lav-body`): die aufklappbaren Schritte (`ProcessAccordion`, E-4), die zwei Absätze über den rosa Kacheln (E-4), „Was ist der Audit“, Faktenband, Grundsätze auf Privacy-led.
  - Abstände dazu: Absätze untereinander 24 px (eine Zeile, wie überall bei Fließtext), Überschrift zu Text in den Bild-Text-Blöcken 24 px (wie in `ProductRow`), Abschnittstitel zu den Absätzen darunter 32 px (wie in `SectionHeader`). Fließtext-Spalten auf 760 px (`measure-lead`, wie im Erklärteil) statt 820 px.
  - Geprüft im Browser bei 1440 px auf allen Produktseiten: Fließtext durchgehend 16 px, in 24 px nur noch Kopf-Sublines und Einzelsätze, in 14 px nur Hinweise. Auf dem Handy kein seitliches Überlaufen.
- **U-5:** Auf dem User Journey Explorer lagen zwischen der Einleitung „Erkunde echte User Journeys …“ und dem ersten Bild-Text-Block 48 px, zwischen den Blöcken 96 px. Die Einleitung klebte so am ersten Block. Jetzt ist der Abstand gleich (56 px mobil, 96 px ab Desktop), auch auf Intelligentic Search, iKnow und Analytics Agent, die denselben Aufbau haben.

---

## Prüfung im Browser (13.11.2026, Dev-Server)

Je Seite alle Akkordeons, Leistungs-Tabs und FAQ-Antworten geöffnet, dann `document.body.innerText` durchsucht: Jeder neue Text ist da, keiner der alten mehr.

- `/de/lavender/` und `/de/lavender/nacht-hamburg/`: H-2, H-3
- `/de/lavender/campaign-parameter-tool/`: C-1, C-2, C-2a, C-4, C-5, C-9
- `/de/lavender/intelligentic-search/`: I-1 bis I-3, I-7, I-8, I-10, I-11
- `/de/lavender/icu-user-journey-explorer/`: U-2, U-6
- `/de/lavender/analytics-agent/`: A-1 bis A-3, A-5, A-6
- `/de/lavender/iknow/`: K-1
- `/de/lavender/empco-audit/`: E-6, E-9, E-10, E-12 bis E-15, E-19, E-20; strukturierte Daten mit 18 statt 19 Fragen und dem neuen Wortlaut. `/en/lavender/empco-audit/` ohne „Are carbon offsets a scam?“.
- `/de/lavender/imprint/`: M-1 (Linktext und `mailto:`)
- Gegenprobe: `/de/empco-audit/`, `/de/campaign-parameter-tool/`, `/de/intelligentic-search/` (Live-Seiten) zeigen weiterhin die alten Texte.

---

## Englische Seiten (nicht Teil dieses Auftrags)

- `/en/lavender/` Hero: Der Prüfer schlägt vor, „ambitious“ ins Ergebnis zu ziehen: „We help teams excel by turning data and AI into real business outcomes“. Offen.
- Die übrigen EN-URLs stehen nur als Liste im PDF, ohne Anmerkungen.
- E-19 (Carbon-Offsets-FAQ) ist auch auf Englisch entfernt, weil der Prüfer das ausdrücklich verlangt.
- Die EN-Fassungen der geänderten DE-Texte sind nicht angepasst (z. B. Executive Briefings, Workshops, FAQ „Who is liable …“). Wenn sie nachziehen sollen, bitte sagen.
