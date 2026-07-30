'use client';

import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Section } from './Section';

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type TestimonialSliderProps = {
  items: readonly Testimonial[];
  /** Section heading, e.g. t('testimonials.title'). */
  title: string;
  /** Decorative background (e.g. a star visual); rendered behind the content. */
  decoration?: ReactNode;
  prevLabel?: string;
  nextLabel?: string;
};

/**
 * Quote slider on a navy band.
 *
 * All quotes are rendered stacked in the same grid cell (only the active one is
 * visible), so the section always reserves the height of the *tallest* quote —
 * switching testimonials never changes the section height. It also keeps every
 * quote in the static HTML for crawlers / LLM bots.
 */
export function TestimonialSlider({
  items,
  title,
  decoration,
  prevLabel = 'Previous testimonial',
  nextLabel = 'Next testimonial',
}: TestimonialSliderProps) {
  const [idx, setIdx] = useState(0);
  const goPrev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const goNext = () => setIdx((i) => (i + 1) % items.length);

  const arrowCls =
    'inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border-0 bg-lav-white text-lav-navy lg:h-12 lg:w-12';

  const arrows = (
    <div className="flex shrink-0 gap-3">
      <button type="button" aria-label={prevLabel} onClick={goPrev} className={arrowCls}>
        <ArrowLeft size={18} strokeWidth={2} className="lg:size-5" />
      </button>
      <button type="button" aria-label={nextLabel} onClick={goNext} className={arrowCls}>
        <ArrowRight size={18} strokeWidth={2} className="lg:size-5" />
      </button>
    </div>
  );

  const stack = (
    <div className="grid w-full md:min-w-0 md:flex-1">
      {items.map((item, i) => (
        <div
          key={i}
          aria-hidden={i !== idx}
          className="flex flex-col gap-6 [grid-area:1/1] md:gap-8 lg:gap-10"
          style={{ visibility: i === idx ? 'visible' : 'hidden' }}
        >
          <p className="m-0 font-brand text-[26px] font-medium leading-[1.2] text-lav-white md:text-[40px] lg:text-h2 lg:leading-[1.1]">
            {item.quote}
          </p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-full bg-lav-white/20" />
            <div className="flex flex-col gap-0.5">
              <span className="font-brand text-body font-medium text-lav-white">{item.name}</span>
              <span className="font-brand text-[14px] font-normal text-lav-white/70 md:text-body">
                {item.role}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Section
      className="relative overflow-hidden bg-lav-navy"
      innerClassName="relative z-[2] flex flex-col gap-6 md:gap-10"
    >
      {decoration}
      <h2 className="m-0 w-full font-brand text-[28px] font-medium leading-[1.1] text-lav-white md:text-[32px] lg:text-h3">
        {title}
      </h2>

      {/* Mobile stacks arrows above the quote; from tablet up they sit beside it. */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8 lg:gap-10">
        {arrows}
        {stack}
      </div>
    </Section>
  );
}
