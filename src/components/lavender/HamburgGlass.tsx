'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/components/ui/utils';

/**
 * Hamburg as a milk-glass sculpture at the end of the night home.
 *
 * Two congruent renderings with a transparent ground
 * (public/images/hamburg-glas-*.webp, 2600 × 959): one unlit, one lit from
 * inside in the double star's colours. No blend mode, so the city may stand
 * in a sticky or transformed parent. At rest the city is dark; the lit rendering shows through an elliptical
 * mask that follows the pointer (styles: .lav-hamburg in globals.css).
 *
 * A deliberate exception to "Licht und Linie" (a rendering, not a line),
 * approved for the footer only. The footer stays dark in every theme.
 *
 * Without a pointer (touch) the light walks from landmark to landmark while
 * the city is on screen; a finger on the city takes over. With reduced motion
 * the light jumps instead of gliding and does not walk by itself.
 *
 * Decorative: the address is stated in text on the imprint page.
 */

/** Landmarks left to right: centre x, half width, light centre y, light height (fractions of the image). */
const LANDMARKS = [
  { x: 0.119, half: 0.072, y: 0.7, ry: 0.5 }, // Hafenkräne
  { x: 0.253, half: 0.03, y: 0.5, ry: 0.8 }, // Fernsehturm
  { x: 0.325, half: 0.075, y: 0.8, ry: 0.36 }, // Landungsbrücken
  { x: 0.419, half: 0.047, y: 0.64, ry: 0.62 }, // Michel
  { x: 0.517, half: 0.07, y: 0.82, ry: 0.34 }, // Rickmer Rickmers
  { x: 0.61, half: 0.1, y: 0.68, ry: 0.6 }, // Rathaus
  { x: 0.778, half: 0.062, y: 0.68, ry: 0.58 }, // Elbphilharmonie
  { x: 0.906, half: 0.068, y: 0.86, ry: 0.3 }, // Speicherstadt
] as const;

type Light = { x: number; y: number; rx: number; ry: number; a: number };

export function HamburgGlass({ className }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none)').matches;
    const cur: Light = { x: 0.5, y: 0.7, rx: 0.085, ry: 0.5, a: 0 };
    const target: Light = { ...cur };
    let raf = 0;
    let timer = 0;
    let walking = 4;
    let inside = false;
    let visible = false;

    const paint = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      el.style.setProperty('--x', `${(cur.x * w).toFixed(1)}px`);
      el.style.setProperty('--y', `${(cur.y * h).toFixed(1)}px`);
      el.style.setProperty('--rx', `${(cur.rx * w).toFixed(1)}px`);
      el.style.setProperty('--ry', `${(cur.ry * h).toFixed(1)}px`);
      el.style.setProperty('--a', cur.a.toFixed(3));
    };
    const tick = () => {
      // While nothing is lit, the light jumps to the new place and fades in there.
      const jump = cur.a < 0.02;
      let done = true;
      (Object.keys(cur) as (keyof Light)[]).forEach((key) => {
        const k = key === 'a' ? (still ? 1 : 0.09) : jump || still ? 1 : 0.14;
        cur[key] += (target[key] - cur[key]) * k;
        if (Math.abs(target[key] - cur[key]) > 0.0008) done = false;
      });
      paint();
      raf = done ? 0 : requestAnimationFrame(tick);
    };
    const go = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const stopWalk = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const walk = () => {
      walking = (walking + 1) % LANDMARKS.length;
      const lm = LANDMARKS[walking];
      Object.assign(target, { x: lm.x, y: lm.y, rx: lm.half * 1.55, ry: lm.ry, a: 1 });
      go();
      timer = window.setTimeout(walk, 2600);
    };
    const startWalk = (delay: number) => {
      stopWalk();
      if (touch && !still && visible && !inside) timer = window.setTimeout(walk, delay);
    };

    const leave = () => {
      inside = false;
      target.a = 0;
      go();
      startWalk(900);
    };

    // Listens on the window, not on the city: in the hero the text block lies
    // over the towers and would swallow the pointer. The day layer that scrolls
    // over the hero counts as "not on the city".
    const move = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const cover = document.querySelector('[data-ds="DayLayer"]')?.getBoundingClientRect();
      const on =
        e.clientX >= box.left &&
        e.clientX <= box.right &&
        e.clientY >= box.top &&
        e.clientY <= box.bottom &&
        !(cover && e.clientY >= cover.top && e.clientY <= cover.bottom) &&
        // On a link or a button the light is in that control (its hover), not in the city.
        !(e.target as Element | null)?.closest?.('a, button, [role="button"]');
      if (!on) {
        if (inside) leave();
        return;
      }
      inside = true;
      stopWalk();
      Object.assign(target, {
        x: (e.clientX - box.left) / box.width,
        y: (e.clientY - box.top) / box.height,
        rx: 0.085,
        ry: 0.5,
        a: 1,
      });
      go();
    };
    const seen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startWalk(600);
        else {
          stopWalk();
          if (!inside) {
            target.a = 0;
            go();
          }
        }
      },
      { threshold: 0.35 },
    );
    seen.observe(el);

    const lift = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && inside) leave();
    };
    const out = () => {
      if (inside) leave();
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    window.addEventListener('pointerup', lift);
    window.addEventListener('pointercancel', lift);
    document.documentElement.addEventListener('pointerleave', out);
    window.addEventListener('resize', paint);
    paint();

    return () => {
      cancelAnimationFrame(raf);
      stopWalk();
      seen.disconnect();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      window.removeEventListener('pointerup', lift);
      window.removeEventListener('pointercancel', lift);
      document.documentElement.removeEventListener('pointerleave', out);
      window.removeEventListener('resize', paint);
    };
  }, []);

  return (
    <div ref={stage} aria-hidden data-ds="HamburgGlass" className={cn('lav-hamburg', className)}>
      <div className="lav-hamburg-halo" />
      <div className="lav-hamburg-off" />
      <div className="lav-hamburg-on" />
    </div>
  );
}
