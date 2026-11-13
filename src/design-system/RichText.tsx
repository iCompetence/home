'use client';

import { Fragment, type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';
import { siteHref } from './routes';
import { DataTable } from './DataTable';

/**
 * A tiny text format for the explanatory copy in lavender-seo.ts, so a whole
 * block can live in one translation string and still come out as real HTML
 * (lists and tables are what crawlers and AI answers lift):
 *
 * - blocks are separated by a blank line
 * - a block whose lines all start with "- " is a <ul>, "1. " an <ol>
 * - a block whose lines all start with "|" is a <table>, the first row its head
 * - anything else is a paragraph
 * - inline: **bold** and [label](/route/) for internal links (through
 *   siteHref, so they stay in the preview) or [label](https://…) external
 * - in a list item, "Term: text" sets the term in bold when it is short
 */

const INLINE = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** The text without markup and soft hyphens: for JSON-LD, which must match the visible words. */
export function plainText(text: string): string {
  return text.replace(INLINE, (_, bold, label) => bold ?? label).replace(/\u00AD/g, '');
}

/** Inline linkified/bold nodes of one line. */
export function useInline() {
  const { language } = useLanguage();
  return (text: string): ReactNode[] => {
    const out: ReactNode[] = [];
    let last = 0;
    for (const m of text.matchAll(INLINE)) {
      if (m.index! > last) out.push(text.slice(last, m.index));
      if (m[1] !== undefined) {
        out.push(
          <strong key={m.index} className="font-medium text-lav-navy">
            {m[1]}
          </strong>,
        );
      } else {
        const href = m[3];
        const external = /^https?:\/\//.test(href);
        out.push(
          <a
            key={m.index}
            href={external ? href : siteHref(language, href)}
            {...(external ? { target: '_blank', rel: 'noopener' } : {})}
            // underline! — PageShell's unlayered `a { text-decoration: none }`
            // beats the plain utility; links in running text need the line.
            className="text-inherit underline! underline-offset-2"
          >
            {m[2]}
          </a>,
        );
      }
      last = m.index! + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
  };
}

/** "Term: explanation" with a short term → the term in bold. */
function listItem(line: string, inline: (t: string) => ReactNode[]): ReactNode {
  const cut = line.indexOf(': ');
  if (cut > 0 && cut <= 48 && !line.slice(0, cut).includes('**')) {
    return (
      <>
        <strong className="font-medium text-lav-navy">{line.slice(0, cut)}:</strong>{' '}
        {inline(line.slice(cut + 2))}
      </>
    );
  }
  return inline(line);
}

/** Renders a string in the format above. */
export function RichBody({ text, className }: { text: string; className?: string }) {
  const inline = useInline();
  const blocks = text.split(/\n\s*\n/).map((b) => b.split('\n').filter((l) => l.trim() !== ''));
  const body = 'lav-body font-normal text-lav-navy/80';
  return (
    // break-words: long tokens such as a UTM link must wrap on phones.
    <div className={cn('flex flex-col gap-6 break-words', className)}>
      {blocks.map((lines, i) => {
        if (lines.every((l) => l.startsWith('- '))) {
          return (
            <ul key={i} className={cn(body, 'm-0 flex list-disc flex-col gap-3 pl-5 marker:text-lav-navy/50')}>
              {lines.map((l) => (
                <li key={l}>{listItem(l.slice(2), inline)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\d+\. /.test(l))) {
          return (
            <ol key={i} className={cn(body, 'm-0 flex list-decimal flex-col gap-3 pl-5 marker:text-lav-navy/50')}>
              {lines.map((l) => (
                <li key={l}>{listItem(l.replace(/^\d+\. /, ''), inline)}</li>
              ))}
            </ol>
          );
        }
        if (lines.every((l) => l.startsWith('|'))) {
          const cells = lines.map((l) =>
            l
              .replace(/^\|/, '')
              .replace(/\|$/, '')
              .split('|')
              .map((c) => c.trim()),
          );
          return <DataTable key={i} head={cells[0]} rows={cells.slice(1)} renderCell={inline} />;
        }
        return (
          <p key={i} className={body}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {inline(l)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
