import type { Language } from './LanguageContext';

/**
 * Copy that differs between the live pages and the redesigned ("Lavender")
 * pages while both exist side by side.
 *
 * The redesign addresses readers with "du" and uses sentence case / US
 * spelling in English. Changing the shared strings would change the live
 * pages as well, so the new wording lives here and is only consulted when a
 * page is rendered inside <LanguageProvider variant="lavender">. A key may
 * override one language only; the other falls through to the shared string.
 *
 * Go-live: fold these values into `translations` and delete this file.
 */
export const lavenderOverrides: Record<string, Partial<Record<Language, string>>> = {
  // --- EmpCo Audit ---
  'empco.hero.subtitle': {
    de: 'Der automatisierte Audit, der dich vor EmpCo-Verstößen auf deiner Website schützt. Innerhalb weniger Stunden weißt du, welche Nachhaltigkeitsaussagen belegbar sind und welche zum Risiko werden.',
  },
  'empco.anchor.what': { en: 'About the audit' },
  'empco.why.p2': {
    de: 'Parallel verschärft die CSRD die Anforderungen an die nicht-finanzielle Berichterstattung. Aussagen auf deiner Website müssen zu deiner ESG-Berichterstattung passen. Wer hier Lücken hat, fällt auf. Intern, extern, vor Gericht.',
  },
  'empco.what.p2': {
    de: 'Der EmpCo Audit ersetzt nicht deine Juristen. Er ersetzt die Arbeit davor. Statt sich durch die gesamte Website zu lesen, bekommt dein Team eine fertig priorisierte Liste auf den Tisch. Mit jeder kritischen Aussage, jeder Fundstelle, jedem Regelverweis. Die juristische Letztprüfung läuft anschließend gezielt auf den Stellen, die wirklich juristische Bewertung benötigen.',
  },
  'empco.feature1.desc': {
    en: 'The audit reads every page, every PDF, every annual report. Long documents are analyzed in full — not just the first few paragraphs. What is online is seen.',
  },
  'empco.feature3.desc': {
    de: 'Jede markierte Aussage ist mit dem wörtlichen Zitat aus der Quelle dokumentiert. Erfindet das Modell etwas, das gar nicht auf der Seite steht, wird das automatisch erkannt und markiert. Du bekommst keine Phantom-Befunde.',
  },
  'empco.feature4.desc': {
    de: 'Jede Bewertung verweist auf einen konkreten Paragraphen aus EmpCo, UWG, einschlägige BGH-Urteile oder ISO 14021. Keine freie Modell-Interpretation. Du siehst immer, warum etwas als problematisch markiert ist.',
  },
  'empco.feature5.desc': {
    de: 'Aussagen werden im vollen Kontext bewertet — einschließlich umliegender Absätze, verwandter Seiten und passender Belege aus deiner Berichterstattung. Keine isolierte Stichwortsuche, sondern Lesen, das versteht, was die Seite tatsächlich sagt.',
  },
  'empco.feature6.desc': {
    de: 'Jede Bewertung, jede Statusänderung, jede Entscheidung ist mit Zeitstempel dokumentiert. Anschlussfähig an deine Compliance-Prozesse. Anschlussfähig gegenüber Aufsichtsbehörden.',
  },
  'empco.test.title': { de: 'Sehen, was der Audit findet. Bevor du zahlst.' },
  'empco.test.step1.title': { de: 'Du nennst uns eine URL' },
  'empco.test.step1.desc': {
    de: 'Eine Seite aus deiner Domain. Sustainability-Landingpage, Produktseite, Pressemeldung. Du entscheidest.',
  },
  'empco.test.step2.desc': {
    de: 'Der vollständige Befund landet in deinem Postfach — mit Zitaten, Regelverweisen und Priorisierung.',
  },
  'empco.test.step3.title': { de: 'Du entscheidest über den vollen Audit' },
  'empco.test.step3.desc': {
    de: 'Überzeugt das Ergebnis, beauftragst du den Audit für die gesamte Website. Festpreis, transparente Kostenvorschau vor Auftragserteilung.',
  },
  'empco.test.closing': {
    de: 'Die perfekte Steilvorlage für die Rechtsabteilung: Unser EmpCo Audit liefert Greenwashing-Risiken vorab heraus und bereitet deine Claims optimal für die juristische Prüfung auf.',
  },
  'empco.form.intro': {
    de: 'Sag uns, welche Seite wir prüfen sollen. Wir melden uns innerhalb weniger Werktage mit einem Beispielbericht.',
  },
  'empco.form.disclaimer': {
    de: 'Hinweis: Der EmpCo Audit ist eine erste technische Bestandsaufnahme und ersetzt keine qualifizierte Rechtsberatung. Für die Richtigkeit, Vollständigkeit und Aktualität der Ergebnisse übernehmen wir keine Haftung. Für die finale rechtliche Bewertung deiner Claims besprich die Audit-Ergebnisse bitte mit deiner Rechtsabteilung oder einem Rechtsanwalt bzw. einer Rechtsanwältin.',
  },
  'empco.seo.faq.a13': {
    en: 'Inventory all environmental claims and review them before the cut-off date. Remove generic claims or back them with evidence, drop non-certified labels, and revise offsetting-based climate claims. A fixed approval process between marketing, legal and sustainability, plus an audit of external communication, is recommended – the 5 steps above summarize the approach.',
  },
  'empco.seo.faq.a17': {
    en: 'Manually, several departments read the website page by page, collect claims and match them against evidence – an effort that can quickly reach five figures. An automated EmpCo audit takes over this groundwork: it identifies critical claims with their exact location and rule reference and delivers a prioritized list on which the final legal review can build.',
  },

  // --- iKnow ---
  'iknow.anchor.statusQuo': { en: 'Status quo' },
  'iknow.anchor.benefits': { en: 'Your benefits', de: 'Dein Mehrwert' },
  'iknow.intro.p1': {
    de: 'Dein Unternehmen besitzt eine Goldmine: Das kollektive Wissen deiner Organisation und deiner Mitarbeiter, das du über Jahre aufgebaut hast.',
  },
  'iknow.intro.p2': {
    de: 'Hebe diesen Schatz! KI ermöglicht dir, das personengebundene Wissen allen verfügbar zu machen. Ein Wissenspool statt einer Insel, Struktur statt Silo, zugänglich für alle.',
  },
  'iknow.what.p2': {
    de: 'Sie wächst mit dem Wissen deines Unternehmens. Kontinuierlich lernen? Selbstverständlich, das tust du ja auch.',
  },
  'iknow.what.p3': {
    de: 'Aber bitte transparent: Du behältst die volle Kontrolle über Inhalte, Quellen und Verarbeitung. Alle Daten bleiben lokal im Unternehmen, ohne Anbindung nach außen, also ohne öffentliche KI-APIs.',
  },
  'iknow.guidance.title': { de: 'Das hast du nun davon!' },
  'iknow.card3.title': { de: 'Optional: Nutze auch Gespräche' },
  'iknow.card3.description': {
    de: 'iKnow kann Meetings und Workshops transkribieren und so neues Wissen direkt in das System integrieren. So kannst du, wenn gewünscht, Wissen sichern, bevor es verloren geht.',
  },
  'iknow.card4.description': {
    de: 'Sichere Wissen heutiger Generationen für künftige: iKnow bewahrt deine wertvollste Ressource dauerhaft und sichert so das kollektive Gedächtnis deines Unternehmens.',
  },
  'iknow.card5.description': {
    de: 'iKnow arbeitet lokal: Als Desktop-Software verarbeitet es Daten sicher vor Ort. Behalte die Kontrolle über deine Daten und dein Wissen, jederzeit.',
  },
  'iknow.card6.title': { de: 'Bereit für deine Unternehmens-KI' },
  'iknow.card6.description': {
    de: 'iKnow baut für dich die Datengrundlage, die du für die Nutzung von KI-Agenten benötigst. So wird dein Unternehmen in kurzer Zeit bereit für die Zukunft mit KI – automatisiert, einfach, datensicher und auf der Höhe der Zeit.',
  },
  'iknow.howItWorks.title': { de: 'Entdecke iKnow: Der Blick ins Tool' },
  'iknow.howItWorks.p1': {
    de: 'Die Frage ist nicht, ob du KI einsetzt. Sondern worauf du sie aufbaust.',
  },
  'iknow.howItWorks.p2': {
    de: 'Erfolg und Sicherheit bedingen sich gegenseitig: Nur mit einer sicheren, internen Wissensbasis kann KI sicher und erfolgreich sein. Mach KI zu deinem Wettbewerbsvorteil!',
  },

  // --- Analytics Agent ---
  'analyticsAgent.hero.subtitle': { de: 'Deine Daten. Deine Fragen. Sofortige Antworten.' },
  'analyticsAgent.anchor.challenge': { en: 'The challenge' },
  'analyticsAgent.anchor.inAction': { en: 'In action' },
  // The quote is commonly attributed to Deming; no verified source.
  'analyticsAgent.intro.quoteAuthor': {
    en: '– attributed to W. Edwards Deming',
    de: '– W. Edwards Deming zugeschrieben',
  },
  'analyticsAgent.intro.p1': {
    de: 'Dein Unternehmen sammelt jeden Tag riesige Datenmengen – von Web-Analytics über CRM-Systeme bis hin zu Datenbanken und Tabellen. Doch um aussagekräftige Erkenntnisse zu gewinnen, braucht es technisches Know-how, komplexe Abfragen und stundenlange manuelle Analyse.',
  },
  'analyticsAgent.intro.p2': {
    de: 'Was wäre, wenn jeder in deinem Unternehmen einfach Fragen in natürlicher Sprache stellen und sofort visuelle Antworten erhalten könnte? Kein SQL, keine Dashboards konfigurieren, kein Warten auf das Data-Team.',
  },
  'analyticsAgent.what.p1': {
    de: 'Der Analytics Agent ist ein eigenständiger KI-Agent, der sich mit jeder beliebigen Datenquelle verbinden lässt. Er versteht deine Daten, deinen Business-Kontext und deine Fragen – alles in natürlicher Sprache.',
  },
  'analyticsAgent.what.p2': {
    de: 'Einer der beliebtesten Anwendungsfälle: Google Analytics 4. Der Agent verbindet sich direkt mit der GA4-API und ermöglicht die Interaktion mit deinen Web-Analytics-Daten im Dialog. Frag alles – von einfachen Traffic-Fragen bis zu komplexen Funnel-Analysen.',
  },
  'analyticsAgent.what.p3': {
    de: 'Aber GA4 ist nur der Anfang. Der Analytics Agent kann mit jeder erdenklichen Datenquelle verbunden werden – Datenbanken, APIs, Spreadsheets, Data Warehouses. Eine darunterliegende Wissensbasis bringt das semantische Verständnis deiner Daten im relevanten Business-Kontext.',
  },
  'analyticsAgent.what.p4': {
    de: '→ Der Analytics Agent verwandelt Rohdaten in handlungsrelevante Erkenntnisse – sofort, visuell und in deiner Sprache.',
  },
  'analyticsAgent.features.title': { de: 'Das kannst du erwarten' },
  'analyticsAgent.card1.description': {
    de: 'Der Analytics Agent verbindet sich mit Google Analytics 4, Datenbanken, CRM-Systemen, Spreadsheets, APIs und Data Warehouses. Alle deine Datenquellen – zugänglich über eine einzige Konversationsschnittstelle.',
  },
  'analyticsAgent.card2.description': {
    de: 'Kein SQL, keine Query-Builder, kein technisches Wissen nötig. Stell deine Frage einfach so, wie du einen Kollegen fragen würdest: „Was waren unsere Top-Landingpages letzten Monat?" oder „Vergleiche die Conversion-Raten über alle Kanäle."',
  },
  'analyticsAgent.card4.description': {
    de: 'Eine Wissensbasis unter dem Agenten bringt semantisches Verständnis deiner Daten im Kontext. Sie weiß, was deine Metriken bedeuten, wie dein Business funktioniert, und liefert Erkenntnisse, die wirklich Sinn ergeben.',
  },
  'analyticsAgent.card5.description': {
    de: 'Die GA4-Integration ist einer der beliebtesten Anwendungsfälle. Verbinde dich direkt mit der GA4-API und stelle Fragen zu deinem Website-Traffic, Nutzerverhalten, Conversions und mehr – kein Dashboard-Setup nötig.',
  },
  'analyticsAgent.card6.title': { de: 'Für dein Unternehmen gebaut' },
  'analyticsAgent.card6.description': {
    de: 'Der Analytics Agent läuft als eigenständige Lösung, die sich in deine bestehende Infrastruktur integriert. Sicher, skalierbar und darauf ausgelegt, mit deiner Datenlandschaft zu wachsen.',
  },
  'analyticsAgent.howItWorks.title': { de: 'Sieh den Analytics Agent in Aktion' },
  'analyticsAgent.howItWorks.p1': {
    de: 'Die Frage ist nicht, ob du Daten hast. Sondern ob du sie nutzen kannst.',
  },
  'analyticsAgent.howItWorks.p2': {
    de: 'Mit dem Analytics Agent wird jedes Teammitglied zum Datenanalysten. Entscheidungen basieren nicht mehr auf Bauchgefühl – sondern auf Echtzeit-Erkenntnissen aus deinen tatsächlichen Daten.',
  },

  // --- User Journey Explorer (ICU) ---
  'icu.intro.text': { de: 'Die meisten Analytics-Tools zeigen die Journeys, die du bei deinen Nutzern vermutest. ICU zeigt die, die tatsächlich stattgefunden haben. Das KI-gestützte Tool rekonstruiert jeden echten Pfad durch deine Website oder dein Produkt in Echtzeit — jeden Schritt, jede Rückkehr, jeden Abbruch — und verwandelt ihn in eine visuelle Karte, die jeder verstehen kann. Kein Setup, keine Dashboards zu konfigurieren, kein Analyst-Studium erforderlich.' },
  'icu.carousel.title': { en: "We bring clarity to your user's behavior. In an instant.", de: 'Wir bringen Klarheit in das Verhalten deiner Nutzer. Sofort.' },
  'icu.carousel.subline': { en: 'ICU is built for the people who make decisions and for everybody else. ICU automatically - effortlessly - reveals the real journeys your users take. No dashboards to configure, no filters to master, no IT course to take — just clear, visual behavior anyone on your team can understand intuitively.', de: 'ICU wurde für Entscheider entwickelt — und für alle anderen. ICU enthüllt automatisch und mühelos die echten Journeys deiner Nutzer. Keine Dashboards zu konfigurieren, keine Filter zu beherrschen, kein IT-Kurs nötig — nur klares, visuelles Verhalten, das jeder in deinem Team intuitiv versteht.' },
  'icu.carousel.item1.description': { de: 'ICU deckt jeden echten Pfad deiner Nutzer auf — einschließlich Schleifen, Rückkehrern und stillen Abbrüchen — automatisch aus deinem vollständigen Datensatz rekonstruiert. Kein Setup. Kein Zusammenstückeln. Kein Rätselraten.' },
  'icu.carousel.item2.description': { en: 'Marketing managers, product teams, and growth leads can explore behavior without relying on technical analysts. ICU removes the complexity and turns raw activity into understandable, actionable insights.' },
  'icu.carousel.item3.description': { en: 'Ask ICU in plain language —\n"Where did most users drop last week?"\n"How did returning users behave differently from new ones?"\nThe system runs the analysis for you and visualizes the result instantly.', de: 'Frag ICU in einfacher Sprache —\n„Wo sind letzte Woche die meisten Nutzer abgesprungen?"\n„Wie haben sich wiederkehrende Nutzer anders verhalten als neue?"\nDas System führt die Analyse für dich durch und visualisiert das Ergebnis sofort.' },
  'icu.guidance.subline': { de: 'Erkunde echte User Journeys durch visuelle Karten, die du navigieren kannst — oder frag einfach nach den Erkenntnissen, die du brauchst.' },
  'icu.card1.description': { en: 'ICU reconstructs every real journey end-to-end — every phase, step, loop, and event. Everything is linked automatically, so you can spot dominant patterns and understand behavior at both macro and micro levels.', de: 'ICU rekonstruiert jede echte Journey von Anfang bis Ende — jede Phase, jeden Schritt, jede Schleife und jedes Event. Alles ist automatisch verknüpft, sodass du dominante Muster erkennen und Verhalten sowohl auf Makro- als auch auf Mikroebene verstehen kannst.' },
  'icu.card2.description': { de: 'ICU visualisiert Übergänge und Pfade, die traditionelle Analytics in Tabellen verstecken. Selbst die verwirrensten Journeys werden lesbar: Klare Struktur, saubere Abläufe, kein Durcheinander — damit du dich auf das Wesentliche konzentrieren kannst, nicht auf das Entschlüsseln von Dashboards.' },
  'icu.card3.description': { de: 'ICU verfolgt alle relevanten Nutzerpfade, die zu einer Conversion führen. Du siehst sofort, welche Touchpoints den Fortschritt vorantreiben, welche Umwege unerwartet funktionieren und wo Reibung die Menschen ausbremst. Conversion-Journeys werden transparent — und optimierbar.' },
  'icu.card4.description': { en: "Ask ICU in everyday language and get the analysis instantly.\n\"Where did most users drop off last week?\"\n\"What's the biggest behavioral difference between new and returning users?\"\nICU's agent interprets the question, runs the analysis, and presents the answer in a comprehensible way. No filters, no SQL, no manual setup.", de: 'Frag ICU in Alltagssprache und erhalte die Analyse sofort.\n„Wo sind letzte Woche die meisten Nutzer abgesprungen?"\n„Was ist der größte Verhaltensunterschied zwischen neuen und wiederkehrenden Nutzern?"\nICUs Agent interpretiert die Frage, führt die Analyse durch und präsentiert die Antwort verständlich. Keine Filter, kein SQL, kein manuelles Setup.' },
  'icu.card5.description': { en: 'Every node is clickable, every transition explorable. ICU lets you dive in as deeply as you need: from high-level patterns to single behavioral decisions. Drop-offs, loops, progressions, anomalies — everything becomes visible the moment you explore it.', de: 'Jeder Knoten ist anklickbar, jeder Übergang erkundbar. ICU lässt dich so tief eintauchen, wie du möchtest: von übergeordneten Mustern bis zu einzelnen Verhaltensentscheidungen. Abbrüche, Schleifen, Fortschritte, Anomalien — alles wird sichtbar, sobald du es erkundest.' },
  'icu.faq.title': { en: 'Frequently asked questions' },
  'icu.faq.q1.content': { de: 'Die meisten Analytics-Plattformen lassen dich hypothetische Flows zusammenstellen.\nICU rekonstruiert die tatsächlichen Journeys deiner Nutzer — automatisch, aus deinem vollständigen Datensatz. Kein manuelles Setup, keine Dashboards zu konfigurieren, kein Rätselraten.' },
  'icu.faq.q2.content': { en: 'No. ICU is designed for non-analysts.\nMarketing teams, product managers, and growth leads can explore behavior without filters, segments, event taxonomies, or SQL. Everything is visual, intuitive, and guided.' },
  'icu.faq.q3.content': { en: 'ICU processes your raw event data and automatically maps every step, loop, return and drop-off. The system links events into complete journeys and visualizes them as clean, explorable paths.', de: 'ICU verarbeitet deine rohen Event-Daten und kartiert automatisch jeden Schritt, jede Schleife, jede Rückkehr und jeden Abbruch. Das System verknüpft Events zu vollständigen Journeys und visualisiert sie als übersichtliche, erkundbare Pfade.' },
  'icu.faq.q4.content': { de: 'Ja.\nICU enthält einen intelligenten Agenten, der einfache Fragen versteht wie:\n„Wo sind letzte Woche die meisten Nutzer abgesprungen?"\n„Wie verhalten sich neue Nutzer anders als wiederkehrende?"\nICU führt die Analyse für dich durch und zeigt die Antwort visuell.' },
  'icu.faq.q5.content': { en: 'ICU integrates seamlessly with common setups:\nTag Managers, event pipelines, backend events, CRM data, and custom tracking.\nIf your system emits behavioral data, ICU can process it.', de: 'ICU integriert sich nahtlos mit gängigen Setups:\nTag Manager, Event-Pipelines, Backend-Events, CRM-Daten und Custom Tracking.\nWenn dein System Verhaltensdaten ausgibt, kann ICU sie verarbeiten.' },
  'icu.faq.q6.content': { en: 'ICU never requires unnecessary personal data.\nAll analyses are based on behavioral signals, handled within secure environments, and processed according to privacy-first principles.\nWe show journeys, not identities.' },

  // --- Intelligentic Search ---
  'is.anchor.statusQuo': { en: 'Status quo' },
  'is.anchor.howItWorks': { en: 'How it works' },
  'is.quote.text': { de: 'Die Produktsuche ist im KI-Zeitalter angekommen: Von OpenAI und ChatGPT bis Amazon und Google: KI-Suche und KI-Shopping sind das Thema.\n\nMit Intelligentic Search kannst du Teil davon sein: Mehr Features als Amazons Rufus und ein datensicherer Ansatz zu einem erschwinglichen Preis, der sich schnell auszahlt.\nWir bieten Next-Level-Suche für kleine und mittlere Unternehmen. Überlass deine Kunden nicht den großen Tech-Konzernen.' },
  'is.quote.conclusion': { de: 'Wir wissen, dass du es kannst. Intelligentic Search.' },
  'is.features.subline1': { de: 'Vergiss, was du über Filter wusstest - erlebe die Flexibilität und Hyper-Personalisierung, die nur KI bieten kann\n\nIntelligentic Search ist eine moderne Form der Produkt- und Informationssuche. Sie erfasst und transformiert die Produktdaten eines Unternehmens automatisch und macht sie in natürlicher Sprache in Millisekunden durchsuchbar.' },
  'is.features.subline3': { de: "Starre Filter? Tausende von „Ergebnissen\" zum Durchklicken? So gestern!\n\nSei auf dem neuesten Stand mit Intelligentic Search. It's a match!" },
  'is.features.step2.label': { en: 'Integrated image search' },
  'is.features.step3.label': { en: 'Intelligentic Search is the real AI' },
  'is.modular.text1': { de: 'Unsere Mission ist es für jeden die perfekt zugeschnittene Lösung zu finden. Die Intelligentic Search ist ein Modulares System, das um eigene Wünsche und Funktionen erweitert und auf die Eigenschaften deines Unternehmens angepasst werden kann.' },
  'is.howItWorks.title': { en: 'Under the hood: How the Intelligentic Search engine works' },
  'is.comparison.title': { de: 'Die Vorteile für dich' },
  'is.comparison.secondaryHeader': { en: 'Traditional search' },
  'is.comparison.row1.feature': { en: 'Time to product' },
  'is.comparison.row2.feature': { en: 'Search style' },
  'is.comparison.row3.feature': { en: 'Recommended products' },

  // --- Shared (all pages) — docs/i18n-luecken.md §11a ---
  'cta.headline': { en: 'Ready to enable your company for the agentic era?' },
  'burgerMenu.products': { en: 'Products & tools' },
};
