import { cn } from '@/components/ui/utils';

/**
 * Small pill label, e.g. "Gratis. Nur wenige Plätze!". Lavender by default;
 * `navy` for use on a lavender surface.
 */
export function Badge({
  children,
  tone = 'lavender',
  className,
}: {
  children: string;
  tone?: 'lavender' | 'navy';
  className?: string;
}) {
  return (
    <span
      data-ds="Badge"
      className={cn(
        'inline-flex self-start rounded-pill px-3 py-2',
        tone === 'navy' ? 'bg-lav-navy text-lav-white' : 'bg-lav-lavender text-lav-navy',
        className,
      )}
    >
      {/* Own block so the vertical trim applies (not to a flex container's text). */}
      <span className="lav-small block font-medium">{children}</span>
    </span>
  );
}
