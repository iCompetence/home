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
  firstColumn = 'feature',
}: {
  /** Accessible name of the table (usually the heading above it). */
  caption: string;
  primaryHead: string;
  secondaryHead: string;
  rows: readonly ComparisonRow[];
  /** A check before the own value and a minus before the other one. */
  icons?: boolean;
  /**
   * 'feature' (default): the first column names the aspect (40 % on desktop).
   * 'number': a narrow 120 px column with a running number, e.g. "(01)".
   */
  firstColumn?: 'feature' | 'number';
}) {
  const numbered = firstColumn === 'number';
  const firstCol = numbered ? 'lg:w-[120px] lg:shrink-0' : 'lg:w-[40%]';
  const valueCol = numbered ? 'lg:flex-1' : 'lg:w-[30%]';
  const cell = 'gap-3 px-3 py-3 lg:px-6 lg:py-5';
  const icon = 'shrink-0';
  return (
    <div data-ds="ComparisonTable" role="table" aria-label={caption} className="flex w-full flex-col">
      <div role="row" className="flex flex-col gap-1 py-3 lg:flex-row lg:gap-0 lg:py-0">
        <div role="columnheader" className={cn('hidden lg:block', firstCol)} />
        <div
          role="columnheader"
          className={cn(
            'lav-h3 rounded-card-sm bg-lav-lavender px-3 py-3 font-medium text-lav-navy lg:rounded-b-none lg:p-6',
            valueCol,
          )}
        >
          {primaryHead}
        </div>
        <div
          role="columnheader"
          className={cn('lav-h3 px-3 py-3 font-medium text-lav-navy/70 lg:py-6 lg:pl-6 lg:pr-0', valueCol)}
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
            <div role="rowheader" className={cn('flex items-center py-3 lg:px-6 lg:py-5', firstCol)}>
              <span
                className={
                  numbered ? 'lav-small font-medium text-lav-navy/70' : 'lav-body font-medium text-lav-navy'
                }
              >
                {row.aspect}
              </span>
            </div>
            <div
              role="cell"
              className={cn(
                'flex items-center rounded-card-sm bg-lav-lavender lg:rounded-none',
                valueCol,
                cell,
                last && 'lg:rounded-b-card-sm',
              )}
            >
              {icons && <Check aria-hidden size={20} strokeWidth={2} className={cn(icon, 'text-lav-navy')} />}
              <span className="lav-body font-medium text-lav-navy">{row.primary}</span>
            </div>
            <div role="cell" className={cn('flex items-center', valueCol, cell)}>
              {icons && <Minus aria-hidden size={20} strokeWidth={2} className={cn(icon, 'text-lav-navy/50')} />}
              <span className="lav-body font-normal text-lav-navy/70">{row.secondary}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
