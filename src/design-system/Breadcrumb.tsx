import { ChevronRight } from 'lucide-react';

export type Crumb = { label: string; href?: string };

/** Breadcrumb above a product head: muted parents, the current page in navy. */
export function Breadcrumb({ items, label }: { items: readonly Crumb[]; label: string }) {
  return (
    <nav aria-label={label} data-ds="Breadcrumb">
      <ol className="m-0 flex list-none items-center gap-2 p-0">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <a href={item.href} className="lav-small font-medium text-lav-navy/70">
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className="lav-small font-medium text-lav-navy"
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronRight aria-hidden size={14} strokeWidth={2} className="text-lav-navy" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
