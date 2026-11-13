'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/components/ui/utils';

/**
 * Hamburg as a milk-glass sculpture at the end of the night home.
 *
 * Two congruent pictures with a transparent ground, made from one rendering
 * (FLORA, FLUX 3, chosen by Dennis on 2026-11-13; the lit one is the same glass
 * coloured blue to violet).
 *
 * Two congruent renderings with a transparent ground
 * (public/images/hamburg-glas-*.webp, 2600 × 1102): one unlit, one lit from
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
// From west to east, as the city lies along the Elbe.
const LANDMARKS = [
  { x: 0.124, half: 0.075, y: 0.68, ry: 0.5 }, // Hafenkräne
  { x: 0.308, half: 0.1, y: 0.78, ry: 0.4 }, // Landungsbrücken
  { x: 0.427, half: 0.03, y: 0.45, ry: 0.9 }, // Fernsehturm
  { x: 0.482, half: 0.078, y: 0.78, ry: 0.36 }, // Rickmer Rickmers
  { x: 0.575, half: 0.045, y: 0.6, ry: 0.66 }, // Michel
  { x: 0.696, half: 0.065, y: 0.64, ry: 0.56 }, // Elbphilharmonie
  { x: 0.815, half: 0.06, y: 0.64, ry: 0.62 }, // Rathaus
  { x: 0.926, half: 0.055, y: 0.8, ry: 0.3 }, // Speicherstadt
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

    const halo = el.querySelector<HTMLElement>('.lav-hamburg-halo');
    const spot = el.querySelector<HTMLElement>('.lav-hamburg-spot');
    const lit = el.querySelector<HTMLElement>('.lav-hamburg-on');

    // The light is a small round window (spot) over the lit picture, and a
    // glow (halo) behind the city. Both are only moved, scaled and faded,
    // which the graphics card does without redrawing anything. The lit
    // picture inside the window is moved and scaled the opposite way, so it
    // stays exactly on the unlit one. (Before, the light was a mask and a
    // blurred gradient across the whole skyline, repainted on every move.)
    const paint = () => {
      if (!halo || !spot || !lit) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const x = cur.x * w;
      const y = cur.y * h;
      const rx = cur.rx * w;
      const ry = cur.ry * h;
      // Both elements are 200 px circles centred on their own origin.
      halo.style.transform = `translate3d(${x}px,${y}px,0) scale(${(rx * 0.75 + 46) / 100},${(ry * 0.75 + 46) / 100})`;
      halo.style.opacity = String(cur.a * 0.3);
      const sx = (rx * 1.2) / 100;
      const sy = (ry * 1.15) / 100;
      spot.style.transform = `translate3d(${x}px,${y}px,0) scale(${sx},${sy})`;
      spot.style.opacity = String(cur.a);
      lit.style.width = `${w}px`;
      lit.style.height = `${h}px`;
      lit.style.transform = `scale(${1 / sx},${1 / sy}) translate3d(${-x}px,${-y}px,0)`;
    };
    let last = 0;
    const tick = (now: number) => {
      // The same pace on any display (60 or 120 Hz): the step grows with the
      // time since the last frame, as in nightSky.ts.
      const dt = last ? Math.min(now - last, 60) : 16.667;
      last = now;
      const pace = (k: number) => 1 - Math.pow(1 - k, dt / 16.667);
      // While nothing is lit, the light jumps to the new place and fades in there.
      const jump = cur.a < 0.02;
      let done = true;
      (Object.keys(cur) as (keyof Light)[]).forEach((key) => {
        const k = key === 'a' ? (still ? 1 : pace(0.09)) : jump || still ? 1 : pace(0.14);
        cur[key] += (target[key] - cur[key]) * k;
        if (Math.abs(target[key] - cur[key]) > 0.0008) done = false;
      });
      paint();
      raf = done ? 0 : requestAnimationFrame(tick);
      if (done) last = 0;
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
      {/* The glow may reach above the picture; the two renderings sit in their
          own box, so a mask on them (the hero's haze) does not cut the glow. */}
      <div className="lav-hamburg-halo" />
      <div className="lav-hamburg-glass">
        <div className="lav-hamburg-off" />
        <div className="lav-hamburg-spot">
          <div className="lav-hamburg-on" />
        </div>
      </div>
    </div>
  );
}
