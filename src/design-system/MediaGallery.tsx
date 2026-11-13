'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/utils';
import { ZoomImage } from './ZoomImage';

export type GalleryImage = { src: string; alt: string };

/**
 * Product gallery: a stage on the picture ground, navy (4:3 unless the images ask for another
 * ratio) and, from two pictures up, a row of thumbnails. The stage is a real <img> (crawlable, has
 * alt text) that opens full size on click (ZoomImage); thumbnails are
 * buttons that swap it and are named after their picture. The thumbnail row
 * scrolls sideways when it is wider than the stage.
 */
export function MediaGallery({
  images,
  thumbLabel,
  aspectClassName = 'aspect-[4/3]',
  bleed = 'both',
}: {
  images: readonly GalleryImage[];
  /** Accessible name for a thumbnail, e.g. (n) => `Bild ${n} anzeigen`. */
  thumbLabel: (index: number) => string;
  /** Aspect ratio of the stage as a Tailwind class. */
  aspectClassName?: string;
  /**
   * How far the stage stands out over the text edge, like the large pictures
   * and fields of the night home (16 / 32 px below desktop, 40 px from
   * desktop up). 'both' in a section of its own; 'start' in the product head,
   * where from desktop up only the outer, left side has room.
   */
  bleed?: 'both' | 'start';
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div data-ds="MediaGallery" className="flex w-full flex-col gap-3 md:gap-4">
      {/* The thumbnails stay on the text edge. */}
      <div className={cn('-mx-4 md:-mx-8', bleed === 'start' ? 'lg:mx-0 lg:-ml-10' : 'lg:-mx-10')}>
        <ZoomImage
          src={current.src}
          alt={current.alt}
          className={cn(
            // The big corner from desktop up, as the large pictures of the night home.
            'w-full rounded-card bg-lav-stage object-contain object-center lg:rounded-frame',
            aspectClassName,
          )}
        />
      </div>
      {/* Thumbnails only where there is something to switch to. */}
      {images.length > 1 && (
        // Padding and the same negative margin: room for the shown thumbnail's line inside the scroll box.
        <div className="-m-1 flex gap-2 overflow-x-auto p-1 md:gap-3 lg:gap-4">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              // "Bild anzeigen 2: <alt>" rather than only a number (G-3).
              aria-label={image.alt ? `${thumbLabel(i + 1)}: ${image.alt}` : thumbLabel(i + 1)}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'h-[59px] w-[78px] shrink-0 cursor-pointer overflow-hidden rounded-card-sm border-2 bg-lav-stage p-0 transition-[border-color,scale] duration-[var(--duration-fast)] ease-out active:scale-[0.96] md:h-[78px] md:w-[104px]',
                // The shown one: a navy line at a distance (a border would not show on the navy
                // ground). The others: a frame in the star gradient on hover (.lav-star-ring).
                i === active
                  ? 'border-transparent outline-2 outline-offset-2 outline-lav-ink outline-solid'
                  : 'lav-star-ring border-transparent',
              )}
            >
              <img src={image.src} alt="" className="h-full w-full object-contain object-center" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
