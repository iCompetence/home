'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/components/ui/utils';
import { Button, Eyebrow, PageShell, siteHref } from '@/design-system';

/**
 * Working page, not part of the site: ten ways to show "Unsere Leistungen"
 * (three fields, four services each) on the day layer of the night home, to
 * choose from. Same content and i18n keys in every variant; each one is a
 * known pattern (named in its caption) in the study's look. Remove once the
 * choice is made.
 */

// Paths written out in full, not put together: the shareable view finds its images by them.
const FIELDS = [
  { id: 'data', star: '/images/nacht-stern-blau.webp', items: ['strategy', 'engineering', 'analytics', 'visualization'] },
  { id: 'ai', star: '/images/nacht-stern-violett.webp', items: ['strategy', 'genai', 'agentic', 'llm'] },
  { id: 'workshops', star: '/images/nacht-stern-mint.webp', items: ['ai', 'enablement', 'briefings', 'trainings'] },
] as const;

type Service = { label: string; desc: string };
type Field = { id: string; title: string; star: string; items: Service[] };

function useFields(): Field[] {
  const { t } = useLanguage();
  return FIELDS.map((f) => ({
    id: f.id,
    title: t(`lavender.services.${f.id}.title`),
    star: f.star,
    items: f.items.map((item) => ({
      label: t(`lavender.services.${f.id}.${item}.label`),
      desc: t(`lavender.services.${f.id}.${item}.desc`),
    })),
  }));
}

/** The field's star as a picture. */
function Star({ src, className }: { src: string; className?: string }) {
  return <img src={src} alt="" aria-hidden className={cn('pointer-events-none select-none', className)} />;
}

/** One variant: caption on the night ground, the variant itself on a sheet like the day layer. */
function Variant({
  n,
  name,
  basis,
  note,
  children,
}: {
  n: number;
  name: string;
  basis: string;
  note: string;
  children: ReactNode;
}) {
  const id = `v${String(n).padStart(2, '0')}`;
  return (
    <section id={id} className="scroll-mt-6">
      <div className="mx-auto flex w-full max-w-frame flex-col gap-3 px-[var(--section-pad-h)] pb-6 pt-16 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex items-baseline gap-4">
          <span className="lav-h1 text-lav-white/40">{String(n).padStart(2, '0')}</span>
          <h2 className="lav-h1 text-lav-white">{name}</h2>
        </div>
        <p className="lav-small max-w-[560px] text-lav-white/70 md:text-right">
          {note} <span className="text-lav-white/45">Basis: {basis}.</span>
        </p>
      </div>
      <div data-surface="light" data-star-hover className="rounded-card bg-lav-page text-lav-navy lg:rounded-frame">
        <div className="mx-auto flex w-full max-w-frame flex-col gap-8 px-[var(--section-pad-h)] py-[var(--section-pad-v)] lg:gap-10">
          <Eyebrow className="text-lav-navy/70">Unsere Leistungen</Eyebrow>
          {children}
        </div>
      </div>
    </section>
  );
}

/* 01 ---------------------------------------------------------------- */

function Columns({ fields }: { fields: Field[] }) {
  return (
    <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
      {fields.map((f) => (
        <div key={f.id} className="flex flex-col gap-8 border-t border-lav-navy/20 pt-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="lav-h1">{f.title}</h3>
            <Star src={f.star} className="size-14" />
          </div>
          <ul className="m-0 flex list-none flex-col gap-7 p-0">
            {f.items.map((s) => (
              <li key={s.label} className="flex flex-col gap-3">
                <p className="lav-h3">{s.label}</p>
                <p className="lav-paragraph text-lav-navy/75">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* 02 ---------------------------------------------------------------- */

function TabsAndField({ fields }: { fields: Field[] }) {
  return (
    <Tabs defaultValue={fields[0].id} className="gap-8 lg:gap-10">
      <TabsList className="h-auto w-fit gap-1 rounded-pill bg-lav-navy/[0.06] p-1">
        {fields.map((f) => (
          <TabsTrigger
            key={f.id}
            value={f.id}
            className="h-auto flex-none rounded-pill border-0 px-5 py-2.5 font-brand text-body font-medium text-lav-navy data-[state=active]:bg-lav-navy data-[state=active]:text-lav-white data-[state=active]:shadow-none"
          >
            {f.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {fields.map((f) => (
        <TabsContent key={f.id} value={f.id} className="grid flex-none items-stretch gap-10 lg:grid-cols-12">
          <ul className="m-0 flex list-none flex-col p-0 lg:col-span-6">
            {f.items.map((s) => (
              <li key={s.label} className="flex flex-col gap-3 border-t border-lav-navy/15 py-6 last:border-b">
                <p className="lav-h2">{s.label}</p>
                <p className="lav-paragraph max-w-[520px] text-lav-navy/75">{s.desc}</p>
              </li>
            ))}
          </ul>
          <div className="relative min-h-[320px] overflow-hidden rounded-card bg-lav-navy lg:col-span-6 lg:rounded-frame">
            <Star src={f.star} className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2" />
            <p className="lav-display absolute left-8 top-8 text-lav-white">{f.title}</p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

/* 03 ---------------------------------------------------------------- */

function Bento({ fields }: { fields: Field[] }) {
  const { t, language } = useLanguage();
  const tile = 'relative flex flex-col justify-between gap-10 overflow-hidden rounded-card bg-lav-navy p-6 text-lav-white md:p-8 lg:rounded-[28px]';
  const list = (f: Field, cols: string) => (
    <ul className={cn('relative m-0 grid list-none gap-x-8 gap-y-5 p-0', cols)}>
      {f.items.map((s) => (
        <li key={s.label} className="flex flex-col gap-2 border-t border-lav-white/20 pt-4">
          <p className="lav-body font-medium">{s.label}</p>
          <p className="lav-small text-lav-white/70">{s.desc}</p>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="grid gap-4 lg:grid-cols-6">
      <div className={cn(tile, 'lg:col-span-4')}>
        <Star src={fields[0].star} className="absolute -right-[8%] -top-[30%] w-[52%]" />
        <h3 className="lav-display relative">{fields[0].title}</h3>
        {list(fields[0], 'sm:grid-cols-2')}
      </div>
      <div className={cn(tile, 'lg:col-span-2 lg:row-span-2')}>
        <Star src={fields[1].star} className="absolute -right-[30%] -top-[12%] w-[110%]" />
        <h3 className="lav-display relative">{fields[1].title}</h3>
        {list(fields[1], 'grid-cols-1')}
      </div>
      <div className={cn(tile, 'lg:col-span-3')}>
        <Star src={fields[2].star} className="absolute -right-[10%] -top-[40%] w-[60%]" />
        <h3 className="lav-display relative">{fields[2].title}</h3>
        {list(fields[2], 'sm:grid-cols-2')}
      </div>
      <div className="flex flex-col items-start justify-between gap-8 rounded-card bg-lav-lavender p-6 md:p-8 lg:col-span-1 lg:rounded-[28px]">
        <p className="lav-h3">{t('lavender.statement')}</p>
        <Button asChild variant="dark" className="lav-star-hover hover:text-lav-white">
          <a href={siteHref(language, 'contact')} aria-label={t('topNav.letsTalk')}>
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>
    </div>
  );
}

/* 04 ---------------------------------------------------------------- */

function BigAccordion({ fields }: { fields: Field[] }) {
  return (
    <Accordion type="single" collapsible defaultValue={fields[0].id} className="border-t border-lav-navy/20">
      {fields.map((f) => (
        <AccordionItem key={f.id} value={f.id} className="border-b border-lav-navy/20 last:border-b">
          <AccordionTrigger className="items-center rounded-none py-7 hover:no-underline lg:py-9 [&>svg]:size-7 [&>svg]:text-lav-navy">
            <span className="flex items-center gap-5">
              <Star src={f.star} className="size-12 lg:size-16" />
              <span className="lav-star-text lav-display text-lav-navy">{f.title}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-10 pt-2">
            <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {f.items.map((s) => (
                <li key={s.label} className="flex flex-col gap-3">
                  <p className="lav-h3 text-lav-navy">{s.label}</p>
                  <p className="lav-paragraph text-lav-navy/75">{s.desc}</p>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* 05 ---------------------------------------------------------------- */

function StickyScroll({ fields }: { fields: Field[] }) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    // The block that crosses the middle of the screen sets the star.
    const seen = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    blocks.current.forEach((el) => el && seen.observe(el));
    return () => seen.disconnect();
  }, []);
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <div className="relative h-[300px] overflow-hidden rounded-card bg-lav-navy lg:sticky lg:top-24 lg:h-[min(70vh,560px)] lg:rounded-frame">
          {fields.map((f, i) => (
            <Star
              key={f.id}
              src={f.star}
              className={cn(
                'absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500',
                i === active ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
          <p className="lav-display absolute left-8 top-8 text-lav-white">{fields[active].title}</p>
        </div>
      </div>
      <div className="flex flex-col lg:col-span-6">
        {fields.map((f, i) => (
          <div
            key={f.id}
            data-index={i}
            ref={(el) => {
              blocks.current[i] = el;
            }}
            className="flex flex-col gap-8 py-10 first:pt-0 lg:min-h-[62vh] lg:justify-center"
          >
            <h3 className="lav-h1">{f.title}</h3>
            <ul className="m-0 flex list-none flex-col p-0">
              {f.items.map((s) => (
                <li key={s.label} className="flex flex-col gap-3 border-t border-lav-navy/15 py-5">
                  <p className="lav-h3">{s.label}</p>
                  <p className="lav-paragraph text-lav-navy/75">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 06 ---------------------------------------------------------------- */

function IndexList({ fields }: { fields: Field[] }) {
  let n = 0;
  return (
    <ol className="m-0 flex list-none flex-col border-b border-lav-navy/20 p-0">
      {fields.flatMap((f) =>
        f.items.map((s) => {
          n += 1;
          return (
            <li
              key={f.id + s.label}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-6 gap-y-3 border-t border-lav-navy/20 py-5 lg:grid-cols-[3rem_minmax(0,5fr)_9rem_minmax(0,6fr)] lg:py-6"
            >
              <span className="lav-small text-lav-navy/50 [font-variant-numeric:tabular-nums]">{String(n).padStart(2, '0')}</span>
              <p className="lav-h2">{s.label}</p>
              <p className="lav-small col-start-2 flex items-center gap-2 text-lav-navy/70 lg:col-start-auto">
                <Star src={f.star} className="size-5" />
                {f.title}
              </p>
              <p className="lav-paragraph col-start-2 text-lav-navy/75 lg:col-start-auto">{s.desc}</p>
            </li>
          );
        }),
      )}
    </ol>
  );
}

/* 07 ---------------------------------------------------------------- */

function Panels({ fields }: { fields: Field[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-4 lg:h-[540px] lg:flex-row">
      {fields.map((f, i) => {
        const on = i === active;
        return (
          <div
            key={f.id}
            onMouseEnter={() => setActive(i)}
            onFocusCapture={() => setActive(i)}
            className={cn(
              'relative flex min-w-0 flex-col justify-between gap-8 overflow-hidden rounded-card bg-lav-navy p-6 text-lav-white transition-[flex-grow] duration-500 ease-out md:p-8 lg:rounded-[28px]',
              on ? 'lg:flex-[3_1_0%]' : 'lg:flex-[1_1_0%]',
            )}
          >
            <Star
              src={f.star}
              className={cn(
                'absolute transition-[opacity,transform] duration-500',
                on ? '-right-[12%] -top-[22%] w-[62%] opacity-100' : '-right-[40%] top-[18%] w-[150%] opacity-70',
              )}
            />
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={on}
              className={cn(
                'relative cursor-pointer border-0 bg-transparent p-0 text-left text-lav-white',
                !on && 'lg:mt-auto lg:self-start',
              )}
            >
              {/* A narrow panel carries its name upright, reading bottom to top. */}
              <span
                className={cn(
                  on
                    ? 'lav-display'
                    : 'lav-display lg:block lg:rotate-180 lg:font-brand lg:text-[44px] lg:leading-none lg:tracking-[-1px] lg:[text-box:normal] lg:[writing-mode:vertical-rl]',
                )}
              >
                {f.title}
              </span>
            </button>
            <ul
              className={cn(
                'relative m-0 grid list-none gap-x-8 gap-y-5 p-0 sm:grid-cols-2 lg:transition-opacity lg:duration-300',
                on ? 'lg:opacity-100 lg:delay-200' : 'lg:pointer-events-none lg:absolute lg:opacity-0',
              )}
            >
              {f.items.map((s) => (
                <li key={s.label} className="flex flex-col gap-2 border-t border-lav-white/20 pt-4">
                  <p className="lav-body font-medium">{s.label}</p>
                  <p className="lav-small text-lav-white/70">{s.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* 08 ---------------------------------------------------------------- */

function PillPicker({ fields }: { fields: Field[] }) {
  const [pick, setPick] = useState({ f: 0, s: 0 });
  const field = fields[pick.f];
  const service = field.items[pick.s];
  return (
    <div className="grid items-stretch gap-10 lg:grid-cols-12">
      <div className="flex flex-col gap-8 lg:col-span-6">
        {fields.map((f, fi) => (
          <div key={f.id} className="flex flex-col gap-4">
            <h3 className="lav-h2 flex items-center gap-3">
              <Star src={f.star} className="size-8" />
              {f.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {f.items.map((s, si) => {
                const on = pick.f === fi && pick.s === si;
                return (
                  <button
                    key={s.label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPick({ f: fi, s: si })}
                    className={cn(
                      'lav-star-hover cursor-pointer rounded-pill border px-5 py-2.5 font-brand text-body font-medium transition-[color,border-color] duration-[var(--duration-fast)] hover:border-transparent hover:text-lav-white',
                      on ? 'border-lav-navy bg-lav-navy text-lav-white' : 'border-lav-navy/25 bg-transparent text-lav-navy',
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        aria-live="polite"
        className="relative flex min-h-[340px] flex-col justify-end gap-5 overflow-hidden rounded-card bg-lav-navy p-6 text-lav-white md:p-10 lg:col-span-6 lg:rounded-frame"
      >
        <Star src={field.star} className="absolute -right-[10%] -top-[26%] w-[70%]" />
        <p className="lav-small relative text-lav-white/70">{field.title}</p>
        <p className="lav-h1 relative">{service.label}</p>
        <p className="lav-body relative max-w-[480px] text-lav-white/80">{service.desc}</p>
      </div>
    </div>
  );
}

/* 09 ---------------------------------------------------------------- */

function Lanes({ fields }: { fields: Field[] }) {
  return (
    <div className="flex flex-col border-b border-lav-navy/20">
      {fields.map((f) => (
        <div key={f.id} className="grid gap-8 border-t border-lav-navy/20 py-10 lg:grid-cols-12 lg:gap-10 lg:py-12">
          <div className="flex items-start justify-between gap-4 lg:col-span-4 lg:flex-col">
            <h3 className="lav-h1">{f.title}</h3>
            <Star src={f.star} className="size-16 lg:size-24" />
          </div>
          <ul className="m-0 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:col-span-8">
            {f.items.map((s) => (
              <li key={s.label} className="flex flex-col gap-3">
                <p className="lav-h3">{s.label}</p>
                <p className="lav-paragraph text-lav-navy/75">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* 10 ---------------------------------------------------------------- */

/** Field stars around the double star; each field's services fan out away from the centre. */
const SKY = [
  { x: 31, y: 32, angle: 190 },
  { x: 69, y: 30, angle: -10 },
  { x: 50, y: 63, angle: 90 },
] as const;
const CENTRE = { x: 50, y: 38 };

function Constellation({ fields }: { fields: Field[] }) {
  const [active, setActive] = useState(0);
  // Positions in percent of the stage (16:9, so x steps are shorter than y steps).
  const points = fields.map((f, i) => {
    const base = SKY[i];
    return f.items.map((s, k) => {
      const a = ((base.angle + (k - 1.5) * 34) * Math.PI) / 180;
      // Rounded: server and browser may differ in the last digit of sin and cos.
      const round = (v: number) => Math.round(v * 100) / 100;
      return { label: s.label, x: round(base.x + Math.cos(a) * 11), y: round(base.y + Math.sin(a) * 11 * (16 / 9)) };
    });
  });
  return (
    <div className="flex flex-col gap-10">
      {/* The picture needs width; on phones the list below carries the content alone. */}
      <div className="relative hidden aspect-[16/9] w-full overflow-hidden rounded-frame bg-lav-navy md:block">
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          {fields.map((f, i) => (
            <g key={f.id} stroke="#ffffff" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity={i === active ? 0.6 : 0.2}>
              <line x1={CENTRE.x} y1={CENTRE.y} x2={SKY[i].x} y2={SKY[i].y} vectorEffect="non-scaling-stroke" />
              {points[i].map((p) => (
                <line key={p.label} x1={SKY[i].x} y1={SKY[i].y} x2={p.x} y2={p.y} vectorEffect="non-scaling-stroke" />
              ))}
            </g>
          ))}
        </svg>
        <img
          src="/images/nacht-stern-doppel.webp"
          alt=""
          aria-hidden
          className="pointer-events-none absolute w-[18%] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${CENTRE.x}%`, top: `${CENTRE.y}%` }}
        />
        {fields.map((f, i) => (
          <div key={f.id}>
            <button
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1 border-0 bg-transparent p-0 text-lav-white"
              style={{ left: `${SKY[i].x}%`, top: `${SKY[i].y}%` }}
            >
              <Star src={f.star} className={cn('transition-[width] duration-300', i === active ? 'w-24' : 'w-16')} />
              <span className="lav-h3">{f.title}</span>
            </button>
            {points[i].map((p) => (
              <span
                key={p.label}
                className={cn(
                  'lav-small absolute flex -translate-y-1/2 items-center gap-2 whitespace-nowrap transition-opacity duration-300',
                  p.x < SKY[i].x ? '-translate-x-full flex-row-reverse' : '',
                  i === active ? 'text-lav-white' : 'text-lav-white/45',
                )}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-current" />
                {p.label}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-wrap gap-2 lg:col-span-3 lg:flex-col lg:items-start">
          {fields.map((f, i) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="cursor-pointer border-0 bg-transparent p-0 text-left"
              {...(i === active ? { 'aria-current': 'true' as const } : {})}
            >
              <span className={cn('lav-star-text lav-h1', i === active ? '' : 'text-lav-navy/45')}>{f.title}</span>
            </button>
          ))}
        </div>
        <ul className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
          {fields[active].items.map((s) => (
            <li key={s.label} className="flex flex-col gap-3 border-t border-lav-navy/20 pt-5">
              <p className="lav-h3">{s.label}</p>
              <p className="lav-small text-lav-navy/75">{s.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

const VARIANTS = [
  { name: 'Drei Spalten, alles offen', basis: 'Feature-Spalten (shadcn/ui)', note: 'Nichts ist versteckt, alle zwölf Leistungen sind auf einen Blick lesbar. Ruhig und textlastig.' },
  { name: 'Tabs mit Sternfeld', basis: 'shadcn/ui Tabs', note: 'Ein Feld zur Zeit: links die vier Leistungen, rechts groß der Stern des Felds.' },
  { name: 'Bento-Raster', basis: 'Magic UI Bento Grid', note: 'Drei dunkle Kacheln in verschiedenen Größen, alles sichtbar, mit einer Kontakt-Kachel.' },
  { name: 'Akkordeon in großer Schrift', basis: 'shadcn/ui Accordion', note: 'Drei große Zeilen wie bei „So arbeiten wir“; aufgeklappt stehen die vier Leistungen nebeneinander.' },
  { name: 'Mitlaufender Stern', basis: 'Aceternity Sticky Scroll Reveal', note: 'Der Stern bleibt links stehen und wechselt die Farbe, während rechts die Felder vorbeiscrollen.' },
  { name: 'Leistungsverzeichnis', basis: 'Redaktionelle Tabelle', note: 'Alle zwölf Leistungen als nummerierte Liste mit Feld und Beschreibung. Sachlich, gut zu überfliegen.' },
  { name: 'Aufklappende Tafeln', basis: 'Aceternity Expandable Cards', note: 'Drei Tafeln nebeneinander; die berührte wird breit und zeigt ihre Leistungen. Das Karussell ohne Blättern.' },
  { name: 'Pillen mit Detailfeld', basis: 'Toggle-Gruppe + Detailkarte (shadcn/ui)', note: 'Alle Leistungen als Pillen, die gewählte wird rechts groß erklärt.' },
  { name: 'Drei Bahnen', basis: 'Feature-Zeilen', note: 'Je Feld eine Zeile: links der Name groß, rechts vier Leistungen nebeneinander.' },
  { name: 'Sternbild', basis: 'Eigener Entwurf zu „Licht und Linie“', note: 'Die Felder als Sterne um den Doppelstern, die Leistungen als Punkte daran. Experimentell.' },
] as const;

export default function LeistungenVariantenLavender() {
  const fields = useFields();
  const bodies = [
    <Columns key={1} fields={fields} />,
    <TabsAndField key={2} fields={fields} />,
    <Bento key={3} fields={fields} />,
    <BigAccordion key={4} fields={fields} />,
    <StickyScroll key={5} fields={fields} />,
    <IndexList key={6} fields={fields} />,
    <Panels key={7} fields={fields} />,
    <PillPicker key={8} fields={fields} />,
    <Lanes key={9} fields={fields} />,
    <Constellation key={10} fields={fields} />,
  ];
  return (
    <PageShell surface="inverse" nav={null} footer={null}>
      <div className="pb-24">
        <header className="mx-auto flex w-full max-w-frame flex-col gap-8 px-[var(--section-pad-h)] pt-16">
          <h1 className="lav-display text-lav-white">Unsere Leistungen: zehn Varianten</h1>
          <p className="lav-lead max-w-[760px] text-lav-white/80">
            Gleicher Inhalt, zehn Darstellungen. Jede steht auf einem hellen Blatt wie auf der Startseite und lässt sich
            hier ausprobieren.
          </p>
          <ol className="m-0 flex list-none flex-wrap gap-2 p-0">
            {VARIANTS.map((v, i) => (
              <li key={v.name}>
                <a
                  href={`#v${String(i + 1).padStart(2, '0')}`}
                  className="lav-star-hover lav-small inline-flex items-center gap-2 rounded-pill border border-lav-white/25 px-4 py-2 text-lav-white no-underline hover:border-transparent hover:opacity-100!"
                >
                  <span className="text-lav-white/55">{String(i + 1).padStart(2, '0')}</span>
                  {v.name}
                </a>
              </li>
            ))}
          </ol>
        </header>
        {VARIANTS.map((v, i) => (
          <Variant key={v.name} n={i + 1} name={v.name} basis={v.basis} note={v.note}>
            {bodies[i]}
          </Variant>
        ))}
      </div>
    </PageShell>
  );
}
