import type { Metadata } from 'next'
import EmpCoClusterPage, { type EmpCoClusterContent } from '@/components/EmpCoClusterPage'
import { alternates, toLang, type Lang } from '@/lib/i18n-meta'

// Cluster page #6 (Content-Matrix): Cluster C – Recht/Unternehmer, BOFU, Prio Hoch.
// Primär-Keyword: "abmahnung greenwashing"
// Sekundär: "greenwashing abmahnung kosten", "uwg umweltwerbung abmahnung"
// The /en variant is a 1:1 translation (accessibility); German legal terms are
// kept with an English explanation. Legal statements are shared between both
// languages, so the German legal review covers the English page too.

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }]
}

export const dynamicParams = false

const meta: Record<Lang, { title: string; description: string }> = {
  de: {
    title: 'Abmahnung wegen Greenwashing: Was tun? Kosten, Fristen, Reaktion | iCompetence',
    description:
      'Abmahnung wegen Greenwashing erhalten? Ablauf, Kosten und Fristen im Überblick – § 5 UWG, EmpCo-Richtlinie ab 27.09.2026 – und wie Sie die nächste Abmahnung vermeiden.',
  },
  en: {
    title: 'Greenwashing cease-and-desist warning: what to do? Costs, deadlines, response | iCompetence',
    description:
      'Received a cease-and-desist warning (Abmahnung) for greenwashing? Process, costs and deadlines at a glance – Section 5 UWG, EmpCo Directive from 27 Sep 2026 – and how to avoid the next warning.',
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
    alternates: alternates('empco-audit/abmahnung-greenwashing', lang),
    robots: { index: true, follow: true },
  }
}

const contentDe: EmpCoClusterContent = {
  title: 'Abmahnung wegen Greenwashing: Was tun?',
  quote: {
    text: '„Die CO₂-Kompensations-Mogelpackung: Dein Angebot als ‚klimaneutral‘ zu bezeichnen, nur weil Du Zertifikate kaufst oder Bäume pflanzt, wird illegal.“',
    source: 'Diskussion auf Reddit, r/selbststaendig',
  },
  intro: [
    '**Wenn Sie eine Abmahnung wegen Greenwashing erhalten haben, gilt: Frist notieren, nichts vorschnell unterschreiben, die beanstandete Aussage mit Screenshot dokumentieren und die Unterlassungserklärung anwaltlich prüfen lassen.** Unbelegte Umweltaussagen sind schon heute nach § 5 UWG als Irreführung abmahnfähig – abmahnen können Wettbewerber und Verbände.',
    'Die Abmahnung trifft die meisten Unternehmen unvorbereitet: Beanstandet wird eine Formulierung wie „klimaneutral“, „nachhaltig“ oder „umweltfreundlich“ auf der Website, im Shop oder in einer Anzeige – verbunden mit einer kurzen Frist und einer Kostennote. Diese Seite erklärt, warum Greenwashing-Abmahnungen gerade jetzt zunehmen, was in einer Abmahnung steht, wie Sie richtig reagieren – und wie Sie verhindern, dass die nächste kommt. Sie ersetzt keine Rechtsberatung im Einzelfall.',
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
        // durch Anwalt verifizieren oder streichen. (Gilt identisch für die EN-Übersetzung.)
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

const contentEn: EmpCoClusterContent = {
  title: 'Greenwashing cease-and-desist warning: what should you do?',
  quote: {
    text: '“The CO₂ offsetting sham: calling your offering ‘climate-neutral’ just because you buy certificates or plant trees is becoming illegal.” (translated from German)',
    source: 'Discussion on Reddit, r/selbststaendig',
  },
  intro: [
    '**If you have received a cease-and-desist warning (Abmahnung) for greenwashing: note the deadline, do not sign anything prematurely, document the contested claim with a screenshot, and have the cease-and-desist declaration reviewed by a lawyer.** Unsubstantiated or generic environmental claims are already actionable as misleading under Section 5 UWG (German Act against Unfair Competition) – warnings can be issued by competitors and associations.',
    'The warning letter catches most companies unprepared: contested is a phrase like “climate-neutral”, “sustainable” or “eco-friendly” on the website, in the shop or in an ad – combined with a short deadline and a fee note. This page explains why greenwashing warnings are increasing right now, what a warning letter contains, how to respond correctly – and how to prevent the next one. It does not replace legal advice in individual cases.',
  ],
  sections: [
    {
      id: 'warum-jetzt',
      heading: 'Why greenwashing warnings are increasing right now',
      paragraphs: [
        'Unsubstantiated or generic environmental claims are already actionable as misleading under Section 5 UWG – through competitors and associations. Anyone advertising with “eco-friendly” or “climate-neutral” without being able to prove it already risks a warning letter today, even without any new EU rules.',
        'From 27 September 2026 the situation tightens considerably: the [EmpCo Directive (EU 2024/825)](/en/empco-audit/) then applies EU-wide. Germany implements it via the Third Act Amending the UWG, published in the Federal Law Gazette on 19 February 2026. Generic environmental claims without proof move onto the “blacklist” of commercial practices that are always unfair – the chances of a warning letter succeeding rise, and the recipient’s room for argument shrinks.',
        'Case law has already moved ahead: the German Federal Court of Justice (BGH) has ruled that “climate-neutral” may only be used in advertising if the term is clearly explained in the advertising context. And the authorities are following – Shein paid €1 million, Armani €3.5 million, and a German court banned Apple from advertising the Apple Watch as “carbon neutral”. [Which fines apply in the EU](/en/empco-audit/greenwashing-strafe/) is covered in detail in the case overview.',
      ],
    },
    {
      id: 'inhalt-kosten',
      heading: 'What a warning letter contains – and what it costs',
      paragraphs: [
        'A competition-law warning letter typically contains three things: a description of the alleged infringement (the specific environmental claim and where it appears), a pre-formulated cease-and-desist declaration with a contractual penalty, and a deadline within which you are expected to respond.',
        // TODO: juristisch prüfen — identical to the German version: the cost/fee mechanics are
        // general competition law and not backed by the strategy sources (§8).
        'A fee note is usually attached: the warning party demands reimbursement of its legal fees. The exact amount depends on the individual case. Economically more significant than the warning costs is usually the cease-and-desist declaration itself – every later breach of the signed declaration triggers a substantial contractual penalty.',
        'To put the magnitudes in perspective: the warning letter is the milder instrument. Breaches of the EmpCo rules can additionally trigger fines of up to 4% of the company’s annual turnover (in cross-border cases), plus injunctions, reputational damage and the obligation to correct or withdraw the contested advertising.',
      ],
      table: {
        primaryHeader: 'Warning letter (Abmahnung)',
        secondaryHeader: 'Fine proceedings',
        rows: [
          {
            feature: 'Who acts?',
            primary: 'Competitors and associations',
            secondary: 'Authorities',
          },
          {
            feature: 'Legal basis',
            primary: 'Section 5 UWG (misleading practices)',
            secondary: 'EmpCo transposition in the UWG (from 27 Sep 2026)',
          },
          {
            feature: 'Typical consequence',
            primary: 'Cease-and-desist declaration + cost reimbursement',
            secondary: 'Fine of up to 4% of annual turnover (cross-border cases)',
          },
        ],
      },
    },
    {
      id: 'reaktion',
      heading: 'First response: the key steps after receipt',
      paragraphs: [
        'The Reddit question “Got an Abmahnung for ‘klimaneutral’ – what now?” captures the typical moment of shock. This approach has proven itself – it does not replace legal review, but it prevents the most common mistakes:',
      ],
      bullets: [
        'Note the deadline and take it seriously: warning-letter deadlines are short. Letting them lapse risks a preliminary injunction – and significantly higher costs.',
        'Do not sign anything prematurely: the attached cease-and-desist declaration is, in case of doubt, broader than the infringement requires. Whether and in what form it is submitted belongs in legal counsel.',
        'Document the contested claim: save a screenshot with date and URL before changing anything – you need that state for the legal assessment.',
        'Clarify the evidence question: is there robust, verifiable proof for the claim? Without evidence the defence is weak; proof must be in place before a claim goes online.',
        'Check the rest of the website: whoever finds one contestable claim usually finds more. A [systematic check of all pages](/en/empco-audit/website-green-claims-pruefen/) prevents the follow-up warning.',
      ],
    },
    {
      id: 'risiko-einschaetzung',
      heading: 'How realistic is the risk? A look at the public discussion',
      paragraphs: [
        'To gauge how likely a warning letter is, look not only at the courts but at the public that reports violations. The greenwashing discussion is huge – it just rarely runs under the term “EmpCo”: in r/Anticonsumption the thread “What are some examples of greenwashing you’ve seen?” collects over 270 comments, in r/ZeroWaste more than 530 commenters discuss why the sustainability community fundamentally distrusts manufacturer claims, and in r/science a study was discussed under the headline that 98% of the environmental claims examined were misleading greenwashing.',
        'This scepticism is the breeding ground on which competitors and associations find violations: what consumers publicly flag as greenwashing is easy for a warning party to exploit. The more visibly a brand advertises with green claims, the more closely the other side looks.',
      ],
      subsections: [
        {
          heading: 'Special case small businesses: no exemption, but particular hardship',
          paragraphs: [
            'Unlike the CSRD, the EmpCo advertising rules contain no general SME exemption: the rules attach to the claim, not to the balance-sheet total. For small businesses a warning letter hits particularly hard – the costs and effort weigh heavily, and the contested claim often arose from honest conviction. In r/SustainableFashion, a small-business owner selling naturally dyed goods describes her anger about the new regulation in a thread with over 300 comments: “I’m a small business owner… and I’m PISSED”.',
            'The takeaway is not to abandon sustainability communication – but to make it provable before someone else examines it.',
          ],
        },
      ],
    },
    {
      id: 'vermeiden',
      heading: 'How to avoid the next warning letter',
      paragraphs: [
        'The real cause of a greenwashing warning is rarely bad intent, but a lack of overview: environmental claims accumulate over years on product pages, landing pages and in the shop – and nobody knows any more what is written where. Yet the rules apply to all claims that are public from the cut-off date, including legacy content.',
        'Three building blocks reduce the risk permanently:',
      ],
      bullets: [
        'Inventory: record all environmental claims on the website, packaging and in the online shop – including labels and product copy. [Which advertising terms are banned from 2026](/en/empco-audit/klimaneutral-werben-verboten/) provides the checklist.',
        'Formulate claims legally: remove generic claims or back them with evidence. Concrete [permitted vs. banned formulations](/en/empco-audit/green-claims-formulieren/) show what that looks like.',
        'Establish an approval process: have every green claim jointly approved by marketing, legal and sustainability before it goes live.',
      ],
    },
    {
      id: 'audit',
      heading: 'The fastest route to an overview: the automated EmpCo audit',
      paragraphs: [
        'Manually, several departments read the website page by page, collect claims and match them against evidence – typically a mid to high five-figure effort. This is exactly the groundwork the [EmpCo Audit](/en/empco-audit/) takes over: it identifies critical claims with their exact location and rule reference and delivers a prioritised, evidence-focused list on which the final legal review can build.',
        'The audit does not replace the lawyer – it replaces the weeks of manual groundwork before. After a warning letter it provides, within hours, the complete overview you need for the response and for cleaning up the rest of the website.',
      ],
    },
  ],
  faqTitle: 'Frequently asked questions about greenwashing warnings',
  faq: [
    {
      q: 'Can I be sued or receive a cease-and-desist warning for an “eco-friendly” claim?',
      a: 'Yes. Unsubstantiated or generic environmental claims are already actionable as misleading under Section 5 UWG (German Act against Unfair Competition) – through competitors and associations. From 27 September 2026, the EmpCo transposition in the UWG tightens this further. Evidence must be in place before the claim goes online.',
    },
    {
      q: 'Who may issue a warning letter for greenwashing?',
      a: 'Warning letters can be issued by competitors and associations. The basis is the German Act against Unfair Competition (UWG): misleading environmental claims violate Section 5 UWG, and from 27 September 2026 the bans added to the UWG via the EmpCo Directive apply in addition.',
    },
    {
      q: 'What penalties apply for breaching the EmpCo Directive?',
      a: 'Besides cease-and-desist warnings and injunctions, fines of up to 4% of the company’s annual turnover are possible (in cross-border cases). Real cases show the scale: Shein paid €1 million, Armani €3.5 million, and Apple was banned by a German court from advertising with “carbon neutral”.',
    },
    {
      q: 'Do I also have to review old website pages and legacy content?',
      a: 'Yes. The rules apply to all claims that are public from the cut-off date – including legacy pages, product copy and landing pages that have grown over years. This is exactly the core problem: most companies do not know what is written on hundreds of their own pages. An automated audit provides a complete overview within hours.',
    },
    {
      q: 'Is “climate-neutral” still allowed from 2026?',
      a: 'Yes, but only under strict conditions. From 27 September 2026, the generic product claim “climate-neutral” is banned if it rests solely on carbon offsetting. Claims based on actual emission reductions in the value chain that are verifiably substantiated remain permitted. The German Federal Court of Justice (BGH) has already ruled that “climate-neutral” may only be used in advertising if the term is clearly explained in the advertising context.',
    },
  ],
  relatedTitle: 'Further reading',
  related: [
    { label: 'EmpCo Directive 2026: the guide with FAQ and audit', href: '/en/empco-audit/' },
    { label: 'Greenwashing fines in the EU: up to 4% of annual turnover – the cases', href: '/en/empco-audit/greenwashing-strafe/' },
    { label: '“Climate-neutral”, “sustainable”, “eco-friendly” – which advertising terms are banned from 2026', href: '/en/empco-audit/klimaneutral-werben-verboten/' },
    { label: 'Formulating green claims legally: permitted vs. banned statements', href: '/en/empco-audit/green-claims-formulieren/' },
    { label: 'Checking your website for green claims: EmpCo audit, manual vs. automated', href: '/en/empco-audit/website-green-claims-pruefen/' },
  ],
  cta: {
    headline: 'Not sure which claims on your website are critical?',
    button: 'Request a free sample page',
  },
  ctaIdPrefix: 'empco_abmahnung',
}

const content: Record<Lang, EmpCoClusterContent> = { de: contentDe, en: contentEn }

const pageNames: Record<Lang, string> = {
  de: 'Abmahnung wegen Greenwashing',
  en: 'Greenwashing cease-and-desist warning',
}

export default async function AbmahnungGreenwashing({
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
      { '@type': 'ListItem', position: 3, name: pageNames[lang], item: `https://icompetence.de/${lang}/empco-audit/abmahnung-greenwashing/` },
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
