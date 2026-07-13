import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'

// Cluster page #6 (Content-Matrix): Cluster C – Recht/Unternehmer, BOFU, Prio Hoch.
// Primär-Keyword: "abmahnung greenwashing"
// Sekundär: "greenwashing abmahnung kosten", "uwg umweltwerbung abmahnung"
// German-only (DACH focus) — no /en variant yet, so no en hreflang.

export async function generateStaticParams() {
  return [{ lang: 'de' }]
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: 'Abmahnung wegen Greenwashing: Was tun? Kosten, Fristen, Reaktion | iCompetence',
  description:
    'Abmahnung wegen Greenwashing erhalten? Ablauf, Kosten und Fristen im Überblick – § 5 UWG, EmpCo-Richtlinie ab 27.09.2026 – und wie Sie die nächste Abmahnung vermeiden.',
  alternates: {
    canonical: '/de/empco-audit/abmahnung-greenwashing/',
    languages: {
      de: '/de/empco-audit/abmahnung-greenwashing/',
      'x-default': '/de/empco-audit/abmahnung-greenwashing/',
    },
  },
  robots: { index: true, follow: true },
}

const content: EmpCoClusterContent = {
  title: 'Abmahnung wegen Greenwashing: Was tun?',
  quote: {
    text: '„Die CO₂-Kompensations-Mogelpackung: Dein Angebot als ‚klimaneutral‘ zu bezeichnen, nur weil Du Zertifikate kaufst oder Bäume pflanzt, wird illegal.“',
    source: 'Diskussion auf Reddit, r/selbststaendig',
  },
  intro: [
    'Eine Abmahnung wegen einer Umweltaussage trifft die meisten Unternehmen unvorbereitet: Ein Wettbewerber oder ein Verband beanstandet eine Formulierung wie „klimaneutral“, „nachhaltig“ oder „umweltfreundlich“ auf der Website, im Shop oder in einer Anzeige – und verlangt Unterlassung, oft verbunden mit einer kurzen Frist und einer Kostennote.',
    'Diese Seite erklärt, warum Greenwashing-Abmahnungen gerade jetzt zunehmen, was in einer Abmahnung steht, wie Sie richtig reagieren – und wie Sie verhindern, dass die nächste kommt. Sie ersetzt keine Rechtsberatung im Einzelfall, gibt Ihnen aber die Orientierung, die in Foren wie r/de unter dem Titel „EU macht Greenwashing für Firmen zum Millionenrisiko“ heiß diskutiert wird.',
  ],
  sections: [
    {
      id: 'warum-jetzt',
      heading: 'Warum Greenwashing-Abmahnungen jetzt zunehmen',
      paragraphs: [
        'Unbelegte oder pauschale Umweltaussagen sind schon heute nach § 5 UWG als Irreführung abmahnfähig – durch Wettbewerber und Verbände. Wer mit „umweltfreundlich“ oder „klimaneutral“ wirbt, ohne das belegen zu können, riskiert also bereits jetzt eine Abmahnung, ganz ohne neue EU-Regeln.',
        'Ab dem 27. September 2026 verschärft sich die Lage deutlich: Dann gilt die [EmpCo-Richtlinie (EU 2024/825)](/de/empco-audit/) EU-weit. Deutschland setzt sie über das Dritte Gesetz zur Änderung des UWG um, verkündet im Bundesgesetzblatt am 19. Februar 2026. Pauschale Umweltaussagen ohne Nachweis wandern damit in die „schwarze Liste“ stets unzulässiger Geschäftspraktiken – die Erfolgsaussichten einer Abmahnung steigen, der Argumentationsspielraum des Abgemahnten schrumpft.',
        'Die Rechtsprechung ist bereits vorgeprescht: Der BGH hat entschieden, dass mit „klimaneutral“ nur geworben werden darf, wenn der Begriff im Werbeumfeld klar erläutert wird. Und die Behörden ziehen nach – Shein zahlte 1 Mio. €, Armani 3,5 Mio. €, und Apple wurde in Deutschland die „klimaneutral“-Werbung für die Apple Watch gerichtlich untersagt. [Welche Bußgelder in der EU drohen](/de/empco-audit/greenwashing-strafe/), zeigt die Fallübersicht im Detail.',
      ],
    },
    {
      id: 'inhalt-kosten',
      heading: 'Was in einer Abmahnung steht – und was sie kostet',
      paragraphs: [
        'Eine wettbewerbsrechtliche Abmahnung enthält typischerweise drei Dinge: die Beschreibung des beanstandeten Verstoßes (die konkrete Umweltaussage mit Fundstelle), eine vorformulierte strafbewehrte Unterlassungserklärung und eine Frist, innerhalb derer Sie reagieren sollen.',
        // TODO: juristisch prüfen — Kostenbestandteile/Gegenstandswert-Logik ist allgemeines
        // Wettbewerbsrecht und nicht durch die Strategie-Quellen (§8) belegt. Vor Livegang
        // durch Anwalt verifizieren oder streichen.
        'Dazu kommt in der Regel eine Kostennote: Der Abmahnende verlangt Ersatz seiner Anwaltskosten. Die konkrete Höhe hängt vom Einzelfall ab. Wirtschaftlich relevanter als die Abmahnkosten selbst ist meist die Unterlassungserklärung – denn bei jedem späteren Verstoß gegen die abgegebene Erklärung wird eine empfindliche Vertragsstrafe fällig.',
        'Zur Einordnung der Größenordnungen: Die Abmahnung ist das mildere Instrument. Bei Verstößen gegen die EmpCo-Regeln drohen daneben Bußgelder von bis zu 4 % des Jahresumsatzes des Unternehmens (in grenzüberschreitenden Fällen), außerdem Unterlassungsklagen, Reputationsschäden und die Pflicht, beanstandete Werbung zu korrigieren oder zurückzuziehen.',
      ],
      table: {
        primaryHeader: 'Abmahnung',
        secondaryHeader: 'Bußgeldverfahren',
        rows: [
          {
            feature: 'Wer geht vor?',
            primary: 'Wettbewerber und Verbände',
            secondary: 'Behörden',
          },
          {
            feature: 'Rechtsgrundlage',
            primary: '§ 5 UWG (Irreführung)',
            secondary: 'EmpCo-Umsetzung im UWG (ab 27.09.2026)',
          },
          {
            feature: 'Typische Folge',
            primary: 'Unterlassungserklärung + Kostenerstattung',
            secondary: 'Bußgeld bis zu 4 % des Jahresumsatzes (grenzüberschreitende Fälle)',
          },
        ],
      },
    },
    {
      id: 'reaktion',
      heading: 'Erste Reaktion: die wichtigsten Schritte nach Erhalt',
      paragraphs: [
        'Die Reddit-Frage „Got an Abmahnung for ‚klimaneutral‘ – what now?“ steht stellvertretend für die typische Schrecksekunde. Bewährt hat sich dieses Vorgehen – es ersetzt keine anwaltliche Prüfung, verhindert aber die häufigsten Fehler:',
      ],
      bullets: [
        'Frist notieren und ernst nehmen: Abmahnfristen sind kurz bemessen. Wer sie verstreichen lässt, riskiert eine einstweilige Verfügung – und damit deutlich höhere Kosten.',
        'Nichts vorschnell unterschreiben: Die beigefügte Unterlassungserklärung ist im Zweifel weiter gefasst, als es der Verstoß erfordert. Ob und in welcher Form sie abgegeben wird, gehört in anwaltliche Beratung.',
        'Die beanstandete Aussage dokumentieren: Screenshot mit Datum und URL sichern, bevor Sie etwas ändern – Sie brauchen den Stand für die rechtliche Bewertung.',
        'Belegfrage klären: Gibt es für die Aussage einen belastbaren, nachprüfbaren Nachweis? Ohne Beleg ist die Verteidigung schwach; Belege müssen vorliegen, bevor eine Aussage online geht.',
        'Den Rest der Website prüfen: Wer eine angreifbare Aussage findet, findet meist weitere. Eine [systematische Prüfung aller Seiten](/de/empco-audit/website-green-claims-pruefen/) verhindert die Folge-Abmahnung.',
      ],
    },
    {
      id: 'risiko-einschaetzung',
      heading: 'Wie realistisch ist das Risiko? Ein Blick in die öffentliche Diskussion',
      paragraphs: [
        'Wer einschätzen will, wie wahrscheinlich eine Abmahnung ist, sollte nicht nur auf Gerichte schauen, sondern auf die Öffentlichkeit, die Verstöße meldet. Die Greenwashing-Diskussion ist riesig – sie läuft nur selten unter dem Begriff „EmpCo“: In r/Anticonsumption sammelt der Thread „What are some examples of greenwashing you’ve seen?“ über 270 Kommentare, in r/ZeroWaste diskutieren mehr als 530 Kommentatoren, warum die Nachhaltigkeits-Community Herstellerangaben grundsätzlich misstraut, und in r/science wurde eine Untersuchung mit der Schlagzeile diskutiert, 98 % der geprüften Umweltaussagen seien irreführendes Greenwashing.',
        'Diese Skepsis ist der Nährboden, auf dem Wettbewerber und Verbände Verstöße finden: Was Verbraucher öffentlich als Greenwashing markieren, ist für einen Abmahner leicht zu verwerten. Je sichtbarer eine Marke mit grünen Claims wirbt, desto genauer schaut die Gegenseite hin.',
      ],
      subsections: [
        {
          heading: 'Sonderfall kleine Unternehmen: keine Ausnahme, aber besondere Härte',
          paragraphs: [
            'Anders als bei der CSRD gibt es bei den EmpCo-Werberegeln keine generelle Ausnahme für KMU: Die Regeln knüpfen an die Aussage an, nicht an die Bilanzsumme. Für kleine Unternehmen trifft eine Abmahnung dabei besonders hart – die Kosten und der Aufwand fallen ins Gewicht, und oft ist die beanstandete Aussage aus ehrlicher Überzeugung entstanden. In r/SustainableFashion beschreibt eine Kleinunternehmerin mit natürlich gefärbten Waren ihre Wut über die neue Regulierung in einem Thread mit über 300 Kommentaren: „I’m a small business owner… and I’m PISSED“.',
            'Die Konsequenz daraus ist nicht, auf Nachhaltigkeitskommunikation zu verzichten – sondern sie belegbar zu machen, bevor jemand anderes sie prüft.',
          ],
        },
      ],
    },
    {
      id: 'vermeiden',
      heading: 'Wie Sie die nächste Abmahnung vermeiden',
      paragraphs: [
        'Die eigentliche Ursache einer Greenwashing-Abmahnung ist selten böser Wille, sondern fehlender Überblick: Umweltaussagen sammeln sich über Jahre auf Produktseiten, in Landingpages und im Shop an – und niemand weiß mehr, was wo steht. Die Regeln gelten aber für alle Aussagen, die ab dem Stichtag öffentlich sind, auch für Bestandsinhalte.',
        'Drei Bausteine reduzieren das Risiko dauerhaft:',
      ],
      bullets: [
        'Bestandsaufnahme: alle Umweltaussagen auf Website, Verpackung und im Online-Shop erfassen – inklusive Siegel und Produkttexten. [Welche Werbebegriffe ab 2026 verboten sind](/de/empco-audit/klimaneutral-werben-verboten/), liefert die Checkliste dafür.',
        'Aussagen rechtssicher formulieren: pauschale Claims streichen oder mit Nachweisen unterlegen. Konkrete [erlaubte vs. verbotene Formulierungen](/de/empco-audit/green-claims-formulieren/) zeigen, wie das aussieht.',
        'Freigabeprozess etablieren: jede grüne Aussage gemeinsam von Marketing, Recht und Nachhaltigkeit freigeben lassen, bevor sie live geht.',
      ],
    },
    {
      id: 'audit',
      heading: 'Der schnellste Weg zum Überblick: automatisierter EmpCo-Audit',
      paragraphs: [
        'Manuell lesen mehrere Abteilungen die Website Seite für Seite, sammeln Aussagen und gleichen sie mit Belegen ab – branchenüblich ein mittlerer bis hoher fünfstelliger Aufwand. Genau diese Vorarbeit übernimmt der [EmpCo Audit](/de/empco-audit/): Er identifiziert kritische Aussagen mit Fundstelle und Regelverweis und liefert eine priorisierte, belegpflichtige Liste, auf der die juristische Letztprüfung gezielt aufsetzt.',
        'Der Audit ersetzt nicht den Anwalt – er ersetzt die wochenlange manuelle Vorarbeit davor. Nach einer Abmahnung verschafft er in Stunden den vollständigen Überblick, den Sie für die Reaktion und die Bereinigung der restlichen Website brauchen.',
      ],
    },
  ],
  faqTitle: 'Häufige Fragen zur Greenwashing-Abmahnung',
  faq: [
    {
      q: 'Kann ich für eine „umweltfreundlich“-Aussage abgemahnt oder verklagt werden?',
      a: 'Ja. Unbelegte oder pauschale Umweltaussagen sind schon heute nach § 5 UWG als Irreführung abmahnfähig – durch Wettbewerber und Verbände. Ab dem 27.09.2026 verschärft die EmpCo-Umsetzung im UWG dies zusätzlich. Belege müssen vorliegen, bevor die Aussage online geht.',
    },
    {
      q: 'Wer darf wegen Greenwashing abmahnen?',
      a: 'Abmahnen können Wettbewerber und Verbände. Grundlage ist das Gesetz gegen den unlauteren Wettbewerb (UWG): Irreführende Umweltaussagen verstoßen gegen § 5 UWG, ab dem 27. September 2026 greifen zusätzlich die über die EmpCo-Richtlinie in das UWG aufgenommenen Verbote.',
    },
    {
      q: 'Welche Strafen drohen bei Verstößen gegen die EmpCo-Richtlinie?',
      a: 'Neben Abmahnungen und Unterlassungsklagen drohen Bußgelder von bis zu 4 % des Jahresumsatzes des Unternehmens (in grenzüberschreitenden Fällen). Reale Beispiele zeigen die Größenordnung: Shein zahlte 1 Mio. €, Armani 3,5 Mio. €, und Apple wurde in Deutschland die „klimaneutral“-Werbung gerichtlich untersagt.',
    },
    {
      q: 'Muss ich alte Website-Seiten und Bestandsinhalte auch prüfen?',
      a: 'Ja. Die Regeln gelten für alle Aussagen, die ab dem Stichtag öffentlich sind – auch für über Jahre gewachsene Bestandsseiten, Produkttexte und Landingpages. Genau hier liegt das Hauptproblem: Die meisten Unternehmen wissen nicht, was auf hunderten eigenen Seiten steht. Ein automatisierter Audit verschafft hier in Stunden einen vollständigen Überblick.',
    },
    {
      q: 'Ist „klimaneutral“ ab 2026 noch erlaubt?',
      a: 'Ja, aber nur unter strengen Bedingungen. Verboten ist ab dem 27. September 2026 die pauschale Produktaussage „klimaneutral“, wenn sie allein auf CO₂-Kompensation (Offsetting) beruht. Erlaubt bleiben Aussagen, die auf tatsächlichen Emissionsreduktionen in der Wertschöpfungskette basieren und nachprüfbar belegt sind. Schon heute hat der BGH entschieden, dass mit „klimaneutral“ nur geworben werden darf, wenn der Begriff im Werbeumfeld klar erläutert wird.',
    },
  ],
  relatedTitle: 'Weiterlesen',
  related: [
    { label: 'EmpCo-Richtlinie 2026: Der Leitfaden mit FAQ und Audit', href: '/de/empco-audit/' },
    { label: 'Greenwashing-Bußgelder in der EU: bis zu 4 % vom Jahresumsatz – die Fälle', href: '/de/empco-audit/greenwashing-strafe/' },
    { label: '„Klimaneutral“, „nachhaltig“, „umweltfreundlich“ – welche Werbebegriffe ab 2026 verboten sind', href: '/de/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Green Claims rechtssicher formulieren: erlaubte vs. verbotene Aussagen', href: '/de/empco-audit/green-claims-formulieren/' },
    { label: 'Website auf Green Claims prüfen: EmpCo-Audit manuell vs. automatisiert', href: '/de/empco-audit/website-green-claims-pruefen/' },
  ],
  cta: {
    headline: 'Sie wissen nicht, welche Aussagen auf Ihrer Website kritisch sind?',
    button: 'Kostenlose Probeseite anfordern',
  },
  ctaIdPrefix: 'empco_abmahnung',
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

export default function AbmahnungGreenwashing() {
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
