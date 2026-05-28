'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Menu,
  Linkedin,
  Twitter,
  Github,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

const NAVY = '#0b2231';
const LAVENDER = '#f5e1ff';
const PAGE_BG = '#fdfafe';
const BLUE = '#24a1da';
const WHITE = '#ffffff';
const NAVY_80 = 'rgba(11,34,49,0.8)';
const NAVY_70 = 'rgba(11,34,49,0.7)';
const NAVY_30 = 'rgba(11,34,49,0.3)';
const NAVY_20 = 'rgba(11,34,49,0.2)';
const NAVY_10 = 'rgba(11,34,49,0.10)';
const WHITE_70 = 'rgba(255,255,255,0.7)';
const WHITE_32 = 'rgba(255,255,255,0.32)';
const WHITE_20 = 'rgba(255,255,255,0.2)';
const WHITE_10 = 'rgba(255,255,255,0.10)';

const FONT = "Inter, system-ui, -apple-system, sans-serif";
const MAILTO = "mailto:info@icompetence.de?subject=Let%27s%20talk";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function smoothAnchor(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href') || '';
  if (!href.startsWith('#')) return;
  e.preventDefault();
  const id = href.slice(1);
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  scrollToId(id);
}

const FRAME_MAX_WIDTH = 1440;
const SECTION_VERTICAL_PADDING = 64;
const SECTION_HORIZONTAL_PADDING = 96;

const sectionOuter = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%',
  paddingTop: SECTION_VERTICAL_PADDING,
  paddingBottom: SECTION_VERTICAL_PADDING,
  boxSizing: 'border-box',
  ...extra,
});

const sectionInner = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%',
  maxWidth: FRAME_MAX_WIDTH,
  margin: '0 auto',
  paddingLeft: SECTION_HORIZONTAL_PADDING,
  paddingRight: SECTION_HORIZONTAL_PADDING,
  boxSizing: 'border-box',
  ...extra,
});

/** Pins absolutely-positioned decorative children to the 1440 design frame,
 *  so coords from the .pen file stay accurate regardless of viewport width. */
function DesignFrameOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: FRAME_MAX_WIDTH,
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {children}
    </div>
  );
}

export default function LavenderHome() {
  useEffect(() => {
    const prevBodyBg = document.body.style.backgroundColor;
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = PAGE_BG;
    document.documentElement.style.backgroundColor = PAGE_BG;
    return () => {
      document.body.style.backgroundColor = prevBodyBg;
      document.documentElement.style.backgroundColor = prevHtmlBg;
    };
  }, []);

  return (
    <div
      className="lavender-page"
      style={{
        width: '100%',
        background: PAGE_BG,
        color: NAVY,
        fontFamily: FONT,
        fontWeight: 500,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
.lavender-page a { text-decoration: none; }
.lavender-page * { box-sizing: border-box; }
html:has(.lavender-page), html:has(.lavender-page) body { overflow-x: clip; }
`,
        }}
      />
      <TopNav />
      <Hero />
      <LogoCarousel />
      <ServicesGrid />
      <Statement />
      <StatementCTA />
      <Highlight />
      <Testimonial />
      <Process />
      <PrivacyLed />
      <CTABand />
      <Footer />
    </div>
  );
}

/* ---------------- Top Nav ---------------- */

const NAV_SECTIONS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'services', label: 'Services' },
  { id: 'cases', label: 'Cases' },
  { id: 'process', label: 'Process' },
  { id: 'privacy-led', label: 'Privacy-led AI' },
];

function TopNav() {
  const [compact, setCompact] = useState(false);
  const [activeId, setActiveId] = useState<string>(NAV_SECTIONS[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const { scrollY } = useScroll();
  const fullItemsOpacity = useTransform(scrollY, [40, 70], [1, 0]);
  const compactItemsOpacity = useTransform(scrollY, [70, 80], [0, 1]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(top.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!dropdownOpen && !burgerOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-nav-popover]') || target.closest('[data-nav-trigger]')) return;
      setDropdownOpen(false);
      setBurgerOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [dropdownOpen, burgerOpen]);

  const activeLabel =
    NAV_SECTIONS.find((s) => s.id === activeId)?.label ?? NAV_SECTIONS[0].label;
  const otherSections = NAV_SECTIONS.filter((s) => s.id !== activeId);

  const morphTransition = {
    layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    opacity: { duration: 0.25, ease: 'easeOut' as const },
  };

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'transparent',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: FRAME_MAX_WIDTH,
          margin: '0 auto',
          padding: '12px 40px',
          minHeight: 104,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: compact ? 'center' : 'stretch',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!compact ? (
            <motion.nav
              key="full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={morphTransition}
              style={{
                width: '100%',
                background: NAVY,
                borderRadius: 100,
                padding: '16px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 48,
                boxSizing: 'border-box',
                color: WHITE,
              }}
            >
              <motion.a
                href="#top"
                onClick={smoothAnchor}
                style={{
                  opacity: fullItemsOpacity,
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <img
                  src="/iCompetence_white.svg"
                  alt="iCompetence"
                  style={{ height: 48, width: 'auto', display: 'block' }}
                />
              </motion.a>

              <motion.div style={{ opacity: fullItemsOpacity, display: 'flex', alignItems: 'center', gap: 56 }}>
                {NAV_SECTIONS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={smoothAnchor}
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: WHITE,
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </a>
                ))}
              </motion.div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <motion.div style={{ opacity: fullItemsOpacity, display: 'inline-flex', alignItems: 'center' }}>
                  <LanguageToggle />
                </motion.div>
                <motion.a
                  href={MAILTO}
                  transition={morphTransition}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: BLUE,
                    color: WHITE,
                    borderRadius: 100,
                    padding: '12px 24px',
                    fontSize: 16,
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Let&apos;s talk
                  <ArrowUpRight size={20} strokeWidth={2} />
                </motion.a>
                <motion.button
                  type="button"
                  aria-label="Menu"
                  transition={morphTransition}
                  style={{
                    background: 'transparent',
                    border: 0,
                    color: WHITE,
                    cursor: 'pointer',
                    padding: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <Menu size={28} strokeWidth={2} />
                </motion.button>
              </div>
            </motion.nav>
          ) : (
            <motion.nav
              key="compact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={morphTransition}
              style={{
                background: NAVY,
                borderRadius: 100,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                color: WHITE,
              }}
            >
              <motion.div style={{ opacity: compactItemsOpacity, position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <button
                  type="button"
                  data-nav-trigger
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                  onClick={() => {
                    setDropdownOpen((p) => !p);
                    setBurgerOpen(false);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'transparent',
                    border: 0,
                    color: WHITE,
                    fontFamily: FONT,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: 'pointer',
                    padding: '4px 6px',
                  }}
                >
                  {activeLabel}
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    style={{
                      transition: 'transform 0.2s ease',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                    }}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      data-nav-popover
                      role="menu"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 12px)',
                        left: 0,
                        background: NAVY,
                        borderRadius: 16,
                        padding: '10px 6px',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 180,
                        boxShadow: '0 10px 30px rgba(11,34,49,0.18)',
                      }}
                    >
                      {otherSections.map(({ id, label }) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          role="menuitem"
                          onClick={(e) => {
                            smoothAnchor(e);
                            setDropdownOpen(false);
                          }}
                          style={{
                            color: WHITE,
                            fontSize: 15,
                            fontWeight: 500,
                            padding: '8px 12px',
                            borderRadius: 10,
                            textDecoration: 'none',
                          }}
                        >
                          {label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.a
                href={MAILTO}
                transition={morphTransition}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: BLUE,
                  color: WHITE,
                  borderRadius: 100,
                  padding: '8px 16px',
                  fontSize: 16,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Let&apos;s talk
                <ArrowUpRight size={20} strokeWidth={2} />
              </motion.a>

              <div
                onMouseEnter={() => {
                  setBurgerOpen(true);
                  setDropdownOpen(false);
                }}
                onMouseLeave={() => setBurgerOpen(false)}
                style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
              >
                <motion.button
                  type="button"
                  aria-label="Menu"
                  aria-haspopup="menu"
                  aria-expanded={burgerOpen}
                  data-nav-trigger
                  transition={morphTransition}
                  style={{
                    background: 'transparent',
                    border: 0,
                    color: WHITE,
                    cursor: 'pointer',
                    padding: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <Menu size={22} strokeWidth={2} />
                </motion.button>
                <AnimatePresence>
                  {burgerOpen && (
                    <motion.div
                      data-nav-popover
                      role="menu"
                      initial={{ opacity: 0, y: -6, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, x: '-50%' }}
                      exit={{ opacity: 0, y: -6, x: '-50%' }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 20px)',
                        left: '50%',
                        background: NAVY,
                        borderRadius: 16,
                        padding: '12px 16px',
                        minWidth: 140,
                        boxShadow: '0 10px 30px rgba(11,34,49,0.18)',
                      }}
                    >
                      <LanguageToggle />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        width: '100%',
        background: 'rgba(245,225,255,0.10)',
      }}
    >
      {/* Yellow star — pinned to the 1440 design frame so original .pen coords still apply */}
      <DesignFrameOverlay>
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: -200,
            width: 1200,
            height: 1200,
            backgroundImage: 'url(/images/icompetence_visual_gelb.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        />
      </DesignFrameOverlay>

      {/* Hero content */}
      <div
        style={sectionInner({
          position: 'relative',
          zIndex: 2,
          paddingTop: 105,
          paddingBottom: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 40,
        })}
      >
        <div
          role="heading"
          aria-level={1}
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 80,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: NAVY,
            whiteSpace: 'pre-line',
          }}
        >
          {'Separate the signal\nfrom the noise.'}
        </div>

        <p
          style={{
            margin: 0,
            width: 820,
            fontFamily: FONT,
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.5,
            color: NAVY_80,
          }}
        >
          We help ambitious teams cut through complexity — turning scattered data into
          clear decisions, and AI into the products and automated processes that
          deliver lasting results.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href={MAILTO}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: BLUE,
              color: WHITE,
              borderRadius: 100,
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Let&apos;s talk
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
          <a
            href="#services"
            onClick={smoothAnchor}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: `1px solid ${NAVY}`,
              color: NAVY,
              borderRadius: 100,
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
              background: 'transparent',
            }}
          >
            See our services
            <ArrowDown size={20} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Logo Carousel ---------------- */

function LogoCarousel() {
  const logos = ['ACME', 'GLOBEX', 'INITECH', 'UMBRELLA', 'MERIDIAN'];
  return (
    <section
      style={sectionOuter({
        background: 'transparent',
        overflow: 'hidden',
        borderTop: `1px solid ${NAVY_20}`,
        borderBottom: `1px solid ${NAVY_20}`,
      })}
    >
      <div
        style={sectionInner({
          paddingLeft: 40,
          paddingRight: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 96,
        })}
      >
        {logos.map((logo) => (
          <div
            key={logo}
            style={{
              width: 180,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: 0.5,
                color: NAVY_70,
              }}
            >
              {logo}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Services Card Grid ---------------- */

type ServicePill = { label: string; description: string };
type ServiceCard = {
  title: string;
  image: string;
  pills: ServicePill[];
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    title: 'Data',
    image: '/images/iC_Stern_Blau.png',
    pills: [
      {
        label: 'Data Strategy',
        description:
          'Build a clear data foundation — assess sources, prioritize use cases, and align teams on outcomes.',
      },
      {
        label: 'Data Engineering',
        description:
          'Reliable pipelines, governed warehouses, and the plumbing that makes analytics and AI dependable.',
      },
      {
        label: 'Analytics',
        description:
          'Turn raw events into decision-grade metrics — instrumentation, modelling, and trustworthy reporting.',
      },
      {
        label: 'Visualization',
        description:
          'Dashboards that explain themselves — for executives, operators, and analysts alike.',
      },
    ],
  },
  {
    title: 'AI',
    image: '/images/iC_Stern_Gelb.png',
    pills: [
      {
        label: 'AI Strategy',
        description:
          'Identify where AI moves the needle — and design the path from quick wins to durable capability.',
      },
      {
        label: 'Generative AI',
        description:
          'Ship production-grade GenAI features with the safety, evaluation, and ops to back them.',
      },
      {
        label: 'Agentic Systems',
        description:
          'Multi-step agents that take action against your tools, data, and workflows — with humans in the loop.',
      },
      {
        label: 'LLM Integration',
        description:
          'Integrate the right model into the right surface — assistants, copilots, and end-to-end automations.',
      },
    ],
  },
  {
    title: 'Workshops',
    image: '/images/iC_Stern_Gruen.png',
    pills: [
      {
        label: 'AI Workshops',
        description:
          'A focused day of hands-on prototyping — your team leaves with a working AI use case, not slides.',
      },
      {
        label: 'Team Enablement',
        description:
          'Practical skill-building so your team can build, evaluate, and operate AI products themselves.',
      },
      {
        label: 'Executive Briefings',
        description:
          'A clear-eyed look at where AI changes your business and where it won\'t — tailored to your context.',
      },
      {
        label: 'Hands-on Trainings',
        description:
          'Modular trainings on data, GenAI, and agentic systems — practice over theory, every session.',
      },
    ],
  },
];

function ServicesGrid() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedPillIdx, setExpandedPillIdx] = useState(0);

  const ordered = [
    SERVICE_CARDS[activeIdx],
    SERVICE_CARDS[(activeIdx + 1) % SERVICE_CARDS.length],
    SERVICE_CARDS[(activeIdx + 2) % SERVICE_CARDS.length],
  ];

  const goPrev = () => {
    setActiveIdx(
      (i) => (i - 1 + SERVICE_CARDS.length) % SERVICE_CARDS.length
    );
    setExpandedPillIdx(0);
  };
  const goNext = () => {
    setActiveIdx((i) => (i + 1) % SERVICE_CARDS.length);
    setExpandedPillIdx(0);
  };

  return (
    <section
      id="services"
      style={sectionOuter({ background: 'transparent' })}
    >
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      })}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.1,
            color: NAVY,
          }}
        >
          Our Services
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            type="button"
            aria-label="Previous service"
            onClick={goPrev}
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              background: 'rgba(11,34,49,0.1)',
              border: 0,
              color: NAVY,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next service"
            onClick={goNext}
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              background: NAVY,
              border: 0,
              color: WHITE,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Cards (carousel — overflow clipped) */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {ordered.map((card, position) => (
          <ServiceCardView
            key={card.title}
            card={card}
            expanded={position === 0}
            expandedPillIdx={expandedPillIdx}
            onPillClick={(pillIdx) =>
              setExpandedPillIdx((p) => (p === pillIdx ? -1 : pillIdx))
            }
            onCardHeaderClick={() => {
              if (position !== 0) {
                setActiveIdx(
                  (SERVICE_CARDS.findIndex((c) => c.title === card.title) +
                    SERVICE_CARDS.length) %
                    SERVICE_CARDS.length
                );
                setExpandedPillIdx(0);
              }
            }}
          />
        ))}
      </div>
    </div>
    </section>
  );
}

function ServiceCardView({
  card,
  expanded,
  expandedPillIdx,
  onPillClick,
  onCardHeaderClick,
}: {
  card: ServiceCard;
  expanded: boolean;
  expandedPillIdx: number;
  onPillClick: (idx: number) => void;
  onCardHeaderClick: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flex: expanded ? '0 0 960px' : '0 0 640px',
        gap: 0,
        height: 640,
      }}
    >
      {/* Visual */}
      <div
        onClick={onCardHeaderClick}
        style={{
          width: 640,
          height: 640,
          borderRadius: expanded ? '24px 0 0 24px' : 24,
          backgroundImage: `url(${card.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 32px 32px 32px',
          boxSizing: 'border-box',
          flexShrink: 0,
          position: 'relative',
          cursor: expanded ? 'default' : 'pointer',
        }}
      >
        <h3
          style={{
            margin: 0,
            paddingTop: 32,
            fontFamily: FONT,
            fontSize: 54,
            fontWeight: 500,
            lineHeight: 1.1,
            color: WHITE,
            alignSelf: 'flex-start',
          }}
        >
          {card.title}
        </h3>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.9)',
            color: NAVY,
            borderRadius: 100,
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {expanded ? 'Featured' : 'View Details'}
        </div>
      </div>

      {/* Pill list (only when expanded) */}
      {expanded && (
        <div
          style={{
            width: 320,
            height: 640,
            borderRadius: '0 24px 24px 0',
            background: NAVY,
            padding: '0 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          {card.pills.map((pill, idx) =>
            idx === expandedPillIdx ? (
              <ExpandedServicePill
                key={pill.label}
                pill={pill}
                onClick={() => onPillClick(idx)}
              />
            ) : (
              <CollapsedServicePill
                key={pill.label}
                pill={pill}
                onClick={() => onPillClick(idx)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

function ExpandedServicePill({
  pill,
  onClick,
}: {
  pill: ServicePill;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,0.32)',
        borderRadius: 16,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        border: 0,
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          width: '100%',
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 600,
            color: WHITE,
          }}
        >
          {pill.label}
        </span>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 100,
            background: WHITE,
            color: NAVY,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          −
        </span>
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
          color: 'rgba(255,255,255,0.7)',
        }}
      >
        {pill.description}
      </p>
    </button>
  );
}

function CollapsedServicePill({
  pill,
  onClick,
}: {
  pill: ServicePill;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'rgba(255,255,255,0.32)',
        borderRadius: 100,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        border: 0,
        cursor: 'pointer',
        width: '100%',
        fontFamily: FONT,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 500,
          color: WHITE,
        }}
      >
        {pill.label}
      </span>
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 100,
          background: 'rgba(11,34,49,0.1)',
          color: WHITE,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 300,
          lineHeight: 1,
        }}
      >
        +
      </span>
    </button>
  );
}

/* ---------------- Statement ---------------- */

function Statement() {
  return (
    <section style={sectionOuter({ background: 'transparent' })}>
      <div style={sectionInner()}>
        <p
          style={{
            margin: 0,
            width: '100%',
            fontFamily: FONT,
            fontSize: 54,
            fontWeight: 500,
            lineHeight: 1.1,
            color: NAVY,
            textAlign: 'center',
          }}
        >
          We help ambitious teams turn data and AI into real business outcomes.
        </p>
      </div>
    </section>
  );
}

function StatementCTA() {
  return (
    <section
      id="cta"
      style={{
        width: '100%',
        paddingBottom: SECTION_VERTICAL_PADDING,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={sectionInner({
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <a
          href={MAILTO}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: NAVY,
            color: WHITE,
            borderRadius: 100,
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Get in touch
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}

function LanguageToggle() {
  const [lang, setLang] = useState<'EN' | 'DE'>('EN');
  return (
    <button
      type="button"
      onClick={() => setLang((p) => (p === 'EN' ? 'DE' : 'EN'))}
      style={{
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        padding: 0,
        fontFamily: FONT,
        fontSize: 16,
        fontWeight: 500,
        color: WHITE,
      }}
    >
      {lang === 'EN' ? (
        <>
          <span style={{ color: WHITE }}>EN</span>
          <span style={{ color: WHITE_70 }}> / DE</span>
        </>
      ) : (
        <>
          <span style={{ color: WHITE_70 }}>EN / </span>
          <span style={{ color: WHITE }}>DE</span>
        </>
      )}
    </button>
  );
}

/* ---------------- Highlight (iKnow + cases) ---------------- */

function Highlight() {
  return (
    <section id="cases" style={sectionOuter({ background: 'transparent' })}>
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      })}
    >
      {/* Main row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          width: '100%',
        }}
      >
        {/* Text column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: 0.5,
              color: NAVY_70,
            }}
          >
            Featured Product
          </span>
          <h2
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: 54,
              fontWeight: 500,
              lineHeight: 1.1,
              color: NAVY,
            }}
          >
            iKnow
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.5,
              color: NAVY_80,
            }}
          >
            Your team&apos;s collective knowledge, instantly accessible. Search
            across docs, conversations, and tools — answered with context, not just
            links.
          </p>
          <a
            href="/iknow/"
            style={{
              alignSelf: 'flex-start',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: NAVY,
              color: WHITE,
              borderRadius: 100,
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Explore iKnow
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </div>

        {/* Image */}
        <div
          style={{
            width: 640,
            height: 640,
            borderRadius: 24,
            backgroundImage: 'url(/images/iC_Stern_Blau.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Teasers */}
      <div style={{ display: 'flex', gap: 40, width: '100%' }}>
        <CaseTeaser
          eyebrow="Case"
          title="Real-time demand forecasting"
          description="How a leading event platform anticipates ticket demand with a forecasting pipeline tuned to volatile markets."
          image="/images/icompetence_visual_mint.png"
        />
        <CaseTeaser
          eyebrow="Case"
          title="AI-driven quality inspection"
          description="Computer vision deployed across a manufacturer's production lines to catch defects earlier and reduce waste."
          image="/images/icompetence_visual_gelb.png"
        />
      </div>
    </div>
    </section>
  );
}

function CaseTeaser({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <article
      style={{
        flex: 1,
        background: NAVY,
        borderRadius: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          height: 280,
          width: '100%',
          background: LAVENDER,
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      />
      <div
        style={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: 0.5,
            color: WHITE_70,
          }}
        >
          {eyebrow}
        </span>
        <h3
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 24,
            fontWeight: 500,
            lineHeight: 1.15,
            color: WHITE,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.5,
            color: WHITE_70,
          }}
        >
          {description}
        </p>
        <a
          href="#"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: WHITE,
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Read case
          <ArrowUpRight size={16} strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

/* ---------------- Testimonial ---------------- */

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      '“During our expansion, training and onboarding fell behind. They stepped in with consistent staffing, fair rates, and quick turnaround for urgent shifts.”',
    name: 'Priya Menon',
    role: 'Operations Director, Harbourview Senior Living',
  },
  {
    quote:
      '“They cut through the noise around our AI roadmap and pointed us at the two bets that actually mattered. Six months later, both are in production.”',
    name: 'Lukas Brenner',
    role: 'VP Data, Northwind Logistics',
  },
  {
    quote:
      '“The team showed up as partners, not vendors. They challenged our assumptions, shipped fast, and left us self-sufficient on the platform.”',
    name: 'Aisha Okafor',
    role: 'Chief Product Officer, Veridian Retail',
  },
];

function Testimonial() {
  const [idx, setIdx] = useState(0);
  const goPrev = () =>
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[idx];

  return (
    <section style={sectionOuter({ background: 'transparent' })}>
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      })}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 500,
          lineHeight: 1.1,
          color: NAVY,
          width: '100%',
        }}
      >
        What our clients say
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 40,
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        {/* Nav arrows */}
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrev}
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              background: 'transparent',
              border: `1px solid ${NAVY_30}`,
              color: NAVY,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              background: NAVY,
              border: 0,
              color: WHITE,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowRight size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: 54,
              fontWeight: 500,
              lineHeight: 1.1,
              color: NAVY,
            }}
          >
            {t.quote}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: NAVY_30,
                flexShrink: 0,
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  fontWeight: 500,
                  color: NAVY,
                }}
              >
                {t.name}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  fontWeight: 400,
                  color: NAVY_80,
                }}
              >
                {t.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

/* ---------------- Process (3-step accordion) ---------------- */

type ProcessItem = {
  number: string;
  title: string;
  description: string;
  image: string;
};

const PROCESS_ITEMS: ProcessItem[] = [
  {
    number: '01',
    title: 'Ideation Workshop',
    description:
      'We start by aligning on the problem worth solving. In a focused workshop, we map your goals, constraints, and data — then walk away with a sharp use case and a clear next step.',
    image: '/images/iC_Stern_Blau.png',
  },
  {
    number: '02',
    title: 'Proof of Concept',
    description:
      'We build a tangible prototype together — focused, fast, and grounded in your real data. Within weeks, you see whether the idea holds up in practice, what to refine, and what to scale.',
    image: '/images/icompetence_visual_mint.png',
  },
  {
    number: '03',
    title: 'Rollout',
    description:
      'We harden the proof into a production-ready system — integrated, monitored, and owned by your team. Enablement, documentation, and handover are part of the package.',
    image: '/images/iC_Stern_Gelb.png',
  },
];

function Process() {
  const [expanded, setExpanded] = useState<number | null>(1);

  return (
    <section id="process" style={sectionOuter({ background: 'transparent' })}>
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      })}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: 54,
          fontWeight: 500,
          lineHeight: 1.1,
          color: NAVY,
          width: '100%',
        }}
      >
        This is how we work
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {PROCESS_ITEMS.map((item, idx) => (
          <ProcessRow
            key={item.number}
            item={item}
            isLast={idx === PROCESS_ITEMS.length - 1}
            expanded={expanded === idx}
            onToggle={() => setExpanded((e) => (e === idx ? null : idx))}
          />
        ))}
      </div>
    </div>
    </section>
  );
}

function ProcessRow({
  item,
  isLast,
  expanded,
  onToggle,
}: {
  item: ProcessItem;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        background: expanded ? WHITE : 'transparent',
        borderTop: `1px solid ${NAVY_20}`,
        borderBottom: isLast ? `1px solid ${NAVY_20}` : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: expanded ? 32 : 0,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        style={{
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          padding: '32px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          width: '100%',
          fontFamily: FONT,
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 36,
              fontWeight: 500,
              color: NAVY_80,
              minWidth: 56,
            }}
          >
            {item.number}
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 36,
              fontWeight: 500,
              color: NAVY,
            }}
          >
            {item.title}
          </span>
        </div>
        {expanded ? (
          <Minus size={28} color={NAVY} strokeWidth={2} />
        ) : (
          <Plus size={28} color={NAVY} strokeWidth={2} />
        )}
      </button>

      {expanded && (
        <div
          style={{
            display: 'flex',
            gap: 40,
            width: '100%',
            alignItems: 'flex-start',
            paddingBottom: 32,
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '16px 0 16px 64px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 1.5,
                color: NAVY_80,
              }}
            >
              {item.description}
            </p>
          </div>
          <div
            style={{
              width: 420,
              height: 280,
              borderRadius: 16,
              background: `${NAVY} url(${item.image}) center/contain no-repeat`,
              flexShrink: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ---------------- Privacy-Led ---------------- */

function PrivacyLed() {
  return (
    <section id="privacy-led" style={sectionOuter({ background: 'transparent' })}>
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        alignItems: 'center',
      })}
    >
      <div
        style={{
          width: '100%',
          height: 400,
          backgroundImage: 'url(/images/privacy-led.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.1,
            color: NAVY,
          }}
        >
          Privacy-Led Setups
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.5,
            color: NAVY_80,
          }}
        >
          Why share your customer data or strategies with foreign infrastructure?
          A privacy-led setup keeps your data — and your competitive edge — exactly
          where it belongs: with you.
        </p>
        <a
          href="/privacy-led-ai/"
          style={{
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: NAVY,
            color: WHITE,
            borderRadius: 100,
            padding: '12px 24px',
            fontSize: 16,
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Explore privacy-led
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </div>
    </div>
    </section>
  );
}

/* ---------------- CTA Band ---------------- */

function CTABand() {
  return (
    <section style={sectionOuter({ background: LAVENDER })}>
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        alignItems: 'center',
      })}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 80,
            fontWeight: 500,
            letterSpacing: -2,
            lineHeight: 1.05,
            color: NAVY,
            textAlign: 'center',
            width: '100%',
          }}
        >
          Ready to turn ambition into outcomes?
        </h2>
      </div>
      <a
        href={MAILTO}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: NAVY,
          color: WHITE,
          borderRadius: 100,
          padding: '12px 24px',
          fontSize: 16,
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Get in touch
        <ArrowUpRight size={20} strokeWidth={2} />
      </a>
    </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer
      style={sectionOuter({
        background: NAVY,
        color: WHITE,
        overflow: 'hidden',
      })}
    >
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      })}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 40,
          width: '100%',
        }}
      >
        <div style={{ width: 720 }}>
          <h2
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: 80,
              fontWeight: 500,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: WHITE,
            }}
          >
            Separate the signal from the noise.
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 32,
          }}
        >
          <div style={{ display: 'flex', gap: 16 }}>
            <FooterSocial href="#" label="LinkedIn">
              <Linkedin size={20} strokeWidth={2} />
            </FooterSocial>
            <FooterSocial href="#" label="Twitter">
              <Twitter size={20} strokeWidth={2} />
            </FooterSocial>
            <FooterSocial href="#" label="GitHub">
              <Github size={20} strokeWidth={2} />
            </FooterSocial>
          </div>

          <FooterContactBlock label="Inquiries" value="info@icompetence.de" />
          <FooterContactBlock label="Phone" value="+49 40 609 45 51-0" />
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingTop: 24,
          borderTop: `1px solid ${WHITE_32}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[
            ['Imprint', '/imprint/'],
            ['Privacy', '#'],
            ['Cookies', '#'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: FONT,
                fontSize: 16,
                fontWeight: 500,
                color: WHITE_70,
                textDecoration: 'none',
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#top"
          onClick={smoothAnchor}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 500,
            color: WHITE_70,
            textDecoration: 'none',
          }}
        >
          Back to top
          <ChevronUp size={16} strokeWidth={2} />
        </a>
      </div>
    </div>
    </footer>
  );
}

function FooterSocial({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: 40,
        height: 40,
        borderRadius: 100,
        background: WHITE_10,
        color: WHITE,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}

function FooterContactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: 0.5,
          color: WHITE_70,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 500,
          color: WHITE,
        }}
      >
        {value}
      </span>
    </div>
  );
}
