import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'

// Cluster page #10 (Content-Matrix): Cluster C/D – Prozess, BOFU, Prio Hoch.
// Primär-Keyword: "website green claims pruefen"
// Sekundär: "empco audit", "greenwashing pruefung website"
// German-only (DACH focus) — no /en variant yet, so no en hreflang.

export async function generateStaticParams() {
  return [{ lang: 'de' }]
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: 'Website auf Green Claims prüfen: EmpCo-Audit manuell vs. automatisiert | iCompetence',
  description:
    'Website auf Green Claims prüfen, bevor die EmpCo-Richtlinie ab 27.09.2026 gilt: manueller Audit vs. automatisierter EmpCo-Audit im Vergleich – Ablauf, Aufwand, Ergebnis. Mit kostenloser Probeseite.',
  alternates: {
    canonical: '/de/empco-audit/website-green-claims-pruefen/',
    languages: {
      de: '/de/empco-audit/website-green-claims-pruefen/',
      'x-default': '/de/empco-audit/website-green-claims-pruefen/',
    },
  },
  robots: { index: true, follow: true },
}

const content: EmpCoClusterContent = {
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

// FAQPage JSON-LD — must mirror the visible FAQ section 1:1 (Google policy).
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: content.faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'iCompetence', item: 'https://icompetence.de/de/' },
    { '@type': 'ListItem', position: 2, name: 'EmpCo Audit', item: 'https://icompetence.de/de/empco-audit/' },
    { '@type': 'ListItem', position: 3, name: 'Website auf Green Claims prüfen', item: 'https://icompetence.de/de/empco-audit/website-green-claims-pruefen/' },
  ],
}

export default function WebsiteGreenClaimsPruefen() {
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
      <EmpCoClusterPage content={content} initialLanguage="de" />
    </>
  )
}
