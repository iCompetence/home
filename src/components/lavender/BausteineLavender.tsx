'use client';

import { type ReactNode } from 'react';
import { IconBrain, IconChartBar, IconUsersGroup } from '@tabler/icons-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';
import { BentoCard, BentoGrid } from '@/components/magicui/bento-grid';
import { StickyScroll } from '@/components/aceternity/sticky-scroll-reveal';
import { InfiniteMovingCards } from '@/components/aceternity/infinite-moving-cards';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { siteHref } from '@/design-system';

/**
 * Working page: library components as installed (no restyling), with the home
 * page's content, so one can be chosen per section. Only what the libraries
 * leave to the page is written here: the content and the grid spans.
 */

const FIELDS = [
  { id: 'data', Icon: IconChartBar, star: '/images/icompetence_visual_blau_01.png', items: ['strategy', 'engineering', 'analytics', 'visualization'] },
  { id: 'ai', Icon: IconBrain, star: '/images/icompetence_visual_violet_01.png', items: ['strategy', 'genai', 'agentic', 'llm'] },
  { id: 'workshops', Icon: IconUsersGroup, star: '/images/icompetence_visual_mint.png', items: ['ai', 'enablement', 'briefings', 'trainings'] },
] as const;

const PEOPLE = [
  { key: 'kosyrev', name: 'Sergej Kosyrev' },
  { key: 'schneider', name: 'Michael Schneider' },
  { key: 'leparoux', name: 'Miriam Leparoux' },
  { key: 'devries', name: 'Jomique de Vries' },
  { key: 'loewe', name: 'Mario Löwe' },
  { key: 'kroesser', name: 'Alexander Krösser' },
  { key: 'buettner', name: 'Till Büttner' },
] as const;

function Candidate({ id, label, source, children }: { id: string; label: string; source: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-white/15 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-white/60">{source}</p>
        <h2 className="mb-10 text-3xl font-medium text-white">{label}</h2>
        {children}
      </div>
    </section>
  );
}

/** Aceternity "Features: simple with hover effects" — the block's Feature cell, index rules widened from 8 to 12 cells. */
function Feature({ title, description, index, columns, total }: { title: string; description: string; index: number; columns: number; total: number }) {
  const lastRow = index >= total - columns;
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800',
        index % columns === 0 && 'lg:border-l dark:border-neutral-800',
        !lastRow && 'lg:border-b dark:border-neutral-800',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800',
          lastRow ? 'bg-gradient-to-b' : 'bg-gradient-to-t',
        )}
      />
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
    </div>
  );
}

export default function BausteineLavender() {
  const { t, language } = useLanguage();
  const star = (src: string) => (
    <img src={src} alt="" className="absolute -right-16 -top-24 h-[130%] w-auto max-w-none opacity-70" />
  );
  const quotes = PEOPLE.map((p) => ({
    quote: t(`lavender.testimonials.${p.key}.quote`),
    name: p.name,
    title: t(`lavender.testimonials.${p.key}.role`),
  }));

  return (
    // `dark` switches the libraries' components to their dark styles.
    <div className="dark min-h-screen bg-[#0b2231] font-brand text-white">
      <header className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <p className="font-mono text-xs uppercase tracking-widest text-white/60">Arbeitsseite · nicht Teil der Website</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-medium">Bausteine zur Auswahl</h1>
        <p className="mt-6 max-w-2xl text-white/75">
          Fertige Komponenten aus Magic UI, Aceternity und shadcn, so wie die Bibliotheken sie liefern, nur mit
          unseren Inhalten gefüllt. Noch nicht an unseren Stil angepasst.
        </p>
      </header>

      <Candidate id="leistungen-a" label="Leistungen A · Bento Grid" source="Magic UI · bento-grid">
        <BentoGrid className="lg:grid-cols-3">
          {FIELDS.map((f) => (
            <BentoCard
              key={f.id}
              name={t(`lavender.services.${f.id}.title`)}
              className="col-span-3 lg:col-span-1"
              background={star(f.star)}
              Icon={f.Icon}
              description={f.items.map((i) => t(`lavender.services.${f.id}.${i}.label`)).join(' · ')}
              href={siteHref(language, 'contact')}
              cta={t('topNav.letsTalk')}
            />
          ))}
        </BentoGrid>
      </Candidate>

      <Candidate id="leistungen-b" label="Leistungen B · Sticky Scroll Reveal" source="Aceternity · sticky-scroll-reveal">
        <StickyScroll
          content={FIELDS.map((f) => ({
            title: t(`lavender.services.${f.id}.title`),
            description: f.items.map((i) => `${t(`lavender.services.${f.id}.${i}.label`)}: ${t(`lavender.services.${f.id}.${i}.desc`)}`).join(' '),
            content: (
              <div className="flex h-full w-full items-center justify-center bg-[#0b2231]">
                <img src={f.star} alt="" className="h-[120%] w-auto max-w-none" />
              </div>
            ),
          }))}
        />
      </Candidate>

      <Candidate id="leistungen-c" label="Leistungen C · Features-Raster mit Hover" source="Aceternity · features-section-demo-2">
        {FIELDS.map((f) => (
          <div key={f.id} className="mb-10">
            <h3 className="mb-2 px-10 text-2xl font-medium text-white">{t(`lavender.services.${f.id}.title`)}</h3>
            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {f.items.map((i, index) => (
                <Feature
                  key={i}
                  index={index}
                  columns={4}
                  total={4}
                  title={t(`lavender.services.${f.id}.${i}.label`)}
                  description={t(`lavender.services.${f.id}.${i}.desc`)}
                />
              ))}
            </div>
          </div>
        ))}
      </Candidate>

      <Candidate id="stimmen-a" label="Kundenstimmen A · Infinite Moving Cards" source="Aceternity · infinite-moving-cards">
        <InfiniteMovingCards items={quotes} direction="left" speed="slow" />
      </Candidate>

      <Candidate id="stimmen-b" label="Kundenstimmen B · Carousel mit Cards" source="shadcn/ui · carousel + card">
        <Carousel opts={{ align: 'start' }} className="mx-auto w-full max-w-5xl">
          <CarouselContent>
            {quotes.map((q) => (
              <CarouselItem key={q.name} className="md:basis-1/2">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col justify-between gap-6 p-6">
                    <p className="text-sm leading-relaxed">{q.quote}</p>
                    <div>
                      <p className="text-sm font-medium">{q.name}</p>
                      <p className="text-muted-foreground text-xs">{q.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Candidate>
    </div>
  );
}
