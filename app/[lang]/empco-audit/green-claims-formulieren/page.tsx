import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'
import { alternates, toLang, type Lang } from '@/lib/i18n-meta'

// Cluster page #5 (Content-Matrix): Cluster B – Marketing & Agenturen, MOFU, Prio Hoch.
// Primär-Keyword: "green claims formulieren"
// Sekundär: "umweltwerbung rechtssicher", "erlaubte nachhaltigkeitsaussagen"
// The /en variant is a 1:1 translation (accessibility); legal statements are
// shared between both languages, so the German legal review covers both.

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }]
}

export const dynamicParams = false

const meta: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'Green Claims formulieren: erlaubte vs. verbotene Aussagen | iCompetence',
    description:
      'Green Claims rechtssicher formulieren: Grundregeln der EmpCo-Richtlinie, Beispiele für erlaubte vs. verbotene Umweltaussagen und eine Checkliste für Marketing und Agenturen – gültig ab 27.09.2026.',
  },
  en: {
    title: 'Formulating green claims: permitted vs. banned statements | iCompetence',
    description:
      'Formulating green claims legally: the EmpCo Directive ground rules, examples of permitted vs. banned environmental claims and a checklist for marketing teams and agencies – applicable from 27 Sep 2026.',
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
    alternates: alternates('empco-audit/green-claims-formulieren', lang),
    robots: { index: true, follow: true },
  }
}

const contentDe: EmpCoClusterContent = {
  title: 'Green Claims rechtssicher formulieren: erlaubte vs. verbotene Aussagen',
  quote: {
    text: '„Most of it is greenwashing dressed up in fonts.“ – so beschreibt ein Junior-Marketer in r/AskMarketing den Zustand des Nachhaltigkeitsmarketings.',
    source: 'Diskussion auf Reddit, r/AskMarketing',
  },
  intro: [
    '**Green Claims sind rechtssicher formuliert, wenn drei Bedingungen erfüllt sind: Die Aussage ist spezifisch statt pauschal, der nachprüfbare Beleg liegt vor der Veröffentlichung vor, und der zentrale Begriff wird in der Werbung selbst erläutert.** Die [EmpCo-Richtlinie (EU 2024/825)](/de/empco-audit/) verbietet ab dem 27. September 2026 pauschale Umweltaussagen ohne Nachweis – sie verbietet nicht die Umweltkommunikation an sich.',
    'Die Frage „Can I still say eco-friendly in ads after 2026?“ taucht in Marketing-Foren immer häufiger auf. Diese Seite zeigt, wie Marketing-Teams und Agenturen Green Claims so formulieren, dass sie auch nach 2026 halten: die Grundregel, konkrete erlaubte vs. verbotene Beispiel-Formulierungen und eine Checkliste für den Freigabeprozess.',
  ],
  sections: [
    {
      id: 'grundregel',
      heading: 'Die Grundregel ab 2026: spezifisch und belegt statt pauschal',
      paragraphs: [
        'Verboten sind pauschale, nicht belegte Umweltaussagen wie „klimaneutral“, „grün“, „nachhaltig“, „umweltfreundlich“, „öko“ oder „biologisch abbaubar“, wenn kein anerkannter, nachprüfbarer Nachweis vorliegt. Ebenfalls unzulässig: Klimaneutralitäts-Aussagen, die auf CO₂-Kompensation beruhen, Nachhaltigkeitssiegel ohne unabhängige Zertifizierung sowie Versprechen über künftige Umweltleistung ohne überprüfbare, öffentliche Zwischenziele.',
        'Im Umkehrschluss ergibt sich die Formel für rechtssichere Green Claims: eine konkrete, abgegrenzte Eigenschaft benennen, den Nachweis vorher sichern und die Aussage in der Werbung selbst erläutern. Der BGH hat für „klimaneutral“ bereits entschieden, dass der Begriff nur verwendet werden darf, wenn er in der Werbung selbst klar erläutert wird – diese Linie wird ab 2026 zur Regel für die gesamte Umweltkommunikation.',
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
            secondary: 'Belegte Reduktionsaussage, in der Werbung selbst erläutert',
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
        'Wird der zentrale Begriff in der Werbung selbst erläutert? Für „klimaneutral“ verlangt das der BGH ausdrücklich.',
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
        'Das Risiko ist beziffert: [Bußgelder bis zu 4 % des Jahresumsatzes und die Fälle Shein und Apple](/de/empco-audit/greenwashing-strafe/) machen das Argument konkret – untersagte Werbung trifft am Ende den Kunden und die Agentur.',
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
      a: 'Ja, aber nur unter strengen Bedingungen. Verboten ist ab dem 27. September 2026 die pauschale Produktaussage „klimaneutral“, wenn sie allein auf CO₂-Kompensation (Offsetting) beruht. Erlaubt bleiben Aussagen, die auf tatsächlichen Emissionsreduktionen in der Wertschöpfungskette basieren und nachprüfbar belegt sind. Schon heute hat der BGH entschieden, dass mit „klimaneutral“ nur geworben werden darf, wenn der Begriff in der Werbung selbst klar erläutert wird.',
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

const contentEn: EmpCoClusterContent = {
  title: 'Formulating green claims legally: permitted vs. banned statements',
  quote: {
    text: '“Most of it is greenwashing dressed up in fonts.” – how a junior marketer in r/AskMarketing describes the state of sustainability marketing.',
    source: 'Discussion on Reddit, r/AskMarketing',
  },
  intro: [
    '**Green claims are legally sound when three conditions are met: the statement is specific rather than generic, the verifiable evidence exists before publication, and the central term is explained in the advertising itself.** The [EmpCo Directive (EU 2024/825)](/en/empco-audit/) bans generic environmental claims without proof from 27 September 2026 – it does not ban environmental communication as such.',
    'The question “Can I still say eco-friendly in ads after 2026?” comes up more and more often in marketing forums. This page shows how marketing teams and agencies formulate green claims that hold up after 2026: the ground rule, concrete permitted vs. banned example formulations, and a checklist for the approval process.',
  ],
  sections: [
    {
      id: 'grundregel',
      heading: 'The ground rule from 2026: specific and substantiated instead of generic',
      paragraphs: [
        'Banned are generic, unsubstantiated environmental claims such as “climate-neutral”, “green”, “sustainable”, “eco-friendly”, “eco” or “biodegradable” where no recognised, verifiable proof exists. Also prohibited: climate-neutrality claims based on carbon offsetting, sustainability labels without independent certification, and promises about future environmental performance without verifiable, public interim targets.',
        'Inverted, this yields the formula for legally sound green claims: name a concrete, clearly delimited property, secure the evidence beforehand, and explain the claim in the advertising itself. For “climate-neutral”, the German Federal Court of Justice (BGH) has already ruled that the term may only be used if it is clearly explained in the advertising itself – from 2026 this line becomes the rule for all environmental communication.',
        'Important for the workflow: evidence must be in place before the claim goes online – not only once a competitor [sends a warning letter](/en/empco-audit/abmahnung-greenwashing/).',
      ],
    },
    {
      id: 'beispiele',
      heading: 'Permitted vs. banned: example formulations',
      paragraphs: [
        'The comparison below shows the pattern: on the left, the generic formulation that is impermissible without proof from 27 Sep 2026 – on the right, the specific, provable alternative. The right-hand examples are formulation patterns; whether they are permissible in an individual case depends on the respective evidence actually existing.',
      ],
      table: {
        primaryHeader: 'Risky / banned from 2026',
        secondaryHeader: 'Legally sound (with evidence)',
        rows: [
          {
            feature: 'Generic claim',
            primary: '“Eco-friendly product”',
            secondary: '“Packaging made from 95% recycled material” – with proof',
          },
          {
            feature: 'Climate claim',
            primary: '“Climate-neutral” (via offsetting)',
            secondary: 'Substantiated reduction claim, explained in the ad context',
          },
          {
            feature: 'Label',
            primary: 'Self-designed “eco” label',
            secondary: 'Independently certified or officially established label',
          },
          {
            feature: 'Absolute claim',
            primary: '“100% sustainable”',
            secondary: 'Limit the claim to the concrete, substantiated aspect',
          },
          {
            feature: 'Future promise',
            primary: '“Climate-positive by 2030” without a plan',
            secondary: 'Target with verifiable, public interim milestones',
          },
        ],
      },
    },
    {
      id: 'checkliste',
      heading: 'Checklist: review every green claim before publication',
      paragraphs: [
        'These six questions catch the most common violations before they go live:',
      ],
      bullets: [
        'Is the term generic? “Sustainable”, “green”, “eco”, “eco-friendly” without a concrete reference are the first attack surface from 2026 – [the full list of terms](/en/empco-audit/klimaneutral-werben-verboten/) shows which words are affected.',
        'Does the evidence exist – now, not later? Proof must be in place before publication.',
        'Does the claim refer to the whole product or only one aspect? What applies only to the packaging must not sound like a product property.',
        'Is a climate claim based on reduction or on offsetting? From 2026, offsetting no longer suffices as the sole basis of environmental advertising.',
        'Is every label used independently certified or officially established? Own labels without third-party verification must be removed.',
        'Is the central term explained in the advertising itself? For “climate-neutral” the BGH explicitly requires this.',
      ],
    },
    {
      id: 'zielgruppe-misstrauen',
      heading: 'Why generic claims no longer work anyway',
      paragraphs: [
        'Regardless of the legal situation, generic green claims have an effectiveness problem: the audience no longer believes them. In r/ZeroWaste, over 530 commenters discuss why the sustainability community fundamentally distrusts manufacturer claims. In r/BeautyGuruChatter, the top comment on “Do you trust the claims beauty brands make?” puts it plainly: “‘Clean’, ‘sustainable’ and ‘green’ are not regulated terms.” And in r/sustainability, the thread “Brands who claim to be special because they’re sustainable” (40+ comments) dissects exactly the arbitrariness that EmpCo now bans.',
        'For marketing teams the regulation is therefore also an opportunity: from 2026, a specific, substantiated claim differs from the competitor’s generic one not only legally – it is the only format the sceptical audience still listens to.',
      ],
    },
    {
      id: 'siegel-verpackung',
      heading: 'Special case: labels and packaging',
      paragraphs: [
        'Two points deserve particular attention in the formulation workflow. First, labels: from 2026, sustainability labels are only permissible if they are based on a recognised certification scheme or were established by a public authority – self-designed “trust” or “eco” labels without independent third-party verification must be removed from advertising, packaging and websites.',
        'Second, the time factor for physical materials: there is no transition period for existing products. Packaging, catalogues and POS materials produced today with a generic claim will most likely still be in circulation on 27 September 2026 – they must therefore be formulated under the new rules already now.',
      ],
    },
    {
      id: 'agentur-fall',
      heading: '“Client wants climate neutral on packaging – how do I push back?”',
      paragraphs: [
        'This Reddit question describes the daily reality of many agencies: the client wants the strong claim, the agency shares the formulation risk. Three arguments help in the client conversation:',
      ],
      bullets: [
        'The legal situation has a date: from 27 September 2026, offsetting-based “climate-neutral” advertising is banned – with no transition period for existing materials. Packaging designed now will still be on the market at the cut-off date.',
        'The risk is quantified: [fines of up to 4% of annual turnover and the Shein and Apple cases](/en/empco-audit/greenwashing-strafe/) make the argument concrete – banned advertising ultimately hits both the client and the agency.',
        'There is a better alternative: a specific, substantiated claim is not weaker but more credible – especially with an audience that distrusts generic claims anyway.',
      ],
    },
    {
      id: 'website',
      heading: 'From the single text to the whole website',
      paragraphs: [
        'The checklist works for the new claim – but not retroactively for hundreds of accumulated product texts, landing pages and shop descriptions. Yet from the cut-off date the rules apply to all public claims, including legacy content.',
        'The existing content therefore needs a systematic [check of the entire website for green claims](/en/empco-audit/website-green-claims-pruefen/). The automated [EmpCo Audit](/en/empco-audit/) identifies critical claims with their exact location and rule reference and gives marketing, sustainability and legal a prioritised list – the weeks of manual groundwork disappear, and the final legal review starts exactly where it matters.',
      ],
    },
  ],
  faqTitle: 'Frequently asked questions about formulating green claims',
  faq: [
    {
      q: 'Which advertising terms are specifically banned from 2026?',
      a: 'Banned are generic, unsubstantiated environmental claims such as “climate-neutral”, “green”, “sustainable”, “eco-friendly”, “eco” or “biodegradable” where no recognised, verifiable proof exists. Also banned: self-invented sustainability labels without independent certification and misleading claims about durability (planned obsolescence).',
    },
    {
      q: 'Is “climate-neutral” still allowed from 2026?',
      a: 'Yes, but only under strict conditions. From 27 September 2026, the generic product claim “climate-neutral” is banned if it rests solely on carbon offsetting. Claims based on actual emission reductions in the value chain that are verifiably substantiated remain permitted. The German Federal Court of Justice (BGH) has already ruled that “climate-neutral” may only be used in advertising if the term is clearly explained in the advertising itself.',
    },
    {
      q: 'What happens to sustainability labels and own labels?',
      a: 'From 2026, sustainability labels are only permissible if they are based on a recognised certification scheme or were established by a public authority. Self-designed “trust” or “eco” labels without independent third-party verification are no longer allowed.',
    },
    {
      q: 'Are carbon offsets a scam?',
      a: 'Not per se, but they are under heavy criticism because their actual climate impact is often hard to measure and sometimes overstated. That is exactly why the EmpCo Directive bans advertising a product as “climate-neutral” from 2026 based solely on offsetting. For companies this means: offsetting can be part of a strategy, but it is no longer sufficient as the sole basis for an environmental claim.',
    },
    {
      q: 'Do I also have to review old website pages and legacy content?',
      a: 'Yes. The rules apply to all claims that are public from the cut-off date – including legacy pages, product copy and landing pages that have grown over years. This is exactly the core problem: most companies do not know what is written on hundreds of their own pages. An automated audit provides a complete overview within hours.',
    },
  ],
  relatedTitle: 'Further reading',
  related: [
    { label: 'EmpCo Directive 2026: the guide with FAQ and audit', href: '/en/empco-audit/' },
    { label: '“Climate-neutral”, “sustainable”, “eco-friendly” – which advertising terms are banned from 2026', href: '/en/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Checking your website for green claims: EmpCo audit, manual vs. automated', href: '/en/empco-audit/website-green-claims-pruefen/' },
    { label: 'Greenwashing cease-and-desist warning: what to do? Costs, deadlines, response', href: '/en/empco-audit/abmahnung-greenwashing/' },
    { label: 'Greenwashing fines in the EU: up to 4% of annual turnover – the cases', href: '/en/empco-audit/greenwashing-strafe/' },
  ],
  cta: {
    headline: 'Not sure which claims on your website are critical?',
    button: 'Request a free sample page',
  },
  ctaIdPrefix: 'empco_formulieren',
}

const content: Record<Lang, EmpCoClusterContent> = { de: contentDe, en: contentEn }

const pageNames: Record<Lang, string> = {
  de: 'Green Claims rechtssicher formulieren',
  en: 'Formulating green claims legally',
}

export default async function GreenClaimsFormulieren({
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
      { '@type': 'ListItem', position: 3, name: pageNames[lang], item: `https://icompetence.de/${lang}/empco-audit/green-claims-formulieren/` },
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
