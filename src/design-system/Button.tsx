'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/components/ui/utils';

/**
 * Pill button of "Licht und Linie". Use `asChild` to render as a link:
 * <Button asChild><a href="…">…</a></Button>.
 *
 * States, as on the night home: hover and keyboard focus fill the button with
 * the double star's gradient (.lav-star-hover in globals.css: white label,
 * the outline goes, hover only under a fine pointer), a press squeezes it to
 * 96 %. .lav-star-hover also stops double-tap zoom and text selection on touch.
 *
 * Colours: `primary` only for the one main action of a page (request the
 * sample page, start the trial, send the form, the nav's contact button).
 * Everything else is `solid` or `soft`. All three take their colours from the
 * surface they stand on. `primary` is navy on the light page and blue on the
 * night (2026-11-13: blue only on dark ground, so a light page shows one blue
 * button, the one in the nav bar). `solid` is navy on the light page and
 * white on the night: on light the two look the same, on the night the blue
 * one is the main action and the white one the second.
 *
 * `soft` is the quiet second button: a fill without a line (lavender on the
 * light page, a white veil on the night), so next to a filled button only one
 * of the two carries weight. It replaced the outlined button (2026-11-13). On
 * a lavender card it would vanish: use `solid` there.
 */
const buttonVariants = cva(
  'lav-star-hover inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 font-brand text-body font-medium no-underline cursor-pointer transition-[color,border-color,scale] duration-[var(--duration-fast)] ease-out not-disabled:active:scale-[0.96] disabled:cursor-default [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Follows the surface (--color-lav-primary in globals.css): navy with a
        // light label on the light page; blue with a navy label on the night
        // (white on blue fails AA at 2.92:1, navy reaches 5.58:1).
        primary: 'bg-lav-primary text-lav-on-primary',
        // Filled in the ink colour: navy on the light page, white on the night.
        solid: 'bg-lav-ink text-lav-ground',
        // Quiet fill in --color-lav-soft (follows the surface, see globals.css).
        soft: 'bg-lav-soft text-lav-ink',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  },
);

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;

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
 * Two buttons stacked as one group — the primary and the soft button of a
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

export { Button, ButtonStack, buttonVariants, type ButtonVariant };
