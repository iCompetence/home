'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button, ProductTeaser, Section } from '../index';
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
  paragraphs: string[];
  links: { text: string; href: string }[];
  images: { src: string; alt: string }[];
};

type Target = 'section' | 'hero' | 'cta' | 'teaser';

const TARGETS: { id: Target; label: string; hint: string }[] = [
  { id: 'section', label: 'Section', hint: 'Überschrift + Fließtext' },
  { id: 'hero', label: 'Hero', hint: 'große Headline + Subline + CTA' },
  { id: 'cta', label: 'CTA-Band', hint: 'zentrierte Headline + Button' },
  { id: 'teaser', label: 'ProductTeaser', hint: 'Karte mit Bild + Link' },
];

function extract(el: Element): Extracted {
  const txt = (n: Element | null) => n?.textContent?.replace(/\s+/g, ' ').trim() || '';
  const heading = el.querySelector('h1, h2, h3');
  return {
    heading: heading ? txt(heading) : null,
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
    const onClick = (e: MouseEvent) => {
      if (inPanel(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const el = pick(e.target);
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
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('click', onClick, true);
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
    if (lightBg) holder.style.background = 'var(--color-lav-page)';
    old.parentElement?.insertBefore(holder, old);
    setMount(holder);
    return () => {
      old.style.display = prevDisplay;
      holder.remove();
      setMount(null);
    };
  }, [preview, path, lightBg]);

  const rendered = () => {
    if (!data) return null;
    const head = data.heading ?? '';
    const copy = data.paragraphs;
    const cta = data.links[0];
    if (target === 'hero')
      return (
        <Section innerClassName="flex flex-col gap-6 lg:gap-10">
          <h1 className="m-0 font-brand text-[40px] font-medium leading-[1.05] tracking-[-1px] text-lav-navy md:text-[56px] lg:text-h1 lg:tracking-[-2px]">
            {head}
          </h1>
          {copy[0] && (
            <p className="m-0 max-w-full font-brand text-body font-normal leading-[1.5] text-lav-navy/80 md:text-sub lg:w-[820px]">
              {copy[0]}
            </p>
          )}
          {cta && (
            <Button asChild variant="primary" className="self-start">
              <a href={cta.href}>
                {cta.text}
                <ArrowUpRight size={20} strokeWidth={2} />
              </a>
            </Button>
          )}
        </Section>
      );
    if (target === 'cta')
      return (
        <Section className="bg-[#bde3f4]" innerClassName="flex flex-col items-center gap-6 lg:gap-10">
          <h2 className="m-0 w-full text-center font-brand text-[40px] font-medium leading-[1.05] tracking-[-1px] text-lav-navy md:text-[56px] lg:text-h1 lg:tracking-[-2px]">
            {head}
          </h2>
          {cta && (
            <Button asChild variant="dark">
              <a href={cta.href}>
                {cta.text}
                <ArrowUpRight size={20} strokeWidth={2} />
              </a>
            </Button>
          )}
        </Section>
      );
    if (target === 'teaser')
      return (
        <Section innerClassName="flex">
          <ProductTeaser
            eyebrow="⟨eyebrow⟩"
            title={head}
            description={copy[0] ?? ''}
            image={data.images[0]?.src ?? '/images/iC_Stern_Blau.png'}
            imageAlt={data.images[0]?.alt ?? head}
            href={cta?.href ?? '#'}
            ctaLabel={cta?.text ?? '⟨CTA⟩'}
          />
        </Section>
      );
    return (
      <Section innerClassName="flex flex-col gap-4 md:gap-6">
        <h2 className="m-0 font-brand text-[28px] font-medium leading-[1.1] text-lav-navy md:text-[32px] lg:text-h3">
          {head}
        </h2>
        {copy.map((c, i) => (
          <p key={i} className="m-0 font-brand text-body font-normal leading-[1.5] text-lav-navy/80 md:text-sub">
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

    const head = data.heading ? ref(data.heading, 'title') : null;
    const copy = data.paragraphs.map((p) => ref(p, 'copy'));
    const cta = data.links[0] ? ref(data.links[0].text, 'cta') : null;

    const jsx =
      target === 'hero'
        ? `<Section innerClassName="flex flex-col gap-6 lg:gap-10">\n  <h1 className="font-brand text-[40px] md:text-[56px] lg:text-h1 …">{${head}}</h1>\n${copy[0] ? `  <p className="font-brand text-body md:text-sub …">{${copy[0]}}</p>\n` : ''}${cta ? `  <Button asChild variant="primary"><a href="…">{${cta}}</a></Button>\n` : ''}</Section>`
        : target === 'cta'
          ? `<Section className="bg-[#bde3f4]" innerClassName="flex flex-col items-center gap-6">\n  <h2 className="text-center font-brand lg:text-h1 …">{${head}}</h2>\n${cta ? `  <Button asChild variant="dark"><a href="…">{${cta}}</a></Button>\n` : ''}</Section>`
          : target === 'teaser'
            ? `<ProductTeaser\n  eyebrow={t('…')}\n  title={${head}}\n  description={${copy[0] ?? "''"}}\n  image="${data.images[0]?.src ?? '…'}"\n  imageAlt={t('…')}\n  href="…"\n  ctaLabel={t('…')}\n/>`
            : `<Section innerClassName="flex flex-col gap-4 md:gap-6">\n  <h2 className="font-brand text-[28px] md:text-[32px] lg:text-h3 …">{${head}}</h2>\n${copy.map((c) => `  <p className="font-brand text-body md:text-sub …">{${c}}</p>`).join('\n')}\n</Section>`;

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
      {mount && preview && createPortal(rendered(), mount)}

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

        {data && (
          <>
            <div style={{ color: '#8b97a5', marginTop: 8 }}>
              gefunden: {data.heading ? '1 Überschrift, ' : ''}
              {data.paragraphs.length} Absätze, {data.links.length} Links, {data.images.length} Bilder
            </div>

            <div style={{ color: '#8b97a5', margin: '8px 0 4px', letterSpacing: 0.4 }}>ERSETZEN DURCH</div>
            {TARGETS.map((t) => (
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
