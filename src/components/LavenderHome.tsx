'use client';

import { trackCtaClick } from '@/lib/tracking';
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
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

/* ---------------- Language (EN / DE) ---------------- */

type Lang = 'en' | 'de';
type Bilingual = { en: string; de: string };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: 'en',
  setLang: () => {},
});
const useLang = () => useContext(LangContext).lang;

/** Inline copy helper: pick the string for the active language. */
const t = (lang: Lang, en: string, de: string) => (lang === 'de' ? de : en);
/** Resolve a { en, de } field from a data structure. */
const tr = (lang: Lang, v: Bilingual) => (lang === 'de' ? v.de : v.en);

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

/* ---------------- Responsive breakpoints ---------------- */

type Bp = 'mobile' | 'tablet' | 'desktop';

const BreakpointContext = createContext<Bp>('desktop');
const useBp = () => useContext(BreakpointContext);

/** Mobile < 768 ≤ Tablet (portrait) < 1024 ≤ Desktop. Matches the Pencil artboards (390 / 768 / 1440). */
function useBreakpoint(): Bp {
  const [bp, setBp] = useState<Bp>('desktop');
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setBp(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  return bp;
}

const isCompact = (bp: Bp) => bp !== 'desktop';

const SECTION_PAD: Record<Bp, { v: number; h: number }> = {
  desktop: { v: 64, h: 96 },
  tablet: { v: 56, h: 48 },
  mobile: { v: 48, h: 24 },
};

const sectionOuter = (bp: Bp, extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%',
  paddingTop: SECTION_PAD[bp].v,
  paddingBottom: SECTION_PAD[bp].v,
  boxSizing: 'border-box',
  ...extra,
});

const sectionInner = (bp: Bp, extra: React.CSSProperties = {}): React.CSSProperties => ({
  width: '100%',
  maxWidth: FRAME_MAX_WIDTH,
  margin: '0 auto',
  paddingLeft: SECTION_PAD[bp].h,
  paddingRight: SECTION_PAD[bp].h,
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

export default function LavenderHome({ initialLang = 'en' }: { initialLang?: Lang }) {
  const bp = useBreakpoint();
  const [lang, setLang] = useState<Lang>(initialLang);

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
    <LangContext.Provider value={{ lang, setLang }}>
    <BreakpointContext.Provider value={bp}>
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
      {/* Soft-launch demo marker — remove before the real public launch. */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          bottom: 12,
          left: 12,
          zIndex: 1000,
          padding: '6px 12px',
          borderRadius: 100,
          background: 'rgba(11,34,49,0.85)',
          color: WHITE,
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: 0.3,
          pointerEvents: 'none',
          boxShadow: '0 4px 14px rgba(11,34,49,0.25)',
        }}
      >
        Demo · placeholder content
      </div>
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
              left: bp === 'mobile' ? -120 : bp === 'tablet' ? -140 : -120,
              top: '50%',
              transform: 'translateY(-50%)',
              width: bp === 'mobile' ? 420 : bp === 'tablet' ? 560 : 820,
              height: bp === 'mobile' ? 420 : bp === 'tablet' ? 560 : 820,
              backgroundImage: 'url(/images/icompetence_visual_01.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
          />
        </div>
      </div>
    </div>
    </BreakpointContext.Provider>
    </LangContext.Provider>
  );
}

/* ---------------- Burger Menu ---------------- */

const BURGER_LINKS: ReadonlyArray<{ label: Bilingual; href: string }> = [
  { label: { en: 'EmpCo Audit', de: 'EmpCo Audit' }, href: '/empco-audit/' },
  { label: { en: 'Analytics Agent', de: 'Analytics Agent' }, href: '/analytics-agent/' },
  { label: { en: 'iKnow', de: 'iKnow' }, href: '/iknow/' },
  { label: { en: 'Intelligentic Search', de: 'Intelligentic Search' }, href: '/intelligentic-search/' },
  { label: { en: 'Privacy-Led AI', de: 'Privacy-Led AI' }, href: '/privacy-led-ai/' },
  { label: { en: 'AI Workshop', de: 'KI-Workshop' }, href: '/ai-workshop/' },
  { label: { en: 'Campaign Tool', de: 'Kampagnen-Tool' }, href: '/campaign-parameter-tool/' },
  { label: { en: 'User Journey Explorer', de: 'User Journey Explorer' }, href: '/icu-user-journey-explorer/' },
  { label: { en: "What's New", de: 'Neuigkeiten' }, href: '/whats-new/' },
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
  trigger = 'hover',
  columns = 1,
}: {
  iconSize: number;
  wide?: boolean;
  pillWidth?: number;
  pillPaddingX?: number;
  pillPaddingY?: number;
  /** 'hover' = desktop mega-menu; 'tap' = touch sheet that toggles on click. */
  trigger?: 'hover' | 'tap';
  /** Columns for the product-link grid in the non-wide (tap) panel. */
  columns?: number;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lang = useLang();
  // Alphabetical by the label in the active language (DE vs EN order differ).
  const sortedLinks = [...BURGER_LINKS].sort((a, b) =>
    tr(lang, a.label).localeCompare(tr(lang, b.label), lang),
  );
  const tap = trigger === 'tap';
  const dropdownTopOffset = pillPaddingY + 24;
  const panelWidth = pillWidth || (wide ? 1100 : 264);
  const closeOnNav = tap ? () => setOpen(false) : undefined;

  // Tap mode: close on outside click or Escape (hover mode closes on mouse-leave).
  useEffect(() => {
    if (!tap || !open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [tap, open]);

  return (
    <div
      ref={rootRef}
      onMouseEnter={tap ? undefined : () => setOpen(true)}
      onMouseLeave={tap ? undefined : () => setOpen(false)}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
    >
      <button
        type="button"
        aria-label="Menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={tap ? () => setOpen((p) => !p) : undefined}
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
      {!tap && open && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '100%',
            right: -pillPaddingX,
            width: panelWidth,
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
              width: panelWidth,
              maxWidth: tap ? '100vw' : undefined,
              maxHeight: tap ? 'calc(100vh - 140px)' : undefined,
              overflowY: tap ? 'auto' : undefined,
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
                  href={`/${lang}/`}
                  style={{
                    fontFamily: FONT,
                    fontSize: 16,
                    fontWeight: 500,
                    color: WHITE,
                    textDecoration: 'none',
                  }}
                >
                  {t(lang, 'Home', 'Start')}
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
                  {t(lang, 'Products & Tools', 'Produkte & Tools')}
                </span>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap: 32,
                    rowGap: 16,
                  }}
                >
                  {sortedLinks.map(({ label, href }) => (
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
                      {tr(lang, label)}
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
                  href={`/${lang}/`}
                  onClick={closeOnNav}
                  style={{
                    fontFamily: FONT,
                    fontSize: 15,
                    fontWeight: 500,
                    color: WHITE,
                    textDecoration: 'none',
                    padding: '4px 0',
                  }}
                >
                  {t(lang, 'Home', 'Start')}
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
                  {t(lang, 'Products & Tools', 'Produkte & Tools')}
                </span>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    columnGap: 24,
                    rowGap: columns > 1 ? 14 : 10,
                  }}
                >
                  {sortedLinks.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={closeOnNav}
                      style={{
                        fontFamily: FONT,
                        fontSize: 15,
                        fontWeight: 500,
                        color: WHITE,
                        textDecoration: 'none',
                      }}
                    >
                      {tr(lang, label)}
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

const NAV_SECTIONS: ReadonlyArray<{ id: string; label: Bilingual }> = [
  { id: 'services', label: { en: 'Services', de: 'Leistungen' } },
  { id: 'products', label: { en: 'Products', de: 'Produkte' } },
  { id: 'process', label: { en: 'Process', de: 'Vorgehen' } },
  { id: 'privacy-led', label: { en: 'Privacy-led AI', de: 'Privacy-led AI' } },
];

function TopNav() {
  const bp = useBp();
  return isCompact(bp) ? <CompactNav bp={bp} /> : <DesktopNav />;
}

function CompactNav({ bp }: { bp: Bp }) {
  const isMobile = bp === 'mobile';
  const lang = useLang();
  const navRef = useRef<HTMLElement | null>(null);
  const [pillWidth, setPillWidth] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const el = navRef.current;
      if (el) setPillWidth(el.getBoundingClientRect().width);
    };
    measure();
    let ro: ResizeObserver | null = null;
    if (navRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(navRef.current);
    }
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: FRAME_MAX_WIDTH,
          margin: '0 auto',
          padding: isMobile ? '12px 16px 0 16px' : '14px 24px 0 24px',
          boxSizing: 'border-box',
        }}
      >
        <nav
          ref={navRef}
          style={{
            width: '100%',
            background: NAVY,
            borderRadius: 100,
            padding: isMobile ? '10px 16px' : '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: isMobile ? 12 : 20,
            boxSizing: 'border-box',
            color: WHITE,
            pointerEvents: 'auto',
          }}
        >
          <a href="#top" onClick={smoothAnchor} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <img
              src="/iCompetence_white.svg"
              alt="iCompetence"
              style={{ height: isMobile ? 32 : 40, width: 'auto', display: 'block' }}
            />
          </a>

          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {NAV_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={smoothAnchor}
                  style={{ fontSize: 14, fontWeight: 500, color: WHITE, textDecoration: 'none' }}
                >
                  {tr(lang, label)}
                </a>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 14 : 18 }}>
            <a
              href={`/${lang}/contact/`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: BLUE,
                color: WHITE,
                borderRadius: 100,
                padding: isMobile ? '8px 14px' : '8px 16px',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {t(lang, "Let's talk", 'Kontakt aufnehmen')}
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
            <BurgerMenu
              trigger="tap"
              columns={isMobile ? 1 : 2}
              iconSize={isMobile ? 22 : 24}
              pillWidth={pillWidth}
              pillPaddingX={isMobile ? 16 : 24}
              pillPaddingY={isMobile ? 10 : 12}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}

function DesktopNav() {
  const lang = useLang();
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
                    {tr(lang, label)}
                  </a>
                ))}
              </motion.div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <motion.a
                  href={`/${lang}/contact/`} target="_blank" rel="noopener noreferrer"
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
                  {t(lang, "Let's talk", 'Kontakt aufnehmen')}
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
                        {tr(lang, label)}
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
                        {t(lang, 'Home', 'Start')}
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
                          {tr(lang, label)}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.a
                href={`/${lang}/contact/`} target="_blank" rel="noopener noreferrer"
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
                {t(lang, "Let's talk", 'Kontakt aufnehmen')}
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
  const bp = useBp();
  const lang = useLang();
  const compact = isCompact(bp);
  const headingSize = bp === 'mobile' ? 40 : bp === 'tablet' ? 56 : 80;
  const headingLs = bp === 'mobile' ? -1 : bp === 'tablet' ? -1.5 : -2;
  const subSize = bp === 'mobile' ? 16 : bp === 'tablet' ? 20 : 24;
  const subWidth = bp === 'mobile' ? '100%' : bp === 'tablet' ? 600 : 820;
  const blockGap = bp === 'mobile' ? 24 : bp === 'tablet' ? 32 : 40;
  const stackButtons = bp === 'mobile';

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: stackButtons ? 'center' : undefined,
    gap: 8,
    borderRadius: 100,
    padding: stackButtons ? '14px 24px' : '12px 24px',
    fontSize: 16,
    fontWeight: 500,
    textDecoration: 'none',
  };

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        width: '100%',
        background: 'rgba(245,225,255,0.10)',
      }}
    >
      {/* Yellow star — overflow stays visible so it bleeds across sections (behind the sticky nav via z-index) */}
      {compact ? (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: bp === 'mobile' ? -40 : -120,
            right: bp === 'mobile' ? -110 : -100,
            width: bp === 'mobile' ? 380 : 720,
            height: bp === 'mobile' ? 380 : 720,
            backgroundImage: 'url(/images/icompetence_visual_gelb.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            pointerEvents: 'none',
          }}
        />
      ) : (
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
      )}

      {/* Hero content */}
      <div
        style={sectionInner(bp, {
          position: 'relative',
          zIndex: 2,
          paddingTop: SECTION_PAD[bp].v,
          paddingBottom: SECTION_PAD[bp].v,
          display: 'flex',
          flexDirection: 'column',
          gap: blockGap,
        })}
      >
        <div
          role="heading"
          aria-level={1}
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: headingSize,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: headingLs,
            color: NAVY,
            whiteSpace: compact ? 'normal' : 'pre-line',
          }}
        >
          {/* Brand headline — intentionally kept in English in both languages. */}
          {compact ? 'Separate the signal from the noise.' : 'Separate the signal\nfrom the noise.'}
        </div>

        <p
          style={{
            margin: 0,
            width: subWidth,
            maxWidth: '100%',
            fontFamily: FONT,
            fontSize: subSize,
            fontWeight: 400,
            lineHeight: 1.5,
            color: NAVY_80,
          }}
        >
          {t(
            lang,
            'We help ambitious teams cut through complexity by turning scattered data into clear decisions and AI into the products & automated processes that deliver lasting results.',
            'Wir helfen ambitionierten Teams, Komplexität zu durchdringen – indem wir verstreute Daten in klare Entscheidungen verwandeln und KI in Produkte & automatisierte Prozesse, die dauerhaft Ergebnisse liefern.',
          )}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: stackButtons ? 'column' : 'row',
            alignItems: stackButtons ? 'stretch' : 'center',
            gap: stackButtons ? 12 : 16,
          }}
        >
          <a
            href={`/${lang}/contact/`} target="_blank" rel="noopener noreferrer"
            style={{ ...btnBase, background: BLUE, color: WHITE }}
          >
            {t(lang, "Let's talk", 'Kontakt aufnehmen')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
          <a
            href="#services"
            onClick={smoothAnchor}
            style={{ ...btnBase, border: `1px solid ${NAVY}`, color: NAVY, background: 'transparent' }}
          >
            {t(lang, 'See our services', 'Unsere Leistungen ansehen')}
            <ArrowDown size={20} strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Logo Carousel ---------------- */

/**
 * Client logos. `slug` maps to /logos/<slug>.svg (official brand asset, shown
 * nominatively as a client reference). When no SVG is available yet, set
 * `wordmark: true` and the brand name renders as a styled text mark instead —
 * drop an SVG into /public/logos/<slug>.svg and remove the flag to upgrade it.
 */
type LogoEntry = { name: string; slug: string; ext?: 'svg' | 'png'; wordmark?: boolean };
const LOGO_POOL: LogoEntry[] = [
  { name: 'DHL', slug: 'dhl' },
  { name: 'pepXpress', slug: 'pepxpress', ext: 'png' },
  { name: 'Freudenberg', slug: 'freudenberg' },
  { name: 'Küche&Co', slug: 'kueche-co', ext: 'png' },
  { name: 'Lucky Bike', slug: 'luckybike' },
  { name: 'Pixum', slug: 'pixum' },
  { name: 'NORD', slug: 'nord' },
  { name: 'Eventim', slug: 'eventim' },
  { name: 'Robinson', slug: 'robinson' },
  { name: 'GC Gruppe', slug: 'gc-gruppe' },
  { name: 'VitalAire', slug: 'vitalaire' },
  { name: 'Bürkert', slug: 'buerkert' },
  { name: 'WCG', slug: 'wcg' },
  { name: 'headacy', slug: 'headacy' },
  { name: 'Klett', slug: 'klett' },
  { name: 'Pentax', slug: 'pentax' },
  { name: 'Rameder', slug: 'rameder' },
  { name: 'REWE', slug: 'rewe' },
  { name: 'TeamViewer', slug: 'teamviewer' },
  { name: 'DER Touristik', slug: 'dertouristik' },
  { name: 'CEWE', slug: 'cewe' },
  { name: 'Miele', slug: 'miele' },
  { name: 'Tagesspiegel', slug: 'tagesspiegel' },
  { name: 'TUI Cruises', slug: 'tui-cruises' },
];
/** Renders a client's SVG logo, falling back to a styled text wordmark when the
 *  asset is flagged `wordmark` or fails to load (missing/broken /logos file). */
function LogoMark({
  logo,
  logoW,
  logoMaxH,
  nameSize,
}: {
  logo: LogoEntry;
  logoW: number;
  logoMaxH: number;
  nameSize: number;
}) {
  const [failed, setFailed] = useState(false);

  if (logo.wordmark || failed) {
    return (
      <span
        style={{
          fontFamily: FONT,
          fontSize: nameSize,
          fontWeight: 600,
          letterSpacing: 0.4,
          whiteSpace: 'nowrap',
        }}
      >
        {logo.name}
      </span>
    );
  }

  return (
    <img
      src={`/logos/${logo.slug}.${logo.ext ?? 'svg'}`}
      alt={logo.name}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{
        maxWidth: logoW,
        maxHeight: logoMaxH,
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
      }}
    />
  );
}

function LogoCarousel() {
  const bp = useBp();
  const slots = bp === 'mobile' ? 3 : bp === 'tablet' ? 4 : 5;
  const [visible, setVisible] = useState<LogoEntry[]>(() => LOGO_POOL.slice(0, slots));

  useEffect(() => {
    setVisible(LOGO_POOL.slice(0, slots));
  }, [slots]);

  useEffect(() => {
    let lastSlot = -1;
    const swapRandomSlot = () => {
      setVisible((current) => {
        const count = current.length;
        let slot = Math.floor(Math.random() * count);
        if (slot === lastSlot) slot = (slot + 1) % count;
        lastSlot = slot;
        const visibleSlugs = new Set(current.map((l) => l.slug));
        const pool = LOGO_POOL.filter((l) => !visibleSlugs.has(l.slug));
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

  const hpad = bp === 'desktop' ? 40 : SECTION_PAD[bp].h;
  const gap = bp === 'mobile' ? 16 : bp === 'tablet' ? 24 : 96;
  const logoW = bp === 'mobile' ? 100 : bp === 'tablet' ? 140 : 180;
  const logoH = bp === 'mobile' ? 56 : bp === 'tablet' ? 72 : 80;
  const logoMaxH = bp === 'mobile' ? 28 : bp === 'tablet' ? 36 : 44;
  const nameSize = bp === 'mobile' ? 16 : bp === 'tablet' ? 18 : 22;

  return (
    <section
      style={sectionOuter(bp, {
        background: 'transparent',
        overflow: 'hidden',
        borderTop: `1px solid ${NAVY_20}`,
        borderBottom: `1px solid ${NAVY_20}`,
      })}
    >
      <div
        style={sectionInner(bp, {
          paddingLeft: hpad,
          paddingRight: hpad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap,
        })}
      >
        {visible.map((logo, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              width: logoW,
              height: logoH,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* mode="sync": entering + exiting logos overlap (crossfade) so the slot
                is never empty during a swap; absolute positioning keeps them stacked. */}
            <AnimatePresence mode="sync">
              <motion.div
                key={logo.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: NAVY,
                }}
              >
                <LogoMark
                  logo={logo}
                  logoW={logoW}
                  logoMaxH={logoMaxH}
                  nameSize={nameSize}
                />
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
type ServiceCardData = {
  title: Bilingual;
  image: string;
  pills: { label: Bilingual; description: Bilingual }[];
};

const SERVICE_CARDS: ServiceCardData[] = [
  {
    title: { en: 'Data', de: 'Daten' },
    image: '/images/iC_Stern_Blau.png',
    pills: [
      {
        label: { en: 'Data Strategy', de: 'Datenstrategie' },
        description: {
          en: 'Build a clear data foundation: assess sources, prioritize use cases, and align teams on outcomes.',
          de: 'Ein klares Datenfundament schaffen: Quellen bewerten, Use Cases priorisieren und Teams auf gemeinsame Ziele ausrichten.',
        },
      },
      {
        label: { en: 'Data Engineering', de: 'Data Engineering' },
        description: {
          en: 'Reliable pipelines, governed warehouses, and the plumbing that makes analytics and AI dependable.',
          de: 'Zuverlässige Pipelines, governte Data Warehouses und die Infrastruktur, die Analytics und KI verlässlich macht.',
        },
      },
      {
        label: { en: 'Analytics', de: 'Analytics' },
        description: {
          en: 'Turn raw events into decision-grade metrics: instrumentation, modelling, and trustworthy reporting.',
          de: 'Aus Rohdaten entscheidungsreife Kennzahlen machen: Tracking, Modellierung und belastbares Reporting.',
        },
      },
      {
        label: { en: 'Visualization', de: 'Visualisierung' },
        description: {
          en: 'Self-explanatory dashboards for executives, operators, and analysts alike.',
          de: 'Selbsterklärende Dashboards – für Führungskräfte, Fachbereiche und Analysten gleichermaßen.',
        },
      },
    ],
  },
  {
    title: { en: 'AI', de: 'KI' },
    image: '/images/iC_Stern_Gelb.png',
    pills: [
      {
        label: { en: 'AI Strategy', de: 'KI-Strategie' },
        description: {
          en: 'Identify where AI makes the difference and design the path from quick wins to durable capability.',
          de: 'Erkennen, wo KI den Unterschied macht – und den Weg von schnellen Erfolgen zu dauerhafter Leistungsfähigkeit gestalten.',
        },
      },
      {
        label: { en: 'Generative AI', de: 'Generative KI' },
        description: {
          en: 'Ship production-grade GenAI features with the safety, evaluation, and ops to back them.',
          de: 'Produktionsreife GenAI-Funktionen ausliefern – mit der nötigen Sicherheit, Evaluierung und dem Betrieb dahinter.',
        },
      },
      {
        label: { en: 'Agentic Systems', de: 'Agentische Systeme' },
        description: {
          en: 'Multi-step agents that take action with your tools, data, and workflows. Always by keeping humans in the lead.',
          de: 'Mehrstufige Agenten, die mit deinen Tools, Daten und Workflows handeln – stets unter menschlicher Führung.',
        },
      },
      {
        label: { en: 'LLM Integration', de: 'LLM-Integration' },
        description: {
          en: 'Integrate the right model into the right surface: assistants, copilots, and end-to-end automations, tailored to your needs.',
          de: 'Das richtige Modell an der richtigen Stelle integrieren: Assistenten, Copilots und End-to-End-Automatisierungen, zugeschnitten auf deinen Bedarf.',
        },
      },
    ],
  },
  {
    title: { en: 'Workshops', de: 'Workshops' },
    image: '/images/iC_Stern_Gruen.png',
    pills: [
      {
        label: { en: 'AI Workshops', de: 'KI-Workshops' },
        description: {
          en: 'A focused day of hands-on prototyping. Your team leaves with a working AI use case, not slides.',
          de: 'Ein fokussierter Tag praktisches Prototyping. Dein Team geht mit einem funktionierenden KI-Use-Case nach Hause – nicht mit Folien.',
        },
      },
      {
        label: { en: 'Team Enablement', de: 'Team-Enablement' },
        description: {
          en: 'Practical skill-building so your team can build, evaluate, and operate AI products themselves.',
          de: 'Praxisnaher Kompetenzaufbau, damit dein Team KI-Produkte selbst entwickeln, bewerten und betreiben kann.',
        },
      },
      {
        label: { en: 'Executive Briefings', de: 'Executive Briefings' },
        description: {
          en: 'A clear-eyed look at where AI changes your business for the better and where it won\'t.',
          de: 'Ein nüchterner Blick darauf, wo KI dein Geschäft wirklich voranbringt – und wo nicht.',
        },
      },
      {
        label: { en: 'Hands-on Trainings', de: 'Hands-on-Trainings' },
        description: {
          en: 'Practice over theory: modular training on data, GenAI, and agentic systems.',
          de: 'Praxis vor Theorie: modulare Trainings zu Daten, GenAI und agentischen Systemen.',
        },
      },
    ],
  },
];

function ServicesGrid() {
  const bp = useBp();
  const lang = useLang();
  const compact = isCompact(bp);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedPillIdx, setExpandedPillIdx] = useState(0);

  const total = SERVICE_CARDS.length;
  // Finite carousel: starts on the first card (Data) and clamps at both ends.
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

  const CARD_GAP = 40;
  const COLLAPSED_W = 640;
  // Neighbours only exist within bounds; a null slot renders as a spacer so the
  // active card stays centred even when one side has no card to peek.
  const slots = [
    { card: atStart ? null : SERVICE_CARDS[activeIdx - 1], role: 'prev' as const },
    { card: SERVICE_CARDS[activeIdx], role: 'active' as const },
    { card: atEnd ? null : SERVICE_CARDS[activeIdx + 1], role: 'next' as const },
  ];

  const titleSize = bp === 'mobile' ? 28 : bp === 'tablet' ? 32 : 36;
  const arrowBtn = bp === 'desktop' ? 48 : 44;
  const arrowIcon = bp === 'desktop' ? 20 : 18;

  const onPillClick = (pillIdx: number) =>
    setExpandedPillIdx((p) => (p === pillIdx ? -1 : pillIdx));

  return (
    <section
      id="services"
      style={sectionOuter(bp, { background: 'transparent', position: 'relative', zIndex: 1 })}
    >
    <div
      style={sectionInner(bp, {
        display: 'flex',
        flexDirection: 'column',
        gap: compact ? 24 : 40,
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
            fontSize: titleSize,
            fontWeight: 500,
            lineHeight: 1.1,
            color: NAVY,
          }}
        >
          {t(lang, 'Our Services', 'Unsere Leistungen')}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 12 }}>
          <button
            type="button"
            aria-label="Previous service"
            onClick={goPrev}
            disabled={atStart}
            style={{
              width: arrowBtn,
              height: arrowBtn,
              borderRadius: 100,
              background: NAVY,
              border: 0,
              color: WHITE,
              cursor: atStart ? 'not-allowed' : 'pointer',
              opacity: atStart ? 0.35 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={arrowIcon} strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next service"
            onClick={goNext}
            disabled={atEnd}
            style={{
              width: arrowBtn,
              height: arrowBtn,
              borderRadius: 100,
              background: NAVY,
              border: 0,
              color: WHITE,
              cursor: atEnd ? 'not-allowed' : 'pointer',
              opacity: atEnd ? 0.35 : 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowRight size={arrowIcon} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Cards: desktop = peeking carousel, compact = single active card */}
      {compact ? (
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          style={{ width: '100%' }}
        >
          <ServiceCardView
            card={SERVICE_CARDS[activeIdx]}
            isActive
            bp={bp}
            expandedPillIdx={expandedPillIdx}
            onPillClick={onPillClick}
            onCardClick={() => {}}
          />
        </motion.div>
      ) : (
        <div style={{ width: '100%', overflow: 'visible' }}>
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
            {slots.map(({ card, role }) =>
              card === null ? (
                // Empty side (start/end): reserve a collapsed-card slot so the
                // active card stays centred.
                <div key={role} aria-hidden style={{ flex: `0 0 ${COLLAPSED_W}px`, height: 640 }} />
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
  bp,
}: {
  card: ServiceCardData;
  isActive: boolean;
  expandedPillIdx: number;
  onPillClick: (idx: number) => void;
  onCardClick: () => void;
  bp: Bp;
}) {
  const lang = useLang();
  // Compact (tablet/mobile): a single full-width card that always shows its pills.
  if (isCompact(bp)) {
    const stack = bp === 'mobile';
    const titleSize = stack ? 40 : 48;
    const visualH = stack ? 320 : 460;
    const pills = card.pills.map((pill, idx) => {
      const resolved = { label: tr(lang, pill.label), description: tr(lang, pill.description) };
      return idx === expandedPillIdx ? (
        <ExpandedServicePill key={idx} pill={resolved} onClick={() => onPillClick(idx)} />
      ) : (
        <CollapsedServicePill key={idx} pill={resolved} onClick={() => onPillClick(idx)} />
      );
    });
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: stack ? 'column' : 'row',
          width: '100%',
          height: stack ? 'auto' : 460,
        }}
      >
        <div
          style={{
            flex: stack ? undefined : 1,
            width: stack ? '100%' : undefined,
            height: visualH,
            borderRadius: stack ? '24px 24px 0 0' : '24px 0 0 24px',
            backgroundImage: `url(${card.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            padding: stack ? 24 : 28,
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: titleSize,
              fontWeight: 500,
              lineHeight: 1.1,
              color: WHITE,
            }}
          >
            {tr(lang, card.title)}
          </h3>
        </div>
        <div
          style={{
            width: stack ? '100%' : 300,
            flexShrink: 0,
            borderRadius: stack ? '0 0 24px 24px' : '0 24px 24px 0',
            background: NAVY,
            padding: stack ? '24px 16px' : '28px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            boxSizing: 'border-box',
          }}
        >
          {pills}
        </div>
      </div>
    );
  }

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
          {tr(lang, card.title)}
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
          {card.pills.map((pill, idx) => {
            const resolved = { label: tr(lang, pill.label), description: tr(lang, pill.description) };
            return idx === expandedPillIdx ? (
              <ExpandedServicePill
                key={idx}
                pill={resolved}
                onClick={() => onPillClick(idx)}
              />
            ) : (
              <CollapsedServicePill
                key={idx}
                pill={resolved}
                onClick={() => onPillClick(idx)}
              />
            );
          })}
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
  const bp = useBp();
  const lang = useLang();
  const compact = isCompact(bp);
  const size = bp === 'mobile' ? 28 : bp === 'tablet' ? 40 : 54;
  const starSize = bp === 'mobile' ? 340 : bp === 'tablet' ? 600 : 900;
  const starLeft = bp === 'mobile' ? -130 : bp === 'tablet' ? -220 : -300;

  const star = (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: starLeft,
        top: '50%',
        transform: 'translateY(-50%)',
        width: starSize,
        height: starSize,
        backgroundImage: 'url(/images/icompetence_visual_blau_01.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        pointerEvents: 'none',
      }}
    />
  );

  return (
    <section style={sectionOuter(bp, { background: 'transparent', position: 'relative' })}>
      {compact ? star : <DesignFrameOverlay>{star}</DesignFrameOverlay>}
      <div style={sectionInner(bp, { position: 'relative', zIndex: 2 })}>
        <p
          style={{
            margin: 0,
            width: '100%',
            fontFamily: FONT,
            fontSize: size,
            fontWeight: 500,
            lineHeight: compact ? 1.15 : 1.1,
            color: NAVY,
            textAlign: 'center',
          }}
        >
          {t(
            lang,
            'We help ambitious teams turn data and AI into real business outcomes.',
            'Wir verwandeln Daten und KI in echte Geschäftsergebnisse – für ambitionierte Teams.',
          )}
        </p>
      </div>
    </section>
  );
}

function StatementCTA() {
  const bp = useBp();
  const lang = useLang();
  return (
    <section
      id="cta"
      style={{
        width: '100%',
        paddingBottom: SECTION_PAD[bp].v,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={sectionInner(bp, {
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <a
          href={`/${lang}/contact/`} target="_blank" rel="noopener noreferrer"
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
          {t(lang, "Let's talk", 'Kontakt aufnehmen')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </div>
    </section>
  );
}

function LanguageToggle() {
  const { lang, setLang } = useContext(LangContext);
  const toggle = () => {
    const next = lang === 'en' ? 'de' : 'en';
    setLang(next);
    // Reflect the language in the URL (/de/… ↔ /en/…) without a full reload;
    // a refresh then re-renders in the matching language via initialLang.
    if (typeof window !== 'undefined') {
      const nextPath = window.location.pathname.replace(/^\/(de|en)(?=\/|$)/, `/${next}`);
      window.history.replaceState(null, '', nextPath + window.location.search + window.location.hash);
    }
  };
  return (
    <button
      type="button"
      aria-label={lang === 'en' ? 'Switch to German' : 'Auf Englisch umschalten'}
      onClick={toggle}
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
      {lang === 'en' ? (
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
  const bp = useBp();
  const lang = useLang();
  const stack = bp === 'mobile';
  const titleSize = bp === 'mobile' ? 40 : bp === 'tablet' ? 44 : 54;
  const bodySize = bp === 'mobile' ? 16 : bp === 'tablet' ? 20 : 24;
  const imgH = bp === 'mobile' ? 280 : bp === 'tablet' ? 420 : 640;
  const mainGap = bp === 'mobile' ? 24 : bp === 'tablet' ? 32 : 40;
  const sectionGap = bp === 'mobile' ? 24 : 40;

  const textEl = (
    <div
      style={{
        flex: stack ? undefined : 1,
        width: stack ? '100%' : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: stack ? 16 : 24,
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontSize: stack ? 13 : 14,
          fontWeight: 500,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          color: NAVY_70,
        }}
      >
        {t(lang, 'Featured Product', 'Empfohlenes Produkt')}
      </span>
      <h2
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: titleSize,
          fontWeight: 500,
          lineHeight: 1.1,
          color: NAVY,
        }}
      >
        EmpCo Audit
      </h2>
      <p
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: bodySize,
          fontWeight: 400,
          lineHeight: 1.5,
          color: NAVY_80,
        }}
      >
        {t(
          lang,
          'The automated audit that protects you from EmpCo violations on your website. Within a few hours you know which sustainability claims are defensible — and which are becoming a risk.',
          'Der automatisierte Audit, der dich vor EmpCo-Verstößen auf deiner Website schützt. Innerhalb weniger Stunden weißt du, welche Nachhaltigkeitsaussagen belegbar sind und welche zum Risiko werden.',
        )}
      </p>
      <a
        href={`/${lang}/empco-audit/`}
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
        {t(lang, 'Explore EmpCo Audit', 'EmpCo Audit entdecken')}
        <ArrowUpRight size={20} strokeWidth={2} />
      </a>
    </div>
  );

  const imageEl = (
    <div
      style={{
        flex: stack ? undefined : 1,
        width: stack ? '100%' : undefined,
        height: imgH,
        borderRadius: 24,
        background: LAVENDER,
        backgroundImage: 'url(/images/lavender-empco.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );

  return (
    <section id="products" style={sectionOuter(bp, { background: 'transparent' })}>
    <div
      style={sectionInner(bp, {
        display: 'flex',
        flexDirection: 'column',
        gap: sectionGap,
      })}
    >
      {/* Main row — on mobile stacked with the image on top */}
      <div
        style={{
          display: 'flex',
          flexDirection: stack ? 'column' : 'row',
          alignItems: stack ? 'stretch' : 'center',
          gap: mainGap,
          width: '100%',
        }}
      >
        {stack ? (
          <>
            {imageEl}
            {textEl}
          </>
        ) : (
          <>
            {textEl}
            {imageEl}
          </>
        )}
      </div>

      {/* Teasers */}
      <div
        style={{
          display: 'flex',
          flexDirection: stack ? 'column' : 'row',
          gap: stack ? 24 : bp === 'tablet' ? 24 : 40,
          width: '100%',
        }}
      >
        <ProductTeaser
          bp={bp}
          eyebrow={t(lang, 'Product', 'Produkt')}
          title="iKnow"
          description={t(
            lang,
            'The central knowledge platform for enterprises. AI-based, secure, local – turn scattered information into a structured knowledge base.',
            'Die zentrale Wissensplattform für Unternehmen. KI-basiert, sicher, lokal – verwandle verteilte Informationen in eine strukturierte Wissensgrundlage.',
          )}
          image="/images/lavender-iknow.png"
          href={`/${lang}/iknow/`}
        />
        <ProductTeaser
          bp={bp}
          eyebrow={t(lang, 'Product', 'Produkt')}
          title="Analytics Agent"
          description={t(
            lang,
            'The AI agent for your data. Connect any data source and interact in natural language – analyses, visualisations and insights at the touch of a button.',
            'Der KI-Agent für deine Daten. Verbinde beliebige Datenquellen und interagiere in natürlicher Sprache – Analysen, Visualisierungen und Insights auf Knopfdruck.',
          )}
          image="/images/lavender-analytics-agent.png"
          href={`/${lang}/analytics-agent/`}
        />
      </div>
    </div>
    </section>
  );
}

function ProductTeaser({
  eyebrow,
  title,
  description,
  image,
  href,
  bp,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  href: string;
  bp: Bp;
}) {
  const lang = useLang();
  const imgH = bp === 'desktop' ? 280 : 200;
  const titleSize = bp === 'desktop' ? 24 : 22;
  const descSize = bp === 'desktop' ? 16 : 15;
  const eyebrowSize = bp === 'desktop' ? 14 : 13;
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
          height: imgH,
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
          gap: bp === 'desktop' ? 20 : 16,
        }}
      >
        <span
          style={{
            fontFamily: FONT,
            fontSize: eyebrowSize,
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
            fontSize: titleSize,
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
            fontSize: descSize,
            fontWeight: 400,
            lineHeight: 1.5,
            color: WHITE_70,
          }}
        >
          {description}
        </p>
        <a
          href={href}
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
          {t(lang, 'Learn more', 'Mehr erfahren')}
          <ArrowUpRight size={16} strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

/* ---------------- Testimonial ---------------- */

type TestimonialItem = {
  quote: Bilingual;
  name: string;
  role: Bilingual;
};

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote: {
      de: '“iCompetence hat uns professionell & effizient beim Setup unserer Analytics Infrastruktur unterstützt. Auf eine bedarfsgerechte & kompetente Beratung folgte eine schnelle & zuverlässige Umsetzung der Maßnahmen mit entsprechendem Reporting. Mit iCompetence haben wir einen Partner auf Augenhöhe, mit dem wir sowohl operativ als auch strategisch zusammenarbeiten dürfen.”',
      en: '“iCompetence supported us professionally & efficiently in setting up our analytics infrastructure. Needs-based, competent consulting was followed by a fast & reliable implementation, with the corresponding reporting. In iCompetence we have a partner at eye level, with whom we get to work both operationally and strategically.”',
    },
    name: 'Sergej Kosyrev',
    role: {
      de: 'Leitung E-Commerce & Online-Marketing, Lucky Bike.de GmbH',
      en: 'Head of E-Commerce & Online Marketing, Lucky Bike.de GmbH',
    },
  },
  {
    quote: {
      de: '“iCompetence hat uns bei der Migration zu Google Analytics 360 entscheidend unterstützt: von der Konzeption über die Implementierung bis hin zu Trainings. Für uns war es von großem Nutzen, dass sich das Team mit den unterschiedlichsten Webanalyse- und Tag Management-Toolanbietern auskannte. Wir haben iCompetence stets als unabhängigen Experten kennengelernt und können das Unternehmen als kompetenten Sparringpartner nur weiterempfehlen. Gleichzeitig freuen wir uns auf die weitere Zusammenarbeit!”',
      en: '“iCompetence played a decisive role in our migration to Google Analytics 360: from conception through implementation to training. It was of great value to us that the team was familiar with the widest range of web analytics and tag management tool providers. We have always known iCompetence as an independent expert and can only recommend the company as a competent sparring partner. At the same time, we look forward to continuing to work together!”',
    },
    name: 'Michael Schneider',
    role: {
      de: 'Head of Web Analytics, Tracking & Targeting, CTS EVENTIM AG & Co. KGaA',
      en: 'Head of Web Analytics, Tracking & Targeting, CTS EVENTIM AG & Co. KGaA',
    },
  },
  {
    quote: {
      de: '“iCompetence hat sich intensiv mit unseren Anforderungen als Finanzinstitut auseinandergesetzt und uns bei der Umsetzung einer individuellen Lösung als fachlicher und technischer Berater unterstützt. Dabei wurde die Basis für eine Nutzung unserer Analytics-Daten geschaffen, die auf vielen Ebenen des Unternehmens den Entscheidungsprozess unterstützt und effizienter macht. Vielen Dank für eine inzwischen langjährige Partnerschaft auf Augenhöhe.”',
      en: '“iCompetence engaged intensively with our requirements as a financial institution and supported us as a professional and technical advisor in implementing a tailored solution. This laid the foundation for using our analytics data in a way that supports and streamlines decision-making across many levels of the company. Thank you for what is by now a long-standing partnership at eye level.”',
    },
    name: 'Miriam Leparoux',
    role: {
      de: 'Head of User Experience Management, comdirect bank AG',
      en: 'Head of User Experience Management, comdirect bank AG',
    },
  },
  {
    quote: {
      de: '“Seit Jahren setze ich bei Fragen operativer und vor allem auch strategischer Analytics Projekte auf iCompetence. Die profunde Kompetenz und das sehr zielstrebige und professionelle Projektmanagement überzeugen mich immer wieder!”',
      en: '“For years, I have relied on iCompetence for operational and, above all, strategic analytics projects. Their profound expertise and highly focused, professional project management impress me time and again!”',
    },
    name: 'Jomique de Vries',
    role: {
      de: 'Managing Director & Partner, pepXpress Touristik & Marketing GmbH',
      en: 'Managing Director & Partner, pepXpress Touristik & Marketing GmbH',
    },
  },
  {
    quote: {
      de: '“Ich schätze das Team von iCompetence hinsichtlich Ihrer Expertise & Fachwissen, sowie strategischen Weitblicks sehr. iCompetence unterstützt uns nicht nur mit Ihrer kompetenten Beratung bei allen digitalen Fragestellungen, sondern begegnet uns auch als verlässlicher Partner in der Erreichung unserer strategischen Ziele.”',
      en: '“I greatly value the iCompetence team for their expertise & know-how as well as their strategic foresight. iCompetence not only supports us with competent advice on all digital questions, but is also a reliable partner in achieving our strategic goals.”',
    },
    name: 'Mario Löwe',
    role: {
      de: 'Teamleiter Online Marketing, Küche&Co GmbH – a member of the otto group',
      en: 'Team Lead Online Marketing, Küche&Co GmbH – a member of the otto group',
    },
  },
  {
    quote: {
      de: '“Vielen Dank für die sehr gute partnerschaftliche Zusammenarbeit, ihr habt uns in den letzten zwei Jahren definitiv geholfen, den jeweils nächsten Schritt zu machen und uns auch im operativen Geschäft von vielen „pain points“ befreit. Wir freuen uns auf weitere gemeinsame Projekte.”',
      en: '“Many thanks for the excellent, collaborative partnership. Over the past two years you have definitely helped us take the next step each time and freed us from many “pain points” in day-to-day operations as well. We look forward to more joint projects.”',
    },
    name: 'Alexander Krösser',
    role: {
      de: 'Director Media & Analytics, Career Partner GmbH',
      en: 'Director Media & Analytics, Career Partner GmbH',
    },
  },
  {
    quote: {
      de: '“iCompetence ist seit Jahren ein wichtiger Partner für uns, sowohl in strategischen Fragen als auch für die operative Umsetzung rund um Digital Intelligence – von der Erhebung über die Aufbereitung bis zur Interpretation und Visualisierung von Daten. Der familiäre Umgang und ein immer offenes Ohr bereichern die professionelle Zusammenarbeit sehr und machen Spaß.”',
      en: '“iCompetence has been an important partner for us for years, both on strategic questions and for the operational implementation around Digital Intelligence – from data collection and preparation to the interpretation and visualization of data. The personable relationship and an always open ear greatly enrich the professional collaboration and make it fun.”',
    },
    name: 'Till Büttner',
    role: {
      de: 'Senior Data Analyst Digital Customer Interaction, Deutsche Post DHL Group',
      en: 'Senior Data Analyst Digital Customer Interaction, Deutsche Post DHL Group',
    },
  },
];

function Testimonial() {
  const lang = useLang();
  const [idx, setIdx] = useState(0);
  const goPrev = () =>
    setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  const bp = useBp();
  const compact = isCompact(bp);
  const mobile = bp === 'mobile';
  const titleSize = mobile ? 28 : bp === 'tablet' ? 32 : 36;
  const quoteSize = mobile ? 26 : bp === 'tablet' ? 40 : 54;
  const quoteLh = compact ? 1.2 : 1.1;
  const btn = bp === 'desktop' ? 48 : 44;
  const btnIcon = bp === 'desktop' ? 20 : 18;
  const starSize = mobile ? 360 : bp === 'tablet' ? 700 : 900;

  const star = (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        right: mobile ? -120 : bp === 'tablet' ? -150 : -300,
        top: '50%',
        transform: 'translateY(-50%)',
        width: starSize,
        height: starSize,
        backgroundImage: 'url(/images/icompetence_visual_rot_01.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        pointerEvents: 'none',
      }}
    />
  );

  const arrowsEl = (
    <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={goPrev}
        style={{
          width: btn,
          height: btn,
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
        <ArrowLeft size={btnIcon} strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={goNext}
        style={{
          width: btn,
          height: btn,
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
        <ArrowRight size={btnIcon} strokeWidth={2} />
      </button>
    </div>
  );

  const contentGap = mobile ? 24 : bp === 'tablet' ? 32 : 40;
  // All quotes are stacked in the same grid cell so the container reserves the
  // height of the tallest one — only the active quote is visible, so switching
  // testimonials no longer changes the section height (no layout jump).
  const contentStack = (
    <div style={{ display: 'grid', width: '100%', ...(mobile ? {} : { flex: 1, minWidth: 0 }) }}>
      {TESTIMONIALS.map((item, i) => (
        <div
          key={i}
          aria-hidden={i !== idx}
          style={{
            gridArea: '1 / 1',
            visibility: i === idx ? 'visible' : 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: contentGap,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: quoteSize,
              fontWeight: 500,
              lineHeight: quoteLh,
              color: WHITE,
            }}
          >
            {tr(lang, item.quote)}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 500, color: WHITE }}>
                {item.name}
              </span>
              <span style={{ fontFamily: FONT, fontSize: mobile ? 14 : 16, fontWeight: 400, color: WHITE_70 }}>
                {tr(lang, item.role)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section style={sectionOuter(bp, { background: NAVY, position: 'relative', overflow: 'hidden' })}>
    {compact ? star : <DesignFrameOverlay>{star}</DesignFrameOverlay>}
    <div
      style={sectionInner(bp, {
        display: 'flex',
        flexDirection: 'column',
        gap: mobile ? 24 : 40,
        position: 'relative',
        zIndex: 2,
      })}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: titleSize,
          fontWeight: 500,
          lineHeight: 1.1,
          color: WHITE,
          width: '100%',
        }}
      >
        {t(lang, 'What our clients say', 'Was unsere Kunden sagen')}
      </h2>

      {mobile ? (
        <>
          {arrowsEl}
          {contentStack}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: bp === 'tablet' ? 32 : 40,
            width: '100%',
            alignItems: 'flex-start',
          }}
        >
          {arrowsEl}
          {contentStack}
        </div>
      )}
    </div>
    </section>
  );
}

/* ---------------- Process (3-step accordion) ---------------- */

type ProcessItem = {
  number: string;
  title: Bilingual;
  description: Bilingual;
  image: string;
};

const PROCESS_ITEMS: ProcessItem[] = [
  {
    number: '01',
    title: { en: 'Ideation Workshop', de: 'Ideation Workshop' },
    description: {
      en: 'With you, we identify the problem to be solved. In a focused workshop, we map your goals, constraints, and data. Then walk away with a sharp use case and a clear next step.',
      de: 'Gemeinsam mit dir identifizieren wir das zu lösende Problem. In einem fokussierten Workshop erfassen wir deine Ziele, Rahmenbedingungen und Daten – und gehen mit einem klaren Use Case und einem konkreten nächsten Schritt heraus.',
    },
    image: '/images/iC_Stern_Blau.png',
  },
  {
    number: '02',
    title: { en: 'Proof of Concept', de: 'Proof of Concept' },
    description: {
      en: 'We build a tangible prototype together – focused, fast, and grounded in your real data. Within weeks, you see whether the idea holds up in practice, what to refine, and what to scale.',
      de: 'Gemeinsam bauen wir einen greifbaren Prototyp – fokussiert, schnell und auf Basis deiner echten Daten. Innerhalb weniger Wochen siehst du, ob die Idee in der Praxis trägt, was zu verfeinern und was zu skalieren ist.',
    },
    image: '/images/icompetence_visual_mint.png',
  },
  {
    number: '03',
    title: { en: 'Rollout', de: 'Rollout' },
    description: {
      en: 'We harden the proof into a production-ready system, integrated, monitored, and owned by your team. Enablement, documentation, and handover are part of the package.',
      de: 'Wir überführen den Proof of Concept in ein produktionsreifes System – integriert, überwacht und in der Hand deines Teams. Enablement, Dokumentation und Übergabe gehören selbstverständlich dazu.',
    },
    image: '/images/iC_Stern_Gelb.png',
  },
];

function Process() {
  const bp = useBp();
  const lang = useLang();
  const [expanded, setExpanded] = useState<number | null>(1);
  const titleSize = bp === 'mobile' ? 32 : bp === 'tablet' ? 40 : 54;

  return (
    <section id="process" style={sectionOuter(bp, { background: 'transparent' })}>
    <div
      style={sectionInner(bp, {
        display: 'flex',
        flexDirection: 'column',
        gap: bp === 'mobile' ? 24 : bp === 'tablet' ? 32 : 40,
      })}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: FONT,
          fontSize: titleSize,
          fontWeight: 500,
          lineHeight: 1.1,
          color: NAVY,
          width: '100%',
        }}
      >
        {t(lang, 'This is how we work', 'So arbeiten wir')}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {PROCESS_ITEMS.map((item, idx) => (
          <ProcessRow
            key={item.number}
            item={item}
            bp={bp}
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
  bp,
}: {
  item: ProcessItem;
  isLast: boolean;
  expanded: boolean;
  onToggle: () => void;
  bp: Bp;
}) {
  const lang = useLang();
  const mobile = bp === 'mobile';
  const headPad = mobile ? '20px 0' : bp === 'tablet' ? '28px 0' : '32px 0';
  const labelSize = mobile ? 22 : bp === 'tablet' ? 30 : 36;
  const numMinW = mobile ? 32 : bp === 'tablet' ? 44 : 56;
  const leftGap = mobile ? 16 : bp === 'tablet' ? 24 : 32;
  const iconSize = mobile ? 24 : bp === 'tablet' ? 26 : 28;
  const descPadLeft = mobile ? 0 : bp === 'tablet' ? 48 : 64;
  const descPadV = mobile ? 0 : bp === 'tablet' ? 8 : 16;

  return (
    <div
      style={{
        background: 'transparent',
        borderTop: `1px solid ${NAVY_20}`,
        borderBottom: isLast ? `1px solid ${NAVY_20}` : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: expanded ? (mobile ? 16 : 32) : 0,
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
          padding: headPad,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          width: '100%',
          fontFamily: FONT,
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: leftGap }}>
          <span
            style={{
              fontFamily: FONT,
              fontSize: labelSize,
              fontWeight: 500,
              color: NAVY_80,
              minWidth: numMinW,
            }}
          >
            {item.number}
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontSize: labelSize,
              fontWeight: 500,
              color: NAVY,
            }}
          >
            {tr(lang, item.title)}
          </span>
        </div>
        {expanded ? (
          <Minus size={iconSize} color={NAVY} strokeWidth={2} />
        ) : (
          <Plus size={iconSize} color={NAVY} strokeWidth={2} />
        )}
      </button>

      {expanded && (
        <div
          style={{
            display: 'flex',
            flexDirection: mobile ? 'column' : 'row',
            gap: mobile ? 16 : bp === 'tablet' ? 32 : 40,
            width: '100%',
            alignItems: mobile ? 'stretch' : 'flex-start',
            paddingBottom: mobile ? 24 : 32,
          }}
        >
          <div
            style={{
              flex: mobile ? undefined : 1,
              padding: `${descPadV}px 0 ${descPadV}px ${descPadLeft}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: FONT,
                fontSize: mobile ? 15 : 16,
                fontWeight: 400,
                lineHeight: 1.5,
                color: NAVY_80,
              }}
            >
              {tr(lang, item.description)}
            </p>
          </div>
          {/* Process step image — hidden until suitable images are available.
              Re-enable by uncommenting; `item.image` is still defined per step. */}
          {/* <div
            style={{
              width: mobile ? '100%' : bp === 'tablet' ? 320 : 420,
              height: mobile ? 200 : bp === 'tablet' ? 220 : 280,
              borderRadius: 16,
              background: `${NAVY} url(${item.image}) center/contain no-repeat`,
              flexShrink: 0,
            }}
          /> */}
        </div>
      )}
    </div>
  );
}

/* ---------------- Privacy-Led ---------------- */

function PrivacyLed() {
  const bp = useBp();
  const lang = useLang();
  const imgH = bp === 'mobile' ? 240 : bp === 'tablet' ? 360 : 400;
  const titleSize = bp === 'mobile' ? 28 : bp === 'tablet' ? 32 : 36;
  const bodySize = bp === 'mobile' ? 16 : bp === 'tablet' ? 20 : 24;
  return (
    <section id="privacy-led" style={sectionOuter(bp, { background: 'transparent' })}>
    <div
      style={sectionInner(bp, {
        display: 'flex',
        flexDirection: 'column',
        gap: bp === 'mobile' ? 24 : bp === 'tablet' ? 32 : 40,
        alignItems: 'center',
      })}
    >
      <div
        style={{
          width: '100%',
          height: imgH,
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
          gap: bp === 'mobile' ? 16 : bp === 'tablet' ? 20 : 24,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: titleSize,
            fontWeight: 500,
            lineHeight: 1.1,
            color: NAVY,
          }}
        >
          {t(lang, 'Privacy-Led Setups', 'Privacy-Led-Setups')}
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: FONT,
            fontSize: bodySize,
            fontWeight: 400,
            lineHeight: 1.5,
            color: NAVY_80,
          }}
        >
          {t(
            lang,
            'Why share your customer data or strategies with foreign infrastructure? A privacy-led setup keeps your data — and your competitive edge — exactly where it belongs: with you.',
            'Warum solltest du deine Kundendaten oder Strategien fremder Infrastruktur anvertrauen? Ein Privacy-Led-Setup hält deine Daten – und deinen Wettbewerbsvorteil – genau dort, wo sie hingehören: bei dir.',
          )}
        </p>
        <a
          href={`/${lang}/privacy-led-ai/`}
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
          {t(lang, 'Explore privacy-led', 'Privacy-Led entdecken')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </div>
    </div>
    </section>
  );
}

/* ---------------- CTA Band ---------------- */

function CTABand() {
  const bp = useBp();
  const lang = useLang();
  const headingSize = bp === 'mobile' ? 40 : bp === 'tablet' ? 56 : 80;
  const headingLs = bp === 'mobile' ? -1 : bp === 'tablet' ? -1.5 : -2;
  return (
    <section style={sectionOuter(bp, { background: '#bde3f4', overflow: 'hidden' })}>
    <div
      style={sectionInner(bp, {
        display: 'flex',
        flexDirection: 'column',
        gap: bp === 'mobile' ? 24 : bp === 'tablet' ? 32 : 40,
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
            fontSize: headingSize,
            fontWeight: 500,
            letterSpacing: headingLs,
            lineHeight: 1.05,
            color: NAVY,
            textAlign: 'center',
            width: '100%',
          }}
        >
          {t(lang, 'Ready to turn ambition into outcomes?', 'Bereit, Ambition in Ergebnisse zu verwandeln?')}
        </h2>
      </div>
      <a
        href={`/${lang}/contact/`} target="_blank" rel="noopener noreferrer"
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
        {t(lang, "Let's talk", 'Kontakt aufnehmen')}
        <ArrowUpRight size={20} strokeWidth={2} />
      </a>
    </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  const bp = useBp();
  const lang = useLang();
  const mobile = bp === 'mobile';
  const headingSize = mobile ? 36 : bp === 'tablet' ? 48 : 80;
  const headingLs = mobile ? -1 : bp === 'tablet' ? -1.5 : -2;
  const leftWidth = mobile ? '100%' : bp === 'tablet' ? 400 : 720;
  const align = mobile ? 'start' : 'end';
  return (
    <footer
      style={sectionOuter(bp, {
        background: NAVY,
        color: WHITE,
        overflow: 'hidden',
      })}
    >
    <div
      style={sectionInner(bp, {
        display: 'flex',
        flexDirection: 'column',
        gap: mobile ? 32 : 40,
        position: 'relative',
        zIndex: 2,
      })}
    >
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: mobile ? 32 : bp === 'tablet' ? 32 : 40,
          width: '100%',
        }}
      >
        <div style={{ width: leftWidth }}>
          <h2
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: headingSize,
              fontWeight: 500,
              letterSpacing: headingLs,
              lineHeight: 1.05,
              color: WHITE,
            }}
          >
            {/* Brand headline — intentionally kept in English in both languages. */}
            Separate the signal from the noise.
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: mobile ? 'flex-start' : 'flex-end',
            gap: mobile ? 28 : 32,
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

          <FooterContactBlock align={align} label={t(lang, 'Inquiries', 'Anfragen')} value="info@icompetence.de" href="mailto:info@icompetence.de" />
          <FooterContactBlock align={align} label={t(lang, 'Phone', 'Telefon')} value="+49 40 22636380" />
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
            [t(lang, 'Imprint', 'Impressum'), `/${lang}/imprint/`],
            [t(lang, 'Privacy', 'Datenschutz'), `/${lang}/imprint/`],
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
          {t(lang, 'Back to top', 'Nach oben')}
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

function FooterContactBlock({ label, value, href, align = 'end' }: { label: string; value: string; href?: string; align?: 'start' | 'end' }) {
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
        alignItems: align === 'start' ? 'flex-start' : 'flex-end',
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
        <a
          href={href}
          style={valueStyle}
          onClick={() =>
            trackCtaClick(
              href.startsWith('mailto:') ? 'footer_mail' : href.startsWith('tel:') ? 'footer_phone' : 'footer_link',
              value
            )
          }
        >
          {value}
        </a>
      ) : (
        <span style={valueStyle}>{value}</span>
      )}
    </div>
  );
}
