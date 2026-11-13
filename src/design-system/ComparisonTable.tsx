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
  /** Table caption, read out but not shown (usually the heading above it). */
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
  // Fixed widths, not flex-1: with flex the cells' padding counts towards the
  // width, and the heads (no right padding on the second) drifted 12px off
  // the columns below.
  const valueCol = numbered ? 'lg:w-[calc(50%-60px)] lg:shrink-0' : 'lg:w-[30%]';
  const cell = 'gap-3 px-3 py-3 lg:px-6 lg:py-5';
  const icon = 'shrink-0';
  // A real <table> (crawlers and AI answers lift tables as such), laid out
  // with the same flex classes as before: the sections are display:contents,
  // rows and cells flex boxes. Changing a table element's display can drop
  // its table semantics in some browsers, hence the explicit ARIA roles.
  const th = 'text-left font-medium';
  return (
    <table data-ds="ComparisonTable" role="table" className="flex w-full flex-col">
      <caption className="sr-only">{caption}</caption>
      <thead role="rowgroup" className="contents">
        <tr role="row" className="flex flex-col gap-1 py-3 lg:flex-row lg:gap-0 lg:py-0">
          <td role="cell" className={cn('hidden lg:block', firstCol)} />
          <th
            role="columnheader"
            scope="col"
            className={cn(
              th,
              'lav-h3 block rounded-card-sm bg-lav-lavender px-3 py-3 text-lav-navy lg:rounded-b-none lg:p-6',
              valueCol,
            )}
          >
            {primaryHead}
          </th>
          <th
            role="columnheader"
            scope="col"
            className={cn(th, 'lav-h3 block px-3 py-3 text-lav-navy/70 lg:py-6 lg:pl-6 lg:pr-0', valueCol)}
          >
            {secondaryHead}
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup" className="contents">
        {rows.map((row, i) => {
          const last = i === rows.length - 1;
          return (
            <tr
              key={row.aspect}
              role="row"
              className="flex flex-col gap-1 border-t border-lav-navy/20 py-3 lg:flex-row lg:items-stretch lg:gap-0 lg:py-0"
            >
              {/* The text sits in its own block: text-box trim does not apply to
                  a flex container's direct text. */}
              <th
                role="rowheader"
                scope="row"
                className={cn(th, 'flex items-center py-3 lg:px-6 lg:py-5', firstCol)}
              >
                <span
                  className={
                    numbered ? 'lav-small font-medium text-lav-navy/70' : 'lav-body font-medium text-lav-navy'
                  }
                >
                  {row.aspect}
                </span>
              </th>
              <td
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
              </td>
              <td role="cell" className={cn('flex items-center', valueCol, cell)}>
                {icons && <Minus aria-hidden size={20} strokeWidth={2} className={cn(icon, 'text-lav-navy/50')} />}
                <span className="lav-body font-normal text-lav-navy/70">{row.secondary}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
