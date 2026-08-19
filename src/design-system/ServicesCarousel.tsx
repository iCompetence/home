'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { Section } from './Section';
import { useBreakpoint, isCompact, type Bp } from './useBreakpoint';
import { DURATION, EASE, useMotionPrefs } from './motion';

export type ServicePill = { label: string; description: string };
export type ServiceCard = {
  title: string;
  /** Background visual for the card. */
  image: string;
  pills: ServicePill[];
};

export type ServicesCarouselProps = {
  cards: readonly ServiceCard[];
  title: string;
  id?: string;
  prevLabel?: string;
  nextLabel?: string;
};

const CARD_GAP = 40;
const COLLAPSED_W = 640;

/**
 * Finite (non-looping) services carousel: starts on the first card, clamps at
 * both ends and disables the arrow at each bound. On desktop the neighbouring
 * cards peek; when a side has no card, a spacer keeps the active card centred.
 *
 * Because the carousel only mounts the visible cards and collapses pill copy,
 * a visually-hidden mirror of the full catalogue is rendered so crawlers and
 * LLM bots (no JS) still get the complete text.
 */
export function ServicesCarousel({
  cards,
  title,
  id = 'services',
  prevLabel = 'Previous service',
  nextLabel = 'Next service',
}: ServicesCarouselProps) {
  const bp = useBreakpoint();
  const prefs = useMotionPrefs();
  const compact = isCompact(bp);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedPillIdx, setExpandedPillIdx] = useState(0);

  const total = cards.length;
  const atStart = activeIdx === 0;
  const atEnd = activeIdx === total - 1;

  const goPrev = () => {
    if (atStart) return;
    setDirection(-1);
    setActiveIdx((i) => Math.max(0, i - 1));
    setExpandedPillIdx(0);
  };
  const goNext = () => {
    if (atEnd) return;
    setDirection(1);
    setActiveIdx((i) => Math.min(total - 1, i + 1));
    setExpandedPillIdx(0);
  };
  const onPillClick = (pillIdx: number) =>
    setExpandedPillIdx((p) => (p === pillIdx ? -1 : pillIdx));

  const slots = [
    { card: atStart ? null : cards[activeIdx - 1], role: 'prev' as const },
    { card: cards[activeIdx], role: 'active' as const },
    { card: atEnd ? null : cards[activeIdx + 1], role: 'next' as const },
  ];

  const arrowCls =
    'inline-flex h-11 w-11 items-center justify-center rounded-pill border-0 bg-lav-navy text-lav-white lg:h-12 lg:w-12';

  return (
    <Section dsName="ServicesCarousel" id={id} className="relative z-[1]" innerClassName="flex flex-col gap-6 lg:gap-10">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <h2 className="m-0 font-brand text-[28px] font-medium leading-[1.1] text-lav-navy md:text-[32px] lg:text-h3">
          {title}
        </h2>
        <div className="flex items-center gap-2 lg:gap-3">
          <button
            type="button"
            aria-label={prevLabel}
            onClick={goPrev}
            disabled={atStart}
            className={cn(arrowCls, atStart ? 'cursor-not-allowed opacity-35' : 'cursor-pointer')}
          >
            <ArrowLeft size={18} strokeWidth={2} className="lg:size-5" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={goNext}
            disabled={atEnd}
            className={cn(arrowCls, atEnd ? 'cursor-not-allowed opacity-35' : 'cursor-pointer')}
          >
            <ArrowRight size={18} strokeWidth={2} className="lg:size-5" />
          </button>
        </div>
      </div>

      {/* Cards */}
      {compact ? (
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, x: prefs.move(direction * 40) }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefs.d(DURATION.slow), ease: EASE.emphasized }}
          className="w-full"
        >
          <ServiceCardView
            card={cards[activeIdx]}
            isActive
            bp={bp}
            expandedPillIdx={expandedPillIdx}
            onPillClick={onPillClick}
            onCardClick={() => {}}
          />
        </motion.div>
      ) : (
        <div className="w-full overflow-visible">
          <motion.div
            key={activeIdx}
            initial={{ x: prefs.move(direction * (COLLAPSED_W + CARD_GAP)) }}
            animate={{ x: 0 }}
            transition={{ duration: prefs.d(DURATION.slower), ease: EASE.emphasized }}
            className="flex justify-center"
            style={{ gap: CARD_GAP }}
          >
            {slots.map(({ card, role }) =>
              card === null ? (
                <div
                  key={role}
                  aria-hidden
                  style={{ flex: `0 0 ${COLLAPSED_W}px`, height: 640 }}
                />
              ) : (
                <ServiceCardView
                  key={role}
                  card={card}
                  isActive={role === 'active'}
                  bp={bp}
                  expandedPillIdx={expandedPillIdx}
                  onPillClick={onPillClick}
                  onCardClick={() => {
                    if (role === 'prev') goPrev();
                    else if (role === 'next') goNext();
                  }}
                />
              ),
            )}
          </motion.div>
        </div>
      )}

      {/* SEO/LLM mirror of the full catalogue (see doc comment above). */}
      <div className="sr-only">
        {cards.map((card, i) => (
          <div key={i}>
            <h3>{card.title}</h3>
            <ul>
              {card.pills.map((pill, j) => (
                <li key={j}>
                  <strong>{pill.label}</strong> — {pill.description}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ServiceCardView({
  card,
  isActive,
  expandedPillIdx,
  onPillClick,
  onCardClick,
  bp,
}: {
  card: ServiceCard;
  isActive: boolean;
  expandedPillIdx: number;
  onPillClick: (idx: number) => void;
  onCardClick: () => void;
  bp: Bp;
}) {
  const pills = card.pills.map((pill, idx) =>
    idx === expandedPillIdx ? (
      <ExpandedPill key={idx} pill={pill} onClick={() => onPillClick(idx)} />
    ) : (
      <CollapsedPill key={idx} pill={pill} onClick={() => onPillClick(idx)} />
    ),
  );

  // Compact (tablet/mobile): one full-width card that always shows its pills.
  if (isCompact(bp)) {
    const stack = bp === 'mobile';
    return (
      <div
        className={cn('flex w-full', stack ? 'h-auto flex-col' : 'h-[460px] flex-row')}
      >
        <div
          className={cn(
            'flex shrink-0 flex-col bg-cover bg-center bg-no-repeat',
            stack ? 'h-[320px] w-full rounded-t-card p-6' : 'h-[460px] flex-1 rounded-l-card p-7',
          )}
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <h3
            className={cn(
              'm-0 font-brand font-medium leading-[1.1] text-lav-white',
              stack ? 'text-[40px]' : 'text-[48px]',
            )}
          >
            {card.title}
          </h3>
        </div>
        <div
          className={cn(
            'flex shrink-0 flex-col gap-2 bg-lav-navy',
            stack ? 'w-full rounded-b-card px-4 py-6' : 'w-[300px] rounded-r-card px-5 py-7',
          )}
        >
          {pills}
        </div>
      </div>
    );
  }

  // Desktop: 640px visual, plus a 320px pill column on the active card.
  return (
    <div className="flex h-[640px]" style={{ flex: isActive ? '0 0 960px' : '0 0 640px' }}>
      <div
        onClick={isActive ? undefined : onCardClick}
        className={cn(
          'relative flex h-[640px] w-[640px] shrink-0 flex-col bg-cover bg-center bg-no-repeat p-8',
          isActive ? 'cursor-default rounded-l-card' : 'cursor-pointer rounded-card',
        )}
        style={{ backgroundImage: `url(${card.image})` }}
      >
        <h3 className="m-0 font-brand text-h2 font-medium leading-[1.1] text-lav-white">
          {card.title}
        </h3>
      </div>
      {isActive && (
        <div className="flex h-[640px] w-[320px] shrink-0 flex-col justify-start gap-2 rounded-r-card bg-lav-navy px-6 py-8">
          {pills}
        </div>
      )}
    </div>
  );
}

function ExpandedPill({ pill, onClick }: { pill: ServicePill; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer flex-col gap-2 rounded-card-sm border border-transparent bg-lav-lavender p-0 text-left font-brand"
    >
      <div className="flex w-full items-center justify-between gap-3 px-4 py-2">
        <span className="font-brand text-body font-semibold text-lav-navy">{pill.label}</span>
        <Minus size={20} strokeWidth={2} className="shrink-0 text-lav-navy" />
      </div>
      <p className="m-0 px-4 pb-4 font-brand text-[14px] font-normal leading-[1.5] text-lav-navy/70">
        {pill.description}
      </p>
    </button>
  );
}

function CollapsedPill({ pill, onClick }: { pill: ServicePill; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-pill border border-lav-white/25 bg-transparent px-4 py-2 font-brand"
    >
      <span className="font-brand text-body font-medium text-lav-white">{pill.label}</span>
      <Plus size={20} strokeWidth={2} className="shrink-0 text-lav-white" />
    </button>
  );
}
