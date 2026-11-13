'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { ANCHOR_SCROLL_MARGIN, Explainer, FaqSection, plainText, useInline, type FaqEntry } from '@/design-system';
import { cn } from '@/components/ui/utils';
import { previewRoute } from '@/lib/i18n-meta';
import type { DatedRoute } from '@/lib/page-dates';
import { faqPage, JsonLd } from '@/lib/structured-data';

/**
 * FAQ entries from lavender-seo.ts (`<prefix>.faq.q<n>` / `.a<n>`): answers
 * with their links for the page, as plain text for the FAQPage JSON-LD (which
 * must carry the same words as the visible answer).
 */
export function useSeoFaq(prefix: string, count: number) {
  const { t } = useLanguage();
  const inline = useInline();
  const numbers = Array.from({ length: count }, (_, i) => i + 1);
  const items: FaqEntry[] = numbers.map((n) => ({
    question: t(`${prefix}.faq.q${n}`),
    answer: inline(t(`${prefix}.faq.a${n}`)),
  }));
  const schema = numbers.map((n) => ({
    question: t(`${prefix}.faq.q${n}`),
    answer: plainText(t(`${prefix}.faq.a${n}`)),
  }));
  return { items, schema };
}

/**
 * The explanatory part of a page (orientation sheet: "SEO- & LLM-Content"):
 * an Explainer from `<prefix>.title/.answer/.lead/.b<n>.title/.b<n>.body`,
 * then, if `faqCount` is set, its own FAQ with FAQPage JSON-LD. Pages that
 * already have a FAQ add the questions there instead (useSeoFaq).
 */
export function TopicSection({
  id = 'explained',
  prefix,
  route,
  blockCount,
  faqCount = 0,
  className,
}: {
  id?: string;
  /** Key prefix in lavender-seo.ts, e.g. 'lavender.seo.iknow'. */
  prefix: string;
  /** The page's final route: its date and its URL in the JSON-LD. */
  route: DatedRoute;
  blockCount: number;
  faqCount?: number;
  className?: string;
}) {
  const { t, language } = useLanguage();
  const faq = useSeoFaq(prefix, faqCount);
  const blocks = Array.from({ length: blockCount }, (_, i) => ({
    title: t(`${prefix}.b${i + 1}.title`),
    body: t(`${prefix}.b${i + 1}.body`),
  }));
  return (
    <>
      <Explainer
        id={id}
        title={t(`${prefix}.title`)}
        answer={t(`${prefix}.answer`)}
        lead={t(`${prefix}.lead`)}
        blocks={blocks}
        updated={route}
        className={cn(ANCHOR_SCROLL_MARGIN, className)}
      />
      {faqCount > 0 && (
        <>
          <FaqSection
            id={`${id}-faq`}
            className={ANCHOR_SCROLL_MARGIN}
            title={t(`${prefix}.faqTitle`)}
            items={faq.items}
          />
          <JsonLd data={faqPage({ lang: language, path: previewRoute(route), items: faq.schema })} />
        </>
      )}
    </>
  );
}
