import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'

// Cluster page #7 (Content-Matrix): Cluster C – Recht/Unternehmer, BOFU, Prio Hoch.
// Primär-Keyword: "greenwashing strafe"
// Sekundär: "greenwashing bussgeld", "empco strafen", "shein armani apple"
// German-only (DACH focus) — no /en variant yet, so no en hreflang.

export async function generateStaticParams() {
  return [{ lang: 'de' }]
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: 'Greenwashing-Strafe: Bußgelder bis 4 % vom Jahresumsatz – die Fälle | iCompetence',
  description:
    'Welche Strafen bei Greenwashing drohen: Bußgelder bis zu 4 % des Jahresumsatzes, Abmahnungen, Klagen. Die Fälle Shein (1 Mio. €), Armani (3,5 Mio. €) und Apple – und was ab 27.09.2026 gilt.',
  alternates: {
    canonical: '/de/empco-audit/greenwashing-strafe/',
    languages: {
      de: '/de/empco-audit/greenwashing-strafe/',
      'x-default': '/de/empco-audit/greenwashing-strafe/',
    },
  },
  robots: { index: true, follow: true },
}

const content: EmpCoClusterContent = {
  title: 'Greenwashing-Bußgelder in der EU: bis zu 4 % vom Jahresumsatz – die Fälle',
  quote: {
    text: '„EU macht Greenwashing für Firmen zum Millionenrisiko“ – so titelt einer der meistdiskutierten Threads zum Thema in r/de, mit über 40 Kommentaren.',
    source: 'Diskussion auf Reddit, r/de',
  },
  intro: [
    'Greenwashing war lange vor allem ein Reputationsthema. Das ändert sich gerade grundlegend: Aufsichtsbehörden und Gerichte in der EU sanktionieren irreführende Umweltwerbung inzwischen mit Millionenbeträgen – und mit der EmpCo-Richtlinie (EU 2024/825) bekommt die Durchsetzung ab dem 27. September 2026 eine deutlich schärfere Grundlage.',
    'Diese Seite ordnet ein, welche Strafen bei Greenwashing konkret drohen, was die Fälle Shein, Armani und Apple über die Größenordnung verraten – und was Unternehmen jetzt tun sollten, bevor Wettbewerber, Verbände oder Behörden es für sie tun.',
  ],
  sections: [
    {
      id: 'welche-strafen',
      heading: 'Welche Strafen bei Greenwashing drohen',
      paragraphs: [
        'Die Sanktionen bei irreführender Umweltwerbung staffeln sich von der privaten Rechtsdurchsetzung bis zum behördlichen Bußgeld. Bei Verstößen gegen die EmpCo-Regeln drohen:',
      ],
      bullets: [
        '[Abmahnungen](/de/empco-audit/abmahnung-greenwashing/) durch Wettbewerber und Verbände – schon heute auf Basis von § 5 UWG (Irreführung), ab dem 27.09.2026 zusätzlich gestützt auf die EmpCo-Umsetzung im UWG.',
        'Unterlassungsklagen, wenn keine Unterlassungserklärung abgegeben wird.',
        'Bußgelder von bis zu 4 % des Jahresumsatzes des Unternehmens (in grenzüberschreitenden Fällen).',
        'Die Pflicht, beanstandete Werbung zu korrigieren oder zurückzuziehen – inklusive Verpackungen, Kampagnen und Website-Inhalten.',
        'Reputationsschäden, die gerade bei Nachhaltigkeitsthemen überproportional ausfallen: Wer beim Greenwashing erwischt wird, verliert genau die Zielgruppe, die er mit grünen Claims gewinnen wollte.',
      ],
    },
    {
      id: 'die-faelle',
      heading: 'Die Fälle: Shein, Armani, Apple',
      paragraphs: [
        'Dass die 4-%-Drohung keine Theorie ist, zeigen drei prominente Verfahren der letzten Zeit – jedes steht für einen anderen Typ von Verstoß.',
      ],
      subsections: [
        {
          heading: 'Shein: 1 Mio. € Bußgeld',
          paragraphs: [
            // TODO: juristisch prüfen — Behörde und Verfahrensdetails des Shein-Falls sind in der
            // Strategie (§8: Ethical Brand Marketing) nicht spezifiziert. Vor Livegang Details
            // ergänzen lassen oder bewusst bei der Summe belassen.
            'Der Fast-Fashion-Konzern Shein zahlte 1 Mio. € wegen irreführender Nachhaltigkeitsaussagen. Der Fall zeigt: Auch Anbieter aus Drittländern werden erfasst, sobald sie EU-Konsumenten ansprechen – der Firmensitz schützt nicht.',
          ],
        },
        {
          heading: 'Armani: 3,5 Mio. € Bußgeld',
          paragraphs: [
            // TODO: juristisch prüfen — wie oben: Behörde/Verfahren des Armani-Falls in der
            // Strategie nicht näher belegt, nur die Summe.
            'Gegen Armani wurde ein Bußgeld von 3,5 Mio. € verhängt. Der Fall macht die Größenordnung greifbar, in der sich Greenwashing-Sanktionen für große Marken inzwischen bewegen – deutlich jenseits von symbolischen Beträgen.',
          ],
        },
        {
          heading: 'Apple: „klimaneutral“-Werbung in Deutschland gerichtlich untersagt',
          paragraphs: [
            'Der wirkungsstärkste Präzedenzfall für den DACH-Raum: Apple wurde in Deutschland die „klimaneutral“-Werbung für die Apple Watch gerichtlich untersagt. Auf Reddit erzeugte der Fall hunderte Kommentare – in r/apple brachte es ein Top-Kommentar auf den Punkt: „carbon credits and carbon neutral are largely BS marketing buzzwords“.',
            'Die Linie dahinter hat der BGH vorgezeichnet: Mit „klimaneutral“ darf nur geworben werden, wenn der Begriff im Werbeumfeld klar erläutert wird. Kompensationsbasierte Klimaneutralitäts-Werbung ohne Erläuterung ist damit schon heute angreifbar – [ab 2026 ist sie ausdrücklich verboten](/de/empco-audit/klimaneutral-werben-verboten/).',
          ],
        },
      ],
    },
    {
      id: 'ab-2026',
      heading: 'Ab 27. September 2026: die EmpCo verschärft die Durchsetzung',
      paragraphs: [
        'Heute müssen Abmahner und Behörden im Einzelfall nachweisen, dass eine Umweltaussage irreführend ist. Mit der [EmpCo-Richtlinie](/de/empco-audit/) dreht sich die Logik: Pauschale Umweltaussagen ohne Nachweis wandern in die „schwarze Liste“ stets unzulässiger Geschäftspraktiken – sie sind dann per se verboten, ohne dass es auf eine Irreführung im Einzelfall ankommt.',
        'Deutschland setzt die Richtlinie über das Dritte Gesetz zur Änderung des UWG um, verkündet im Bundesgesetzblatt am 19. Februar 2026; es tritt im Wesentlichen am 27. September 2026 in Kraft. Eine Übergangsfrist für Bestandsaussagen gibt es nicht.',
      ],
      table: {
        primaryHeader: 'Heute (§ 5 UWG)',
        secondaryHeader: 'Ab 27.09.2026 (EmpCo im UWG)',
        rows: [
          {
            feature: 'Maßstab',
            primary: 'Irreführung wird im Einzelfall geprüft',
            secondary: 'Pauschale Umweltaussagen ohne Nachweis per se unzulässig („schwarze Liste“)',
          },
          {
            feature: 'Typische Angriffsfläche',
            primary: 'Unbelegte Claims wie „umweltfreundlich“',
            secondary: 'Zusätzlich: Offsetting-basierte „klimaneutral“-Werbung, Eigen-Siegel ohne Zertifizierung',
          },
          {
            feature: 'Sanktionen',
            primary: 'Abmahnung, Unterlassungsklage',
            secondary: 'Zusätzlich Bußgelder bis zu 4 % des Jahresumsatzes (grenzüberschreitende Fälle)',
          },
        ],
      },
    },
    {
      id: 'rechtsgrundlagen',
      heading: 'Die Rechtsgrundlagen im Überblick',
      paragraphs: [
        'Die EmpCo-Richtlinie (Directive (EU) 2024/825, „Empowering Consumers for the Green Transition“) ist seit März 2024 in Kraft. Sie ändert zwei bestehende EU-Regelwerke – die UGP-Richtlinie (2005/29/EG) und die Verbraucherrechte-Richtlinie (2011/83/EU) – und verbietet irreführende Umweltaussagen sowie unbelegte Nachhaltigkeitssiegel in der Werbung gegenüber Verbraucherinnen und Verbrauchern.',
        'Die EU-Mitgliedstaaten müssen die Richtlinie bis zum 27. März 2026 in nationales Recht umsetzen; verbindlich gelten die Regeln ab dem 27. September 2026. Häufige Verwechslung dabei: Die Green Claims Directive – der separate, detailliertere Vorschlag mit Vorab-Prüfsystem – wurde im Juni 2025 von der EU-Kommission zurückgezogen. Die EmpCo ist davon unberührt; das Greenwashing-Verbot kommt über die EmpCo statt über die Green Claims Directive.',
      ],
    },
    {
      id: 'reputationsrisiko',
      heading: 'Die Strafe neben der Strafe: öffentliche Aufmerksamkeit',
      paragraphs: [
        'Was die Fälle zusätzlich teuer macht: Sie werden öffentlich verhandelt. Der Apple-Fall erzeugte auf Reddit Threads mit weit über hundert Kommentaren – quer durch r/apple, r/EU_Economics und r/BuyFromEU („Germany says Apple can’t claim Apple Watch is carbon neutral“, 160+ Kommentare). Die Debatte erreicht damit genau die kaufkräftige, nachhaltigkeitsaffine Zielgruppe, für die die grünen Claims ursprünglich gedacht waren.',
        'Für die Risikoabwägung heißt das: Selbst wenn ein Verfahren glimpflich ausgeht, bleibt der öffentliche Befund „beim Greenwashing erwischt“ bestehen – und der lässt sich, anders als eine Werbeaussage, nicht zurückziehen.',
      ],
    },
    {
      id: 'wer-betroffen',
      heading: 'Wer betroffen ist – auch kleine Unternehmen',
      paragraphs: [
        'Die EmpCo betrifft alle Unternehmen, die Produkte oder Dienstleistungen an Verbraucher in der EU vermarkten – unabhängig von Branche, Unternehmensgröße oder Firmensitz. Anders als bei der CSRD gibt es keine generelle Ausnahme für KMU: Die Regeln knüpfen an die Aussage an, nicht an die Bilanzsumme.',
        'Für kleinere Unternehmen ist das Abmahnrisiko dabei oft relevanter als das Bußgeld: Eine einzige unbelegte Formulierung auf einer Produktseite reicht als Angriffsfläche – und die Fälle zeigen, dass Wettbewerber und Verbände das Thema aktiv verfolgen.',
      ],
    },
    {
      id: 'vermeiden',
      heading: 'Strafen vermeiden: erst der Überblick, dann die Korrektur',
      paragraphs: [
        'Der gemeinsame Nenner aller Fälle: Die beanstandeten Aussagen waren öffentlich sichtbar und über lange Zeit gewachsen – auf Produktseiten, in Kampagnen, im Shop. Die meisten Unternehmen wissen nicht, was auf hunderten eigenen Seiten steht. Genau dort beginnt das Risiko.',
        'Manuell lesen mehrere Abteilungen die Website Seite für Seite und gleichen Aussagen mit Belegen ab – branchenüblich ein mittlerer bis hoher fünfstelliger Aufwand. Ein automatisierter [EmpCo Audit](/de/empco-audit/) übernimmt diese Vorarbeit: Er identifiziert kritische Aussagen mit Fundstelle und Regelverweis und liefert eine priorisierte Liste, auf der die juristische Letztprüfung gezielt aufsetzt. Wie sich [manuelle und automatisierte Website-Prüfung](/de/empco-audit/website-green-claims-pruefen/) im Detail vergleichen, zeigt der eigene Beitrag dazu; wer Formulierungen aktiv umbauen will, findet [erlaubte vs. verbotene Aussagen](/de/empco-audit/green-claims-formulieren/) mit Beispielen.',
      ],
    },
  ],
  faqTitle: 'Häufige Fragen zu Greenwashing-Strafen',
  faq: [
    {
      q: 'Welche Strafen drohen bei Verstößen gegen die EmpCo-Richtlinie?',
      a: 'Neben Abmahnungen und Unterlassungsklagen drohen Bußgelder von bis zu 4 % des Jahresumsatzes des Unternehmens (in grenzüberschreitenden Fällen). Reale Beispiele zeigen die Größenordnung: Shein zahlte 1 Mio. €, Armani 3,5 Mio. €, und Apple wurde in Deutschland die „klimaneutral“-Werbung gerichtlich untersagt.',
    },
    {
      q: 'Gilt die EmpCo auch für kleine Unternehmen?',
      a: 'Ja. Anders als bei der CSRD gibt es bei den EmpCo-Werberegeln keine generelle Ausnahme für KMU. Wer Umweltaussagen in Werbung oder auf der Website macht, ist betroffen – unabhängig von der Unternehmensgröße. Die Regeln knüpfen an die Aussage an, nicht an die Bilanzsumme.',
    },
    {
      q: 'Welche Werbebegriffe sind ab 2026 konkret verboten?',
      a: 'Verboten sind pauschale, nicht belegte Umweltaussagen wie „klimaneutral“, „grün“, „nachhaltig“, „umweltfreundlich“, „öko“ oder „biologisch abbaubar“, wenn kein anerkannter, nachprüfbarer Nachweis vorliegt. Ebenfalls verboten: selbst erfundene Nachhaltigkeitssiegel ohne unabhängige Zertifizierung und irreführende Aussagen zur Haltbarkeit (geplante Obsoleszenz).',
    },
    {
      q: 'Kann ich für eine „umweltfreundlich“-Aussage abgemahnt oder verklagt werden?',
      a: 'Ja. Unbelegte oder pauschale Umweltaussagen sind schon heute nach § 5 UWG als Irreführung abmahnfähig – durch Wettbewerber und Verbände. Ab dem 27.09.2026 verschärft die EmpCo-Umsetzung im UWG dies zusätzlich. Belege müssen vorliegen, bevor die Aussage online geht.',
    },
    {
      q: 'Wurde die Green Claims Directive zurückgezogen – was gilt jetzt?',
      a: 'Das wird oft verwechselt. Die Green Claims Directive (der separate Vorschlag mit Vorab-Prüfsystem) wurde im Juni 2025 von der EU-Kommission zurückgezogen. Die EmpCo-Richtlinie (EU 2024/825) ist davon unberührt, bereits beschlossen und gilt ab dem 27. September 2026. Das Greenwashing-Verbot kommt also – nur eben über die EmpCo statt über die Green Claims Directive.',
    },
  ],
  relatedTitle: 'Weiterlesen',
  related: [
    { label: 'EmpCo-Richtlinie 2026: Der Leitfaden mit FAQ und Audit', href: '/de/empco-audit/' },
    { label: 'Abmahnung wegen Greenwashing: Was tun? Kosten, Fristen, Reaktion', href: '/de/empco-audit/abmahnung-greenwashing/' },
    { label: '„Klimaneutral“, „nachhaltig“, „umweltfreundlich“ – welche Werbebegriffe ab 2026 verboten sind', href: '/de/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Green Claims rechtssicher formulieren: erlaubte vs. verbotene Aussagen', href: '/de/empco-audit/green-claims-formulieren/' },
    { label: 'Website auf Green Claims prüfen: EmpCo-Audit manuell vs. automatisiert', href: '/de/empco-audit/website-green-claims-pruefen/' },
  ],
  cta: {
    headline: 'Sie wissen nicht, welche Aussagen auf Ihrer Website kritisch sind?',
    button: 'Kostenlose Probeseite anfordern',
  },
  ctaIdPrefix: 'empco_strafe',
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

export default function GreenwashingStrafe() {
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
