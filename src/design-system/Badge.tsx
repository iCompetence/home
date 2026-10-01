import { cn } from '@/components/ui/utils';

/** Small pill label on lavender, e.g. "Gratis. Nur wenige Plätze!". */
export function Badge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      data-ds="Badge"
      className={cn('inline-flex self-start rounded-pill bg-lav-lavender px-3 py-2', className)}
    >
      {/* Own block so the vertical trim applies (not to a flex container's text). */}
      <span className="lav-small block font-medium text-lav-navy">{children}</span>
    </span>
  );
}
