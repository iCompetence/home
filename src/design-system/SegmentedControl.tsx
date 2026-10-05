'use client';

import { useRef, type KeyboardEvent } from 'react';
import { cn } from '@/components/ui/utils';

export type SegmentOption<T extends string> = { value: T; label: string };

/**
 * A single choice out of a few options, as a pill row (radio group). Arrow
 * keys move the selection, as with native radio buttons.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name of the group. */
  label: string;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      data-ds="SegmentedControl"
      role="radiogroup"
      aria-label={label}
      className={cn('inline-flex gap-1 self-start rounded-pill border border-lav-navy/20 p-1', className)}
    >
      {options.map((option, i) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'inline-flex min-h-10 cursor-pointer items-center justify-center rounded-pill border-0 px-5 py-2',
              selected ? 'bg-lav-navy text-lav-white' : 'bg-transparent text-lav-navy',
            )}
          >
            <span className="lav-body block font-medium">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
