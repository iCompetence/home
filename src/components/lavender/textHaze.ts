'use client';

import { useEffect } from 'react';

/**
 * The glass city stands back behind text that lies over it, and only there.
 * Every element marked `data-haze` cuts a soft-edged hole into the skyline,
 * exactly where it stands, so a tower beside or below the text stays whole.
 * (Before, one large oval faded the whole upper middle of the city, and the
 * TV tower with it.) Text gets one hole per line, as wide as the line; links,
 * buttons and `data-haze="box"` get one hole for their box.
 *
 * The holes are drawn as a small SVG that masks the glass (`.lav-hamburg-glass`);
 * it is redrawn when the text, the screen or the scroll position changes.
 * `find` returns the glass and the elements to spare, read anew on every pass.
 */
export function useTextHaze(
  find: () => { glass: HTMLElement | null | undefined; texts: Iterable<HTMLElement> },
  deps: readonly unknown[],
) {
  useEffect(() => {
    const GROW = 18; // px the hole reaches beyond the text
    const SOFT = 13; // px blur of its edge
    let raf = 0;
    let last = '';
    const paint = () => {
      raf = 0;
      const { glass, texts } = find();
      if (!glass) return;
      const box = glass.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const holes: string[] = [];
      const add = (r: DOMRect) => {
        if (!r.width || !r.height || r.bottom < box.top - 60 || r.top > box.bottom + 60) return;
        const x = Math.round(r.left - box.left - GROW);
        const y = Math.round(r.top - box.top - GROW);
        holes.push(
          `<rect x="${x}" y="${y}" width="${Math.round(r.width + 2 * GROW)}" height="${Math.round(r.height + 2 * GROW)}" rx="${GROW}"/>`,
        );
      };
      for (const el of texts) {
        if (getComputedStyle(el).visibility === 'hidden') continue;
        if (el.matches('a, button, [data-haze="box"]')) {
          add(el.getBoundingClientRect());
          continue;
        }
        const range = document.createRange();
        range.selectNodeContents(el);
        Array.from(range.getClientRects()).forEach(add);
      }
      const w = Math.round(box.width);
      const h = Math.round(box.height);
      const svg = holes.length
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><filter id="b" filterUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><feGaussianBlur stdDeviation="${SOFT}"/></filter><mask id="m" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#fff"/><g filter="url(#b)" fill="#000">${holes.join('')}</g></mask></defs><rect width="${w}" height="${h}" fill="#fff" mask="url(#m)"/></svg>`
        : '';
      if (svg === last) return;
      last = svg;
      const image = svg ? `url("data:image/svg+xml,${encodeURIComponent(svg)}")` : '';
      glass.style.setProperty('-webkit-mask-image', image);
      glass.style.setProperty('mask-image', image);
      glass.style.setProperty('-webkit-mask-size', '100% 100%');
      glass.style.setProperty('mask-size', '100% 100%');
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    document.fonts?.ready.then(queue);
    window.addEventListener('resize', queue);
    window.addEventListener('scroll', queue, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', queue);
      window.removeEventListener('scroll', queue);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
