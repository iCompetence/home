import type { Lang } from '@/lib/i18n-meta';

/**
 * Content of the legal pages for the app "iCompetence Media Monitoring"
 * (privacy policy, data deletion instructions, terms of use). The URLs are
 * entered in the Meta (Facebook, Instagram, Threads) and LinkedIn developer apps.
 *
 * Inline markup in strings: **bold**, [label](href), and [[OFFEN: …]] / [[OPEN: …]]
 * for points that still need a decision. Those render as a highlighted
 * placeholder — the pages must not go live while any are left.
 */

type Text = Record<Lang, string>;

export type LegalBlock =
  | { type: 'p'; text: Text }
  | { type: 'list'; items: Text[] }
  | { type: 'steps'; items: Text[] }
  | { type: 'table'; head: Text[]; rows: Text[][] }
  | { type: 'provider' };

export interface LegalSection {
  title: Text;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  route: string;
  meta: Record<Lang, { title: string; description: string }>;
  title: Text;
  intro: Text;
  sections: LegalSection[];
}

export type LegalDocId = 'privacy' | 'deletion' | 'terms';

export const APP_NAME = 'iCompetence Media Monitoring';

// Contact for privacy and deletion requests (confirmed by iCompetence).
const PRIVACY_EMAIL = 'info@iCompetence.de';
const mail = `[${PRIVACY_EMAIL}](mailto:${PRIVACY_EMAIL})`;

export const UPDATED: Text = {
  de: 'Stand: 29. Oktober 2026',
  en: 'Last updated: 29 October 2026',
};

export const RELATED_TITLE: Text = {
  de: `Weitere Informationen zu „${APP_NAME}“`,
  en: `More information on "${APP_NAME}"`,
};

export const IMPRINT_LABEL: Text = {
  de: 'Impressum & Datenschutz der Website',
  en: 'Website legal disclosure & privacy',
};

export const PROVIDER: Record<Lang, string[]> = {
  de: [
    '**iCompetence GmbH**',
    'Weidenallee 10c, 20357 Hamburg',
    'Geschäftsführer: Matthias Postel',
    'Registergericht: Amtsgericht Hamburg, HRB 110059',
    'Telefon: +49 40 22636380',
    'E-Mail: [info@iCompetence.de](mailto:info@iCompetence.de)',
  ],
  en: [
    '**iCompetence GmbH**',
    'Weidenallee 10c, 20357 Hamburg, Germany',
    'Managing Director: Matthias Postel',
    'Register Court: Amtsgericht Hamburg (District Court of Hamburg), HRB 110059',
    'Phone: +49 40 22636380',
    'Email: [info@iCompetence.de](mailto:info@iCompetence.de)',
  ],
};

const privacy: LegalDoc = {
  route: 'privacy-media-monitoring',
  meta: {
    de: {
      title: `Datenschutzhinweise ${APP_NAME} | iCompetence`,
      description: `Datenschutzhinweise für die App „${APP_NAME}“: welche öffentlichen Inhalte verarbeitet werden, wozu, auf welcher Rechtsgrundlage und welche Rechte Sie haben.`,
    },
    en: {
      title: `Privacy Policy ${APP_NAME} | iCompetence`,
      description: `Privacy policy for the app "${APP_NAME}": which public content is processed, for what purpose, on what legal basis, and what rights you have.`,
    },
  },
  title: { de: 'Datenschutzhinweise', en: 'Privacy policy' },
  intro: {
    de: `Diese Hinweise gelten für die App „${APP_NAME}“ der iCompetence GmbH. Sie informieren Personen, deren öffentliche Beiträge die App erfassen kann. Die Datenschutzhinweise zu unserer Website finden Sie unter [Impressum & Datenschutz](/de/imprint/).`,
    en: `This policy applies to the app "${APP_NAME}" operated by iCompetence GmbH. It informs people whose public posts the app may collect. The privacy policy for our website is available under [Legal Disclosure & Privacy](/en/imprint/).`,
  },
  sections: [
    {
      title: { de: 'Die App in Kürze', en: 'The app at a glance' },
      blocks: [
        {
          type: 'p',
          text: {
            de: `„${APP_NAME}“ ist eine Software für Medienbeobachtung, die wir im Auftrag von Unternehmenskunden betreiben. Nach einer Pressemitteilung eines Kunden sammelt sie öffentlich zugängliche Reaktionen darauf, etwa Artikel, Beiträge und Kommentare. Diese wertet sie nach Themen, Stimmung, Quellen sowie häufigen und auffälligen Aussagen aus. Die Ergebnisse sieht nur der jeweilige Kunde, in einer passwortgeschützten Anwendung.`,
            en: `"${APP_NAME}" is media monitoring software that we operate on behalf of business clients. After a client publishes a press release, it collects publicly available reactions to it, such as articles, posts and comments. It analyses them by topic, sentiment, source, and frequent or notable statements. Only the respective client sees the results, in a password-protected application.`,
          },
        },
        {
          type: 'list',
          items: [
            {
              de: 'Die App liest nur **öffentlich zugängliche Inhalte**. Bei eigenen Kanälen eines Kunden liest sie nur das, wofür ein Administrator dieses Kanals den Zugriff ausdrücklich freigegeben hat.',
              en: "The app only reads **publicly available content**. For a client's own channels, it only reads what an administrator of that channel has explicitly granted access to.",
            },
            {
              de: 'Niemand meldet sich mit Facebook, Instagram, Threads oder LinkedIn bei der App an. Es gibt keine Konten für Endnutzer.',
              en: 'Nobody logs in to the app with Facebook, Instagram, Threads or LinkedIn. There are no end-user accounts.',
            },
            {
              de: 'Wir erstellen **keine Profile über Privatpersonen**. Ausgewertet wird die Reaktion auf eine Veröffentlichung, nicht die Person.',
              en: 'We do **not create profiles of private individuals**. What is analysed is the reaction to a publication, not the person.',
            },
            {
              de: 'Wir **verkaufen keine Daten** und nutzen sie **nicht für Werbung**.',
              en: 'We do **not sell data** and do **not use it for advertising**.',
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Verantwortlicher und Rollen', en: 'Controller and roles' },
      blocks: [
        { type: 'p', text: { de: 'Anbieter der App ist:', en: 'The app is provided by:' } },
        { type: 'provider' },
        {
          type: 'p',
          text: {
            de: '**Wer wofür verantwortlich ist:** Für die Medienbeobachtung im Auftrag eines Kunden ist in der Regel der jeweilige **Kunde Verantwortlicher** im Sinne der DSGVO. Die iCompetence GmbH verarbeitet die Daten dann als **Auftragsverarbeiter** nach Art. 28 DSGVO, auf Weisung des Kunden und auf Grundlage eines Vertrags zur Auftragsverarbeitung.',
            en: '**Who is responsible for what:** For monitoring carried out on behalf of a client, the respective **client is generally the controller** within the meaning of the GDPR. iCompetence GmbH then processes the data as a **processor** under Art. 28 GDPR, on the instructions of the client and on the basis of a data processing agreement.',
          },
        },
        {
          type: 'p',
          text: {
            de: 'Für den **Betrieb der App selbst** ist die iCompetence GmbH verantwortlich, zum Beispiel für die technische Bereitstellung, die Sicherheit der Systeme und die Anbindung an die Plattformen.',
            en: 'iCompetence GmbH is the controller for **operating the app itself**, for example its technical provision, the security of the systems and the connection to the platforms.',
          },
        },
        {
          type: 'p',
          text: {
            de: 'Sie können sich mit allen Anliegen an uns wenden. Betrifft Ihr Anliegen die Beobachtung für einen bestimmten Kunden, leiten wir es an diesen weiter und unterstützen ihn bei der Antwort.',
            en: 'You can contact us with any request. If your request concerns monitoring for a specific client, we forward it to that client and support them in responding.',
          },
        },
        {
          type: 'p',
          text: {
            de: `**Datenschutz-Kontakt:** ${mail}`,
            en: `**Privacy contact:** ${mail}`,
          },
        },
      ],
    },
    {
      title: { de: 'Welche Quellen die App auswertet', en: 'Sources the app analyses' },
      blocks: [
        {
          type: 'list',
          items: [
            {
              de: '**Nachrichtenseiten und Fachmedien:** öffentliche Artikel, Feeds und Suchdienste',
              en: '**News sites and trade media:** public articles, feeds and search services',
            },
            { de: '**Bluesky:** öffentliche Beiträge', en: '**Bluesky:** public posts' },
            {
              de: '**Podcasts:** öffentliche Folgenbeschreibungen und Transkripte',
              en: '**Podcasts:** public episode descriptions and transcripts',
            },
            {
              de: '**Instagram:** öffentliche Beiträge zu Hashtags sowie öffentliche Beiträge von Unternehmens- und Medienkonten',
              en: '**Instagram:** public posts on hashtags and public posts from business and media accounts',
            },
            {
              de: '**Facebook:** öffentliche Beiträge und Kommentare auf öffentlichen Facebook-Seiten, zum Beispiel von Medien',
              en: '**Facebook:** public posts and comments on public Facebook Pages, for example those of media outlets',
            },
            { de: '**Threads:** öffentliche Beiträge zu Stichworten', en: '**Threads:** public posts on keywords' },
            {
              de: '**LinkedIn:** öffentliche Beiträge, die eine Websuche findet (Titel, kurzer Ausschnitt, Link; die App ruft LinkedIn dafür nicht selbst ab), sowie Beiträge, Kommentare und Erwähnungen auf der Unternehmensseite eines Kunden, nur nach Freigabe durch einen Administrator dieser Seite',
              en: "**LinkedIn:** public posts found by a web search (title, short excerpt, link; the app does not access LinkedIn itself for these), and posts, comments and mentions on a client's company page, only after approval by an administrator of that page",
            },
            {
              de: '**Foren und Blogs:** öffentliche Webfunde über eine Websuche',
              en: '**Forums and blogs:** public results from a web search',
            },
          ],
        },
        {
          type: 'p',
          text: {
            de: '**LinkedIn:** Für Daten aus LinkedIn gilt zusätzlich:',
            en: '**LinkedIn:** The following also applies to data from LinkedIn:',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: 'Direkt von LinkedIn ruft die App Daten nur über die offizielle LinkedIn-Schnittstelle (Community Management API) ab, ausschließlich für Unternehmensseiten, deren Administrator den Zugriff ausdrücklich freigegeben hat.',
              en: 'The app retrieves data directly from LinkedIn only via the official LinkedIn interface (Community Management API), and only for company pages whose administrator has explicitly granted access.',
            },
            {
              de: 'Widerruft der Administrator die Freigabe oder endet der Auftrag des Kunden, löschen wir die über die Schnittstelle abgerufenen Daten.',
              en: "If the administrator revokes access or the client's engagement ends, we delete the data retrieved via the interface.",
            },
            {
              de: 'Daten aus LinkedIn werden nicht mit anderen Quellen zu Personenprofilen zusammengeführt und nicht an Dritte weitergegeben.',
              en: 'Data from LinkedIn is not combined with other sources into profiles of individuals and is not shared with third parties.',
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Welche Daten verarbeitet werden', en: 'What data is processed' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Zu jedem erfassten Beitrag oder Kommentar verarbeiten wir:',
            en: 'For each post or comment collected, we process:',
          },
        },
        {
          type: 'list',
          items: [
            {
              de: 'Text des Beitrags oder Kommentars, Link, Datum und Sprache',
              en: 'the text of the post or comment, link, date and language',
            },
            {
              de: 'Name oder Nutzername des Kontos, so wie er öffentlich angezeigt wird',
              en: 'the name or username of the account as publicly displayed',
            },
            {
              de: 'öffentliche Kennzahlen wie Likes, Kommentare und Aufrufe',
              en: 'public metrics such as likes, comments and views',
            },
            {
              de: 'Ergebnisse der Auswertung: Stimmung, Thema und Zusammenfassung',
              en: 'the results of the analysis: sentiment, topic and summary',
            },
          ],
        },
        { type: 'p', text: { de: '**Nicht** verarbeitet werden:', en: 'We do **not** process:' } },
        {
          type: 'list',
          items: [
            { de: 'private Nachrichten', en: 'private messages' },
            { de: 'nicht öffentliche Inhalte', en: 'non-public content' },
            { de: 'Zugangsdaten von Dritten', en: 'login credentials of third parties' },
          ],
        },
        {
          type: 'p',
          text: {
            de: 'Besondere Kategorien personenbezogener Daten nach Art. 9 DSGVO, etwa Angaben zur Gesundheit oder zu politischen Meinungen, erheben wir nicht gezielt.',
            en: 'We do not deliberately collect special categories of personal data under Art. 9 GDPR, such as data concerning health or political opinions.',
          },
        },
        {
          type: 'p',
          text: {
            de: 'Die Daten stammen aus den oben genannten öffentlich zugänglichen Quellen (Art. 14 Abs. 2 lit. f DSGVO).',
            en: 'The data comes from the publicly available sources listed above (Art. 14(2)(f) GDPR).',
          },
        },
      ],
    },
    {
      title: { de: 'Zweck und Rechtsgrundlage', en: 'Purpose and legal basis' },
      blocks: [
        {
          type: 'p',
          text: {
            de: '**Zweck:** Medienbeobachtung und Auswertung der öffentlichen Resonanz auf Veröffentlichungen eines Unternehmens, zum Beispiel auf eine Pressemitteilung.',
            en: "**Purpose:** media monitoring and analysis of the public response to a company's publications, for example a press release.",
          },
        },
        {
          type: 'p',
          text: {
            de: '**Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse unserer Kunden liegt darin, öffentliche Reaktionen auf ihre eigenen Veröffentlichungen auszuwerten. Bei der Abwägung berücksichtigen wir, dass die Verfasser ihre Inhalte selbst öffentlich gemacht haben, dass keine Profile über Personen entstehen, dass nur der jeweilige Kunde die Ergebnisse sieht und dass die Daten nur begrenzt gespeichert werden. Für den Betrieb der App stützen wir uns ebenfalls auf Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist ein sicherer und zuverlässiger Betrieb.',
            en: '**Legal basis:** Art. 6(1)(f) GDPR. Our clients have a legitimate interest in analysing public reactions to their own publications. In balancing interests, we take into account that the authors made their content public themselves, that no profiles of individuals are created, that only the respective client sees the results, and that the data is stored for a limited time only. For operating the app, we also rely on Art. 6(1)(f) GDPR; our legitimate interest is secure and reliable operation.',
          },
        },
        {
          type: 'p',
          text: {
            de: '**Keine automatisierten Entscheidungen:** Die KI-Auswertung fasst öffentliche Reaktionen zusammen. Sie trifft keine Entscheidungen über einzelne Personen im Sinne von Art. 22 DSGVO.',
            en: '**No automated decisions:** The AI analysis summarises public reactions. It does not make decisions about individuals within the meaning of Art. 22 GDPR.',
          },
        },
        {
          type: 'p',
          text: {
            de: '**Warum diese Seite:** Wir kennen die Verfasser öffentlicher Beiträge in der Regel nicht und können sie nicht direkt erreichen. Eine Benachrichtigung jeder einzelnen Person wäre unverhältnismäßig (Art. 14 Abs. 5 lit. b DSGVO). Deshalb stellen wir diese Informationen hier öffentlich bereit.',
            en: '**Why this page:** As a rule, we do not know the authors of public posts and cannot contact them directly. Notifying every individual would involve a disproportionate effort (Art. 14(5)(b) GDPR). We therefore make this information publicly available here.',
          },
        },
      ],
    },
    {
      title: { de: 'Empfänger und Dienstleister', en: 'Recipients and service providers' },
      blocks: [
        {
          type: 'p',
          text: {
            de: '**Kunde:** Der jeweilige Unternehmenskunde erhält nur die Auswertungen zu seinen eigenen Veröffentlichungen.',
            en: '**Client:** Each business client only receives the analyses of its own publications.',
          },
        },
        {
          type: 'p',
          text: {
            de: '**Betrieb:** Die App läuft auf einem unternehmenseigenen Server der iCompetence GmbH in Deutschland. Dort werden die Daten auch gespeichert; einen externen Hosting-Dienstleister setzen wir dafür nicht ein.',
            en: '**Operation:** The app runs on a company-owned server of iCompetence GmbH in Germany, where the data is also stored. We do not use an external hosting provider for this.',
          },
        },
        {
          type: 'p',
          text: {
            de: '**Dienstleister:** Für die KI-Auswertung nutzen wir folgenden Dienstleister:',
            en: '**Service provider:** We use the following service provider for the AI analysis:',
          },
        },
        {
          type: 'table',
          head: [
            { de: 'Dienstleister', en: 'Provider' },
            { de: 'Zweck', en: 'Purpose' },
            { de: 'Standort', en: 'Location' },
            { de: 'Grundlage der Übermittlung', en: 'Transfer mechanism' },
          ],
          rows: [
            [
              { de: 'Anthropic, PBC (Claude)', en: 'Anthropic, PBC (Claude)' },
              {
                de: 'KI-Auswertung von Texten: Stimmung, Thema, Zusammenfassung',
                en: 'AI analysis of text: sentiment, topic, summary',
              },
              { de: 'USA', en: 'USA' },
              {
                de: 'EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO), Bestandteil des Vertrags zur Auftragsverarbeitung von Anthropic',
                en: "EU Standard Contractual Clauses (Art. 46(2)(c) GDPR), part of Anthropic's data processing agreement",
              },
            ],
          ],
        },
        {
          type: 'p',
          text: {
            de: 'Mit Anthropic besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Er ist Bestandteil der Bedingungen für die API-Nutzung und enthält die EU-Standardvertragsklauseln. Anthropic verarbeitet die Inhalte nur, um die Auswertung zu erbringen, und nutzt sie nicht zum Training seiner Modelle.',
            en: 'A data processing agreement under Art. 28 GDPR is in place with Anthropic. It forms part of the terms for API use and includes the EU Standard Contractual Clauses. Anthropic processes the content only to perform the analysis and does not use it to train its models.',
          },
        },
        {
          type: 'p',
          text: {
            de: '**Plattformen:** Die App liest Inhalte von den jeweiligen Plattformen, unter anderem von Meta (Facebook, Instagram, Threads), LinkedIn und Bluesky. Diese Plattformen erhalten von uns keine Auswertungen. Für die Verarbeitung auf den Plattformen selbst gelten deren eigene Datenschutzbestimmungen.',
            en: "**Platforms:** The app reads content from the respective platforms, including Meta (Facebook, Instagram, Threads), LinkedIn and Bluesky. These platforms do not receive any analyses from us. Processing on the platforms themselves is governed by the platforms' own privacy policies.",
          },
        },
        // Wording agreed with the app team (2026-10-29). Must be part of the
        // legal review before go-live; change only together with the app.
        {
          type: 'p',
          text: {
            de: '**Suchdienste:** Um Reaktionen zu finden, schickt die App Suchbegriffe an Suchdienste, etwa an Google News (Google LLC, USA; EU-US Data Privacy Framework) und an Brave Search (Brave Software, Inc., USA), sowie an die Suchfunktionen der Plattformen. Die Suchbegriffe bestehen aus dem Namen des Unternehmens, Themen der Pressemitteilung und den Namen der Personen, die in der Pressemitteilung genannt sind. Daten über Verfasser von Beiträgen geben wir an Suchdienste nicht weiter. Brave speichert Suchanfragen nach eigenen Angaben bis zu 90 Tage und stuft sie nicht als personenbezogene Daten ein; ein Vertrag zur Auftragsverarbeitung besteht dafür nicht.',
            en: '**Search services:** To find reactions, the app sends search terms to search services such as Google News (Google LLC, USA; EU-U.S. Data Privacy Framework) and Brave Search (Brave Software, Inc., USA), and to the search functions of the platforms. The search terms consist of the company name, topics of the press release and the names of the people named in the press release. We do not pass any data about the authors of posts to search services. According to Brave, it stores search queries for up to 90 days and does not consider them personal data; no data processing agreement is in place for them.',
          },
        },
        {
          type: 'p',
          text: {
            de: '**Keine Weitergabe:** Wir verkaufen keine Daten, nutzen sie nicht für Werbung und geben sie nicht an andere Dritte weiter, es sei denn, wir sind gesetzlich dazu verpflichtet.',
            en: '**No disclosure:** We do not sell data, do not use it for advertising and do not share it with any other third parties, unless we are legally obliged to do so.',
          },
        },
      ],
    },
    {
      // Planned, not yet implemented in the app. Only switch this section once the
      // app does it, and say "engagement" instead of "assignment" in the EN text.
      // Add the backup sentence then too, with the real number of days.
      //
      // DE: Texte von Beiträgen und Kommentaren sowie Namen und Nutzernamen speichern
      // wir höchstens 90 Tage ab Erfassung; danach löschen wir sie automatisch. In den
      // Auswertungen erscheinen Privatpersonen von Anfang an nicht mit Namen, sondern
      // nur in ihrer Rolle (zum Beispiel „Privatperson auf Bluesky“). Die Auswertungen
      // bleiben erhalten, solange der Auftrag des jeweiligen Kunden läuft. Ebenso lange
      // behalten wir den Link zum öffentlichen Beitrag, damit nachvollziehbar bleibt,
      // worauf eine Auswertung beruht. Er führt zum Verfasser und ist damit
      // personenbezogen; auf Ihren Widerspruch oder Löschwunsch entfernen wir ihn.
      // Endet der Auftrag, löschen wir Auswertungen und Links.
      // Backup: Aus Sicherungskopien verschwinden gelöschte Daten spätestens nach [N] Tagen.
      //
      // EN: We store the text of posts and comments as well as names and usernames for
      // no more than 90 days after collection; after that, they are deleted
      // automatically. Private individuals never appear by name in the analyses, only
      // in their role (for example “private individual on Bluesky”). The analyses are
      // kept for as long as the respective client's assignment runs. For the same
      // period we keep the link to the public post, so that it remains clear what an
      // analysis is based on. The link leads to the author and is therefore personal
      // data; we remove it if you object or request deletion. When the assignment
      // ends, we delete the analyses and links.
      // Backup: Deleted data is removed from backups after [N] days at the latest.
      title: { de: 'Speicherdauer', en: 'Retention period' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Wir speichern die Daten, solange der Auftrag des jeweiligen Kunden läuft. Endet der Auftrag, löschen wir sie; auf Anfrage auch früher (siehe [Anleitung zur Datenlöschung](/de/data-deletion-media-monitoring/)).',
            en: "We store the data for as long as the respective client's engagement continues. When the engagement ends, we delete it; on request, we delete it earlier (see [data deletion instructions](/en/data-deletion-media-monitoring/)).",
          },
        },
        {
          type: 'p',
          text: {
            de: 'Daten, die über die LinkedIn-Schnittstelle abgerufen wurden, löschen wir außerdem, sobald der Administrator der Unternehmensseite die Freigabe widerruft.',
            en: 'In addition, we delete data retrieved via the LinkedIn interface as soon as the administrator of the company page revokes access.',
          },
        },
      ],
    },
    {
      title: { de: 'Ihre Rechte', en: 'Your rights' },
      blocks: [
        { type: 'p', text: { de: 'Sie haben das Recht auf:', en: 'You have the right to:' } },
        {
          type: 'list',
          items: [
            {
              de: 'Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO)',
              en: 'access the data stored about you (Art. 15 GDPR)',
            },
            { de: 'Berichtigung unrichtiger Daten (Art. 16 DSGVO)', en: 'rectification of inaccurate data (Art. 16 GDPR)' },
            {
              de: 'Löschung (Art. 17 DSGVO), siehe [Anleitung zur Datenlöschung](/de/data-deletion-media-monitoring/)',
              en: 'erasure (Art. 17 GDPR), see [data deletion instructions](/en/data-deletion-media-monitoring/)',
            },
            { de: 'Einschränkung der Verarbeitung (Art. 18 DSGVO)', en: 'restriction of processing (Art. 18 GDPR)' },
            { de: '**Widerspruch** gegen die Verarbeitung (Art. 21 DSGVO)', en: '**object** to the processing (Art. 21 GDPR)' },
          ],
        },
        {
          type: 'p',
          text: {
            de: '**Widerspruchsrecht:** Da die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht, können Sie ihr aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen. Wir verarbeiten Ihre Beiträge dann nicht mehr, es sei denn, es liegen zwingende schutzwürdige Gründe vor, die Ihre Interessen überwiegen.',
            en: '**Right to object:** Since the processing is based on Art. 6(1)(f) GDPR, you can object to it at any time on grounds relating to your particular situation. We will then no longer process your posts, unless there are compelling legitimate grounds that override your interests.',
          },
        },
        {
          type: 'p',
          text: {
            de: `Schreiben Sie dazu einfach eine E-Mail an ${mail}. Nennen Sie die Plattform und Ihren Nutzernamen oder den Link zu Ihrem Profil, damit wir die Daten zuordnen können.`,
            en: `Simply send an email to ${mail}. Please state the platform and your username or the link to your profile so that we can identify the data.`,
          },
        },
        {
          type: 'p',
          text: {
            de: '**Beschwerde:** Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns zuständig ist der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit (HmbBfDI), Ludwig-Erhard-Straße 22, 20459 Hamburg, [datenschutz-hamburg.de](https://datenschutz-hamburg.de).',
            en: '**Complaints:** You can lodge a complaint with a data protection supervisory authority. The authority responsible for us is the Hamburg Commissioner for Data Protection and Freedom of Information (HmbBfDI), Ludwig-Erhard-Straße 22, 20459 Hamburg, Germany, [datenschutz-hamburg.de](https://datenschutz-hamburg.de).',
          },
        },
      ],
    },
    {
      title: { de: 'Änderungen', en: 'Changes' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Wir passen diese Hinweise an, wenn sich die App oder die Rechtslage ändert. Es gilt die hier veröffentlichte Fassung.',
            en: 'We update this policy when the app or the legal situation changes. The version published here applies.',
          },
        },
      ],
    },
  ],
};

const deletion: LegalDoc = {
  route: 'data-deletion-media-monitoring',
  meta: {
    de: {
      title: `Datenlöschung ${APP_NAME} | iCompetence`,
      description: `So lassen Sie Daten löschen, die die App „${APP_NAME}“ zu Ihnen gespeichert hat: Eine E-Mail genügt, wir bestätigen die Löschung.`,
    },
    en: {
      title: `Data Deletion ${APP_NAME} | iCompetence`,
      description: `How to have data deleted that the app "${APP_NAME}" has stored about you: one email is enough, and we confirm the deletion.`,
    },
  },
  title: { de: 'Datenlöschung', en: 'Data deletion' },
  intro: {
    de: `Hier erfahren Sie, wie Sie Daten löschen lassen, die die App „${APP_NAME}“ zu Ihnen gespeichert hat.`,
    en: `This page explains how to have data deleted that the app "${APP_NAME}" has stored about you.`,
  },
  sections: [
    {
      title: { de: 'Gut zu wissen', en: 'Good to know' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Die App bietet keine Anmeldung über Facebook, Instagram, Threads oder LinkedIn an. Wer sich nie bei der App angemeldet hat, hat dort auch kein Konto.',
            en: 'The app does not offer login via Facebook, Instagram, Threads or LinkedIn. If you have never logged in to the app, you do not have an account there.',
          },
        },
        {
          type: 'p',
          text: {
            de: 'Gespeichert sind höchstens öffentliche Beiträge oder Kommentare, die Sie selbst veröffentlicht haben, und deren Auswertung.',
            en: 'At most, the app stores public posts or comments that you published yourself, and their analysis.',
          },
        },
      ],
    },
    {
      title: { de: 'So beantragen Sie die Löschung', en: 'How to request deletion' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              de: `Schreiben Sie eine E-Mail an ${mail} mit dem Betreff **„Löschung Media Monitoring“**.`,
              en: `Send an email to ${mail} with the subject **"Deletion Media Monitoring"**.`,
            },
            {
              de: 'Nennen Sie die Plattform (zum Beispiel Instagram, Facebook, Threads, LinkedIn oder Bluesky) und Ihren Nutzernamen oder den Link zu Ihrem Profil. Wenn möglich, fügen Sie auch den Link zum betreffenden Beitrag hinzu.',
              en: 'State the platform (for example Instagram, Facebook, Threads, LinkedIn or Bluesky) and your username or the link to your profile. If possible, also include the link to the post in question.',
            },
            {
              de: 'Wir löschen alle gespeicherten Texte, Namen, Nutzernamen und Links zu diesem Konto und bestätigen Ihnen die Löschung per E-Mail, spätestens innerhalb von 7 Tagen.',
              en: 'We delete all stored texts, names, usernames and links relating to that account and confirm the deletion to you by email, within 7 days at the latest.',
            },
          ],
        },
      ],
    },
    {
      title: { de: 'Was gelöscht wird', en: 'What is deleted' },
      blocks: [
        {
          type: 'list',
          items: [
            { de: 'die Texte Ihrer Beiträge und Kommentare', en: 'the text of your posts and comments' },
            { de: 'Ihr Name oder Nutzername', en: 'your name or username' },
            { de: 'die Links zu Ihren Beiträgen', en: 'the links to your posts' },
          ],
        },
        {
          type: 'p',
          text: {
            de: 'Übrig bleiben nur Auswertungen ohne Bezug zu Ihrer Person, etwa eine Einordnung der Stimmung oder ein Thema. Sie lassen sich Ihnen nicht mehr zuordnen und sind damit keine personenbezogenen Daten mehr.',
            en: 'Only analyses with no link to you remain, such as a sentiment rating or a topic. They can no longer be attributed to you and are therefore no longer personal data.',
          },
        },
        {
          type: 'p',
          text: {
            de: 'Ihr Konto und Ihre Beiträge auf der Plattform selbst bleiben davon unberührt. Dafür ist die jeweilige Plattform zuständig.',
            en: 'Your account and your posts on the platform itself are not affected. The respective platform is responsible for those.',
          },
        },
        {
          type: 'p',
          text: {
            de: 'Die Angaben aus Ihrer Anfrage nutzen wir nur, um die Löschung durchzuführen und zu dokumentieren.',
            en: 'We only use the information in your request to carry out and document the deletion.',
          },
        },
      ],
    },
    {
      title: { de: 'Fragen', en: 'Questions' },
      blocks: [
        {
          type: 'p',
          text: {
            de: `Weitere Informationen finden Sie in den [Datenschutzhinweisen zur App](/de/privacy-media-monitoring/). Bei Fragen erreichen Sie uns unter ${mail}.`,
            en: `More information is available in the [privacy policy for the app](/en/privacy-media-monitoring/). If you have questions, contact us at ${mail}.`,
          },
        },
      ],
    },
  ],
};

const terms: LegalDoc = {
  route: 'terms-media-monitoring',
  meta: {
    de: {
      title: `Nutzungsbedingungen ${APP_NAME} | iCompetence`,
      description: `Nutzungsbedingungen der App „${APP_NAME}“, eines internen Werkzeugs der iCompetence GmbH für Unternehmenskunden.`,
    },
    en: {
      title: `Terms of Use ${APP_NAME} | iCompetence`,
      description: `Terms of use for the app "${APP_NAME}", an internal tool of iCompetence GmbH for business clients.`,
    },
  },
  title: { de: 'Nutzungsbedingungen', en: 'Terms of use' },
  intro: {
    de: `Diese Bedingungen gelten für die App „${APP_NAME}“.`,
    en: `These terms apply to the app "${APP_NAME}".`,
  },
  sections: [
    {
      title: { de: 'Anbieter', en: 'Provider' },
      blocks: [{ type: 'provider' }],
    },
    {
      title: { de: 'Was die App ist', en: 'What the app is' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Die App ist ein internes Werkzeug für Unternehmenskunden der iCompetence GmbH. Sie dient der Medienbeobachtung: Sie sammelt öffentliche Reaktionen auf Veröffentlichungen eines Kunden und wertet sie aus.',
            en: "The app is an internal tool for business clients of iCompetence GmbH. It is used for media monitoring: it collects public reactions to a client's publications and analyses them.",
          },
        },
        {
          type: 'p',
          text: {
            de: 'Die App wird nicht öffentlich angeboten, eine Registrierung ist nicht möglich. Zugang erhalten nur Unternehmenskunden der iCompetence GmbH, über einen passwortgeschützten Zugang.',
            en: 'The app is not offered to the public, and registration is not possible. Only business clients of iCompetence GmbH are given access, via a password-protected login.',
          },
        },
      ],
    },
    {
      title: { de: 'Nutzung der Plattformen', en: 'Use of platforms' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Die App greift nur im Rahmen der Bedingungen und Richtlinien der jeweiligen Plattformen auf Inhalte zu, etwa von Meta (Facebook, Instagram, Threads), LinkedIn und Bluesky.',
            en: 'The app only accesses content within the terms and policies of the respective platforms, such as Meta (Facebook, Instagram, Threads), LinkedIn and Bluesky.',
          },
        },
        {
          type: 'p',
          text: {
            de: 'Die Ergebnisse dürfen nur zur Medienbeobachtung genutzt werden. Sie dürfen nicht dazu dienen, einzelne Personen zu überwachen oder Profile über sie zu erstellen.',
            en: 'The results may only be used for media monitoring. They must not be used to monitor individuals or to create profiles of them.',
          },
        },
      ],
    },
    {
      title: { de: 'Datenschutz', en: 'Privacy' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Welche Daten die App verarbeitet und welche Rechte Sie haben, steht in den [Datenschutzhinweisen zur App](/de/privacy-media-monitoring/). Wie Sie Daten löschen lassen, erklärt die [Anleitung zur Datenlöschung](/de/data-deletion-media-monitoring/).',
            en: 'The [privacy policy for the app](/en/privacy-media-monitoring/) explains which data the app processes and what rights you have. The [data deletion instructions](/en/data-deletion-media-monitoring/) explain how to have data deleted.',
          },
        },
      ],
    },
    {
      title: { de: 'Kontakt', en: 'Contact' },
      blocks: [
        {
          type: 'p',
          text: {
            de: 'Für Unternehmenskunden gelten vorrangig die mit ihnen geschlossenen Verträge. Fragen zu diesen Bedingungen richten Sie bitte an [info@iCompetence.de](mailto:info@iCompetence.de).',
            en: 'For business clients, the contracts concluded with them take precedence. Please send any questions about these terms to [info@iCompetence.de](mailto:info@iCompetence.de).',
          },
        },
      ],
    },
  ],
};

export const legalDocs: Record<LegalDocId, LegalDoc> = { privacy, deletion, terms };
