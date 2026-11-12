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
 * menu on the right. Without a bar the logo would run across the text of the
 * sections, so it fades out once the page leaves the top; button and menu stay.
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
const smallLink = `font-brand text-[15px] font-medium leading-[1.4] text-lav-navy no-underline transition-opacity duration-[var(--duration-fast)] hover:opacity-60 ${focusRing} focus-visible:outline-lav-navy`;

export function NightNav() {
  const { t, language } = useLanguage();
  const pages = [...PRODUCT_LINKS, ...PRINCIPLE_LINKS, NEWS_LINK];
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // smoothAnchor prevents the default, which also stops Radix' SheetClose from
  // closing, so the sheet is closed here.
  const goTo = (e: MouseEvent<HTMLAnchorElement>) => {
    smoothAnchor(e);
    setOpen(false);
  };

  return (
    // Must stay a direct child of PageShell's root to remain sticky.
    <header className="pointer-events-none sticky top-0 z-50 w-full">
      <nav
        data-ds="NightNav"
        className="mx-auto grid w-full max-w-frame grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 md:px-12 lg:px-[var(--section-pad-h)] lg:py-6"
      >
        <a
          href="#top"
          onClick={smoothAnchor}
          tabIndex={atTop ? undefined : -1}
          aria-hidden={atTop ? undefined : true}
          className={cn(
            `inline-flex justify-self-start transition-opacity duration-[var(--duration-base)] ${focusRing} focus-visible:outline-lav-white`,
            atTop ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <img src="/iCompetence_white.svg" alt="iCompetence" className="block h-8 w-auto md:h-10" />
        </a>

        <a
          href={siteHref(language, 'contact')}
          target="_blank"
          rel="noopener noreferrer"
          className={`pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-lav-blue px-4 font-brand text-[14px] font-medium text-lav-navy no-underline md:gap-2 md:px-6 md:text-body ${focusRing} focus-visible:outline-lav-white`}
        >
          {t('topNav.letsTalk')}
          <ArrowUpRight size={18} strokeWidth={2} />
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label={t('topNav.menu')}
            className={`pointer-events-auto inline-flex size-11 cursor-pointer items-center justify-center justify-self-end rounded-pill border-0 bg-transparent text-lav-white ${focusRing} focus-visible:outline-lav-white`}
          >
            <Menu size={26} strokeWidth={2} />
          </SheetTrigger>

          <SheetContent
            side="right"
            aria-describedby={undefined}
            // [&>button]:hidden removes the sheet's own small close icon; ours is below.
            className="lav-menu inset-y-3 right-3 h-auto w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-[28px] border-0 bg-lav-page p-6 text-lav-navy shadow-none sm:max-w-[640px] md:p-10 lg:p-12 [&>button]:hidden"
          >
            <SheetTitle className="sr-only">{t('topNav.menu')}</SheetTitle>

            <div className="flex min-h-full flex-col gap-12">
              <div className="flex justify-end">
                <SheetClose
                  aria-label={t('lavender.common.close')}
                  className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-pill border-0 bg-lav-navy text-lav-white ${focusRing} focus-visible:outline-lav-navy`}
                >
                  <X size={20} strokeWidth={2.5} />
                </SheetClose>
              </div>

              <ul className="m-0 flex list-none flex-col gap-1 p-0 md:gap-2">
                {SECTIONS.map((item, i) => (
                  <li key={item.href}>
                    <a
                        href={item.href}
                        onClick={goTo}
                        className={`group inline-flex items-start gap-3 font-brand font-medium text-lav-navy no-underline ${focusRing} focus-visible:outline-lav-navy`}
                      >
                        <span className="pt-2 text-[13px] leading-none text-lav-navy/60 md:pt-3">0{i + 1}</span>
                        <span className="text-[44px] leading-[1.08] tracking-[-1.5px] transition-opacity duration-[var(--duration-fast)] group-hover:opacity-50 md:text-[64px] md:tracking-[-2.5px]">
                          {t(item.labelKey)}
                        </span>
                      </a>
                  </li>
                ))}
              </ul>

              <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-2 border-t border-lav-navy/15 p-0 pt-6 sm:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.href}>
                    <a href={siteHref(language, page.href)} className={smallLink}>
                      {t(page.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <a href={`mailto:${EMAIL}`} className={smallLink}>{EMAIL}</a>
                  <span className="font-brand text-[15px] font-medium leading-[1.4] text-lav-navy">{PHONE}</span>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={smallLink}>LinkedIn</a>
                  <a href={siteHref(language, 'imprint')} className={smallLink}>{t('footer.imprint')}</a>
                  <a href={siteHref(language, 'privacy-policy')} className={smallLink}>{t('footer.privacy')}</a>
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
