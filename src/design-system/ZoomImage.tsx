'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Maximize2, X } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * A picture that opens full size on click: the screenshots on the product
 * pages are too small to read in the page (content team 11/2026,
 * docs/korrekturen-2026-11.md G-2).
 *
 * The <img> stays in the page as before (crawlable, with its alt text); it
 * sits in a button that opens a dialog with the same image fitted to the
 * viewport. Escape, the close button or a click beside the picture close it,
 * and focus returns to the picture. A small badge in the corner says it can
 * be enlarged, also on touch screens where there is no hover.
 */
export function ZoomImage({
  src,
  alt,
  className,
  buttonClassName,
  loading,
  width,
  height,
}: {
  src: string;
  alt: string;
  /** Classes of the <img> in the page (size, ratio, corner, background). */
  className?: string;
  /** Classes of the button around it, e.g. a width when the image has one. */
  buttonClassName?: string;
  loading?: 'lazy' | 'eager';
  /** Intrinsic size, so the page keeps its space before the picture loads. */
  width?: number;
  height?: number;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const zoom = t('lavender.common.zoomImage');

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          data-ds="ZoomImage"
          aria-label={alt ? `${zoom}: ${alt}` : zoom}
          // Inline: PageShell's unlayered `button { cursor: pointer }` outranks utilities.
          style={{ cursor: 'zoom-in' }}
          className={cn(
            'group relative block w-full rounded-card border-0 bg-transparent p-0 lg:rounded-frame',
            buttonClassName,
          )}
        >
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            decoding="async"
            className={className}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-pill bg-lav-white/90 text-lav-navy shadow-[0_2px_8px_rgb(11_34_49/0.18)] transition-transform duration-[var(--duration-fast)] ease-out group-hover:scale-110 md:bottom-4 md:right-4"
          >
            <Maximize2 size={18} strokeWidth={2} />
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* Solid: at 95 % the light page still showed through and competed with the picture. */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-lav-navy" />
        <Dialog.Content
          data-ds="ZoomImageDialog"
          aria-describedby={undefined}
          // The content fills the screen, so a click beside the picture lands
          // on it rather than "outside": close on clicks that hit it directly.
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="lavender-page fixed inset-0 z-[101] flex items-center justify-center p-4 pt-16 font-brand md:p-10 md:pt-20"
        >
          <Dialog.Title className="sr-only">{alt || zoom}</Dialog.Title>
          <img src={src} alt={alt} className="max-h-full max-w-full rounded-card object-contain" />
          <Dialog.Close
            aria-label={t('lavender.common.close')}
            className="lav-star-hover absolute right-4 top-4 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border-0 bg-lav-white p-0 text-lav-navy transition-[color,scale] duration-[var(--duration-fast)] ease-out active:scale-[0.96] md:right-6 md:top-6"
          >
            <X aria-hidden size={20} strokeWidth={2} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
