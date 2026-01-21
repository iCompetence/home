'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ServiceData {
  name: { en: string; de: string };
  description: { en: string; de: string };
  company: string;
  companyAddress: string;
  dataProtectionOfficer: { en: string; de: string };
  dataProtectionOfficerLink: string;
  purposes: { en: string[]; de: string[] };
  technologies: { en: string[]; de: string[] };
  dataCollected: { en: string[]; de: string[] };
  legalBasis: string;
  processingLocation: { en: string; de: string };
  retentionPeriod: { en: string; de: string };
  thirdCountryTransfers?: { en: string[]; de: string[] };
  dataRecipients: string;
  privacyPolicyLink: string;
  cookiePolicyLink?: string;
  optOutLink?: string;
  maxCookieStorage?: { en: string; de: string };
}

const servicesData: ServiceData[] = [
  {
    name: { en: 'Google Fonts', de: 'Google Fonts' },
    description: {
      en: 'This is a collection of fonts for commercial and personal use.',
      de: 'Dies ist eine Sammlung von Schriftarten für den kommerziellen und persönlichen Gebrauch.'
    },
    company: 'Google Ireland Limited',
    companyAddress: 'Gordon House, 4 Barrow St, Dublin 4, Ireland',
    dataProtectionOfficer: {
      en: 'Below you can find the email address of the data protection officer of the processing company.',
      de: 'Nachfolgend finden Sie die E-Mail-Adresse des Datenschutzbeauftragten des verarbeitenden Unternehmens.'
    },
    dataProtectionOfficerLink: 'https://support.google.com/policies/contact/general_privacy_form',
    purposes: {
      en: ['Provision of fonts', 'Service improvement'],
      de: ['Bereitstellung von Schriftarten', 'Verbesserung des Dienstes']
    },
    technologies: { en: ['API'], de: ['API'] },
    dataCollected: {
      en: ['IP address', 'Aggregated usage numbers', 'Font request', 'Referrer URL', 'CSS requests', 'User Agent', 'Browser information'],
      de: ['IP-Adresse', 'Aggregierte Nutzungszahlen', 'Schriftart-Anfrage', 'Referrer URL', 'CSS-Anfragen', 'User Agent', 'Browser-Informationen']
    },
    legalBasis: 'Art. 6 Abs. 1 S. 1 lit. a DSGVO',
    processingLocation: { en: 'European Union', de: 'Europäische Union' },
    retentionPeriod: {
      en: 'Data is deleted as soon as it is no longer needed for processing purposes.',
      de: 'Daten werden gelöscht, sobald sie für die Verarbeitungszwecke nicht mehr benötigt werden.'
    },
    thirdCountryTransfers: {
      en: ['United States of America', 'Singapore', 'Taiwan', 'Chile'],
      de: ['Vereinigte Staaten von Amerika', 'Singapur', 'Taiwan', 'Chile']
    },
    dataRecipients: 'Alphabet Inc., Google LLC, Google Ireland Limited',
    privacyPolicyLink: 'https://business.safety.google/privacy/?hl=en',
    cookiePolicyLink: 'https://policies.google.com/technologies/cookies?hl=en'
  },
  {
    name: { en: 'Google Tag Manager', de: 'Google Tag Manager' },
    description: {
      en: 'This is a tag management system. Tags can be centrally integrated via a user interface through Google Tag Manager. Tags are small code sections that can track activities. Script codes from other tools are integrated via the Tag Manager. The Tag Manager allows you to control when a specific tag is triggered.',
      de: 'Dies ist ein Tag-Management-System. Über den Google Tag Manager können Tags zentral über eine Benutzeroberfläche eingebunden werden. Tags sind kleine Codeabschnitte, die Aktivitäten verfolgen können. Über den Google Tag Manager werden Scriptcodes anderer Tools eingebunden. Der Tag Manager ermöglicht es zu steuern, wann ein bestimmtes Tag ausgelöst wird.'
    },
    company: 'Google Ireland Limited',
    companyAddress: 'Google Building Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    dataProtectionOfficer: {
      en: 'Below you can find the email address of the data protection officer of the processing company.',
      de: 'Nachfolgend finden Sie die E-Mail-Adresse des Datenschutzbeauftragten des verarbeitenden Unternehmens.'
    },
    dataProtectionOfficerLink: 'https://support.google.com/policies/contact/general_privacy_form',
    purposes: {
      en: ['Tag management'],
      de: ['Tag-Verwaltung']
    },
    technologies: { en: ['Website tags'], de: ['Webseiten-Tags'] },
    dataCollected: {
      en: ['Aggregated data about tag triggering'],
      de: ['Aggregierte Daten über die Tag-Auslösung']
    },
    legalBasis: 'Art. 6 Abs. 1 S. 1 lit. a DSGVO',
    processingLocation: { en: 'European Union', de: 'Europäische Union' },
    retentionPeriod: {
      en: 'Data is deleted as soon as it is no longer needed for processing purposes.',
      de: 'Die Daten werden gelöscht, sobald sie für die Zwecke der Verarbeitung nicht mehr benötigt werden.'
    },
    thirdCountryTransfers: {
      en: ['Singapore', 'Taiwan', 'Chile', 'United States of America'],
      de: ['Singapur', 'Taiwan', 'Chile', 'Vereinigte Staaten von Amerika']
    },
    dataRecipients: 'Alphabet Inc., Google LLC, Google Ireland Limited',
    privacyPolicyLink: 'https://business.safety.google/privacy/?hl=de',
    cookiePolicyLink: 'https://policies.google.com/technologies/cookies?hl=de'
  },
  {
    name: { en: 'gstatic.com', de: 'gstatic.com' },
    description: {
      en: 'This is a domain used by Google to offload static content to a different domain name to reduce bandwidth usage and increase network performance for the end user.',
      de: 'Dies ist eine Domain, die von Google verwendet wird, um statische Inhalte auf einen anderen Domainnamen auszulagern, um die Bandbreitennutzung zu reduzieren und die Netzwerkleistung für den Endbenutzer zu erhöhen.'
    },
    company: 'Alphabet Inc.',
    companyAddress: '1600 Amphitheatre Parkway, Mountain View, CA 94043-1351, United States of America',
    dataProtectionOfficer: {
      en: 'Below you can find the email address of the data protection officer of the processing company.',
      de: 'Nachfolgend finden Sie die E-Mail-Adresse des Datenschutzbeauftragten des verarbeitenden Unternehmens.'
    },
    dataProtectionOfficerLink: 'https://support.google.com/policies/contact/general_privacy_form',
    purposes: {
      en: ['Increasing network performance', 'Reducing bandwidth usage'],
      de: ['Steigerung der Netzwerkleistung', 'Reduzieren der Bandbreitennutzung']
    },
    technologies: { en: ['JavaScript'], de: ['JavaScript'] },
    dataCollected: {
      en: ['Images', 'CSS'],
      de: ['Bilder', 'CSS']
    },
    legalBasis: 'Art. 6 Abs. 1 S. 1 lit. f DSGVO',
    processingLocation: { en: 'United States of America', de: 'Vereinigte Staaten von Amerika' },
    retentionPeriod: {
      en: 'CSS asset requests are cached for 1 day, font files are cached for one year. Some information is stored until it is removed by the user, others expire after a certain time, others are stored until the user\'s Google account is deleted.',
      de: 'Anfragen für CSS-Assets werden für 1 Tag zwischengespeichert, Schriftdateien werden für ein Jahr zwischengespeichert. Einige Informationen werden gespeichert, bis sie vom Nutzer entfernt werden, andere laufen nach einer bestimmten Zeit ab, andere werden gespeichert, bis das Google-Konto des Nutzers gelöscht wird.'
    },
    thirdCountryTransfers: {
      en: ['United States of America', 'China', 'Taiwan', 'Singapore'],
      de: ['Vereinigte Staaten von Amerika', 'China', 'Taiwan', 'Singapur']
    },
    dataRecipients: 'Alphabet Inc., Google LLC, Google Ireland Limited',
    privacyPolicyLink: 'http://www.google.com/intl/de/policies/privacy/',
    cookiePolicyLink: 'https://policies.google.com/technologies/cookies?hl=en',
    optOutLink: 'https://safety.google/privacy/privacy-controls/',
    maxCookieStorage: { en: 'Session', de: 'Session' }
  },
  {
    name: { en: 'reCAPTCHA', de: 'reCAPTCHA' },
    description: {
      en: 'This is a service that checks whether data input is performed by a human or by an automated program.',
      de: 'Dabei handelt es sich um einen Dienst, der überprüft, ob die Dateneingabe durch einen Menschen oder durch ein automatisiertes Programm erfolgt.'
    },
    company: 'Google Ireland Limited',
    companyAddress: 'Google Building Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    dataProtectionOfficer: {
      en: 'Below you can find the email address of the data protection officer of the processing company.',
      de: 'Nachfolgend finden Sie die E-Mail-Adresse des Datenschutzbeauftragten des verarbeitenden Unternehmens.'
    },
    dataProtectionOfficerLink: 'https://support.google.com/policies/contact/general_privacy_form',
    purposes: {
      en: ['Bot protection', 'Spam prevention', 'Fraud detection'],
      de: ['Bot-Schutz', 'Spam-Vorbeugung', 'Betrugserkennung']
    },
    technologies: { en: ['Scripts'], de: ['Skripten'] },
    dataCollected: {
      en: ['Browser language', 'Browser plugins', 'Click path', 'Date and time of visit', 'IP address', 'User behavior', 'Time spent on page', 'User input', 'Device information', 'Mouse movements', 'Geographic location', 'Device operating system'],
      de: ['Browser-Sprache', 'Browser-Plugins', 'Klickpfad', 'Datum und Uhrzeit des Besuchs', 'IP-Adresse', 'Nutzerverhalten', 'Auf einer Seite verbrachte Zeit', 'Benutzereingabe', 'Geräteinformationen', 'Mausbewegungen', 'Geografischer Standort', 'Gerätebestriebssystem']
    },
    legalBasis: 'Art. 6 Abs. 1 S. 1 lit. a DSGVO',
    processingLocation: { en: 'European Union', de: 'Europäische Union' },
    retentionPeriod: {
      en: 'Data is deleted as soon as it is no longer needed for processing purposes.',
      de: 'Die Daten werden gelöscht, sobald sie für die Zwecke der Verarbeitung nicht mehr erforderlich sind.'
    },
    thirdCountryTransfers: {
      en: ['United States of America', 'Singapore', 'Taiwan', 'Chile'],
      de: ['Vereinigte Staaten von Amerika', 'Singapur', 'Taiwan', 'Chile']
    },
    dataRecipients: 'Alphabet Inc., Google LLC, Google Ireland Limited',
    privacyPolicyLink: 'https://business.safety.google/privacy/?hl=en',
    cookiePolicyLink: 'https://policies.google.com/technologies/cookies?hl=en',
    maxCookieStorage: { en: '180 days', de: '180 Tage' }
  },
  {
    name: { en: 'Usercentrics Consent Management Platform', de: 'Usercentrics Consent Management Platform' },
    description: {
      en: 'This is a consent management service. On websites and apps, Usercentrics GmbH is used as a data processor to ensure consent management.',
      de: 'Dies ist ein Zustimmungs-Management-Dienst. Auf Websites und Apps kommt die Usercentrics GmbH als Auftragsverarbeiter zum Einsatz, um das Zustimmungsmanagement zu gewährleisten.'
    },
    company: 'Usercentrics GmbH',
    companyAddress: 'Sendlinger Str. 7, 80331 Munich, Germany',
    dataProtectionOfficer: {
      en: 'Below you can find the email address of the data protection officer of the processing company.',
      de: 'Nachfolgend finden Sie die E-Mail-Adresse des Datenschutzbeauftragten des verarbeitenden Unternehmens.'
    },
    dataProtectionOfficerLink: 'mailto:datenschutz@usercentrics.com',
    purposes: {
      en: ['Compliance with legal obligations', 'Consent storage'],
      de: ['Einhaltung der gesetzlichen Verpflichtungen', 'Einwilligungsspeicherung']
    },
    technologies: { en: ['Local Storage', 'Pixel'], de: ['Local Storage', 'Pixel'] },
    dataCollected: {
      en: ['Opt-in and opt-out data', 'Referrer URL', 'User Agent', 'User settings', 'Consent ID', 'Time of consent', 'Consent type', 'Template version', 'Banner language', 'IP address', 'Geographic location'],
      de: ['Opt-in- und Opt-out-Daten', 'Referrer URL', 'User Agent', 'Benutzereinstellungen', 'Consent ID', 'Zeitpunkt der Einwilligung', 'Einwilligungstyp', 'Template-Version', 'Banner-Sprache', 'IP-Adresse', 'Geografischer Standort']
    },
    legalBasis: 'Art. 6 Abs. 1 S. 1 lit. c DSGVO',
    processingLocation: { en: 'European Union', de: 'Europäische Union' },
    retentionPeriod: {
      en: 'Consent data (granted consent and revocation of consent) is stored for one year. The data is then deleted immediately.',
      de: 'Die Einwilligungsdaten (erteilte Einwilligung und Widerruf der Einwilligung) werden ein Jahr gespeichert. Die Daten werden dann unverzüglich gelöscht.'
    },
    dataRecipients: 'Usercentrics GmbH',
    privacyPolicyLink: 'https://usercentrics.com/privacy-policy/'
  },
  {
    name: { en: 'Google Analytics 4', de: 'Google Analytics 4' },
    description: {
      en: 'This is an analytics service. The service enables measuring traffic and engagement on websites and mobile apps across devices using customizable reports.',
      de: 'Dies ist ein Analysedienst. Der Dienst ermöglicht es, den Verkehr und das Engagement auf Websites und mobilen Apps geräteübergreifend anhand anpassbarer Berichte zu messen.'
    },
    company: 'Google Ireland Limited',
    companyAddress: 'Google Building Gordon House, 4 Barrow St, Dublin, D04 E5W5, Ireland',
    dataProtectionOfficer: {
      en: 'Below you can find the email address of the data protection officer of the processing company.',
      de: 'Nachfolgend finden Sie die E-Mail-Adresse des Datenschutzbeauftragten des verarbeitenden Unternehmens.'
    },
    dataProtectionOfficerLink: 'https://support.google.com/policies/contact/general_privacy_form',
    purposes: {
      en: ['Marketing', 'Analytics'],
      de: ['Marketing', 'Analyse']
    },
    technologies: { en: ['Tracking code', 'Cookies'], de: ['Tracking-Code', 'Cookies'] },
    dataCollected: {
      en: ['Device information', 'Geographic location', 'Browser information', 'Screen resolution', 'Referrer URL', 'Interaction data', 'Date and time of visit', 'User behavior', 'Visited pages', 'Online identifiers', 'Truncated IP address', 'User ID', 'Advertising identifier', 'Purchase information', 'Device operating system'],
      de: ['Geräteinformationen', 'Geografischer Standort', 'Browser-Informationen', 'Bildschirmauflösung', 'Referrer URL', 'Interaktionsdaten', 'Datum und Uhrzeit des Besuchs', 'Nutzerverhalten', 'Besuchte Seiten', 'Online-Identifikatoren', 'Gekürzte IP-Adresse', 'Nutzer-ID', 'Werbekennung', 'Kaufinformationen', 'Gerätebetriebssystem']
    },
    legalBasis: 'Art. 6 Abs. 1 S. 1 lit. a DSGVO',
    processingLocation: { en: 'European Union', de: 'Europäische Union' },
    retentionPeriod: {
      en: 'Data is stored for up to 50 months depending on the controller\'s choice.',
      de: 'Die Daten werden je nach Wahl des Verantwortlichen bis zu 50 Monate lang gespeichert.'
    },
    thirdCountryTransfers: {
      en: ['Singapore', 'Taiwan', 'Chile', 'United States of America'],
      de: ['Singapur', 'Taiwan', 'Chile', 'Vereinigte Staaten von Amerika']
    },
    dataRecipients: 'Alphabet Inc., Google LLC, Google Ireland Limited',
    privacyPolicyLink: 'https://business.safety.google/privacy/?hl=en',
    cookiePolicyLink: 'https://policies.google.com/technologies/cookies?hl=en',
    optOutLink: 'https://tools.google.com/dlpage/gaoptout?hl=de',
    maxCookieStorage: { en: '731 days', de: '731 Tage' }
  }
];

const labels = {
  services: { en: 'Services', de: 'Services' },
  description: { en: 'Service Description', de: 'Beschreibung des Services' },
  processingCompany: { en: 'Processing Company', de: 'Verarbeitendes Unternehmen' },
  dataProtectionOfficer: { en: 'Data Protection Officer of the Processing Company', de: 'Datenschutzbeauftragter der verarbeitenden Firma' },
  purposes: { en: 'Data Processing Purposes', de: 'Datenverarbeitungszwecke' },
  purposesDescription: {
    en: 'This list represents the purposes of data collection and processing.',
    de: 'Diese Liste stellt die Zwecke der Datenerhebung und -verarbeitung dar.'
  },
  technologies: { en: 'Technologies Used', de: 'Genutzte Technologien' },
  technologiesDescription: {
    en: 'This list contains all technologies with which this service collects data. Typical technologies are cookies and pixels placed in the browser.',
    de: 'Diese Liste enthält alle Technologien, mit denen dieser Dienst Daten sammelt. Typische Technologien sind Cookies und Pixel, die im Browser platziert werden.'
  },
  dataCollected: { en: 'Data Collected', de: 'Erhobene Daten' },
  dataCollectedDescription: {
    en: 'This list contains all (personal) data collected by or through the use of the service.',
    de: 'Diese Liste enthält alle (persönlichen) Daten, die bei der oder durch die Nutzung des Services gesammelt werden.'
  },
  legalBasis: { en: 'Legal Basis', de: 'Rechtsgrundlage' },
  legalBasisDescription: {
    en: 'The following is the required legal basis for processing data.',
    de: 'Im Folgenden wird die erforderliche Rechtsgrundlage für die Verarbeitung von Daten genannt.'
  },
  processingLocation: { en: 'Processing Location', de: 'Ort der Verarbeitung' },
  processingLocationDescription: {
    en: 'This is the primary location where the collected data is processed. If the data is also processed in other countries, you will be informed separately.',
    de: 'Dies ist der primäre Ort, an dem die gesammelten Daten verarbeitet werden. Sollten die Daten auch in anderen Ländern verarbeitet werden, werden Sie gesondert informiert.'
  },
  retentionPeriod: { en: 'Retention Period', de: 'Aufbewahrungsdauer' },
  retentionPeriodDescription: {
    en: 'The retention period is the time span during which the collected data is stored for processing. The data must be deleted as soon as it is no longer needed for the stated processing purposes.',
    de: 'Die Aufbewahrungsfrist ist die Zeitspanne, in der die gesammelten Daten für die Verarbeitung gespeichert werden. Die Daten müssen gelöscht werden, sobald sie für die angegebenen Verarbeitungszwecke nicht mehr benötigt werden.'
  },
  thirdCountryTransfers: { en: 'Third Country Transfers', de: 'Weitergabe an Drittländer' },
  thirdCountryTransfersDescription: {
    en: 'When using this service, the collected data may be transferred to another country. Please note that data may be transferred to a country that does not have the required data protection standards. Below is a list of countries to which data is transferred. For more information on security measures, please refer to the privacy policy of the respective provider or contact the provider directly.',
    de: 'Bei in Inanspruchnahme dieser Dienstleistung können die gesammelten Daten in ein anderes Land weitergeleitet werden. Bitte beachten Sie, dass im Rahmen dieser Dienstleistung die Daten möglicherweise in ein Land übertragen werden, das nicht über die erforderlichen Datenschutznormen verfügt. Nachstehend finden Sie eine Liste der Länder, in die die Daten übertragen werden. Weitere Informationen zu den Sicherheitsmaßnahmen entnehmen Sie bitte der Datenschutzerklärung des jeweiligen Anbieters oder wenden Sie sich unmittelbar an den Anbieter selbst.'
  },
  dataRecipients: { en: 'Data Recipients', de: 'Datenempfänger' },
  dataRecipientsDescription: {
    en: 'The following lists the recipients of the collected data.',
    de: 'Im Folgenden werden die Empfänger der erhobenen Daten aufgelistet.'
  },
  privacyPolicy: { en: 'Click here to read the data processor\'s privacy policy', de: 'Klicken Sie hier, um die Datenschutzbestimmungen des Datenverarbeiters zu lesen' },
  cookiePolicy: { en: 'Click here to read the data processor\'s cookie policy', de: 'Klicken Sie hier, um die Cookie-Richtlinie des Datenverarbeiters zu lesen' },
  optOut: { en: 'Click here to opt out on all domains of the processing company', de: 'Klicken Sie hier, um auf allen Domains des verarbeitenden Unternehmens zu widerrufen' },
  maxCookieStorage: { en: 'Maximum Cookie Storage Duration', de: 'Höchstgrenze für die Speicherung von Cookies' },
  storedInformation: { en: 'Stored Information', de: 'Gespeicherte Informationen' },
  storageDescription: {
    en: 'Below you can see the longest potential storage duration on a device, set when using the cookie storage method and when using other methods.',
    de: 'Unten sehen Sie die längste potenzielle Speicherdauer auf einem Gerät, die bei Verwendung der Cookie-Speichermethode und bei Verwendung anderer Methoden festgelegt wurde.'
  }
};

interface ServiceAccordionProps {
  language: 'en' | 'de';
}

export const ServiceAccordion = ({ language }: ServiceAccordionProps) => {
  const [openServices, setOpenServices] = useState<number[]>([]);

  const toggleService = (index: number) => {
    setOpenServices(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const isOpen = (index: number) => openServices.includes(index);

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#0b99cc'
        }}
      >
        {labels.services[language]}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {servicesData.map((service, index) => (
          <div
            key={index}
            style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <button
              onClick={() => toggleService(index)}
              style={{
                width: '100%',
                padding: '1rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <span
                style={{
                  color: 'var(--gray-white)',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              >
                {service.name[language]}
              </span>
              <ChevronDown
                size={20}
                style={{
                  color: 'var(--gray-light)',
                  transform: isOpen(index) ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>

            <div
              style={{
                maxHeight: isOpen(index) ? '2000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.5s ease-in-out',
                opacity: isOpen(index) ? 1 : 0
              }}
            >
              <div style={{ padding: '0 0 1.5rem 0', fontSize: '14px', lineHeight: '1.6' }}>
                {/* Description */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.description[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)' }}>{service.description[language]}</p>
                </div>

                {/* Processing Company */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.processingCompany[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)' }}>{service.company}</p>
                  <p style={{ color: 'var(--gray-light)' }}>{service.companyAddress}</p>
                </div>

                {/* Data Protection Officer */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.dataProtectionOfficer[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.25rem' }}>{service.dataProtectionOfficer[language]}</p>
                  <a href={service.dataProtectionOfficerLink} target="_blank" rel="noopener noreferrer" style={{ color: '#0b99cc', textDecoration: 'none' }}>
                    {service.dataProtectionOfficerLink}
                  </a>
                </div>

                {/* Purposes */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.purposes[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.purposesDescription[language]}</p>
                  <ul style={{ color: 'var(--gray-light)', margin: 0, paddingLeft: '1.25rem' }}>
                    {service.purposes[language].map((purpose, i) => (
                      <li key={i}>{purpose}</li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.technologies[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.technologiesDescription[language]}</p>
                  <ul style={{ color: 'var(--gray-light)', margin: 0, paddingLeft: '1.25rem' }}>
                    {service.technologies[language].map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </div>

                {/* Data Collected */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.dataCollected[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.dataCollectedDescription[language]}</p>
                  <ul style={{ color: 'var(--gray-light)', margin: 0, paddingLeft: '1.25rem' }}>
                    {service.dataCollected[language].map((data, i) => (
                      <li key={i}>{data}</li>
                    ))}
                  </ul>
                </div>

                {/* Legal Basis */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.legalBasis[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.legalBasisDescription[language]}</p>
                  <p style={{ color: 'var(--gray-light)' }}>{service.legalBasis}</p>
                </div>

                {/* Processing Location */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.processingLocation[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.processingLocationDescription[language]}</p>
                  <p style={{ color: 'var(--gray-light)' }}>{service.processingLocation[language]}</p>
                </div>

                {/* Retention Period */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.retentionPeriod[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.retentionPeriodDescription[language]}</p>
                  <p style={{ color: 'var(--gray-light)' }}>{service.retentionPeriod[language]}</p>
                </div>

                {/* Third Country Transfers */}
                {service.thirdCountryTransfers && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {labels.thirdCountryTransfers[language]}
                    </h4>
                    <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.thirdCountryTransfersDescription[language]}</p>
                    <ul style={{ color: 'var(--gray-light)', margin: 0, paddingLeft: '1.25rem' }}>
                      {service.thirdCountryTransfers[language].map((country, i) => (
                        <li key={i}>{country}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Data Recipients */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {labels.dataRecipients[language]}
                  </h4>
                  <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.dataRecipientsDescription[language]}</p>
                  <p style={{ color: 'var(--gray-light)' }}>{service.dataRecipients}</p>
                </div>

                {/* Links */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    <a href={service.privacyPolicyLink} target="_blank" rel="noopener noreferrer" style={{ color: '#0b99cc', textDecoration: 'none' }}>
                      {labels.privacyPolicy[language]}
                    </a>
                  </p>
                  {service.cookiePolicyLink && (
                    <p style={{ marginBottom: '0.5rem' }}>
                      <a href={service.cookiePolicyLink} target="_blank" rel="noopener noreferrer" style={{ color: '#0b99cc', textDecoration: 'none' }}>
                        {labels.cookiePolicy[language]}
                      </a>
                    </p>
                  )}
                  {service.optOutLink && (
                    <p style={{ marginBottom: '0.5rem' }}>
                      <a href={service.optOutLink} target="_blank" rel="noopener noreferrer" style={{ color: '#0b99cc', textDecoration: 'none' }}>
                        {labels.optOut[language]}
                      </a>
                    </p>
                  )}
                </div>

                {/* Max Cookie Storage */}
                {service.maxCookieStorage && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ color: '#0b99cc', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {labels.storedInformation[language]}
                    </h4>
                    <p style={{ color: 'var(--gray-light)', marginBottom: '0.5rem', fontSize: '13px' }}>{labels.storageDescription[language]}</p>
                    <p style={{ color: 'var(--gray-light)' }}>
                      <strong>{labels.maxCookieStorage[language]}:</strong> {service.maxCookieStorage[language]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
