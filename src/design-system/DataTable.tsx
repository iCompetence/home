import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';

/**
 * A plain data table for explanatory copy (specs, comparisons of more than
 * two options): a real <table> with a head row and the first column as row
 * headers, hairlines between rows. Wider tables scroll sideways on phones
 * instead of squeezing their columns.
 */
export function DataTable({
  head,
  rows,
  caption,
  renderCell = (text) => text,
}: {
  head: readonly string[];
  rows: readonly (readonly string[])[];
  /** Read out, not shown (the heading above usually says it). */
  caption?: string;
  renderCell?: (text: string) => ReactNode;
}) {
  const wide = head.length > 2;
  return (
    <div data-ds="DataTable" className="w-full overflow-x-auto">
      <table className={cn('w-full border-collapse text-left', wide && 'min-w-[36rem]')}>
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-lav-navy/20">
            {head.map((cell) => (
              <th key={cell} scope="col" className="lav-small py-3 pr-6 align-bottom font-medium text-lav-navy/70">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('|')} className="border-b border-lav-navy/20">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="lav-body py-4 pr-6 align-top font-medium text-lav-navy">
                    {renderCell(cell)}
                  </th>
                ) : (
                  <td key={i} className="lav-body py-4 pr-6 align-top font-normal text-lav-navy/80">
                    {renderCell(cell)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
