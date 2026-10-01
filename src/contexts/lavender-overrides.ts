import type { Language } from './LanguageContext';

/**
 * Copy that differs between the live pages and the redesigned ("Lavender")
 * pages while both exist side by side.
 *
 * The redesign addresses readers with "du" and uses sentence case / US
 * spelling in English. Changing the shared strings would change the live
 * pages as well, so the new wording lives here and is only consulted when a
 * page is rendered inside <LanguageProvider variant="lavender">. A key may
 * override one language only; the other falls through to the shared string.
 *
 * Go-live: fold these values into `translations` and delete this file.
 */
export const lavenderOverrides: Record<string, Partial<Record<Language, string>>> = {
  // --- EmpCo Audit ---
  'empco.hero.subtitle': {
    de: 'Der automatisierte Audit, der dich vor EmpCo-Verstößen auf deiner Website schützt. Innerhalb weniger Stunden weißt du, welche Nachhaltigkeitsaussagen belegbar sind und welche zum Risiko werden.',
  },
  'empco.anchor.what': { en: 'About the audit' },
  'empco.why.p2': {
    de: 'Parallel verschärft die CSRD die Anforderungen an die nicht-finanzielle Berichterstattung. Aussagen auf deiner Website müssen zu deiner ESG-Berichterstattung passen. Wer hier Lücken hat, fällt auf. Intern, extern, vor Gericht.',
  },
  'empco.what.p2': {
    de: 'Der EmpCo Audit ersetzt nicht deine Juristen. Er ersetzt die Arbeit davor. Statt sich durch die gesamte Website zu lesen, bekommt dein Team eine fertig priorisierte Liste auf den Tisch. Mit jeder kritischen Aussage, jeder Fundstelle, jedem Regelverweis. Die juristische Letztprüfung läuft anschließend gezielt auf den Stellen, die wirklich juristische Bewertung benötigen.',
  },
  'empco.feature1.desc': {
    en: 'The audit reads every page, every PDF, every annual report. Long documents are analyzed in full — not just the first few paragraphs. What is online is seen.',
  },
  'empco.feature3.desc': {
    de: 'Jede markierte Aussage ist mit dem wörtlichen Zitat aus der Quelle dokumentiert. Erfindet das Modell etwas, das gar nicht auf der Seite steht, wird das automatisch erkannt und markiert. Du bekommst keine Phantom-Befunde.',
  },
  'empco.feature4.desc': {
    de: 'Jede Bewertung verweist auf einen konkreten Paragraphen aus EmpCo, UWG, einschlägige BGH-Urteile oder ISO 14021. Keine freie Modell-Interpretation. Du siehst immer, warum etwas als problematisch markiert ist.',
  },
  'empco.feature5.desc': {
    de: 'Aussagen werden im vollen Kontext bewertet — einschließlich umliegender Absätze, verwandter Seiten und passender Belege aus deiner Berichterstattung. Keine isolierte Stichwortsuche, sondern Lesen, das versteht, was die Seite tatsächlich sagt.',
  },
  'empco.feature6.desc': {
    de: 'Jede Bewertung, jede Statusänderung, jede Entscheidung ist mit Zeitstempel dokumentiert. Anschlussfähig an deine Compliance-Prozesse. Anschlussfähig gegenüber Aufsichtsbehörden.',
  },
  'empco.test.title': { de: 'Sehen, was der Audit findet. Bevor du zahlst.' },
  'empco.test.step1.title': { de: 'Du nennst uns eine URL' },
  'empco.test.step1.desc': {
    de: 'Eine Seite aus deiner Domain. Sustainability-Landingpage, Produktseite, Pressemeldung. Du entscheidest.',
  },
  'empco.test.step2.desc': {
    de: 'Der vollständige Befund landet in deinem Postfach — mit Zitaten, Regelverweisen und Priorisierung.',
  },
  'empco.test.step3.title': { de: 'Du entscheidest über den vollen Audit' },
  'empco.test.step3.desc': {
    de: 'Überzeugt das Ergebnis, beauftragst du den Audit für die gesamte Website. Festpreis, transparente Kostenvorschau vor Auftragserteilung.',
  },
  'empco.test.closing': {
    de: 'Die perfekte Steilvorlage für die Rechtsabteilung: Unser EmpCo Audit liefert Greenwashing-Risiken vorab heraus und bereitet deine Claims optimal für die juristische Prüfung auf.',
  },
  'empco.form.intro': {
    de: 'Sag uns, welche Seite wir prüfen sollen. Wir melden uns innerhalb weniger Werktage mit einem Beispielbericht.',
  },
  'empco.form.disclaimer': {
    de: 'Hinweis: Der EmpCo Audit ist eine erste technische Bestandsaufnahme und ersetzt keine qualifizierte Rechtsberatung. Für die Richtigkeit, Vollständigkeit und Aktualität der Ergebnisse übernehmen wir keine Haftung. Für die finale rechtliche Bewertung deiner Claims besprich die Audit-Ergebnisse bitte mit deiner Rechtsabteilung oder einem Rechtsanwalt bzw. einer Rechtsanwältin.',
  },
  'empco.seo.faq.a13': {
    en: 'Inventory all environmental claims and review them before the cut-off date. Remove generic claims or back them with evidence, drop non-certified labels, and revise offsetting-based climate claims. A fixed approval process between marketing, legal and sustainability, plus an audit of external communication, is recommended – the 5 steps above summarize the approach.',
  },
  'empco.seo.faq.a17': {
    en: 'Manually, several departments read the website page by page, collect claims and match them against evidence – an effort that can quickly reach five figures. An automated EmpCo audit takes over this groundwork: it identifies critical claims with their exact location and rule reference and delivers a prioritized list on which the final legal review can build.',
  },

  // --- iKnow ---
  'iknow.anchor.statusQuo': { en: 'Status quo' },
  'iknow.anchor.benefits': { en: 'Your benefits', de: 'Dein Mehrwert' },
  'iknow.intro.p1': {
    de: 'Dein Unternehmen besitzt eine Goldmine: Das kollektive Wissen deiner Organisation und deiner Mitarbeiter, das du über Jahre aufgebaut hast.',
  },
  'iknow.intro.p2': {
    de: 'Hebe diesen Schatz! KI ermöglicht dir, das personengebundene Wissen allen verfügbar zu machen. Ein Wissenspool statt einer Insel, Struktur statt Silo, zugänglich für alle.',
  },
  'iknow.what.p2': {
    de: 'Sie wächst mit dem Wissen deines Unternehmens. Kontinuierlich lernen? Selbstverständlich, das tust du ja auch.',
  },
  'iknow.what.p3': {
    de: 'Aber bitte transparent: Du behältst die volle Kontrolle über Inhalte, Quellen und Verarbeitung. Alle Daten bleiben lokal im Unternehmen, ohne Anbindung nach außen, also ohne öffentliche KI-APIs.',
  },
  'iknow.guidance.title': { de: 'Das hast du nun davon!' },
  'iknow.card3.title': { de: 'Optional: Nutze auch Gespräche' },
  'iknow.card3.description': {
    de: 'iKnow kann Meetings und Workshops transkribieren und so neues Wissen direkt in das System integrieren. So kannst du, wenn gewünscht, Wissen sichern, bevor es verloren geht.',
  },
  'iknow.card4.description': {
    de: 'Sichere Wissen heutiger Generationen für künftige: iKnow bewahrt deine wertvollste Ressource dauerhaft und sichert so das kollektive Gedächtnis deines Unternehmens.',
  },
  'iknow.card5.description': {
    de: 'iKnow arbeitet lokal: Als Desktop-Software verarbeitet es Daten sicher vor Ort. Behalte die Kontrolle über deine Daten und dein Wissen, jederzeit.',
  },
  'iknow.card6.title': { de: 'Bereit für deine Unternehmens-KI' },
  'iknow.card6.description': {
    de: 'iKnow baut für dich die Datengrundlage, die du für die Nutzung von KI-Agenten benötigst. So wird dein Unternehmen in kurzer Zeit bereit für die Zukunft mit KI – automatisiert, einfach, datensicher und auf der Höhe der Zeit.',
  },
  'iknow.howItWorks.title': { de: 'Entdecke iKnow: Der Blick ins Tool' },
  'iknow.howItWorks.p1': {
    de: 'Die Frage ist nicht, ob du KI einsetzt. Sondern worauf du sie aufbaust.',
  },
  'iknow.howItWorks.p2': {
    de: 'Erfolg und Sicherheit bedingen sich gegenseitig: Nur mit einer sicheren, internen Wissensbasis kann KI sicher und erfolgreich sein. Mach KI zu deinem Wettbewerbsvorteil!',
  },

  // --- Shared (all pages) — docs/i18n-luecken.md §11a ---
  'cta.headline': { en: 'Ready to enable your company for the agentic era?' },
  'burgerMenu.products': { en: 'Products & tools' },
};
