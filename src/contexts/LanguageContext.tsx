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
  'agenticTools.tool3.title': {
    en: 'iKnow',
    de: 'iKnow'
  },
  'agenticTools.tool3.description': {
    en: 'The central knowledge platform for your organization. AI-powered, local, and secure – iKnow transforms distributed information into a structured, always-available knowledge foundation for better decisions and future AI applications.',
    de: 'Die zentrale Wissensplattform für Ihr Unternehmen. KI-basiert, lokal und sicher – iKnow verwandelt verteiltes Wissen in eine strukturierte, jederzeit verfügbare Wissensgrundlage für bessere Entscheidungen und zukunftssichere KI-Anwendungen.'
  },

  // iKnow Page
  'iknow.hero.subtitle': {
    en: 'AI without knowledge is just another tool',
    de: 'KI ohne Wissen ist nur ein weiteres Tool'
  },
  'iknow.anchor.intro': {
    en: 'Intro',
    de: 'Intro'
  },
  'iknow.anchor.statusQuo': {
    en: 'Status Quo',
    de: 'Status Quo'
  },
  'iknow.anchor.whatIs': {
    en: 'What is iKnow?',
    de: 'Was ist iKnow?'
  },
  'iknow.anchor.benefits': {
    en: 'Your Benefits',
    de: 'Ihr Mehrwert'
  },
  'iknow.anchor.intoTool': {
    en: 'Into the Tool',
    de: 'Ins Tool'
  },
  'iknow.anchor.contact': {
    en: 'Contact',
    de: 'Kontakt'
  },
  'iknow.intro.quote': {
    en: '"Every company\'s business data is their gold mine."',
    de: '"Every company\'s business data is their gold mine."'
  },
  'iknow.intro.quoteAuthor': {
    en: ' – Jensen Huang, 2024',
    de: ' – Jensen Huang, 2024'
  },
  'iknow.intro.p1': {
    en: 'Your company holds a gold mine: the collective knowledge of your organization and employees, built up over years.',
    de: 'Ihr Unternehmen besitzt eine Goldmine: Das kollektive Wissen Ihrer Organisation und Ihrer Mitarbeiter, das Sie über Jahre aufgebaut haben.'
  },
  'iknow.intro.p2': {
    en: 'Uncover this treasure! AI enables you to make individual knowledge available to everyone. A knowledge pool instead of an island, structure instead of silos, accessible to all.',
    de: 'Heben Sie diesen Schatz! KI ermöglicht Ihnen, das personengebundene Wissen allen verfügbar zu machen. Ein Wissenspool statt einer Insel, Struktur statt Silo, zugänglich für alle.'
  },
  'iknow.intro.p3': {
    en: 'How does it work? With iKnow:',
    de: 'Wie das geht? Mit iKnow:'
  },
  'iknow.what.title': {
    en: 'What is iKnow?',
    de: 'Was ist iKnow?'
  },
  'iknow.what.p1': {
    en: 'iKnow is the central knowledge platform for companies and organizations that want to make their knowledge sustainably usable. It captures knowledge where it arises in everyday work – simply, intuitively, automated, AI-based, secure, and without additional effort for employees.',
    de: 'iKnow ist die zentrale Wissensplattform für Unternehmen und Organisationen, die ihr Wissen nachhaltig nutzbar machen wollen. Sie sammelt Wissen dort, wo es im Arbeitsalltag entsteht – einfach, intuitiv, automatisiert, KI-basiert, sicher und ohne zusätzlichen Aufwand für Mitarbeitende.'
  },
  'iknow.what.p2': {
    en: 'It grows with your company\'s knowledge. Continuous learning? Of course – that\'s what you do too.',
    de: 'Sie wächst mit dem Wissen Ihres Unternehmens. Kontinuierlich lernen? Selbstverständlich, das tun Sie ja auch.'
  },
  'iknow.what.p3': {
    en: 'But with full transparency: you retain complete control over content, sources, and processing. All data stays local within your company, with no external connections – no public AI APIs.',
    de: 'Aber bitte transparent: Sie behalten die volle Kontrolle über Inhalte, Quellen und Verarbeitung. Alle Daten bleiben lokal im Unternehmen, ohne Anbindung nach außen, also ohne öffentliche KI-APIs.'
  },
  'iknow.what.p4': {
    en: '\u2192 This is how iKnow transforms distributed information within your company into a secure, structured, and always-available knowledge foundation for better decisions and future AI applications.',
    de: '\u2192 So verwandelt iKnow im Unternehmen verteilte Informationen in eine sichere, strukturierte und jederzeit verfügbare Wissensgrundlage für bessere Entscheidungen und zukünftige KI-Anwendungen.'
  },
  'iknow.guidance.title': {
    en: 'Here\'s what you get!',
    de: 'Das haben Sie nun davon!'
  },
  'iknow.card1.title': {
    en: 'All knowledge sources united',
    de: 'Alle Wissensquellen vereint'
  },
  'iknow.card1.description': {
    en: 'iKnow connects via API to tools like Microsoft 365, Google Workspace, or Slack. It brings distributed knowledge together in one central place.',
    de: 'iKnow verbindet sich per API mit Tools wie Microsoft 365, Google Workspace oder Slack. Es führt verteiltes Wissen zentral zusammen.'
  },
  'iknow.card2.title': {
    en: 'Organized and structured',
    de: 'Aufgeräumt und strukturiert'
  },
  'iknow.card2.description': {
    en: 'Emails, chats, and documents are automatically captured and standardized. This way, overwhelming amounts of data are transformed by local AI into a clearly structured knowledge base.',
    de: 'E-Mails, Chats und Dokumente werden automatisch erfasst und standardisiert. So werden unübersichtliche Datenmengen durch lokale KI zu einer klar strukturierten Wissensbasis.'
  },
  'iknow.card3.title': {
    en: 'Optional: Use conversations too',
    de: 'Optional: Nutzen Sie auch Gespräche'
  },
  'iknow.card3.description': {
    en: 'iKnow can transcribe meetings and workshops, integrating new knowledge directly into the system. This way, you can capture knowledge before it\'s lost – if desired.',
    de: 'iKnow kann Meetings und Workshops transkribieren und so neues Wissen direkt in das System integrieren. So können Sie, wenn gewünscht, Wissen sichern, bevor es verloren geht.'
  },
  'iknow.card4.title': {
    en: 'Today\'s knowledge for tomorrow',
    de: 'Wissen von heute für morgen'
  },
  'iknow.card4.description': {
    en: 'Preserve the knowledge of today\'s generations for the future: iKnow permanently safeguards your most valuable resource, securing your company\'s collective memory.',
    de: 'Sichern Sie Wissen heutiger Generationen für künftige: iKnow bewahrt Ihre wertvollste Ressource dauerhaft und sichert so das kollektive Gedächtnis Ihres Unternehmens.'
  },
  'iknow.card5.title': {
    en: 'Security and sovereignty',
    de: 'Sicherheit und Souveränität'
  },
  'iknow.card5.description': {
    en: 'iKnow works locally: as desktop software, it processes data securely on-site. Maintain control over your data and knowledge at all times.',
    de: 'iKnow arbeitet lokal: Als Desktop-Software verarbeitet es Daten sicher vor Ort. Behalten Sie die Kontrolle über Ihre Daten und Ihr Wissen, jederzeit.'
  },
  'iknow.card6.title': {
    en: 'Ready for your enterprise AI',
    de: 'Bereit für Ihre Unternehmens-KI'
  },
  'iknow.card6.description': {
    en: 'iKnow builds the data foundation you need for AI agents. This way, your company becomes ready for the future with AI in no time – automated, simple, data-secure, and state of the art.',
    de: 'iKnow baut für Sie die Datengrundlage, die Sie für die Nutzung von KI-Agenten benötigen. So wird Ihr Unternehmen in kurzer Zeit bereit für die Zukunft mit KI – automatisiert, einfach, datensicher und auf der Höhe der Zeit.'
  },
  'iknow.howItWorks.title': {
    en: 'Discover iKnow: A look into the tool',
    de: 'Entdecken Sie iKnow: Der Blick ins Tool'
  },
  'iknow.howItWorks.p1': {
    en: 'The question is not whether you use AI. But what you build it on.',
    de: 'Die Frage ist nicht, ob Sie KI einsetzen. Sondern worauf Sie sie aufbauen.'
  },
  'iknow.howItWorks.p2': {
    en: 'Success and security go hand in hand: only with a secure, internal knowledge base can AI be safe and successful. Make AI your competitive advantage!',
    de: 'Erfolg und Sicherheit bedingen sich gegenseitig: Nur mit einer sicheren, internen Wissensbasis kann KI sicher und erfolgreich sein. Machen Sie KI zu Ihrem Wettbewerbsvorteil!'
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
    en: 'Search made effective: Less effort, better results',
    de: 'Suche effektiv gemacht: Weniger Aufwand, bessere Ergebnisse'
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
    en: 'Product search has entered the AI Era: From OpenAI and ChatGPT to Amazon and Google: AI Search and AI Shopping is the thing.\n\nWith Intelligentic Search you can be part of this: More features than Amazons Rufus and a data-safe approach at an affordable price that will easily pay off.\nWe offer next level search for small and medium businesses. Don\'t leave your customers to the big techs.',
    de: 'Die Produktsuche ist im KI-Zeitalter angekommen: Von OpenAI und ChatGPT bis Amazon und Google: KI-Suche und KI-Shopping sind das Thema.\n\nMit Intelligentic Search können Sie Teil davon sein: Mehr Features als Amazons Rufus und ein datensicherer Ansatz zu einem erschwinglichen Preis, der sich schnell auszahlt.\nWir bieten Next-Level-Suche für kleine und mittlere Unternehmen. Überlassen Sie Ihre Kunden nicht den großen Tech-Konzernen.'
  },
  'is.quote.conclusion': {
    en: 'We know you can do it. Intelligentic search.',
    de: 'Wir wissen, dass Sie es können. Intelligentic Search.'
  },
  'is.features.title': {
    en: 'It\'s a match!',
    de: 'It\'s a match!'
  },
  'is.features.subline1': {
    en: 'Forget what you knew about filters - experience the flexibility and hyper personalization only AI can offer\n\nIntelligentic Search is a modern form of product and information search. It automatically captures and transforms a company\'s product data and makes it searchable in natural language within milliseconds.',
    de: 'Vergessen Sie, was Sie über Filter wussten - erleben Sie die Flexibilität und Hyper-Personalisierung, die nur KI bieten kann\n\nIntelligentic Search ist eine moderne Form der Produkt- und Informationssuche. Sie erfasst und transformiert die Produktdaten eines Unternehmens automatisch und macht sie in natürlicher Sprache in Millisekunden durchsuchbar.'
  },
  'is.features.subline2': {
    en: 'Users can freely formulate their requirements – from "I need a lightweight jacket for 10-degree drizzle" to a screenshot from social media. They receive precise results instantly. And when there are questions about shipping, products, or company knowledge, the AI delivers answers just as quickly.\n\nIntelligentic Search combines NLP, Computer Vision, and Machine Learning into a user experience where searching becomes finding.',
    de: 'Nutzer können ihre Anforderungen frei formulieren – von „Ich brauche eine leichte Jacke für 10 Grad Nieselregen" bis hin zu einem Screenshot aus Social Media. Sie erhalten sofort präzise Ergebnisse. Und wenn es Fragen zu Versand, Produkten oder Unternehmenswissen gibt, liefert die KI ebenso schnell Antworten.\n\nIntelligentic Search kombiniert NLP, Computer Vision und Machine Learning zu einer Nutzererfahrung, in der Suchen zu Finden wird.'
  },
  'is.features.subline3': {
    en: 'Rigid filters? Thousands of "results" to click through? So yesterday!\n\nBe up to date with Intelligentic Search. It\'s a match!',
    de: 'Starre Filter? Tausende von „Ergebnissen" zum Durchklicken? So gestern!\n\nSeien Sie auf dem neuesten Stand mit Intelligentic Search. It\'s a match!'
  },
  'is.features.step1.label': {
    en: 'Intelligentic Search is more precise than conventional AI searches',
    de: 'Intelligentic Search ist präziser als herkömmliche KI-Suchen'
  },
  'is.features.step1.description': {
    en: 'We vectorize all product information, not just titles or short excerpts (like ChatGPT does).',
    de: 'Wir vektorisieren alle Produktinformationen, nicht nur Titel oder kurze Auszüge (wie z.B. bei ChatGPT).'
  },
  'is.features.step2.label': {
    en: 'Integrated Image Search',
    de: 'Integrierte Bildsuche'
  },
  'is.features.step2.description': {
    en: 'Users can upload images - matching results appear within seconds',
    de: 'Nutzer können Bilder hochladen - passende Ergebnisse erscheinen innerhalb von Sekunden'
  },
  'is.features.step3.label': {
    en: 'Intelligentic Search is the Real AI',
    de: 'Intelligentic Search ist die echte KI'
  },
  'is.features.step3.description': {
    en: 'It puts away with static logic, keyword filters and hard-wired dialog trees. Dynamic interpretation of needs.',
    de: 'Sie räumt auf mit statischer Logik, Keyword-Filtern und fest verdrahteten Dialogbäumen. Dynamische Interpretation von Bedürfnissen.'
  },
  'is.features.step4.label': {
    en: 'Millisecond response times',
    de: 'Millisekunden-Antwortzeiten'
  },
  'is.features.step4.description': {
    en: 'Quick as yet unseen through highly efficient vector search and locally hosted models.',
    de: 'Schnell wie nie zuvor durch hocheffiziente Vektorsuche und lokal gehostete Modelle.'
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
  'is.howItWorks.title': {
    en: 'Under the hood: How the Intelligentic Search Engine works',
    de: 'Unter der Haube: Wie die Intelligentic Search Engine funktioniert'
  },
  'is.howItWorks.description': {
    en: 'The Intelligentic Search is primarily the engine in the background.',
    de: 'Die Intelligentic Search ist primär die Engine im Hintergrund.'
  },
  'is.stats.title': {
    en: 'Straight to the product',
    de: 'Ohne Umweg zum Produkt'
  },
  'is.stats.description': {
    en: 'In typical online purchases, users today need an average of 10 to 30 minutes to find the ideal product. The Intelligentic Search finds the right product in milliseconds. The Intelligentic Search also prevents the well-known frustration of zero results, as it always finds the closest possible match. Users reach their ideal product faster and the likelihood of abandonment decreases significantly.',
    de: 'Bei typischen Online-Käufen brauchen Nutzer heute durchschnittlich zwischen 10 und 30 Minuten um das ideale Produkt zu finden. Die Intelligentic Search findet das passende Produkt in Millisekunden. Die Intelligentic Search verhindert zudem bekannte Enttäuschungen über 0 Treffer, zumal sie immer einen möglichst ähnlichen Treffer landet. Die Nutzer kommen schneller zum idealen Produkt und die Wahrscheinlichkeit eines Abbruchs sinkt signifikant.'
  },
  'is.stats.value': {
    en: '< 1 Sec',
    de: '< 1 Sek'
  },
  'is.stats.label': {
    en: 'Average search time with Intelligentic Search',
    de: 'Durchschnittliche Suchzeit mit Intelligentic Search'
  },
  'is.comparison.title': {
    en: 'The benefits for you',
    de: 'Die Vorteile für Sie'
  },
  'is.comparison.primaryHeader': {
    en: 'Intelligentic Search',
    de: 'Intelligentic Search'
  },
  'is.comparison.secondaryHeader': {
    en: 'Traditional Search',
    de: 'Traditionelle Suche'
  },
  'is.comparison.row1.feature': {
    en: 'Time to Product',
    de: 'Zeit bis zum Produkt'
  },
  'is.comparison.row1.primary': {
    en: '< 3 minutes',
    de: '< 3 Minuten'
  },
  'is.comparison.row1.secondary': {
    en: '20-30 minutes',
    de: '20-30 Minuten'
  },
  'is.comparison.row2.feature': {
    en: 'Search Style',
    de: 'Suchstil'
  },
  'is.comparison.row2.primary': {
    en: 'Natural language + images',
    de: 'Natürliche Sprache + Bilder'
  },
  'is.comparison.row2.secondary': {
    en: 'Keyword search, complex filters and tags',
    de: 'Stichwortsuche, komplexe Filter und Tags'
  },
  'is.comparison.row3.feature': {
    en: 'Recommended Products',
    de: 'Empfohlene Produkte'
  },
  'is.comparison.row3.primary': {
    en: 'Only 3-5 ideal products',
    de: 'Nur 3-5 ideale Produkte'
  },
  'is.comparison.row3.secondary': {
    en: 'Up to thousands of products',
    de: 'Bis zu tausende Produkte'
  },
  'is.benefits.title': {
    en: 'Straight to the product',
    de: 'Ohne Umweg zum Produkt'
  },
  'is.benefits.text1': {
    en: 'In typical online purchases, users today need an average of 10 to 30 minutes to find the ideal product. The Intelligentic Search finds the right product in milliseconds. It also prevents the well-known frustration of zero results, as it always finds the closest possible match. Users reach their ideal product faster and the likelihood of abandonment decreases significantly.',
    de: 'Bei typischen Online-Käufen brauchen Nutzer heute durchschnittlich zwischen 10 und 30 Minuten um das ideale Produkt zu finden. Die Intelligentic Search findet das passende Produkt in Millisekunden. Sie verhindert zudem die bekannte Enttäuschung über 0 Treffer, da sie immer den ähnlichsten Treffer findet. Die Nutzer kommen schneller zum idealen Produkt und die Wahrscheinlichkeit eines Abbruchs sinkt signifikant.'
  },
  'is.benefits.text2': {
    en: 'Intelligentic Search is not just a technical search function. For users, it\'s the feeling of being supported and advised, rather than being left on their own.',
    de: 'Die Intelligentic Search ist nicht nur eine technische Suchfunktion. Für die Nutzer ist es das Gefühl, unterstützt und beraten zu werden und nicht auf sich allein gestellt zu sein.'
  },

  // ICU User Journey Explorer Page
  'icu.hero.title': {
    en: 'ICU – User Journey Explorer',
    de: 'ICU – User Journey Explorer'
  },
  'icu.hero.subline': {
    en: 'Real user journeys, automatically revealed',
    de: 'Echte User Journeys, automatisch sichtbar gemacht'
  },
  'icu.intro.text': {
    en: 'Most analytics tools show the journeys you presume your users take. ICU shows the ones they actually took. The AI driven tool reconstructs every real path across your website or product in real time — every step, every return, every drop-off — and turns it into a visual map anyone can understand. No setup, no dashboards to configure, no analyst degree required.',
    de: 'Die meisten Analytics-Tools zeigen die Journeys, die Sie bei Ihren Nutzern vermuten. ICU zeigt die, die tatsächlich stattgefunden haben. Das KI-gestützte Tool rekonstruiert jeden echten Pfad durch Ihre Website oder Ihr Produkt in Echtzeit — jeden Schritt, jede Rückkehr, jeden Abbruch — und verwandelt ihn in eine visuelle Karte, die jeder verstehen kann. Kein Setup, keine Dashboards zu konfigurieren, kein Analyst-Studium erforderlich.'
  },
  'icu.carousel.title': {
    en: "We bring clarity to your user's behaviour. In an instant.",
    de: 'Wir bringen Klarheit in das Verhalten Ihrer Nutzer. Sofort.'
  },
  'icu.carousel.subline': {
    en: 'ICU is built for the people who make decisions and for everybody else. ICU automatically - effortlessly - reveals the real journeys your users take. No dashboards to configure, no filters to master, no IT course to take — just clear, visual behaviour anyone on your team can understand intuitively.',
    de: 'ICU wurde für Entscheider entwickelt — und für alle anderen. ICU enthüllt automatisch und mühelos die echten Journeys Ihrer Nutzer. Keine Dashboards zu konfigurieren, keine Filter zu beherrschen, kein IT-Kurs nötig — nur klares, visuelles Verhalten, das jeder in Ihrem Team intuitiv versteht.'
  },
  'icu.carousel.item1.title': {
    en: 'Real journeys, not assumptions',
    de: 'Echte Journeys, keine Annahmen'
  },
  'icu.carousel.item1.description': {
    en: 'ICU uncovers every real path your users take — including loops, returns, and silent drop-offs — reconstructed automatically from your full dataset. No setup. No stitching. No guesswork.',
    de: 'ICU deckt jeden echten Pfad Ihrer Nutzer auf — einschließlich Schleifen, Rückkehrern und stillen Abbrüchen — automatisch aus Ihrem vollständigen Datensatz rekonstruiert. Kein Setup. Kein Zusammenstückeln. Kein Rätselraten.'
  },
  'icu.carousel.item2.title': {
    en: 'Made for non-analysts',
    de: 'Für Nicht-Analysten gemacht'
  },
  'icu.carousel.item2.description': {
    en: 'Marketing managers, product teams, and growth leads can explore behaviour without relying on technical analysts. ICU removes the complexity and turns raw activity into understandable, actionable insights.',
    de: 'Marketing-Manager, Produktteams und Growth Leads können Verhalten erkunden, ohne auf technische Analysten angewiesen zu sein. ICU beseitigt die Komplexität und verwandelt rohe Aktivitäten in verständliche, umsetzbare Erkenntnisse.'
  },
  'icu.carousel.item3.title': {
    en: 'Insights in natural language',
    de: 'Erkenntnisse in natürlicher Sprache'
  },
  'icu.carousel.item3.description': {
    en: "Ask ICU in plain language —\n\"Where did most users drop last week?\"\n\"How did returning users behave differently from new ones?\"\nThe system runs the analysis for you and visualises the result instantly.",
    de: 'Fragen Sie ICU in einfacher Sprache —\n„Wo sind letzte Woche die meisten Nutzer abgesprungen?"\n„Wie haben sich wiederkehrende Nutzer anders verhalten als neue?"\nDas System führt die Analyse für Sie durch und visualisiert das Ergebnis sofort.'
  },
  'icu.guidance.title': {
    en: 'How ICU turns complexity into clarity',
    de: 'Wie ICU Komplexität in Klarheit verwandelt'
  },
  'icu.guidance.subline': {
    en: 'Explore real user journeys through visual maps you can navigate — or simply ask for the insights you need.',
    de: 'Erkunden Sie echte User Journeys durch visuelle Karten, die Sie navigieren können — oder fragen Sie einfach nach den Erkenntnissen, die Sie brauchen.'
  },
  'icu.card1.title': {
    en: 'From general overview down to the smallest detail',
    de: 'Vom allgemeinen Überblick bis ins kleinste Detail'
  },
  'icu.card1.description': {
    en: 'ICU reconstructs every real journey end-to-end — every phase, step, loop, and event. Everything is linked automatically, so you can spot dominant patterns and understand behaviour at both macro and micro levels.',
    de: 'ICU rekonstruiert jede echte Journey von Anfang bis Ende — jede Phase, jeden Schritt, jede Schleife und jedes Event. Alles ist automatisch verknüpft, sodass Sie dominante Muster erkennen und Verhalten sowohl auf Makro- als auch auf Mikroebene verstehen können.'
  },
  'icu.card2.title': {
    en: 'Complexity, simplified',
    de: 'Komplexität, vereinfacht'
  },
  'icu.card2.description': {
    en: 'ICU visualizes transitions and paths that traditional analytics bury in tables. Even the most tangled journeys become readable: Clear structure, clean flows, no clutter — so you can focus on what matters, not on deciphering dashboards.',
    de: 'ICU visualisiert Übergänge und Pfade, die traditionelle Analytics in Tabellen verstecken. Selbst die verwirrensten Journeys werden lesbar: Klare Struktur, saubere Abläufe, kein Durcheinander — damit Sie sich auf das Wesentliche konzentrieren können, nicht auf das Entschlüsseln von Dashboards.'
  },
  'icu.card3.title': {
    en: 'This is how users actually reach conversion',
    de: 'So erreichen Nutzer tatsächlich die Conversion'
  },
  'icu.card3.description': {
    en: 'ICU traces all relevant user paths leading to a conversion. You immediately see which touchpoints drive progress, which detours unexpectedly work, and where friction slows people down. Conversion journeys become transparent — and optimizable.',
    de: 'ICU verfolgt alle relevanten Nutzerpfade, die zu einer Conversion führen. Sie sehen sofort, welche Touchpoints den Fortschritt vorantreiben, welche Umwege unerwartet funktionieren und wo Reibung die Menschen ausbremst. Conversion-Journeys werden transparent — und optimierbar.'
  },
  'icu.card4.title': {
    en: 'Answers instead of questions — powered by AI',
    de: 'Antworten statt Fragen — mit KI'
  },
  'icu.card4.description': {
    en: "Ask ICU in everyday language and get the analysis instantly.\n\"Where did most users drop off last week?\"\n\"What's the biggest behavioural difference between new and returning users?\"\nICU's agent interprets the question, runs the analysis, and presents the answer in a comprehensible way. No filters, no SQL, no manual setup.",
    de: 'Fragen Sie ICU in Alltagssprache und erhalten Sie die Analyse sofort.\n„Wo sind letzte Woche die meisten Nutzer abgesprungen?"\n„Was ist der größte Verhaltensunterschied zwischen neuen und wiederkehrenden Nutzern?"\nICUs Agent interpretiert die Frage, führt die Analyse durch und präsentiert die Antwort verständlich. Keine Filter, kein SQL, kein manuelles Setup.'
  },
  'icu.card5.title': {
    en: 'Interactive analysis, down to the dot',
    de: 'Interaktive Analyse, bis ins Detail'
  },
  'icu.card5.description': {
    en: 'Every node is clickable, every transition explorable. ICU lets you dive in as deeply as you need: from high-level patterns to single behavioural decisions. Drop-offs, loops, progressions, anomalies — everything becomes visible the moment you explore it.',
    de: 'Jeder Knoten ist anklickbar, jeder Übergang erkundbar. ICU lässt Sie so tief eintauchen, wie Sie möchten: von übergeordneten Mustern bis zu einzelnen Verhaltensentscheidungen. Abbrüche, Schleifen, Fortschritte, Anomalien — alles wird sichtbar, sobald Sie es erkunden.'
  },
  'icu.faq.title': {
    en: 'Frequently Asked Questions',
    de: 'Häufig gestellte Fragen'
  },
  'icu.faq.q1.title': {
    en: 'What makes ICU different from traditional analytics tools?',
    de: 'Was unterscheidet ICU von traditionellen Analytics-Tools?'
  },
  'icu.faq.q1.content': {
    en: "Most analytics platforms let you assemble hypothetical flows.\nICU reconstructs the actual journeys your users take — automatically, from your full dataset. No manual setup, no dashboards to configure, no guesswork.",
    de: 'Die meisten Analytics-Plattformen lassen Sie hypothetische Flows zusammenstellen.\nICU rekonstruiert die tatsächlichen Journeys Ihrer Nutzer — automatisch, aus Ihrem vollständigen Datensatz. Kein manuelles Setup, keine Dashboards zu konfigurieren, kein Rätselraten.'
  },
  'icu.faq.q2.title': {
    en: 'Do I need technical knowledge to use ICU?',
    de: 'Brauche ich technisches Wissen, um ICU zu nutzen?'
  },
  'icu.faq.q2.content': {
    en: "No. ICU is designed for non-analysts.\nMarketing teams, product managers, and growth leads can explore behaviour without filters, segments, event taxonomies, or SQL. Everything is visual, intuitive, and guided.",
    de: 'Nein. ICU ist für Nicht-Analysten konzipiert.\nMarketing-Teams, Produktmanager und Growth Leads können Verhalten ohne Filter, Segmente, Event-Taxonomien oder SQL erkunden. Alles ist visuell, intuitiv und geführt.'
  },
  'icu.faq.q3.title': {
    en: 'How does ICU reconstruct real user journeys?',
    de: 'Wie rekonstruiert ICU echte User Journeys?'
  },
  'icu.faq.q3.content': {
    en: "ICU processes your raw event data and automatically maps every step, loop, return and drop-off. The system links events into complete journeys and visualises them as clean, explorable paths.",
    de: 'ICU verarbeitet Ihre rohen Event-Daten und kartiert automatisch jeden Schritt, jede Schleife, jede Rückkehr und jeden Abbruch. Das System verknüpft Events zu vollständigen Journeys und visualisiert sie als übersichtliche, erkundbare Pfade.'
  },
  'icu.faq.q4.title': {
    en: 'Can I ask ICU questions in natural language?',
    de: 'Kann ich ICU Fragen in natürlicher Sprache stellen?'
  },
  'icu.faq.q4.content': {
    en: "Yes.\nICU includes an intelligent agent that understands plain-language questions like:\n\"Where did most users drop off last week?\"\n\"How do new users behave differently from returning ones?\"\nICU runs the analysis for you and shows the answer visually.",
    de: 'Ja.\nICU enthält einen intelligenten Agenten, der einfache Fragen versteht wie:\n„Wo sind letzte Woche die meisten Nutzer abgesprungen?"\n„Wie verhalten sich neue Nutzer anders als wiederkehrende?"\nICU führt die Analyse für Sie durch und zeigt die Antwort visuell.'
  },
  'icu.faq.q5.title': {
    en: 'Which data sources does ICU support?',
    de: 'Welche Datenquellen unterstützt ICU?'
  },
  'icu.faq.q5.content': {
    en: "ICU integrates seamlessly with common setups:\nTag Managers, event pipelines, backend events, CRM data, and custom tracking.\nIf your system emits behavioural data, ICU can process it.",
    de: 'ICU integriert sich nahtlos mit gängigen Setups:\nTag Manager, Event-Pipelines, Backend-Events, CRM-Daten und Custom Tracking.\nWenn Ihr System Verhaltensdaten ausgibt, kann ICU sie verarbeiten.'
  },
  'icu.faq.q6.title': {
    en: 'How does ICU handle data privacy and security?',
    de: 'Wie geht ICU mit Datenschutz und Sicherheit um?'
  },
  'icu.faq.q6.content': {
    en: "ICU never requires unnecessary personal data.\nAll analyses are based on behavioural signals, handled within secure environments, and processed according to privacy-first principles.\nWe show journeys, not identities.",
    de: 'ICU benötigt niemals unnötige personenbezogene Daten.\nAlle Analysen basieren auf Verhaltenssignalen, werden in sicheren Umgebungen verarbeitet und folgen Privacy-First-Prinzipien.\nWir zeigen Journeys, keine Identitäten.'
  },

  // Campaign Parameter Tool Page
  'ct.hero.headline': {
    en: 'UTM Automation for Marketing, Media & Analytics Teams',
    de: 'UTM-Automatisierung für Marketing, Media & Analytics Teams'
  },
  'ct.hero.subheadline': {
    en: 'The iCompetence Parameter Tool (iCPT) automates your entire UTM parameter management – for consistent campaigns, better data quality, and seamless analytics.',
    de: 'Das iCompetence Parameter Tool (iCPT) automatisiert das gesamte UTM-Parameter-Management – für konsistente Kampagnen, bessere Datenqualität und reibungslose Analysen.'
  },
  'ct.hero.bullet1': {
    en: 'Unified tracking parameters across all campaigns',
    de: 'Einheitliche Tracking-Parameter über alle Kampagnen'
  },
  'ct.hero.bullet2': {
    en: 'No more manual errors',
    de: 'Keine manuellen Fehler mehr'
  },
  'ct.hero.bullet3': {
    en: 'Clean data for Analytics & Attribution',
    de: 'Saubere Daten für Analytics & Attribution'
  },
  'ct.hero.bullet4': {
    en: 'Optimized for Media and Performance Teams',
    de: 'Optimiert für Media- und Performance-Teams'
  },
  'ct.hero.cta1': {
    en: 'Start Trial',
    de: 'Trial starten'
  },
  'ct.hero.cta2': {
    en: 'Learn More',
    de: 'Mehr erfahren'
  },

  // Value Cards
  'ct.values.title': {
    en: 'The Value for Your Team',
    de: 'Der Mehrwert für Ihr Team'
  },
  'ct.values.card1.title': {
    en: 'Consistent UTM Parameters – Across All Channels',
    de: 'Konsistente UTM-Parameter – über alle Channels'
  },
  'ct.values.card1.description': {
    en: 'Define once, use everywhere. Standardized parameter logs prevent sprawl, typos, and unclear campaign names.',
    de: 'Definiert einmal, genutzt überall. Standardisierte Parameterlogs verhindern Wildwuchs, Tippfehler und unklare Kampagnenbezeichnungen.'
  },
  'ct.values.card2.title': {
    en: 'Zero Maintenance – Clear Governance in the Team',
    de: 'Zero Maintenance – klare Governance im Team'
  },
  'ct.values.card2.description': {
    en: 'Workflows and templates ensure campaigns are consistent from setup to delivery – even across multiple teams, brands, or countries.',
    de: 'Workflows und Templates sorgen dafür, dass Kampagnen vom Setup bis zur Aussteuerung einheitlich sind – auch über mehrere Teams, Brands oder Länder hinweg.'
  },
  'ct.values.card3.title': {
    en: 'Less Time Wasted – More Campaigns',
    de: 'Weniger Zeitverlust – mehr Kampagnen'
  },
  'ct.values.card3.description': {
    en: 'No more tedious manual parameter maintenance in Excel sheets or Slack threads. Parameters are automatically generated and documented.',
    de: 'Keine mühsame manuelle Parameterpflege mehr in Excel-Sheets oder Slack-Threads. Parameter werden automatisch generiert und dokumentiert.'
  },
  'ct.values.card4.title': {
    en: 'Clean Analytics & Attribution',
    de: 'Saubere Analytics & Attribution'
  },
  'ct.values.card4.description': {
    en: 'Perfectly prepared for Web Analytics, BI, and MMPs. Consistent naming = better analysis + better decision-making.',
    de: 'Perfekt vorbereitet für Web Analytics, BI und MMPs. Konsistente Benennungen = bessere Auswertung + bessere Entscheidungsgrundlagen.'
  },

  // Demo Preview
  'ct.demo.title': {
    en: 'How the Tool Works',
    de: 'So funktioniert das Tool'
  },
  'ct.demo.description': {
    en: 'In just a few clicks, teams generate the right tracking parameters for new campaigns – including governance, logging, and export.',
    de: 'In wenigen Klicks generieren Teams die passenden Tracking-Parameter für neue Kampagnen – inklusive Governance, Logging und Export.'
  },

  // Testimonials
  'ct.testimonials.title': {
    en: 'Experts Trust Us',
    de: 'Experten vertrauen uns'
  },
  'ct.testimonials.item1.quote': {
    en: 'With iCPT, we finally have our campaign parameters under control. The data quality in our reporting has improved massively – and setting up new campaigns now takes minutes instead of hours.',
    de: 'Mit iCPT haben wir unsere Kampagnen-Parameter endlich im Griff. Die Datenqualität in unserem Reporting hat sich massiv verbessert – und das Setup neuer Kampagnen geht jetzt in Minuten statt Stunden.'
  },
  'ct.testimonials.item1.role': {
    en: 'Marketing Lead',
    de: 'Marketing Lead'
  },
  'ct.testimonials.item1.company': {
    en: 'Freudenberg SE',
    de: 'Freudenberg SE'
  },
  'ct.testimonials.item2.quote': {
    en: 'Finally no more discussions about incorrect UTM parameters. iCPT has standardized our processes and saves us hours of manual work every week.',
    de: 'Endlich keine Diskussionen mehr über falsche UTM-Parameter. iCPT hat unsere Prozesse standardisiert und spart uns jede Woche Stunden an manueller Arbeit.'
  },
  'ct.testimonials.item2.role': {
    en: 'Digital Analytics Manager',
    de: 'Digital Analytics Manager'
  },
  'ct.testimonials.item2.company': {
    en: 'Eventim',
    de: 'Eventim'
  },
  'ct.testimonials.item3.quote': {
    en: 'The combination of automation and clear naming conventions has taken our attribution to a new level. Absolute recommendation for any performance team.',
    de: 'Die Kombination aus Automatisierung und klaren Namenskonventionen hat unsere Attribution auf ein neues Level gehoben. Absolute Empfehlung für jedes Performance-Team.'
  },
  'ct.testimonials.item3.role': {
    en: 'Head of Performance Marketing',
    de: 'Head of Performance Marketing'
  },
  'ct.testimonials.item3.company': {
    en: 'pepXpress',
    de: 'pepXpress'
  },

  // Features
  'ct.features.title': {
    en: 'Everything You Need for Clean Tracking',
    de: 'Alles, was Sie für sauberes Tracking brauchen'
  },
  'ct.features.item1.title': {
    en: 'Automated UTM Generation',
    de: 'Automatisierte UTM-Generierung'
  },
  'ct.features.item1.description': {
    en: 'Define your own naming conventions and parameter structures according to company standards.',
    de: 'Definieren Sie eigene Namenskonventionen und Parameter-Strukturen nach Unternehmensstandards.'
  },
  'ct.features.item2.title': {
    en: 'Parameter Templates & Governance Layer',
    de: 'Parameter Templates & Governance Layer'
  },
  'ct.features.item2.description': {
    en: 'Role-based access control and collaboration features for Marketing, Media and Analytics teams.',
    de: 'Rollenbasierte Zugriffskontrolle und Kollaborations-Features für Marketing, Media und Analytics Teams.'
  },
  'ct.features.item3.title': {
    en: 'Logging & Documentation',
    de: 'Logging & Dokumentation'
  },
  'ct.features.item3.description': {
    en: 'Intuitive interface for fast URL generation with validation and preview.',
    de: 'Intuitive Oberfläche für schnelle URL-Generierung mit Validierung und Vorschau.'
  },
  'ct.features.item4.title': {
    en: 'Multi-User Workflow',
    de: 'Multi-User Workflow'
  },
  'ct.features.item4.description': {
    en: 'Generate hundreds of campaign URLs at once via CSV import or API.',
    de: 'Generieren Sie hunderte Kampagnen-URLs auf einmal via CSV-Import oder API.'
  },
  'ct.features.item5.title': {
    en: 'Channel & Vendor Standardization',
    de: 'Channel & Vendor Standardisierung'
  },
  'ct.features.item5.description': {
    en: 'Native connection to GA4, Adobe Analytics and other analytics platforms.',
    de: 'Native Anbindung an GA4, Adobe Analytics und andere Analytics-Plattformen.'
  },
  'ct.features.item6.title': {
    en: 'Reusable Campaign Structures',
    de: 'Wiederverwendbare Kampagnenstrukturen'
  },
  'ct.features.item6.description': {
    en: 'Automated checks for naming conventions, duplicates and format requirements.',
    de: 'Automatische Prüfung auf Namenskonventionen, Duplikate und Formatvorgaben.'
  },
  'ct.features.item7.title': {
    en: 'Integration into Existing MarTech Stack Workflows',
    de: 'Integration in bestehende MarTech Stack-Workflows'
  },
  'ct.features.item7.description': {
    en: 'Integrated link shortener with custom domains and click tracking.',
    de: 'Integrierter Link-Shortener mit Custom Domains und Klick-Tracking.'
  },
  'ct.features.item8.title': {
    en: 'Export to Analytics & BI Tools',
    de: 'Export in Analytics & BI-Tools'
  },
  'ct.features.item8.description': {
    en: 'Complete history of all changes for compliance and quality assurance.',
    de: 'Vollständige Historie aller Änderungen für Compliance und Qualitätssicherung.'
  },

  // Use Cases
  'ct.useCases.title': {
    en: 'Who is iCPT Made For?',
    de: 'Für wen ist iCPT gemacht?'
  },
  'ct.useCases.description': {
    en: 'From small performance teams to large agencies – iCPT scales with your requirements.',
    de: 'Von kleinen Performance-Teams bis zu großen Agenturen – iCPT skaliert mit Ihren Anforderungen.'
  },
  'ct.useCases.card1.title': {
    en: 'Performance & Media Teams',
    de: 'Performance & Media Teams'
  },
  'ct.useCases.card1.description': {
    en: 'Clean tracking. Faster campaigns. Fewer errors.',
    de: 'Sauberes Tracking. Schnellere Kampagnen. Weniger Fehler.'
  },
  'ct.useCases.card2.title': {
    en: 'Marketing Ops & Analytics',
    de: 'Marketing Ops & Analytics'
  },
  'ct.useCases.card2.description': {
    en: 'Improved data quality for Reporting, Attribution & BI.',
    de: 'Verbesserte Datenqualität für Reporting, Attribution & BI.'
  },
  'ct.useCases.card3.title': {
    en: 'Media Agencies',
    de: 'Media Agencies'
  },
  'ct.useCases.card3.description': {
    en: 'Standardization across clients & brands – even at high volumes.',
    de: 'Standardisierung über Kunden & Brands hinweg – auch bei hohen Volumina.'
  },

  // Problem-Solution
  'ct.why.title': {
    en: 'Why Clean UTM Parameters Are Critical',
    de: 'Warum saubere UTM-Parameter entscheidend sind'
  },
  'ct.why.description': {
    en: 'Campaigns are getting increasingly complex. Touchpoints are multiplying. Without consistent tracking parameters, data gaps, reporting gaps, and inefficient workflows emerge – with direct impact on media spend and performance.',
    de: 'Kampagnen werden immer komplexer. Touchpoints vervielfachen sich. Ohne konsistente Tracking-Parameter entstehen Datenlücken, Reporting-Brüche und ineffiziente Workflows – mit direktem Impact auf Media Spend und Performance.'
  },
  'ct.why.problem.title': {
    en: 'Without Standards',
    de: 'Ohne Standards'
  },
  'ct.why.problem.item1': {
    en: 'Inconsistent campaign naming',
    de: 'Inkonsistente Kampagnenbezeichnungen'
  },
  'ct.why.problem.item2': {
    en: 'Typos in UTM parameters',
    de: 'Tippfehler in UTM-Parametern'
  },
  'ct.why.problem.item3': {
    en: 'Fragmented data in reporting',
    de: 'Fragmentierte Daten im Reporting'
  },
  'ct.why.problem.item4': {
    en: 'Inefficient manual processes',
    de: 'Ineffiziente manuelle Prozesse'
  },
  'ct.why.solution.title': {
    en: 'With iCPT',
    de: 'Mit iCPT'
  },
  'ct.why.solution.item1': {
    en: 'Standardized parameters across all channels',
    de: 'Standardisierte Parameter über alle Channels'
  },
  'ct.why.solution.item2': {
    en: 'Automatic validation & error prevention',
    de: 'Automatische Validierung & Fehlerprävention'
  },
  'ct.why.solution.item3': {
    en: 'Unified reporting & attribution',
    de: 'Einheitliches Reporting & Attribution'
  },
  'ct.why.solution.item4': {
    en: 'Efficient, scalable workflows',
    de: 'Effiziente, skalierbare Workflows'
  },

  // Why Now
  'ct.whyNow.title': {
    en: 'The Time for Clean Tracking is Now',
    de: 'Die Zeit für sauberes Tracking ist jetzt'
  },
  'ct.whyNow.driver1.title': {
    en: 'Third-Party Cookie End',
    de: 'Third-Party Cookie Ende'
  },
  'ct.whyNow.driver1.description': {
    en: 'Traditional tracking methods no longer work',
    de: 'Klassische Tracking-Methoden funktionieren nicht mehr'
  },
  'ct.whyNow.driver2.title': {
    en: 'First-Party Data',
    de: 'First-Party Daten'
  },
  'ct.whyNow.driver2.description': {
    en: 'Own data is becoming the most important asset',
    de: 'Eigene Daten werden zum wichtigsten Asset'
  },
  'ct.whyNow.driver3.title': {
    en: 'ROI Measurability',
    de: 'ROI Messbarkeit'
  },
  'ct.whyNow.driver3.description': {
    en: 'Clean data = better decisions',
    de: 'Saubere Daten = bessere Entscheidungen'
  },
  'ct.whyNow.keyMessage': {
    en: 'The loss of third-party data makes first-party data, zero-party data, and clean tracking structures essential. iCPT ensures that media spend delivers measurability and performance.',
    de: 'Der Verlust von Third-Party-Daten macht First-Party-Daten, Zero-Party-Daten und saubere Tracking-Strukturen essenziell. iCPT stellt sicher, dass Media-Spend Messbarkeit und Performance liefert.'
  },

  // Pricing
  'ct.pricing.title': {
    en: 'Pricing',
    de: 'Pricing'
  },
  'ct.pricing.description': {
    en: 'Our pricing is based exclusively on the number of parameter spaces you need. A parameter space includes individually definable default values that should be used when creating UTM parameters for campaigns, e.g. for a specific language region or domain.',
    de: 'Unser Pricing orientiert sich ausschließlich an der Anzahl der gewünschten Parameter-Räume. Ein Parameter-Raum umfasst individuell definierbare Vorgabewerte, die bei der Erstellung von UTM-Parametern für Kampagnen z.B. eines bestimmten Sprachraums oder einer bestimmten Domain verbindlich genutzt werden sollen.'
  },
  'ct.pricing.perMonth': {
    en: 'Month',
    de: 'Monat'
  },
  'ct.pricing.perUser': {
    en: 'per user',
    de: 'pro User'
  },
  'ct.pricing.yearly': {
    en: 'yearly billing',
    de: 'jährliche Abrechnung'
  },
  'ct.pricing.trialBadge': {
    en: '14 Day Free Trial',
    de: '14 Tage Free Trial'
  },
  'ct.pricing.tier1.name': {
    en: 'Basic',
    de: 'Basic'
  },
  'ct.pricing.tier1.rooms': {
    en: '1 Parameter Space',
    de: '1 Parameter-Raum'
  },
  'ct.pricing.tier1.price': {
    en: '35',
    de: '35'
  },
  'ct.pricing.tier2.name': {
    en: 'Advanced',
    de: 'Advanced'
  },
  'ct.pricing.tier2.rooms': {
    en: '2 to 4 Parameter Spaces per Space',
    de: '2 bis 4 Parameter-Räume je Raum'
  },
  'ct.pricing.tier2.price': {
    en: '30',
    de: '30'
  },
  'ct.pricing.tier2.badge': {
    en: 'Most Popular',
    de: 'Am beliebtesten'
  },
  'ct.pricing.tier3.name': {
    en: 'Premium',
    de: 'Premium'
  },
  'ct.pricing.tier3.rooms': {
    en: '5+ Parameter Spaces per Space',
    de: 'ab 5 Parameter-Räume je Raum'
  },
  'ct.pricing.tier3.price': {
    en: '25',
    de: '25'
  },
  'ct.pricing.cta': {
    en: 'Start Trial',
    de: 'Trial starten'
  },

  // Trial Modal
  'ct.trial.modal.title': {
    en: 'Start Your Free Trial',
    de: 'Starten Sie Ihren Trial'
  },
  'ct.trial.modal.subtitle': {
    en: 'Fill out the form and we\'ll get back to you shortly.',
    de: 'Füllen Sie das Formular aus und wir melden uns in Kürze bei Ihnen.'
  },
  'ct.trial.modal.name': {
    en: 'Name',
    de: 'Name'
  },
  'ct.trial.modal.email': {
    en: 'Email Address',
    de: 'E-Mail-Adresse'
  },
  'ct.trial.modal.company': {
    en: 'Company',
    de: 'Firma'
  },
  'ct.trial.modal.message': {
    en: 'Message',
    de: 'Nachricht'
  },
  'ct.trial.modal.optional': {
    en: 'optional',
    de: 'optional'
  },
  'ct.trial.modal.submit': {
    en: 'Submit Trial Request',
    de: 'Trial-Anfrage abschicken'
  },
  'ct.trial.modal.submitting': {
    en: 'Submitting...',
    de: 'Wird gesendet...'
  },
  'ct.trial.modal.success': {
    en: 'Thank you! We\'ll be in touch soon.',
    de: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.'
  },

  // Demo Modal
  'ct.demo.modal.title': {
    en: 'Request Your Demo',
    de: 'Fragen Sie Ihre Demo an'
  },
  'ct.demo.modal.subtitle': {
    en: 'Fill out the form and we\'ll schedule a personalized demo.',
    de: 'Füllen Sie das Formular aus und wir vereinbaren eine persönliche Demo.'
  },
  'ct.demo.modal.submit': {
    en: 'Submit Demo Request',
    de: 'Demo-Anfrage abschicken'
  },

  // FAQ
  'ct.faq.title': {
    en: 'Frequently Asked Questions',
    de: 'Häufig gestellte Fragen'
  },
  'ct.faq.item1.question': {
    en: 'Is the tool cloud-based?',
    de: 'Ist das Tool cloudbasiert?'
  },
  'ct.faq.item1.answer': {
    en: 'Yes. iCPT is a modern SaaS solution that runs entirely in the cloud. No local installation required – simply start in your browser.',
    de: 'Ja. iCPT ist eine moderne SaaS-Lösung, die vollständig in der Cloud läuft. Keine lokale Installation erforderlich – einfach im Browser starten.'
  },
  'ct.faq.item2.question': {
    en: 'Can I define my own parameter structures?',
    de: 'Kann ich eigene Parameterstrukturen definieren?'
  },
  'ct.faq.item2.answer': {
    en: 'Yes – fully configurable. You can create your own templates, naming conventions, and validation rules that fit your company structure.',
    de: 'Ja – komplett konfigurierbar. Sie können eigene Templates, Naming Conventions und Validierungsregeln erstellen, die zu Ihrer Unternehmensstruktur passen.'
  },
  'ct.faq.item3.question': {
    en: 'How does team collaboration work?',
    de: 'Wie funktioniert Team-Kollaboration?'
  },
  'ct.faq.item3.answer': {
    en: 'Roles, templates & workflows are fully integrated. Team members can work with different permissions, and all changes are logged.',
    de: 'Roles, Templates & Workflows sind vollständig integriert. Teammitglieder können mit unterschiedlichen Berechtigungen arbeiten, und alle Änderungen werden protokolliert.'
  },
  'ct.faq.item4.question': {
    en: 'How is billing handled?',
    de: 'Wie wird abgerechnet?'
  },
  'ct.faq.item4.answer': {
    en: 'Billing is per seat or per team – depending on the use case. Contact us for a customized offer that fits your requirements.',
    de: 'Die Abrechnung erfolgt pro Seat oder pro Team – je nach Use Case. Kontaktieren Sie uns für ein individuelles Angebot, das zu Ihren Anforderungen passt.'
  },
  'ct.faq.item5.question': {
    en: 'Is there integration with existing tools?',
    de: 'Gibt es eine Integration mit bestehenden Tools?'
  },
  'ct.faq.item5.answer': {
    en: 'Yes, iCPT integrates into existing MarTech stack workflows and offers export functions for common analytics and BI tools.',
    de: 'Ja, iCPT lässt sich in bestehende MarTech Stack-Workflows integrieren und bietet Export-Funktionen für gängige Analytics- und BI-Tools.'
  },

  // CTA Section
  'ct.cta.title': {
    en: 'Experience iCPT in a Live Demo',
    de: 'Erleben Sie iCPT in der Live-Demo'
  },
  'ct.cta.subtitle': {
    en: 'See how iCPT can bring order to your campaign tracking. Book a personalized demo.',
    de: 'Sehen Sie, wie iCPT Ordnung in Ihr Kampagnen-Tracking bringen kann. Buchen Sie eine persönliche Demo.'
  },
  'ct.cta.placeholder': {
    en: 'Your email address',
    de: 'Ihre E-Mail-Adresse'
  },
  'ct.cta.button': {
    en: 'Request Demo',
    de: 'Demo anfragen'
  },
  'ct.cta.success': {
    en: 'Thank you! We will contact you shortly.',
    de: 'Vielen Dank! Wir melden uns in Kürze bei Ihnen.'
  },
  'ct.cta.footer': {
    en: 'Or contact us directly at',
    de: 'Oder kontaktieren Sie uns direkt unter'
  },

  // Anchor Navigation
  'ct.anchor.intro': {
    en: 'Intro',
    de: 'Intro'
  },
  'ct.anchor.values': {
    en: 'Benefits',
    de: 'Mehrwerte'
  },
  'ct.anchor.demo': {
    en: 'Demo',
    de: 'Demo'
  },
  'ct.anchor.howItWorks': {
    en: 'How it works',
    de: "So funktioniert's"
  },
  'ct.anchor.features': {
    en: 'Features',
    de: 'Features'
  },
  'ct.anchor.pricing': {
    en: 'Pricing',
    de: 'Preise'
  },
  'ct.anchor.faq': {
    en: 'FAQ',
    de: 'FAQ'
  },
  'ct.anchor.contact': {
    en: 'Contact',
    de: 'Kontakt'
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