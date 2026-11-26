'use client';

import { type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { DataTable, SplitBlock, siteHref } from '@/design-system';
import {
  APP_NAME,
  IMPRINT_LABEL,
  PROVIDER,
  RELATED_TITLE,
  SITE_PRIVACY_LABEL,
  UPDATED,
  legalDocs,
  type LegalBlock,
  type LegalDocId,
} from '@/components/mediaMonitoringLegalContent';
import { LegalPage } from './LegalLavender';

/**
 * The legal pages of the app "iCompetence Media Monitoring" (privacy policy,
 * data deletion, terms of use) in the frame of the site's legal pages. Their
 * addresses are entered in the Meta and LinkedIn developer apps, so they exist
 * in German and English even while the site is German only, and they keep
 * their routes. Content and its inline markup: mediaMonitoringLegalContent.ts.
 */

const body = 'lav-body font-normal text-lav-navy/80';
const inlineLink = 'lav-star-text text-inherit underline underline-offset-2';
const INLINE_TOKENS = /(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|\[[^\]]+\]\([^)]+\))/;

/** **bold**, [label](href) and [[open point]] (highlighted, so a draft cannot pass for final text). */
function inline(text: string): ReactNode[] {
  return text
    .split(INLINE_TOKENS)
    .filter(Boolean)
    .map((part, i) => {
      if (part.startsWith('**')) {
        return (
          <strong key={i} className="font-medium text-lav-navy">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('[[')) {
        return (
          <mark key={i} className="rounded bg-[#ffd54f] px-1.5 font-medium text-lav-navy">
            {part.slice(2, -2)}
          </mark>
        );
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        const external = href.startsWith('http');
        return (
          <a key={i} href={href} className={inlineLink} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {label}
          </a>
        );
      }
      return part;
    });
}

function Block({ block }: { block: LegalBlock }) {
  const { language } = useLanguage();
  switch (block.type) {
    case 'p':
      return <p className={body}>{inline(block.text[language])}</p>;
    case 'list':
    case 'steps': {
      const items = block.items.map((item, i) => <li key={i}>{inline(item[language])}</li>);
      const list = `${body} m-0 flex flex-col gap-3 pl-5 marker:text-lav-navy/50`;
      return block.type === 'steps' ? (
        <ol className={`${list} list-decimal`}>{items}</ol>
      ) : (
        <ul className={`${list} list-disc`}>{items}</ul>
      );
    }
    case 'table':
      return (
        <DataTable
          head={block.head.map((cell) => cell[language])}
          rows={block.rows.map((row) => row.map((cell) => cell[language]))}
          renderCell={inline}
        />
      );
    case 'provider':
      return (
        <p className={body}>
          {PROVIDER[language].map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {inline(line)}
            </span>
          ))}
        </p>
      );
  }
}

export default function MediaMonitoringLegalLavender({ docId }: { docId: LegalDocId }) {
  const { language } = useLanguage();
  const doc = legalDocs[docId];
  const related = (Object.keys(legalDocs) as LegalDocId[]).filter((id) => id !== docId);
  // Plain paths for the app's own pages: they exist in both languages, whatever
  // the site publishes. The site's pages go through siteHref.
  const href = (route: string) => `/${language}/${route}/`;

  return (
    <LegalPage title={doc.title[language]} eyebrow={APP_NAME}>
      <div className="flex max-w-measure-lead flex-col gap-4 pb-10">
        <p className={body}>{inline(doc.intro[language])}</p>
        <p className="lav-small font-normal text-lav-navy/70">{UPDATED[language]}</p>
      </div>

      {doc.sections.map((section, i) => (
        <SplitBlock key={i} title={section.title[language]}>
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </SplitBlock>
      ))}

      <SplitBlock title={RELATED_TITLE[language]}>
        <ul className={`${body} m-0 flex list-disc flex-col gap-3 pl-5 marker:text-lav-navy/50`}>
          {related.map((id) => (
            <li key={id}>
              <a href={href(legalDocs[id].route)} className={inlineLink}>
                {legalDocs[id].title[language]}
              </a>
            </li>
          ))}
          <li>
            <a href={siteHref(language, 'imprint')} className={inlineLink}>
              {IMPRINT_LABEL[language]}
            </a>
          </li>
          <li>
            <a href={siteHref(language, 'privacy-policy')} className={inlineLink}>
              {SITE_PRIVACY_LABEL[language]}
            </a>
          </li>
        </ul>
      </SplitBlock>
    </LegalPage>
  );
}
