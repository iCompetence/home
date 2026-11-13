'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LINKEDIN_URL, LanguageToggle, NEWS_LINK, PRINCIPLE_LINKS, PRODUCT_LINKS, siteHref } from '@/design-system';
import { NavSurfaceContext } from '@/design-system/nav-surface';
import { cn } from '@/components/ui/utils';
import { glideOnClick } from './glide';

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

/** The home page's sections: its own anchor navigation, and the big links on pages without sections. */
const HOME_SECTIONS = [
  { id: 'services', labelKey: 'topNav.services' },
  { id: 'products', labelKey: 'topNav.products' },
  { id: 'process', labelKey: 'topNav.process' },
  { id: 'privacy-led', labelKey: 'topNav.privacyLed' },
] as const;

export type NavSection = { id: string; label: string };

export type NightNavProps = {
  /** Where the logo leads: '#top' (default) on the home page, the home URL on every other page. */
  logoHref?: string;
  /**
   * The page's own sections (anchor ids and labels). They are the page's
   * anchor navigation: the bar names the one the page is in, the menu lists
   * them as its big links. Without them the menu's big links lead to the home
   * page's sections.
   */
  sections?: readonly NavSection[];
  /**
   * 'auto' (default): no bar on the night stage, a dark bar once the day
   * layer is behind the nav (the home page). 'always': the bar from the
   * start, for pages whose content scrolls under the nav right away.
   */
  bar?: 'auto' | 'always';
  /**
   * Where the contact button leads when the page is the contact page itself:
   * an anchor on it (e.g. '#form'), reached in the same tab. Everywhere else
   * the button opens the contact page in a new tab.
   */
  contactAnchor?: `#${string}`;
};

const EMAIL = 'info@icompetence.de';
const PHONE = '+49 40 22636380';

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
// Hover is the star gradient on the text (a .lav-star-text span inside, see globals.css).
// The type steps trim their box to cap height; the padding gives the link a touch target, the negative margin keeps the layout.
const smallLink = `lav-paragraph inline-block py-3 font-medium text-lav-navy no-underline ${focusRing} focus-visible:outline-lav-navy`;

export function NightNav({ logoHref = '#top', sections, bar = 'auto', contactAnchor }: NightNavProps = {}) {
  const { t, language } = useLanguage();
  const onHome = logoHref === '#top';
  // The big links of the menu: the page's own sections, else the home page's
  // (as in-page anchors on the home page, as links to it from anywhere else).
  const own = sections && sections.length > 0;
  const links: { id: string; label: string; href: string }[] = own
    ? sections.map((item) => ({ ...item, href: `#${item.id}` }))
    : HOME_SECTIONS.map((item) => ({
        id: item.id,
        label: t(item.labelKey),
        href: onHome ? `#${item.id}` : `${logoHref}#${item.id}`,
      }));
  // Sections to watch while scrolling: only those that are on this page.
  const watched = own || onHome ? links.map((item) => item.id).join(',') : '';
  const pages = [...PRODUCT_LINKS, ...PRINCIPLE_LINKS, NEWS_LINK];
  const [open, setOpen] = useState(false);
  // True while the day layer (the light sheet of the Hamburg hero variant) is
  // behind the nav: content then scrolls under the nav, so it gets a dark bar
  // from logo to menu. The bar stays over the layer's dark band too.
  // With bar 'always' it is in the static HTML already: otherwise the white
  // logo stood on the light page until the script had loaded.
  const [onDay, setOnDay] = useState(bar === 'always');
  // Id of the section the page is in; its label is shown in the bar next to
  // the menu. Empty where a section has no anchor (the home's testimonials).
  const [section, setSection] = useState('');

  useEffect(() => {
    const layer = document.querySelector('[data-ds="DayLayer"]');
    // In page order; the testimonials end the products' stretch without a label of their own.
    const marks: { el: Element | null; id: string }[] = [
      ...(watched ? watched.split(',') : []).map((id) => ({ el: document.getElementById(id), id })),
      { el: document.querySelector('[data-ds="Testimonials"]'), id: '' },
      // The explanatory part after the product (TopicSection) is no section
      // of the menu: the bar shows no label there instead of the one before.
      { el: document.querySelector('[data-ds="Explainer"]'), id: '' },
    ];
    const onScroll = () => {
      // Behind the nav means: at 46 px from the top (the middle of the nav).
      const box = layer?.getBoundingClientRect();
      setOnDay(bar === 'always' || (!!box && box.top <= 46 && box.bottom > 46));
      // The current section: the last one whose top has passed the upper third.
      const line = window.innerHeight * 0.35;
      let top = -Infinity;
      let id = '';
      for (const mark of marks) {
        const y = mark.el?.getBoundingClientRect().top;
        if (y !== undefined && y <= line && y > top) {
          top = y;
          id = mark.id;
        }
      }
      setSection(id);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [bar, watched]);

  // In-page links glide to their section (glide.ts); the sheet is closed here,
  // because preventing the default also stops Radix' SheetClose.
  const goTo = (e: MouseEvent<HTMLAnchorElement>) => {
    glideOnClick(e); // only acts on '#…' links; others navigate normally
    toggle(false);
  };

  // Opening and closing continue from where the panel and its veil are: a
  // quick second click or Esc while they still move must not make them jump
  // (the keyframes in globals.css start from these two values).
  const toggle = (next: boolean) => {
    const panel = document.querySelector<HTMLElement>('.lav-menu');
    const veil = panel?.previousElementSibling as HTMLElement | null | undefined;
    panel?.style.setProperty('--lav-menu-from', getComputedStyle(panel).transform);
    veil?.style.setProperty('--lav-veil-from', getComputedStyle(veil).opacity);
    setOpen(next);
  };

  return (
    // Must stay a direct child of PageShell's root to remain sticky.
    // data-surface: the nav is a dark surface on any page (focus ring, star colours).
    <header
      data-ground={onDay ? 'day' : 'night'}
      data-surface="inverse"
      className="group/nav pointer-events-none sticky top-0 z-50 w-full"
    >
      <nav
        data-ds="NightNav"
        className="relative mx-auto grid w-full max-w-frame grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 md:px-12 lg:px-[var(--section-pad-h)] lg:py-6"
      >
        {/* The bar: only on the day layer. No backdrop blur (costly on a long page). */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-2 inset-y-2 -z-10 rounded-pill bg-lav-navy opacity-0 shadow-[0_12px_32px_-14px_rgb(11_34_49/0.55)] transition-opacity duration-[var(--duration-base)] group-data-[ground=day]/nav:opacity-100 md:inset-x-4 lg:inset-x-[calc(var(--section-pad-h)-40px)] lg:inset-y-3"
        />
        {/* The logo is a masked shape, so hover can fill it with the star gradient.
            The link around it is 44 px tall, a full touch target. */}
        <a
          href={logoHref}
          onClick={glideOnClick}
          aria-label="iCompetence"
          className={`pointer-events-auto inline-flex h-11 items-center justify-self-start hover:opacity-100! ${focusRing} focus-visible:outline-lav-white`}
        >
          <span className="lav-star-hover lav-logo-mask block h-8 w-[94px] bg-lav-white md:h-10 md:w-[117px]" />
        </a>

        <a
          {...(contactAnchor
            ? { href: contactAnchor, onClick: glideOnClick }
            : { href: siteHref(language, 'contact'), target: '_blank', rel: 'noopener noreferrer' })}
          className={`lav-star-hover pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-pill bg-lav-primary px-4 font-brand text-small font-medium whitespace-nowrap text-lav-on-primary no-underline transition-[color,scale]! duration-[var(--duration-fast)] ease-out hover:text-lav-white hover:opacity-100! focus-visible:text-lav-white active:scale-[0.96] md:gap-2 md:px-6 md:text-body ${focusRing} focus-visible:outline-lav-white`}
        >
          {t('topNav.letsTalk')}
          <ArrowUpRight size={18} strokeWidth={2} className="max-[389px]:hidden" />
        </a>

        {/* The menu's page links in the static HTML as well. The sheet below
            only mounts when it opens, and crawlers do not click: without this
            list, most product pages were linked from almost nowhere. Hidden
            for everyone (no layout, not read out); people use the menu. */}
        <ul hidden>
          {pages.map((page) => (
            <li key={page.href}>
              <a href={siteHref(language, page.href)}>{t(page.labelKey)}</a>
            </li>
          ))}
        </ul>

        <Sheet open={open} onOpenChange={toggle}>
          {/* In the bar the trigger also names the section the page is in
              (from tablets up); the whole thing opens the menu. */}
          <SheetTrigger
            aria-label={t('topNav.menu')}
            className={`pointer-events-auto inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-3 justify-self-end lav-star-hover rounded-pill border-0 bg-transparent px-2 font-brand text-small font-medium text-lav-white transition-[scale]! duration-[var(--duration-fast)] ease-out hover:opacity-100! active:scale-[0.96] md:text-body ${focusRing} focus-visible:outline-lav-white`}
          >
            {onDay && section && (
              <span key={section} aria-hidden className="lav-nav-section hidden max-w-[16rem] truncate pl-2 md:inline">
                {links.find((item) => item.id === section)?.label}
              </span>
            )}
            <Menu size={26} strokeWidth={2} />
          </SheetTrigger>

          <SheetContent
            side="right"
            aria-describedby={undefined}
            // [&>button]:hidden removes the sheet's own small close icon; ours is below.
            className="lav-menu transition-none inset-y-3 right-3 h-auto w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-frame-inner border-0 bg-lav-page p-6 text-lav-navy shadow-none sm:max-w-[640px] md:p-10 [&>button]:hidden"
          >
            <SheetTitle className="sr-only">{t('topNav.menu')}</SheetTitle>

            {/* Everything fits one screen without scrolling: the close button
                sits beside the first link instead of on a row of its own, and
                the big links and the gaps shrink with the height of the screen. */}
            <div className="relative flex min-h-full flex-col gap-[clamp(18px,3.6vh,36px)]">
              <SheetClose
                aria-label={t('lavender.common.close')}
                className={`lav-star-hover absolute right-0 top-0 inline-flex size-11 cursor-pointer items-center justify-center rounded-pill border-0 bg-lav-navy text-lav-white transition-[scale]! duration-[var(--duration-fast)] ease-out active:scale-[0.96] ${focusRing} focus-visible:outline-lav-navy`}
              >
                <X size={20} strokeWidth={2.5} />
              </SheetClose>

              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {links.map((item, i) => (
                  // Only the first link shares its line with the close button.
                  <li key={item.href} className="first:pr-14">
                    <a
                      href={item.href}
                      onClick={goTo}
                      // The section the page is in keeps the star gradient.
                      aria-current={section === item.id ? 'location' : undefined}
                      className={`inline-flex items-start gap-3 font-brand font-medium text-lav-navy no-underline ${focusRing} focus-visible:outline-lav-navy`}
                    >
                      <span className="lav-caption pt-[0.5em] text-lav-navy/70">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className={cn(
                          'lav-star-text tracking-[-0.035em]',
                          // Up to four links get the largest size; longer lists step down so the menu still fits one screen.
                          links.length <= 4
                            ? 'text-[clamp(28px,5vh,44px)] md:text-[clamp(36px,6.6vh,64px)]'
                            : 'text-[clamp(22px,3.6vh,32px)] md:text-[clamp(26px,4.4vh,44px)]',
                          // After the size: tailwind-merge drops a line height that stands before a font size.
                          'leading-[1.08]',
                        )}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-0 border-t border-lav-navy/15 p-0 pt-3 sm:gap-x-8">
                {pages.map((page) => (
                  <li key={page.href}>
                    <a href={siteHref(language, page.href)} className={smallLink}>
                      <span className="lav-star-text">{t(page.labelKey)}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-end justify-between gap-6">
                <div className="flex flex-col">
                  <a href={`mailto:${EMAIL}`} className={smallLink}>
                    <span className="lav-star-text">{EMAIL}</span>
                  </a>
                  <span className="lav-paragraph py-3 font-medium text-lav-navy">{PHONE}</span>
                </div>
                <div className="flex flex-col items-start sm:items-end">
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
