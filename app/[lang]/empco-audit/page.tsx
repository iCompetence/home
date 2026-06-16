import type { Metadata } from 'next'
import EmpCoAuditPage from '@/components/EmpCoAuditPage'
import { alternates, toLang } from '@/lib/i18n-meta'

const meta = {
  de: {
    title: 'EmpCo-Richtlinie 2026: Was Unternehmen wissen müssen | EmpCo Audit',
    description: 'EmpCo-Richtlinie (EU 2024/825) einfach erklärt: gilt ab 27.09.2026, verbotene Green Claims, Bußgelder, FAQ. Plus automatischer EmpCo-Audit für Ihre Website.',
  },
  en: {
    title: 'EmpCo Directive 2026: What companies need to know | EmpCo Audit',
    description: 'The EmpCo Directive (EU 2024/825) explained: applies from 27 Sep 2026, banned green claims, fines, FAQ. Plus an automated EmpCo audit for your website.',
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
    alternates: alternates('empco-audit', lang),
    robots: { index: true, follow: true },
  }
}

// EmpCo SEO FAQ — German (the primary SEO target for this URL). Rendered server-side
// so the FAQPage / HowTo structured data is in the crawlable static HTML. The text is
// kept identical to the German answers shown in the FAQ accordion (Google policy:
// JSON-LD must match the visible content).
const empcoFaqDe: { q: string; a: string }[] = [
  { q: 'Was ist die EmpCo-Richtlinie?', a: 'Die EmpCo-Richtlinie (Directive (EU) 2024/825, „Empowering Consumers for the Green Transition“) ist ein EU-Gesetz gegen Greenwashing. Sie ändert die UGP-Richtlinie (2005/29/EG) und die Verbraucherrechte-Richtlinie (2011/83/EU) und verbietet irreführende Umweltaussagen sowie unbelegte Nachhaltigkeitssiegel in der Werbung gegenüber Verbraucherinnen und Verbrauchern. Die Richtlinie ist seit März 2024 in Kraft.' },
  { q: 'Ab wann gilt die EmpCo-Richtlinie?', a: 'Die EmpCo-Richtlinie gilt verbindlich ab dem 27. September 2026. Die EU-Mitgliedstaaten müssen sie bis zum 27. März 2026 in nationales Recht umsetzen. Eine Übergangsfrist für bereits im Markt befindliche Produkte gibt es nicht – ab dem Stichtag müssen alle kommerziellen Aussagen den neuen Regeln entsprechen.' },
  { q: 'Welche Unternehmen betrifft die EmpCo?', a: 'Die EmpCo betrifft alle Unternehmen, die Produkte oder Dienstleistungen an Verbraucher in der EU vermarkten – unabhängig von Branche, Unternehmensgröße oder Firmensitz. Auch kleine und mittlere Unternehmen sowie Anbieter aus Drittländern fallen darunter, sobald sie EU-Konsumenten ansprechen. Reine B2B-Kommunikation ist nicht direkt erfasst, faktisch aber oft mitbetroffen.' },
  { q: 'Was sind Green Claims?', a: 'Green Claims sind umweltbezogene Werbeaussagen – also Angaben, die einem Produkt, einer Dienstleistung oder einem Unternehmen einen ökologischen Vorteil zuschreiben, etwa „klimaneutral“, „aus recyceltem Material“ oder „plastikfrei“. Die EmpCo-Richtlinie regelt, unter welchen Bedingungen solche Green Claims gegenüber Verbrauchern zulässig sind und welche pauschalen Aussagen verboten werden.' },
  { q: 'Welche Umweltaussagen verbietet die EmpCo?', a: 'Verboten sind pauschale Umweltaussagen ohne Nachweis – etwa „umweltfreundlich“, „klimaneutral“, „nachhaltig“, „grün“, „ökologisch“, „biologisch abbaubar“ oder „klimapositiv“. Ebenfalls unzulässig sind Klimaneutralitäts-Aussagen, die auf CO₂-Kompensation beruhen, Nachhaltigkeitssiegel ohne unabhängige Zertifizierung sowie Versprechen über künftige Umweltleistung ohne überprüfbare, öffentliche Zwischenziele.' },
  { q: 'Ist „klimaneutral“ ab 2026 noch erlaubt?', a: 'Nur mit echtem Reduktionsnachweis. „Klimaneutral“ bleibt zulässig, wenn die Aussage auf der tatsächlichen Reduktion der Emissionen im Lebenszyklus beruht und belastbar belegt ist. Verboten ist Werbung mit Klimaneutralität, die ausschließlich oder überwiegend auf CO₂-Kompensation (Offsetting) gestützt wird. Aussagen wie „klimaneutral durch Kompensation“ sind ab dem 27. September 2026 nicht mehr erlaubt.' },
  { q: 'Was passiert mit Nachhaltigkeitssiegeln?', a: 'Nachhaltigkeitssiegel dürfen ab 2026 nur noch mit zertifizierter, unabhängig geprüfter Grundlage verwendet werden – oder wenn sie von einer Behörde eingeführt wurden. Selbst erstellte Logos und Siegel ohne transparente, geprüfte Kriterien müssen aus Werbung, Verpackung und Website entfernt werden.' },
  { q: 'Was ist der Unterschied zwischen EmpCo und der Green Claims Directive?', a: 'Die EmpCo setzt einen Mindeststandard und verbietet irreführende Umweltaussagen generell; sie gilt ab September 2026. Die Green Claims Directive (GCD) war als detaillierteres Regelwerk geplant, das eine verpflichtende externe Vorab-Prüfung („ex ante“) jeder grünen Aussage gefordert hätte. Die GCD wurde 2025 gestoppt – die EmpCo gilt davon unabhängig weiter.' },
  { q: 'Wurde die Green Claims Directive zurückgezogen – was gilt jetzt?', a: 'Ja – die EU-Kommission hat die GCD im Juni 2025 zur Rücknahme angekündigt, vor allem wegen des hohen Prüfaufwands für Unternehmen. Für die Praxis ändert das wenig: Die EmpCo-Richtlinie gilt weiterhin und verpflichtet ab dem 27. September 2026 dazu, jede Umweltaussage belegen zu können.' },
  { q: 'Welche Strafen drohen bei Verstößen gegen die EmpCo?', a: 'Bei Verstößen drohen Abmahnungen, Unterlassungsklagen und Bußgelder von bis zu 4 % des Jahresumsatzes in den betroffenen Mitgliedstaaten. Abmahnen können Wettbewerber und Verbände. Hinzu kommen Reputationsschäden und die Pflicht, beanstandete Werbung zu korrigieren oder zurückzuziehen.' },
  { q: 'Wie wird die EmpCo in Deutschland umgesetzt?', a: 'Deutschland setzt die EmpCo über eine Änderung des Gesetzes gegen den unlauteren Wettbewerb (UWG) um. Die verbotenen Praktiken werden in die „schwarze Liste“ stets unzulässiger Geschäftspraktiken aufgenommen. Maßgeblich für Unternehmen ist der EU-weite Geltungsbeginn am 27. September 2026.' },
  { q: 'Gibt es eine Übergangsfrist für Bestandsprodukte?', a: 'Nein, eine Übergangsfrist gibt es nicht. Ab dem 27. September 2026 müssen sämtliche Umweltaussagen – auf Verpackungen, Websites, in Werbung und im Online-Shop – den neuen Anforderungen entsprechen. Unternehmen sollten Bestände und Kommunikationsmittel rechtzeitig prüfen.' },
  { q: 'Was müssen Unternehmen jetzt konkret tun?', a: 'Alle Umweltaussagen inventarisieren und vor dem Stichtag prüfen. Pauschale Claims streichen oder mit Nachweisen unterlegen, nicht zertifizierte Siegel entfernen und kompensationsbasierte Klimaaussagen überarbeiten. Sinnvoll sind ein fester Freigabeprozess zwischen Marketing, Recht und Nachhaltigkeit sowie ein Audit der Außenkommunikation – die 5 Schritte oben fassen das Vorgehen zusammen.' },
]

const empcoStepsDe: { name: string; text: string }[] = [
  { name: 'Bestandsaufnahme', text: 'Alle Umweltaussagen auf Website, Verpackung, Online-Shop und in Werbung erfassen.' },
  { name: 'Pauschalclaims streichen oder belegen', text: '„nachhaltig“, „klimaneutral“ & Co. entfernen oder mit belastbaren Nachweisen unterlegen.' },
  { name: 'Siegel prüfen', text: 'Nicht zertifizierte Eigen-Siegel ohne unabhängige Grundlage entfernen.' },
  { name: 'Klimaaussagen überarbeiten', text: 'Kompensationsbasierte „klimaneutral“-Claims durch echte Reduktionsnachweise ersetzen.' },
  { name: 'Freigabeprozess etablieren', text: 'Jede grüne Aussage gemeinsam von Marketing, Recht und Nachhaltigkeit freigeben lassen.' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: empcoFaqDe.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'de',
  name: 'In 5 Schritten EmpCo-konform werden',
  description:
    'Vorgehen, um die Nachhaltigkeitskommunikation bis zum Geltungsbeginn der EmpCo-Richtlinie am 27. September 2026 rechtskonform zu machen.',
  step: empcoStepsDe.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
  })),
}

export default async function EmpCoAudit({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const lang = toLang((await params).lang)
  return (
    <>
      {/* German FAQ/HowTo structured data only on the German URL — the JSON-LD
          text is German and must match the visible (German) content. */}
      {lang === 'de' && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
          />
        </>
      )}
      <EmpCoAuditPage initialLanguage={lang} />
    </>
  )
}
