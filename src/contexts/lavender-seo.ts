import type { Language } from './LanguageContext';

/**
 * New copy of the redesigned pages for search and AI answers (SEO/GEO):
 * the explanatory sections, their FAQs and small labels such as "Zuletzt
 * aktualisiert". Kept apart from lavender-overrides.ts (changed wording of
 * existing keys) so both can be edited in parallel without conflicts.
 *
 * Only consulted inside <LanguageProvider variant="lavender">, after the
 * overrides. Every key needs both languages.
 *
 * Format of the explanatory blocks (`.body`, FAQ answers): see
 * src/design-system/RichText.tsx — blank line between blocks, "- " lists,
 * "1. " numbered lists, "|" tables, **bold**, [label](/route/) links.
 * Orientation: Google top results for five search terms per page
 * (13.11.2026); the text is our own. When facts change, update the text and
 * the page's date in src/lib/page-dates.ts.
 *
 * Go-live: fold these values into `translations` and delete this file.
 */
export const lavenderSeo: Record<string, Record<Language, string>> = {
  // --- Shared ---
  'lavender.common.updated': { de: 'Zuletzt aktualisiert', en: 'Last updated' },

  // ======================================================================
  // Home: KI-Beratung Hamburg · KI-Lösungen und KI-Agenten entwickeln ·
  // KI-Workshops / AI Enablement · Web-Analytics-Beratung · Data & AI Consulting
  // ======================================================================
  'lavender.seo.home.title': {
    de: `Was macht iCompetence?`,
    en: `What does iCompetence do?`,
  },
  'lavender.seo.home.answer': {
    de: `iCompetence ist eine Beratung für Daten und KI aus Hamburg. Wir sorgen dafür, dass Unternehmen ihre Daten sauber erfassen und auswerten, und bauen darauf KI-Lösungen, die im Alltag funktionieren.`,
    en: `iCompetence is a data and AI consultancy based in Hamburg. We help companies collect and analyze their data properly and build AI solutions on top of it that hold up in daily work.`,
  },
  'lavender.seo.home.lead': {
    de: `Dazu gehören Datenstrategie, Web-Analytics mit Google Analytics und Adobe Analytics, Dashboards für das Management, die Entwicklung von KI-Agenten und Workshops, in denen Teams den Umgang mit KI lernen. Wir arbeiten remote oder bei dir vor Ort in Hamburg.`,
    en: `That covers data strategy, web analytics with Google Analytics and Adobe Analytics, management dashboards, building AI agents, and workshops in which teams learn to work with AI. We work remotely or on site in Hamburg.`,
  },
  'lavender.seo.home.b1.title': { de: `Leistungen im Überblick`, en: `Our services at a glance` },
  'lavender.seo.home.b1.body': {
    de: `- Datenstrategie: Quellen bewerten, Einsatzfälle priorisieren und festlegen, welche Daten wofür gebraucht werden.
- Web-Analytics: Google Analytics 4 und Adobe Analytics einrichten, Migrationen begleiten, etwa auf Google Analytics 360, und Kampagnen sauber messen.
- Dashboards und Reporting: Kennzahlen, die Management und Fachbereiche ohne Erklärung lesen können.
- KI-Lösungen und KI-Agenten: vom ersten Prototyp bis zum Betrieb, mit dem Sprachmodell, das zu Aufgabe und Datenschutz passt.
- AI Enablement: [KI-Workshops](/ai-workshop/), Trainings und Executive Briefings, damit dein Team KI selbst bewerten und einsetzen kann.
- Eigene Produkte: zum Beispiel der [EmpCo Audit](/empco-audit/), die Wissensplattform [iKnow](/iknow/) und der [Analytics Agent](/analytics-agent/).`,
    en: `- Data strategy: assess sources, prioritize use cases and decide which data is needed for what.
- Web analytics: set up Google Analytics 4 and Adobe Analytics, support migrations such as the move to Google Analytics 360, and measure campaigns cleanly.
- Dashboards and reporting: metrics that management and business teams can read without a walkthrough.
- AI solutions and AI agents: from the first prototype to production, with the language model that fits the task and your data protection needs.
- AI enablement: [AI workshops](/ai-workshop/), trainings and executive briefings, so your team can assess and use AI on its own.
- Our own products, for example the [EmpCo Audit](/empco-audit/), the knowledge platform [iKnow](/iknow/) and the [Analytics Agent](/analytics-agent/).`,
  },
  'lavender.seo.home.b2.title': { de: `Wann passt welcher Ansatz?`, en: `Which approach fits when?` },
  'lavender.seo.home.b2.body': {
    de: `Nicht jede Aufgabe braucht einen KI-Agenten. Diese Übersicht hilft bei der ersten Einordnung:

| Ausgangslage | Was meist sinnvoll ist |
| Du weißt noch nicht, wo KI deinem Team hilft | KI-Workshop oder Executive Briefing |
| Ein Ablauf wiederholt sich und folgt festen Regeln | Klassische Automatisierung, oft ganz ohne KI |
| Eine Aufgabe braucht Urteilsvermögen, mehrere Werkzeuge und eure eigenen Daten | KI-Agent mit klaren Grenzen und menschlicher Freigabe |
| Die Daten sind verstreut oder widersprüchlich | Erst Datenstrategie und Analytics, dann KI |`,
    en: `Not every task needs an AI agent. This overview helps with a first assessment:

| Starting point | What usually makes sense |
| You don't know yet where AI helps your team | AI workshop or executive briefing |
| A process repeats and follows fixed rules | Classic automation, often without any AI |
| A task needs judgment, several tools and your own data | AI agent with clear limits and human approval |
| Your data is scattered or contradictory | Data strategy and analytics first, then AI |`,
  },
  'lavender.seo.home.b3.title': { de: `So läuft ein Projekt ab`, en: `How a project runs` },
  'lavender.seo.home.b3.body': {
    de: `1. Ideation-Workshop: Wir klären Ziel, Rahmenbedingungen und Daten und einigen uns auf einen Einsatzfall.
2. Proof of Concept: Ein Prototyp mit deinen echten Daten zeigt innerhalb weniger Wochen, ob die Idee trägt.
3. Rollout: Wir bringen das System in den Betrieb, binden es an deine Systeme an und übergeben es mit Dokumentation an dein Team.

Ein KI-Agent ist nur so gut wie die Daten, auf die er zugreift. Deshalb beginnen viele Projekte bei der Messung: Was wird erfasst, wo liegen die Daten, wer darf sie nutzen? Wenn sensible Daten im Spiel sind, läuft die KI in deiner eigenen Infrastruktur, so wie wir es unter [Privacy-led AI](/privacy-led-ai/) beschreiben.`,
    en: `1. Ideation workshop: we clarify the goal, constraints and data and agree on a use case.
2. Proof of concept: a prototype built on your real data shows within a few weeks whether the idea works.
3. Rollout: we take the system into production, connect it to your systems and hand it over to your team with documentation.

An AI agent is only as good as the data it can access. That is why many projects start with measurement: what is being tracked, where does the data live, and who may use it? When sensitive data is involved, the AI runs in your own infrastructure, as we describe under [Privacy-led AI](/privacy-led-ai/).`,
  },
  'lavender.seo.home.faqTitle': {
    de: `Häufige Fragen zu iCompetence`,
    en: `Frequently asked questions about iCompetence`,
  },
  'lavender.seo.home.faq.q1': { de: `Wo sitzt iCompetence?`, en: `Where is iCompetence based?` },
  'lavender.seo.home.faq.a1': {
    de: `In Hamburg, in der Weidenallee 10c. Wir arbeiten remote oder persönlich bei dir vor Ort in Hamburg.`,
    en: `In Hamburg, at Weidenallee 10c. We work remotely or in person on site in Hamburg.`,
  },
  'lavender.seo.home.faq.q2': {
    de: `Was ist der Unterschied zwischen einem KI-Agenten und einem Chatbot?`,
    en: `What is the difference between an AI agent and a chatbot?`,
  },
  'lavender.seo.home.faq.a2': {
    de: `Ein Chatbot beantwortet Fragen im Gespräch. Ein KI-Agent erledigt Aufgaben: Er plant mehrere Schritte, nutzt dafür Werkzeuge und Datenquellen und liefert ein Ergebnis, etwa einen Bericht oder einen vorbereiteten Vorgang. Bei unseren Agenten gibt am Ende ein Mensch frei.`,
    en: `A chatbot answers questions in a conversation. An AI agent gets tasks done: it plans several steps, uses tools and data sources along the way and delivers a result, such as a report or a prepared transaction. With our agents, a person signs off at the end.`,
  },
  'lavender.seo.home.faq.q3': {
    de: `Brauche ich eine Datenstrategie, bevor ich KI einsetze?`,
    en: `Do I need a data strategy before using AI?`,
  },
  'lavender.seo.home.faq.a3': {
    de: `Ein dickes Strategiepapier muss es nicht sein. Du solltest aber wissen, welche Daten ein Einsatzfall braucht, wo sie liegen und wie verlässlich sie sind. Ohne diese Klärung scheitern viele KI-Projekte an der Datenlage.`,
    en: `It doesn't have to be a thick strategy document. But you should know which data a use case needs, where it lives and how reliable it is. Without that, many AI projects fail because of the data.`,
  },
  'lavender.seo.home.faq.q4': {
    de: `Hilft iCompetence auch bei Google Analytics und Adobe Analytics?`,
    en: `Does iCompetence also help with Google Analytics and Adobe Analytics?`,
  },
  'lavender.seo.home.faq.a4': {
    de: `Ja. Wir richten Google Analytics 4 und Adobe Analytics ein, begleiten Migrationen, etwa auf Google Analytics 360, und bauen Reports und Dashboards darauf auf. Für einheitliche Kampagnenparameter gibt es unser [Campaign Parameter Tool](/campaign-parameter-tool/).`,
    en: `Yes. We set up Google Analytics 4 and Adobe Analytics, support migrations such as the move to Google Analytics 360, and build reports and dashboards on top. For consistent campaign parameters there is our [Campaign Parameter Tool](/campaign-parameter-tool/).`,
  },
  'lavender.seo.home.faq.q5': {
    de: `Wie lange dauert ein KI-Projekt?`,
    en: `How long does an AI project take?`,
  },
  'lavender.seo.home.faq.a5': {
    de: `Den Proof of Concept planen wir auf wenige Wochen. Wie lange der Rollout dauert, hängt davon ab, wie viele Systeme angebunden werden und wer das System später betreibt. Das klären wir im Ideation-Workshop.`,
    en: `We plan the proof of concept for a few weeks. How long the rollout takes depends on how many systems need connecting and who will run the system later. We work that out in the ideation workshop.`,
  },

  // ======================================================================
  // iKnow: KI-Wissensmanagement · Wissensdatenbank mit KI · KI lokal ohne
  // Cloud · Unternehmenswissen sichern · Wissensmanagement Software
  // ======================================================================
  'lavender.seo.iknow.title': { de: `Was ist KI-Wissensmanagement?`, en: `What is AI knowledge management?` },
  'lavender.seo.iknow.answer': {
    de: `Beim KI-Wissensmanagement führt eine KI das Wissen eines Unternehmens aus Dokumenten, E-Mails, Chats und Gesprächen zusammen, ordnet es und findet es auf eine Frage hin wieder.`,
    en: `In AI knowledge management, an AI brings together a company's knowledge from documents, emails, chats and conversations, organizes it and retrieves it when someone asks.`,
  },
  'lavender.seo.iknow.lead': {
    de: `Wer etwas sucht, fragt in normaler Sprache und bekommt eine Antwort aus den eigenen Unterlagen, statt Ordner und Postfächer zu durchsuchen. iKnow arbeitet dabei lokal: Die Software läuft im Unternehmen, und die Daten gehen nicht an öffentliche KI-Dienste.`,
    en: `Anyone looking for something asks in plain language and gets an answer from the company's own material instead of digging through folders and inboxes. iKnow does this locally: the software runs inside the company, and no data goes to public AI services.`,
  },
  'lavender.seo.iknow.b1.title': {
    de: `So funktioniert eine Wissensdatenbank mit KI`,
    en: `How an AI knowledge base works`,
  },
  'lavender.seo.iknow.b1.body': {
    de: `1. Quellen anbinden: Dokumente, E-Mails und Chats werden eingelesen, zum Beispiel aus Microsoft 365, Google Workspace oder Slack.
2. Ordnen: Die KI bereinigt und vereinheitlicht die Inhalte und legt sie strukturiert ab.
3. Wiederfinden: Bei einer Frage sucht das System die passenden Stellen heraus und formuliert daraus die Antwort. Dieses Verfahren heißt Retrieval-Augmented Generation, kurz RAG.
4. Aktuell halten: Neue Inhalte kommen laufend dazu, auf Wunsch auch Mitschriften aus Meetings und Workshops.`,
    en: `1. Connect sources: documents, emails and chats are read in, for example from Microsoft 365, Google Workspace or Slack.
2. Organize: the AI cleans up and standardizes the content and stores it in a structured way.
3. Retrieve: when someone asks, the system finds the relevant passages and writes the answer from them. This method is called retrieval-augmented generation, or RAG.
4. Keep it current: new content is added continuously, including meeting and workshop transcripts if you want.`,
  },
  'lavender.seo.iknow.b2.title': {
    de: `Lokale KI oder Cloud-Dienst?`,
    en: `Local AI or a cloud service?`,
  },
  'lavender.seo.iknow.b2.body': {
    de: `| | Lokal im Unternehmen | Öffentlicher Cloud-Dienst |
| Wo die Daten verarbeitet werden | Auf eigenen Rechnern | Auf Servern des Anbieters |
| Wer die Daten sieht | Nur ihr | Der Anbieter als Auftragsverarbeiter |
| Einstieg | Installation und passende Hardware nötig | Sofort nutzbar |
| Geeignet für | Vertrauliches Wissen, Personal- und Kundendaten | Öffentliche oder unkritische Inhalte |

Für Wissen, das das Unternehmen nicht verlassen soll, ist der lokale Betrieb die naheliegende Wahl. Warum wir KI grundsätzlich zu den Daten bringen, steht unter [Privacy-led AI](/privacy-led-ai/).`,
    en: `| | Local, inside the company | Public cloud service |
| Where data is processed | On your own machines | On the provider's servers |
| Who sees the data | Only you | The provider, as a data processor |
| Getting started | Needs installation and suitable hardware | Ready to use right away |
| Suited for | Confidential knowledge, HR and customer data | Public or non-critical content |

For knowledge that should not leave the company, running locally is the obvious choice. Why we generally bring AI to the data is explained under [Privacy-led AI](/privacy-led-ai/).`,
  },
  'lavender.seo.iknow.b3.title': {
    de: `Warum Unternehmenswissen verloren geht`,
    en: `Why company knowledge gets lost`,
  },
  'lavender.seo.iknow.b3.body': {
    de: `Viel Wissen steckt in den Köpfen erfahrener Mitarbeitender und in Postfächern, die außer ihnen niemand kennt. Wenn diese Menschen das Unternehmen verlassen oder in Rente gehen, ist es weg. In den kommenden Jahren erreichen die geburtenstarken Jahrgänge das Rentenalter, das Problem wird also größer.

Eine Wissensbasis, die im Arbeitsalltag mitläuft, sichert dieses Wissen, bevor jemand geht. Sie ist außerdem die Grundlage für KI-Agenten: Ohne verlässliches Firmenwissen raten Agenten, mit ihm können sie Aufgaben übernehmen.`,
    en: `A lot of knowledge sits in the heads of experienced employees and in inboxes nobody else knows. When these people leave or retire, it is gone. The baby boomer generation is reaching retirement age over the coming years, so the problem is growing.

A knowledge base that runs alongside daily work secures this knowledge before anyone leaves. It is also the foundation for AI agents: without reliable company knowledge, agents guess; with it, they can take on tasks.`,
  },
  'lavender.seo.iknow.faqTitle': {
    de: `Häufige Fragen zu KI-Wissensmanagement`,
    en: `Frequently asked questions about AI knowledge management`,
  },
  'lavender.seo.iknow.faq.q1': {
    de: `Was ist der Unterschied zwischen einer klassischen Wissensdatenbank und KI-Wissensmanagement?`,
    en: `What is the difference between a classic knowledge base and AI knowledge management?`,
  },
  'lavender.seo.iknow.faq.a1': {
    de: `Eine klassische Wissensdatenbank muss jemand pflegen: Artikel schreiben, verschlagworten, aktuell halten. Beim KI-Wissensmanagement übernimmt die KI das Einsammeln und Ordnen, und Inhalte findet man über Fragen in normaler Sprache statt über Stichworte.`,
    en: `Someone has to maintain a classic knowledge base: write articles, tag them, keep them current. In AI knowledge management, the AI does the collecting and organizing, and you find content by asking questions in plain language instead of searching for keywords.`,
  },
  'lavender.seo.iknow.faq.q2': {
    de: `Kann man KI im Unternehmen nutzen, ohne dass Daten in die Cloud gehen?`,
    en: `Can a company use AI without sending data to the cloud?`,
  },
  'lavender.seo.iknow.faq.a2': {
    de: `Ja. Sprachmodelle lassen sich lokal auf eigenen Rechnern oder Servern betreiben. iKnow arbeitet so: Es läuft als Desktop-Software im Unternehmen, alle Daten bleiben lokal, und es nutzt keine öffentlichen KI-APIs.`,
    en: `Yes. Language models can run locally on your own computers or servers. iKnow works this way: it runs as desktop software inside the company, all data stays local, and it uses no public AI APIs.`,
  },
  'lavender.seo.iknow.faq.q3': { de: `Was ist RAG?`, en: `What is RAG?` },
  'lavender.seo.iknow.faq.a3': {
    de: `Retrieval-Augmented Generation ist ein Verfahren, bei dem ein Sprachmodell vor der Antwort passende Textstellen aus den eigenen Dokumenten heraussucht und seine Antwort darauf stützt. Das Modell muss dafür nicht neu trainiert werden, neue Dokumente sind sofort nutzbar. Fehler schließt RAG nicht ganz aus, die Antworten lassen sich aber an den Quellen prüfen.`,
    en: `Retrieval-augmented generation is a method in which a language model first looks up relevant passages in your own documents and bases its answer on them. The model doesn't need retraining, and new documents can be used right away. RAG doesn't rule out errors completely, but the answers can be checked against the sources.`,
  },
  'lavender.seo.iknow.faq.q4': {
    de: `Welche Quellen kann iKnow einbinden?`,
    en: `Which sources can iKnow connect to?`,
  },
  'lavender.seo.iknow.faq.a4': {
    de: `iKnow verbindet sich per API mit Werkzeugen wie Microsoft 365, Google Workspace oder Slack und erfasst E-Mails, Chats und Dokumente. Auf Wunsch transkribiert es auch Meetings und Workshops.`,
    en: `iKnow connects via API to tools such as Microsoft 365, Google Workspace or Slack and captures emails, chats and documents. If you want, it also transcribes meetings and workshops.`,
  },
  'lavender.seo.iknow.faq.q5': {
    de: `Wie verhindert man Wissensverlust, wenn Mitarbeitende gehen?`,
    en: `How do you prevent knowledge loss when employees leave?`,
  },
  'lavender.seo.iknow.faq.a5': {
    de: `Am besten, indem Wissen schon im Alltag festgehalten wird und nicht erst in der Übergabewoche. Eine Wissensbasis, die E-Mails, Dokumente und auf Wunsch Gespräche laufend erfasst, macht das ohne zusätzlichen Aufwand für das Team.`,
    en: `Ideally by capturing knowledge during everyday work rather than in the handover week. A knowledge base that continuously picks up emails, documents and, if you want, conversations does this without extra work for the team.`,
  },

  // ======================================================================
  // Analytics Agent: KI-Datenanalyse · Daten in natürlicher Sprache abfragen ·
  // Google Analytics 4 KI · KI-Agent für Daten · Self-Service Analytics
  // ======================================================================
  'lavender.seo.analytics.title': {
    de: `Wie funktioniert KI-Datenanalyse in natürlicher Sprache?`,
    en: `How does AI data analysis in natural language work?`,
  },
  'lavender.seo.analytics.answer': {
    de: `Du stellst eine Frage wie im Gespräch, und ein KI-Agent übersetzt sie in eine Abfrage an deine Datenquelle, führt sie aus und zeigt das Ergebnis als Zahl, Tabelle oder Grafik.`,
    en: `You ask a question as you would in a conversation, and an AI agent translates it into a query against your data source, runs it and shows the result as a number, table or chart.`,
  },
  'lavender.seo.analytics.lead': {
    de: `Du brauchst dafür weder SQL noch ein fertig eingerichtetes Dashboard. Der Analytics Agent macht das mit Google Analytics 4 und mit weiteren Quellen wie CRM-Systemen, Datenbanken und Tabellen.`,
    en: `You need neither SQL nor a ready-made dashboard. The Analytics Agent does this with Google Analytics 4 and with other sources such as CRM systems, databases and spreadsheets.`,
  },
  'lavender.seo.analytics.b1.title': { de: `Vom Satz zur Auswertung`, en: `From a sentence to an analysis` },
  'lavender.seo.analytics.b1.body': {
    de: `1. Frage: zum Beispiel „Welche Landingpages hatten im Oktober die meisten Conversions?“
2. Übersetzung: Der Agent erkennt Kennzahl, Zeitraum und Filter und baut daraus eine Abfrage, bei GA4 über die API, bei einer Datenbank als SQL.
3. Ausführung: Die Abfrage läuft gegen deine echten Daten.
4. Antwort: Das Ergebnis kommt als Text, Tabelle oder Diagramm, und du kannst direkt nachfragen.`,
    en: `1. Question: for example, "Which landing pages had the most conversions in October?"
2. Translation: the agent identifies the metric, time range and filters and builds a query from them, via the API for GA4 or as SQL for a database.
3. Execution: the query runs against your real data.
4. Answer: the result comes back as text, a table or a chart, and you can ask follow-up questions right away.`,
  },
  'lavender.seo.analytics.b2.title': {
    de: `Worauf es bei KI-Datenanalyse ankommt`,
    en: `What matters in AI data analysis`,
  },
  'lavender.seo.analytics.b2.body': {
    de: `Ein Sprachmodell kennt deine Zahlen nicht. Wenn es nicht weiß, was bei euch als Conversion zählt oder welche Tabelle die gültigen Umsätze enthält, rechnet es im Zweifel falsch und klingt trotzdem sicher. Diese Punkte machen die Antworten verlässlicher:

- Kontext: eine Wissensbasis, die Kennzahlen, Begriffe und Geschäftslogik beschreibt. Der Analytics Agent arbeitet mit einer solchen Wissensbasis.
- Begrenzte Rechte: Der Agent greift nur auf die Daten zu, die er für die Frage braucht.
- Abgleich: Zahlen, auf die es ankommt, gelegentlich mit dem Standardbericht vergleichen.`,
    en: `A language model doesn't know your numbers. If it doesn't know what counts as a conversion for you or which table holds the valid revenue, it may calculate wrongly and still sound confident. These points make the answers more reliable:

- Context: a knowledge base that describes your metrics, terms and business logic. The Analytics Agent works with such a knowledge base.
- Limited permissions: the agent only accesses the data it needs for the question.
- Cross-checks: compare figures that matter with the standard report from time to time.`,
  },
  'lavender.seo.analytics.b3.title': {
    de: `KI-Agent, KI-Chat oder BI-Dashboard?`,
    en: `AI agent, AI chat or BI dashboard?`,
  },
  'lavender.seo.analytics.b3.body': {
    de: `| | BI-Dashboard | KI-Chat ohne Datenanbindung | KI-Agent mit Datenanbindung |
| Woher die Zahlen kommen | Aus vorab gebauten Berichten | Aus dem, was du hineinkopierst | Direkt aus deinen Datenquellen |
| Neue Fragen | Brauchen einen neuen Bericht | Möglich, aber ohne deine echten Daten | Jederzeit in natürlicher Sprache |
| Wer damit arbeitet | Wer das Dashboard kennt | Alle | Alle im Team |

GA4 hat eigene KI-Funktionen wie automatische Insights, die aber nur mit den Daten der jeweiligen Property arbeiten. Der Analytics Agent fragt GA4 über die API ab und kann daneben weitere Quellen ansprechen. Für saubere Kampagnendaten in GA4 sorgt das [Campaign Parameter Tool](/campaign-parameter-tool/).`,
    en: `| | BI dashboard | AI chat without data access | AI agent with data access |
| Where the numbers come from | Prebuilt reports | Whatever you paste in | Directly from your data sources |
| New questions | Need a new report | Possible, but without your real data | Any time, in natural language |
| Who uses it | Whoever knows the dashboard | Anyone | Everyone on the team |

GA4 has its own AI features such as automated insights, but they only work with the data of the property in question. The Analytics Agent queries GA4 via the API and can address other sources alongside it. The [Campaign Parameter Tool](/campaign-parameter-tool/) keeps your campaign data in GA4 clean.`,
  },
  'lavender.seo.analytics.faqTitle': {
    de: `Häufige Fragen zur KI-Datenanalyse`,
    en: `Frequently asked questions about AI data analysis`,
  },
  'lavender.seo.analytics.faq.q1': {
    de: `Kann ich Google Analytics 4 per Chat abfragen?`,
    en: `Can I query Google Analytics 4 in a chat?`,
  },
  'lavender.seo.analytics.faq.a1': {
    de: `Ja. Der Analytics Agent verbindet sich direkt mit der GA4-API. Du fragst zum Beispiel nach Traffic, Nutzerverhalten oder Conversions und bekommst die Antwort mit einer passenden Grafik.`,
    en: `Yes. The Analytics Agent connects directly to the GA4 API. You ask about traffic, user behavior or conversions, for example, and get the answer with a matching chart.`,
  },
  'lavender.seo.analytics.faq.q2': {
    de: `Brauche ich SQL-Kenntnisse für KI-Datenanalyse?`,
    en: `Do I need SQL skills for AI data analysis?`,
  },
  'lavender.seo.analytics.faq.a2': {
    de: `Nein. Du stellst die Frage so, wie du sie einer Kollegin stellen würdest. Die Abfrage baut der Agent.`,
    en: `No. You ask the question the way you would ask a colleague. The agent builds the query.`,
  },
  'lavender.seo.analytics.faq.q3': {
    de: `Kann sich die KI bei Zahlen irren?`,
    en: `Can the AI get numbers wrong?`,
  },
  'lavender.seo.analytics.faq.a3': {
    de: `Ja, Sprachmodelle können falsche Antworten überzeugend formulieren. Deshalb arbeitet der Analytics Agent mit einer Wissensbasis, die deine Kennzahlen und Begriffe erklärt. Bei wichtigen Entscheidungen lohnt trotzdem ein Abgleich mit dem Standardbericht.`,
    en: `Yes, language models can state wrong answers convincingly. That is why the Analytics Agent works with a knowledge base that explains your metrics and terms. For important decisions, a cross-check with the standard report is still worth it.`,
  },
  'lavender.seo.analytics.faq.q4': {
    de: `Welche Datenquellen kann der Analytics Agent anbinden?`,
    en: `Which data sources can the Analytics Agent connect to?`,
  },
  'lavender.seo.analytics.faq.a4': {
    de: `Google Analytics 4, Datenbanken, CRM-Systeme, Spreadsheets, APIs und Data Warehouses. Auch eigene Lösungen lassen sich anbinden.`,
    en: `Google Analytics 4, databases, CRM systems, spreadsheets, APIs and data warehouses. Custom solutions can be connected too.`,
  },
  'lavender.seo.analytics.faq.q5': {
    de: `Ersetzt ein KI-Agent das BI-Tool?`,
    en: `Does an AI agent replace the BI tool?`,
  },
  'lavender.seo.analytics.faq.a5': {
    de: `Meist nicht. Dashboards bleiben gut für Kennzahlen, die jeden Tag gleich gebraucht werden. Der Agent hilft bei den Fragen, für die es noch keinen Bericht gibt.`,
    en: `Usually not. Dashboards remain useful for metrics that are needed the same way every day. The agent helps with the questions no report covers yet.`,
  },

  // ======================================================================
  // ICU: User Journey Analyse · Customer Journey Analyse Tool ·
  // Conversion-Pfade analysieren · Customer Journey Tracking
  // (no "Zero-Party-Data" here: the term means data people declare
  // themselves, journeys are observed behaviour — see the PR notes)
  // ======================================================================
  'lavender.seo.icu.title': { de: `Was ist eine User-Journey-Analyse?`, en: `What is user journey analysis?` },
  'lavender.seo.icu.answer': {
    de: `Eine User-Journey-Analyse zeigt, welche Wege Nutzerinnen und Nutzer tatsächlich durch eine Website oder ein Produkt nehmen, vom Einstieg über Umwege und Abbrüche bis zur Conversion.`,
    en: `User journey analysis shows which paths users actually take through a website or product, from the entry point through detours and drop-offs to the conversion.`,
  },
  'lavender.seo.icu.lead': {
    de: `Grundlage sind die Ereignisse, die ein Tracking erfasst. ICU setzt diese Ereignisse automatisch zu vollständigen Journeys zusammen und zeigt sie als Karte, die du erkunden kannst.`,
    en: `It is based on the events your tracking records. ICU automatically assembles these events into complete journeys and shows them as a map you can explore.`,
  },
  'lavender.seo.icu.b1.title': {
    de: `Journey Map oder Journey-Analyse?`,
    en: `Journey map or journey analysis?`,
  },
  'lavender.seo.icu.b1.body': {
    de: `Die beiden Begriffe werden oft verwechselt. Eine Customer Journey Map entsteht im Workshop, eine Journey-Analyse aus Daten.

| | Customer Journey Map | User-Journey-Analyse |
| Grundlage | Annahmen aus Workshops und Interviews | Gemessenes Verhalten aus Tracking-Daten |
| Zeigt | Wie die Reise aussehen soll | Wie sie tatsächlich verläuft |
| Typische Frage | Welche Touchpoints planen wir? | Wo brechen Nutzer ab? |
| Aktualität | Stand des Workshops | Laufend aus neuen Daten |`,
    en: `The two terms are often mixed up. A customer journey map comes out of a workshop, a journey analysis comes out of data.

| | Customer journey map | User journey analysis |
| Based on | Assumptions from workshops and interviews | Measured behavior from tracking data |
| Shows | How the journey should look | How it actually unfolds |
| Typical question | Which touchpoints do we plan? | Where do users drop off? |
| How current | As of the workshop | Continuously, from new data |`,
  },
  'lavender.seo.icu.b2.title': {
    de: `Was du aus Journey-Daten ablesen kannst`,
    en: `What journey data tells you`,
  },
  'lavender.seo.icu.b2.body': {
    de: `- Abbruchstellen: an welchem Schritt die meisten aussteigen.
- Schleifen: wo Nutzer mehrfach zwischen denselben Seiten wechseln, weil sie etwas nicht finden.
- Umwege, die funktionieren: Pfade, die anders verlaufen als geplant und trotzdem zur Conversion führen.
- Unterschiede zwischen Gruppen: zum Beispiel zwischen neuen und wiederkehrenden Nutzern.`,
    en: `- Drop-off points: the step at which most people leave.
- Loops: where users switch back and forth between the same pages because they can't find something.
- Detours that work: paths that differ from the plan and still lead to a conversion.
- Differences between groups: for example between new and returning users.`,
  },
  'lavender.seo.icu.b3.title': {
    de: `Conversion-Pfade in GA4 und ihre Grenzen`,
    en: `Conversion paths in GA4 and their limits`,
  },
  'lavender.seo.icu.b3.body': {
    de: `Google Analytics 4 bietet in den explorativen Datenanalysen eine Pfadanalyse. Dort baust du Pfade Schritt für Schritt selbst auf, wählst Start- oder Endpunkt und entscheidest, welche Ereignisse du siehst. Das braucht Übung, und bei großen Datenmengen arbeiten die Explorationen mit Stichproben. ICU rekonstruiert die Pfade automatisch aus dem vollständigen Datensatz, und du kannst Fragen auch in natürlicher Sprache stellen.

Für alle Journey-Daten gilt in Deutschland § 25 TDDDG (bis Mai 2024 TTDSG): Für Zugriffe auf das Endgerät, die nicht technisch notwendig sind, etwa durch Analyse-Cookies, braucht es eine Einwilligung. Eine Journey-Analyse ist deshalb nur so vollständig wie das Tracking, dem Nutzer zugestimmt haben. ICU arbeitet mit Verhaltenssignalen und braucht keine unnötigen personenbezogenen Daten.`,
    en: `Google Analytics 4 offers a path exploration in its explorations. There you build paths step by step yourself, choose a start or end point and decide which events you see. That takes practice, and with large data volumes the explorations are sampled. ICU reconstructs the paths automatically from the full data set, and you can also ask questions in natural language.

In Germany, all journey data falls under Section 25 TDDDG (called TTDSG until May 2024): access to the user's device that isn't technically necessary, for example through analytics cookies, requires consent. A journey analysis is therefore only as complete as the tracking users have agreed to. ICU works with behavioral signals and needs no unnecessary personal data.`,
  },
  'lavender.seo.icu.faq.q1': {
    de: `Wie sehe ich, welche Pfade zu einer Conversion führen?`,
    en: `How can I see which paths lead to a conversion?`,
  },
  'lavender.seo.icu.faq.a1': {
    de: `In GA4 gibt es dafür die Pfadanalyse in den explorativen Datenanalysen und die Attributionsberichte. Beide musst du selbst konfigurieren und lesen können. ICU zeigt die Pfade zur Conversion automatisch und macht sichtbar, wo Nutzer abbrechen.`,
    en: `In GA4 you have the path exploration and the attribution reports. You need to configure and read both yourself. ICU shows the paths to conversion automatically and makes visible where users drop off.`,
  },
  'lavender.seo.icu.faq.q2': {
    de: `Was ist der Unterschied zwischen einer Customer Journey Map und einer Journey-Analyse?`,
    en: `What is the difference between a customer journey map and a journey analysis?`,
  },
  'lavender.seo.icu.faq.a2': {
    de: `Eine Customer Journey Map beschreibt, wie die Reise der Kundschaft aussehen soll, und entsteht aus Annahmen im Workshop. Eine Journey-Analyse zeigt aus Tracking-Daten, wie Nutzer sich tatsächlich verhalten.`,
    en: `A customer journey map describes how the customer journey should look and is based on assumptions made in a workshop. A journey analysis uses tracking data to show how users actually behave.`,
  },
  'lavender.seo.icu.faq.q3': {
    de: `Brauche ich für Customer Journey Tracking eine Einwilligung?`,
    en: `Do I need consent for customer journey tracking?`,
  },
  'lavender.seo.icu.faq.a3': {
    de: `Für Analyse-Cookies und vergleichbare Zugriffe auf das Endgerät in der Regel ja, nach § 25 TDDDG. Ausgenommen sind nur Zugriffe, die technisch unbedingt notwendig sind. Wie dein Setup konkret einzuordnen ist, klärst du am besten mit deiner oder deinem Datenschutzbeauftragten.`,
    en: `For analytics cookies and similar access to the user's device, usually yes, under Section 25 TDDDG. Only access that is strictly technically necessary is exempt. How your setup should be classified is best clarified with your data protection officer.`,
  },

  // ======================================================================
  // Intelligentic Search: KI-Produktsuche Onlineshop · semantische Suche
  // E-Commerce · Bildsuche im Shop · Onsite-Suche verbessern · Vektorsuche
  // ======================================================================
  'lavender.seo.search.title': { de: `Was ist eine KI-Produktsuche?`, en: `What is AI product search?` },
  'lavender.seo.search.answer': {
    de: `Eine KI-Produktsuche versteht, was Kundinnen und Kunden meinen, auch wenn sie es in ganzen Sätzen oder mit einem Foto beschreiben, und findet passende Produkte, ohne dass die Suchbegriffe wörtlich im Produkttext stehen müssen.`,
    en: `AI product search understands what customers mean, even when they describe it in full sentences or with a photo, and finds matching products without the search terms having to appear word for word in the product text.`,
  },
  'lavender.seo.search.lead': {
    de: `Möglich macht das die semantische Suche: Produkte und Anfragen werden als Vektoren gespeichert, und die Suche vergleicht Bedeutungen statt Buchstabenfolgen. Intelligentic Search vektorisiert dafür alle Produktinformationen, nicht nur Titel, und antwortet in Millisekunden.`,
    en: `Semantic search makes this possible: products and queries are stored as vectors, and the search compares meaning rather than strings of letters. Intelligentic Search vectorizes all product information for this, not just titles, and responds in milliseconds.`,
  },
  'lavender.seo.search.b1.title': {
    de: `Stichwortsuche und semantische Suche im Vergleich`,
    en: `Keyword search and semantic search compared`,
  },
  'lavender.seo.search.b1.body': {
    de: `| | Stichwortsuche | Semantische Suche |
| Was verglichen wird | Wörter und Wortteile | Die Bedeutung von Anfrage und Produkt |
| „leichte Jacke für Nieselregen“ | Findet nur Produkte mit genau diesen Wörtern | Findet passende Regenjacken, auch wenn „Nieselregen“ nirgends steht |
| Tippfehler und Synonyme | Brauchen gepflegte Synonymlisten | Werden meist von selbst verstanden |
| Artikelnummern und Marken | Sehr zuverlässig | Braucht eine exakte Suche als Ergänzung |

Viele Shops kombinieren deshalb beides. Diese hybride Suche findet Artikelnummern und Markennamen exakt und versteht trotzdem frei formulierte Anfragen.`,
    en: `| | Keyword search | Semantic search |
| What is compared | Words and word fragments | The meaning of query and product |
| "light jacket for drizzle" | Only finds products containing exactly these words | Finds suitable rain jackets even if "drizzle" appears nowhere |
| Typos and synonyms | Need maintained synonym lists | Usually understood on their own |
| Item numbers and brands | Very reliable | Needs exact search alongside it |

That is why many shops combine both. This hybrid search finds item numbers and brand names exactly and still understands freely worded queries.`,
  },
  'lavender.seo.search.b2.title': { de: `So funktioniert Vektorsuche`, en: `How vector search works` },
  'lavender.seo.search.b2.body': {
    de: `1. Ein Embedding-Modell wandelt jede Produktbeschreibung in einen Zahlenvektor um, der ihre Bedeutung abbildet.
2. Die Vektoren kommen in einen Index, der auf schnelle Ähnlichkeitssuche ausgelegt ist.
3. Eine Suchanfrage wird genauso umgewandelt, als Text oder als Bild.
4. Die Suche liefert die Produkte, deren Vektoren der Anfrage am nächsten liegen.

Die Bildsuche funktioniert nach demselben Prinzip: Jemand lädt ein Foto oder einen Screenshot hoch, etwa aus Social Media, das Bild wird in einen Vektor übersetzt und mit den Produkten verglichen. In Intelligentic Search ist diese Bildsuche eingebaut, passende Ergebnisse erscheinen innerhalb von Sekunden.`,
    en: `1. An embedding model turns each product description into a vector of numbers that represents its meaning.
2. The vectors go into an index built for fast similarity search.
3. A search query is converted the same way, whether it is text or an image.
4. The search returns the products whose vectors are closest to the query.

Image search works on the same principle: someone uploads a photo or a screenshot, from social media for instance, the image is translated into a vector and compared with the products. Intelligentic Search has this image search built in, and matching results appear within seconds.`,
  },
  'lavender.seo.search.b3.title': {
    de: `Wann sich eine bessere Onsite-Suche lohnt`,
    en: `When a better site search pays off`,
  },
  'lavender.seo.search.b3.body': {
    de: `Diese Anzeichen sprechen dafür, die Suche im Shop zu verbessern:

- Viele Suchen enden ohne Treffer.
- Kundinnen und Kunden filtern lange und brechen dann ab.
- Dasselbe Produkt wird unter verschiedenen Begriffen gesucht, die Suche kennt aber nur einen.
- Fragen zu Größen, Material oder Versand landen beim Kundenservice, obwohl die Antwort in den Produktdaten steht.`,
    en: `These signs suggest it's time to improve your shop's search:

- Many searches end with no results.
- Customers filter for a long time and then give up.
- The same product is searched for under different terms, but the search only knows one.
- Questions about sizes, materials or shipping end up with customer service even though the answer is in the product data.`,
  },
  'lavender.seo.search.faqTitle': {
    de: `Häufige Fragen zur KI-Produktsuche`,
    en: `Frequently asked questions about AI product search`,
  },
  'lavender.seo.search.faq.q1': {
    de: `Was ist der Unterschied zwischen semantischer Suche und Stichwortsuche?`,
    en: `What is the difference between semantic search and keyword search?`,
  },
  'lavender.seo.search.faq.a1': {
    de: `Die Stichwortsuche findet Produkte, in deren Text die gesuchten Wörter vorkommen. Die semantische Suche vergleicht die Bedeutung von Anfrage und Produkt und findet deshalb auch passende Produkte, die anders beschrieben sind.`,
    en: `Keyword search finds products whose text contains the words searched for. Semantic search compares the meaning of query and product and therefore also finds suitable products that are described differently.`,
  },
  'lavender.seo.search.faq.q2': { de: `Was ist Vektorsuche?`, en: `What is vector search?` },
  'lavender.seo.search.faq.a2': {
    de: `Bei der Vektorsuche werden Texte oder Bilder von einem KI-Modell in Zahlenvektoren übersetzt, die ihre Bedeutung abbilden. Eine Suchanfrage wird ebenso übersetzt, und die Suche liefert die Einträge, deren Vektoren ihr am ähnlichsten sind.`,
    en: `In vector search, an AI model translates texts or images into vectors of numbers that represent their meaning. A query is translated the same way, and the search returns the entries whose vectors are most similar to it.`,
  },
  'lavender.seo.search.faq.q3': {
    de: `Wie funktioniert die Bildsuche im Onlineshop?`,
    en: `How does image search work in an online shop?`,
  },
  'lavender.seo.search.faq.a3': {
    de: `Kundinnen und Kunden laden ein Foto oder einen Screenshot hoch. Das Bild wird wie ein Text in einen Vektor übersetzt und mit den Produkten verglichen. In Intelligentic Search erscheinen passende Ergebnisse innerhalb von Sekunden.`,
    en: `Customers upload a photo or a screenshot. The image is translated into a vector, just like text, and compared with the products. In Intelligentic Search, matching results appear within seconds.`,
  },
  'lavender.seo.search.faq.q4': {
    de: `Wie schnell antwortet Intelligentic Search?`,
    en: `How fast does Intelligentic Search respond?`,
  },
  'lavender.seo.search.faq.a4': {
    de: `In Millisekunden. Das liegt an einer sehr effizienten Vektorsuche und an Modellen, die lokal gehostet werden.`,
    en: `In milliseconds. That comes from a highly efficient vector search and from models that are hosted locally.`,
  },
  'lavender.seo.search.faq.q5': {
    de: `Lässt sich Intelligentic Search an das bestehende Shop-Design anbinden?`,
    en: `Can Intelligentic Search be connected to an existing shop design?`,
  },
  'lavender.seo.search.faq.a5': {
    de: `Ja. Intelligentic Search ist modular aufgebaut. Wir passen die Funktionen an dein Unternehmen an und binden die Suche an dein bestehendes Design an oder liefern eine eigene Oberfläche.`,
    en: `Yes. Intelligentic Search is modular. We adapt the features to your business and connect the search to your existing design or provide an interface of its own.`,
  },

  // ======================================================================
  // Campaign Parameter Tool: UTM-Parameter · UTM-Generator ·
  // UTM-Namenskonvention · Kampagnen-Tracking · UTM Builder für Teams
  // Facts: support.google.com/analytics/answer/10917952 and /9756891 (13.11.2026)
  // ======================================================================
  'lavender.seo.cpt.title': { de: `Was sind UTM-Parameter?`, en: `What are UTM parameters?` },
  'lavender.seo.cpt.answer': {
    de: `UTM-Parameter sind Zusätze an einer URL, die Analytics-Tools sagen, aus welcher Quelle, über welches Medium und aus welcher Kampagne ein Besuch kommt.`,
    en: `UTM parameters are additions to a URL that tell analytics tools which source, medium and campaign a visit comes from.`,
  },
  'lavender.seo.cpt.lead': {
    de: `Sie stehen hinter einem Fragezeichen am Link, etwa „?utm_source=newsletter&utm_medium=email&utm_campaign=herbst-sale“. Google Analytics 4 liest sie aus und ordnet den Besuch damit einem Kanal und einer Kampagne zu.`,
    en: `They follow a question mark at the end of the link, for example "?utm_source=newsletter&utm_medium=email&utm_campaign=fall-sale". Google Analytics 4 reads them and uses them to assign the visit to a channel and a campaign.`,
  },
  'lavender.seo.cpt.b1.title': {
    de: `Die UTM-Parameter in Google Analytics 4`,
    en: `The UTM parameters in Google Analytics 4`,
  },
  'lavender.seo.cpt.b1.body': {
    de: `| Parameter | Wofür | Beispiel |
| utm_source | Herkunft des Besuchs | newsletter, linkedin |
| utm_medium | Art des Kanals | email, cpc, social |
| utm_campaign | Name der Kampagne | herbst-sale-2026 |
| utm_term | Bezahltes Keyword | laufschuhe-damen |
| utm_content | Unterscheidet Anzeigen oder Links derselben Kampagne | banner-oben |
| utm_id | Kampagnen-ID, verbindet importierte Kampagnendaten | 2026-11-042 |
| utm_source_platform | Plattform, die den Traffic steuert | Display & Video 360 |

utm_source, utm_medium und utm_campaign solltest du immer setzen. Die Werte unterscheiden Groß- und Kleinschreibung: utm_source=Newsletter und utm_source=newsletter erscheinen in GA4 als zwei Quellen. Google empfiehlt deshalb durchgehend Kleinbuchstaben ([Google-Hilfe zu UTM-Parametern](https://support.google.com/analytics/answer/10917952)).`,
    en: `| Parameter | Purpose | Example |
| utm_source | Where the visit comes from | newsletter, linkedin |
| utm_medium | Type of channel | email, cpc, social |
| utm_campaign | Campaign name | fall-sale-2026 |
| utm_term | Paid keyword | running-shoes-women |
| utm_content | Tells apart ads or links within one campaign | banner-top |
| utm_id | Campaign ID, links imported campaign data | 2026-11-042 |
| utm_source_platform | Platform that directs the traffic | Display & Video 360 |

Always set utm_source, utm_medium and utm_campaign. Values are case-sensitive: utm_source=Newsletter and utm_source=newsletter show up in GA4 as two sources. Google therefore recommends using lowercase throughout ([Google help on UTM parameters](https://support.google.com/analytics/answer/10917952)).`,
  },
  'lavender.seo.cpt.b2.title': {
    de: `Wie utm_medium den Kanal in GA4 bestimmt`,
    en: `How utm_medium determines the channel in GA4`,
  },
  'lavender.seo.cpt.b2.body': {
    de: `GA4 sortiert Besuche anhand von Regeln in Standard-Kanalgruppen, und utm_medium spielt dabei die Hauptrolle ([Google-Hilfe zu den Kanalgruppen](https://support.google.com/analytics/answer/9756891)):

- E-Mail: Quelle oder Medium ist email, e-mail, e_mail oder „e mail“.
- Paid Search: Die Quelle ist eine Suchmaschine, und das Medium passt zu bezahltem Traffic, etwa cpc oder ppc.
- Display: Medium display, banner, interstitial oder cpm.
- Organic Social: Medium social, social-network, social-media oder sm.
- Affiliates: Medium affiliate.
- Unassigned: Keine Regel passt, zum Beispiel weil utm_medium fehlt oder newsletter statt email heißt.`,
    en: `GA4 sorts visits into default channel groups using rules, and utm_medium plays the main part ([Google help on channel groups](https://support.google.com/analytics/answer/9756891)):

- Email: source or medium is email, e-mail, e_mail or "e mail".
- Paid Search: the source is a search engine and the medium matches paid traffic, such as cpc or ppc.
- Display: medium display, banner, interstitial or cpm.
- Organic Social: medium social, social-network, social-media or sm.
- Affiliates: medium affiliate.
- Unassigned: no rule matches, for example because utm_medium is missing or says newsletter instead of email.`,
  },
  'lavender.seo.cpt.b3.title': {
    de: `Eine UTM-Namenskonvention fürs Team`,
    en: `A UTM naming convention for your team`,
  },
  'lavender.seo.cpt.b3.body': {
    de: `1. Feste Listen für utm_source und utm_medium, aus denen alle auswählen, statt frei zu tippen.
2. Nur Kleinbuchstaben, Bindestriche statt Leerzeichen.
3. Ein festes Schema für utm_campaign, zum Beispiel Jahr, Land, Produkt und Aktion immer in derselben Reihenfolge.
4. Ein zentrales Verzeichnis aller Links, damit niemand dieselbe Kampagne zweimal anders benennt.
5. Eine Prüfung vor dem Versand, die Tippfehler und doppelte Namen findet.

Ein kostenloser UTM-Generator baut einzelne Links korrekt zusammen. Er kennt aber keine Konvention und weiß nicht, welche Namen dein Team schon verwendet hat. Sobald mehrere Personen, Agenturen oder Länder Kampagnen anlegen, brauchst du Vorgaben, die das Werkzeug durchsetzt. Das Campaign Parameter Tool setzt sie als Vorlagen, Validierung und Rollen für Marketing, Media und Analytics um.`,
    en: `1. Fixed lists for utm_source and utm_medium that everyone picks from instead of typing freely.
2. Lowercase only, hyphens instead of spaces.
3. A fixed pattern for utm_campaign, for example year, country, product and promotion, always in the same order.
4. A central directory of all links, so nobody names the same campaign differently twice.
5. A check before sending that catches typos and duplicate names.

A free UTM generator builds individual links correctly. But it doesn't know your convention or which names your team has already used. As soon as several people, agencies or countries create campaigns, you need rules that the tool enforces. The Campaign Parameter Tool implements them as templates, validation and roles for marketing, media and analytics.`,
  },
  'lavender.seo.cpt.faq.q1': {
    de: `Unterscheiden UTM-Parameter Groß- und Kleinschreibung?`,
    en: `Are UTM parameters case-sensitive?`,
  },
  'lavender.seo.cpt.faq.a1': {
    de: `Ja. In GA4 sind utm_source=Newsletter und utm_source=newsletter zwei verschiedene Werte. Google empfiehlt deshalb, durchgehend Kleinbuchstaben zu verwenden.`,
    en: `Yes. In GA4, utm_source=Newsletter and utm_source=newsletter are two different values. Google therefore recommends using lowercase throughout.`,
  },
  'lavender.seo.cpt.faq.q2': {
    de: `Warum landet mein Kampagnen-Traffic in GA4 unter Unassigned?`,
    en: `Why does my campaign traffic end up as Unassigned in GA4?`,
  },
  'lavender.seo.cpt.faq.a2': {
    de: `Meist, weil utm_medium fehlt oder einen Wert hat, den die Standard-Kanalgruppen von GA4 nicht kennen. Werte wie email, cpc, display, affiliate oder social ordnet GA4 zu. Einheitliche Vorgaben im Team verhindern das Problem.`,
    en: `Usually because utm_medium is missing or has a value GA4's default channel groups don't recognize. GA4 assigns values such as email, cpc, display, affiliate or social. Consistent rules across the team prevent the problem.`,
  },
  'lavender.seo.cpt.faq.q3': {
    de: `Brauche ich UTM-Parameter bei Google Ads?`,
    en: `Do I need UTM parameters for Google Ads?`,
  },
  'lavender.seo.cpt.faq.a3': {
    de: `In der Regel nicht, wenn die automatische Tag-Kennzeichnung (Auto-Tagging) aktiv und Google Ads mit GA4 verknüpft ist. Für alle anderen Kanäle wie Newsletter, Social Media oder Display-Kampagnen anderer Anbieter brauchst du sie.`,
    en: `Usually not, if auto-tagging is on and Google Ads is linked to GA4. For all other channels, such as newsletters, social media or display campaigns from other providers, you need them.`,
  },

  // ======================================================================
  // AI workshop: KI-Workshop für Unternehmen · KI-Schulung Mitarbeiter ·
  // KI-Kompetenz Pflicht (AI Act Art. 4) · KI-Workshop Hamburg ·
  // KI im Unternehmen einführen
  // ======================================================================
  'lavender.seo.workshop.title': {
    de: `Was bringt ein KI-Workshop für Unternehmen?`,
    en: `What does an AI workshop do for a company?`,
  },
  'lavender.seo.workshop.answer': {
    de: `Ein KI-Workshop klärt an Beispielen aus dem eigenen Geschäft, wofür ein Team KI sinnvoll einsetzen kann und was es dabei beachten muss.`,
    en: `An AI workshop uses examples from your own business to work out what your team can sensibly use AI for and what it needs to watch out for.`,
  },
  'lavender.seo.workshop.lead': {
    de: `Am Ende stehen Einsatzfälle, die alle verstehen, und ein Plan für die nächsten Schritte. Unser kostenloser KI-Workshop für Marken geht der Frage nach, wie viel KI eine Marke wirklich braucht und wie sie KI sicher und gewinnbringend nutzt.`,
    en: `You come away with use cases everyone understands and a plan for the next steps. Our free AI workshop for brands looks at how much AI a brand really needs and how to use it safely and profitably.`,
  },
  'lavender.seo.workshop.b1.title': {
    de: `KI-Workshop, KI-Schulung oder AI Enablement?`,
    en: `AI workshop, AI training or AI enablement?`,
  },
  'lavender.seo.workshop.b1.body': {
    de: `| Format | Ziel | Typischer Umfang |
| KI-Workshop | Einsatzfälle finden, ausprobieren und entscheiden | Ein halber bis ganzer Tag |
| KI-Schulung | Werkzeuge und Grundlagen sicher anwenden | Einzelne Module, oft online |
| AI Enablement | Ein Team befähigen, KI-Lösungen selbst zu entwickeln und zu betreiben | Mehrere Wochen, begleitend zur Arbeit |`,
    en: `| Format | Goal | Typical scope |
| AI workshop | Find use cases, try them out and decide | Half a day to a full day |
| AI training | Use tools and basics with confidence | Individual modules, often online |
| AI enablement | Enable a team to build and run AI solutions itself | Several weeks, alongside daily work |`,
  },
  'lavender.seo.workshop.b2.title': {
    de: `KI-Kompetenz nach Art. 4 der KI-Verordnung`,
    en: `AI literacy under Article 4 of the AI Act`,
  },
  'lavender.seo.workshop.b2.body': {
    de: `Seit dem 2. Februar 2025 verlangt Art. 4 der europäischen KI-Verordnung (AI Act) von Unternehmen, die KI-Systeme anbieten oder einsetzen, Maßnahmen für die KI-Kompetenz der Menschen, die damit arbeiten. Ein bestimmtes Format, eine Prüfung oder ein Zertifikat schreibt die Verordnung nicht vor, und ein eigenes Bußgeld für Art. 4 sieht sie nicht vor. Sinnvoll ist trotzdem, festzuhalten, wer wann zu welchen Themen geschult wurde ([Verordnung (EU) 2024/1689 bei EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)).

Diese Einordnung ersetzt keine Rechtsberatung.`,
    en: `Since 2 February 2025, Article 4 of the European AI Act has required companies that provide or deploy AI systems to take measures for the AI literacy of the people who work with them. The regulation prescribes no particular format, exam or certificate, and it sets no fine of its own for Article 4. It still makes sense to record who was trained on which topics and when ([Regulation (EU) 2024/1689 on EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)).

This overview is not legal advice.`,
  },
  'lavender.seo.workshop.b3.title': {
    de: `KI im Unternehmen einführen: die ersten Schritte`,
    en: `Introducing AI in your company: the first steps`,
  },
  'lavender.seo.workshop.b3.body': {
    de: `1. Einsatzfälle sammeln, bei denen KI messbar Zeit spart oder die Qualität verbessert.
2. Klären, welche Daten dafür nötig sind und ob sie das Haus verlassen dürfen. Für sensible Daten siehe [Privacy-led AI](/privacy-led-ai/).
3. Eine kurze KI-Richtlinie aufschreiben: welche Werkzeuge erlaubt sind und was nicht hineingehört.
4. Einen Einsatzfall als Prototyp testen.
5. Das Team schulen und festhalten, wer was gelernt hat.

Im Workshop arbeiten wir mit echten Use Cases und lassen Platz für deine Fragen. Es sprechen die Köpfe hinter dem [EmpCo Audit](/empco-audit/) und der Wissensplattform [iKnow](/iknow/).`,
    en: `1. Collect use cases where AI measurably saves time or improves quality.
2. Clarify which data they need and whether it may leave the company. For sensitive data, see [Privacy-led AI](/privacy-led-ai/).
3. Write a short AI policy: which tools are allowed and what must not go into them.
4. Test one use case as a prototype.
5. Train the team and record who learned what.

In the workshop we work with real use cases and leave room for your questions. The speakers are the people behind the [EmpCo Audit](/empco-audit/) and the knowledge platform [iKnow](/iknow/).`,
  },
  'lavender.seo.workshop.faqTitle': {
    de: `Häufige Fragen zum KI-Workshop`,
    en: `Frequently asked questions about the AI workshop`,
  },
  'lavender.seo.workshop.faq.q1': {
    de: `Ist eine KI-Schulung für Mitarbeitende Pflicht?`,
    en: `Is AI training mandatory for employees?`,
  },
  'lavender.seo.workshop.faq.a1': {
    de: `Art. 4 der KI-Verordnung verlangt seit dem 2. Februar 2025, dass Unternehmen, die KI einsetzen, Maßnahmen für die KI-Kompetenz ihrer Beschäftigten treffen. Wie sie das tun, ist offen. Ein Workshop, eine Schulung oder interne Anleitungen können dazu beitragen.`,
    en: `Since 2 February 2025, Article 4 of the AI Act has required companies that use AI to take measures for their employees' AI literacy. How they do this is up to them. A workshop, a training or internal guidance can all contribute.`,
  },
  'lavender.seo.workshop.faq.q2': {
    de: `Brauche ich ein KI-Zertifikat oder einen KI-Führerschein?`,
    en: `Do I need an AI certificate or an "AI license"?`,
  },
  'lavender.seo.workshop.faq.a2': {
    de: `Nein. Die KI-Verordnung schreibt weder ein Zertifikat noch einen KI-Führerschein vor. Es hilft aber, Schulungen zu dokumentieren.`,
    en: `No. The AI Act requires neither a certificate nor an "AI license". It does help to document trainings.`,
  },
  'lavender.seo.workshop.faq.q3': {
    de: `Was kostet der KI-Workshop von iCompetence?`,
    en: `How much does the iCompetence AI workshop cost?`,
  },
  'lavender.seo.workshop.faq.a3': {
    de: `Der KI-Workshop für Marken ist kostenlos. Die Plätze sind begrenzt, deshalb bewirbst du dich über das Formular auf dieser Seite.`,
    en: `The AI workshop for brands is free. Seats are limited, so you apply using the form on this page.`,
  },
  'lavender.seo.workshop.faq.q4': {
    de: `Was ist der Unterschied zwischen einem KI-Workshop und einer KI-Schulung?`,
    en: `What is the difference between an AI workshop and an AI training?`,
  },
  'lavender.seo.workshop.faq.a4': {
    de: `Im Workshop geht es darum, Einsatzfälle zu finden und Entscheidungen zu treffen. Eine Schulung vermittelt, wie man Werkzeuge sicher bedient. Viele Unternehmen beginnen mit einem Workshop und schulen danach gezielt die Teams, die KI einsetzen.`,
    en: `A workshop is about finding use cases and making decisions. A training teaches how to use tools safely. Many companies start with a workshop and then train the specific teams that will use AI.`,
  },

  // ======================================================================
  // Privacy-led AI: DSGVO-konforme KI · KI und Datenschutz · KI on-premise
  // betreiben · Datenschutz bei KI-Tools · Privacy by Design KI
  // Facts: GDPR (EUR-Lex), DSK Orientierungshilfe KI und Datenschutz, 6.5.2024
  // ======================================================================
  'lavender.seo.privacy.title': {
    de: `Wie setzt man KI DSGVO-konform ein?`,
    en: `How do you use AI in line with the GDPR?`,
  },
  'lavender.seo.privacy.answer': {
    de: `KI lässt sich DSGVO-konform einsetzen, wenn für jede Verarbeitung personenbezogener Daten eine Rechtsgrundlage besteht und nur so viele Daten fließen, wie der Zweck verlangt. Am leichtesten gelingt das, wenn die KI dort läuft, wo die Daten schon liegen.`,
    en: `AI can be used in line with the GDPR when every processing of personal data has a legal basis and no more data flows than the purpose requires. That is easiest when the AI runs where the data already is.`,
  },
  'lavender.seo.privacy.lead': {
    de: `Dann verlassen die Daten deine Umgebung nicht, und Fragen zu Auftragsverarbeitung oder Übermittlung in Drittländer stellen sich gar nicht erst. Diesen Ansatz nennen wir Privacy-led AI.`,
    en: `Then the data never leaves your environment, and questions about data processors or transfers to third countries don't arise in the first place. We call this approach privacy-led AI.`,
  },
  'lavender.seo.privacy.b1.title': {
    de: `Welche DSGVO-Regeln für KI wichtig sind`,
    en: `Which GDPR rules matter for AI`,
  },
  'lavender.seo.privacy.b1.body': {
    de: `- Art. 5 DSGVO: Zweckbindung und Datenminimierung. Die KI bekommt nur die Daten, die sie für die Aufgabe braucht.
- Art. 6 DSGVO: Jede Verarbeitung personenbezogener Daten braucht eine Rechtsgrundlage, etwa einen Vertrag oder ein berechtigtes Interesse.
- Art. 25 DSGVO: Datenschutz durch Technikgestaltung (Privacy by Design) und datenschutzfreundliche Voreinstellungen.
- Art. 28 DSGVO: Verarbeitet ein externer KI-Anbieter Daten in deinem Auftrag, brauchst du einen Vertrag zur Auftragsverarbeitung.
- Art. 35 DSGVO: Bei voraussichtlich hohem Risiko für die Betroffenen ist eine Datenschutz-Folgenabschätzung Pflicht.
- Art. 44 ff. DSGVO: Übermittlungen in Länder außerhalb der EU brauchen eine eigene Grundlage.

Den Text der Verordnung findest du bei [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj).`,
    en: `- Art. 5 GDPR: purpose limitation and data minimization. The AI only gets the data it needs for the task.
- Art. 6 GDPR: every processing of personal data needs a legal basis, such as a contract or a legitimate interest.
- Art. 25 GDPR: data protection by design (privacy by design) and by default.
- Art. 28 GDPR: if an external AI provider processes data on your behalf, you need a data processing agreement.
- Art. 35 GDPR: where processing is likely to pose a high risk to the people concerned, a data protection impact assessment is mandatory.
- Art. 44 et seq. GDPR: transfers to countries outside the EU need a basis of their own.

The text of the regulation is on [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2016/679/oj).`,
  },
  'lavender.seo.privacy.b2.title': {
    de: `KI-Dienst, EU-Cloud oder eigene Infrastruktur?`,
    en: `AI service, EU cloud or your own infrastructure?`,
  },
  'lavender.seo.privacy.b2.body': {
    de: `| | Öffentlicher KI-Dienst | In der EU gehostet | Eigene Infrastruktur |
| Wo die Daten verarbeitet werden | Beim Anbieter, oft außerhalb der EU | Beim Anbieter in einem EU-Rechenzentrum | In deinem Unternehmen |
| Auftragsverarbeitung (Art. 28) | Nötig | Nötig | Entfällt, solange kein Dienstleister auf die Daten zugreift |
| Übermittlung in Drittländer | Häufig ein Thema | Je nach Anbieter möglich | Entfällt |
| Kontrolle über Modell und Protokolle | Gering | Teilweise | Vollständig |

Auch die Datenschutzkonferenz hält technisch geschlossene Systeme, bei denen die Daten in einer abgegrenzten Umgebung bleiben, aus Datenschutzsicht für vorzugswürdig ([Orientierungshilfe „Künstliche Intelligenz und Datenschutz“, 6. Mai 2024](https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf)).`,
    en: `| | Public AI service | Hosted in the EU | Your own infrastructure |
| Where data is processed | At the provider, often outside the EU | At the provider, in an EU data center | Inside your company |
| Data processing agreement (Art. 28) | Required | Required | Not needed, as long as no service provider accesses the data |
| Transfers to third countries | Often an issue | Possible, depending on the provider | Not applicable |
| Control over model and logs | Low | Partial | Full |

The German data protection conference (DSK) also considers technically closed systems, where data stays in a contained environment, preferable from a data protection point of view ([guidance "Künstliche Intelligenz und Datenschutz", 6 May 2024, German](https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf)).`,
  },
  'lavender.seo.privacy.b3.title': {
    de: `Privacy by Design bei KI in der Praxis`,
    en: `Privacy by design for AI in practice`,
  },
  'lavender.seo.privacy.b3.body': {
    de: `- Die Modelle laufen in deiner Infrastruktur, und die Daten verlassen deine Umgebung nicht.
- Zugriffsrechte gelten auch für die KI: Sie zeigt nur Inhalte, die die fragende Person sehen darf.
- Architektur, Datenflüsse und Entscheidungswege sind dokumentiert, sodass du jederzeit weißt, was wo und warum geschieht.
- Personenbezogene Daten werden vor der Verarbeitung entfernt oder pseudonymisiert, wo der Zweck das zulässt.
- Beschäftigte nutzen dienstliche Konten und Geräte statt privater, wie es auch die Datenschutzkonferenz empfiehlt.

Nach diesem Prinzip arbeiten auch unsere Produkte: [iKnow](/iknow/) läuft als Desktop-Software lokal im Unternehmen.`,
    en: `- The models run in your infrastructure, and the data never leaves your environment.
- Access rights apply to the AI too: it only shows content the person asking is allowed to see.
- Architecture, data flows and decision paths are documented, so you always know what happens where and why.
- Personal data is removed or pseudonymized before processing wherever the purpose allows.
- Employees use company accounts and devices rather than private ones, as the DSK also recommends.

Our products follow the same principle: [iKnow](/iknow/) runs locally inside the company as desktop software.`,
  },
  'lavender.seo.privacy.faqTitle': {
    de: `Häufige Fragen zu KI und Datenschutz`,
    en: `Frequently asked questions about AI and data protection`,
  },
  'lavender.seo.privacy.faq.q1': {
    de: `Ist eine lokale KI automatisch DSGVO-konform?`,
    en: `Is a local AI automatically GDPR-compliant?`,
  },
  'lavender.seo.privacy.faq.a1': {
    de: `Nein. Lokal entfallen Auftragsverarbeitung und Übermittlung in Drittländer, aber Rechtsgrundlage, Zweckbindung, Zugriffsrechte und Löschung musst du trotzdem regeln. Der lokale Betrieb macht es nur leichter, diese Pflichten zu erfüllen.`,
    en: `No. Running locally removes the need for a data processor and for third-country transfers, but you still have to settle the legal basis, purpose limitation, access rights and deletion. Local operation just makes these obligations easier to meet.`,
  },
  'lavender.seo.privacy.faq.q2': {
    de: `Wann ist eine Datenschutz-Folgenabschätzung bei KI Pflicht?`,
    en: `When is a data protection impact assessment mandatory for AI?`,
  },
  'lavender.seo.privacy.faq.a2': {
    de: `Nach Art. 35 DSGVO immer dann, wenn eine Verarbeitung voraussichtlich ein hohes Risiko für die Rechte der Betroffenen mit sich bringt. Die Datenschutzkonferenz geht davon aus, dass das beim Einsatz von KI-Anwendungen vielfach der Fall ist. Prüfe es deshalb vor dem Start.`,
    en: `Under Art. 35 GDPR, whenever processing is likely to pose a high risk to the rights of the people concerned. The German data protection conference expects this to be the case in many AI deployments. So check it before you start.`,
  },
  'lavender.seo.privacy.faq.q3': {
    de: `Darf ich Kundendaten in ein KI-Tool eingeben?`,
    en: `May I enter customer data into an AI tool?`,
  },
  'lavender.seo.privacy.faq.a3': {
    de: `Nur mit Rechtsgrundlage und nur so viel, wie der Zweck verlangt. Bei einem externen Dienst brauchst du zusätzlich einen Vertrag zur Auftragsverarbeitung und musst prüfen, ob Daten in Drittländer gehen oder zum Training verwendet werden. Für vertrauliche Daten ist eine KI in der eigenen Infrastruktur die sicherere Wahl.`,
    en: `Only with a legal basis and only as much as the purpose requires. With an external service you also need a data processing agreement and must check whether data goes to third countries or is used for training. For confidential data, an AI in your own infrastructure is the safer choice.`,
  },
  'lavender.seo.privacy.faq.q4': {
    de: `Was bedeutet Privacy by Design bei KI?`,
    en: `What does privacy by design mean for AI?`,
  },
  'lavender.seo.privacy.faq.a4': {
    de: `Datenschutz wird von Anfang an in die Architektur eingebaut, wie es Art. 25 DSGVO verlangt. Bei KI heißt das vor allem: Die Daten bleiben in der eigenen Umgebung, und die KI bekommt nur, was sie für ihre Aufgabe braucht.`,
    en: `Data protection is built into the architecture from the start, as Art. 25 GDPR requires. For AI this mainly means that the data stays in your own environment and the AI only gets what it needs for its task.`,
  },
  'lavender.seo.privacy.faq.q5': {
    de: `Wie hilft iCompetence bei datenschutzkonformer KI?`,
    en: `How does iCompetence help with privacy-compliant AI?`,
  },
  'lavender.seo.privacy.faq.a5': {
    de: `Wir klären mit dir, was möglich und sicher ist, gestalten interne KI-Systeme passend zu deiner Governance und setzen sie in deiner Infrastruktur um. Unsere Produkte wie [iKnow](/iknow/) arbeiten nach demselben Prinzip lokal.`,
    en: `We work out with you what is possible and safe, design internal AI systems that fit your governance and implement them in your infrastructure. Our products such as [iKnow](/iknow/) work locally on the same principle.`,
  },
};
