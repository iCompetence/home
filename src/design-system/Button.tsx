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
  'inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3 font-brand text-body font-medium no-underline cursor-pointer transition-opacity hover:opacity-75 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-lav-blue text-lav-white',
        dark: 'bg-lav-navy text-lav-white',
        white: 'bg-lav-white text-lav-navy',
        outline: 'border border-lav-navy text-lav-navy bg-transparent',
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
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
