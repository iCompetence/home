'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/components/ui/utils';
import { useMotionPrefs } from './motion';

export type ImageTextProps = {
  title: string;
  description: string;
  /** A short, silent 16:9 loop. Plays while on screen. */
  video?: string;
  /** A 16:9 still (used when there is no video). */
  image?: string;
  /** Alt text for the still. A video is decorative next to its text. */
  imageAlt?: string;
  /** Desktop only: which side the media sits on. Tablet and mobile always
   *  show the media above the text. */
  layout?: 'image-left' | 'image-right';
  className?: string;
};

/**
 * One benefit: a 16:9 clip or image next to a title and a paragraph. Pages
 * stack several and alternate `layout` on desktop.
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
  const media = 'aspect-video w-full rounded-card bg-lav-lavender object-contain object-center';

  return (
    <div
      data-ds="ImageText"
      className={cn(
        'flex flex-col gap-8 md:gap-10 lg:items-center lg:gap-16',
        layout === 'image-right' ? 'lg:flex-row-reverse' : 'lg:flex-row',
        className,
      )}
    >
      <div className="w-full lg:flex-1">
        {video ? (
          <LoopVideo src={video} className={media} />
        ) : (
          image && <img src={image} alt={imageAlt} loading="lazy" className={media} />
        )}
      </div>
      <div className="flex w-full flex-col gap-6 md:gap-8 lg:flex-1 lg:gap-10">
        <h3 className="lav-h2 text-lav-navy">{title}</h3>
        <p className="lav-lead whitespace-pre-line font-normal text-lav-navy/80">{description}</p>
      </div>
    </div>
  );
}

/**
 * Muted loop that only plays while it is on screen, and not at all when the
 * reader asked for reduced motion (then it rests on its first frame).
 */
function LoopVideo({ src, className }: { src: string; className?: string }) {
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
