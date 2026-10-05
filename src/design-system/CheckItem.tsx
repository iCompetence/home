import { Check } from 'lucide-react';
import { type ReactNode } from 'react';

/** One line of a benefit list: a check in a lavender circle and a label. */
export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li data-ds="CheckItem" className="flex items-start gap-3">
      <span
        aria-hidden
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-pill bg-lav-lavender text-lav-navy"
      >
        <Check size={14} strokeWidth={2} />
      </span>
      {/* 6px above and below centres the first (trimmed) line on the mark. */}
      <span className="lav-body py-[6px] font-normal text-lav-navy">{children}</span>
    </li>
  );
}
