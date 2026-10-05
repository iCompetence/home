'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/components/ui/utils';

/**
 * Pill CTA button in the new design. Mirrors LavenderHome's button styles.
 * Use `asChild` to render as a link: <Button asChild><a href="…">…</a></Button>.
 */
const buttonVariants = cva(
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 font-brand text-body font-medium no-underline cursor-pointer transition-opacity duration-[var(--duration-fast)] hover:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Navy on blue: white fails AA here (2.92:1), navy reaches 5.58:1.
        primary: 'bg-lav-blue text-lav-navy',
        dark: 'bg-lav-navy text-lav-white',
        white: 'bg-lav-white text-lav-navy',
        outline: 'border border-lav-navy py-[11px] text-lav-navy bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="lav-button"
      data-ds="Button"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

/**
 * Two buttons stacked as one group — the primary and the outline button of a
 * product page's buy box (Figma: group "Aktionen", space/16, as the hero's
 * buttons side by side). Tighter than the buy box's own 32px rhythm, so the
 * pair reads as one choice.
 */
function ButtonStack({ children }: { children: React.ReactNode }) {
  return (
    <div data-ds="ButtonStack" className="flex flex-col gap-4">
      {children}
    </div>
  );
}

export { Button, ButtonStack, buttonVariants };
