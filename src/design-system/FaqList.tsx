'use client';

import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/components/ui/utils';

export type FaqEntry = { question: string; answer: string };

/**
 * FAQ accordion. Answers stay in the DOM when collapsed (grid-rows 0fr → 1fr)
 * so the content is crawlable and matches the FAQPage structured data.
 */
export function FaqList({
  items,
  defaultOpen = 0,
}: {
  items: readonly FaqEntry[];
  /** Index open on first render; null for all closed. */
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div data-ds="FaqList" className="flex w-full flex-col border-b border-lav-navy/20">
      {items.map((item, i) => {
        const expanded = open === i;
        const Icon = expanded ? Minus : Plus;
        return (
          <div key={item.question} className="border-t border-lav-navy/20">
            <h3 className="m-0">
              <button
                type="button"
                id={`${baseId}-q${i}`}
                aria-expanded={expanded}
                aria-controls={`${baseId}-a${i}`}
                onClick={() => setOpen((o) => (o === i ? null : i))}
                className="flex min-h-[76px] w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent py-6 text-left"
              >
                <span className="lav-h3 text-lav-navy">{item.question}</span>
                <Icon aria-hidden size={24} strokeWidth={2} className="shrink-0 text-lav-navy" />
              </button>
            </h3>
            <div
              id={`${baseId}-a${i}`}
              role="region"
              aria-labelledby={`${baseId}-q${i}`}
              className={cn(
                'grid transition-[grid-template-rows] duration-[var(--duration-base)] ease-[var(--ease-emphasized)]',
                expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className={cn('min-h-0 overflow-hidden', !expanded && 'invisible')}>
                <p className="lav-body whitespace-pre-line pb-6 pr-0 pt-1 font-normal text-lav-navy/80 md:pr-16">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
