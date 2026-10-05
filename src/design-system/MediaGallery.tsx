'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/utils';

export type GalleryImage = { src: string; alt: string };

/**
 * Product gallery: a stage on lavender (4:3 unless the images ask for another
 * ratio) and a row of thumbnails. The stage is a real <img> (crawlable, has
 * alt text); thumbnails are buttons that swap it. The thumbnail row scrolls
 * sideways when it is wider than the stage.
 */
export function MediaGallery({
  images,
  thumbLabel,
  aspectClassName = 'aspect-[4/3]',
}: {
  images: readonly GalleryImage[];
  /** Accessible name for a thumbnail, e.g. (n) => `Bild ${n} anzeigen`. */
  thumbLabel: (index: number) => string;
  /** Aspect ratio of the stage as a Tailwind class. */
  aspectClassName?: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div data-ds="MediaGallery" className="flex w-full flex-col gap-3 md:gap-4">
      <img
        src={current.src}
        alt={current.alt}
        className={cn(
          'w-full rounded-card bg-lav-lavender object-contain object-center',
          aspectClassName,
        )}
      />
      <div className="flex gap-2 overflow-x-auto md:gap-3 lg:gap-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={thumbLabel(i + 1)}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'h-[59px] w-[78px] shrink-0 cursor-pointer overflow-hidden rounded-card-sm border-2 bg-lav-lavender p-0 md:h-[78px] md:w-[104px]',
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
