'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

const translations: Translations = {
  // Header
  'header.contact': {
    en: 'Contact us',
    de: 'Kontaktiere uns'
  },
  
  // Hero
  'hero.headline': {
    en: 'Empowering the Agentic Future. Built on Trust.',
    de: 'Empowering the Agentic Future. Built on Trust.'
  },
  'hero.learnMore': {
    en: 'Learn more about us',
    de: 'Erfahre mehr über uns'
  },

  // Be Among Section
  'beAmong.title': {
    en: 'Be among the top 10 %.',
    de: 'Sei Teil der 10%'
  },
  'beAmong.text': {
    en: 'Over 90% of AI projects in companies fail.* One of the main reasons: the dataset. With us you will get the dataset that makes you one of the successful 10%: Fit for AI. Find out about the latest analytics hacks, standard and custom AI solutions and how to boost your marketing with context data while keeping your data to yourself.',
    de: 'Über 90% aller KI-Projekte in Unternehmen scheitern.* Einer der Hauptgründe: die Datenbasis. Bei uns erhalten Sie die Datenbasis, mit der Sie zu den erfolgreichen 10% gehören werden – Fit for AI. Entdecken Sie die neuesten Analytics-Hacks, Standard- oder maßgeschneiderte KI-Lösungen und erfahren Sie, wie Sie Ihr Marketing mit Kontextdaten stärken können, ohne Ihre Daten herauszugeben.'
  },
  'beAmong.source': {
    en: '(*MIT, 2025, State of AI in Business 2025)',
    de: '(*MIT, 2025, State of AI in Business 2025)'
  },

  // Offer Section
  'offer.label': {
    en: 'Our Approach',
    de: 'Unser Ansatz'
  },
  'offer.title': {
    en: 'Be Better. Be Faster. Be AI.',
    de: 'Be Better. Be Faster. Be AI.'
  },
  'offer.subline': {
    en: 'Thinking about the advantages of AI, but your toolstack resembles a wilderness and your database a nightmare? No need to worry, help is at hand: We help you close the gaps in your database with Context Data, boost your data to a quality-level that will see your AI Agents deliver reliable results at a speed you haven\'t dreamt of before.',
    de: 'Sie möchten die Vorteile von KI nutzen, aber Ihr Toolstack ist unerschlossenes Land und Ihre Datenbank ein Albtraum? Kein Grund zur Sorge – Hilfe ist nah: Wir schließen Ihre Datenlücken mit Context Data und heben Ihre Datenqualität auf ein Niveau, mit dem Ihre KI-Agenten zuverlässig gute Ergebnisse liefern– schneller, als Sie es für möglich gehalten hätten.'
  },
  'offer.left.headline': {
    en: 'How To Context Data',
    de: 'How To Context Data'
  },
  'offer.left.intro': {
    en: 'No effective AI without context data.',
    de: 'Keine effektive KI ohne Kontextdaten.'
  },
  'offer.left.copy': {
    en: 'AI can boost your company\'s performance - but more than 40% of public AI search engine results are incorrect, due to misleading data. Get the data you need for the AI performance you want to excel in the AI race! We offer everything to enhance your company\'s data quality and quite a few AI hacks you will find hard to get anywhere else.',
    de: 'KI kann die Performance Ihres Unternehmens immens steigern – aber über 40% der öffentlich verfügbaren KI-Suchergebnisse sind falsch. Der Grund: irreführende Daten. Holen Sie sich die Daten, die Sie für die KI-Performance benötigen, damit Sie im KI-Rennen an der Spitze mitlaufen! Wir bieten alles, um die Datenqualität Ihres Unternehmens zu steigern, plus einige KI-Hacks, die Sie kaum irgendwo anders finden werden.'
  },
  'offer.left.outcome': {
    en: ' Measurable data quality, fewer silos, reliable KPIs, lower MarTech complexity.',
    de: 'Messbare Datenqualität, weniger Silos, verlässliche KPIs, geringere MarTech-Komplexität.'
  },
  'offer.left.accordionTitle': {
    en: 'Learn more about our Core Services:',
    de: 'Das können wir für Sie tun:'
  },
  'offer.left.service1': {
    en: 'Data layer architecture & governance',
    de: 'Data-Layer-Architecture & Governance'
  },
  'offer.left.service2': {
    en: 'Web & app tracking (Adobe, GA4, server‑side, consent integration)',
    de: 'Web- & App-Tracking (Adobe, GA4, server-seitig, Consent-Integration)'
  },
  'offer.left.service3': {
    en: 'Analytics setups & dashboards (Adobe/Google/BI)',
    de: 'Analytics-Setups & Dashboards (Adobe/Google/BI)'
  },
  'offer.left.service4': {
    en: 'Campaign parameter framework & taxonomy',
    de: 'Kampagnenparameter-Framework & Taxonomie'
  },
  'offer.left.service5': {
    en: 'CDP/CRM/Adtech connectivity & APIs',
    de: 'CDP/CRM/Adtech-Konnektivität & APIs'
  },
  'offer.left.service6': {
    en: 'QA, tag audits & monitoring',
    de: 'QA, Tag-Audits & Monitoring'
  },
  'offer.left.service7': {
    en: 'Training & enablement (Analytics, Marketing, Product)',
    de: 'Training & Enablement (Analytics, Marketing, Product)'
  },
  'offer.right.headline': {
    en: 'Be Part of the Agentic Era',
    de: 'Be Part of the Agentic Era'
  },
  'offer.right.intro': {
    en: 'From experiments to productive AI workflows.',
    de: 'Von Experimenten zu produktiven KI-Workflows.'
  },
  'offer.right.copy': {
    en: 'Consulting and implementation of custom AI solutions — from use‑case roadmaps and agents & automations to proprietary tools built on your data foundation.',
    de: 'Beratung und Implementierung maßgeschneiderter KI-Lösungen – von Use-Case-Roadmaps und Agenten & Automatisierungen bis hin zu proprietären Tools, die auf Ihrer Datenbasis aufbauen.'
  },
  'offer.right.outcome': {
    en: 'Faster time‑to‑value, productive automations, measurable impact on revenue & efficiency.',
    de: 'Schnellere Time-to-Value, produktive Automatisierungen, messbare Auswirkungen auf Umsatz & Effizienz.'
  },
  'offer.right.accordionTitle': {
    en: 'We are at your service:',
    de: 'Wir sind für Sie da:'
  },
  'offer.right.service1': {
    en: 'AI strategy & use‑case portfolio (prioritised by value/feasibility)',
    de: 'KI-Strategie & Use-Case-Portfolio'
  },
  'offer.right.service2': {
    en: 'Agentic workflows & orchestration (prompting, tools, guardrails)',
    de: 'Agentic Workflows & Orchestrierung (Prompting, Tools, Guardrails)'
  },
  'offer.right.service3': {
    en: 'Prototyping → pilot → scale',
    de: 'Prototyping → Pilot → Skalierung'
  },
  'offer.right.service4': {
    en: 'Integration into existing systems (Analytics, CRM, CMS, ticketing, BI)',
    de: 'Integration in bestehende Systeme (Analytics, CRM, CMS, Ticketing, BI)'
  },
  'offer.right.service5': {
    en: 'Proprietary tools/agents (e.g., Reporting Agent, Campaign QA Agent, Knowledge Copilot)',
    de: 'Proprietäre Tools/Agenten (z. B. Reporting Agent, Campaign QA Agent, Knowledge Copilot)'
  },
  'offer.right.service6': {
    en: 'Security & compliance (PII/GDPR, access, auditability)',
    de: 'Security & Compliance (PII/GDPR, Zugriff, Auditierbarkeit)'
  },

  // Offer Outcome Label
  'offer.outcomeLabel': {
    en: 'Outcome: ',
    de: 'Ihr Vorteil: '
  },

  // Context Data Tools Carousel
  'contextTools.title': {
    en: 'More context for your data',
    de: 'Mehr Kontext für deine Daten'
  },
  'contextTools.tool1.title': {
    en: 'Campaign Parameter Tool',
    de: 'Kampagnenparameter-Tool'
  },
  'contextTools.tool1.description': {
    en: 'A tool that helps marketers to leverage their campaign parameter framework for better campaign data.',
    de: 'Ein Tool, das Marketing-Teams hilft, Ihr Kampagnenparameter-Framework optimal zu nutzen. Für bessere Kampagnendaten.'
  },
  'contextTools.tool2.title': {
    en: 'Tracking & Analytics',
    de: 'Tracking & Analytics'
  },
  'contextTools.tool2.description': {
    en: 'How do customers behave on your digital channels? How does this affect sales? Why does one campaign work and another fail? We are certified in many of the leading analytics enterprise solutions and can guide you through planning, configuration, and implementation.',
    de: 'Wie verhalten sich Ihre Kund:innen auf Ihren digitalen Kanälen? Wie wirkt sich das auf Verkäufe aus? Warum funktioniert eine Kampagne – und eine andere nicht? Bekommen Sie mit uns die richtigen Insights! Wir sind in vielen führenden Enterprise-Analytics-Lösungen zertifiziert und unterstützen Sie bei Planung, Konfiguration und Implementierung.'
  },
  'contextTools.tool3.title': {
    en: 'Consent Risk Audit',
    de: 'Consent-Risiko-Audit'
  },
  'contextTools.tool3.description': {
    en: 'Comprehensive privacy and consent compliance assessment. Identify risks, gaps, and opportunities in your data collection practices with actionable recommendations.',
    de: 'Umfassende Analyse von Datenschutz- und Consent-Compliance. Identifizieren Sie Risiken, Lücken und Optimierungschancen in Ihren Datenerhebungsprozessen – und erhalten Sie von uns Handlungsempfehlungen.'
  },

  // How We Work
  'howWeWork.title': {
    en: 'This is how we work',
    de: 'This is how we work'
  },
  'howWeWork.step1.label': {
    en: 'Assess',
    de: 'Assess'
  },
  'howWeWork.step1.description': {
    en: 'Quick audit of tracking, data layer, parameters & systems',
    de: 'Schneller Audit von Tracking, Data Layer, Parametern & Systemen'
  },
  'howWeWork.step2.label': {
    en: 'Align',
    de: 'Align'
  },
  'howWeWork.step2.description': {
    en: 'Define target picture, use cases, KPI framework & governance',
    de: 'Zielbild, Use Cases, KPI-Framework & Governance definieren'
  },
  'howWeWork.step3.label': {
    en: 'Build',
    de: 'Build'
  },
  'howWeWork.step3.description': {
    en: 'Implement, integrate, train; pilot/PoC for AI applications',
    de: 'Implementieren, integrieren, trainieren; Pilot/PoC für KI-Anwendungen'
  },
  'howWeWork.step4.label': {
    en: 'Scale',
    de: 'Scale'
  },
  'howWeWork.step4.description': {
    en: 'Monitoring, automations & rollout across teams',
    de: 'Monitoring, Automatisierungen & Rollout über alle Teams'
  },

  // Metrics
  'metrics.title': {
    en: 'Metrics that matter',
    de: 'Metrics that matter'
  },
  'metrics.description': {
    en: 'Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.',
    de: 'Die Führung eines kleinen Unternehmens ist heute schon schwierig genug. Vermeide weitere Komplikationen, indem du veraltete, mühsame Handelsmethoden aufgibst. Unser Ziel ist es, den KMU-Handel zu rationalisieren und ihn einfacher und schneller als je zuvor zu machen.'
  },
  'metrics.stat1.value': {
    en: '40 %',
    de: '40 %'
  },
  'metrics.stat1.label': {
    en: 'Uplift in data coverage & quality ',
    de: 'mehr Datenabdeckung & -qualität'
  },
  'metrics.stat2.value': {
    en: '< 6 weeks',
    de: '< 6 Wochen'
  },
  'metrics.stat2.label': {
    en: 'Time to value for your first efficient agent',
    de: 'Erhalten Sie Ihren ersten auf Ihre Bedürfnisse abgestimmten Agenten in wenigen Wochen.'
  },

  // Agentic Tools Carousel
  'agenticTools.title': {
    en: 'Our Tools for the Agentic Era',
    de: 'Our Tools for the Agentic Era'
  },
  'agenticTools.tool1.title': {
    en: 'ICU – Customer Journey Explorer',
    de: 'ICU – Customer Journey Explorer'
  },
  'agenticTools.tool1.description': {
    en: 'A new dimension to your customer\'s journey: Instant oversight on each touchpoint in depth as well as the whole context at once. Easy to use, easier to comprehend. Why hasn\'t that been here before? With ICU you can map and analyze customer touchpoints with zero-party data insights. Understand authentic user journeys without tracking, using consented personal context for genuine experience optimization.',
    de: 'Die neue Dimension Ihrer Customer Journey: Erhalten Sie Überblick über jeden Touchpoint. Vom kleinsten Detail bis zum großen Kontext, alles auf einen Blick. Einfach zu nutzen, noch einfacher zu verstehen. Warum gab es das nicht schon früher? Mit ICU können Sie Customer Touchpoints mit Zero-Party-Data-Insights abbilden und analysieren. So wird Ihre Customer Journey real. Insights ohne Tracking. Mit freiwillig geteilten, persönlichen Kontext für echte Experience-Optimierung.'
  },
  'agenticTools.tool2.title': {
    en: 'Intelligentic Search',
    de: 'Intelligentic Search'
  },
  'agenticTools.tool2.description': {
    en: 'Our semantic search for your website. Deliver dynamic, contextual personalization powered by user-owned data. Create relevant experiences that adapt in real-time while respecting privacy and user control. The better Rufus with more options and better usabilty. For your company with your CI and exactly the information you want to provide. Be more relevant for your customers with less effort.',
    de: 'Unsere semantische Suche für Ihre Website. Bieten Sie Ihren Kunden dynamische, kontextuelle Personalisierung auf Basis nutzereigener Daten. Erstellen Sie relevante Erlebnisse, die sich in Echtzeit anpassen – bei voller Wahrung von Datenschutz und Nutzerkontrolle. Der bessere Rufus: mehr Optionen, bessere Usability. Für Ihr Unternehmen, in Ihrem CI und mit genau den Informationen, die Sie bereitstellen möchten. Mehr Relevanz für Ihre Kund:innen – mit weniger Aufwand.'
  },

  // Privacy-Led Section
  'privacyLed.title': {
    en: 'Privacy-Led Setups',
    de: 'Privacy-Led Setups'
  },
  'privacyLed.copy': {
    en: 'You wouldn\'t share the secret ingredients of your company\'s most successful product? Why share your customer data or strategies? With a privacy-led setup you can keep your data to yourself without a foreign company or government getting the better of you. Contact us to learn more about privacy-led setups and how to excel with AI.',
    de: 'Sie würden die geheimen Zutaten Ihres erfolgreichsten Produkts nicht teilen – warum also Ihre Kundendaten oder Strategien? Mit einem Privacy-Led Setup behalten Sie Ihre Daten bei sich, ohne dass ausländische Unternehmen oder Regierungen Zugriff erhalten. Kontaktieren Sie uns, um mehr über Privacy-Led Setups und KI-Exzellenz zu erfahren.'
  },
  'privacyLed.description1': {
    en: 'GDPR‑compliant setups, consent flows & data minimisation',
    de: 'DSGVO-konforme Setups, Consent Flows & Datenminimierung'
  },
  'privacyLed.description2': {
    en: 'Security & access concepts',
    de: 'Sicherheits- & Zugriffskonzepte'
  },
  'privacyLed.description3': {
    en: 'Vendor‑agnostic consulting',
    de: 'Anbieterunabhängige Beratung'
  },
  'privacyLed.cta': {
    en: 'See more',
    de: 'Mehr erfahren'
  },

  // Brand Banner
  'brandBanner.title': {
    en: 'iCompetence is featured in:',
    de: 'iCompetence ist vertreten in:'
  },

  // FAQ
  'faq.title': {
    en: 'FAQ',
    de: 'FAQ'
  },
  'faq.question1.title': {
    en: 'How do I know whether my data is correct?',
    de: 'Wie weiß ich, ob meine Daten korrekt sind?'
  },
  'faq.question1.content': {
    en: 'Most companies don\'t. Over 90% of AI projects fail largely because key datasets are incomplete, inconsistent, or misleading.\n\nWe start every collaboration with a quick but thorough audit of your tracking setup, data layer, campaign parameters, and analytics systems. You receive a clear report on data quality, gaps, risks, and immediate opportunities.\n\nOutcome: measurable data quality, fewer silos, reliable KPIs, and a solid foundation for AI agents.',
    de: 'Die meisten Unternehmen wissen es nicht. Über 90% der KI-Projekte scheitern - und meist liegt es an unvollständigen, inkonsistenten oder irreführenden Datensätzen.\n\nMit uns steht Ihr Tracking von Anfang an auf sicheren Beinen:  Vom Audit Ihres Trackings und Data Layers, bis zu den Kampagnenparameter und Ihrer Analytics-Systeme. Sie erhalten einen klaren Bericht über Datenqualität, Lücken, Risiken und sofortige Chancen.\n\nIhr Vorteil: messbare Datenqualität, weniger Silos, verlässliche KPIs und ein stabiles Fundament für KI-Agenten.'
  },
  'faq.question2.title': {
    en: 'Do you offer special packages for first-time customers?',
    de: 'Bieten Sie spezielle Pakete für Erstkunden an?'
  },
  'faq.question2.content': {
    en: 'Yes. For new clients, we offer streamlined starter packages – from a compact Context Data Audit to a fast-track Agentic Readiness check. These packages give you quick clarity on your data situation and a prioritized roadmap for your first AI use cases.\n\nIdeal if you want to start fast without committing to large projects.',
    de: 'Ja. Für neue Kund:innen bieten wir schlanke Einstiegspakete an – vom kompakten Context Data Audit bis hin zum Fast-Track Agentic Readiness Check. Diese Pakete geben Ihnen schnell Klarheit über Ihre Datensituation und eine priorisierte Roadmap für Ihre ersten KI-Use-Cases. Ideal für alle, die schnell starten möchten, ohne sich direkt zu großen Projekten zu verpflichten.'
  },
  'faq.question3.title': {
    en: 'How much ROI?',
    de: 'Wie viel ROI?'
  },
  'faq.question3.content': {
    en: 'Our setups are designed for measurable impact. Clients typically see:\n- up to 40% uplift in data coverage & data quality\n- faster and more reliable decision-making\n- shorter campaign cycles\n- AI workflows that pay back within weeks, not months. With productive Agentic workflows, time-to-value is usually < 6 weeks for your first efficient AI agent.',
    de: 'Unsere Setups sind auf messbaren Impact ausgelegt. Kund:innen sehen typischerweise:\n- bis zu 40% mehr Datenabdeckung & -qualität\n- schnellere und verlässlichere Entscheidungen\n- kürzere Kampagnenzyklen\n- KI-Workflows, die sich in Wochen statt Monaten auszahlen\n\nMit produktiven Agentic Workflows liegt die Time-to-Value meist unter 6 Wochen für Ihren ersten effizienten KI-Agenten.'
  },
  'faq.question4.title': {
    en: 'Do I have to start with Context Data Accuracy?',
    de: 'Was wäre ein sinnvoller Einstieg?'
  },
  'faq.question4.content': {
    en: 'Not necessarily – but it is the most effective starting point.\n\nAI without high-quality context data delivers unreliable results. If your dataset is fragmented or incomplete, even the best AI model won\'t perform.\n\nWe recommend beginning with a data quality or context audit, but we can also start with strategy, AI use cases, or tool integration if your foundation is already solid.',
    de: 'Wenn Sie eine zuverlässige, innovative KI erhalten wollen, wäre die Genauigkeit Ihrer Kontextdaten (Context-Data-Accuracy) ein sinnvoller Ausgangspunkt d +KI ohne hochwertige Context Data liefert unzuverlässige Ergebnisse. Wenn Ihre Datensätze fragmentiert oder unvollständig sind, kann selbst das beste KI-Modell nicht gut performen.\n\nWir empfehlen daher einen Datenqualitäts- oder Context-Audit, können aber auch mit Strategie, Use Cases oder Tool-Integration beginnen, wenn Ihre Basis bereits solide ist.'
  },
  'faq.question5.title': {
    en: 'Do I need new tools?',
    de: 'Brauche ich neue Tools?'
  },
  'faq.question5.content': {
    en: 'Only if they solve real problems for you.\n\nWe work vendor-agnostic and can optimize your existing stack (Adobe, GA4, CRM, CDPs, BI tools, CMS, etc.).\n\nIf needed, we offer privacy-led, high-impact tools – like the Customer Journey Explorer (ICU), Intelligentic Search, or our Context Data solutions – that integrate seamlessly into your existing systems.\n\nYour setup stays as simple as possible, as powerful as necessary.',
    de: 'Nur, wenn sie echte Probleme für Sie lösen.\n\nWir arbeiten anbieterunabhängig und optimieren Ihren bestehenden Stack (Adobe, GA4, CRM, CDPs, BI-Tools, CMS etc.).\n\nFalls nötig, bieten wir Ihnen privacy-led High-Impact-Tools wie den Customer Journey Explorer (ICU), Intelligentic Search oder unsere Context-Data-Lösungen – nahtlos integrierbar in Ihre bestehenden Systeme unabhängig vom Provider und skalierbar nach Bedarf. Ihr Setup bleibt dabei so einfach wie möglich und so leistungsstark wie nötig.'
  },
  'faq.question6.title': {
    en: 'How long until first results?',
    de: 'Wie lange dauert es bis zu den ersten Ergebnissen?'
  },
  'faq.question6.content': {
    en: 'Fast.\n\nWith our Assess → Align → Build → Scale framework, most clients see first measurable improvements within 2-6 weeks – whether in data quality, analytics reliability, or productive AI workflows.\n\nYour first automated agent can typically be deployed in under six weeks.',
    de: 'Die ersten Ergebnisse erhalten Sie schnell. Mit unserem Assess → Align → Build → Scale Framework sehen die meisten Kund:innen erste messbare Verbesserungen innerhalb von 2–6 Wochen – sei es bei Datenqualität, Analytics-Zuverlässigkeit oder produktiven KI-Workflows. Ihr erster automatisierter Agent kann meist in unter sechs Wochen live gehen.'
  },
  'faq.question7.title': {
    en: 'How do you handle privacy?',
    de: 'Wie gehen Sie mit Datenschutz um?'
  },
  'faq.question7.content': {
    en: 'Privacy isn\'t a checkbox – it\'s part of our architecture.\n\nWe build privacy-led, GDPR-compliant setups that minimize data exposure and keep your customer data where it belongs: with you.\n\nOur approach includes:\n- GDPR-compliant consent flows and data minimization\n- secure access concepts\n- privacy-first agents and tools\n- no unnecessary sharing with external vendors\n- You keep full control over your data – no foreign companies, no hidden data transfers, no surprises.',
    de: 'Datenschutz ist für uns kein Häkchen – er ist Teil der Architektur.\n\nWir bauen privacy-led, DSGVO-konforme Setups, die Datenexposure minimieren und Ihre Kundendaten dort halten, wo sie hingehören: bei Ihnen.\n\nUnser Ansatz umfasst:\n- DSGVO-konforme Consent Flows & Datenminimierung\n- sichere Zugriffskonzepte\n- privacy-first Agenten und Tools\n- kein unnötiges Teilen mit externen Anbietern\n\nSie behalten die volle Kontrolle über Ihre Daten – keine ausländischen Unternehmen, keine versteckten Transfers, keine Überraschungen.'
  },

  // CTA Footer
  'cta.headline': {
    en: 'Ready to enable your company for the Agentic Era?',
    de: 'Bereit, dein Unternehmen für die Agentic Era zu befähigen?'
  },
  'cta.button': {
    en: 'Book your initial consultation',
    de: 'Buche dein Erstgespräch'
  },

  // Footer
  'footer.tagline': {
    en: 'Separate the signal from the noise.',
    de: 'Separate the signal from the noise.'
  },
  'footer.inquiries': {
    en: '(Inquiries)',
    de: '(Anfragen)'
  },
  'footer.phone': {
    en: '(Phone)',
    de: '(Telefon)'
  },
  'footer.imprint': {
    en: 'Imprint',
    de: 'Impressum'
  },
  'footer.privacy': {
    en: 'Privacy',
    de: 'Datenschutz'
  },
  'footer.backToTop': {
    en: 'Back to top',
    de: 'Nach oben'
  },

  // Burger Menu
  'burgerMenu.home': {
    en: 'Home',
    de: 'Home'
  },
  'burgerMenu.blog': {
    en: 'Our Blog',
    de: 'Unser Blog'
  },
  'burgerMenu.privacyLed': {
    en: 'Privacy-led AI',
    de: 'Privacy-led AI'
  },

  // Imprint Page
  'imprint.hero.title': {
    en: 'Legal Disclosure & Privacy',
    de: 'Impressum & Datenschutz'
  },
  'imprint.section1.title': {
    en: 'Information according to § 5 TMG (German Telemedia Act)',
    de: 'Angaben gemäß § 5 TMG'
  },
  'imprint.section1.subtitle': {
    en: '',
    de: ''
  },
  'imprint.section1.company': {
    en: 'iCompetence GmbH',
    de: 'iCompetence GmbH'
  },
  'imprint.section1.director': {
    en: 'Managing Director:',
    de: 'Geschäftsführer:'
  },
  'imprint.section2.title': {
    en: 'Register Entry',
    de: 'Registereintrag'
  },
  'imprint.section2.content': {
    en: 'Entry in the Handelsregister (Commercial Register).',
    de: 'Eintragung im Handelsregister.'
  },
  'imprint.section2.court': {
    en: 'Register Court: Amtsgericht Hamburg (District Court of Hamburg)',
    de: 'Registergericht: Amtsgericht Hamburg'
  },
  'imprint.section2.number': {
    en: 'Registration Number: HRB 110059',
    de: 'Registernummer: HRB 110059'
  },
  'imprint.section2.taxNumber': {
    en: 'Tax Number: 42/733/00396',
    de: 'Umsatzsteuer-Nr: 42/733/00396'
  },
  'imprint.section2.vatId': {
    en: 'VAT ID (Umsatzsteuer-Identifikationsnummer): DE 265 683 841',
    de: 'Umsatzsteuer-ID: DE 265 683 841'
  },
  'imprint.section3.title': {
    en: 'Image Credits',
    de: 'Bildnachweise'
  },
  'imprint.section4.title': {
    en: 'Disclaimer',
    de: 'Haftungsausschluss'
  },
  'imprint.section4.content.title': {
    en: 'Liability for Content',
    de: 'Haftung für Inhalte'
  },
  'imprint.section4.content.text': {
    en: 'The contents of our pages were created with the greatest care. However, we cannot guarantee the accuracy, completeness, or topicality of the content. As a service provider, we are responsible for our own content on these pages in accordance with § 7 Para. 1 TMG under general law. According to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific infringement. Upon notification of such violations, we will remove this content immediately.',
    de: 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.'
  },
  'imprint.section4.links.title': {
    en: 'Liability for Links',
    de: 'Haftung für Links'
  },
  'imprint.section4.links.text': {
    en: 'Our offer contains links to external websites of third parties, the content of which we have no influence over. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of an infringement. Upon notification of violations, we will remove such links immediately.',
    de: 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'
  },
  'imprint.section4.copyright.title': {
    en: 'Copyright',
    de: 'Urheberrecht'
  },
  'imprint.section4.copyright.text': {
    en: 'The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please inform us accordingly. Upon notification of violations, we will remove such content immediately.',
    de: 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.'
  },
  'imprint.section4.privacy.title': {
    en: 'Data Protection',
    de: 'Datenschutz'
  },
  'imprint.section4.privacy.text1': {
    en: 'The use of our website is generally possible without providing personal data. Insofar as personal data (e.g., name, address, or email addresses) is collected on our pages, this is always done on a voluntary basis as far as possible. This data will not be passed on to third parties without your express consent.',
    de: 'Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.'
  },
  'imprint.section4.privacy.text2': {
    en: 'We point out that data transmission over the Internet (e.g., when communicating by email) can have security gaps. Complete protection of data against access by third parties is not possible.',
    de: 'Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.'
  },
  'imprint.section4.privacy.text3': {
    en: 'The use of contact data published within the scope of the imprint obligation by third parties for the purpose of sending unsolicited advertising and information materials is hereby expressly prohibited. The operators of the pages expressly reserve the right to take legal action in the event of unsolicited sending of advertising information, such as spam emails.',
    de: 'Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.'
  },
  'imprint.source': {
    en: 'Source: eRecht24 (Attorney-at-Law Sören Siebert)',
    de: 'Quelle: eRecht24 (Rechtsanwalt Sören Siebert)'
  },

  // Contact Page
  'contact.hero.title': {
    en: 'Contact',
    de: 'Kontakt'
  },
  'contact.form.name': {
    en: 'Name',
    de: 'Name'
  },
  'contact.form.namePlaceholder': {
    en: 'Your name',
    de: 'Ihr Name'
  },
  'contact.form.email': {
    en: 'Email Address',
    de: 'Email Adresse'
  },
  'contact.form.emailPlaceholder': {
    en: 'name@example.com',
    de: 'name@beispiel.de'
  },
  'contact.form.message': {
    en: 'Message',
    de: 'Anliegen'
  },
  'contact.form.honeypot': {
    en: 'Do not fill this out',
    de: 'Nicht ausfüllen'
  },
  'contact.form.submit': {
    en: 'Send Request',
    de: 'Anfrage absenden'
  },
  'contact.form.submitting': {
    en: 'Sending...',
    de: 'Wird gesendet...'
  },
  'contact.success.title': {
    en: 'Thank you!',
    de: 'Vielen Dank!'
  },
  'contact.success.message': {
    en: 'Your message has been sent successfully. We will get back to you as soon as possible.',
    de: 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns schnellstmöglich bei Ihnen melden.'
  },
  'contact.error.message': {
    en: 'An error occurred while sending your message. Please try again later.',
    de: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
  },

  // Intelligentic Search Page
  'is.hero.title': {
    en: 'Intelligentic Search',
    de: 'Intelligentic Search'
  },
  'is.hero.subline': {
    en: 'The ideal product found in minutes',
    de: 'Das ideale Produkt in Minuten gefunden'
  },
  'is.anchor.intro': {
    en: 'Intro',
    de: 'Intro'
  },
  'is.anchor.statusQuo': {
    en: 'Status Quo',
    de: 'Status Quo'
  },
  'is.anchor.features': {
    en: 'Features',
    de: 'Features'
  },
  'is.anchor.howItWorks': {
    en: 'How it Works',
    de: 'Funktionsweise'
  },
  'is.anchor.benefits': {
    en: 'Benefits',
    de: 'Vorteile'
  },
  'is.anchor.contact': {
    en: 'Contact',
    de: 'Kontakt'
  },
  'is.quote.text': {
    en: 'Product search as we know it is a relic from another era. Users still click through rigid filters, type keywords, and fight through endless result lists – even though AI could already enable us to find products as easily as we describe them. But this potential has so far been reserved for the big tech giants: OpenAI integrates shopping into ChatGPT, Amazon launches Rufus, Zalando builds its own models.',
    de: 'Die Produktsuche, wie wir sie kennen, ist ein Relikt aus einer anderen Zeit. Nutzer klicken sich noch immer durch starre Filter, tippen Keywords ein und kämpfen sich durch endlose Ergebnislisten – obwohl KI uns längst ermöglichen könnte, Produkte so leicht zu finden, wie wir sie beschreiben. Doch genau dieses Potenzial bleibt bis heute vor allem den großen Tech-Konzernen vorbehalten: OpenAI integriert Shopping in ChatGPT, Amazon launcht Rufus, Zalando baut seine eigenen Modelle.'
  },
  'is.quote.conclusion': {
    en: 'And SMEs? They\'re watching.',
    de: 'Und der Mittelstand? Schaut zu.'
  },
  'is.features.title': {
    en: 'Away from rigid filters and thousands of search results – towards the perfect match.',
    de: 'Weg von starren Filtern und Tausenden von Suchergebnissen – hin zum perfekten Match.'
  },
  'is.features.subline1': {
    en: 'Intelligentic Search is a modern form of product and information search. It automatically captures and transforms a company\'s product data and makes it searchable in natural language within milliseconds.',
    de: 'Die Intelligentic Search ist eine moderne Form der Produkt- und Informationssuche. Sie erfasst und transformiert die Produktdaten eines Unternehmens automatisch und macht sie für Nutzer in natürlicher Sprache in Millisekunden durchsuchbar.'
  },
  'is.features.subline2': {
    en: 'Users can freely formulate their requirements – from "I need a lightweight jacket for 10-degree drizzle" to a screenshot from social media. They receive precise results instantly. And when there are questions about shipping, products, or company knowledge, the AI delivers answers just as quickly.',
    de: 'Nutzer können ihre Anforderungen frei formulieren – von „Ich brauche eine leichte Jacke für 10 Grad Nieselregen" bis hin zu einem Screenshot aus Social Media. Sie erhalten sofort präzise Ergebnisse. Und wenn es Fragen zu Versand, Produkten oder Unternehmenswissen gibt, liefert die KI ebenso schnell Antworten.'
  },
  'is.features.subline3': {
    en: 'Intelligentic Search combines NLP, Computer Vision, and Machine Learning into a user experience where searching becomes finding.',
    de: 'Die Intelligentic Search kombiniert NLP, Computer Vision und Machine Learning zu einer Nutzererfahrung, in der Suchen zu Finden wird.'
  },
  'is.features.step1.label': {
    en: 'More precise than conventional AI searches',
    de: 'Präziser als herkömmliche KI-Suchen'
  },
  'is.features.step1.description': {
    en: 'We vectorize all product information, not just titles or short excerpts (like ChatGPT does).',
    de: 'Wir vektorisieren alle Produktinformationen, nicht nur Titel oder kurze Auszüge (wie z.B. bei ChatGPT).'
  },
  'is.features.step2.label': {
    en: 'Image search integrated',
    de: 'Bildsuche integriert'
  },
  'is.features.step2.description': {
    en: 'Users can upload images → matching products appear in seconds.',
    de: 'Nutzer können Bilder hochladen → passende Produkte erscheinen in Sekunden.'
  },
  'is.features.step3.label': {
    en: 'Real AI instead of static logic',
    de: 'Echte KI statt statischer Logik'
  },
  'is.features.step3.description': {
    en: 'No keyword filters, no hard-wired dialog trees. Dynamic interpretation of needs.',
    de: 'Keine Keyword-Filter, keine fest verdrahteten Dialogbäume. Dynamische Interpretation von Bedürfnissen.'
  },
  'is.features.step4.label': {
    en: 'Millisecond response times',
    de: 'Millisekunden-Antwortzeiten'
  },
  'is.features.step4.description': {
    en: 'Through highly efficient vector search and locally hosted models.',
    de: 'Durch hocheffiziente Vektorsuche und lokal gehostete Modelle.'
  },
  'is.modular.title': {
    en: 'Modular and dynamic.',
    de: 'Modular und dynamisch.'
  },
  'is.modular.text1': {
    en: 'Our mission is to find the perfectly tailored solution for everyone. Intelligentic Search is a modular system that can be extended with custom features and adapted to your company\'s characteristics.',
    de: 'Unsere Mission ist es für jeden die perfekt zugeschnittene Lösung zu finden. Die Intelligentic Search ist ein Modulares System, das um eigene Wünsche und Funktionen erweitert und auf die Eigenschaften Ihres Unternehmens angepasst werden kann.'
  },
  'is.modular.text2': {
    en: 'The same applies to the interface through which users operate the search. We offer various integration and design options or can simply connect Intelligentic Search to your existing design.',
    de: 'Das gilt ebenso für das Interface, über das Nutzer die Suche bedienen können. Wir bieten diverse Integrations- und Designmöglichkeiten oder können die Intelligentic Search ganz einfach an ihr bestehendes Design anbinden.'
  },
  'is.modular.text3': {
    en: 'Intelligentic Search is primarily the system in the background, not the visual.',
    de: 'Die Intelligentic Search ist primär das System im Hintergrund und nicht das Visuelle.'
  },
  'is.howItWorks.title': {
    en: 'How Intelligentic Search works.',
    de: 'Wie funktioniert die Intelligentic Search.'
  },
  'is.stats.title': {
    en: 'Ideal product found in',
    de: 'Das ideale Produkt gefunden in'
  },
  'is.stats.description': {
    en: 'Intelligentic Search finds the right product in milliseconds – instead of the usual 10-30 minutes with traditional search.',
    de: 'Die Intelligentic Search findet das passende Produkt in Millisekunden – statt der üblichen 10-30 Minuten bei traditioneller Suche.'
  },
  'is.stats.value': {
    en: '< 1 Sec',
    de: '< 1 Sek'
  },
  'is.stats.label': {
    en: 'Average search time with Intelligentic Search',
    de: 'Durchschnittliche Suchzeit mit Intelligentic Search'
  },
  'is.benefits.title': {
    en: 'No irrelevant search results.',
    de: 'Keine irrelevanten Suchergebnisse.'
  },
  'is.benefits.text1': {
    en: 'Intelligentic Search is not just a technical search function.',
    de: 'Die Intelligentic Search ist nicht nur eine technische Suchfunktion.'
  },
  'is.benefits.text2': {
    en: 'For users, it\'s the feeling of being supported and advised, rather than being left on their own.',
    de: 'Für die Nutzer ist es das Gefühl, unterstützt und beraten zu werden und nicht auf sich allein gestellt zu sein.'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved language preference after mount
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage === 'en' || savedLanguage === 'de') {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};