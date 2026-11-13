/**
 * The night sky of the night home (the preview home, /lavender/),
 * drawn on one fixed canvas behind the page. No React in here, so it can be
 * started on any canvas: `const stop = startNightSky(canvas)`.
 *
 * What it draws:
 * - small stars: fixed points that twinkle (their brightness wavers, each at
 *   its own pace; their size does not change). They do not move with scrolling
 *   or the pointer; the whole sky turns very slowly around a fixed pole. Every
 *   second or two one star somewhere on the screen, a different one each time,
 *   glints: it brightens and shows a fine cross of a random, small size, then
 *   fades. At most three at once, never large. Towards the glass city the
 *   stars fade out, so none shows through the buildings.
 * - the guide star (the blue/violet double star, "Polaris"): the one thing
 *   that moves. It follows the pointer with a lag, behind the page's content,
 *   so glass panels turn it into a glow. Over the glass city (HamburgGlass) it
 *   shrinks away and the city's own light takes over at the same spot.
 *
 * Without a pointer (touch, or before the pointer has moved) the guide star
 * rests above the glass city while the stage shows (at the start and at the
 * end of the page) and small overhead in between.
 *
 * With prefers-reduced-motion nothing animates: no twinkle, no turning, no
 * following. The sky is redrawn on scroll only, for the guide star's rest place.
 */

const DEFAULT_SOURCES = { double: '/images/nacht-stern-doppel.webp' };

/** Mostly white, a few in the brand's light tints. */
const TINTS = ['#ffffff', '#ffffff', '#ffffff', '#f5e1ff', '#bde3f4', '#bde3f4'];
/** Height / width of the Hamburg rendering (HamburgGlass). */
const SKYLINE_RATIO = 1114 / 2600;

type FieldStar = { angle: number; radius: number; size: number; tint: string; rate: number; phase: number };
/** One star glinting: which one, since when, for how long, and how long its cross gets (px). */
type Glint = { index: number; start: number; duration: number; reach: number };

/** What can be clicked: over these the guide star goes out. */
const CONTROLS = 'a, button, [role="button"], [role="tab"], input, textarea, select, summary';

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function startNightSky(
  canvas: HTMLCanvasElement,
  sources: { double: string } = DEFAULT_SOURCES,
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const follows = !reduce && window.matchMedia('(hover: hover)').matches;
  const city = document.querySelector('[data-ds="HamburgGlass"]');
  // The day layer: a light sheet that scrolls over the hero (Hamburg hero
  // variant). It covers this canvas, so the guide star is drawn a second time
  // on the layer's own canvas, which lies above the white and behind the content.
  const layer = document.querySelector('[data-ds="DayLayer"]');
  const dayCanvas = layer?.querySelector<HTMLCanvasElement>('canvas[data-sky="day"]') ?? null;
  const dayCtx = dayCanvas?.getContext('2d') ?? null;

  let W = 0;
  let H = 0;
  let dpr = 1;
  let raf = 0;
  let last = performance.now();
  let time = 0;
  let field: FieldStar[] = [];
  let glints: Glint[] = [];
  let nextGlint = 1500;
  // The pointer in px, the guide star's eased chase of it, and how far the
  // star has melted into the city (0..1).
  const pointer = { x: 0, y: 0, seen: false, onControl: false };
  const chase = { x: 0, y: 0 };
  let melt = 0;
  // How far the guide star is on the day layer (0..1): there it grows large.
  let day = 0;
  // What the day canvas shows right now; it is only redrawn when that changes.
  let dayDrawn = '';
  // The day layer's corner radius, read once per resize.
  let layerRadius = 0;
  // The same for the sky: the guide star's state at the last drawing, and when that was.
  let skyDrawn = '';
  let skyDrawnAt = -1e9;

  // The artwork is 3000 px wide; draw from a 1024 px copy instead.
  let sprite: HTMLCanvasElement | null = null;
  const img = new Image();
  img.onload = () => {
    const copy = document.createElement('canvas');
    copy.width = copy.height = 1024;
    copy.getContext('2d')?.drawImage(img, 0, 0, 1024, 1024);
    sprite = copy;
    if (reduce) draw(true);
  };
  img.src = sources.double;

  /** The point the sky turns around: where the guide star stands overhead. */
  const pole = () => ({ x: W * 0.5, y: H * 0.19 });

  function seed() {
    // Stars fill the disc around the pole that covers the screen, so turning
    // never uncovers an empty corner. About one star per 4,300 px² of screen.
    const p = pole();
    const reach = Math.hypot(Math.max(p.x, W - p.x), Math.max(p.y, H - p.y)) * 1.02;
    const count = Math.round((Math.PI * reach * reach) / (W < 768 ? 3000 : 4300));
    field = Array.from({ length: count }, () => {
      // Most stars are faint and tiny, a few are bright: cube the random number.
      const mag = Math.pow(Math.random(), 3);
      return {
        angle: Math.random() * Math.PI * 2,
        radius: reach * Math.sqrt(Math.random()),
        size: 0.45 + mag * 1.15,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        rate: 0.0012 + Math.random() * 0.0026,
        phase: Math.random() * Math.PI * 2,
      };
    });
  }

  function resize() {
    const width = window.innerWidth;
    const reseed = width !== W; // not on every mobile toolbar show/hide
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = width;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    layerRadius = layer ? parseFloat(getComputedStyle(layer).borderTopLeftRadius) || 0 : 0;
    if (dayCanvas) {
      dayCanvas.width = canvas.width;
      dayCanvas.height = canvas.height;
      dayDrawn = '';
    }
    if (reseed) seed();
    skyDrawn = '';
    if (reduce) draw(true);
  }

  /** Now and then a random star that is on screen starts to glint. */
  function scheduleGlints(turn: number) {
    glints = glints.filter((g) => time - g.start < g.duration);
    if (time < nextGlint || glints.length >= 3) return;
    // 0.9 to 2.6 seconds until the next one: often enough to be noticed
    // without looking for it, never a pattern.
    nextGlint = time + 900 + Math.random() * 1700;
    const p = pole();
    for (let tries = 0; tries < 12; tries++) {
      const index = Math.floor(Math.random() * field.length);
      const s = field[index];
      const x = p.x + Math.cos(s.angle + turn) * s.radius;
      const y = p.y + Math.sin(s.angle + turn) * s.radius;
      if (x < 8 || x > W - 8 || y < 8 || y > H - 8) continue;
      // Most glints are small (cross 3 px long), a few reach 9 px.
      glints.push({ index, start: time, duration: 1200 + Math.random() * 1200, reach: 4 + Math.pow(Math.random(), 2) * 6 });
      return;
    }
  }

  /**
   * How visible a star is at this height: stars fade out towards the glass
   * city, so none shows through the buildings. 1 above the city, 0 from its
   * middle down. Only while the city is on screen and not behind the day layer.
   */
  function cityFade(): (y: number) => number {
    const box = city?.getBoundingClientRect();
    if (!box || box.bottom < 0 || box.top > H) return () => 1;
    const from = box.top + box.height * 0.04;
    const to = box.top + box.height * 0.5;
    return (y) => (y <= from ? 1 : y >= to ? 0 : 1 - (y - from) / (to - from));
  }

  function drawField() {
    if (!ctx) return;
    const p = pole();
    // One turn takes about three hours: enough to feel alive, never to notice.
    const turn = reduce ? 0 : time * 0.0000006;
    if (!reduce) scheduleGlints(turn);
    const fade = cityFade();
    for (let i = 0; i < field.length; i++) {
      const s = field[i];
      const x = p.x + Math.cos(s.angle + turn) * s.radius;
      const y = p.y + Math.sin(s.angle + turn) * s.radius;
      if (x < -4 || x > W + 4 || y < -4 || y > H + 4) continue;
      const near = fade(y);
      if (near <= 0) continue;
      const bright = (s.size - 0.45) / 1.15;
      // Twinkling as with real stars: the brightness wavers, the size does not.
      // Two waves of different length per star, so no rhythm shows; brighter
      // stars waver more (down to about half), faint ones hardly.
      const depth = 0.12 + 0.36 * bright;
      const wave = Math.sin(time * s.rate + s.phase) * 0.6 + Math.sin(time * s.rate * 2.7 + s.phase * 1.9) * 0.4;
      const twinkle = reduce ? 1 : 1 - depth * (0.5 + 0.5 * wave);
      ctx.globalAlpha = (0.34 + 0.66 * bright) * twinkle * near;
      ctx.fillStyle = s.tint;
      ctx.beginPath();
      ctx.arc(x, y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const g of glints) {
      const s = field[g.index];
      if (!s) continue;
      const x = p.x + Math.cos(s.angle + turn) * s.radius;
      const y = p.y + Math.sin(s.angle + turn) * s.radius;
      // Rises quickly, fades slowly.
      const t = (time - g.start) / g.duration;
      const glow = (t < 0.3 ? t / 0.3 : 1 - (t - 0.3) / 0.7) * fade(y);
      if (glow <= 0) continue;
      const len = g.reach * glow;
      ctx.fillStyle = s.tint;
      ctx.globalAlpha = glow;
      ctx.beginPath();
      ctx.arc(x, y, Math.min(1.8, s.size + 0.5 * glow), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = glow * 0.85;
      ctx.fillRect(x - len, y - 0.35, len * 2, 0.7);
      ctx.fillRect(x - 0.35, y - len, 0.7, len * 2);
    }
    ctx.globalAlpha = 1;
  }

  /** 0 in the sky, 1 on the ground: the stretch of the page where the city stands. */
  function grounded() {
    // The stage shows at the top of the page and again at its end, when the
    // day layer has scrolled out: as much as the layer leaves free.
    const box = layer?.getBoundingClientRect();
    if (!box) return 1 - easeInOut(clamp01(window.scrollY / (H * 0.85)));
    return easeInOut(clamp01(Math.max(box.top, H - box.bottom) / (H * 0.85)));
  }

  function guideStar() {
    const compact = W < 768;
    const down = grounded();
    const small = { ...pole(), size: Math.max(120, Math.min(W, H) * 0.19) };
    // Over the city it rests in a gap of sky above the Speicherstadt (the
    // text block sits above the middle of the city).
    const box = city?.getBoundingClientRect();
    const skyline = box ? box.height : W * SKYLINE_RATIO;
    const at = { x: 0.9, y: 0.3 };
    const land = {
      // Never off screen (on phones the city is wider than the screen).
      x: Math.min(W * 0.86, (box ? box.left : 0) + (box ? box.width : W) * at.x),
      y: (box ? box.top : H - skyline) + skyline * at.y,
      size: Math.min(300, Math.max(96, skyline * 0.62)),
    };
    const rest = { x: lerp(small.x, land.x, down), y: lerp(small.y, land.y, down) };
    // With a pointer it follows all the way.
    const led = follows && pointer.seen ? 1 : 0;
    const x = lerp(rest.x, chase.x, led);
    const y = lerp(rest.y, chase.y, led);
    // On the day layer there is room: the star grows to a large glow behind
    // the content. In the hero it stays small, the city and the headline need
    // the space.
    const roam = compact ? W * 1.05 : Math.min(W * 0.5, H * 0.82);
    const night = lerp(small.size, land.size, down);
    return {
      x,
      y,
      size: lerp(night, roam, day) * (1 - melt),
      // At rest overhead it passes behind running text, so it steps back there.
      // On the day layer it lies behind dark text on white: a little lighter.
      alpha: lerp(lerp(compact ? 0.3 : 0.55, 1, down), lerp(0.9, 0.78, day), led) * (1 - melt),
    };
  }

  /** Whether a point of the screen lies on the day layer. */
  function onLayer(y: number) {
    const box = layer?.getBoundingClientRect();
    return !!box && y >= box.top && y <= box.bottom;
  }

  /** The guide star on the day layer's canvas, clipped to the layer (rounded corners included). */
  function drawDay(star: { x: number; y: number; alpha: number }, size: number, box: DOMRect) {
    if (!dayCanvas || !dayCtx) return;
    const top = Math.max(0, box.top);
    const bottom = Math.min(H, box.bottom);
    const shown = !!sprite && size > 1 && bottom > top && star.y + size / 2 > top && star.y - size / 2 < bottom;
    const key = shown
      ? // The layer's edges only matter while they are near the screen: scrolling inside the layer changes nothing here.
        [star.x, star.y, size, star.alpha, Math.max(-layerRadius, box.top), Math.min(H + layerRadius, box.bottom)]
          .map((v) => v.toFixed(1))
          .join()
      : 'empty';
    if (key === dayDrawn) return;
    dayDrawn = key;
    dayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dayCtx.clearRect(0, 0, W, H);
    if (!shown || !sprite) return;
    const radius = layerRadius;
    dayCtx.save();
    dayCtx.beginPath();
    if (radius && dayCtx.roundRect) dayCtx.roundRect(box.left, box.top, box.width, box.height, radius);
    else dayCtx.rect(box.left, box.top, box.width, box.height);
    dayCtx.clip();
    dayCtx.globalAlpha = star.alpha;
    dayCtx.drawImage(sprite, star.x - size / 2, star.y - size / 2, size, size);
    dayCtx.restore();
  }

  function draw(force = false) {
    if (!ctx) return;
    let star = guideStar();
    const box = layer?.getBoundingClientRect();
    if (box) {
      // Without animation frames (reduced motion) the size follows at once.
      const target = onLayer(star.y) ? 1 : 0;
      if (reduce && day !== target) {
        day = target;
        star = guideStar();
      }
    }
    // The star breathes in the night sky; on the day layer it holds still, so
    // nothing has to be redrawn (and no glass re-blurred) while the pointer rests.
    const size = star.size * (reduce ? 1 : 1 + 0.02 * (1 - day) * Math.sin(time / 900));
    if (box) drawDay(star, size, box);
    // While the layer covers the whole screen, the sky behind it is not drawn.
    if (box && box.top <= 0 && box.bottom >= H) return;
    // A full-screen canvas is costly to hand to the screen 60 times a second.
    // The small stars only shimmer slowly, so the sky is redrawn 20 times a
    // second, and at once whenever the guide star moves.
    const key = [star.x, star.y, star.size, star.alpha].map((v) => v.toFixed(1)).join();
    if (!force && key === skyDrawn && time - skyDrawnAt < 50) return;
    skyDrawn = key;
    skyDrawnAt = time;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    drawField();
    if (sprite && star.size > 1) {
      ctx.globalAlpha = star.alpha;
      ctx.drawImage(sprite, star.x - size / 2, star.y - size / 2, size, size);
      ctx.globalAlpha = 1;
    }
  }

  function frame(now: number) {
    const dt = Math.min(now - last, 60);
    last = now;
    time += dt;
    if (pointer.seen) {
      // Per frame at 60 Hz; on faster screens the same pace in time, not per frame.
      const pace = (k: number) => 1 - Math.pow(1 - k, dt / 16.667);
      chase.x += (pointer.x - chase.x) * pace(0.08);
      chase.y += (pointer.y - chase.y) * pace(0.08);
      const box = city?.getBoundingClientRect();
      // Over the city, and not on the layer that may lie over it.
      const over =
        !!box &&
        pointer.x >= box.left &&
        pointer.x <= box.right &&
        pointer.y >= box.top &&
        pointer.y <= box.bottom &&
        !onLayer(pointer.y);
      melt += ((over || pointer.onControl ? 1 : 0) - melt) * pace(0.14);
    }
    if (layer) {
      const target = onLayer(guideStar().y) ? 1 : 0;
      day = Math.abs(target - day) < 0.003 ? target : day + (target - day) * 0.07;
    }
    draw();
    raf = requestAnimationFrame(frame);
  }

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    if (!pointer.seen) {
      chase.x = e.clientX;
      chase.y = e.clientY;
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.seen = true;
    // Over a link or a button the star goes out: its light is in the control then.
    pointer.onControl = !!(e.target as Element | null)?.closest?.(CONTROLS);
  };
  const onScroll = () => draw(true);

  window.addEventListener('resize', resize);
  resize();
  if (reduce) {
    window.addEventListener('scroll', onScroll, { passive: true });
    draw(true);
  } else {
    if (follows) window.addEventListener('pointermove', onPointer, { passive: true });
    raf = requestAnimationFrame(frame);
  }

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pointermove', onPointer);
  };
}
