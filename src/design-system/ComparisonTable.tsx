import { Check, Minus } from 'lucide-react';
import { cn } from '@/components/ui/utils';

export type ComparisonRow = { aspect: string; primary: string; secondary: string };

/**
 * Two options side by side, the own one highlighted in lavender.
 * Desktop: a three-column table. Tablet and mobile: stacked — the two column
 * heads first, then per row the aspect, the own value and the other value.
 */
export function ComparisonTable({
  caption,
  primaryHead,
  secondaryHead,
  rows,
  icons = false,
}: {
  /** Accessible name of the table (usually the heading above it). */
  caption: string;
  primaryHead: string;
  secondaryHead: string;
  rows: readonly ComparisonRow[];
  /** A check before the own value and a minus before the other one. */
  icons?: boolean;
}) {
  const cell = 'gap-3 px-3 py-3 lg:px-6 lg:py-5';
  const icon = 'shrink-0';
  return (
    <div data-ds="ComparisonTable" role="table" aria-label={caption} className="flex w-full flex-col">
      <div role="row" className="flex flex-col gap-1 py-3 lg:flex-row lg:gap-0 lg:py-0">
        <div role="columnheader" className="hidden lg:block lg:w-[40%]" />
        <div
          role="columnheader"
          className="lav-h3 rounded-card-sm bg-lav-lavender px-3 py-3 font-medium text-lav-navy lg:w-[30%] lg:rounded-b-none lg:p-6"
        >
          {primaryHead}
        </div>
        <div
          role="columnheader"
          className="lav-h3 px-3 py-3 font-medium text-lav-navy/70 lg:w-[30%] lg:py-6 lg:pl-6 lg:pr-0"
        >
          {secondaryHead}
        </div>
      </div>
      {rows.map((row, i) => {
        const last = i === rows.length - 1;
        return (
          <div
            key={row.aspect}
            role="row"
            className="flex flex-col gap-1 border-t border-lav-navy/20 py-3 lg:flex-row lg:items-stretch lg:gap-0 lg:py-0"
          >
            {/* The text sits in its own block: text-box trim does not apply to
                a flex container's direct text. */}
            <div role="rowheader" className="flex items-center py-3 lg:w-[40%] lg:px-6 lg:py-5">
              <span className="lav-body font-medium text-lav-navy">{row.aspect}</span>
            </div>
            <div
              role="cell"
              className={cn(
                'flex items-center rounded-card-sm bg-lav-lavender lg:w-[30%] lg:rounded-none',
                cell,
                last && 'lg:rounded-b-card-sm',
              )}
            >
              {icons && <Check aria-hidden size={20} strokeWidth={2} className={cn(icon, 'text-lav-navy')} />}
              <span className="lav-body font-medium text-lav-navy">{row.primary}</span>
            </div>
            <div role="cell" className={cn('flex items-center lg:w-[30%]', cell)}>
              {icons && <Minus aria-hidden size={20} strokeWidth={2} className={cn(icon, 'text-lav-navy/50')} />}
              <span className="lav-body font-normal text-lav-navy/70">{row.secondary}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
