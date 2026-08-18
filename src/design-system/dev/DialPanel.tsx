'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

type Dial =
  | { kind: 'color'; varName: string; label: string; def: string }
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
    };

const GROUPS: { title: string; dials: Dial[] }[] = [
  {
    title: 'Farben',
    dials: [
      { kind: 'color', varName: '--color-lav-navy', label: 'Navy', def: '#0b2231' },
      { kind: 'color', varName: '--color-lav-lavender', label: 'Lavender', def: '#f5e1ff' },
      { kind: 'color', varName: '--color-lav-page', label: 'Page', def: '#fdfafe' },
      { kind: 'color', varName: '--color-lav-blue', label: 'Blue', def: '#24a1da' },
      { kind: 'color', varName: '--color-lav-white', label: 'White', def: '#ffffff' },
    ],
  },
  {
    title: 'Typografie',
    dials: [
      { kind: 'size', varName: '--text-mega', label: 'Mega', def: 120, min: 40, max: 200 },
      { kind: 'size', varName: '--text-h1', label: 'H1', def: 80, min: 24, max: 160 },
      { kind: 'size', varName: '--text-h2', label: 'H2', def: 54, min: 20, max: 120 },
      { kind: 'size', varName: '--text-h3', label: 'H3', def: 36, min: 16, max: 90 },
      { kind: 'size', varName: '--text-sub', label: 'Sub', def: 24, min: 12, max: 60 },
      { kind: 'size', varName: '--text-body', label: 'Body', def: 16, min: 10, max: 32 },
    ],
  },
  {
    title: 'Radien',
    dials: [
      { kind: 'size', varName: '--radius-pill', label: 'Pill', def: 100, min: 0, max: 100 },
      { kind: 'size', varName: '--radius-card', label: 'Card', def: 24, min: 0, max: 64 },
      { kind: 'size', varName: '--radius-card-sm', label: 'Card S', def: 16, min: 0, max: 48 },
    ],
  },
  {
    title: 'Layout (Desktop)',
    dials: [
      { kind: 'size', varName: '--section-pad-v', label: 'Section ↕', def: 64, min: 0, max: 200, step: 4, scope: 'desktop' },
      { kind: 'size', varName: '--section-pad-h', label: 'Section ↔', def: 96, min: 0, max: 240, step: 4, scope: 'desktop' },
      { kind: 'size', varName: '--container-frame', label: 'Frame', def: 1440, min: 960, max: 1920, step: 20 },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.dials);
const BY_VAR = new Map(ALL.map((d) => [d.varName, d]));
const STORAGE_KEY = 'ic-dev-dials-v2';
const STYLE_ID = 'ic-dev-dials-style';
const INST_ATTR = 'data-ds-inst';

const isSize = (d: Dial): d is Extract<Dial, { kind: 'size' }> => d.kind === 'size';

type Scopes = Record<string, Record<string, string>>;
type Selection = { name: string; path: string } | null;

/** Stable-ish CSS path so an instance selection survives a reload. */
function cssPath(el: Element): string {
  const parts: string[] = [];
  let cur: Element | null = el;
  while (cur && cur !== document.body && cur.parentElement) {
    const parent: HTMLElement = cur.parentElement;
    const idx = Array.prototype.indexOf.call(parent.children, cur) + 1;
    parts.unshift(`${cur.tagName.toLowerCase()}:nth-child(${idx})`);
    cur = parent;
  }
  return parts.length ? `body > ${parts.join(' > ')}` : 'body';
}

function declsFor(vals: Record<string, string>) {
  const root: string[] = [];
  const desktop: string[] = [];
  for (const [varName, v] of Object.entries(vals)) {
    const d = BY_VAR.get(varName);
    if (!d) continue;
    const decl = `${varName}: ${isSize(d) ? `${v}px` : v};`;
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
  const [hover, setHover] = useState<{ rect: DOMRect; name: string } | null>(null);
  const [exported, setExported] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const h = window.location.hostname;
    setAllowed(h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local'));
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        setScopes(p.scopes ?? {});
        setSelection(p.selection ?? null);
        setAllOfType(!!p.allOfType);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ scopes, selection, allOfType }));
    } catch {
      /* ignore quota errors */
    }
  }, [scopes, selection, allOfType, allowed]);

  // Element picker.
  useEffect(() => {
    if (!picking) return;
    const inPanel = (t: EventTarget | null) =>
      t instanceof Node && panelRef.current?.contains(t);
    const onMove = (e: MouseEvent) => {
      if (inPanel(e.target)) return setHover(null);
      const el = (e.target as Element)?.closest?.('[data-ds]');
      setHover(el ? { rect: el.getBoundingClientRect(), name: el.getAttribute('data-ds')! } : null);
    };
    const onClick = (e: MouseEvent) => {
      if (inPanel(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const el = (e.target as Element)?.closest?.('[data-ds]');
      if (el) {
        setSelection({ name: el.getAttribute('data-ds')!, path: cssPath(el) });
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
  }, [picking]);

  const walk = useCallback(
    (dir: 'up' | 'down') => {
      if (!selection) return;
      const el = document.querySelector(selection.path);
      if (!el) return;
      const next =
        dir === 'up'
          ? el.parentElement?.closest('[data-ds]')
          : el.querySelector('[data-ds]');
      if (next) setSelection({ name: next.getAttribute('data-ds')!, path: cssPath(next) });
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
        if (k.startsWith('type:'))
          return `/* alle <${k.slice(5)}> */\n${rule(`[data-ds="${k.slice(5)}"]`, vals)}`;
        return `/* eine Instanz — Pfad: ${k.slice(5)} */\n${rule(k.slice(5), vals)}`;
      })
      .join('\n');
  }, [scopes]);

  if (!allowed) return null;

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
    return (
      <div ref={panelRef} style={shell}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ all: 'unset', cursor: 'pointer', padding: '8px 12px', display: 'block', color: '#e6edf3' }}
        >
          ⚙︎ Dials{changedTotal ? ` (${changedTotal})` : ''}
        </button>
      </div>
    );
  }

  return (
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

        {/* Scope */}
        <div style={{ padding: '8px 10px', borderBottom: '1px solid #2b3540' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setPicking((p) => !p)}
              style={{ ...btn, color: picking ? '#fff' : '#8b97a5', borderColor: picking ? '#1f6feb' : '#2b3540', background: picking ? '#1f6feb' : 'transparent' }}
            >
              ⌖ {picking ? 'Klicke…' : 'Auswählen'}
            </button>
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
              {selection ? (allOfType ? `alle <${selection.name}>` : `<${selection.name}> (diese)`) : 'global · alle Tokens'}
            </span>
          </div>

          {selection && (
            <label style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={allOfType} onChange={(e) => { setAllOfType(e.target.checked); setExported(null); }} />
              <span>alle Instanzen dieses Typs</span>
            </label>
          )}
        </div>

        <div style={{ padding: '8px 10px' }}>
          {GROUPS.map((g) => (
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
      </div>
    </>
  );
}
