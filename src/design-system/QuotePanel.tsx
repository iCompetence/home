'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';
import { Section } from './Section';

export type Quote = {
  quote: string;
  /** The person; left out where only role and company are known. */
  name?: string;
  role: string;
  /** Shown beside the role; leave out where the role already names the company. */
  company?: string;
};

/**
 * Typographic quotation marks around a quote, in the page's language. Straight
 * marks typed around the text (as in the live pages' strings) are replaced;
 * a quote that brings typographic marks of its own keeps them.
 */
export function marked(quote: string, language: string) {
  const bare = quote.trim().replace(/^"([\s\S]*)"$/, '$1');
  if (/^[„“”«»‚‘]/.test(bare)) return bare;
  return language === 'de' ? `„${bare}“` : `“${bare}”`;
}

/**
 * Customer quotes as on the night home: one quote at a time on a lilac panel,
 * set in a reading size (lead, medium) so even the longest quote (about 600
 * characters) fits one screen together with its author and the arrows. All
 * quotes share one grid cell, so the height does not jump, and all of them
 * are in the HTML. Quotation marks come from here, not from the texts.
 *
 * Author below the quote on every width: the name, then role and company;
 * without a name the role leads.
 */
export function QuotePanel({
  title,
  quotes,
  id,
  className,
  dsName = 'QuotePanel',
}: {
  title: string;
  quotes: readonly Quote[];
  id?: string;
  className?: string;
  /** The night home's nav looks for "Testimonials". */
  dsName?: string;
}) {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);
  const count = quotes.length;
  const arrow =
    'lav-star-hover inline-flex size-11 cursor-pointer items-center justify-center rounded-pill border-0 bg-lav-navy text-lav-white transition-[scale]! duration-[var(--duration-fast)] ease-out active:scale-[0.96] lg:size-12';
  return (
    <Section id={id} dsName={dsName} className={className}>
      {/* Side padding = the negative margin, so the text inside stands on the page's text edge. */}
      <div className="-mx-4 flex flex-col gap-8 rounded-card bg-lav-lavender px-4 py-6 md:-mx-8 md:px-8 md:py-10 lg:-mx-10 lg:gap-12 lg:rounded-frame lg:px-10 lg:py-14">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          {/* May wrap on narrow panels; then into two even lines, not one word alone. */}
          <h2 className="lav-h1 text-lav-navy [text-wrap:balance]">{title}</h2>
          {count > 1 && (
            <div className="flex shrink-0 items-center gap-3">
              <span aria-hidden className="lav-small mr-1 text-lav-navy/70 [font-variant-numeric:tabular-nums]">
                {index + 1} / {count}
              </span>
              <button
                type="button"
                aria-label={t('lavender.testimonials.prev')}
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className={arrow}
              >
                <ArrowLeft size={20} strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label={t('lavender.testimonials.next')}
                onClick={() => setIndex((i) => (i + 1) % count)}
                className={arrow}
              >
                <ArrowRight size={20} strokeWidth={2} />
              </button>
            </div>
          )}
        </div>
        <div className="grid">
          {quotes.map((item, i) => {
            const lead = item.name ?? item.role;
            const second = item.name ? [item.role, item.company].filter(Boolean).join(', ') : item.company;
            return (
              <figure
                key={item.quote}
                aria-hidden={i !== index}
                className={cn(
                  'col-start-1 row-start-1 m-0 flex flex-col items-start gap-8 transition-opacity duration-[var(--duration-base)] ease-out',
                  i === index ? 'opacity-100' : 'invisible opacity-0',
                )}
              >
                <blockquote className="m-0 max-w-measure-lead">
                  <p className="lav-lead font-medium text-lav-navy">{marked(item.quote, language)}</p>
                </blockquote>
                <figcaption className="flex flex-col gap-2">
                  <span className="lav-body font-medium text-lav-navy">{lead}</span>
                  {second && <span className="lav-small font-normal text-lav-navy/70">{second}</span>}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
