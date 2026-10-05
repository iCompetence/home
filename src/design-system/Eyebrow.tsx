import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';

/**
 * Small uppercase label above a heading (e.g. "Featured Product") or above
 * contact data ("Inquiries", "Phone").
 * `tone` picks the colour for light vs. dark (navy) backgrounds.
 */
export function Eyebrow({
  children,
  tone = 'navy',
  className,
}: {
  children: ReactNode;
  tone?: 'navy' | 'white';
  className?: string;
}) {
  return (
    <span
      data-ds="Eyebrow"
      className={cn(
        // Small/Medium as in Figma, trimmed to the cap height like every type step.
        'lav-small font-medium uppercase tracking-[0.5px]',
        tone === 'navy' ? 'text-lav-navy/70' : 'text-lav-white/70',
        className,
      )}
    >
      {children}
    </span>
  );
}
