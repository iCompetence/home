/**
 * Structured data (schema.org JSON-LD) for the redesigned pages.
 *
 * Every preview page emits one graph from its page.tsx (server, so it is in
 * the static HTML): Organization, WebSite, the WebPage itself with
 * `dateModified`, the visible breadcrumb and what the page is about (a
 * product or service). FAQs are emitted by the page components next to the
 * visible questions (faqPage), because their strings live in the client-side
 * i18n module; they must match the visible text word for word.
 *
 * Nodes are linked by @id, so a crawler sees one iCompetence, not one per
 * page. app/[lang]/layout.tsx still emits its own, thinner Organization with
 * the same @id (so the two merge into one entity); at go-live replace it with
 * organizationNode().
 */
import { pageUrl, SITE_NAME, SITE_URL, type Lang } from './i18n-meta';

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Node = Record<string, unknown>;

/** The company, with the address and contact data of the imprint. */
export function organizationNode(): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: 'iCompetence GmbH',
    url: SITE_URL,
    logo: `${SITE_URL}/iCompetence_logo.svg`,
    email: 'info@icompetence.de',
    telephone: '+49 40 22636380',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Weidenallee 10c',
      postalCode: '20357',
      addressLocality: 'Hamburg',
      addressCountry: 'DE',
    },
    sameAs: ['https://www.linkedin.com/company/icompetence/'],
  };
}

function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['de', 'en'],
    publisher: { '@id': ORG_ID },
  };
}

/** A crumb of the visible breadcrumb; `path` is relative to /<lang>/ (previewRoute). */
export type SchemaCrumb = { name: string; path?: string; hash?: string };

/** What a product page is about. */
export type PageSubject =
  | { kind: 'software'; name: string; description: string; category?: string }
  | { kind: 'service'; name: string; description: string; serviceType: string }
  | { kind: 'course'; name: string; description: string; free?: boolean };

function subjectNode(subject: PageSubject, url: string, lang: Lang): Node {
  const base = {
    '@id': `${url}#subject`,
    name: subject.name,
    description: subject.description,
    url,
  };
  switch (subject.kind) {
    case 'software':
      return {
        '@type': 'SoftwareApplication',
        ...base,
        applicationCategory: subject.category ?? 'BusinessApplication',
        publisher: { '@id': ORG_ID },
      };
    case 'service':
      return {
        '@type': 'Service',
        ...base,
        serviceType: subject.serviceType,
        provider: { '@id': ORG_ID },
      };
    case 'course':
      return {
        '@type': 'Course',
        ...base,
        inLanguage: lang,
        provider: { '@id': ORG_ID },
        ...(subject.free ? { isAccessibleForFree: true } : {}),
      };
  }
}

/**
 * The graph of one page. `path` is the page's path below /<lang>/ from
 * previewRoute(); `dateModified` comes from PAGE_UPDATED.
 */
export function pageGraph({
  lang,
  path,
  title,
  description,
  dateModified,
  type = 'WebPage',
  breadcrumb,
  subject,
  aboutOrganization = false,
}: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  dateModified: string;
  /** WebPage subtype, e.g. 'ContactPage' or 'CollectionPage'. */
  type?: string;
  breadcrumb?: readonly SchemaCrumb[];
  subject?: PageSubject;
  /** The page is about the company itself (the home page). */
  aboutOrganization?: boolean;
}): Node {
  const url = pageUrl(path, lang);
  const graph: Node[] = [organizationNode(), websiteNode()];
  const page: Node = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    dateModified,
    ...(aboutOrganization ? { about: { '@id': ORG_ID } } : {}),
  };
  graph.push(page);
  if (breadcrumb?.length) {
    page.breadcrumb = { '@id': `${url}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: breadcrumb.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        // The last crumb is the page itself.
        item:
          i === breadcrumb.length - 1
            ? url
            : `${pageUrl(crumb.path ?? '', lang)}${crumb.hash ? `#${crumb.hash}` : ''}`,
      })),
    });
  }
  if (subject) {
    page.mainEntity = { '@id': `${url}#subject` };
    graph.push(subjectNode(subject, url, lang));
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** FAQPage from the questions and answers exactly as the page shows them. */
export function faqPage({
  lang,
  path,
  items,
}: {
  lang: Lang;
  path: string;
  items: readonly { question: string; answer: string }[];
}): Node {
  const url = pageUrl(path, lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    inLanguage: lang,
    isPartOf: { '@id': `${url}#webpage` },
    // Soft hyphens (break hints in long headings) are not part of the words.
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question.replace(/\u00AD/g, ''),
      acceptedAnswer: { '@type': 'Answer', text: item.answer.replace(/\u00AD/g, '') },
    })),
  };
}

/**
 * Renders JSON-LD into the static HTML. `<` is escaped so no string can
 * close the script element.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** The visible breadcrumb of the product pages: "Produkte › <name>". */
export function productCrumbs(lang: Lang, homePath: string, name: string): SchemaCrumb[] {
  return [{ name: lang === 'de' ? 'Produkte' : 'Products', path: homePath, hash: 'products' }, { name }];
}
