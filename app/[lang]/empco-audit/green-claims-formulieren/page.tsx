import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'

// Cluster page #5 (Content-Matrix): Cluster B – Marketing & Agenturen, MOFU, Prio Hoch.
// Primär-Keyword: "green claims formulieren"
// Sekundär: "umweltwerbung rechtssicher", "erlaubte nachhaltigkeitsaussagen"
// German-only (DACH focus) — no /en variant yet, so no en hreflang.

export async function generateStaticParams() {
  return [{ lang: 'de' }]
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: 'Green Claims formulieren: erlaubte vs. verbotene Aussagen | iCompetence',
  description:
    'Green Claims rechtssicher formulieren: Grundregeln der EmpCo-Richtlinie, Beispiele für erlaubte vs. verbotene Umweltaussagen und eine Checkliste für Marketing und Agenturen – gültig ab 27.09.2026.',
  alternates: {
    canonical: '/de/empco-audit/green-claims-formulieren/',
    languages: {
      de: '/de/empco-audit/green-claims-formulieren/',
      'x-default': '/de/empco-audit/green-claims-formulieren/',
    },
  },
  robots: { index: true, follow: true },
}

const content: EmpCoClusterContent = {
  title: 'Green Claims rechtssicher formulieren: erlaubte vs. verbotene Aussagen',
  quote: {
    text: '„Most of it is greenwashing dressed up in fonts.“ – so beschreibt ein Junior-Marketer in r/AskMarketing den Zustand des Nachhaltigkeitsmarketings.',
    source: 'Diskussion auf Reddit, r/AskMarketing',
  },
  intro: [
    '**Green Claims sind rechtssicher formuliert, wenn drei Bedingungen erfüllt sind: Die Aussage ist spezifisch statt pauschal, der nachprüfbare Beleg liegt vor der Veröffentlichung vor, und der zentrale Begriff wird im Werbeumfeld erläutert.** Die [EmpCo-Richtlinie (EU 2024/825)](/de/empco-audit/) verbietet ab dem 27. September 2026 pauschale Umweltaussagen ohne Nachweis – sie verbietet nicht die Umweltkommunikation an sich.',
    'Die Frage „Can I still say eco-friendly in ads after 2026?“ taucht in Marketing-Foren immer häufiger auf. Diese Seite zeigt, wie Marketing-Teams und Agenturen Green Claims so formulieren, dass sie auch nach 2026 halten: die Grundregel, konkrete erlaubte vs. verbotene Beispiel-Formulierungen und eine Checkliste für den Freigabeprozess.',
  ],
  sections: [
    {
      id: 'grundregel',
      heading: 'Die Grundregel ab 2026: spezifisch und belegt statt pauschal',
      paragraphs: [
        'Verboten sind pauschale, nicht belegte Umweltaussagen wie „klimaneutral“, „grün“, „nachhaltig“, „umweltfreundlich“, „öko“ oder „biologisch abbaubar“, wenn kein anerkannter, nachprüfbarer Nachweis vorliegt. Ebenfalls unzulässig: Klimaneutralitäts-Aussagen, die auf CO₂-Kompensation beruhen, Nachhaltigkeitssiegel ohne unabhängige Zertifizierung sowie Versprechen über künftige Umweltleistung ohne überprüfbare, öffentliche Zwischenziele.',
        'Im Umkehrschluss ergibt sich die Formel für rechtssichere Green Claims: eine konkrete, abgegrenzte Eigenschaft benennen, den Nachweis vorher sichern und die Aussage im Werbeumfeld erläutern. Der BGH hat für „klimaneutral“ bereits entschieden, dass der Begriff nur verwendet werden darf, wenn er im Werbeumfeld klar erläutert wird – diese Linie wird ab 2026 zur Regel für die gesamte Umweltkommunikation.',
        'Wichtig für den Workflow: Belege müssen vorliegen, bevor die Aussage online geht – nicht erst, wenn ein Wettbewerber [abmahnt](/de/empco-audit/abmahnung-greenwashing/).',
      ],
    },
    {
      id: 'beispiele',
      heading: 'Erlaubt vs. verboten: Formulierungsbeispiele',
      paragraphs: [
        'Die folgende Gegenüberstellung zeigt das Muster: links die pauschale Formulierung, die ab dem 27.09.2026 ohne Nachweis unzulässig ist – rechts die spezifische, belegbare Alternative. Die rechten Beispiele sind Formulierungsmuster; ob sie im Einzelfall zulässig sind, hängt davon ab, dass der jeweilige Nachweis tatsächlich vorliegt.',
      ],
      table: {
        primaryHeader: 'Riskant / ab 2026 verboten',
        secondaryHeader: 'Rechtssicher formuliert (mit Beleg)',
        rows: [
          {
            feature: 'Pauschalclaim',
            primary: '„Umweltfreundliches Produkt“',
            secondary: '„Verpackung aus 95 % recyceltem Material“ – mit Nachweis',
          },
          {
            feature: 'Klimaaussage',
            primary: '„Klimaneutral“ (durch Kompensation)',
            secondary: 'Belegte Reduktionsaussage, im Werbeumfeld erläutert',
          },
          {
            feature: 'Siegel',
            primary: 'Selbst gestaltetes „Öko“-Label',
            secondary: 'Unabhängig zertifiziertes oder behördlich eingeführtes Siegel',
          },
          {
            feature: 'Ganzheitsaussage',
            primary: '„100 % nachhaltig“',
            secondary: 'Aussage auf den konkreten, belegten Aspekt begrenzen',
          },
          {
            feature: 'Zukunftsversprechen',
            primary: '„Klimapositiv bis 2030“ ohne Plan',
            secondary: 'Ziel mit überprüfbaren, öffentlichen Zwischenzielen',
          },
        ],
      },
    },
    {
      id: 'checkliste',
      heading: 'Checkliste: jede grüne Aussage vor Veröffentlichung prüfen',
      paragraphs: [
        'Diese sechs Fragen fangen die häufigsten Verstöße ab, bevor sie live gehen:',
      ],
      bullets: [
        'Ist der Begriff pauschal? „Nachhaltig“, „grün“, „öko“, „umweltfreundlich“ ohne konkreten Bezug sind ab 2026 die erste Angriffsfläche – [die vollständige Begriffsliste](/de/empco-audit/klimaneutral-werben-verboten/) zeigt, welche Wörter betroffen sind.',
        'Liegt der Nachweis vor – jetzt, nicht später? Belege müssen vor der Veröffentlichung vorliegen.',
        'Bezieht sich die Aussage auf das ganze Produkt oder nur einen Aspekt? Was nur für die Verpackung gilt, darf nicht wie eine Produkteigenschaft klingen.',
        'Beruht eine Klimaaussage auf Reduktion oder auf Kompensation? Offsetting taugt ab 2026 nicht mehr als alleinige Grundlage einer Umweltwerbung.',
        'Ist jedes verwendete Siegel unabhängig zertifiziert oder behördlich eingeführt? Eigen-Labels ohne Drittprüfung müssen entfernt werden.',
        'Wird der zentrale Begriff im Werbeumfeld erläutert? Für „klimaneutral“ verlangt das der BGH ausdrücklich.',
      ],
    },
    {
      id: 'zielgruppe-misstrauen',
      heading: 'Warum pauschale Claims ohnehin nicht mehr funktionieren',
      paragraphs: [
        'Unabhängig von der Rechtslage haben pauschale Green Claims ein Wirkungsproblem: Die Zielgruppe glaubt sie nicht mehr. In r/ZeroWaste diskutieren über 530 Kommentatoren, warum die Nachhaltigkeits-Community Herstellerangaben grundsätzlich misstraut. In r/BeautyGuruChatter bringt es der Top-Kommentar zur Frage „Do you trust the claims beauty brands make?“ auf den Punkt: „‚Clean‘, ‚sustainable‘ und ‚green‘ sind keine regulierten Begriffe.“ Und in r/sustainability wird unter „Brands who claim to be special because they’re sustainable“ (40+ Kommentare) genau die Beliebigkeit seziert, die die EmpCo jetzt verbietet.',
        'Für Marketing-Teams ist die Regulierung deshalb auch eine Chance: Eine spezifische, belegte Aussage unterscheidet sich ab 2026 nicht nur juristisch von der Konkurrenz-Pauschale – sie ist das einzige Format, dem die skeptische Zielgruppe noch zuhört.',
      ],
    },
    {
      id: 'siegel-verpackung',
      heading: 'Sonderfall Siegel und Verpackung',
      paragraphs: [
        'Zwei Punkte verdienen im Formulierungs-Workflow besondere Aufmerksamkeit. Erstens die Siegel: Nachhaltigkeitssiegel sind ab 2026 nur noch zulässig, wenn sie auf einem anerkannten Zertifizierungssystem beruhen oder von einer Behörde eingeführt wurden – selbst gestaltete „Trust“- oder „Öko“-Labels ohne unabhängige Drittprüfung müssen aus Werbung, Verpackung und Website entfernt werden.',
        'Zweitens der Faktor Zeit bei physischen Materialien: Eine Übergangsfrist für Bestandsprodukte gibt es nicht. Verpackungen, Kataloge und POS-Materialien, die heute mit einem pauschalen Claim produziert werden, sind am 27. September 2026 voraussichtlich noch im Umlauf – sie müssen deshalb schon jetzt nach den neuen Regeln formuliert werden.',
      ],
    },
    {
      id: 'agentur-fall',
      heading: '„Client wants climate neutral on packaging – how do I push back?“',
      paragraphs: [
        'Diese Reddit-Frage beschreibt den Alltag vieler Agenturen: Der Kunde wünscht den starken Claim, die Agentur trägt das Formulierungsrisiko mit. Drei Argumente helfen im Kundengespräch:',
      ],
      bullets: [
        'Die Rechtslage hat ein Datum: Ab dem 27. September 2026 ist kompensationsbasierte „klimaneutral“-Werbung verboten – ohne Übergangsfrist für Bestandsmaterialien. Eine Verpackung, die jetzt gestaltet wird, ist zum Stichtag noch im Markt.',
        'Das Risiko ist beziffert: [Bußgelder bis zu 4 % des Jahresumsatzes und die Fälle Shein, Armani und Apple](/de/empco-audit/greenwashing-strafe/) machen das Argument konkret – gerichtlich untersagte Werbung trifft am Ende den Kunden und die Agentur.',
        'Es gibt eine bessere Alternative: Eine spezifische, belegte Aussage ist nicht schwächer, sondern glaubwürdiger – gerade bei einer Zielgruppe, die pauschalen Claims ohnehin misstraut.',
      ],
    },
    {
      id: 'website',
      heading: 'Vom einzelnen Text zur ganzen Website',
      paragraphs: [
        'Die Checkliste funktioniert für den neuen Claim – aber nicht rückwirkend für hunderte gewachsene Produkttexte, Landingpages und Shop-Beschreibungen. Die Regeln gelten ab dem Stichtag jedoch für alle öffentlichen Aussagen, auch für Bestandsinhalte.',
        'Für den Bestand braucht es deshalb eine systematische [Prüfung der gesamten Website auf Green Claims](/de/empco-audit/website-green-claims-pruefen/). Der automatisierte [EmpCo Audit](/de/empco-audit/) identifiziert kritische Aussagen mit Fundstelle und Regelverweis und liefert Marketing, Nachhaltigkeit und Recht eine priorisierte Liste – die wochenlange manuelle Vorarbeit entfällt, die juristische Letztprüfung setzt gezielt auf.',
      ],
    },
  ],
  faqTitle: 'Häufige Fragen zum Formulieren von Green Claims',
  faq: [
    {
      q: 'Welche Werbebegriffe sind ab 2026 konkret verboten?',
      a: 'Verboten sind pauschale, nicht belegte Umweltaussagen wie „klimaneutral“, „grün“, „nachhaltig“, „umweltfreundlich“, „öko“ oder „biologisch abbaubar“, wenn kein anerkannter, nachprüfbarer Nachweis vorliegt. Ebenfalls verboten: selbst erfundene Nachhaltigkeitssiegel ohne unabhängige Zertifizierung und irreführende Aussagen zur Haltbarkeit (geplante Obsoleszenz).',
    },
    {
      q: 'Ist „klimaneutral“ ab 2026 noch erlaubt?',
      a: 'Ja, aber nur unter strengen Bedingungen. Verboten ist ab dem 27. September 2026 die pauschale Produktaussage „klimaneutral“, wenn sie allein auf CO₂-Kompensation (Offsetting) beruht. Erlaubt bleiben Aussagen, die auf tatsächlichen Emissionsreduktionen in der Wertschöpfungskette basieren und nachprüfbar belegt sind. Schon heute hat der BGH entschieden, dass mit „klimaneutral“ nur geworben werden darf, wenn der Begriff im Werbeumfeld klar erläutert wird.',
    },
    {
      q: 'Was passiert mit Nachhaltigkeitssiegeln und Eigen-Labels?',
      a: 'Nachhaltigkeitssiegel sind ab 2026 nur noch zulässig, wenn sie auf einem anerkannten Zertifizierungssystem beruhen oder von einer Behörde eingeführt wurden. Selbst gestaltete „Trust-“ oder „Öko-“Labels ohne unabhängige Drittprüfung sind nicht mehr erlaubt.',
    },
    {
      q: 'Sind CO₂-Kompensationen (Carbon Offsets) Betrug?',
      a: 'Pauschal nein, aber sie stehen massiv in der Kritik, weil ihre tatsächliche Klimawirkung oft schwer messbar und teils überschätzt ist. Genau deshalb verbietet die EmpCo-Richtlinie ab 2026, ein Produkt allein auf Basis von Kompensation als „klimaneutral“ zu bewerben. Für Unternehmen heißt das: Offsetting kann Teil einer Strategie sein, taugt aber nicht mehr als alleinige Grundlage einer Umweltwerbung.',
    },
    {
      q: 'Muss ich alte Website-Seiten und Bestandsinhalte auch prüfen?',
      a: 'Ja. Die Regeln gelten für alle Aussagen, die ab dem Stichtag öffentlich sind – auch für über Jahre gewachsene Bestandsseiten, Produkttexte und Landingpages. Genau hier liegt das Hauptproblem: Die meisten Unternehmen wissen nicht, was auf hunderten eigenen Seiten steht. Ein automatisierter Audit verschafft hier in Stunden einen vollständigen Überblick.',
    },
  ],
  relatedTitle: 'Weiterlesen',
  related: [
    { label: 'EmpCo-Richtlinie 2026: Der Leitfaden mit FAQ und Audit', href: '/de/empco-audit/' },
    { label: '„Klimaneutral“, „nachhaltig“, „umweltfreundlich“ – welche Werbebegriffe ab 2026 verboten sind', href: '/de/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Website auf Green Claims prüfen: EmpCo-Audit manuell vs. automatisiert', href: '/de/empco-audit/website-green-claims-pruefen/' },
    { label: 'Abmahnung wegen Greenwashing: Was tun? Kosten, Fristen, Reaktion', href: '/de/empco-audit/abmahnung-greenwashing/' },
    { label: 'Greenwashing-Bußgelder in der EU: bis zu 4 % vom Jahresumsatz – die Fälle', href: '/de/empco-audit/greenwashing-strafe/' },
  ],
  cta: {
    headline: 'Sie wissen nicht, welche Aussagen auf Ihrer Website kritisch sind?',
    button: 'Kostenlose Probeseite anfordern',
  },
  ctaIdPrefix: 'empco_formulieren',
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
    { '@type': 'ListItem', position: 3, name: 'Green Claims rechtssicher formulieren', item: 'https://icompetence.de/de/empco-audit/green-claims-formulieren/' },
  ],
}

export default function GreenClaimsFormulieren() {
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
