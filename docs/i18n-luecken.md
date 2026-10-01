# Übersetzungslücken – DE/EN

Stand: 25.09.2026. Grundlage sind wortgenaue Inventuren aller Seiten (Code-Stand `dev-dial-panel`).

**Routen vs. Inhalt:** Jede Seite wird unter `/de/…` und `/en/…` gebaut (`generateStaticParams` in `app/[lang]/layout.tsx`). Übersetzt ist aber nur, was über `t('…')` aus `src/contexts/LanguageContext.tsx` kommt. Fest im JSX stehender Text erscheint in beiden Sprachen gleich.

Die Übersetzungen unten sind **Entwürfe von Claude**. Sie werden beim Neubau der Seiten als Schlüssel in `LanguageContext.tsx` angelegt. Die Schlüsselnamen sind Vorschläge.

**Entscheidung 25.09.2026: Wir duzen durchgehend.** Alle DE-Texte sind in „du“ formuliert, der Footer-Claim bleibt englisch. In Figma sind alle Seiten bereits umgestellt (Abschnitt 7).

---

## 1. Privacy-led AI – der Hauptteil existiert nur auf Englisch (DE fehlt)

Der Services-Block (Karussell mit 3 Karten) entfällt laut Entscheidung und wird nicht übersetzt. In Figma ist die DE-Fassung bereits gesetzt (Seite „Privacy-led AI · Prinzip-Seite“).

| Schlüssel (Vorschlag) | EN (Code) | DE (Entwurf) |
|---|---|---|
| privacy.hero.title | Privacy-led AI | Privacy-led AI |
| privacy.hero.subline | Intelligence without Exposure | Intelligenz ohne Datenpreisgabe |
| privacy.anchor.intro | Intro | Intro |
| privacy.anchor.problem | Problem | Problem |
| privacy.anchor.consulting | Consulting | Beratung |
| privacy.anchor.contact | Contact | Kontakt |
| privacy.intro.line1 | AI is ready. Your data is not. | KI ist bereit. Deine Daten sind es nicht. |
| privacy.intro.text | AI is becoming a fundamental driver of efficiency and competitiveness. But every organization working with sensitive data faces the same barrier: AI cannot go where the data lives — and the data cannot go where the AI runs. | KI wird zum grundlegenden Treiber für Effizienz und Wettbewerbsfähigkeit. Doch jede Organisation, die mit sensiblen Daten arbeitet, stößt auf dieselbe Hürde: Die KI kann nicht dorthin, wo die Daten liegen – und die Daten können nicht dorthin, wo die KI läuft. |
| privacy.intro.solution | The solution: Bring AI to your data. | Die Lösung: Bring die KI zu deinen Daten. |
| privacy.guidance.title | If you're unsure where to start, we're here to guide you. | Wenn du unsicher bist, wo du anfangen sollst, begleiten wir dich. |
| privacy.guidance.subline | AI in sensitive environments raises questions. We help you understand what's possible, what's safe, and what creates real value in your organisation. | KI in sensiblen Umgebungen wirft Fragen auf. Wir helfen dir zu verstehen, was möglich ist, was sicher ist und was in deiner Organisation echten Mehrwert schafft. |
| privacy.guidance.step1.label | Clarity | Klarheit |
| privacy.guidance.step1.desc | AI raises big questions — and clarity is where everything starts. We help you understand what's possible, what's safe and what truly drives value, so you can move forward without uncertainty. | KI wirft große Fragen auf – und Klarheit ist der Anfang von allem. Wir helfen dir zu verstehen, was möglich ist, was sicher ist und was wirklich Wert schafft, damit du ohne Unsicherheit vorankommst. |
| privacy.guidance.step2.label | Responsibility | Verantwortung |
| privacy.guidance.step2.desc | AI should serve your organisation, not undermine its principles. We design internal AI systems that respect your governance, your data boundaries and your responsibility toward customers and employees. | KI soll deiner Organisation dienen, nicht ihre Prinzipien untergraben. Wir gestalten interne KI-Systeme, die deine Governance, deine Datengrenzen und deine Verantwortung gegenüber Kundinnen, Kunden und Mitarbeitenden respektieren. |
| privacy.guidance.step3.label | Transparency | Transparenz |
| privacy.guidance.step3.desc | Understanding how AI works is essential — especially in sensitive environments. We make architectures, data flows and decision paths visible, so you always know what happens, where and why. | Zu verstehen, wie KI funktioniert, ist entscheidend – gerade in sensiblen Umgebungen. Wir machen Architekturen, Datenflüsse und Entscheidungswege sichtbar, damit du jederzeit weißt, was wo und warum geschieht. |
| privacy.guidance.step4.label | Security | Sicherheit |
| privacy.guidance.step4.desc | Your data never leaves your environment. We implement AI inside your infrastructure — secure, compliant, auditable — giving you the confidence and control you need to innovate safely. | Deine Daten verlassen niemals deine Umgebung. Wir implementieren KI in deiner Infrastruktur – sicher, konform, prüfbar – und geben dir das Vertrauen und die Kontrolle, die du für sichere Innovation brauchst. |

EN-Nebenbefund: Der Code schreibt „organization“ und „organisation“ gemischt. Vorschlag: einheitlich „organisation“ (britisch), weil das häufiger vorkommt.

---

## 2. KI-Workshop – nur Deutsch, fest im JSX (EN fehlt)

Das betrifft auch `/en/ai-workshop/`: Dort ist nur der Seitentitel englisch.

| Schlüssel (Vorschlag) | DE (Code) | EN (Entwurf) |
|---|---|---|
| workshop.hero.title | Der KI-Workshop | The AI Workshop |
| workshop.hero.subline | KI-Boost für Marken | An AI boost for brands |
| workshop.anchor.intro | Intro | Intro |
| workshop.anchor.about | Über den Workshop | About the workshop |
| workshop.anchor.experts | Experten | Experts |
| workshop.anchor.apply | Jetzt bewerben | Apply now |
| workshop.anchor.contact | Kontakt | Contact |
| workshop.intro.run1 | Von den Machern der ersten selbständig lernenden datenschutzkonformen deutschen Datenplattform „iKnow" und der „Intelligentic Search". | From the makers of “iKnow”, the first self-learning, privacy-compliant German data platform, and “Intelligentic Search”. |
| workshop.intro.run2 | Im Rennen um die vorderen Plätze auf dem Markt spielt KI eine zentrale Rolle. Aber wie sie sicher nutzen? Was sind die Voraussetzungen - auch hinsichtlich der Datenmenge und -qualität? Welche Sichtbarkeit, welchen Nutzen und ROI kann ich erwarten? Wir klären die zentralen Fragen für Marken und Marketers. | In the race for the top spots in the market, AI plays a central role. But how do you use it safely? What are the prerequisites – including data volume and quality? What visibility, benefits and ROI can you expect? We answer the key questions for brands and marketers. |
| workshop.intro.run3 | Der Workshop, der dir einen Überblick gibt, von den Experten, die an der Spitze der deutschen KI Entwicklung mitwirken. Einblicke und Platz für deine Fragen. (DE neu in „du“) | The workshop that gives you the big picture, from experts at the forefront of AI development in Germany. Insights and room for your questions. |
| workshop.intro.run4 | Gratis. Nur wenige Plätze! | Free. Limited seats! |
| workshop.experts.title | Unsere Experten | Our experts |
| workshop.form.title | Jetzt bewerben | Apply now |
| workshop.form.intro | Sichere dir deinen Platz beim KI-Workshop. (DE neu in „du“) | Secure your seat at the AI Workshop. |
| workshop.form.name | Name * | Name * |
| workshop.form.email | E-Mail * | Email * |
| workshop.form.phone | Telefon (optional) | Phone (optional) |
| workshop.form.position | Position * | Position * |
| workshop.form.company | Firma * | Company * |
| workshop.form.dates | Bevorzugte(r) Termin(e) * | Preferred date(s) * |
| workshop.form.dateCustom | Individuellen Termin buchen | Book an individual date |
| workshop.form.submit | Bewerbung absenden | Submit application |

- **Rollen der Experten:** Sie sind im Code in beiden Sprachen englisch (z. B. „Head of Experience Orchestration“). Vorschlag: so lassen, es sind Jobtitel.
- **Foto-Credit:** „Source: Frank Krems“ braucht auf DE die Fassung „Foto: Frank Krems“.
- **Fehlermeldungen:** Sie laufen bereits über `form.recaptchaError` und `form.submitError` und haben EN.

---

## 3. User Journey Explorer – fest verdrahtetes Englisch auf `/de/`

| Stelle | EN (Code) | DE (Entwurf) |
|---|---|---|
| Ankerleiste (01) | Intro | Intro |
| Ankerleiste (02) | Status Quo | Status quo |
| Ankerleiste (03) | Benefits | Vorteile |
| Ankerleiste (04) | More about ICU | Mehr über ICU |
| Ankerleiste (05) | FAQ | FAQ |
| Ankerleiste (06) | Contact | Kontakt |
| Karussell-Buttons (`Carousel.tsx`, betrifft alle Seiten) | Previous / Next | Zurück / Weiter |
| Alt-Texte | From overview to every detail · Complexity, simplified · How users actually reach conversion · iCU Agent chat interface · Interactive analysis | Vom Überblick bis ins Detail · Komplexität, vereinfacht · So erreichen Nutzer die Conversion · Chat-Oberfläche des ICU-Agenten · Interaktive Analyse |

---

## 4. Intelligentic Search – Englisch auf `/de/`

| Stelle | EN (Code) | DE (Entwurf) |
|---|---|---|
| Amazon-Zitat (hartcodiert) | "...customers who use Rufus during a shopping journey are 60% more likely to complete a purchase." | „…Kundinnen und Kunden, die Rufus beim Einkaufen nutzen, schließen einen Kauf mit 60 % höherer Wahrscheinlichkeit ab.“ (Übersetzung, Quelle weiter „Amazon, 2025“) |
| is.features.title (steht auch in `de`) | It's a match! | Entscheidung nötig: als Claim auf Englisch lassen, oder DE „Volltreffer!“ |
| Alt-Text | Intelligentic Search Demo | Intelligentic Search – Demo |

---

## 5. Seitenübergreifend

| Stelle | EN | DE (Entwurf) |
|---|---|---|
| footer.tagline | Separate the signal from the noise. | **Entschieden:** bleibt englisch (Markenclaim), in beiden Sprachen gleich. |
| Logo-Alt „Logo“ | Logo | iCompetence (in beiden Sprachen; kein Übersetzungs-, sondern ein Barrierefreiheitsfehler) |
| Kontaktformular Label (DE) | Email Address | „E-Mail-Adresse“ statt „Email Adresse“ |
| Impressum „Email:“ | Email: | E-Mail: |

---

## 6. Bewusst nicht übersetzt

- **Impressum / Datenschutz, Dienste-Akkordeon (6 Dienste, DSGVO-Texte):** Es steht auch auf `/en/` auf Deutsch. Empfehlung: die EN-Fassung nicht selbst übersetzen, sondern die englischen Texte aus Usercentrics bzw. eRecht24 übernehmen. Das sind die Quellen der DE-Texte. Es sind Rechtstexte und sie gehören juristisch freigegeben.
- **Fehlende Datenschutzerklärung:** Eine echte Datenschutzerklärung existiert nicht. Alle „Datenschutz“-Links führen aufs Impressum. Das ist keine Übersetzungs-, sondern eine Inhaltslücke. Der Text muss neu erstellt und juristisch geprüft werden.

---

## 7. Ansprache: „du“ durchgehend (entschieden 25.09.2026)

- **Figma:** Alle Seiten sind umgestellt, auch Impressum, Datenschutzerklärung und die Dienste-Texte. Figma ist damit die Quelle für den neuen Wortlaut.
- **Umfang:** 111 Texte mit Sie-Ansprache, davon 107 Stellen umgestellt. Nicht umgestellt wurden Sätze, in denen „Sie“ die dritte Person meint, z. B. „Sie weiß, was deine Metriken bedeuten“ (die Wissensbasis) oder „Sie verbietet irreführende Umweltaussagen“ (die Richtlinie).
- **Code:** Beim Neubau der Seiten wird der `de`-Wortlaut aus Figma übernommen, das betrifft die `de`-Werte in `LanguageContext.tsx` und fest verdrahtete Texte. Gemeinsame Texte wie `header.contact`, `cta.*` und `form.*` duzen bereits und bleiben.
- **Rechtstexte:** Impressum und Datenschutz sind ebenfalls geduzt. Das ist rechtlich unproblematisch, sollte aber bei der juristischen Prüfung der Datenschutzerklärung mitlaufen.

## 8. Neuigkeiten: Eintrag zu Privacy-led AI

Privacy-led AI ist ein Prinzip, kein Produkt. Der Eintrag „Privacy-Led AI — neues Compliance-Dashboard“ kündigt ein Produkt an, das es nicht gibt. In Figma ist er neu formuliert (Entwurf):

| | DE | EN |
|---|---|---|
| Titel | Privacy-led AI — unser Prinzip für KI mit sensiblen Daten | Privacy-led AI — our principle for AI with sensitive data |
| Teaser | KI kommt zu deinen Daten, nicht umgekehrt. Klarheit, Verantwortung, Transparenz und Sicherheit: Nach diesen vier Prinzipien setzen wir KI in deiner Infrastruktur um. | AI comes to your data, not the other way around. Clarity, responsibility, transparency and security: the four principles we follow when implementing AI inside your infrastructure. |

## 9. 404-Seite: nur Englisch, fest im JSX (`app/[lang]/not-found.tsx`)

Die 404-Seite hat keine `t()`-Keys, ist noch im alten Design und verlinkt fest auf `/de/`. In Figma ist sie im Lavender-Design nachgebaut (Hero mit Titel, Subline, Button; Desktop/Tablet/Mobil) — die DE-Seiten seit 30.09.2026 mit dem DE-Entwurf unten (der Code ist weiter nur englisch). DE-Entwurf:

| Stelle | EN (Code) | DE (Entwurf) |
|---|---|---|
| Titel | 404 / Page not found | 404 / Seite nicht gefunden |
| Text | The page you are looking for doesn't exist or has been moved. | Die Seite, die du suchst, existiert nicht oder wurde verschoben. |
| Button | Back to home | Zurück zur Startseite (wie auf der Danke-Seite, `ThankYouPage.tsx`) |

Hinweis: der Button sollte auf `/${language}/` zeigen statt fest auf `/de/`.

## 9a. Trial-/Demo-Modal (Campaign Parameter Tool) – „du“-Fassung

`CTTrialModal.tsx` nutzt `ct.trial.modal.*` / `ct.demo.modal.*`, die `de`-Werte siezen noch. In Figma (Komponente „TrialModal“, Mode=Trial|Demo × State=Formular|Senden|Erfolg) stehen die du-Fassungen:

| Schlüssel | DE (Code, Sie) | DE (Figma, du) | EN (Code) |
|---|---|---|---|
| ct.trial.modal.title | Starten Sie Ihren Trial | Starte deinen Trial | Start Your Free Trial |
| ct.trial.modal.subtitle | Füllen Sie das Formular aus und wir melden uns in Kürze bei Ihnen. | Füll das Formular aus und wir melden uns in Kürze bei dir. | Fill out the form and we'll get back to you shortly. |
| ct.demo.modal.title | Fragen Sie Ihre Demo an | Frag deine Demo an | Request Your Demo |
| ct.demo.modal.subtitle | Füllen Sie das Formular aus und wir vereinbaren eine persönliche Demo. | Füll das Formular aus und wir vereinbaren eine persönliche Demo. | Fill out the form and we'll schedule a personalized demo. |
| ct.trial.modal.success | Vielen Dank! Wir melden uns in Kürze bei Ihnen. | Vielen Dank! Wir melden uns in Kürze bei dir. | Thank you! We'll be in touch soon. |

Nebenbefund: Auf 390 px ist das Modal (872 px) höher als der Viewport (844 px); der Code zentriert ohne Scroll (`fixed inset-0 flex items-center`), Kopf und Fuß werden abgeschnitten. In Figma so nachgebildet, im Code zu fixen (`overflow-y: auto` / `items-start`).

## 10. EN-Seiten in Figma (Desktop 1440, Stand 25.09.2026)

Alle 14 Desktop-Seiten liegen in der Figma-Section „Seiten · EN · Desktop 1440“. Vorgehen: DE-Seite geklont, jeder Text gegen die `de`/`en`-Paare aus `LanguageContext.tsx` abgeglichen (unscharf, weil die DE-Seiten in Figma bereits geduzt sind) und durch den `en`-Wert aus dem Code ersetzt. Nur wo der Code kein Englisch hat, kamen die Entwürfe aus diesem Dokument zum Einsatz:

| Seite | EN-Quelle |
|---|---|
| Homepage, CPT, iKnow, Analytics Agent, UJE, Intelligentic Search, EmpCo, Kontakt, Danke, Neuigkeiten, Impressum | `en`-Werte aus `LanguageContext.tsx` (1:1) |
| KI-Workshop | Entwürfe aus Abschnitt 2 (Code ist DE-only) |
| Privacy-led AI | englischer Originaltext aus `PrivacyLedAIPage.tsx` (Abschnitt 1) |
| Neuigkeiten, Eintrag Privacy-led | Entwurf aus Abschnitt 8 |
| Datenschutzerklärung | Rahmen + EmpCo-Abschnitt aus `imprint.*`; die 6 Dienste-Texte (Usercentrics) bleiben absichtlich deutsch (Abschnitt 6) |
| Impressum | `imprint.*`, dabei TMG→DDG auch im Englischen („German Digital Services Act“) |
| 404 | ist im Code nur englisch – die Figma-Seite ist bereits EN |

Nebenbefunde: Die EN-Anker der UJE-Seite standen auch auf der DE-Seite noch englisch – in Figma jetzt „Status quo · Vorteile · Mehr über ICU · FAQ · Kontakt“ (Desktop, Tablet, Mobil). Die EN-Fassungen für Tablet (768) und Mobil (390) liegen in den Sections „Seiten · EN · Tablet 768“ und „Seiten · EN · Mobil 390“ – abgeleitet aus den DE-Tablet-/Mobil-Seiten mit den DE→EN-Paaren der jeweiligen Desktop-Seite.


## 11. Englisch: Satzschreibung und amerikanische Rechtschreibung (beschlossen 30.09.2026)

Entscheidung: Englische Überschriften, Labels und Buttons stehen in Satzschreibung (nur das erste Wort und Eigennamen groß). Groß bleiben Produktnamen (Campaign Parameter Tool, Analytics Agent, EmpCo Audit, Intelligentic Search, ICU – User Journey Explorer, AI Workshop, Privacy-led AI), Abkürzungen (UTM, AI, BI, GA4), Namen von Gesetzen und Richtlinien (EmpCo Directive, Green Claims Directive, German Digital Services Act), Firmen- und Personennamen sowie Jobtitel. Für die Rechtschreibung gilt amerikanisches Englisch.

In Figma ist beides auf allen 42 EN-Seiten umgesetzt. Der Code ist unverändert; die folgenden `en`-Werte in `src/contexts/LanguageContext.tsx` sind anzupassen.

### 11a. Satzschreibung (65 Schlüssel)

| Key | bisher | neu |
|---|---|---|
| `iknow.anchor.statusQuo` | Status Quo | Status quo |
| `iknow.anchor.benefits` | Your Benefits | Your benefits |
| `empco.anchor.what` | About the Audit | About the audit |
| `analyticsAgent.anchor.challenge` | The Challenge | The challenge |
| `analyticsAgent.anchor.inAction` | In Action | In action |
| `privacyLed.title` | Privacy-Led Setups | Privacy-led setups |
| `cta.headline` | Ready to enable your company for the Agentic Era? | Ready to enable your company for the agentic era? |
| `burgerMenu.products` | Products & Tools | Products & tools |
| `imprint.section2.title` | Register Entry | Register entry |
| `imprint.section3.title` | Image Credits | Image credits |
| `imprint.section4.content.title` | Liability for Content | Liability for content |
| `imprint.section4.links.title` | Liability for Links | Liability for links |
| `imprint.empco.title` | EmpCo Audit (Greenwashing Check) | EmpCo Audit (greenwashing check) |
| `contact.form.email` | Email Address | Email address |
| `contact.form.submit` | Send Request | Send request |
| `is.anchor.statusQuo` | Status Quo | Status quo |
| `is.anchor.howItWorks` | How it Works | How it works |
| `is.features.step2.label` | Integrated Image Search | Integrated image search |
| `is.features.step3.label` | Intelligentic Search is the Real AI | Intelligentic Search is the real AI |
| `is.howItWorks.title` | Under the hood: How the Intelligentic Search Engine works | Under the hood: How the Intelligentic Search engine works |
| `is.comparison.secondaryHeader` | Traditional Search | Traditional search |
| `is.comparison.row1.feature` | Time to Product | Time to product |
| `is.comparison.row2.feature` | Search Style | Search style |
| `is.comparison.row3.feature` | Recommended Products | Recommended products |
| `icu.faq.title` | Frequently Asked Questions | Frequently asked questions |
| `ct.hero.headline` | UTM Automation for Marketing, Media & Analytics Teams | UTM automation for marketing, media & analytics teams |
| `ct.hero.bullet3` | Clean data for Analytics & Attribution | Clean data for analytics & attribution |
| `ct.hero.bullet4` | Optimized for Media and Performance Teams | Optimized for media and performance teams |
| `ct.hero.cta1` | Start Trial | Start trial |
| `ct.values.title` | The Value for Your Team | The value for your team |
| `ct.values.card1.title` | Consistent UTM Parameters – Across All Channels | Consistent UTM parameters – across all channels |
| `ct.values.card2.title` | Zero Maintenance – Clear Governance in the Team | Zero maintenance – clear governance in the team |
| `ct.values.card3.title` | Less Time Wasted – More Campaigns | Less time wasted – more campaigns |
| `ct.values.card4.title` | Clean Analytics & Attribution | Clean analytics & attribution |
| `ct.demo.title` | How the Tool Works | How the tool works |
| `ct.testimonials.title` | Experts Trust Us | Experts trust us |
| `ct.features.title` | Everything You Need for Clean Tracking | Everything you need for clean tracking |
| `ct.features.item1.title` | Automated UTM Generation | Automated UTM generation |
| `ct.features.item2.title` | Parameter Templates & Governance Layer | Parameter templates & governance layer |
| `ct.features.item2.description` | Role-based access control and collaboration features for Marketing, Media and Analytics teams. | Role-based access control and collaboration features for marketing, media and analytics teams. |
| `ct.features.item3.title` | Logging & Documentation | Logging & documentation |
| `ct.features.item4.title` | Multi-User Workflow | Multi-user workflow |
| `ct.features.item5.title` | Channel & Vendor Standardization | Channel & vendor standardization |
| `ct.features.item6.title` | Reusable Campaign Structures | Reusable campaign structures |
| `ct.features.item7.title` | Integration into Existing MarTech Stack Workflows | Integration into existing MarTech stack workflows |
| `ct.features.item8.title` | Export to Analytics & BI Tools | Export to analytics & BI tools |
| `ct.why.title` | Why Clean UTM Parameters Are Critical | Why clean UTM parameters are critical |
| `ct.why.problem.title` | Without Standards | Without standards |
| `ct.pricing.trialBadge` | 14 Day Free Trial | 14 day free trial |
| `ct.pricing.tier1.rooms` | 1 Parameter Space | 1 parameter space |
| `ct.pricing.tier2.rooms` | 2 to 4 Parameter Spaces per Space | 2 to 4 parameter spaces per space |
| `ct.pricing.tier3.rooms` | 5+ Parameter Spaces per Space | 5+ parameter spaces per space |
| `ct.pricing.cta` | Start Trial | Start trial |
| `ct.trial.modal.email` | Email Address | Email address |
| `ct.faq.title` | Frequently Asked Questions | Frequently asked questions |
| `ct.cta.title` | Experience iCPT in a Live Demo | Experience iCPT in a live demo |
| `ct.cta.button` | Request Demo | Request demo |
| `whatsNew.hero.title` | What's New at iCompetence | What's new at iCompetence |
| `lavender.services.title` | Our Services | Our services |
| `lavender.services.data.strategy.label` | Data Strategy | Data strategy |
| `lavender.services.data.engineering.label` | Data Engineering | Data engineering |
| `lavender.products.featuredEyebrow` | Featured Product | Featured product |
| `lavender.process.ideation.title` | Ideation Workshop | Ideation workshop |
| `lavender.process.poc.title` | Proof of Concept | Proof of concept |
| `lavender.privacyLed.title` | Privacy-Led Setups | Privacy-led setups |

Nicht in `LanguageContext.tsx`, sondern fest im Code: „Privacy Policy“ → „Privacy policy“ (`src/components/Footer.tsx`), „Intelligence without Exposure“ → „Intelligence without exposure“ (Privacy-led-AI-Seite).

Die Liste enthält nur Texte, die auf den Figma-Seiten vorkommen. Weitere `en`-Werte in Title Case (z. B. aus Abschnitten der alten Startseite) folgen derselben Regel, sobald sie wiederverwendet werden.

### 11b. Amerikanische Rechtschreibung (17 Schlüssel)

| Key | Wörter |
|---|---|
| `offer.right.service1` | prioritised → prioritized |
| `empco.feature1.desc` | analysed → analyzed |
| `empco.test.intro` | analyse → analyze |
| `empco.seo.faq.a13` | summarise → summarize |
| `empco.seo.faq.a17` | prioritised → prioritized |
| `icu.carousel.title` | behaviour → behavior |
| `icu.carousel.subline` | behaviour → behavior |
| `icu.carousel.item2.description` | behaviour → behavior |
| `icu.carousel.item3.description` | visualises → visualizes |
| `icu.card1.description` | behaviour → behavior |
| `icu.card4.description` | behavioural → behavioral |
| `icu.card5.description` | behavioural → behavioral |
| `icu.faq.q2.content` | behaviour → behavior |
| `icu.faq.q3.content` | visualises → visualizes |
| `icu.faq.q5.content` | behavioural → behavioral |
| `icu.faq.q6.content` | behavioural → behavioral |
| `lavender.products.analyticsAgent.desc` | visualisations → visualizations |

„analyses“ als Substantiv im Plural bleibt unverändert. Fest im Code statt in `LanguageContext.tsx`: „organisation“ → „organization“ auf der Privacy-led-AI-Seite (`PrivacyLedAIPage.tsx`).
