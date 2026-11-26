/**
 * Privacy policy of the redesigned site: the sections around the EmpCo part
 * and the list of services (drafted 26.11.2026 for go-live, to be checked by
 * someone with legal training before it counts as final).
 *
 * What it states is what the site does: hosted by Netlify, forms through
 * Netlify Forms with reCAPTCHA, consent through Usercentrics, and the
 * services configured there (see servicesData in ServiceAccordion.tsx, which
 * mirrors the Usercentrics settings gRxSmB1lD). Change the text when one of
 * these changes.
 *
 * Same lookup as lavender-seo.ts (variant "lavender"), RichText format
 * (src/design-system/RichText.tsx).
 */
export const lavenderLegal: Record<string, { en: string; de: string }> = {
  'privacyPolicy.controller.title': { de: `Verantwortlicher`, en: `Controller` },
  'privacyPolicy.controller.body': {
    de: `Verantwortlich für die Verarbeitung deiner Daten auf dieser Website ist:

**iCompetence GmbH**
Weidenallee 10c
20357 Hamburg

Telefon: +49 40 22636380
E-Mail: [info@icompetence.de](mailto:info@icompetence.de)

Wenn du Fragen zum Datenschutz hast oder eines deiner Rechte ausüben möchtest, schreib uns an diese Adresse.`,
    en: `The controller responsible for processing your data on this website is:

**iCompetence GmbH**
Weidenallee 10c
20357 Hamburg, Germany

Phone: +49 40 22636380
Email: [info@icompetence.de](mailto:info@icompetence.de)

If you have questions about data protection or want to exercise one of your rights, write to us at this address.`,
  },

  'privacyPolicy.general.title': { de: `Allgemeine Hinweise`, en: `General information` },

  'privacyPolicy.hosting.title': { de: `Hosting`, en: `Hosting` },
  'privacyPolicy.hosting.body': {
    de: `Diese Website liegt bei Netlify Inc. (USA). Wenn du eine Seite aufrufst, verarbeitet Netlify die Daten, die dein Browser dabei überträgt: IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite sowie Angaben zu Browser und Betriebssystem. Ohne diese Daten lässt sich die Seite nicht ausliefern und nicht gegen Angriffe schützen.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der Website. Die Übermittlung in die USA ist über EU-Standardvertragsklauseln abgesichert.`,
    en: `This website is hosted by Netlify Inc. (USA). When you open a page, Netlify processes the data your browser transmits: IP address, date and time, the page requested, and details of your browser and operating system. The page cannot be delivered or protected against attacks without this data.

The legal basis is Art. 6 (1) (f) GDPR. Our legitimate interest is the secure and stable operation of the website. The transfer to the USA is safeguarded by EU Standard Contractual Clauses.`,
  },

  'privacyPolicy.forms.title': { de: `Formulare und Anfragen`, en: `Forms and inquiries` },
  'privacyPolicy.forms.body': {
    de: `Über unsere Formulare kannst du Kontakt aufnehmen, ein Erstgespräch buchen, dich für den KI-Workshop bewerben oder einen Testzugang zum Campaign Parameter Tool anfragen. Wir verarbeiten dabei die Angaben, die du einträgst:

- Name und E-Mail-Adresse
- je nach Formular Unternehmen, Position und Telefonnummer
- dein Anliegen, also Thema, Nachricht oder Wunschtermin

Wir nutzen diese Angaben, um deine Anfrage zu bearbeiten und dir zu antworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn deine Anfrage auf einen Vertrag zielt, sonst Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt darin, Anfragen zu beantworten.

Die Formulare laufen technisch über unseren Hoster Netlify. Zum Schutz vor automatisierten Einsendungen setzen wir reCAPTCHA von Google ein. Details dazu stehen unten bei den eingesetzten Diensten.

Wir löschen deine Angaben, sobald deine Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Für das EmpCo-Audit-Formular gelten zusätzlich die Angaben im nächsten Abschnitt.`,
    en: `You can use our forms to get in touch, book an initial consultation, apply for the AI workshop or request trial access to the Campaign Parameter Tool. We process the details you enter:

- name and email address
- depending on the form: company, position and phone number
- your request, meaning topic, message or preferred date

We use these details to handle your request and to reply to you. The legal basis is Art. 6 (1) (b) GDPR where your request aims at a contract, otherwise Art. 6 (1) (f) GDPR. Our legitimate interest is answering inquiries.

Technically, the forms run through our hosting provider Netlify. To protect against automated submissions we use reCAPTCHA by Google. Details are listed below under the services we use.

We delete your details once your request has been dealt with and no statutory retention periods apply. For the EmpCo audit form, the information in the next section applies in addition.`,
  },

  'privacyPolicy.consent.title': { de: `Einwilligung und Cookies`, en: `Consent and cookies` },
  'privacyPolicy.consent.body': {
    de: `Beim ersten Besuch fragen wir dich über ein Einwilligungsfenster von Usercentrics, welche Dienste wir einsetzen dürfen. Dienste der Kategorie „Statistik“ laden erst, wenn du zugestimmt hast. Das sind derzeit Google Analytics 4, Google Ads und PostHog. Rechtsgrundlage ist deine Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.

Deine Auswahl kannst du jederzeit ändern oder widerrufen. Dafür gibt es die Schaltfläche mit dem Fingerabdruck am unteren Bildschirmrand. Der Widerruf gilt für die Zukunft.

Dienste der Kategorie „Essenzielle & funktionale Technologien“ sind nötig, damit die Website funktioniert, und laden ohne Einwilligung. Welche Dienste das sind und welche Daten sie verarbeiten, steht im folgenden Abschnitt.`,
    en: `On your first visit, a consent window by Usercentrics asks which services we may use. Services in the category “Statistics” only load once you have agreed. At present these are Google Analytics 4, Google Ads and PostHog. The legal basis is your consent under Art. 6 (1) (a) GDPR and Section 25 (1) TDDDG.

You can change or withdraw your choice at any time using the button with the fingerprint at the bottom of the screen. Withdrawal applies to the future.

Services in the category “Essential & functional technologies” are needed for the website to work and load without consent. The following section lists these services and the data they process.`,
  },

  'privacyPolicy.services.title': { de: `Eingesetzte Dienste`, en: `Services we use` },

  'privacyPolicy.rights.title': { de: `Deine Rechte`, en: `Your rights` },
  'privacyPolicy.rights.body': {
    de: `Du hast uns gegenüber folgende Rechte in Bezug auf deine personenbezogenen Daten:

- Auskunft: Du kannst erfahren, welche Daten wir über dich verarbeiten (Art. 15 DSGVO).
- Berichtigung: Du kannst falsche Daten korrigieren lassen (Art. 16 DSGVO).
- Löschung: Du kannst verlangen, dass wir deine Daten löschen (Art. 17 DSGVO).
- Einschränkung: Du kannst verlangen, dass wir die Verarbeitung einschränken (Art. 18 DSGVO).
- Datenübertragbarkeit: Du kannst deine Daten in einem gängigen Format erhalten (Art. 20 DSGVO).
- Widerspruch: Du kannst einer Verarbeitung widersprechen, die auf Art. 6 Abs. 1 lit. f DSGVO beruht (Art. 21 DSGVO).
- Widerruf: Eine Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).

Schreib uns dafür an [info@icompetence.de](mailto:info@icompetence.de).

Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für uns zuständig ist der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit, [datenschutz-hamburg.de](https://datenschutz-hamburg.de).`,
    en: `You have the following rights towards us regarding your personal data:

- Access: you can find out which data we process about you (Art. 15 GDPR).
- Rectification: you can have incorrect data corrected (Art. 16 GDPR).
- Erasure: you can ask us to delete your data (Art. 17 GDPR).
- Restriction: you can ask us to restrict the processing (Art. 18 GDPR).
- Data portability: you can receive your data in a common format (Art. 20 GDPR).
- Objection: you can object to processing based on Art. 6 (1) (f) GDPR (Art. 21 GDPR).
- Withdrawal: you can withdraw consent at any time with effect for the future (Art. 7 (3) GDPR).

To do so, write to us at [info@icompetence.de](mailto:info@icompetence.de).

You can also lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for us is the Hamburg Commissioner for Data Protection and Freedom of Information, [datenschutz-hamburg.de](https://datenschutz-hamburg.de).`,
  },
};
