'use client';

import { type ReactNode } from 'react';
import { Section } from './Section';
import { BrandStar } from './BrandStar';
import { DesignFrameOverlay } from './DesignFrameOverlay';
import { isCompact, useBreakpoint } from './useBreakpoint';

export type StatementProps = {
  /** The single oversized sentence this section exists for. */
  text: string;
  /** Optional CTA below it, rendered in its own band (see note). */
  action?: ReactNode;
  id?: string;
  /** id of the action band — the home page anchors #cta here. */
  actionId?: string;
};

/**
 * A centred, oversized statement over the blue brand star.
 *
 * The action deliberately sits in a *sibling* band rather than inside the
 * statement's own padding: the statement keeps the full section rhythm above
 * and below, while the button hangs off its bottom edge with padding on one
 * side only. Emitting both from one component is what keeps that pairing from
 * being re-guessed on every page.
 */
export function Statement({ text, action, id, actionId = 'cta' }: StatementProps) {
  const bp = useBreakpoint();
  const compact = isCompact(bp);
  const star = <BrandStar variant="statement" />;

  return (
    <>
      <Section dsName="Statement" id={id} className="relative" innerClassName="relative z-[2]">
        {compact ? star : <DesignFrameOverlay>{star}</DesignFrameOverlay>}
        <p className="m-0 w-full text-center font-brand text-[28px] font-medium leading-[1.15] text-lav-navy md:text-[40px] lg:text-h2 lg:leading-[1.1]">
          {text}
        </p>
      </Section>

      {action && (
        <section id={actionId} data-ds="StatementCTA" className="w-full pb-12 md:pb-14 lg:pb-16">
          <div className="mx-auto flex w-full max-w-frame justify-center px-6 md:px-12 lg:px-24">
            {action}
          </div>
        </section>
      )}
    </>
  );
}
