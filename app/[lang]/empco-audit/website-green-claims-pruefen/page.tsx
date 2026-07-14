import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'
import { alternates, toLang, type Lang } from '@/lib/i18n-meta'

// Cluster page #10 (Content-Matrix): Cluster C/D – Prozess, BOFU, Prio Hoch.
// Primär-Keyword: "website green claims pruefen"
// Sekundär: "empco audit", "greenwashing pruefung website"
// The /en variant is a 1:1 translation (accessibility); legal statements are
// shared between both languages, so the German legal review covers both.

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }]
}

export const dynamicParams = false

const meta: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'Website auf Green Claims prüfen: EmpCo-Audit manuell vs. automatisiert | iCompetence',
    description:
      'Website auf Green Claims prüfen, bevor die EmpCo-Richtlinie ab 27.09.2026 gilt: manueller Audit vs. automatisierter EmpCo-Audit im Vergleich – Ablauf, Aufwand, Ergebnis. Mit kostenloser Probeseite.',
  },
  en: {
    title: 'Checking your website for green claims: EmpCo audit, manual vs. automated | iCompetence',
    description:
      'Check your website for green claims before the EmpCo Directive applies from 27 Sep 2026: manual review vs. automated EmpCo audit compared – process, effort, outcome. With a free sample page.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const lang = toLang((await params).lang)
  return {
    title: meta[lang].title,
    description: meta[lang].description,
    alternates: alternates('empco-audit/website-green-claims-pruefen', lang),
    robots: { index: true, follow: true },
  }
}

const contentDe: EmpCoClusterContent = {
  title: 'Website auf Green Claims prüfen: So macht man einen EmpCo-Audit – manuell vs. automatisiert',
  quote: {
    text: '„AI tool now does 80% of my ESG job. I’m gatekeeping it.“ – ein ESG-Profi in r/Environmental_Careers über Automatisierung der mühsamen Prüfarbeit (60+ Kommentare).',
    source: 'Diskussion auf Reddit, r/Environmental_Careers',
  },
  intro: [
    '**Eine Website wird auf Green Claims geprüft, indem alle öffentlichen Umweltaussagen – Texte, Siegel und Bildsprache – erfasst, mit Belegen abgeglichen und nach Risiko priorisiert werden. Manuell dauert das Wochen; ein automatisierter EmpCo-Audit liefert den vollständigen Überblick in Stunden.** Nötig wird das, weil ab dem 27. September 2026 jede Umweltaussage gegenüber Verbrauchern belegt sein muss – auch auf über Jahre gewachsenen Bestandsseiten, Produkttexten und Landingpages.',
    '„How do you audit hundreds of pages of claims?“ – diese Frage aus den ESG-Foren beschreibt das Kernproblem der [EmpCo-Richtlinie](/de/empco-audit/) präzise: Die meisten Unternehmen wissen nicht, was auf hunderten eigenen Seiten steht. Diese Seite vergleicht die beiden Wege zum Überblick – manuelle Prüfung vs. automatisierter Audit – mit Ablauf, Aufwand und dem, was am Ende jeweils herauskommt.',
  ],
  sections: [
    {
      id: 'was-pruefen',
      heading: 'Was überhaupt geprüft werden muss',
      paragraphs: [
        'Ein Green-Claims-Audit deckt mehr ab als die offensichtlichen Werbe-Slogans. Prüfrelevant ist alles, was einem Produkt, einer Dienstleistung oder dem Unternehmen einen ökologischen Vorteil zuschreibt:',
      ],
      bullets: [
        'Textaussagen auf allen Seitentypen: Startseite, Produktseiten, Kategorietexte, Landingpages, Blog, „Über uns“ – inklusive Formulierungen wie „nachhaltig“, „umweltfreundlich“ oder „öko“. [Welche Begriffe ab 2026 verboten sind](/de/empco-audit/klimaneutral-werben-verboten/), listet der eigene Beitrag auf.',
        'Klimaaussagen wie „klimaneutral“ – insbesondere, ob sie auf Kompensation oder auf belegten Reduktionen beruhen.',
        'Siegel, Logos und Badges: Eigen-Labels ohne unabhängige Zertifizierung müssen entfernt werden.',
        'Die visuelle Darstellung: Auch Bildsprache und Gestaltung können eine Umweltaussage transportieren – ein belastbarer Audit wertet Text und visuelle Darstellung gemeinsam aus.',
        'Zukunftsversprechen („bis 2030 …“): zulässig nur mit überprüfbaren, öffentlichen Zwischenzielen.',
      ],
    },
    {
      id: 'manuell',
      heading: 'Der manuelle Weg: Seite für Seite',
      paragraphs: [
        'Der klassische Ablauf: Marketing, Nachhaltigkeit und Recht lesen die Website Seite für Seite, sammeln Aussagen in einer Tabelle und gleichen sie mit den vorhandenen Belegen ab. Branchenüblich ist dafür ein mittlerer bis hoher fünfstelliger Aufwand – bei großen Websites verteilt über Wochen.',
        'Das größere Problem als die Kosten ist die Verlässlichkeit: Drei Abteilungen bewerten dieselbe Formulierung unterschiedlich, die Tagesform entscheidet über die Gründlichkeit, und während der Prüfung ändert sich die Website weiter. Am Ende steht selten ein vollständiges Bild – sondern eine Momentaufnahme mit Lücken, aus der die [nächste Abmahnung](/de/empco-audit/abmahnung-greenwashing/) trotzdem entstehen kann.',
      ],
    },
    {
      id: 'ki-einzeldurchlauf',
      heading: 'Warum ein einzelner KI-Durchlauf nicht reicht',
      paragraphs: [
        'Der naheliegende Mittelweg – Screenshots in ChatGPT werfen und nach Greenwashing fragen – scheitert an der Reproduzierbarkeit: Ein einzelner KI-Durchlauf kann bei derselben Seite bei jedem Lauf zu einem anderen Befund führen. Für eine rechtlich relevante Prüfung ist das zu wenig.',
        'Ein belastbarer Audit prüft jede Aussage mehrstufig – Analyse, kritische Gegenprüfung, Abgleich über mehrere Durchläufe – und wertet Text und visuelle Darstellung gemeinsam aus. Erst das macht den Befund vollständig und nachvollziehbar: Er muss auch dann noch Bestand haben, wenn die Rechtsabteilung oder eine externe Kanzlei ihn hinterfragt.',
      ],
    },
    {
      id: 'automatisiert',
      heading: 'Der automatisierte EmpCo-Audit: mehrstufig qualitätsgesichert',
      paragraphs: [
        'Der [EmpCo Audit](/de/empco-audit/) ist ein automatisierter, mehrstufig qualitätsgesicherter Website-Audit. Er spürt Nachhaltigkeitsaussagen auf, die unter der EU-Richtlinie 2024/825 (EmpCo), dem UWG und der Green-Claims-Rechtsprechung zum rechtlichen Risiko werden – und übergibt sie als priorisierte, belegpflichtige Fundstellen-Liste an Marketing, Nachhaltigkeit und Recht.',
        'Wichtig für die Einordnung: Der Audit ersetzt nicht den Anwalt. Er ersetzt die wochenlange manuelle Vorarbeit davor. Die juristische Letztprüfung setzt gezielt auf der priorisierten Liste auf, statt hunderte Seiten selbst lesen zu müssen – genau die Arbeitsteilung, die der ESG-Profi im Reddit-Zitat oben für sich entdeckt hat.',
      ],
      table: {
        primaryHeader: 'Automatisierter EmpCo-Audit',
        secondaryHeader: 'Manuelle Prüfung',
        rows: [
          {
            feature: 'Dauer',
            primary: 'Vollständiger Überblick in Stunden',
            secondary: 'Wochen, je nach Seitenumfang',
          },
          {
            feature: 'Aufwand',
            primary: 'Vorarbeit entfällt weitgehend',
            secondary: 'Branchenüblich mittlerer bis hoher fünfstelliger Aufwand',
          },
          {
            feature: 'Verlässlichkeit',
            primary: 'Mehrstufige Prüfung, Abgleich über mehrere Durchläufe',
            secondary: 'Abhängig von Person und Tagesform',
          },
          {
            feature: 'Prüfumfang',
            primary: 'Text und visuelle Darstellung gemeinsam',
            secondary: 'Meist nur Text, Siegel nach Sichtung',
          },
          {
            feature: 'Ergebnis',
            primary: 'Priorisierte Fundstellen-Liste mit Regelverweis',
            secondary: 'Verstreute Notizen und Tabellen',
          },
          {
            feature: 'Juristische Letztprüfung',
            primary: 'Setzt gezielt auf der Liste auf',
            secondary: 'Muss den Rohbestand selbst durcharbeiten',
          },
        ],
      },
    },
    {
      id: 'wer-prueft',
      heading: 'Wer im Unternehmen prüft – und warum es liegen bleibt',
      paragraphs: [
        'Die Frage „Who owns greenwashing risk: marketing, legal or sustainability?“ aus den ESG-Foren trifft den organisatorischen Kern des Problems. Rechtlich haftet das Unternehmen; intern liegt das Risiko in der Lücke zwischen den Abteilungen, die in getrennten Tools arbeiten: Marketing formuliert, Nachhaltigkeit liefert Daten, Recht prüft – aber niemand hat den Gesamtüberblick über die Website.',
        'Genau deshalb bleibt die Bestandsprüfung so oft liegen: Sie gehört formal niemandem. Ein gemeinsamer Audit als „Single Source of Truth“ schließt diese Lücke – alle drei Abteilungen arbeiten mit derselben priorisierten Fundstellen-Liste statt mit drei verschiedenen Tabellenständen.',
      ],
      subsections: [
        {
          heading: 'Der Reporting-Blickwinkel: Website und CSRD müssen zusammenpassen',
          paragraphs: [
            'Für ESG- und Reporting-Teams kommt eine zweite Dimension dazu: „How do you keep website claims consistent with CSRD reporting?“ Wer im Nachhaltigkeitsbericht präzise bilanziert, auf der Website aber pauschal wirbt, schafft eine dokumentierte Inkonsistenz – und liefert damit genau das Material, das Abmahner und Behörden suchen. Ein systematischer Website-Audit macht diese Abweichungen sichtbar, bevor sie jemand anderes findet.',
          ],
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'So starten Sie: mit einer kostenlosen Probeseite',
      paragraphs: [
        'Der einfachste Einstieg ist die kostenlose Probeseite: Sie nennen uns die URL Ihrer Website, wir prüfen eine Seite mit dem vollständigen mehrstufigen Verfahren und Sie sehen am konkreten Beispiel, welche Aussagen als kritisch markiert werden – mit Fundstelle und Regelverweis.',
        'Damit lässt sich intern am schnellsten klären, wie groß das Thema für Ihre Website tatsächlich ist – bevor Sie über den vollständigen Audit entscheiden. Und falls einzelne Formulierungen bereits als riskant bekannt sind: [Wie man Green Claims rechtssicher umformuliert](/de/empco-audit/green-claims-formulieren/), zeigt der Beitrag mit den Erlaubt-vs.-verboten-Beispielen.',
      ],
    },
  ],
  faqTitle: 'Häufige Fragen zur Green-Claims-Prüfung',
  faq: [
    {
      q: 'Wie prüfe ich meine Website auf Green-Claims-Risiken?',
      a: 'Manuell lesen mehrere Abteilungen die Website Seite für Seite, sammeln Aussagen und gleichen sie mit Belegen ab – branchenüblich ein mittlerer bis hoher fünfstelliger Aufwand. Ein automatisierter EmpCo-Audit übernimmt diese Vorarbeit: Er identifiziert kritische Aussagen mit Fundstelle und Regelverweis und liefert eine priorisierte Liste, auf der die juristische Letztprüfung gezielt aufsetzt.',
    },
    {
      q: 'Reicht es nicht, ChatGPT einen Screenshot zu zeigen?',
      a: 'Nein. Ein einzelner KI-Durchlauf ist nicht reproduzierbar – dieselbe Seite kann bei jedem Lauf zu einem anderen Befund führen. Ein belastbarer Audit prüft jede Aussage mehrstufig (Analyse, kritische Gegenprüfung, Abgleich über mehrere Durchläufe) und wertet Text und visuelle Darstellung gemeinsam aus. Erst das macht den Befund vollständig und nachvollziehbar.',
    },
    {
      q: 'Muss ich alte Website-Seiten und Bestandsinhalte auch prüfen?',
      a: 'Ja. Die Regeln gelten für alle Aussagen, die ab dem Stichtag öffentlich sind – auch für über Jahre gewachsene Bestandsseiten, Produkttexte und Landingpages. Genau hier liegt das Hauptproblem: Die meisten Unternehmen wissen nicht, was auf hunderten eigenen Seiten steht. Ein automatisierter Audit verschafft hier in Stunden einen vollständigen Überblick.',
    },
    {
      q: 'Wer haftet im Unternehmen für Greenwashing – Marketing, Recht oder Nachhaltigkeit?',
      a: 'Rechtlich haftet das Unternehmen; intern liegt das Problem meist in der Lücke zwischen den Abteilungen, die in getrennten Tools arbeiten. Marketing formuliert, Nachhaltigkeit liefert Daten, Recht prüft – aber niemand hat den Gesamtüberblick über die Website. Ein gemeinsamer Audit als „Single Source of Truth“ schließt genau diese Lücke.',
    },
    {
      q: 'Was müssen Unternehmen jetzt konkret tun?',
      a: 'Alle Umweltaussagen inventarisieren und vor dem Stichtag prüfen. Pauschale Claims streichen oder mit Nachweisen unterlegen, nicht zertifizierte Siegel entfernen und kompensationsbasierte Klimaaussagen überarbeiten. Sinnvoll sind ein fester Freigabeprozess zwischen Marketing, Recht und Nachhaltigkeit sowie ein Audit der Außenkommunikation.',
    },
  ],
  relatedTitle: 'Weiterlesen',
  related: [
    { label: 'EmpCo-Richtlinie 2026: Der Leitfaden mit FAQ und Audit', href: '/de/empco-audit/' },
    { label: 'Green Claims rechtssicher formulieren: erlaubte vs. verbotene Aussagen', href: '/de/empco-audit/green-claims-formulieren/' },
    { label: '„Klimaneutral“, „nachhaltig“, „umweltfreundlich“ – welche Werbebegriffe ab 2026 verboten sind', href: '/de/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Abmahnung wegen Greenwashing: Was tun? Kosten, Fristen, Reaktion', href: '/de/empco-audit/abmahnung-greenwashing/' },
    { label: 'Greenwashing-Bußgelder in der EU: bis zu 4 % vom Jahresumsatz – die Fälle', href: '/de/empco-audit/greenwashing-strafe/' },
  ],
  cta: {
    headline: 'Wie viele kritische Aussagen stecken auf Ihrer Website?',
    button: 'Kostenlose Probeseite anfordern',
  },
  ctaIdPrefix: 'empco_pruefen',
}

const contentEn: EmpCoClusterContent = {
  title: 'Checking your website for green claims: how to run an EmpCo audit – manual vs. automated',
  quote: {
    text: '“AI tool now does 80% of my ESG job. I’m gatekeeping it.” – an ESG professional in r/Environmental_Careers on automating the tedious review work (60+ comments).',
    source: 'Discussion on Reddit, r/Environmental_Careers',
  },
  intro: [
    '**A website is checked for green claims by recording all public environmental statements – text, labels and imagery – matching them against evidence and prioritising them by risk. Done manually, this takes weeks; an automated EmpCo audit delivers the complete overview within hours.** This becomes necessary because from 27 September 2026 every environmental claim towards consumers must be substantiated – including on legacy pages, product copy and landing pages that have grown over years.',
    '“How do you audit hundreds of pages of claims?” – this question from the ESG forums describes the core problem of the [EmpCo Directive](/en/empco-audit/) precisely: most companies do not know what is written on hundreds of their own pages. This page compares the two routes to an overview – manual review vs. automated audit – with process, effort and what each one actually delivers.',
  ],
  sections: [
    {
      id: 'was-pruefen',
      heading: 'What needs to be checked in the first place',
      paragraphs: [
        'A green-claims audit covers more than the obvious advertising slogans. Relevant is everything that attributes an ecological benefit to a product, a service or the company:',
      ],
      bullets: [
        'Text claims on all page types: homepage, product pages, category copy, landing pages, blog, “About us” – including phrases like “sustainable”, “eco-friendly” or “eco”. [Which terms are banned from 2026](/en/empco-audit/klimaneutral-werben-verboten/) is listed in its own article.',
        'Climate claims such as “climate-neutral” – in particular whether they rest on offsetting or on substantiated reductions.',
        'Labels, logos and badges: own labels without independent certification must be removed.',
        'The visual presentation: imagery and design can also convey an environmental claim – a robust audit evaluates text and visual presentation together.',
        'Future promises (“by 2030 …”): permissible only with verifiable, public interim targets.',
      ],
    },
    {
      id: 'manuell',
      heading: 'The manual route: page by page',
      paragraphs: [
        'The classic process: marketing, sustainability and legal read the website page by page, collect claims in a spreadsheet and match them against the available evidence. The industry norm for this is a mid to high five-figure effort – spread over weeks for large websites.',
        'A bigger problem than the cost is reliability: three departments assess the same phrase differently, thoroughness depends on the day, and the website keeps changing during the review. The end result is rarely a complete picture – but a snapshot with gaps, from which the [next warning letter](/en/empco-audit/abmahnung-greenwashing/) can still emerge.',
      ],
    },
    {
      id: 'ki-einzeldurchlauf',
      heading: 'Why a single AI pass is not enough',
      paragraphs: [
        'The obvious middle way – dropping screenshots into ChatGPT and asking about greenwashing – fails on reproducibility: a single AI pass can produce a different result for the same page on every run. For a legally relevant review, that is not enough.',
        'A robust audit checks every claim in multiple stages – analysis, critical cross-examination, reconciliation across several runs – and evaluates text and visual presentation together. Only that makes the findings complete and traceable: they must still hold up when the legal department or an external law firm questions them.',
      ],
    },
    {
      id: 'automatisiert',
      heading: 'The automated EmpCo audit: multi-stage quality assurance',
      paragraphs: [
        'The [EmpCo Audit](/en/empco-audit/) is an automated, multi-stage quality-assured website audit. It detects sustainability claims that become a legal risk under EU Directive 2024/825 (EmpCo), the UWG and green-claims case law – and hands them to marketing, sustainability and legal as a prioritised, evidence-focused list of findings.',
        'Important for context: the audit does not replace the lawyer. It replaces the weeks of manual groundwork before. The final legal review builds directly on the prioritised list instead of having to read hundreds of pages – exactly the division of labour the ESG professional in the Reddit quote above discovered for themselves.',
      ],
      table: {
        primaryHeader: 'Automated EmpCo audit',
        secondaryHeader: 'Manual review',
        rows: [
          {
            feature: 'Duration',
            primary: 'Complete overview within hours',
            secondary: 'Weeks, depending on site size',
          },
          {
            feature: 'Effort',
            primary: 'Groundwork largely eliminated',
            secondary: 'Industry norm: mid to high five-figure effort',
          },
          {
            feature: 'Reliability',
            primary: 'Multi-stage review, reconciled across several runs',
            secondary: 'Depends on the person and the day',
          },
          {
            feature: 'Scope',
            primary: 'Text and visual presentation together',
            secondary: 'Mostly text only, labels upon inspection',
          },
          {
            feature: 'Outcome',
            primary: 'Prioritised list of findings with rule reference',
            secondary: 'Scattered notes and spreadsheets',
          },
          {
            feature: 'Final legal review',
            primary: 'Builds directly on the list',
            secondary: 'Has to work through the raw material itself',
          },
        ],
      },
    },
    {
      id: 'wer-prueft',
      heading: 'Who does the checking – and why it stays undone',
      paragraphs: [
        'The question “Who owns greenwashing risk: marketing, legal or sustainability?” from the ESG forums hits the organisational core of the problem. Legally, the company is liable; internally, the risk sits in the gap between departments working in separate tools: marketing writes the copy, sustainability supplies the data, legal reviews – but nobody has the full overview of the website.',
        'That is exactly why the legacy review so often stays undone: formally, it belongs to no one. A shared audit as a single source of truth closes this gap – all three departments work from the same prioritised list of findings instead of three different spreadsheet versions.',
      ],
      subsections: [
        {
          heading: 'The reporting angle: website and CSRD must match',
          paragraphs: [
            'For ESG and reporting teams there is a second dimension: “How do you keep website claims consistent with CSRD reporting?” Whoever reports precisely in the sustainability report but advertises generically on the website creates a documented inconsistency – and thereby supplies exactly the material that warning parties and authorities look for. A systematic website audit makes these deviations visible before someone else finds them.',
          ],
        },
      ],
    },
    {
      id: 'ablauf',
      heading: 'How to start: with a free sample page',
      paragraphs: [
        'The easiest entry point is the free sample page: you give us the URL of your website, we check one page with the full multi-stage process, and you see on a concrete example which claims are flagged as critical – with location and rule reference.',
        'This is the fastest way to clarify internally how big the topic actually is for your website – before you decide on the full audit. And if individual phrases are already known to be risky: [how to rewrite green claims legally](/en/empco-audit/green-claims-formulieren/) is covered in the article with the permitted-vs.-banned examples.',
      ],
    },
  ],
  faqTitle: 'Frequently asked questions about green-claims checks',
  faq: [
    {
      q: 'How do I check my website for green-claims risks?',
      a: 'Manually, several departments read the website page by page, collect claims and match them against evidence – typically a mid to high five-figure effort. An automated EmpCo audit takes over this groundwork: it identifies critical claims with their exact location and rule reference and delivers a prioritised list on which the final legal review can build.',
    },
    {
      q: 'Isn’t it enough to show ChatGPT a screenshot?',
      a: 'No. A single AI pass is not reproducible – the same page can produce a different result on every run. A robust audit checks every claim in multiple stages (analysis, critical cross-examination, reconciliation across several runs) and evaluates text and visual presentation together. Only that makes the findings complete and traceable.',
    },
    {
      q: 'Do I also have to review old website pages and legacy content?',
      a: 'Yes. The rules apply to all claims that are public from the cut-off date – including legacy pages, product copy and landing pages that have grown over years. This is exactly the core problem: most companies do not know what is written on hundreds of their own pages. An automated audit provides a complete overview within hours.',
    },
    {
      q: 'Who is liable for greenwashing – marketing, legal or sustainability?',
      a: 'Legally, the company is liable; internally, the problem usually sits in the gap between departments working in separate tools. Marketing writes the copy, sustainability supplies the data, legal reviews – but nobody has the full overview of the website. A shared audit as a single source of truth closes exactly this gap.',
    },
    {
      q: 'What should companies do now?',
      a: 'Inventory all environmental claims and review them before the cut-off date. Remove generic claims or back them with evidence, drop non-certified labels, and revise offsetting-based climate claims. A fixed approval process between marketing, legal and sustainability, plus an audit of external communication, is recommended.',
    },
  ],
  relatedTitle: 'Further reading',
  related: [
    { label: 'EmpCo Directive 2026: the guide with FAQ and audit', href: '/en/empco-audit/' },
    { label: 'Formulating green claims legally: permitted vs. banned statements', href: '/en/empco-audit/green-claims-formulieren/' },
    { label: '“Climate-neutral”, “sustainable”, “eco-friendly” – which advertising terms are banned from 2026', href: '/en/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Greenwashing cease-and-desist warning: what to do? Costs, deadlines, response', href: '/en/empco-audit/abmahnung-greenwashing/' },
    { label: 'Greenwashing fines in the EU: up to 4% of annual turnover – the cases', href: '/en/empco-audit/greenwashing-strafe/' },
  ],
  cta: {
    headline: 'How many critical claims are hiding on your website?',
    button: 'Request a free sample page',
  },
  ctaIdPrefix: 'empco_pruefen',
}

const content: Record<Lang, EmpCoClusterContent> = { de: contentDe, en: contentEn }

const pageNames: Record<Lang, string> = {
  de: 'Website auf Green Claims prüfen',
  en: 'Checking your website for green claims',
}

export default async function WebsiteGreenClaimsPruefen({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  const c = content[lang]

  // FAQPage JSON-LD — must mirror the visible FAQ section 1:1 (Google policy).
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'iCompetence', item: `https://icompetence.de/${lang}/` },
      { '@type': 'ListItem', position: 2, name: 'EmpCo Audit', item: `https://icompetence.de/${lang}/empco-audit/` },
      { '@type': 'ListItem', position: 3, name: pageNames[lang], item: `https://icompetence.de/${lang}/empco-audit/website-green-claims-pruefen/` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EmpCoClusterPage content={c} initialLanguage={lang} />
    </>
  )
}
