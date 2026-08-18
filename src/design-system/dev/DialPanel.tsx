'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TextEditor } from './TextEditor';

/**
 * DEV-ONLY design token dial panel.
 *
 * Tunes the Lavender design tokens live by writing CSS custom properties into a
 * single <style> element. Because custom properties inherit, the same dials can
 * be applied at three scopes:
 *
 *   global    → :root                    (the whole site)
 *   type      → [data-ds="ProductTeaser"] (every instance of a component)
 *   instance  → the one element you picked
 *
 * It never writes to the source. Changes live in localStorage until you hit
 * "Export" and hand the CSS over deliberately.
 *
 * Guarded by DevDials (module-level NODE_ENV check + dynamic import); this file
 * additionally refuses to run on a non-local host.
 */

/**
 * How to tell whether a subtree actually uses a token: utility classes are
 * scanned after stripping variants (md:, hover:) and opacity suffixes (/70).
 *   suffix → class ends with it   (bg-lav-navy, text-lav-navy/70)
 *   exact  → class equals it      (text-h2, rounded-card — not rounded-card-sm)
 *   raw    → raw class contains it (py-[var(--section-pad-v)])
 */
type Detect = { kind: 'suffix' | 'exact' | 'raw'; value: string };

type Dial =
  | { kind: 'color'; varName: string; label: string; def: string; detect: Detect }
  | {
      kind: 'size';
      varName: string;
      label: string;
      def: number;
      min: number;
      max: number;
      step?: number;
      /** 'desktop' → override is emitted inside @media (min-width:1024px). */
      scope?: 'root' | 'desktop';
      detect: Detect;
    };

const GROUPS: { title: string; dials: Dial[] }[] = [
  {
    title: 'Farben',
    dials: [
      { kind: 'color', varName: '--color-lav-navy', label: 'Navy', def: '#0b2231', detect: { kind: 'suffix', value: '-lav-navy' } },
      { kind: 'color', varName: '--color-lav-lavender', label: 'Lavender', def: '#f5e1ff', detect: { kind: 'suffix', value: '-lav-lavender' } },
      { kind: 'color', varName: '--color-lav-page', label: 'Page', def: '#fdfafe', detect: { kind: 'suffix', value: '-lav-page' } },
      { kind: 'color', varName: '--color-lav-blue', label: 'Blue', def: '#24a1da', detect: { kind: 'suffix', value: '-lav-blue' } },
      { kind: 'color', varName: '--color-lav-white', label: 'White', def: '#ffffff', detect: { kind: 'suffix', value: '-lav-white' } },
    ],
  },
  {
    title: 'Typografie',
    dials: [
      { kind: 'size', varName: '--text-mega', label: 'Mega', def: 120, min: 40, max: 200, detect: { kind: 'exact', value: 'text-mega' } },
      { kind: 'size', varName: '--text-h1', label: 'H1', def: 80, min: 24, max: 160, detect: { kind: 'exact', value: 'text-h1' } },
      { kind: 'size', varName: '--text-h2', label: 'H2', def: 54, min: 20, max: 120, detect: { kind: 'exact', value: 'text-h2' } },
      { kind: 'size', varName: '--text-h3', label: 'H3', def: 36, min: 16, max: 90, detect: { kind: 'exact', value: 'text-h3' } },
      { kind: 'size', varName: '--text-sub', label: 'Sub', def: 24, min: 12, max: 60, detect: { kind: 'exact', value: 'text-sub' } },
      { kind: 'size', varName: '--text-body', label: 'Body', def: 16, min: 10, max: 32, detect: { kind: 'exact', value: 'text-body' } },
    ],
  },
  {
    title: 'Radien',
    dials: [
      { kind: 'size', varName: '--radius-pill', label: 'Pill', def: 100, min: 0, max: 100, detect: { kind: 'exact', value: 'rounded-pill' } },
      { kind: 'size', varName: '--radius-card', label: 'Card', def: 24, min: 0, max: 64, detect: { kind: 'exact', value: 'rounded-card' } },
      { kind: 'size', varName: '--radius-card-sm', label: 'Card S', def: 16, min: 0, max: 48, detect: { kind: 'exact', value: 'rounded-card-sm' } },
    ],
  },
  {
    title: 'Layout (Desktop)',
    dials: [
      { kind: 'size', varName: '--section-pad-v', label: 'Section ↕', def: 64, min: 0, max: 200, step: 4, scope: 'desktop', detect: { kind: 'raw', value: 'var(--section-pad-v)' } },
      { kind: 'size', varName: '--section-pad-h', label: 'Section ↔', def: 96, min: 0, max: 240, step: 4, scope: 'desktop', detect: { kind: 'raw', value: 'var(--section-pad-h)' } },
      { kind: 'size', varName: '--container-frame', label: 'Frame', def: 1440, min: 960, max: 1920, step: 20, detect: { kind: 'exact', value: 'max-w-frame' } },
    ],
  },
];

/**
 * Spacing dials are different in kind: they set real CSS properties on the
 * selected component (gap/padding/margin) rather than design tokens, because
 * the layout utilities behind them are not tokenised. Keys are prefixed with
 * '#' so they never collide with the '--token' keys.
 */
type SpaceDial = { key: string; label: string; props: string[]; max: number };

const SPACE_DIALS: SpaceDial[] = [
  { key: '#gap', label: 'Gap', props: ['gap'], max: 160 },
  { key: '#padY', label: 'Padding ↕', props: ['padding-top', 'padding-bottom'], max: 200 },
  { key: '#padX', label: 'Padding ↔', props: ['padding-left', 'padding-right'], max: 200 },
  { key: '#marY', label: 'Margin ↕', props: ['margin-top', 'margin-bottom'], max: 200 },
];
const SPACE_BY_KEY = new Map(SPACE_DIALS.map((d) => [d.key, d]));

/** Tailwind's default spacing scale, for turning a dialled px value back into a class. */
const TW_SCALE: [string, number][] = [
  ['0', 0], ['0.5', 2], ['1', 4], ['1.5', 6], ['2', 8], ['2.5', 10], ['3', 12], ['3.5', 14],
  ['4', 16], ['5', 20], ['6', 24], ['7', 28], ['8', 32], ['9', 36], ['10', 40], ['11', 44],
  ['12', 48], ['14', 56], ['16', 64], ['20', 80], ['24', 96], ['28', 112], ['32', 128],
];
const TW_PREFIX: Record<string, string> = { '#gap': 'gap', '#padY': 'py', '#padX': 'px', '#marY': 'my' };

function twClass(key: string, px: number) {
  const prefix = TW_PREFIX[key];
  const hit = TW_SCALE.find(([, v]) => v === px);
  return hit ? `${prefix}-${hit[0]}` : `${prefix}-[${px}px]`;
}

const ALL = GROUPS.flatMap((g) => g.dials);
const BY_VAR = new Map(ALL.map((d) => [d.varName, d]));
const STORAGE_KEY = 'ic-dev-dials-v2';
const STYLE_ID = 'ic-dev-dials-style';
const INST_ATTR = 'data-ds-inst';

const isSize = (d: Dial): d is Extract<Dial, { kind: 'size' }> => d.kind === 'size';

type Scopes = Record<string, Record<string, string>>;
type Selection = { name: string; path: string; isComponent: boolean } | null;

/** Readable label for an arbitrary element: div.flex.gap-6 */
function elementLabel(el: Element) {
  const cls = (el.getAttribute('class') || '')
    .split(/\s+/)
    .filter((c) => c && !c.includes('[') && !c.includes(':'))
    .slice(0, 2)
    .join('.');
  return cls ? `${el.tagName.toLowerCase()}.${cls}` : el.tagName.toLowerCase();
}

const PORTAL_ID = 'ic-dev-dials-root';

/**
 * Stable-ish CSS path so an instance selection survives a reload.
 * The panel lives in a portal appended last to <body>, and is skipped when
 * counting siblings — otherwise showing/hiding the picker overlay would shift
 * nth-child indices and invalidate every stored path.
 */
function cssPath(el: Element): string {
  const parts: string[] = [];
  let cur: Element | null = el;
  while (cur && cur !== document.body && cur.parentElement) {
    const parent: HTMLElement = cur.parentElement;
    const siblings = Array.from(parent.children).filter((c) => c.id !== PORTAL_ID);
    const idx = siblings.indexOf(cur) + 1;
    parts.unshift(`${cur.tagName.toLowerCase()}:nth-child(${idx})`);
    cur = parent;
  }
  return parts.length ? `body > ${parts.join(' > ')}` : 'body';
}

/** Utility class → comparable core: strip variants (md:, hover:) and /opacity. */
function coreOf(cls: string) {
  const noVariant = cls.slice(cls.lastIndexOf(':') + 1);
  const slash = noVariant.indexOf('/');
  return slash === -1 ? noVariant : noVariant.slice(0, slash);
}

/** Tokens actually referenced by the given roots and their descendants. */
function usedVars(roots: Element[]): Set<string> {
  const classes = new Set<string>();
  const raw: string[] = [];
  for (const root of roots) {
    for (const el of [root, ...Array.from(root.querySelectorAll('*'))]) {
      const cn = el.getAttribute('class');
      if (!cn) continue;
      raw.push(cn);
      for (const c of cn.split(/\s+/)) if (c) classes.add(coreOf(c));
    }
  }
  const rawJoined = raw.join(' ');
  const found = new Set<string>();
  for (const d of ALL) {
    const { kind, value } = d.detect;
    const hit =
      kind === 'raw'
        ? rawJoined.includes(value)
        : kind === 'exact'
          ? classes.has(value)
          : Array.from(classes).some((c) => c.endsWith(value));
    if (hit) found.add(d.varName);
  }
  return found;
}

function declsFor(vals: Record<string, string>) {
  const root: string[] = [];
  const desktop: string[] = [];
  for (const [key, v] of Object.entries(vals)) {
    if (key.startsWith('#')) {
      const sd = SPACE_BY_KEY.get(key);
      if (sd) root.push(...sd.props.map((prop) => `${prop}: ${v}px;`));
      continue;
    }
    const d = BY_VAR.get(key);
    if (!d) continue;
    const decl = `${key}: ${isSize(d) ? `${v}px` : v};`;
    (isSize(d) && d.scope === 'desktop' ? desktop : root).push(decl);
  }
  return { root, desktop };
}

function rule(selector: string, vals: Record<string, string>) {
  const { root, desktop } = declsFor(vals);
  let css = '';
  if (root.length) css += `${selector} {\n  ${root.join('\n  ')}\n}\n`;
  if (desktop.length)
    css += `@media (min-width: 1024px) {\n  ${selector} {\n    ${desktop.join('\n    ')}\n  }\n}\n`;
  return css;
}

export function DialPanel() {
  const [open, setOpen] = useState(false);
  const [scopes, setScopes] = useState<Scopes>({});
  const [selection, setSelection] = useState<Selection>(null);
  const [allOfType, setAllOfType] = useState(false);
  const [picking, setPicking] = useState(false);
  /** 'component' picks the nearest [data-ds]; 'element' picks any node inside it. */
  const [pickMode, setPickMode] = useState<'component' | 'element'>('component');
  const [hover, setHover] = useState<{ rect: DOMRect; name: string } | null>(null);
  const [exported, setExported] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [tab, setTab] = useState<'design' | 'text'>('design');
  const [relevant, setRelevant] = useState<Set<string> | null>(null);
  /** Current computed spacing of the selection — the dials start from reality. */
  const [spaceBase, setSpaceBase] = useState<Record<string, number> | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [portalEl] = useState<HTMLDivElement | null>(() =>
    typeof document === 'undefined' ? null : document.createElement('div'),
  );

  // Render outside the page tree so the panel never disturbs the DOM it is
  // measuring (see cssPath).
  useEffect(() => {
    if (!portalEl) return;
    portalEl.id = PORTAL_ID;
    document.body.appendChild(portalEl);
    return () => portalEl.remove();
  }, [portalEl]);

  useEffect(() => {
    const h = window.location.hostname;
    setAllowed(h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local'));
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // Only the tuned values are restored — never the selection. A session
        // always starts global (all dials visible), which is what you expect
        // after a reload and avoids resurrecting a path that may no longer
        // resolve.
        setScopes(JSON.parse(raw).scopes ?? {});
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const scopeKey = useMemo(() => {
    if (!selection) return 'global';
    return allOfType ? `type:${selection.name}` : `inst:${selection.path}`;
  }, [selection, allOfType]);

  const current = scopes[scopeKey] ?? {};

  // Apply every scope + persist.
  useEffect(() => {
    if (!allowed) return;
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    document.querySelectorAll(`[${INST_ATTR}]`).forEach((n) => n.removeAttribute(INST_ATTR));

    const keys = Object.keys(scopes).filter((k) => Object.keys(scopes[k]).length);
    // Source order decides at equal specificity: global < type < instance.
    const order = (k: string) => (k === 'global' ? 0 : k.startsWith('type:') ? 1 : 2);
    let css = '';
    let instN = 0;
    for (const k of keys.sort((a, b) => order(a) - order(b))) {
      const vals = scopes[k];
      if (k === 'global') css += rule(':root', vals);
      else if (k.startsWith('type:')) css += rule(`[data-ds="${k.slice(5)}"]`, vals);
      else {
        const target = document.querySelector(k.slice(5));
        if (!target) continue; // path no longer resolves — skip silently
        const id = String(++instN);
        target.setAttribute(INST_ATTR, id);
        css += rule(`[${INST_ATTR}="${id}"]`, vals);
      }
    }
    el.textContent = css;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ scopes }));
    } catch {
      /* ignore quota errors */
    }
  }, [scopes, selection, allOfType, allowed]);

  // Which dials actually affect the current selection?
  useEffect(() => {
    if (!selection) {
      setSpaceBase(null);
      return setRelevant(null);
    }
    const roots = allOfType
      ? Array.from(document.querySelectorAll(`[data-ds="${selection.name}"]`))
      : [document.querySelector(selection.path)].filter(Boolean as unknown as (v: Element | null) => v is Element);
    if (!roots.length) {
      setSpaceBase(null);
      // The element is gone (page changed) — fall back to global rather than
      // leaving the panel stuck on an empty list.
      setSelection(null);
      setRelevant(null);
      return;
    }
    setRelevant(usedVars(roots));

    const el = roots[0];
    const cs = getComputedStyle(el);
    const num = (v: string) => (v.endsWith('px') ? Math.round(parseFloat(v)) : 0);
    const isFlexOrGrid = /flex|grid/.test(cs.display);
    setSpaceBase({
      ...(isFlexOrGrid ? { '#gap': num(cs.rowGap) } : {}),
      '#padY': num(cs.paddingTop),
      '#padX': num(cs.paddingLeft),
      '#marY': num(cs.marginTop),
    });
  }, [selection, allOfType, scopes]);

  // Element picker.
  useEffect(() => {
    if (!picking) return;
    const inPanel = (t: EventTarget | null) =>
      t instanceof Node && panelRef.current?.contains(t);
    const root = pickMode === 'element' && selection ? document.querySelector(selection.path) : null;
    const resolve = (target: EventTarget | null): Element | null => {
      const t = target as Element | null;
      if (!t?.closest) return null;
      if (pickMode === 'component') return t.closest('[data-ds]');
      // Element mode: any node, but it must sit inside the selected component.
      return root && root.contains(t) ? t : null;
    };
    const onMove = (e: MouseEvent) => {
      if (inPanel(e.target)) return setHover(null);
      const el = resolve(e.target);
      setHover(
        el
          ? {
              rect: el.getBoundingClientRect(),
              name: pickMode === 'component' ? el.getAttribute('data-ds')! : elementLabel(el),
            }
          : null,
      );
    };
    const onClick = (e: MouseEvent) => {
      if (inPanel(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const el = resolve(e.target);
      if (el) {
        const isComponent = pickMode === 'component';
        setSelection({
          name: isComponent ? el.getAttribute('data-ds')! : elementLabel(el),
          path: cssPath(el),
          isComponent,
        });
        if (!isComponent) setAllOfType(false);
        setExported(null);
      }
      setPicking(false);
      setHover(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPicking(false);
        setHover(null);
      }
    };
    document.addEventListener('mousemove', onMove, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [picking, pickMode, selection]);

  const walk = useCallback(
    (dir: 'up' | 'down') => {
      if (!selection) return;
      const el = document.querySelector(selection.path);
      if (!el) return;
      const next = selection.isComponent
        ? dir === 'up'
          ? el.parentElement?.closest('[data-ds]')
          : el.querySelector('[data-ds]')
        : dir === 'up'
          ? el.parentElement
          : el.firstElementChild;
      if (!next || next === document.body) return;
      const isComponent = next.hasAttribute('data-ds') && selection.isComponent;
      setSelection({
        name: isComponent ? next.getAttribute('data-ds')! : elementLabel(next),
        path: cssPath(next),
        isComponent,
      });
    },
    [selection],
  );

  const set = useCallback(
    (varName: string, v: string) => {
      setScopes((s) => ({ ...s, [scopeKey]: { ...(s[scopeKey] ?? {}), [varName]: v } }));
      setExported(null);
    },
    [scopeKey],
  );

  const resetOne = useCallback(
    (varName: string) => {
      setScopes((s) => {
        const vals = { ...(s[scopeKey] ?? {}) };
        delete vals[varName];
        return { ...s, [scopeKey]: vals };
      });
      setExported(null);
    },
    [scopeKey],
  );

  const exportCss = useCallback(() => {
    const keys = Object.keys(scopes).filter((k) => Object.keys(scopes[k]).length);
    if (!keys.length) return '/* keine Änderungen */';
    return keys
      .map((k) => {
        const vals = scopes[k];
        if (k === 'global') return `/* global (Design-Tokens) */\n${rule(':root', vals)}`;
        const hints = Object.entries(vals)
          .filter(([key]) => key.startsWith('#'))
          .map(([key, v]) => `   ${twClass(key, Number(v))}`)
          .join('\n');
        const suffix = hints ? `/* Tailwind-Klassen für die Komponente:\n${hints}\n*/\n` : '';
        if (k.startsWith('type:'))
          return `/* alle <${k.slice(5)}> */\n${suffix}${rule(`[data-ds="${k.slice(5)}"]`, vals)}`;
        return `/* eine Instanz — Pfad: ${k.slice(5)} */\n${suffix}${rule(k.slice(5), vals)}`;
      })
      .join('\n');
  }, [scopes]);

  // With a selection, show only the dials that actually reach it (unless the
  // user asks for all — handy to force a token that is not used *yet*).
  const filtered =
    relevant && !showAll
      ? GROUPS.map((g) => ({ ...g, dials: g.dials.filter((d) => relevant.has(d.varName)) })).filter(
          (g) => g.dials.length,
        )
      : GROUPS;
  // Never strand the user with an empty panel: a component that uses no tokens
  // falls back to the full set.
  const visibleGroups = filtered.length ? filtered : GROUPS;

  if (!allowed || !portalEl) return null;

  const changedHere = Object.keys(current).length;
  const changedTotal = Object.values(scopes).reduce((n, v) => n + Object.keys(v).length, 0);

  const shell: React.CSSProperties = {
    position: 'fixed',
    right: 12,
    bottom: 12,
    zIndex: 2147483000,
    width: open ? 310 : 'auto',
    maxHeight: '82vh',
    overflowY: 'auto',
    background: '#11161c',
    color: '#e6edf3',
    border: '1px solid #2b3540',
    borderRadius: 10,
    boxShadow: '0 10px 34px rgba(0,0,0,0.45)',
    font: '12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace',
  };
  const btn: React.CSSProperties = {
    cursor: 'pointer',
    background: 'transparent',
    color: '#8b97a5',
    border: '1px solid #2b3540',
    borderRadius: 6,
    padding: '4px 8px',
    font: 'inherit',
  };

  if (!open) {
    return createPortal(
      <div ref={panelRef} style={shell}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ all: 'unset', cursor: 'pointer', padding: '8px 12px', display: 'block', color: '#e6edf3' }}
        >
          ⚙︎ Dials{changedTotal ? ` (${changedTotal})` : ''}
        </button>
      </div>,
      portalEl,
    );
  }

  return createPortal(
    <>
      {picking && hover && (
        <div
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 2147482999,
            left: hover.rect.left,
            top: hover.rect.top,
            width: hover.rect.width,
            height: hover.rect.height,
            outline: '2px solid #1f6feb',
            background: 'rgba(31,111,235,0.12)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: -20,
              left: 0,
              background: '#1f6feb',
              color: '#fff',
              padding: '1px 6px',
              borderRadius: 4,
              font: '11px/1.6 ui-monospace, monospace',
              whiteSpace: 'nowrap',
            }}
          >
            {hover.name}
          </span>
        </div>
      )}

      <div ref={panelRef} style={shell}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px',
            borderBottom: '1px solid #2b3540',
            position: 'sticky',
            top: 0,
            background: '#11161c',
          }}
        >
          <strong style={{ fontWeight: 600 }}>Design Dials · dev</strong>
          <button type="button" onClick={() => setOpen(false)} style={{ all: 'unset', cursor: 'pointer', padding: '0 4px', color: '#8b97a5' }}>
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #2b3540' }}>
          {(['design', 'text'] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              style={{
                all: 'unset',
                cursor: 'pointer',
                flex: 1,
                textAlign: 'center',
                padding: '6px 0',
                color: tab === id ? '#e6edf3' : '#8b97a5',
                borderBottom: tab === id ? '2px solid #1f6feb' : '2px solid transparent',
              }}
            >
              {id === 'design' ? 'Design' : 'Text'}
            </button>
          ))}
        </div>

        {tab === 'text' && <TextEditor panelEl={panelRef.current} />}

        {/* Scope */}
        {tab === 'design' && (
        <div style={{ padding: '8px 10px', borderBottom: '1px solid #2b3540' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setPickMode('component');
                setPicking((p) => !(p && pickMode === 'component'));
              }}
              style={{
                ...btn,
                color: picking && pickMode === 'component' ? '#fff' : '#8b97a5',
                borderColor: picking && pickMode === 'component' ? '#1f6feb' : '#2b3540',
                background: picking && pickMode === 'component' ? '#1f6feb' : 'transparent',
              }}
            >
              ⌖ {picking && pickMode === 'component' ? 'Klicke…' : 'Komponente'}
            </button>
            {selection && (
              <button
                type="button"
                onClick={() => {
                  setPickMode('element');
                  setPicking((p) => !(p && pickMode === 'element'));
                }}
                title="Element innerhalb der Auswahl anklicken"
                style={{
                  ...btn,
                  color: picking && pickMode === 'element' ? '#fff' : '#8b97a5',
                  borderColor: picking && pickMode === 'element' ? '#a371f7' : '#2b3540',
                  background: picking && pickMode === 'element' ? '#a371f7' : 'transparent',
                }}
              >
                ⌗ {picking && pickMode === 'element' ? 'Klicke…' : 'Element'}
              </button>
            )}
            {selection && (
              <>
                <button type="button" onClick={() => walk('up')} style={btn} title="Elternkomponente">↑</button>
                <button type="button" onClick={() => walk('down')} style={btn} title="Kindkomponente">↓</button>
                <button type="button" onClick={() => { setSelection(null); setExported(null); }} style={btn} title="Auswahl aufheben">✕</button>
              </>
            )}
          </div>

          <div style={{ marginTop: 6, color: '#8b97a5' }}>
            Ziel:{' '}
            <span style={{ color: '#7ee787' }}>
              {selection
                ? allOfType
                  ? `alle <${selection.name}>`
                  : selection.isComponent
                    ? `<${selection.name}> (diese)`
                    : `${selection.name} (Element)`
                : 'global · alle Tokens'}
            </span>
          </div>

          {selection?.isComponent && (
            <label style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={allOfType} onChange={(e) => { setAllOfType(e.target.checked); setExported(null); }} />
              <span>alle Instanzen dieses Typs</span>
            </label>
          )}
        </div>
        )}

        {tab === 'design' && (
        <div style={{ padding: '8px 10px' }}>
          {relevant && !showAll && (
            <div style={{ color: '#8b97a5', marginBottom: 8 }}>
              {relevant.size
                ? `${relevant.size} von ${ALL.length} Reglern wirken hier.`
                : 'Diese Komponente nutzt keinen der Tokens.'}{' '}
              <button
                type="button"
                onClick={() => setShowAll(true)}
                style={{ all: 'unset', cursor: 'pointer', color: '#1f6feb' }}
              >
                alle anzeigen
              </button>
            </div>
          )}
          {relevant && showAll && (
            <div style={{ color: '#8b97a5', marginBottom: 8 }}>
              alle Regler{' '}
              <button
                type="button"
                onClick={() => setShowAll(false)}
                style={{ all: 'unset', cursor: 'pointer', color: '#1f6feb' }}
              >
                nur wirksame
              </button>
            </div>
          )}
          {visibleGroups.map((g) => (
            <div key={g.title} style={{ marginBottom: 12 }}>
              <div style={{ color: '#8b97a5', margin: '6px 0 4px', letterSpacing: 0.4 }}>{g.title.toUpperCase()}</div>
              {g.dials.map((d) => {
                const raw = current[d.varName];
                const val = raw ?? (isSize(d) ? String(d.def) : d.def);
                const dirty = raw !== undefined;
                return (
                  <div key={d.varName} style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: dirty ? '#7ee787' : '#e6edf3' }}>
                        {d.label}
                        {dirty && (
                          <button type="button" onClick={() => resetOne(d.varName)} title="zurücksetzen" style={{ all: 'unset', cursor: 'pointer', marginLeft: 6, color: '#8b97a5' }}>
                            ↺
                          </button>
                        )}
                      </span>
                      <span style={{ color: '#8b97a5' }}>{isSize(d) ? `${val}px` : val}</span>
                    </div>
                    {isSize(d) ? (
                      <input type="range" min={d.min} max={d.max} step={d.step ?? 1} value={Number(val)} onChange={(e) => set(d.varName, e.target.value)} style={{ width: '100%' }} />
                    ) : (
                      <input type="color" value={val} onChange={(e) => set(d.varName, e.target.value)} style={{ width: '100%', height: 24, background: 'transparent', border: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {spaceBase && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#8b97a5', margin: '6px 0 4px', letterSpacing: 0.4 }}>
                ABSTÄNDE · NUR AUSWAHL
              </div>
              {SPACE_DIALS.filter((d) => spaceBase[d.key] !== undefined).map((d) => {
                const raw = current[d.key];
                const val = raw ?? String(spaceBase[d.key]);
                const dirty = raw !== undefined;
                return (
                  <div key={d.key} style={{ marginBottom: 6 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: dirty ? '#7ee787' : '#e6edf3' }}>
                        {d.label}
                        {dirty && (
                          <button type="button" onClick={() => resetOne(d.key)} title="zurücksetzen" style={{ all: 'unset', cursor: 'pointer', marginLeft: 6, color: '#8b97a5' }}>
                            ↺
                          </button>
                        )}
                      </span>
                      <span style={{ color: '#8b97a5' }}>
                        {val}px{dirty ? ` · ${twClass(d.key, Number(val))}` : ''}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={d.max}
                      step={2}
                      value={Number(val)}
                      onChange={(e) => set(d.key, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
            <button
              type="button"
              onClick={() => {
                const css = exportCss();
                setExported(css);
                navigator.clipboard?.writeText(css).catch(() => {});
              }}
              style={{ flex: 1, cursor: 'pointer', background: '#1f6feb', color: '#fff', border: 0, borderRadius: 6, padding: '6px 8px', font: 'inherit' }}
            >
              Export ({changedTotal})
            </button>
            <button type="button" onClick={() => { setScopes((s) => ({ ...s, [scopeKey]: {} })); setExported(null); }} style={btn} title="nur dieses Ziel">
              Reset ({changedHere})
            </button>
            <button type="button" onClick={() => { setScopes({}); setExported(null); }} style={btn} title="alle Ziele">
              Alle
            </button>
          </div>

          {exported && (
            <>
              <div style={{ color: '#8b97a5', margin: '8px 0 4px' }}>in Zwischenablage · nichts wurde am Code geändert</div>
              <textarea
                readOnly
                value={exported}
                onFocus={(e) => e.currentTarget.select()}
                style={{ width: '100%', height: 130, background: '#0b0f14', color: '#e6edf3', border: '1px solid #2b3540', borderRadius: 6, padding: 6, font: 'inherit', resize: 'vertical' }}
              />
            </>
          )}
        </div>
        )}
      </div>
    </>,
    portalEl,
  );
}
