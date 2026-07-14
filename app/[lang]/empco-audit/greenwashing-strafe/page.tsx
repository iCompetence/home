import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'
import { alternates, toLang, type Lang } from '@/lib/i18n-meta'

// Cluster page #7 (Content-Matrix): Cluster C – Recht/Unternehmer, BOFU, Prio Hoch.
// Primär-Keyword: "greenwashing strafe"
// Sekundär: "greenwashing bussgeld", "empco strafen", "shein armani apple"
// The /en variant is a 1:1 translation (accessibility); legal statements are
// shared between both languages, so the German legal review covers both.

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }]
}

export const dynamicParams = false

const meta: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'Greenwashing-Strafe: Bußgelder bis 4 % vom Jahresumsatz – die Fälle | iCompetence',
    description:
      'Welche Strafen bei Greenwashing drohen: Abmahnungen, Klagen, Bußgelder bis zu 4 % des Jahresumsatzes. Die Fälle Shein (1 Mio. €), Armani (3,5 Mio. €) und Apple im Überblick – und was ab 27.09.2026 gilt.',
  },
  en: {
    title: 'Greenwashing penalties: fines of up to 4% of annual turnover – the cases | iCompetence',
    description:
      'What penalties greenwashing triggers: fines of up to 4% of annual turnover, warning letters, lawsuits. The Shein (€1M), Armani (€3.5M) and Apple cases – and what applies from 27 Sep 2026.',
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
    alternates: alternates('empco-audit/greenwashing-strafe', lang),
    robots: { index: true, follow: true },
  }
}

const contentDe: EmpCoClusterContent = {
  title: 'Greenwashing-Bußgelder in der EU: bis zu 4 % vom Jahresumsatz – die Fälle',
  quote: {
    text: '„EU macht Greenwashing für Firmen zum Millionenrisiko“ – so titelt einer der meistdiskutierten Threads zum Thema in r/de, mit über 40 Kommentaren.',
    source: 'Diskussion auf Reddit, r/de',
  },
  intro: [
    '**Bei Greenwashing drohen in der EU Abmahnungen, Unterlassungsklagen und – bei weitverbreiteten Verstößen mit EU-Dimension – Bußgelder von bis zu 4 % des Jahresumsatzes in den betroffenen Mitgliedstaaten; dazu die Pflicht, beanstandete Werbung zu korrigieren oder zurückzuziehen.** Reale Fälle zeigen die Größenordnung: Shein zahlte 1 Mio. € Bußgeld für irreführende Umweltaussagen, Armani 3,5 Mio. € für irreführende Ethik-Aussagen, und Apple wurde die „CO₂-neutral“-Werbung in Deutschland erstinstanzlich untersagt.',
    'Greenwashing war lange vor allem ein Reputationsthema – mit der EmpCo-Richtlinie (EU 2024/825) bekommt die Durchsetzung ab dem 27. September 2026 eine deutlich schärfere Grundlage. Diese Seite ordnet ein, welche Strafen konkret drohen, was die Fälle über die Größenordnung verraten – und was Unternehmen jetzt tun sollten, bevor Wettbewerber, Verbände oder Behörden es für sie tun.',
  ],
  sections: [
    {
      id: 'welche-strafen',
      heading: 'Welche Strafen bei Greenwashing drohen',
      paragraphs: [
        'Die Sanktionen bei irreführender Umweltwerbung staffeln sich von der privaten Rechtsdurchsetzung bis zum behördlichen Bußgeld. Bei Verstößen gegen die EmpCo-Regeln drohen:',
      ],
      bullets: [
        '[Abmahnungen](/de/empco-audit/abmahnung-greenwashing/) durch Wettbewerber und Verbände – schon heute auf Basis von § 5 UWG (Irreführung), ab dem 27.09.2026 zusätzlich gestützt auf die EmpCo-Umsetzung im UWG. Das ist in Deutschland der Normalfall der Durchsetzung.',
        'Unterlassungsklagen, wenn keine Unterlassungserklärung abgegeben wird.',
        'Behördliche Bußgelder von bis zu 4 % des Jahresumsatzes in den betroffenen Mitgliedstaaten – bei weitverbreiteten Verstößen mit EU-Dimension (koordinierte Durchsetzung nach der CPC-Verordnung; in Deutschland § 19 UWG, zuständig u. a. das Bundesamt für Justiz).',
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
          heading: 'Shein: 1 Mio. € Bußgeld für irreführende Umweltaussagen',
          paragraphs: [
            // Juristisch validiert (Juli 2026): AGCM-PM vom 04.08.2025, Verfahren PS12709.
            'Die italienische Wettbewerbs- und Verbraucherschutzbehörde AGCM verhängte im August 2025 ein Bußgeld von 1 Mio. € gegen die Betreiberin der europäischen Shein-Websites. Gegenstand waren vage und übertriebene Umweltaussagen – unter anderem zu Kreislauffähigkeit und Recycling – sowie Klimaziele, die im Widerspruch zu den tatsächlich gestiegenen Emissionen des Konzerns standen. Der Fall zeigt: Auch Anbieter aus Drittländern werden erfasst, sobald sie EU-Konsumenten ansprechen – der Firmensitz schützt nicht.',
          ],
        },
        {
          heading: 'Armani: 3,5 Mio. € Bußgeld für irreführende Ethik-Aussagen',
          paragraphs: [
            // Juristisch validiert (Juli 2026): AGCM-PM vom 04.08.2025, Verfahren PS12793.
            // Bewusst NICHT als Greenwashing gelabelt — Gegenstand waren Sozial-/Ethik-Aussagen.
            'Der Nachbarfall zu den Green Claims: Ebenfalls im August 2025 verhängte die AGCM 3,5 Mio. € Bußgeld gegen Armani – nicht für Umwelt-, sondern für irreführende Ethik- und Sozialverantwortungs-Aussagen, die im Widerspruch zu den tatsächlichen Arbeitsbedingungen bei Subunternehmern standen (Entscheidung angefochten, nicht rechtskräftig). Für Unternehmen ist die Lehre dieselbe: Die Sanktionslogik trifft jede unbelegte Nachhaltigkeitsaussage – ökologisch wie sozial.',
          ],
        },
        {
          heading: 'Apple: „CO₂-neutral“-Werbung in Deutschland erstinstanzlich untersagt',
          paragraphs: [
            // Juristisch validiert (Juli 2026): LG Frankfurt a. M., Urt. v. 26.08.2025 – 3-06 O 8/24
            // (Klage der Deutschen Umwelthilfe); nicht rechtskräftig.
            'Der wirkungsstärkste Präzedenzfall für den DACH-Raum: Das Landgericht Frankfurt am Main untersagte Apple im August 2025 auf Klage der Deutschen Umwelthilfe erstinstanzlich, die Apple Watch als „CO₂-neutrales Produkt“ zu bewerben (Urteil vom 26.08.2025, nicht rechtskräftig) – die zugrunde liegende Kompensation über ein Waldprojekt in Paraguay war nicht langfristig gesichert. Auf Reddit erzeugte der Fall hunderte Kommentare – in r/apple brachte es ein Top-Kommentar auf den Punkt: „carbon credits and carbon neutral are largely BS marketing buzzwords“.',
            'Die Linie dahinter hat der BGH vorgezeichnet (Urteil vom 27.06.2024 – I ZR 98/23): Mit dem mehrdeutigen Begriff „klimaneutral“ darf nur geworben werden, wenn er in der Werbung selbst klar erläutert wird. Kompensationsbasierte Klimaneutralitäts-Werbung ohne Erläuterung ist damit schon heute angreifbar – [ab 2026 ist sie ausdrücklich verboten](/de/empco-audit/klimaneutral-werben-verboten/).',
          ],
        },
      ],
    },
    {
      id: 'rechtsgrundlagen',
      heading: 'Die Rechtsgrundlagen im Überblick',
      paragraphs: [
        'Die EmpCo-Richtlinie (Directive (EU) 2024/825, „Empowering Consumers for the Green Transition“) ist seit März 2024 in Kraft. Sie ändert zwei bestehende EU-Regelwerke – die UGP-Richtlinie (2005/29/EG) und die Verbraucherrechte-Richtlinie (2011/83/EU) – und verbietet irreführende Umweltaussagen sowie unbelegte Nachhaltigkeitssiegel in der Werbung gegenüber Verbraucherinnen und Verbrauchern.',
        'Die EU-Mitgliedstaaten müssen die Richtlinie bis zum 27. März 2026 in nationales Recht umsetzen; verbindlich gelten die Regeln ab dem 27. September 2026. Häufige Verwechslung dabei: Für die Green Claims Directive – den separaten, detaillierteren Vorschlag mit Vorab-Prüfsystem – hat die EU-Kommission im Juni 2025 die Rücknahme angekündigt; das Verfahren liegt seither auf Eis. Die EmpCo ist davon unberührt; das Greenwashing-Verbot kommt über die EmpCo statt über die Green Claims Directive.',
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
        'Manuell lesen mehrere Abteilungen die Website Seite für Seite und gleichen Aussagen mit Belegen ab – ein Aufwand, der schnell einen fünfstelligen Betrag erreichen kann. Ein automatisierter [EmpCo Audit](/de/empco-audit/) übernimmt diese Vorarbeit: Er identifiziert kritische Aussagen mit Fundstelle und Regelverweis und liefert eine priorisierte Liste, auf der die juristische Letztprüfung gezielt aufsetzt. Wie sich [manuelle und automatisierte Website-Prüfung](/de/empco-audit/website-green-claims-pruefen/) im Detail vergleichen, zeigt der eigene Beitrag dazu; wer Formulierungen aktiv umbauen will, findet [erlaubte vs. verbotene Aussagen](/de/empco-audit/green-claims-formulieren/) mit Beispielen.',
      ],
    },
  ],
  faqTitle: 'Häufige Fragen zu Greenwashing-Strafen',
  faq: [
    {
      q: 'Welche Strafen drohen bei Verstößen gegen die EmpCo-Richtlinie?',
      a: 'Neben Abmahnungen und Unterlassungsklagen drohen bei weitverbreiteten Verstößen mit EU-Dimension Bußgelder von bis zu 4 % des Jahresumsatzes in den betroffenen Mitgliedstaaten. Reale Beispiele zeigen die Größenordnung: Shein zahlte 1 Mio. € Bußgeld für irreführende Umweltaussagen, Armani 3,5 Mio. € für irreführende Ethik-Aussagen, und Apple wurde die „CO₂-neutral“-Werbung für die Apple Watch in Deutschland erstinstanzlich untersagt.',
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
      a: 'Das wird oft verwechselt. Für die Green Claims Directive (den separaten Vorschlag mit Vorab-Prüfsystem) hat die EU-Kommission im Juni 2025 die Rücknahme angekündigt; das Verfahren liegt seither auf Eis. Die EmpCo-Richtlinie (EU 2024/825) ist davon unberührt, bereits beschlossen und gilt ab dem 27. September 2026. Das Greenwashing-Verbot kommt also – nur eben über die EmpCo statt über die Green Claims Directive.',
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

const contentEn: EmpCoClusterContent = {
  title: 'Greenwashing fines in the EU: up to 4% of annual turnover – the cases',
  quote: {
    text: '“EU turns greenwashing into a million-euro risk for companies” (translated from German) – the title of one of the most-discussed threads on the topic in r/de, with over 40 comments.',
    source: 'Discussion on Reddit, r/de',
  },
  intro: [
    '**Greenwashing in the EU can trigger cease-and-desist warnings, injunctions and – for widespread infringements with an EU dimension – fines of up to 4% of annual turnover in the member states concerned; plus the obligation to correct or withdraw the contested advertising.** Real cases show the scale: Shein was fined €1 million for misleading environmental claims, Armani €3.5 million for misleading ethics claims, and a German court banned Apple’s “carbon neutral” advertising at first instance.',
    'For a long time greenwashing was mainly a reputational issue – with the EmpCo Directive (EU 2024/825), enforcement gets a much sharper basis from 27 September 2026. This page lays out which penalties apply in practice, what the cases reveal about the magnitudes – and what companies should do now, before competitors, associations or authorities do it for them.',
  ],
  sections: [
    {
      id: 'welche-strafen',
      heading: 'Which penalties greenwashing triggers',
      paragraphs: [
        'The sanctions for misleading environmental advertising range from private enforcement to regulatory fines. Breaches of the EmpCo rules can trigger:',
      ],
      bullets: [
        '[Cease-and-desist warnings](/en/empco-audit/abmahnung-greenwashing/) from competitors and associations – already today based on Section 5 UWG (misleading practices), from 27 Sep 2026 additionally based on the EmpCo transposition in the UWG. In Germany, this is the normal enforcement route.',
        'Injunction lawsuits if no cease-and-desist declaration is submitted.',
        'Regulatory fines of up to 4% of annual turnover in the member states concerned – for widespread infringements with an EU dimension (coordinated enforcement under the CPC Regulation; in Germany Section 19 UWG, with the Federal Office of Justice among the competent authorities).',
        'The obligation to correct or withdraw the contested advertising – including packaging, campaigns and website content.',
        'Reputational damage, which is disproportionately severe for sustainability topics: whoever is caught greenwashing loses exactly the audience the green claims were meant to win.',
      ],
    },
    {
      id: 'die-faelle',
      heading: 'The cases: Shein, Armani, Apple',
      paragraphs: [
        'Three prominent recent proceedings show that the 4% threat is not theoretical – each stands for a different type of violation.',
      ],
      subsections: [
        {
          heading: 'Shein: €1 million fine for misleading environmental claims',
          paragraphs: [
            // Legally validated (July 2026): AGCM press release of 4 Aug 2025, case PS12709.
            'In August 2025, the Italian competition and consumer authority AGCM imposed a €1 million fine on the operator of Shein’s European websites. At issue were vague and exaggerated environmental claims – including on circularity and recycling – and climate targets that contradicted the group’s actually rising emissions. The case shows: providers from third countries are also covered as soon as they address EU consumers – the place of incorporation offers no protection.',
          ],
        },
        {
          heading: 'Armani: €3.5 million fine for misleading ethics claims',
          paragraphs: [
            // Legally validated (July 2026): AGCM press release of 4 Aug 2025, case PS12793.
            // Deliberately NOT labelled as greenwashing — the case concerned social/ethics claims.
            'The neighbouring case to the green claims: also in August 2025, the AGCM fined Armani €3.5 million – not for environmental claims, but for misleading ethics and social-responsibility statements that contradicted the actual working conditions at subcontractors (decision challenged, not final). For companies the lesson is the same: the sanction logic hits every unsubstantiated sustainability claim – environmental and social alike.',
          ],
        },
        {
          heading: 'Apple: “carbon neutral” advertising banned at first instance in Germany',
          paragraphs: [
            // Legally validated (July 2026): Frankfurt Regional Court, judgment of 26 Aug 2025 –
            // 3-06 O 8/24 (action brought by Deutsche Umwelthilfe); not final.
            'The most impactful precedent for the DACH region: in August 2025, the Frankfurt Regional Court, on an action brought by Deutsche Umwelthilfe, banned Apple at first instance from advertising the Apple Watch as a “carbon neutral product” (judgment of 26 August 2025, not final) – the underlying offsetting via a forestry project in Paraguay was not secured for the long term. On Reddit the case generated hundreds of comments – in r/apple, a top comment put it bluntly: “carbon credits and carbon neutral are largely BS marketing buzzwords”.',
            'The underlying line was drawn by the German Federal Court of Justice (BGH, judgment of 27 June 2024 – I ZR 98/23): the ambiguous term “climate-neutral” may only be used in advertising if it is clearly explained in the advertising itself. Offsetting-based climate-neutrality advertising without explanation is thus already contestable today – [from 2026 it is explicitly banned](/en/empco-audit/klimaneutral-werben-verboten/).',
          ],
        },
      ],
    },
    {
      id: 'rechtsgrundlagen',
      heading: 'The legal framework at a glance',
      paragraphs: [
        'The EmpCo Directive (Directive (EU) 2024/825, “Empowering Consumers for the Green Transition”) has been in force since March 2024. It amends two existing EU frameworks – the Unfair Commercial Practices Directive (2005/29/EC) and the Consumer Rights Directive (2011/83/EU) – and bans misleading environmental claims and unsubstantiated sustainability labels in advertising to consumers.',
        'EU member states must transpose the directive into national law by 27 March 2026; the rules apply bindingly from 27 September 2026. A common source of confusion: for the Green Claims Directive – the separate, more detailed proposal with an ex-ante verification system – the European Commission announced its withdrawal in June 2025; the procedure has been on hold since. EmpCo is unaffected; the greenwashing ban arrives via EmpCo rather than via the Green Claims Directive.',
      ],
    },
    {
      id: 'reputationsrisiko',
      heading: 'The penalty beyond the penalty: public attention',
      paragraphs: [
        'What makes the cases additionally costly: they are litigated in public. The Apple case generated Reddit threads with well over a hundred comments – across r/apple, r/EU_Economics and r/BuyFromEU (“Germany says Apple can’t claim Apple Watch is carbon neutral”, 160+ comments). The debate reaches exactly the affluent, sustainability-minded audience the green claims were originally aimed at.',
        'For the risk assessment this means: even if proceedings end mildly, the public verdict of “caught greenwashing” remains – and unlike an advertising claim, it cannot be withdrawn.',
      ],
    },
    {
      id: 'wer-betroffen',
      heading: 'Who is affected – small companies included',
      paragraphs: [
        'EmpCo affects all companies that market products or services to consumers in the EU – regardless of sector, company size or place of establishment. Unlike the CSRD, there is no general SME exemption: the rules attach to the claim, not to the balance-sheet total.',
        'For smaller companies the warning-letter risk is often more relevant than the fine: a single unsubstantiated phrase on a product page is enough of an attack surface – and the cases show that competitors and associations actively pursue the topic.',
      ],
    },
    {
      id: 'vermeiden',
      heading: 'Avoiding penalties: first the overview, then the correction',
      paragraphs: [
        'The common denominator of all cases: the contested claims were publicly visible and had grown over a long time – on product pages, in campaigns, in the shop. Most companies do not know what is written on hundreds of their own pages. That is exactly where the risk begins.',
        'Manually, several departments read the website page by page and match claims against evidence – an effort that can quickly reach five figures. An automated [EmpCo Audit](/en/empco-audit/) takes over this groundwork: it identifies critical claims with their exact location and rule reference and delivers a prioritised list on which the final legal review can build. How [manual and automated website checking](/en/empco-audit/website-green-claims-pruefen/) compare in detail is covered in its own article; for actively rewriting copy, see [permitted vs. banned statements](/en/empco-audit/green-claims-formulieren/) with examples.',
      ],
    },
  ],
  faqTitle: 'Frequently asked questions about greenwashing penalties',
  faq: [
    {
      q: 'What penalties apply for breaching the EmpCo Directive?',
      a: 'Besides cease-and-desist warnings and injunctions, widespread infringements with an EU dimension can trigger fines of up to 4% of annual turnover in the member states concerned. Real cases show the scale: Shein was fined €1 million for misleading environmental claims, Armani €3.5 million for misleading ethics claims, and a German court banned Apple’s “carbon neutral” advertising for the Apple Watch at first instance.',
    },
    {
      q: 'Does EmpCo also apply to small companies?',
      a: 'Yes. Unlike the CSRD, the EmpCo advertising rules contain no general SME exemption. Anyone making environmental claims in advertising or on their website is affected – regardless of company size. The rules attach to the claim, not to the balance-sheet total.',
    },
    {
      q: 'Which advertising terms are specifically banned from 2026?',
      a: 'Banned are generic, unsubstantiated environmental claims such as “climate-neutral”, “green”, “sustainable”, “eco-friendly”, “eco” or “biodegradable” where no recognised, verifiable proof exists. Also banned: self-invented sustainability labels without independent certification and misleading claims about durability (planned obsolescence).',
    },
    {
      q: 'Can I be sued or receive a cease-and-desist warning for an “eco-friendly” claim?',
      a: 'Yes. Unsubstantiated or generic environmental claims are already actionable as misleading under Section 5 UWG (German Act against Unfair Competition) – through competitors and associations. From 27 September 2026, the EmpCo transposition in the UWG tightens this further. Evidence must be in place before the claim goes online.',
    },
    {
      q: 'Was the Green Claims Directive withdrawn – what applies now?',
      a: 'This is often confused. For the Green Claims Directive (the separate proposal with an ex-ante verification system) the European Commission announced its withdrawal in June 2025; the procedure has been on hold since. The EmpCo Directive (EU 2024/825) is unaffected, already adopted, and applies from 27 September 2026. The greenwashing ban is coming – just via EmpCo instead of the Green Claims Directive.',
    },
  ],
  relatedTitle: 'Further reading',
  related: [
    { label: 'EmpCo Directive 2026: the guide with FAQ and audit', href: '/en/empco-audit/' },
    { label: 'Greenwashing cease-and-desist warning: what to do? Costs, deadlines, response', href: '/en/empco-audit/abmahnung-greenwashing/' },
    { label: '“Climate-neutral”, “sustainable”, “eco-friendly” – which advertising terms are banned from 2026', href: '/en/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Formulating green claims legally: permitted vs. banned statements', href: '/en/empco-audit/green-claims-formulieren/' },
    { label: 'Checking your website for green claims: EmpCo audit, manual vs. automated', href: '/en/empco-audit/website-green-claims-pruefen/' },
  ],
  cta: {
    headline: 'Not sure which claims on your website are critical?',
    button: 'Request a free sample page',
  },
  ctaIdPrefix: 'empco_strafe',
}

const content: Record<Lang, EmpCoClusterContent> = { de: contentDe, en: contentEn }

const pageNames: Record<Lang, string> = {
  de: 'Greenwashing-Bußgelder in der EU',
  en: 'Greenwashing fines in the EU',
}

export default async function GreenwashingStrafe({
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
      { '@type': 'ListItem', position: 3, name: pageNames[lang], item: `https://icompetence.de/${lang}/empco-audit/greenwashing-strafe/` },
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
