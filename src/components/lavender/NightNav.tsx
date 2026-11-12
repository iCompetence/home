'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LINKEDIN_URL, LanguageToggle, NEWS_LINK, PRINCIPLE_LINKS, PRODUCT_LINKS, siteHref, smoothAnchor } from '@/design-system';
import { NavSurfaceContext } from '@/design-system/nav-surface';
import { cn } from '@/components/ui/utils';

/**
 * Header of the night home: no bar and no background, so nothing slides over
 * the sky while scrolling. Logo left, the contact button in the middle, the
 * menu on the right; all three stay while scrolling. On the day layer (the
 * light sheet of the Hamburg hero variant) content scrolls under the nav, so
 * there it does get a dark bar, which also names the current section next to
 * the menu icon.
 *
 * The menu is the shadcn Sheet (Radix Dialog: focus trap, Escape, scroll
 * lock) opening from the right as a light, rounded panel with large numbered
 * links. It is portalled to <body>, outside `.lavender-page`, so link and
 * focus styles are set on the elements themselves.
 */

const SECTIONS = [
  { href: '#services', labelKey: 'topNav.services' },
  { href: '#products', labelKey: 'topNav.products' },
  { href: '#process', labelKey: 'topNav.process' },
  { href: '#privacy-led', labelKey: 'topNav.privacyLed' },
] as const;

const EMAIL = 'info@icompetence.de';
const PHONE = '+49 40 22636380';

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
// Hover is the star gradient on the text (a .lav-star-text span inside, see globals.css).
const smallLink = `font-brand text-[15px] font-medium leading-[1.4] text-lav-navy no-underline ${focusRing} focus-visible:outline-lav-navy`;

export function NightNav() {
  const { t, language } = useLanguage();
  const pages = [...PRODUCT_LINKS, ...PRINCIPLE_LINKS, NEWS_LINK];
  const [open, setOpen] = useState(false);
  // True while the day layer (the light sheet of the Hamburg hero variant) is
  // behind the nav: content then scrolls under the nav, so it gets a dark bar
  // from logo to menu. The bar stays over the layer's dark band too.
  const [onDay, setOnDay] = useState(false);
  // Label of the section the page is in, shown in the bar next to the menu.
  // Empty where a section has no anchor (the testimonials).
  const [section, setSection] = useState('');

  useEffect(() => {
    const layer = document.querySelector('[data-ds="DayLayer"]');
    // In page order; the testimonials end the products' stretch without a label of their own.
    const marks: { el: Element | null; labelKey: string }[] = [
      ...SECTIONS.map((item) => ({ el: document.querySelector(item.href), labelKey: item.labelKey as string })),
      { el: document.querySelector('[data-ds="TestimonialSlider"]'), labelKey: '' },
    ];
    const onScroll = () => {
      // Behind the nav means: at 46 px from the top (the middle of the nav).
      const box = layer?.getBoundingClientRect();
      setOnDay(!!box && box.top <= 46 && box.bottom > 46);
      // The current section: the last one whose top has passed the upper third.
      const line = window.innerHeight * 0.35;
      let top = -Infinity;
      let key = '';
      for (const mark of marks) {
        const y = mark.el?.getBoundingClientRect().top;
        if (y !== undefined && y <= line && y > top) {
          top = y;
          key = mark.labelKey;
        }
      }
      setSection(key);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // smoothAnchor prevents the default, which also stops Radix' SheetClose from
  // closing, so the sheet is closed here.
  const goTo = (e: MouseEvent<HTMLAnchorElement>) => {
    smoothAnchor(e);
    setOpen(false);
  };

  return (
    // Must stay a direct child of PageShell's root to remain sticky.
    <header data-ground={onDay ? 'day' : 'night'} className="group/nav pointer-events-none sticky top-0 z-50 w-full">
      <nav
        data-ds="NightNav"
        className="relative mx-auto grid w-full max-w-frame grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 md:px-12 lg:px-[var(--section-pad-h)] lg:py-6"
      >
        {/* The bar: only on the day layer. No backdrop blur (costly on a long page). */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-1 inset-y-2 -z-10 rounded-pill bg-lav-navy opacity-0 shadow-[0_12px_32px_-14px_rgb(11_34_49/0.55)] transition-opacity duration-[var(--duration-base)] group-data-[ground=day]/nav:opacity-100 md:inset-x-8 lg:inset-x-[calc(var(--section-pad-h)-24px)] lg:inset-y-3"
        />
        {/* The logo is a masked shape, so hover can fill it with the star gradient. */}
        <a
          href="#top"
          onClick={smoothAnchor}
          aria-label="iCompetence"
          className={`lav-star-hover lav-logo-mask pointer-events-auto block h-8 w-[94px] justify-self-start bg-lav-white hover:opacity-100! md:h-10 md:w-[117px] ${focusRing} focus-visible:outline-lav-white`}
        />

        <a
          href={siteHref(language, 'contact')}
          target="_blank"
          rel="noopener noreferrer"
          className={`lav-star-hover pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-lav-blue px-4 font-brand text-[14px] font-medium text-lav-navy no-underline transition-[color,scale] duration-[var(--duration-fast)] ease-out hover:text-lav-white hover:opacity-100! active:scale-[0.96] md:gap-2 md:px-6 md:text-body ${focusRing} focus-visible:outline-lav-white`}
        >
          {t('topNav.letsTalk')}
          <ArrowUpRight size={18} strokeWidth={2} />
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          {/* In the bar the trigger also names the section the page is in
              (from tablets up); the whole thing opens the menu. */}
          <SheetTrigger
            aria-label={t('topNav.menu')}
            className={`pointer-events-auto inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-3 justify-self-end lav-star-hover rounded-pill border-0 bg-transparent px-2 font-brand text-[14px] font-medium text-lav-white transition-[scale] duration-[var(--duration-fast)] ease-out hover:opacity-100! active:scale-[0.96] md:text-body ${focusRing} focus-visible:outline-lav-white`}
          >
            {onDay && section && (
              <span key={section} aria-hidden className="lav-nav-section hidden pl-2 md:inline">
                {t(section)}
              </span>
            )}
            <Menu size={26} strokeWidth={2} />
          </SheetTrigger>

          <SheetContent
            side="right"
            aria-describedby={undefined}
            // [&>button]:hidden removes the sheet's own small close icon; ours is below.
            className="lav-menu inset-y-3 right-3 h-auto w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-[28px] border-0 bg-lav-page p-6 text-lav-navy shadow-none sm:max-w-[640px] md:p-10 [&>button]:hidden"
          >
            <SheetTitle className="sr-only">{t('topNav.menu')}</SheetTitle>

            {/* Everything fits one screen without scrolling: the close button
                sits beside the first link instead of on a row of its own, and
                the big links and the gaps shrink with the height of the screen. */}
            <div className="relative flex min-h-full flex-col gap-[clamp(18px,3.6vh,36px)]">
              <SheetClose
                aria-label={t('lavender.common.close')}
                className={`lav-star-hover absolute right-0 top-0 inline-flex size-11 cursor-pointer items-center justify-center rounded-pill border-0 bg-lav-navy text-lav-white transition-[scale] duration-[var(--duration-fast)] ease-out active:scale-[0.96] ${focusRing} focus-visible:outline-lav-navy`}
              >
                <X size={20} strokeWidth={2.5} />
              </SheetClose>

              <ul className="m-0 flex list-none flex-col gap-1 p-0 pr-14">
                {SECTIONS.map((item, i) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={goTo}
                      // The section the page is in keeps the star gradient.
                      aria-current={section === item.labelKey ? 'location' : undefined}
                      className={`inline-flex items-start gap-3 font-brand font-medium text-lav-navy no-underline ${focusRing} focus-visible:outline-lav-navy`}
                    >
                      <span className="pt-[0.5em] text-[13px] leading-none text-lav-navy/60">0{i + 1}</span>
                      <span className="lav-star-text text-[clamp(28px,5vh,44px)] leading-[1.08] tracking-[-0.035em] md:text-[clamp(36px,6.6vh,64px)]">
                        {t(item.labelKey)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-1.5 border-t border-lav-navy/15 p-0 pt-5 sm:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.href}>
                    <a href={siteHref(language, page.href)} className={smallLink}>
                      <span className="lav-star-text">{t(page.labelKey)}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${EMAIL}`} className={smallLink}>
                    <span className="lav-star-text">{EMAIL}</span>
                  </a>
                  <span className="font-brand text-[15px] font-medium leading-[1.4] text-lav-navy">{PHONE}</span>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={smallLink}>
                    <span className="lav-star-text">LinkedIn</span>
                  </a>
                  <a href={siteHref(language, 'imprint')} className={smallLink}>
                    <span className="lav-star-text">{t('footer.imprint')}</span>
                  </a>
                  <a href={siteHref(language, 'privacy-policy')} className={smallLink}>
                    <span className="lav-star-text">{t('footer.privacy')}</span>
                  </a>
                  <NavSurfaceContext.Provider value="light">
                    <LanguageToggle />
                  </NavSurfaceContext.Provider>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
