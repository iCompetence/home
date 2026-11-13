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
 * (public/images/hamburg-glas-*.webp, 2600 × 1097): one unlit, one lit from
 * inside in the double star's colours. No blend mode, so the city may stand
 * in a sticky or transformed parent. At rest the city is dark; the lit rendering shows through an elliptical
 * mask that follows the pointer (styles: .lav-hamburg in globals.css).
 *
 * A deliberate exception to "Licht und Linie" (a rendering, not a line),
 * approved for the footer only. The footer stays dark in every theme.
 *
 * Without a pointer (touch) the whole city lights up and goes dark again in
 * a slow change while it is on screen (Dennis, 13.11.2026; before, a spot
 * walked from landmark to landmark). A finger on the city takes over with the
 * spot. With reduced motion the city stays dark and the spot jumps instead of
 * gliding.
 *
 * Decorative: the address is stated in text on the imprint page.
 */

/**
 * The slow change without a pointer, in ms: the fade (the same in and out,
 * .lav-hamburg-all in globals.css), how long the city stays lit and how long
 * it stays dark.
 */
const FADE = 1600;
const LIT = 4000;
const DARK = 3400;

/** Where the light is (fractions of the picture), its radius as a fraction of the width, its strength. */
type Light = { x: number; y: number; rx: number; a: number };

export function HamburgGlass({ className }: { className?: string }) {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none)').matches;
    const cur: Light = { x: 0.5, y: 0.7, rx: 0.12, a: 0 };
    const target: Light = { ...cur };
    let raf = 0;
    let timer = 0;
    let glowing = false;
    let inside = false;
    let visible = false;

    const halo = el.querySelector<HTMLElement>('.lav-hamburg-halo');
    const spot = el.querySelector<HTMLElement>('.lav-hamburg-spot');
    const lit = el.querySelector<HTMLElement>('.lav-hamburg-on');
    const all = el.querySelector<HTMLElement>('.lav-hamburg-all');

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
      // A round light: one radius for both directions.
      const r = cur.rx * w;
      // Both elements are 200 px circles centred on their own origin.
      const glow = (r * 0.85 + 46) / 100;
      halo.style.transform = `translate3d(${x}px,${y}px,0) scale(${glow})`;
      halo.style.opacity = String(cur.a * 0.55);
      const sx = (r * 1.2) / 100;
      const sy = sx;
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

    // Without a pointer: the whole lit picture fades in over the unlit one,
    // stays, fades out, and the city rests dark for a while. Only opacity
    // changes (a CSS transition), nothing is repainted.
    const glow = (on: boolean) => {
      glowing = on;
      if (all) all.style.opacity = on ? '1' : '0';
    };
    const stopPulse = () => {
      window.clearTimeout(timer);
      timer = 0;
      glow(false);
    };
    const pulse = () => {
      glow(!glowing);
      timer = window.setTimeout(pulse, FADE + (glowing ? LIT : DARK));
    };
    const startPulse = (delay: number) => {
      stopPulse();
      if (touch && !still && visible && !inside) timer = window.setTimeout(pulse, delay);
    };

    const leave = () => {
      inside = false;
      target.a = 0;
      go();
      startPulse(900);
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
      stopPulse();
      Object.assign(target, {
        x: (e.clientX - box.left) / box.width,
        y: (e.clientY - box.top) / box.height,
        rx: 0.12,
        a: 1,
      });
      go();
    };
    const seen = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) startPulse(600);
        else {
          stopPulse();
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
      stopPulse();
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
          own box, so a mask on them (the hero's haze) does not cut the glow.
          Its own box fades it out at the picture's lower edge (globals.css). */}
      <div className="lav-hamburg-glow">
        <div className="lav-hamburg-halo" />
      </div>
      <div className="lav-hamburg-glass">
        <div className="lav-hamburg-off" />
        {/* The whole city lit: only shown without a pointer (the slow change). */}
        <div className="lav-hamburg-all" />
        <div className="lav-hamburg-spot">
          <div className="lav-hamburg-on" />
        </div>
      </div>
    </div>
  );
}
