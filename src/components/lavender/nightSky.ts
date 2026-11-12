/**
 * The moving night sky of the night home (/lavender/nacht/), drawn on one
 * fixed canvas behind the page. No React in here, so it can be started on any
 * canvas: `const stop = startNightSky(canvas)`.
 *
 * What it draws:
 * - small stars in perspective: scrolling flies into them, they twinkle at
 *   their own pace and now and then one flares into a four-pointed star;
 * - the guide star (the blue/violet double star): large beside the hero, then
 *   small and fixed overhead for the whole trip, finally down over Hamburg.
 *   Down there it follows the pointer; over the glass city (HamburgGlass) it
 *   shrinks away and the city's own light takes over at the same spot;
 * - one brand star per section: it comes out of the depth as a point, rests
 *   beside the section while that is centred, then passes the camera.
 *
 * A section opts in with a marker anywhere inside it:
 *   <span hidden data-night-star="blue|violet|mint" data-night-side="left|right" data-night-soft />
 * The colour is read every frame, so it may change (the services tabs do that).
 *
 * Where the glass city stands decides the trip (canvas `data-city`):
 * - "end" (default): the page ends in Hamburg, the guide star comes down there;
 * - "hero": the page starts in Hamburg. The guide star begins above the city
 *   and rises overhead as the page lifts off; there is no landing at the end.
 *
 * With prefers-reduced-motion nothing animates by itself: the sky is redrawn
 * on scroll only, without twinkle, drift or pointer movement.
 */

type Kind = 'double' | 'blue' | 'violet' | 'mint';

const DEFAULT_SOURCES: Record<Kind, string> = {
  double: '/images/icompetence_visual_01.png',
  blue: '/images/icompetence_visual_blau_01.png',
  violet: '/images/icompetence_visual_violet_01.png',
  mint: '/images/icompetence_visual_mint.png',
};

/** Mostly white, a few in the brand's light tints. */
const TINTS = ['#ffffff', '#ffffff', '#ffffff', '#f5e1ff', '#bde3f4', '#bde3f4'];
/** How fast a section's star grows while its section scrolls through. */
const ZOOM = 3.3;
/** Height / width of the Hamburg rendering at the end of the page (HamburgGlass). */
const SKYLINE_RATIO = 959 / 2600;

type FieldStar = { x: number; y: number; z: number; tint: string; rate: number; phase: number; mag: number };
type Waypoint = { marker: HTMLElement; section: Element; kind: string; since: number };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function startNightSky(
  canvas: HTMLCanvasElement,
  sources: Record<Kind, string> = DEFAULT_SOURCES,
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0;
  let H = 0;
  let dpr = 1;
  let raf = 0;
  let last = performance.now();
  let time = 0;
  const mouse = { x: 0, y: 0 };
  // Pointer in px, the guide star's eased chase of it, and how far the star has melted into the city (0..1).
  const pointer = { x: 0, y: 0, seen: false };
  const chase = { x: 0, y: 0 };
  let melt = 0;
  const follows = !reduce && window.matchMedia('(hover: hover)').matches;
  const city = document.querySelector('[data-ds="HamburgGlass"]');
  const cityInHero = canvas.dataset.city === 'hero';
  const ease = { x: 0, y: 0 };
  let field: FieldStar[] = [];
  const flare = { index: -1, start: 0 };
  let nextFlare = 600;

  // The artwork is 3000 px wide; draw from 1024 px copies instead.
  const sprites: Partial<Record<Kind, HTMLCanvasElement>> = {};
  (Object.keys(sources) as Kind[]).forEach((kind) => {
    const img = new Image();
    img.onload = () => {
      const copy = document.createElement('canvas');
      copy.width = copy.height = 1024;
      copy.getContext('2d')?.drawImage(img, 0, 0, 1024, 1024);
      sprites[kind] = copy;
      if (reduce) draw();
    };
    img.src = sources[kind];
  });

  const waypoints: Waypoint[] = Array.from(
    document.querySelectorAll<HTMLElement>('[data-night-star]'),
  ).flatMap((marker) => {
    const section = marker.closest('section, footer');
    return section ? [{ marker, section, kind: marker.dataset.nightStar ?? '', since: -1e6 }] : [];
  });

  function seed() {
    const count = W < 768 ? 220 : 420;
    field = Array.from({ length: count }, () => ({
      x: (Math.random() * 2 - 1) * 1.7,
      y: (Math.random() * 2 - 1) * 1.7,
      z: Math.random(),
      tint: TINTS[Math.floor(Math.random() * TINTS.length)],
      rate: 0.0006 + Math.random() * 0.0022,
      phase: Math.random() * Math.PI * 2,
      mag: 0.5 + Math.random() * 0.9,
    }));
  }

  function resize() {
    const width = window.innerWidth;
    const reseed = width !== W; // not on every mobile toolbar show/hide
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = width;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    if (reseed) seed();
    if (reduce) draw();
  }

  /** 0 in the sky, 1 on the ground: the last stretch of the page, or the first one when the city is in the hero. */
  function descent() {
    if (cityInHero) return 1 - easeInOut(clamp01(window.scrollY / (H * 0.85)));
    const end = document.documentElement.scrollHeight - H;
    return easeInOut(clamp01((window.scrollY - (end - H * 0.9)) / (H * 0.9)));
  }

  function guideStar(down: number) {
    const compact = W < 768;
    // With the city in the hero the star never is the large hero star: it is small all the way.
    const away = cityInHero ? 1 : easeInOut(clamp01(window.scrollY / (H * 0.85)));
    const big = compact
      ? { x: W * 0.72, y: H * 0.3, size: W * 1.15 }
      : { x: W * 0.76, y: H * 0.46, size: Math.min(W * 0.66, H * 1.1) };
    const small = { x: W * 0.5, y: H * 0.17, size: Math.max(84, Math.min(W, H) * 0.11) };
    // At the end of the page it rests in the gap of sky between the Rathaus tower
    // and the Elbphilharmonie, above the roofs, so it does not sit on a lit building.
    const box = city?.getBoundingClientRect();
    const skyline = box ? box.height : W * SKYLINE_RATIO;
    // In the hero the text block sits above the middle of the city, so the
    // star rests further right there, above the Speicherstadt.
    const at = cityInHero ? { x: 0.9, y: 0.4 } : { x: 0.69, y: 0.26 };
    const land = {
      x: (box ? box.left : 0) + (box ? box.width : W) * at.x,
      y: (box ? box.top : H - skyline) + skyline * at.y,
      size: Math.min(cityInHero ? 190 : 250, Math.max(64, skyline * 0.44)),
    };
    const tripX = lerp(big.x, small.x, away) + ease.x * W * 0.04 * (1 - away);
    const tripY = lerp(big.y, small.y, away) + ease.y * H * 0.04 * (1 - away);
    // On the ground the star goes where the pointer is, if there is one.
    const led = follows && pointer.seen;
    return {
      x: lerp(tripX, led ? chase.x : land.x, down),
      y: lerp(tripY, led ? chase.y : land.y, down),
      size: lerp(lerp(big.size, small.size, away), land.size, down) * (1 - melt),
      // Overhead it passes behind running text, so it steps back; full strength at both ends.
      alpha: lerp(lerp(1, compact ? 0.3 : 0.55, away), 1, down) * (1 - melt),
      // The sky turns around where the star would rest, not around the pointer.
      pivot: { x: lerp(tripX, land.x, down), y: lerp(tripY, land.y, down) },
    };
  }

  function glint(x: number, y: number, len: number, alpha: number, color: string) {
    if (!ctx) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.3);
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(len, 0);
    for (let k = 1; k <= 4; k++) {
      const a = (k * Math.PI) / 2;
      const mid = a - Math.PI / 4;
      ctx.quadraticCurveTo(Math.cos(mid) * len * 0.1, Math.sin(mid) * len * 0.1, Math.cos(a) * len, Math.sin(a) * len);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawField(pole: { x: number; y: number }, down: number) {
    if (!ctx) return;
    const cam = (window.scrollY / H) * 0.2 + time * 0.0000045;
    const vx = W / 2 + ease.x * W * 0.012;
    const vy = H / 2 + ease.y * H * 0.012 - down * H * 0.2;
    // The sky turns slowly around the guide star, as the real one does around Polaris.
    const turn = reduce ? 0 : time * 0.000022;
    const cs = Math.cos(turn);
    const sn = Math.sin(turn);
    for (let i = 0; i < field.length; i++) {
      const s = field[i];
      const zr = (((s.z - cam) % 1) + 1) % 1;
      const persp = 0.3 / (zr + 0.06);
      const px = vx + s.x * W * 0.5 * persp - pole.x;
      const py = vy + s.y * H * 0.5 * persp - pole.y;
      const x = pole.x + px * cs - py * sn;
      const y = pole.y + px * sn + py * cs;
      if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue;
      const edge = clamp01(zr / 0.06) * clamp01((1 - zr) / 0.12);
      const twinkle = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(time * s.rate + s.phase);
      let alpha = edge * twinkle * (0.35 + 0.65 * clamp01(persp / 1.6));
      let flash = 0;
      if (i === flare.index) {
        flash = Math.sin(clamp01((time - flare.start) / 1100) * Math.PI);
        alpha = Math.min(1, alpha + flash * edge);
      }
      if (alpha < 0.02) continue;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.tint;
      ctx.beginPath();
      ctx.arc(x, y, (0.5 + persp * 0.55) * s.mag, 0, Math.PI * 2);
      ctx.fill();
      if (s.mag > 1.28) glint(x, y, 3 + persp * 3.2, alpha * 0.8, s.tint);
      if (flash > 0.02) glint(x, y, 7 + 16 * flash, flash * edge, s.tint);
    }
    ctx.globalAlpha = 1;
  }

  function drawWaypoint(w: Waypoint, down: number) {
    if (!ctx) return;
    const kind = w.marker.dataset.nightStar ?? '';
    if (kind !== w.kind) {
      w.kind = kind;
      w.since = time; // colour changed (services tabs): fade the new one in
    }
    const sprite = sprites[kind as Kind];
    if (!sprite) return;
    const rect = w.section.getBoundingClientRect();
    const span = Math.max(H, rect.height * 0.85);
    const u = (H / 2 - (rect.top + rect.height / 2)) / span;
    const f = Math.pow(2, ZOOM * u);
    const passing = 1 - clamp01((f - 1.4) / 2.2);
    if (f < 0.006 || passing <= 0) return;

    const compact = W < 768;
    const right = w.marker.dataset.nightSide !== 'left';
    // Behind the section's glass field: beside the text on wide screens, below it on narrow ones.
    const rest = compact
      ? { x: W * 0.5, y: H * 0.66, size: W * 0.95 }
      : { x: W * (right ? 0.74 : 0.26), y: H * 0.5, size: Math.min(W * 0.44, H * 0.8) };
    const near = clamp01(1 - Math.abs(u) * 2);
    const x = W / 2 + ease.x * W * 0.012 + (rest.x - W / 2) * f + ease.x * W * 0.04 * near;
    const y = H / 2 + ease.y * H * 0.012 + (rest.y - H / 2) * f + ease.y * H * 0.04 * near - down * H * 0.2;
    const size = rest.size * f * (reduce ? 1 : 1 + 0.02 * Math.sin(time / 1700 + rest.x));
    // On narrow screens the star crosses the text column on its way to the field, so it stays faint there.
    const strength = compact ? 0.38 : 'nightSoft' in w.marker.dataset ? 0.45 : 0.78;
    ctx.globalAlpha =
      strength * passing * clamp01(f / 0.03) * (reduce ? 1 : clamp01((time - w.since) / 400));
    ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
    ctx.globalAlpha = 1;
  }

  function draw() {
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const down = descent();
    const pole = guideStar(down);
    drawField(pole.pivot, down);
    for (let i = waypoints.length - 1; i >= 0; i--) drawWaypoint(waypoints[i], down);
    const sprite = sprites.double;
    if (sprite && pole.size > 1) {
      const size = pole.size * (reduce ? 1 : 1 + 0.025 * Math.sin(time / 640));
      ctx.globalAlpha = pole.alpha;
      ctx.drawImage(sprite, pole.x - size / 2, pole.y - size / 2, size, size);
      ctx.globalAlpha = 1;
    }
  }

  function frame(now: number) {
    const dt = Math.min(now - last, 60);
    last = now;
    time += dt;
    ease.x += (mouse.x - ease.x) * 0.05;
    ease.y += (mouse.y - ease.y) * 0.05;
    if (follows && pointer.seen) {
      chase.x += (pointer.x - chase.x) * 0.12;
      chase.y += (pointer.y - chase.y) * 0.12;
      const box = city?.getBoundingClientRect();
      const over = !!box && pointer.x >= box.left && pointer.x <= box.right && pointer.y >= box.top && pointer.y <= box.bottom;
      melt += ((over ? 1 : 0) - melt) * 0.14;
    }
    if (time > nextFlare) {
      flare.index = Math.floor(Math.random() * field.length);
      flare.start = time;
      nextFlare = time + 700 + Math.random() * 1500;
    }
    draw();
    raf = requestAnimationFrame(frame);
  }

  const onPointer = (e: PointerEvent) => {
    mouse.x = (e.clientX / W) * 2 - 1;
    mouse.y = (e.clientY / H) * 2 - 1;
    if (!pointer.seen) {
      chase.x = e.clientX;
      chase.y = e.clientY;
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.seen = true;
  };
  const onScroll = () => draw();

  window.addEventListener('resize', resize);
  resize();
  if (reduce) {
    window.addEventListener('scroll', onScroll, { passive: true });
    draw();
  } else {
    window.addEventListener('pointermove', onPointer, { passive: true });
    raf = requestAnimationFrame(frame);
  }

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pointermove', onPointer);
  };
}
