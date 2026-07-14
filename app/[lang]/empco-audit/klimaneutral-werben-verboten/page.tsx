import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'
import { alternates, toLang, type Lang } from '@/lib/i18n-meta'

// Cluster page #4 (Content-Matrix): Cluster B – Marketing & Agenturen, MOFU, Prio Hoch.
// Primär-Keyword: "klimaneutral werben verboten"
// Sekundär: "verbotene umweltaussagen 2026", "green claims werbung"
// The /en variant is a 1:1 translation (accessibility); legal statements are
// shared between both languages, so the German legal review covers both.

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }]
}

export const dynamicParams = false

const meta: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'Klimaneutral werben verboten? Diese Werbebegriffe sind ab 2026 tabu | iCompetence',
    description:
      'Verbotene Umweltaussagen 2026: „klimaneutral“, „nachhaltig“, „umweltfreundlich“ & Co. sind ab 27.09.2026 ohne Nachweis unzulässig. Die Begriffsliste, der BGH-Kontext und was erlaubt bleibt.',
  },
  en: {
    title: 'Advertising “climate-neutral” banned? These advertising terms are off-limits from 2026 | iCompetence',
    description:
      'Banned environmental claims 2026: “climate-neutral”, “sustainable”, “eco-friendly” & co. are impermissible without proof from 27 Sep 2026. The list of terms, the BGH context and what remains allowed.',
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
    alternates: alternates('empco-audit/klimaneutral-werben-verboten', lang),
    robots: { index: true, follow: true },
  }
}

const contentDe: EmpCoClusterContent = {
  title: '„Klimaneutral“, „nachhaltig“, „umweltfreundlich“ – welche Werbebegriffe ab 2026 verboten sind',
  quote: {
    text: '„‚Clean‘, ‚sustainable‘ und ‚green‘ sind keine regulierten Begriffe.“ – Top-Kommentar in r/BeautyGuruChatter. Das stimmte lange. Ab dem 27. September 2026 stimmt es nicht mehr.',
    source: 'Diskussion auf Reddit, r/BeautyGuruChatter',
  },
  intro: [
    '**Ab dem 27. September 2026 sind pauschale, nicht belegte Umweltaussagen wie „klimaneutral“, „nachhaltig“, „umweltfreundlich“, „grün“, „öko“, „biologisch abbaubar“ und „klimapositiv“ in der Werbung verboten – „klimaneutral“ zusätzlich immer dann, wenn die Aussage allein auf CO₂-Kompensation beruht.** So regelt es die [EmpCo-Richtlinie (EU 2024/825)](/de/empco-audit/) – EU-weit und ohne Übergangsfrist für Bestandsinhalte.',
    '„Darf ich noch mit ‚klimaneutral‘ werben?“ – die Frage beschäftigt Marketing-Teams und Agenturen im gesamten DACH-Raum. Diese Seite listet auf, welche Werbebegriffe konkret betroffen sind, warum „klimaneutral“ der schärfste Sonderfall ist, was weiterhin erlaubt bleibt – und wie Sie Ihre bestehenden Texte rechtzeitig umstellen.',
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
      id: 'herkunft',
      heading: 'Wie es zu den Verboten kam',
      paragraphs: [
        'Die Begriffsverbote fallen nicht vom Himmel: Die EmpCo-Richtlinie ist seit März 2024 in Kraft und ändert die UGP-Richtlinie (2005/29/EG) sowie die Verbraucherrechte-Richtlinie (2011/83/EU). Ihr Kern ist die Beweislast-Logik – wer gegenüber Verbrauchern mit Umweltvorteilen wirbt, muss sie belegen können, bevor die Aussage öffentlich wird.',
        'Häufige Verwechslung dabei: Die Green Claims Directive, der separate und deutlich detailliertere Vorschlag mit verpflichtender Vorab-Prüfung jeder grünen Aussage, wurde im Juni 2025 von der EU-Kommission zurückgezogen. An den Begriffsverboten ändert das nichts – sie kommen über die EmpCo, nicht über die Green Claims Directive.',
        'Und der Reddit-Frage „Is ‚biodegradable‘ even regulated?“ lässt sich damit eine präzise Antwort geben: Ab dem 27. September 2026 ja – „biologisch abbaubar“ steht ausdrücklich auf der Liste der ohne Nachweis unzulässigen Aussagen.',
      ],
    },
    {
      id: 'branchen',
      heading: 'Wo die Begriffe im Alltag auffallen: Beispiele aus den Foren',
      paragraphs: [
        'Wie flächendeckend pauschale Umweltbegriffe im Einsatz sind, zeigt die Verbraucherdiskussion – die Threads sind zugleich eine Vorschau darauf, welche Branchen besonders im Fokus stehen:',
      ],
      bullets: [
        'Verpackung: In r/sustainability macht sich ein Thread über einzeln in Plastik verpackte Socken mit Nachhaltigkeits-Branding lustig (70+ Kommentare) – das klassische Auseinanderfallen von Botschaft und Produkt.',
        'Textil: In r/knitting ärgern sich über 170 Kommentatoren über das „Greenwashing rund um Bambus-Garn“ – ein Material, das pauschal als öko vermarktet wird.',
        'Beauty: In r/BeautyGuruChatter gilt „clean“ als Paradebeispiel für einen wohlklingenden, bislang unregulierten Begriff.',
        'Mode: „Is this greenwashing?“-Posts mit Produktfotos sind in r/ethicalfashion ein wiederkehrendes Format – Verbraucher prüfen Claims längst selbst.',
      ],
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

const contentEn: EmpCoClusterContent = {
  title: '“Climate-neutral”, “sustainable”, “eco-friendly” – which advertising terms are banned from 2026',
  quote: {
    text: '“‘Clean’, ‘sustainable’ and ‘green’ are not regulated terms.” – top comment in r/BeautyGuruChatter. That was true for a long time. From 27 September 2026 it no longer is.',
    source: 'Discussion on Reddit, r/BeautyGuruChatter',
  },
  intro: [
    '**From 27 September 2026, generic, unsubstantiated environmental claims such as “climate-neutral”, “sustainable”, “eco-friendly”, “green”, “eco”, “biodegradable” and “climate-positive” are banned in advertising – “climate-neutral” additionally whenever the claim rests solely on carbon offsetting.** This is how the [EmpCo Directive (EU 2024/825)](/en/empco-audit/) regulates it – EU-wide and with no transition period for existing content.',
    '“Can I still advertise with ‘climate-neutral’?” – the question occupies marketing teams and agencies across the DACH region. This page lists which advertising terms are specifically affected, why “climate-neutral” is the sharpest special case, what remains permitted – and how to convert your existing copy in time.',
  ],
  sections: [
    {
      id: 'begriffsliste',
      heading: 'The list of terms: what is banned without proof',
      paragraphs: [
        'From the cut-off date, generic, unsubstantiated environmental claims are banned. These include in particular:',
      ],
      bullets: [
        '“climate-neutral” – as a generic product claim, especially where it rests solely on carbon offsetting',
        '“eco-friendly” / “environmentally friendly”',
        '“sustainable”',
        '“green”',
        '“eco” / “ecological”',
        '“biodegradable”',
        '“climate-positive”',
      ],
      subsections: [
        {
          heading: 'Also impermissible: three claim categories',
          bullets: [
            'Offsetting-based climate-neutrality advertising: claims like “climate-neutral through offsetting” are no longer allowed from 27 September 2026.',
            'Sustainability labels without independent certification: self-designed “eco” or “trust” labels must be removed from advertising, packaging and websites.',
            'Promises about future environmental performance without verifiable, public interim targets – likewise misleading claims about durability (planned obsolescence).',
          ],
        },
      ],
    },
    {
      id: 'klimaneutral-sonderfall',
      heading: '“Climate-neutral”: the special case with a history',
      paragraphs: [
        'No term is as central to enforcement as “climate-neutral”. The German Federal Court of Justice (BGH) has already ruled that it may only be used in advertising if the term is clearly explained in the advertising context. And the most prominent case comes from Germany: a court banned Apple from advertising the Apple Watch as “carbon neutral” – on Reddit one of the most-discussed greenwashing threads of all.',
        'The background is offsetting scepticism: carbon offsets are not a scam per se, but they are under heavy criticism because their actual climate impact is often hard to measure and sometimes overstated. This is exactly why EmpCo draws its clearest line here – from 2026, offsetting alone no longer suffices as the basis of a climate-neutrality claim. [Which fines apply for violations](/en/empco-audit/greenwashing-strafe/) is shown by the Shein, Armani and Apple cases.',
      ],
    },
    {
      id: 'was-bleibt-erlaubt',
      heading: 'Not banned: specific, substantiated claims',
      paragraphs: [
        'EmpCo does not ban environmental communication – it bans the unsubstantiated generic claim. Whoever gets specific and secures the evidence beforehand may continue to advertise environmental properties. The overview:',
      ],
      table: {
        primaryHeader: 'Without proof',
        secondaryHeader: 'With verifiable evidence',
        rows: [
          {
            feature: '“sustainable”, “eco-friendly”, “green”, “eco”',
            primary: 'Banned',
            secondary: 'Permitted if concrete and substantiated',
          },
          {
            feature: '“Climate-neutral” based on offsetting',
            primary: 'Banned',
            secondary: 'Remains banned – offsetting alone never suffices',
          },
          {
            feature: '“Climate-neutral” based on reductions',
            primary: 'Banned without proof',
            secondary: 'Permitted with reduction evidence and explanation',
          },
          {
            feature: 'Sustainability labels',
            primary: 'Own labels banned',
            secondary: 'Certified or officially established: permitted',
          },
          {
            feature: 'Future promises (“by 2030 …”)',
            primary: 'Banned',
            secondary: 'Permitted with verifiable, public interim targets',
          },
        ],
      },
    },
    {
      id: 'herkunft',
      heading: 'How the bans came about',
      paragraphs: [
        'The term bans do not come out of nowhere: the EmpCo Directive has been in force since March 2024 and amends the Unfair Commercial Practices Directive (2005/29/EC) and the Consumer Rights Directive (2011/83/EU). Its core is the burden-of-proof logic – whoever advertises environmental benefits to consumers must be able to prove them before the claim becomes public.',
        'A common source of confusion: the Green Claims Directive, the separate and much more detailed proposal with mandatory ex-ante verification of every green claim, was withdrawn by the European Commission in June 2025. That changes nothing about the term bans – they arrive via EmpCo, not via the Green Claims Directive.',
        'And the Reddit question “Is ‘biodegradable’ even regulated?” can now be answered precisely: from 27 September 2026, yes – “biodegradable” is explicitly on the list of claims that are impermissible without proof.',
      ],
    },
    {
      id: 'branchen',
      heading: 'Where the terms show up in everyday life: examples from the forums',
      paragraphs: [
        'How widespread generic environmental terms are is shown by the consumer discussion – the threads are also a preview of which industries are particularly in focus:',
      ],
      bullets: [
        'Packaging: in r/sustainability, a thread mocks individually plastic-wrapped socks with sustainability branding (70+ comments) – the classic gap between message and product.',
        'Textiles: in r/knitting, over 170 commenters are annoyed about the “greenwashing around bamboo yarn” – a material generically marketed as eco.',
        'Beauty: in r/BeautyGuruChatter, “clean” is the textbook example of a nice-sounding, previously unregulated term.',
        'Fashion: “Is this greenwashing?” posts with product photos are a recurring format in r/ethicalfashion – consumers have long been checking claims themselves.',
      ],
    },
    {
      id: 'zeitplan',
      heading: 'Timeline and legal framework: the dates that matter',
      bullets: [
        'Since March 2024: the EmpCo Directive (EU 2024/825) is in force.',
        'By 27 March 2026: deadline for EU member states to transpose it into national law.',
        '19 February 2026: Germany publishes the Third Act Amending the UWG in the Federal Law Gazette.',
        'From 27 September 2026: the new rules apply bindingly – with no transition period for products or claims already on the market.',
        'Already today: unsubstantiated environmental claims are [actionable](/en/empco-audit/abmahnung-greenwashing/) as misleading under Section 5 UWG – through competitors and associations.',
      ],
      paragraphs: [
        'For planning campaigns, packaging and website relaunches this means: everything produced now that is still public on 27 September 2026 must already comply with the new rules.',
      ],
    },
    {
      id: 'jetzt-handeln',
      heading: 'What marketing teams should do now',
      bullets: [
        'Inventory: record all environmental claims on the website, packaging, in the shop and in running campaigns.',
        'Rewrite instead of delete: replace generic claims with specific, substantiated statements – [with the permitted-vs.-banned examples](/en/empco-audit/green-claims-formulieren/) as a template.',
        'Clean up labels: remove non-certified own labels.',
        'Check the existing content systematically: [go through the entire website for green claims](/en/empco-audit/website-green-claims-pruefen/) – automated in hours instead of manually in weeks.',
        'Establish an approval process: have every green claim jointly approved by marketing, legal and sustainability before publication.',
      ],
    },
  ],
  faqTitle: 'Frequently asked questions about banned advertising terms',
  faq: [
    {
      q: 'Is “climate-neutral” still allowed from 2026?',
      a: 'Yes, but only under strict conditions. From 27 September 2026, the generic product claim “climate-neutral” is banned if it rests solely on carbon offsetting. Claims based on actual emission reductions in the value chain that are verifiably substantiated remain permitted. The German Federal Court of Justice (BGH) has already ruled that “climate-neutral” may only be used in advertising if the term is clearly explained in the advertising context.',
    },
    {
      q: 'Which advertising terms are specifically banned from 2026?',
      a: 'Banned are generic, unsubstantiated environmental claims such as “climate-neutral”, “green”, “sustainable”, “eco-friendly”, “eco” or “biodegradable” where no recognised, verifiable proof exists. Also banned: self-invented sustainability labels without independent certification and misleading claims about durability (planned obsolescence).',
    },
    {
      q: 'What happens to sustainability labels and own labels?',
      a: 'From 2026, sustainability labels are only permissible if they are based on a recognised certification scheme or were established by a public authority. Self-designed “trust” or “eco” labels without independent third-party verification are no longer allowed.',
    },
    {
      q: 'Is there a transition period for existing products?',
      a: 'No, there is no transition period. From 27 September 2026, all environmental claims – on packaging, websites, in advertising and in online shops – must meet the new requirements. Companies should review stock and communication materials in good time.',
    },
    {
      q: 'Was the Green Claims Directive withdrawn – what applies now?',
      a: 'This is often confused. The Green Claims Directive (the separate proposal with an ex-ante verification system) was withdrawn by the European Commission in June 2025. The EmpCo Directive (EU 2024/825) is unaffected, already adopted, and applies from 27 September 2026. The greenwashing ban is coming – just via EmpCo instead of the Green Claims Directive.',
    },
  ],
  relatedTitle: 'Further reading',
  related: [
    { label: 'EmpCo Directive 2026: the guide with FAQ and audit', href: '/en/empco-audit/' },
    { label: 'Formulating green claims legally: permitted vs. banned statements', href: '/en/empco-audit/green-claims-formulieren/' },
    { label: 'Checking your website for green claims: EmpCo audit, manual vs. automated', href: '/en/empco-audit/website-green-claims-pruefen/' },
    { label: 'Greenwashing fines in the EU: up to 4% of annual turnover – the cases', href: '/en/empco-audit/greenwashing-strafe/' },
    { label: 'Greenwashing cease-and-desist warning: what to do? Costs, deadlines, response', href: '/en/empco-audit/abmahnung-greenwashing/' },
  ],
  cta: {
    headline: 'Which of these terms are still on your website?',
    button: 'Request a free sample page',
  },
  ctaIdPrefix: 'empco_begriffe',
}

const content: Record<Lang, EmpCoClusterContent> = { de: contentDe, en: contentEn }

const pageNames: Record<Lang, string> = {
  de: 'Verbotene Werbebegriffe ab 2026',
  en: 'Banned advertising terms from 2026',
}

export default async function KlimaneutralWerbenVerboten({
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
      { '@type': 'ListItem', position: 3, name: pageNames[lang], item: `https://icompetence.de/${lang}/empco-audit/klimaneutral-werben-verboten/` },
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
