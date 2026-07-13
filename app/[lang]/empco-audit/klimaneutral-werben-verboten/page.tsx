import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'

// Cluster page #4 (Content-Matrix): Cluster B – Marketing & Agenturen, MOFU, Prio Hoch.
// Primär-Keyword: "klimaneutral werben verboten"
// Sekundär: "verbotene umweltaussagen 2026", "green claims werbung"
// German-only (DACH focus) — no /en variant yet, so no en hreflang.

export async function generateStaticParams() {
  return [{ lang: 'de' }]
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: 'Klimaneutral werben verboten? Diese Werbebegriffe sind ab 2026 tabu | iCompetence',
  description:
    'Verbotene Umweltaussagen 2026: „klimaneutral“, „nachhaltig“, „umweltfreundlich“ & Co. sind ab 27.09.2026 ohne Nachweis unzulässig. Die Begriffsliste, der BGH-Kontext und was erlaubt bleibt.',
  alternates: {
    canonical: '/de/empco-audit/klimaneutral-werben-verboten/',
    languages: {
      de: '/de/empco-audit/klimaneutral-werben-verboten/',
      'x-default': '/de/empco-audit/klimaneutral-werben-verboten/',
    },
  },
  robots: { index: true, follow: true },
}

const content: EmpCoClusterContent = {
  title: '„Klimaneutral“, „nachhaltig“, „umweltfreundlich“ – welche Werbebegriffe ab 2026 verboten sind',
  quote: {
    text: '„‚Clean‘, ‚sustainable‘ und ‚green‘ sind keine regulierten Begriffe.“ – Top-Kommentar in r/BeautyGuruChatter. Das stimmte lange. Ab dem 27. September 2026 stimmt es nicht mehr.',
    source: 'Diskussion auf Reddit, r/BeautyGuruChatter',
  },
  intro: [
    '„Darf ich noch mit ‚klimaneutral‘ werben?“ – die Frage beschäftigt Marketing-Teams und Agenturen im gesamten DACH-Raum. Die Antwort hat ein festes Datum: Ab dem 27. September 2026 verbietet die [EmpCo-Richtlinie (EU 2024/825)](/de/empco-audit/) pauschale Umweltaussagen ohne Nachweis – EU-weit und ohne Übergangsfrist für Bestandsinhalte.',
    'Diese Seite listet auf, welche Werbebegriffe konkret betroffen sind, warum „klimaneutral“ der schärfste Sonderfall ist, was weiterhin erlaubt bleibt – und wie Sie Ihre bestehenden Texte rechtzeitig umstellen.',
  ],
  sections: [
    {
      id: 'begriffsliste',
      heading: 'Die Begriffsliste: was ohne Nachweis verboten ist',
      paragraphs: [
        'Verboten sind ab dem Stichtag pauschale, nicht belegte Umweltaussagen. Dazu gehören insbesondere:',
      ],
      bullets: [
        '„klimaneutral“ – als pauschale Produktaussage, insbesondere wenn sie allein auf CO₂-Kompensation beruht',
        '„umweltfreundlich“',
        '„nachhaltig“',
        '„grün“',
        '„öko“ / „ökologisch“',
        '„biologisch abbaubar“',
        '„klimapositiv“',
      ],
      subsections: [
        {
          heading: 'Ebenfalls unzulässig: drei Aussage-Kategorien',
          bullets: [
            'Klimaneutralitäts-Werbung auf Offsetting-Basis: Aussagen wie „klimaneutral durch Kompensation“ sind ab dem 27. September 2026 nicht mehr erlaubt.',
            'Nachhaltigkeitssiegel ohne unabhängige Zertifizierung: Selbst gestaltete „Öko“- oder „Trust“-Labels müssen aus Werbung, Verpackung und Website entfernt werden.',
            'Versprechen über künftige Umweltleistung ohne überprüfbare, öffentliche Zwischenziele – ebenso irreführende Aussagen zur Haltbarkeit (geplante Obsoleszenz).',
          ],
        },
      ],
    },
    {
      id: 'klimaneutral-sonderfall',
      heading: '„Klimaneutral“: der Sonderfall mit Vorgeschichte',
      paragraphs: [
        'Kein Begriff steht so im Zentrum der Durchsetzung wie „klimaneutral“. Der BGH hat bereits entschieden, dass damit nur geworben werden darf, wenn der Begriff im Werbeumfeld klar erläutert wird. Und der prominenteste Fall kommt aus Deutschland: Apple wurde die „klimaneutral“-Werbung für die Apple Watch gerichtlich untersagt – auf Reddit einer der meistdiskutierten Greenwashing-Threads überhaupt.',
        'Der Hintergrund ist die Offsetting-Skepsis: CO₂-Kompensationen sind nicht per se Betrug, stehen aber massiv in der Kritik, weil ihre tatsächliche Klimawirkung oft schwer messbar und teils überschätzt ist. Genau deshalb zieht die EmpCo hier die klarste Linie – Kompensation allein taugt ab 2026 nicht mehr als Grundlage einer Klimaneutralitäts-Aussage. [Welche Bußgelder bei Verstößen drohen](/de/empco-audit/greenwashing-strafe/), zeigen die Fälle Shein, Armani und Apple.',
      ],
    },
    {
      id: 'was-bleibt-erlaubt',
      heading: 'Nicht verboten: spezifische, belegte Aussagen',
      paragraphs: [
        'Die EmpCo verbietet nicht die Umweltkommunikation – sie verbietet die unbelegte Pauschale. Wer konkret wird und den Nachweis vorher sichert, darf weiterhin mit Umwelteigenschaften werben. Die Übersicht:',
      ],
      table: {
        primaryHeader: 'Ohne Nachweis',
        secondaryHeader: 'Mit nachprüfbarem Beleg',
        rows: [
          {
            feature: '„nachhaltig“, „umweltfreundlich“, „grün“, „öko“',
            primary: 'Verboten',
            secondary: 'Zulässig, wenn konkret und belegt',
          },
          {
            feature: '„klimaneutral“ auf Kompensationsbasis',
            primary: 'Verboten',
            secondary: 'Bleibt verboten – Offsetting allein genügt nie',
          },
          {
            feature: '„klimaneutral“ auf Reduktionsbasis',
            primary: 'Verboten',
            secondary: 'Zulässig mit Reduktionsnachweis und Erläuterung',
          },
          {
            feature: 'Nachhaltigkeitssiegel',
            primary: 'Eigen-Label verboten',
            secondary: 'Zertifiziert oder behördlich eingeführt: zulässig',
          },
          {
            feature: 'Zukunftsversprechen („bis 2030 …“)',
            primary: 'Verboten',
            secondary: 'Zulässig mit überprüfbaren, öffentlichen Zwischenzielen',
          },
        ],
      },
    },
    {
      id: 'zeitplan',
      heading: 'Zeitplan und Rechtsrahmen: die Daten, die zählen',
      bullets: [
        'Seit März 2024: Die EmpCo-Richtlinie (EU 2024/825) ist in Kraft.',
        'Bis 27. März 2026: Frist für die EU-Mitgliedstaaten zur Umsetzung in nationales Recht.',
        '19. Februar 2026: Deutschland verkündet das Dritte Gesetz zur Änderung des UWG im Bundesgesetzblatt.',
        'Ab 27. September 2026: Die neuen Regeln gelten verbindlich – ohne Übergangsfrist für Produkte oder Aussagen, die bereits im Markt sind.',
        'Schon heute: Unbelegte Umweltaussagen sind nach § 5 UWG als Irreführung [abmahnfähig](/de/empco-audit/abmahnung-greenwashing/) – durch Wettbewerber und Verbände.',
      ],
      paragraphs: [
        'Für die Planung von Kampagnen, Verpackungen und Website-Relaunches heißt das: Alles, was jetzt produziert wird und am 27. September 2026 noch öffentlich ist, muss bereits den neuen Regeln genügen.',
      ],
    },
    {
      id: 'jetzt-handeln',
      heading: 'Was Marketing-Teams jetzt tun sollten',
      bullets: [
        'Inventarisieren: alle Umweltaussagen auf Website, Verpackung, im Shop und in laufenden Kampagnen erfassen.',
        'Umformulieren statt streichen: pauschale Claims durch spezifische, belegte Aussagen ersetzen – [mit den Erlaubt-vs.-verboten-Beispielen](/de/empco-audit/green-claims-formulieren/) als Vorlage.',
        'Siegel bereinigen: nicht zertifizierte Eigen-Labels entfernen.',
        'Bestand systematisch prüfen: [die gesamte Website auf Green Claims durchgehen](/de/empco-audit/website-green-claims-pruefen/) – automatisiert in Stunden statt manuell in Wochen.',
        'Freigabeprozess etablieren: jede grüne Aussage vor Veröffentlichung gemeinsam von Marketing, Recht und Nachhaltigkeit freigeben lassen.',
      ],
    },
  ],
  faqTitle: 'Häufige Fragen zu verbotenen Werbebegriffen',
  faq: [
    {
      q: 'Ist „klimaneutral“ ab 2026 noch erlaubt?',
      a: 'Ja, aber nur unter strengen Bedingungen. Verboten ist ab dem 27. September 2026 die pauschale Produktaussage „klimaneutral“, wenn sie allein auf CO₂-Kompensation (Offsetting) beruht. Erlaubt bleiben Aussagen, die auf tatsächlichen Emissionsreduktionen in der Wertschöpfungskette basieren und nachprüfbar belegt sind. Schon heute hat der BGH entschieden, dass mit „klimaneutral“ nur geworben werden darf, wenn der Begriff im Werbeumfeld klar erläutert wird.',
    },
    {
      q: 'Welche Werbebegriffe sind ab 2026 konkret verboten?',
      a: 'Verboten sind pauschale, nicht belegte Umweltaussagen wie „klimaneutral“, „grün“, „nachhaltig“, „umweltfreundlich“, „öko“ oder „biologisch abbaubar“, wenn kein anerkannter, nachprüfbarer Nachweis vorliegt. Ebenfalls verboten: selbst erfundene Nachhaltigkeitssiegel ohne unabhängige Zertifizierung und irreführende Aussagen zur Haltbarkeit (geplante Obsoleszenz).',
    },
    {
      q: 'Was passiert mit Nachhaltigkeitssiegeln und Eigen-Labels?',
      a: 'Nachhaltigkeitssiegel sind ab 2026 nur noch zulässig, wenn sie auf einem anerkannten Zertifizierungssystem beruhen oder von einer Behörde eingeführt wurden. Selbst gestaltete „Trust-“ oder „Öko-“Labels ohne unabhängige Drittprüfung sind nicht mehr erlaubt.',
    },
    {
      q: 'Gibt es eine Übergangsfrist für Bestandsprodukte?',
      a: 'Nein, eine Übergangsfrist gibt es nicht. Ab dem 27. September 2026 müssen sämtliche Umweltaussagen – auf Verpackungen, Websites, in Werbung und im Online-Shop – den neuen Anforderungen entsprechen. Unternehmen sollten Bestände und Kommunikationsmittel rechtzeitig prüfen.',
    },
    {
      q: 'Wurde die Green Claims Directive zurückgezogen – was gilt jetzt?',
      a: 'Das wird oft verwechselt. Die Green Claims Directive (der separate Vorschlag mit Vorab-Prüfsystem) wurde im Juni 2025 von der EU-Kommission zurückgezogen. Die EmpCo-Richtlinie (EU 2024/825) ist davon unberührt, bereits beschlossen und gilt ab dem 27. September 2026. Das Greenwashing-Verbot kommt also – nur eben über die EmpCo statt über die Green Claims Directive.',
    },
  ],
  relatedTitle: 'Weiterlesen',
  related: [
    { label: 'EmpCo-Richtlinie 2026: Der Leitfaden mit FAQ und Audit', href: '/de/empco-audit/' },
    { label: 'Green Claims rechtssicher formulieren: erlaubte vs. verbotene Aussagen', href: '/de/empco-audit/green-claims-formulieren/' },
    { label: 'Website auf Green Claims prüfen: EmpCo-Audit manuell vs. automatisiert', href: '/de/empco-audit/website-green-claims-pruefen/' },
    { label: 'Greenwashing-Bußgelder in der EU: bis zu 4 % vom Jahresumsatz – die Fälle', href: '/de/empco-audit/greenwashing-strafe/' },
    { label: 'Abmahnung wegen Greenwashing: Was tun? Kosten, Fristen, Reaktion', href: '/de/empco-audit/abmahnung-greenwashing/' },
  ],
  cta: {
    headline: 'Welche dieser Begriffe stehen noch auf Ihrer Website?',
    button: 'Kostenlose Probeseite anfordern',
  },
  ctaIdPrefix: 'empco_begriffe',
}

// FAQPage JSON-LD — must mirror the visible FAQ accordion 1:1 (Google policy).
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

export default function KlimaneutralWerbenVerboten() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <EmpCoClusterPage content={content} initialLanguage="de" />
    </>
  )
}
