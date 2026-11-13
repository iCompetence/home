'use client';

import { useEffect, useRef } from 'react';
import { useMotionPrefs } from './motion';
import { ProductRow } from './ProductRow';
import { ZoomImage } from './ZoomImage';

export type ImageTextProps = {
  title: string;
  description: string;
  /** A short, silent 16:9 loop. Plays while on screen. */
  video?: string;
  /** A 16:9 still (used when there is no video). */
  image?: string;
  /** Alt text for the still. A video is decorative next to its text. */
  imageAlt?: string;
  /** Desktop only: which side the media sits on. On tablets and phones the
   *  media follows the text. */
  layout?: 'image-left' | 'image-right';
  className?: string;
};

/**
 * One benefit: a 16:9 clip or image beside a title and a paragraph. Pages
 * stack several and alternate `layout` on desktop.
 *
 * Drawn by the home page's ProductRow (was a layout of its own: half and
 * half, the picture on the text edge): text in five columns, the picture in
 * seven and out to the frame edge, wider than the text on phones and tablets,
 * where it follows the text. No link: these rows explain, they lead nowhere.
 */
export function ImageText({
  title,
  description,
  video,
  image,
  imageAlt = '',
  layout = 'image-left',
  className,
}: ImageTextProps) {
  // The big corner from desktop up, as the large pictures of the night home.
  const media = 'aspect-video w-full rounded-card bg-lav-stage object-contain object-center lg:rounded-frame';

  return (
    <ProductRow
      className={className}
      media={layout === 'image-right' ? 'right' : 'left'}
      headingLevel="h3"
      title={title}
      description={description}
      visual={
        // A visual brings its own overhang below desktop (as ProductGlimpse does).
        <div className="-mx-4 md:-mx-8 lg:mx-0">
          {video ? (
            <LoopVideo src={video} className={media} />
          ) : (
            image && <ZoomImage src={image} alt={imageAlt} loading="lazy" className={media} />
          )}
        </div>
      }
    />
  );
}

/**
 * Muted loop that only plays while it is on screen, and not at all when the
 * reader asked for reduced motion (then it rests on its first frame).
 */
export function LoopVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { reduced } = useMotionPrefs();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className={className}
    />
  );
}
