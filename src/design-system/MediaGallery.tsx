'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/utils';

export type GalleryImage = { src: string; alt: string };

/**
 * Product gallery: a 4:3 stage on lavender and a row of thumbnails. The stage
 * is a real <img> (crawlable, has alt text); thumbnails are buttons that swap
 * it.
 */
export function MediaGallery({
  images,
  thumbLabel,
}: {
  images: readonly GalleryImage[];
  /** Accessible name for a thumbnail, e.g. (n) => `Bild ${n} anzeigen`. */
  thumbLabel: (index: number) => string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div data-ds="MediaGallery" className="flex w-full flex-col gap-4">
      <img
        src={current.src}
        alt={current.alt}
        className="aspect-[4/3] w-full rounded-card bg-lav-lavender object-contain object-center"
      />
      <div className="flex gap-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={thumbLabel(i + 1)}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'h-[78px] w-[104px] cursor-pointer overflow-hidden rounded-card-sm border-2 bg-lav-lavender p-0',
              i === active ? 'border-lav-navy' : 'border-transparent',
            )}
          >
            <img src={image.src} alt="" className="h-full w-full object-contain object-center" />
          </button>
        ))}
      </div>
    </div>
  );
}
