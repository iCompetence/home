'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Info } from 'lucide-react';

/**
 * A term with its explanation behind an info icon (Figma: InfoTip). Click or
 * tap opens the card below the term, flush with its left edge so it never
 * runs off a phone screen; a second click, Escape or a click elsewhere
 * closes it. The text stays in the HTML while closed.
 */
export function InfoTip({
  children,
  text,
  label,
  live = false,
}: {
  /** The term, e.g. "1 Parameter-Raum". */
  children: ReactNode;
  /** The explanation shown in the card. */
  text: string;
  /** Accessible name of the icon button. */
  label: string;
  /** Announce changes of the term (when it follows another control). */
  live?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} data-ds="InfoTip" className="relative flex items-center gap-2">
      <span className="lav-body font-normal text-lav-navy/80" aria-live={live ? 'polite' : undefined}>
        {children}
      </span>
      {/* 18px icon, 44px hit area. */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={cardId}
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex shrink-0 cursor-pointer rounded-pill text-lav-navy/70 before:absolute before:-inset-[13px] before:content-['']"
      >
        <Info aria-hidden size={18} strokeWidth={2} />
      </button>
      <p
        id={cardId}
        hidden={!open}
        className="lav-small absolute left-0 top-full z-10 mt-2 w-full max-w-[320px] rounded-card-sm bg-lav-navy p-4 font-normal text-lav-white shadow-[0_10px_30px_rgba(11,34,49,0.18)]"
      >
        {text}
      </p>
    </div>
  );
}
