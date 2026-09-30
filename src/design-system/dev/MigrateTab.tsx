'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  Button,
  CTABand,
  ClosingBlock,
  FeatureBlock,
  Footer,
  Hero,
  LogoCarousel,
  ProcessAccordion,
  ProductShowcase,
  ProductTeaser,
  Section,
  ServicesCarousel,
  Statement,
  TestimonialSlider,
  TopNav,
} from '../index';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { keyForText } from './devI18n';

/**
 * DEV-ONLY migration scratchpad.
 *
 * Pick a section on an old-design page, preview it rendered with a new-design
 * component (same copy), flip A/B, and export a scaffold: the mapping, a JSX
 * skeleton and — because several old pages are not localised at all — a draft
 * i18n block for any copy that has no key yet.
 *
 * The preview is exactly that: it answers "does the new design suit this
 * content", it does not produce the finished migration.
 */

type Extracted = {
  heading: string | null;
  /** Repeating sub-items (h3/h4/h5 + the copy that follows) — what the
   *  structured components need: carousel pills, process steps, … */
  items: { title: string; text: string }[];
  paragraphs: string[];
  links: { text: string; href: string }[];
  images: { src: string; alt: string }[];
};

type Target =
  | 'section'
  | 'hero'
  | 'statement'
  | 'feature'
  | 'featureStacked'
  | 'products'
  | 'teaser'
  | 'services'
  | 'process'
  | 'testimonials'
  | 'logos'
  | 'cta'
  | 'closing'
  | 'nav'
  | 'footer';

/**
 * Every slot the new design actually has, in page order — the list doubles as
 * the migration checklist for a page. `needsItems` targets only make sense
 * when sub-items were found; `selfContained` ones ignore the old copy.
 */
const TARGETS: {
  id: Target;
  label: string;
  hint: string;
  needsItems?: boolean;
  selfContained?: boolean;
}[] = [
  { id: 'nav', label: 'TopNav', hint: 'Kopfzeile — eigene Navigation', selfContained: true },
  { id: 'hero', label: 'Hero', hint: 'Headline + Subline + CTA + Marken-Stern' },
  { id: 'logos', label: 'LogoCarousel', hint: 'eigene Logo-Liste', selfContained: true },
  { id: 'services', label: 'ServicesCarousel', hint: 'Karte mit aufklappbaren Pills', needsItems: true },
  { id: 'statement', label: 'Statement', hint: 'ein großer Satz über dem Stern + CTA' },
  { id: 'feature', label: 'FeatureBlock', hint: 'Bild neben Text + CTA' },
  { id: 'featureStacked', label: 'FeatureBlock (gestapelt)', hint: 'breites Bild über Text + CTA' },
  { id: 'products', label: 'ProductShowcase', hint: 'Feature-Produkt + Teaser-Reihe' },
  { id: 'teaser', label: 'ProductTeaser', hint: 'einzelne Karte mit Bild + Link' },
  { id: 'testimonials', label: 'TestimonialSlider', hint: 'Zitate — Name/Rolle fehlen' },
  { id: 'process', label: 'ProcessAccordion', hint: 'nummerierte Schritte', needsItems: true },
  { id: 'closing', label: 'ClosingBlock', hint: 'CTA-Band + Footer + Stern' },
  { id: 'cta', label: 'CTA-Band', hint: 'nur das Band, ohne Footer' },
  { id: 'footer', label: 'Footer', hint: 'nur der Footer', selfContained: true },
  { id: 'section', label: 'Section', hint: 'Notnagel: Überschrift + Fließtext' },
];

/**
 * Stand-in visual for blocks whose old section has no image of its own.
 *
 * Drawn rather than borrowed from the brand assets: a real image cropped by
 * object-cover reads as an empty coloured panel, which makes the A/B look
 * worse than the finished migration would. A labelled, dashed placeholder
 * shows the format the block reserves *and* that content is still missing.
 */
const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
       <rect width="1600" height="900" fill="#efe4f7"/>
       <rect x="24" y="24" width="1552" height="852" fill="none" stroke="#0b2231" stroke-opacity="0.35"
             stroke-width="6" stroke-dasharray="24 18" rx="16"/>
       <text x="800" y="470" text-anchor="middle" font-family="Inter, sans-serif" font-size="92"
             font-weight="500" fill="#0b2231" fill-opacity="0.55">&#10216;Bild&#10217;</text>
     </svg>`,
  );

function extract(el: Element): Extracted {
  const txt = (n: Element | null) => n?.textContent?.replace(/\s+/g, ' ').trim() || '';
  const heading = el.querySelector('h1, h2, h3');
  // Walk in document order: every sub-heading claims the next paragraph.
  const items: { title: string; text: string }[] = [];
  const nodes = Array.from(el.querySelectorAll('h3, h4, h5, p'));
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    if (n === heading || !/^H[345]$/.test(n.tagName)) continue;
    const next = nodes[i + 1];
    items.push({ title: txt(n), text: next?.tagName === 'P' ? txt(next) : '' });
  }
  return {
    heading: heading ? txt(heading) : null,
    items: items.slice(0, 6),
    paragraphs: Array.from(el.querySelectorAll('p'))
      .map((p) => txt(p))
      .filter((t) => t.length > 2)
      .slice(0, 6),
    links: Array.from(el.querySelectorAll('a'))
      .map((a) => ({ text: txt(a), href: a.getAttribute('href') || '' }))
      .filter((l) => l.text)
      .slice(0, 3),
    images: Array.from(el.querySelectorAll('img'))
      .map((i) => ({ src: i.getAttribute('src') || '', alt: i.getAttribute('alt') || '' }))
      .slice(0, 2),
  };
}

/** privacyLedAi.services — a sensible key prefix from the URL + section id. */
function keyBase(el: Element) {
  const slug = (location.pathname.split('/').filter(Boolean)[1] || 'page')
    .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const id = (el.id || '').replace(/-section$/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return id ? `${slug}.${id}` : slug;
}

export function MigrateTab({ panelEl }: { panelEl: HTMLElement | null }) {
  const [picking, setPicking] = useState(false);
  const [hover, setHover] = useState<DOMRect | null>(null);
  const [path, setPath] = useState<string | null>(null);
  /**
   * The picked element is held by reference, not looked up by path: inserting
   * the preview placeholder shifts nth-child indices, which would invalidate a
   * stored path (the path is kept only to label the export).
   */
  const pickedRef = useRef<Element | null>(null);
  const [data, setData] = useState<Extracted | null>(null);
  const [target, setTarget] = useState<Target>('section');
  const [preview, setPreview] = useState(false);
  const [lightBg, setLightBg] = useState(true);
  const [mount, setMount] = useState<HTMLElement | null>(null);
  const [exported, setExported] = useState<string | null>(null);
  /** What the last pick attempt hit — the panel used to fail silently. */
  const [lastHit, setLastHit] = useState<string | null>(null);

  // Picker: sections on an old page (or any element as a fallback).
  useEffect(() => {
    if (!picking) return;
    const inPanel = (t: EventTarget | null) => t instanceof Node && panelEl?.contains(t);
    const pick = (t: EventTarget | null) => {
      const el = t as Element | null;
      return el?.closest?.('section') ?? el;
    };
    const onMove = (e: MouseEvent) => {
      if (inPanel(e.target)) return setHover(null);
      const el = pick(e.target);
      setHover(el ? el.getBoundingClientRect() : null);
    };
    const select = (e: Event) => {
      if (inPanel(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const el = pick(e.target);
      const hit = e.target as Element | null;
      setLastHit(
        el
          ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}`
          : `${hit?.tagName?.toLowerCase() ?? '?'} — keine Sektion gefunden`,
      );
      if (el) {
        pickedRef.current = el;
        const sels: string[] = [];
        let cur: Element | null = el;
        while (cur && cur !== document.body && cur.parentElement) {
          const p: HTMLElement = cur.parentElement;
          const sibs = Array.from(p.children).filter((c) => c.id !== 'ic-dev-dials-root');
          sels.unshift(`${cur.tagName.toLowerCase()}:nth-child(${sibs.indexOf(cur) + 1})`);
          cur = p;
        }
        setPath(`body > ${sels.join(' > ')}`);
        setData(extract(el));
        setPreview(false);
        setExported(null);
      }
      setPicking(false);
      setHover(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPicking(false);
    // pointerdown is the trigger; the click that follows is swallowed so a
    // link or button inside the section cannot navigate away mid-pick.
    const swallow = (e: Event) => {
      if (inPanel(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('pointerdown', select, true);
    document.addEventListener('click', swallow, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('pointerdown', select, true);
      document.removeEventListener('click', swallow, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [picking, panelEl]);

  // Swap: hide the original and portal the preview into a placeholder.
  useEffect(() => {
    if (!preview) return setMount(null);
    const old = pickedRef.current as HTMLElement | null;
    if (!old?.isConnected) return setMount(null);
    const prevDisplay = old.style.display;
    old.style.display = 'none';
    const holder = document.createElement('div');
    holder.setAttribute('data-ds-preview', '');
    // Same marker the new design uses, so the preview inherits its scoped base
    // styles instead of the legacy ones the old page still carries.
    holder.className = 'lavender-page';
    if (lightBg) holder.style.background = 'var(--color-lav-page)';
    old.parentElement?.insertBefore(holder, old);
    setMount(holder);
    return () => {
      old.style.display = prevDisplay;
      holder.remove();
      setMount(null);
    };
  }, [preview, path, lightBg]);

  /**
   * Renders the picked copy with the REAL design-system component — never a
   * lookalike. That is the whole point of the A/B: it has to answer "would
   * this section work as a Hero", and a hand-built text stand-in answers a
   * different, easier question (it drops the brand star, the hero surface and
   * the section's own rhythm, so it always looks tamer than the real thing).
   *
   * Where the old section has nothing to fill a slot, an explicit ⟨…⟩
   * placeholder goes in rather than the slot silently disappearing.
   */
  const rendered = () => {
    if (!data) return null;
    const head = data.heading ?? '⟨Überschrift⟩';
    const copy = data.paragraphs;
    const cta = data.links[0];
    const image = data.images[0]?.src ?? PLACEHOLDER_IMAGE;
    const imageAlt = data.images[0]?.alt ?? head;

    const ctaButton = (variant: 'primary' | 'dark', className?: string) => (
      <Button asChild variant={variant} className={className}>
        <a href={cta?.href ?? '#'}>
          {cta?.text ?? '⟨CTA⟩'}
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </Button>
    );

    if (target === 'nav') return <TopNav />;
    if (target === 'footer') return <Footer />;
    if (target === 'logos') return <LogoCarousel />;

    if (target === 'hero')
      return (
        <Hero
          title={head}
          subline={copy[0] ?? '⟨Subline⟩'}
          actions={ctaButton('primary')}
        />
      );

    if (target === 'statement')
      return (
        <Statement
          text={data.heading ?? copy[0] ?? '⟨Aussage⟩'}
          action={ctaButton('primary')}
          actionId="preview-cta"
        />
      );

    if (target === 'feature' || target === 'featureStacked')
      return (
        <Section>
          <FeatureBlock
            layout={target === 'feature' ? 'side' : 'stacked'}
            title={head}
            description={copy[0] ?? '⟨Fließtext⟩'}
            image={image}
            imageAlt={imageAlt}
            action={ctaButton('dark', 'self-start')}
          />
        </Section>
      );

    if (target === 'products')
      return (
        <ProductShowcase
          featured={{
            eyebrow: '⟨Eyebrow⟩',
            title: head,
            description: copy[0] ?? '⟨Fließtext⟩',
            image,
            imageAlt,
            action: ctaButton('dark', 'self-start'),
          }}
          /* Falls die alte Sektion keine Unterpunkte hat, zwei Platzhalter-
             Karten — sonst fehlt die halbe Komponente im A/B. */
          teasers={(data.items.length
            ? data.items.slice(0, 2)
            : [
                { title: '⟨Produkt 1⟩', text: '' },
                { title: '⟨Produkt 2⟩', text: '' },
              ]
          ).map((it, i) => ({
            eyebrow: '⟨Eyebrow⟩',
            title: it.title,
            description: it.text || '⟨Beschreibung⟩',
            image: data.images[i + 1]?.src ?? PLACEHOLDER_IMAGE,
            imageAlt: it.title,
            href: cta?.href ?? '#',
            ctaLabel: '⟨CTA⟩',
          }))}
        />
      );

    if (target === 'teaser')
      return (
        <Section innerClassName="flex">
          <ProductTeaser
            eyebrow="⟨Eyebrow⟩"
            title={head}
            description={copy[0] ?? '⟨Beschreibung⟩'}
            image={image}
            imageAlt={imageAlt}
            href={cta?.href ?? '#'}
            ctaLabel={cta?.text ?? '⟨CTA⟩'}
          />
        </Section>
      );

    if (target === 'services')
      return (
        <ServicesCarousel
          title={head}
          cards={[
            {
              title: head,
              image,
              pills: data.items.map((it) => ({
                label: it.title,
                description: it.text || '⟨Beschreibung⟩',
              })),
            },
          ]}
        />
      );

    if (target === 'process')
      return (
        <ProcessAccordion
          title={head}
          steps={data.items.map((it, i) => ({
            number: String(i + 1).padStart(2, '0'),
            title: it.title,
            description: it.text || '⟨Beschreibung⟩',
          }))}
        />
      );

    if (target === 'testimonials')
      return (
        <TestimonialSlider
          title={head}
          items={(data.items.length ? data.items.map((i) => i.text || i.title) : copy).map((q) => ({
            quote: q,
            name: '⟨Name⟩',
            role: '⟨Rolle⟩',
          }))}
        />
      );

    if (target === 'closing')
      return <ClosingBlock heading={head} action={ctaButton('dark')} />;

    if (target === 'cta') return <CTABand heading={head} action={ctaButton('dark')} />;

    return (
      <Section innerClassName="flex flex-col gap-4 md:gap-6">
        <h2 className="m-0 font-brand text-[28px] font-medium text-lav-navy md:text-[32px] lg:text-h3 leading-[1.1]">
          {head}
        </h2>
        {copy.map((c, i) => (
          <p key={i} className="m-0 font-brand font-normal text-lav-navy/80 text-body md:text-sub leading-[1.5]">
            {c}
          </p>
        ))}
      </Section>
    );
  };

  const buildExport = useCallback(() => {
    if (!data) return '/* nichts ausgewählt */';
    const el = pickedRef.current;
    const base = el ? keyBase(el) : 'page';
    const missing: string[] = [];
    let n = 0;
    const ref = (text: string, role: string) => {
      const k = keyForText(text);
      if (k) return `t('${k}')`;
      const key = `${base}.${role}${role === 'copy' ? ++n : ''}`;
      missing.push(
        `  '${key}': {\n    en: '${text.replace(/'/g, "\\'")}',\n    de: '' // ← zu übersetzen\n  },`,
      );
      return `t('${key}')`;
    };

    // Never null: the scaffolds interpolate it, and "null" in the output reads
    // as a bug rather than as "this section had no heading".
    const head = data.heading ? ref(data.heading, 'title') : "'⟨Überschrift⟩'";
    const copy = data.paragraphs.map((p) => ref(p, 'copy'));
    const cta = data.links[0] ? ref(data.links[0].text, 'cta') : null;
    const items = data.items.map((it, i) => ({
      label: ref(it.title, `item${i + 1}Label`),
      desc: it.text ? ref(it.text, `item${i + 1}Desc`) : "''",
    }));

    const img = data.images[0]?.src ?? '…';
    const ctaJsx = (variant: string, extra = '') =>
      cta
        ? `<Button asChild variant="${variant}"${extra}><a href="…">{${cta}}</a></Button>`
        : `{/* CTA: in der alten Sektion nicht vorhanden */}`;

    /** One scaffold per target — the same component the preview rendered. */
    const SCAFFOLD: Record<Target, () => string> = {
      nav: () => `<TopNav />`,
      footer: () => `<Footer />`,
      logos: () => `<LogoCarousel />  {/* nutzt CLIENT_LOGOS, kein Inhalt aus der alten Sektion */}`,
      hero: () =>
        `<Hero\n  title={${head}}\n  subline={${copy[0] ?? "'…'"}}\n  actions={${ctaJsx('primary')}}\n/>  {/* Stern kommt per Default aus <BrandStar variant="hero" /> */}`,
      statement: () =>
        `<Statement\n  text={${head}}\n  action={${ctaJsx('primary')}}\n/>`,
      feature: () =>
        `<Section>\n  <FeatureBlock\n    title={${head}}\n    description={${copy[0] ?? "'…'"}}\n    image="${img}"\n    imageAlt={t('…')}\n    action={${ctaJsx('dark', ' className="self-start"')}}\n  />\n</Section>`,
      featureStacked: () =>
        `<Section>\n  <FeatureBlock\n    layout="stacked"\n    title={${head}}\n    description={${copy[0] ?? "'…'"}}\n    image="${img}"\n    imageAlt={t('…')}\n    action={${ctaJsx('dark', ' className="self-start"')}}\n  />\n</Section>`,
      products: () =>
        `<ProductShowcase\n  featured={{\n    eyebrow: t('…'),\n    title: ${head},\n    description: ${copy[0] ?? "'…'"},\n    image: '${img}',\n    imageAlt: t('…'),\n    action: ${ctaJsx('dark', ' className="self-start"')},\n  }}\n  teasers={[\n${items
          .slice(0, 2)
          .map((i) => `    { eyebrow: t('…'), title: ${i.label}, description: ${i.desc}, image: '…', imageAlt: t('…'), href: '…', ctaLabel: t('…') },`)
          .join('\n')}\n  ]}\n/>`,
      teaser: () =>
        `<ProductTeaser\n  eyebrow={t('…')}\n  title={${head}}\n  description={${copy[0] ?? "'…'"}}\n  image="${img}"\n  imageAlt={t('…')}\n  href="…"\n  ctaLabel={t('…')}\n/>`,
      services: () =>
        `<ServicesCarousel\n  title={${head}}\n  cards={[{\n    title: ${head},\n    image: '${img}',\n    pills: [\n${items.map((i) => `      { label: ${i.label}, description: ${i.desc} },`).join('\n')}\n    ],\n  }]}\n/>`,
      process: () =>
        `<ProcessAccordion\n  title={${head}}\n  steps={[\n${items.map((i, n) => `    { number: '${String(n + 1).padStart(2, '0')}', title: ${i.label}, description: ${i.desc} },`).join('\n')}\n  ]}\n/>`,
      testimonials: () =>
        `<TestimonialSlider\n  title={${head}}\n  items={[\n${items.map((i) => `    { quote: ${i.desc}, name: '…', role: '…' },`).join('\n')}\n  ]}\n/>  {/* Name und Rolle sind in der alten Sektion nicht enthalten */}`,
      closing: () =>
        `<ClosingBlock\n  heading={${head}}\n  action={${ctaJsx('dark')}}\n/>  {/* enthält bereits den Footer */}`,
      cta: () => `<CTABand\n  heading={${head}}\n  action={${ctaJsx('dark')}}\n/>`,
      section: () =>
        `<Section innerClassName="flex flex-col gap-4 md:gap-6">\n  <h2 className="font-brand text-[28px] md:text-[32px] lg:text-h3 leading-[1.1] …">{${head}}</h2>\n${copy.map((c) => `  <p className="font-brand text-body md:text-sub leading-[1.5] …">{${c}}</p>`).join('\n')}\n</Section>`,
    };

    const jsx = SCAFFOLD[target]();

    return [
      `/* ${location.pathname}  §  ${el?.id || path}`,
      `   →  ${TARGETS.find((t) => t.id === target)?.label} */`,
      '',
      jsx,
      '',
      missing.length
        ? `/* Noch nicht lokalisiert — für LanguageContext.tsx: */\n${missing.join('\n')}`
        : '/* Alle Texte haben bereits einen i18n-Key. */',
    ].join('\n');
  }, [data, path, target]);

  const btn: React.CSSProperties = {
    cursor: 'pointer',
    background: 'transparent',
    color: '#8b97a5',
    border: '1px solid #2b3540',
    borderRadius: 6,
    padding: '4px 8px',
    font: 'inherit',
  };

  return (
    <>
      {picking && hover && (
        <div
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 2147482999,
            left: hover.left,
            top: hover.top,
            width: hover.width,
            height: hover.height,
            outline: '2px solid #3fb950',
            background: 'rgba(63,185,80,0.12)',
          }}
        />
      )}
      {/* The panel is mounted in the root layout, outside the page's
          LanguageProvider, so components that read i18n (Footer, TopNav,
          ClosingBlock) would throw when previewed. The preview brings its own
          provider, seeded from the URL. */}
      {mount &&
        preview &&
        createPortal(
          <LanguageProvider
            initialLanguage={location.pathname.startsWith('/en') ? 'en' : 'de'}
          >
            {rendered()}
          </LanguageProvider>,
          mount,
        )}

      <div style={{ padding: '8px 10px' }}>
        <button
          type="button"
          onClick={() => setPicking((p) => !p)}
          style={{
            ...btn,
            color: picking ? '#fff' : '#8b97a5',
            background: picking ? '#3fb950' : 'transparent',
            borderColor: picking ? '#3fb950' : '#2b3540',
          }}
        >
          ⧉ {picking ? 'Sektion anklicken…' : 'Sektion wählen'}
        </button>

        {picking && (
          <div style={{ color: '#3fb950', marginTop: 6 }}>
            Picker aktiv — fahre über die Seite, klicke eine Sektion (Esc bricht ab)
          </div>
        )}
        {!picking && lastHit && !data && (
          <div style={{ color: '#d29922', marginTop: 6 }}>zuletzt getroffen: {lastHit}</div>
        )}

        {data && (
          <>
            <div style={{ color: '#7ee787', marginTop: 8 }}>
              ✓ ausgewählt: {lastHit ?? 'Sektion'} — jetzt Ziel wählen, dann A/B
            </div>
            <div style={{ color: '#8b97a5', marginTop: 4 }}>
              gefunden: {data.heading ? '1 Überschrift, ' : ''}
              {data.items.length > 0 && `${data.items.length} Unterelemente, `}
              {data.paragraphs.length} Absätze, {data.links.length} Links, {data.images.length} Bilder
            </div>

            <div style={{ color: '#8b97a5', margin: '8px 0 4px', letterSpacing: 0.4 }}>ERSETZEN DURCH</div>
            {TARGETS.filter((t) => !t.needsItems || data.items.length > 0).map((t) => (
              <label key={t.id} style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginBottom: 3, cursor: 'pointer' }}>
                <input type="radio" name="ds-target" checked={target === t.id} onChange={() => { setTarget(t.id); setExported(null); }} />
                <span style={{ color: target === t.id ? '#e6edf3' : '#8b97a5' }}>
                  {t.label} <span style={{ color: '#5c6773' }}>· {t.hint}</span>
                </span>
              </label>
            ))}

            <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setPreview((p) => !p)}
                style={{ ...btn, color: preview ? '#fff' : '#8b97a5', background: preview ? '#1f6feb' : 'transparent', borderColor: preview ? '#1f6feb' : '#2b3540' }}
              >
                {preview ? 'neu ✓' : 'A/B'}
              </button>
              <label style={{ display: 'flex', gap: 4, alignItems: 'center', cursor: 'pointer', color: '#8b97a5' }}>
                <input type="checkbox" checked={lightBg} onChange={(e) => setLightBg(e.target.checked)} />
                heller Hintergrund
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                const txt = buildExport();
                setExported(txt);
                navigator.clipboard?.writeText(txt).catch(() => {});
              }}
              style={{ width: '100%', cursor: 'pointer', background: '#1f6feb', color: '#fff', border: 0, borderRadius: 6, padding: '6px 8px', font: 'inherit', marginTop: 8 }}
            >
              Export für die Migration
            </button>
          </>
        )}

        {exported && (
          <textarea
            readOnly
            value={exported}
            onFocus={(e) => e.currentTarget.select()}
            style={{ width: '100%', height: 150, marginTop: 8, background: '#0b0f14', color: '#e6edf3', border: '1px solid #2b3540', borderRadius: 6, padding: 6, font: 'inherit', resize: 'vertical' }}
          />
        )}
      </div>
    </>
  );
}
