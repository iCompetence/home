import { type ReactNode } from 'react';
import { Section } from './Section';

export type StatementProps = {
  /** The single oversized sentence this section exists for. */
  text: string;
  /** Optional action directly below it (a Button, `solid` unless it is the page's main action). */
  action?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * One oversized sentence, as on the night home: calm, left-aligned on the
 * text edge, no star behind it (the sky's guide star is the one star on the
 * page). `text-wrap: balance` keeps the lines even instead of leaving one
 * word alone. Ink colour, so it reads on the day sheet and on the night.
 */
export function Statement({ text, action, id, className }: StatementProps) {
  return (
    <Section dsName="Statement" id={id} className={className}>
      <div className="flex flex-col items-start gap-8 lg:gap-10">
        <p className="lav-statement max-w-measure-wide text-lav-ink [text-wrap:balance]">{text}</p>
        {action}
      </div>
    </Section>
  );
}
