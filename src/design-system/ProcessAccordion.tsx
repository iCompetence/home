'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { Section } from './Section';

export type ProcessStep = {
  /** Step number, e.g. "01". */
  number: string;
  title: string;
  description: string;
  /** Optional visual shown next to the description when expanded. */
  image?: string;
};

export type ProcessAccordionProps = {
  steps: readonly ProcessStep[];
  title: string;
  id?: string;
  /** Index of the step expanded on first render (default: the second one). */
  defaultExpanded?: number | null;
};

/** Numbered process steps as an accordion. */
export function ProcessAccordion({
  steps,
  title,
  id = 'process',
  defaultExpanded = 1,
}: ProcessAccordionProps) {
  const [expanded, setExpanded] = useState<number | null>(defaultExpanded);

  return (
    <Section dsName="ProcessAccordion" id={id} innerClassName="flex flex-col gap-6 md:gap-8 lg:gap-10">
      <h2 className="m-0 w-full font-brand text-[32px] font-medium leading-[1.1] text-lav-navy md:text-[40px] lg:text-h2">
        {title}
      </h2>

      <div className="flex w-full flex-col">
        {steps.map((step, idx) => (
          <ProcessRow
            key={step.number}
            step={step}
            isLast={idx === steps.length - 1}
            expanded={expanded === idx}
            onToggle={() => setExpanded((e) => (e === idx ? null : idx))}
          />
        ))}
      </div>
    </Section>
  );
}

function ProcessRow({
  step,
  isLast,
  expanded,
  onToggle,
}: {
  step: ProcessStep;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const Icon = expanded ? Minus : Plus;
  return (
    <div
      className={cn(
        'flex flex-col border-t border-lav-navy/20',
        isLast && 'border-b',
        expanded ? 'gap-4 lg:gap-8' : 'gap-0',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-5 text-left font-brand md:py-7 lg:py-8"
      >
        <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
          <span className="min-w-8 font-brand text-[22px] font-medium text-lav-navy/80 md:min-w-11 md:text-[30px] lg:min-w-14 lg:text-h3">
            {step.number}
          </span>
          <span className="font-brand text-[22px] font-medium text-lav-navy md:text-[30px] lg:text-h3">
            {step.title}
          </span>
        </div>
        <Icon size={24} strokeWidth={2} className="text-lav-navy md:size-6 lg:size-7" />
      </button>

      {/* Collapsed rows keep their copy in the static HTML for crawlers/LLM bots. */}
      {!expanded && <p className="sr-only">{step.description}</p>}

      {expanded && (
        <div className="flex w-full flex-col items-stretch gap-4 pb-6 md:flex-row md:items-start md:gap-8 lg:gap-10 lg:pb-8">
          <div className="flex flex-1 flex-col gap-6 md:py-2 md:pl-12 lg:py-4 lg:pl-16">
            <p className="m-0 font-brand text-[15px] font-normal leading-[1.5] text-lav-navy/80 md:text-body">
              {step.description}
            </p>
          </div>
          {step.image && (
            <div
              className="h-[200px] w-full shrink-0 rounded-card-sm bg-lav-navy bg-contain bg-center bg-no-repeat md:h-[220px] md:w-[320px] lg:h-[280px] lg:w-[420px]"
              style={{ backgroundImage: `url(${step.image})` }}
            />
          )}
        </div>
      )}
    </div>
  );
}
