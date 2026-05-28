'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
.lavender-page a, .lavender-page button { transition: opacity 0.15s ease; cursor: pointer; }
.lavender-page a:hover, .lavender-page button:hover { opacity: 0.75; }
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
      <div style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
        <CTABand />
        <Footer />
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
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -120,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 820,
              height: 820,
              backgroundImage: 'url(/images/icompetence_visual_01.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Burger Menu ---------------- */

const BURGER_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Analytics Agent', href: '/analytics-agent/' },
  { label: 'iKnow', href: '/iknow/' },
  { label: 'Intelligentic Search', href: '/intelligentic-search/' },
  { label: 'Privacy-Led AI', href: '/privacy-led-ai/' },
  { label: 'AI Workshop', href: '/ai-workshop/' },
  { label: 'Campaign Tool', href: '/campaign-parameter-tool/' },
  { label: 'User Journey Explorer', href: '/icu-user-journey-explorer/' },
  { label: "What's New", href: '/whats-new/' },
];

function LinkedInGlyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function BurgerMenu({
  iconSize,
  wide = false,
  pillWidth = 0,
  pillPaddingX = 0,
  pillPaddingY = 0,
}: {
  iconSize: number;
  wide?: boolean;
  pillWidth?: number;
  pillPaddingX?: number;
  pillPaddingY?: number;
}) {
  const [open, setOpen] = useState(false);
  const dropdownTopOffset = pillPaddingY + 24;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
    >
      <button
        type="button"
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={open}
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
        <Menu size={iconSize} strokeWidth={2} />
      </button>
      {open && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '100%',
            right: -pillPaddingX,
            width: pillWidth || (wide ? 1100 : 264),
            height: dropdownTopOffset,
            background: 'transparent',
          }}
        />
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: `calc(100% + ${dropdownTopOffset}px)`,
              right: -pillPaddingX,
              width: pillWidth || (wide ? 1100 : 264),
              background: NAVY,
              borderRadius: wide ? 24 : 16,
              padding: wide ? '40px 48px' : '20px 24px',
              boxShadow: '0 10px 30px rgba(11,34,49,0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: wide ? 24 : 12,
              boxSizing: 'border-box',
            }}
          >
            {wide ? (
              <>
                <a
                  href="/"
                  style={{
                    fontFamily: FONT,
                    fontSize: 16,
                    fontWeight: 500,
                    color: WHITE,
                    textDecoration: 'none',
                  }}
                >
                  Home
                </a>
                <div style={{ height: 1, background: WHITE_20 }} />
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: WHITE_70,
                  }}
                >
                  Products &amp; Tools
                </span>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap: 32,
                    rowGap: 16,
                  }}
                >
                  {BURGER_LINKS.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      style={{
                        fontFamily: FONT,
                        fontSize: 18,
                        fontWeight: 500,
                        color: WHITE,
                        textDecoration: 'none',
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
                <div style={{ height: 1, background: WHITE_20 }} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                  }}
                >
                  <LanguageToggle />
                  <a
                    href="https://www.linkedin.com/company/icompetence/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="iCompetence on LinkedIn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      borderRadius: 100,
                      background: WHITE_10,
                      color: WHITE,
                      textDecoration: 'none',
                    }}
                  >
                    <LinkedInGlyph size={18} />
                  </a>
                </div>
              </>
            ) : (
              <>
                <a
                  href="/"
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: 500,
                    color: WHITE,
                    textDecoration: 'none',
                    padding: '4px 0',
                  }}
                >
                  Home
                </a>
                <div style={{ height: 1, background: WHITE_20, margin: '4px 0' }} />
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: WHITE_70,
                  }}
                >
                  Products &amp; Tools
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {BURGER_LINKS.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      style={{
                        fontFamily: FONT,
                        fontSize: 14,
                        fontWeight: 500,
                        color: WHITE,
                        textDecoration: 'none',
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>
                <div style={{ height: 1, background: WHITE_20, margin: '4px 0' }} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <LanguageToggle />
                  <a
                    href="https://www.linkedin.com/company/icompetence/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="iCompetence on LinkedIn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: 100,
                      background: WHITE_10,
                      color: WHITE,
                      textDecoration: 'none',
                    }}
                  >
                    <LinkedInGlyph size={16} />
                  </a>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
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
  const navPillRef = useRef<HTMLElement | null>(null);
  const [pillWidth, setPillWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const el = navPillRef.current;
      if (el) setPillWidth(el.getBoundingClientRect().width);
    };
    measure();
    let ro: ResizeObserver | null = null;
    if (navPillRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(navPillRef.current);
    }
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [compact]);

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
    if (!dropdownOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-nav-popover]') || target.closest('[data-nav-trigger]')) return;
      setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [dropdownOpen]);

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
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: FRAME_MAX_WIDTH,
          margin: '0 auto',
          padding: '16px 40px 0 40px',
          minHeight: 96,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: compact ? 'center' : 'stretch',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!compact ? (
            <motion.nav
              key="full"
              ref={navPillRef}
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
                pointerEvents: 'auto',
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
                <motion.a
                  href="/contact/" target="_blank" rel="noopener noreferrer"
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
                <BurgerMenu iconSize={28} wide pillWidth={pillWidth} pillPaddingX={32} pillPaddingY={16} />
              </div>
            </motion.nav>
          ) : (
            <motion.nav
              key="compact"
              ref={navPillRef}
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
                pointerEvents: 'auto',
              }}
            >
              <motion.div style={{ opacity: compactItemsOpacity, position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <button
                  type="button"
                  data-nav-trigger
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((p) => !p)}
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
                  <span style={{ display: 'grid' }}>
                    {NAV_SECTIONS.map(({ id, label }) => (
                      <span
                        key={id}
                        style={{
                          gridArea: '1 / 1',
                          visibility: id === activeId ? 'visible' : 'hidden',
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </span>
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
                      <a
                        key="home"
                        href="#top"
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
                        Home
                      </a>
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
                href="/contact/" target="_blank" rel="noopener noreferrer"
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

              <BurgerMenu iconSize={22} pillWidth={pillWidth} pillPaddingX={16} pillPaddingY={8} />
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
          paddingTop: 64,
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
            href="/contact/" target="_blank" rel="noopener noreferrer"
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

const LOGO_MARKS: React.ReactNode[] = [
  <circle key="c-fill" cx={11} cy={11} r={10} />,
  <circle key="c-line" cx={11} cy={11} r={9} fill="none" stroke="currentColor" strokeWidth={2.5} />,
  <rect key="sq" x={1} y={1} width={20} height={20} />,
  <rect key="diamond" x={4} y={4} width={14} height={14} transform="rotate(45 11 11)" />,
  <polygon key="tri" points="11,1 21,19 1,19" />,
  <polygon key="hex" points="11,1 19,6 19,16 11,21 3,16 3,6" />,
  <path key="plus" d="M8,1 H14 V8 H21 V14 H14 V21 H8 V14 H1 V8 H8 Z" />,
  <g key="bars">
    <rect x={1} y={4} width={20} height={4} />
    <rect x={1} y={14} width={20} height={4} />
  </g>,
];

type LogoEntry = { name: string; mark: number };
const LOGO_POOL: LogoEntry[] = [
  { name: 'ACME', mark: 0 },
  { name: 'GLOBEX', mark: 1 },
  { name: 'INITECH', mark: 2 },
  { name: 'UMBRELLA', mark: 3 },
  { name: 'MERIDIAN', mark: 4 },
  { name: 'HOOLI', mark: 5 },
  { name: 'WAYNE', mark: 6 },
  { name: 'STARK', mark: 7 },
  { name: 'TYRELL', mark: 1 },
  { name: 'VANDELAY', mark: 2 },
  { name: 'OSCORP', mark: 5 },
  { name: 'CYBERDYNE', mark: 6 },
  { name: 'WEYLAND', mark: 3 },
  { name: 'INGEN', mark: 4 },
  { name: 'NAKATOMI', mark: 0 },
];
const LOGO_SLOTS = 5;

function LogoCarousel() {
  const [visible, setVisible] = useState<LogoEntry[]>(() => LOGO_POOL.slice(0, LOGO_SLOTS));

  useEffect(() => {
    let lastSlot = -1;
    const swapRandomSlot = () => {
      setVisible((current) => {
        let slot = Math.floor(Math.random() * LOGO_SLOTS);
        if (slot === lastSlot) slot = (slot + 1) % LOGO_SLOTS;
        lastSlot = slot;
        const visibleNames = new Set(current.map((l) => l.name));
        const pool = LOGO_POOL.filter((l) => !visibleNames.has(l.name));
        if (pool.length === 0) return current;
        const next = [...current];
        next[slot] = pool[Math.floor(Math.random() * pool.length)];
        return next;
      });
    };

    let timer: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      const delay = 800 + Math.random() * 2400;
      timer = setTimeout(() => {
        swapRandomSlot();
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

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
        {visible.map((logo, i) => (
          <div
            key={i}
            style={{
              width: 180,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  color: NAVY,
                }}
              >
                <svg
                  viewBox="0 0 22 22"
                  width={22}
                  height={22}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {LOGO_MARKS[logo.mark]}
                </svg>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: 0.8,
                  }}
                >
                  {logo.name}
                </span>
              </motion.div>
            </AnimatePresence>
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
  const [direction, setDirection] = useState(0);
  const [expandedPillIdx, setExpandedPillIdx] = useState(0);

  const total = SERVICE_CARDS.length;
  const goPrev = () => {
    setDirection(-1);
    setActiveIdx((i) => (i - 1 + total) % total);
    setExpandedPillIdx(0);
  };
  const goNext = () => {
    setDirection(1);
    setActiveIdx((i) => (i + 1) % total);
    setExpandedPillIdx(0);
  };

  const CARD_GAP = 40;
  const COLLAPSED_W = 640;
  const prevIdx = (activeIdx - 1 + total) % total;
  const nextIdx = (activeIdx + 1) % total;
  const visible = [
    { card: SERVICE_CARDS[prevIdx], idx: prevIdx, role: 'prev' as const },
    { card: SERVICE_CARDS[activeIdx], idx: activeIdx, role: 'active' as const },
    { card: SERVICE_CARDS[nextIdx], idx: nextIdx, role: 'next' as const },
  ];

  return (
    <section
      id="services"
      style={sectionOuter({ background: 'transparent', position: 'relative', zIndex: 1 })}
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

      {/* Cards (carousel — wraps; active centered, prev/next peek; sliding motion on nav) */}
      <div
        style={{
          width: '100%',
          overflow: 'visible',
        }}
      >
        <motion.div
          key={activeIdx}
          initial={{ x: direction * (COLLAPSED_W + CARD_GAP) }}
          animate={{ x: 0 }}
          transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
          style={{
            display: 'flex',
            gap: CARD_GAP,
            justifyContent: 'center',
          }}
        >
          {visible.map(({ card, role }) => (
            <ServiceCardView
              key={role}
              card={card}
              isActive={role === 'active'}
              expandedPillIdx={expandedPillIdx}
              onPillClick={(pillIdx) =>
                setExpandedPillIdx((p) => (p === pillIdx ? -1 : pillIdx))
              }
              onCardClick={() => {
                if (role === 'prev') goPrev();
                else if (role === 'next') goNext();
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
    </section>
  );
}

function ServiceCardView({
  card,
  isActive,
  expandedPillIdx,
  onPillClick,
  onCardClick,
}: {
  card: ServiceCard;
  isActive: boolean;
  expandedPillIdx: number;
  onPillClick: (idx: number) => void;
  onCardClick: () => void;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flex: isActive ? '0 0 960px' : '0 0 640px',
        gap: 0,
        height: 640,
      }}
    >
      {/* Visual */}
      <div
        onClick={isActive ? undefined : onCardClick}
        style={{
          width: 640,
          height: 640,
          borderRadius: isActive ? '24px 0 0 24px' : 24,
          backgroundImage: `url(${card.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          padding: '32px',
          boxSizing: 'border-box',
          flexShrink: 0,
          position: 'relative',
          cursor: isActive ? 'default' : 'pointer',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: 54,
            fontWeight: 500,
            lineHeight: 1.1,
            color: WHITE,
          }}
        >
          {card.title}
        </h3>
      </div>

      {/* Pill list (only on the centered/active card) */}
      {isActive && (
        <div
          style={{
            width: 320,
            height: 640,
            borderRadius: '0 24px 24px 0',
            background: NAVY,
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
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
        background: LAVENDER,
        borderRadius: 16,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        border: '1px solid transparent',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        fontFamily: FONT,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          width: '100%',
          padding: '8px 16px',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: 16,
            fontWeight: 600,
            color: NAVY,
          }}
        >
          {pill.label}
        </span>
        <Minus size={20} strokeWidth={2} color={NAVY} style={{ flexShrink: 0 }} />
      </div>
      <p
        style={{
          margin: 0,
          padding: '0 16px 16px 16px',
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 1.5,
          color: 'rgba(11,34,49,0.7)',
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
        background: 'transparent',
        borderRadius: 100,
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        border: '1px solid rgba(255,255,255,0.25)',
        cursor: 'pointer',
        width: '100%',
        fontFamily: FONT,
        boxSizing: 'border-box',
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
      <Plus size={20} strokeWidth={2} color={WHITE} style={{ flexShrink: 0 }} />
    </button>
  );
}

/* ---------------- Statement ---------------- */

function Statement() {
  return (
    <section style={sectionOuter({ background: 'transparent', position: 'relative' })}>
      <DesignFrameOverlay>
        <div
          style={{
            position: 'absolute',
            left: -300,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 900,
            height: 900,
            backgroundImage: 'url(/images/icompetence_visual_blau_01.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
          }}
        />
      </DesignFrameOverlay>
      <div style={sectionInner({ position: 'relative', zIndex: 2 })}>
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
          href="/contact/" target="_blank" rel="noopener noreferrer"
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
              textTransform: 'uppercase',
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
            flex: 1,
            height: 640,
            borderRadius: 24,
            backgroundImage: 'url(/images/iC_Stern_Blau.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
            textTransform: 'uppercase',
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
    <section style={sectionOuter({ background: NAVY, position: 'relative', overflow: 'hidden' })}>
    <DesignFrameOverlay>
      <div
        style={{
          position: 'absolute',
          right: -300,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 900,
          height: 900,
          backgroundImage: 'url(/images/icompetence_visual_rot_01.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      />
    </DesignFrameOverlay>
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        position: 'relative',
        zIndex: 2,
      })}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: 36,
          fontWeight: 500,
          lineHeight: 1.1,
          color: WHITE,
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
              background: WHITE_10,
              border: 0,
              color: WHITE,
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
              background: WHITE,
              border: 0,
              color: NAVY,
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
              color: WHITE,
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
                background: WHITE_20,
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
                  color: WHITE,
                }}
              >
                {t.name}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  fontWeight: 400,
                  color: WHITE_70,
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
        background: 'transparent',
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
          borderRadius: 24,
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
          target="_blank"
          rel="noopener noreferrer"
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
    <section style={sectionOuter({ background: '#bde3f4', overflow: 'hidden' })}>
    <div
      style={sectionInner({
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
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
        href="/contact/" target="_blank" rel="noopener noreferrer"
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
        Let&apos;s talk
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
        position: 'relative',
        zIndex: 2,
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
          <a
            href="https://www.linkedin.com/company/icompetence/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="iCompetence on LinkedIn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 100,
              background: WHITE_10,
              color: WHITE,
              textDecoration: 'none',
            }}
          >
            <LinkedInGlyph size={18} />
          </a>

          <FooterContactBlock label="Inquiries" value="info@icompetence.de" href="mailto:info@icompetence.de" />
          <FooterContactBlock label="Phone" value="+49 40 22636380" />
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
            ['Privacy', '/imprint/'],
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

function FooterContactBlock({ label, value, href }: { label: string; value: string; href?: string }) {
  const valueStyle: React.CSSProperties = {
    fontFamily: FONT,
    fontSize: 16,
    fontWeight: 500,
    color: WHITE,
    textDecoration: 'none',
  };
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
      {href ? (
        <a href={href} style={valueStyle}>
          {value}
        </a>
      ) : (
        <span style={valueStyle}>{value}</span>
      )}
    </div>
  );
}
