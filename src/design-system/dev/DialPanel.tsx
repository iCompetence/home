'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * DEV-ONLY design token dial panel.
 *
 * Tunes the Lavender design tokens live by writing CSS custom properties into a
 * single <style> element, so every component using the tokens updates instantly
 * — no rebuild, no reload.
 *
 * It never writes to the source. Changes live in localStorage until you hit
 * "Export" and hand the CSS over deliberately.
 *
 * Guarded by DevDials (NODE_ENV + dynamic import); this file additionally
 * refuses to run on a non-local host as a belt-and-braces safeguard.
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

type Group = { title: string; dials: Dial[] };

const GROUPS: Group[] = [
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
      {
        kind: 'size',
        varName: '--section-pad-v',
        label: 'Section ↕',
        def: 64,
        min: 0,
        max: 200,
        step: 4,
        scope: 'desktop',
      },
      {
        kind: 'size',
        varName: '--section-pad-h',
        label: 'Section ↔',
        def: 96,
        min: 0,
        max: 240,
        step: 4,
        scope: 'desktop',
      },
      {
        kind: 'size',
        varName: '--container-frame',
        label: 'Frame',
        def: 1440,
        min: 960,
        max: 1920,
        step: 20,
      },
    ],
  },
];

const ALL: Dial[] = GROUPS.flatMap((g) => g.dials);
const STORAGE_KEY = 'ic-dev-dials';
const STYLE_ID = 'ic-dev-dials-style';

const isSize = (d: Dial): d is Extract<Dial, { kind: 'size' }> => d.kind === 'size';
const valueOf = (d: Dial, v: string | undefined) =>
  v ?? (isSize(d) ? String(d.def) : d.def);

function buildCss(overrides: Record<string, string>) {
  const root: string[] = [];
  const desktop: string[] = [];
  for (const d of ALL) {
    const v = overrides[d.varName];
    if (v === undefined) continue;
    const decl = isSize(d) ? `  ${d.varName}: ${v}px;` : `  ${d.varName}: ${v};`;
    (isSize(d) && d.scope === 'desktop' ? desktop : root).push(decl);
  }
  let css = '';
  if (root.length) css += `:root {\n${root.join('\n')}\n}\n`;
  if (desktop.length)
    css += `@media (min-width: 1024px) {\n  :root {\n  ${desktop.join('\n  ')}\n  }\n}\n`;
  return css;
}

export function DialPanel() {
  const [open, setOpen] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [exported, setExported] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);

  // Belt-and-braces: only ever run on a local host.
  useEffect(() => {
    const h = window.location.hostname;
    setAllowed(h === 'localhost' || h === '127.0.0.1' || h.endsWith('.local'));
  }, []);

  // Restore persisted settings (survives restarts and disconnects).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOverrides(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Apply + persist.
  useEffect(() => {
    if (!allowed) return;
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = buildCss(overrides);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch {
      /* ignore quota errors */
    }
  }, [overrides, allowed]);

  const set = useCallback((varName: string, v: string) => {
    setOverrides((o) => ({ ...o, [varName]: v }));
    setExported(null);
  }, []);

  const resetOne = useCallback((varName: string) => {
    setOverrides((o) => {
      const n = { ...o };
      delete n[varName];
      return n;
    });
    setExported(null);
  }, []);

  const changedCount = Object.keys(overrides).length;
  const css = useMemo(() => buildCss(overrides), [overrides]);

  if (!allowed) return null;

  const panel: React.CSSProperties = {
    position: 'fixed',
    right: 12,
    bottom: 12,
    zIndex: 2147483000,
    width: open ? 300 : 'auto',
    maxHeight: '80vh',
    overflowY: 'auto',
    background: '#11161c',
    color: '#e6edf3',
    border: '1px solid #2b3540',
    borderRadius: 10,
    boxShadow: '0 10px 34px rgba(0,0,0,0.45)',
    font: '12px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace',
  };

  if (!open) {
    return (
      <div style={panel}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            all: 'unset',
            cursor: 'pointer',
            padding: '8px 12px',
            display: 'block',
            color: '#e6edf3',
          }}
        >
          ⚙︎ Dials{changedCount ? ` (${changedCount})` : ''}
        </button>
      </div>
    );
  }

  return (
    <div style={panel}>
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
        <button
          type="button"
          onClick={() => setOpen(false)}
          style={{ all: 'unset', cursor: 'pointer', padding: '0 4px', color: '#8b97a5' }}
        >
          ✕
        </button>
      </div>

      <div style={{ padding: '8px 10px' }}>
        {GROUPS.map((g) => (
          <div key={g.title} style={{ marginBottom: 12 }}>
            <div style={{ color: '#8b97a5', margin: '6px 0 4px', letterSpacing: 0.4 }}>
              {g.title.toUpperCase()}
            </div>
            {g.dials.map((d) => {
              const raw = overrides[d.varName];
              const val = valueOf(d, raw);
              const dirty = raw !== undefined;
              return (
                <div key={d.varName} style={{ marginBottom: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: dirty ? '#7ee787' : '#e6edf3' }}>
                      {d.label}
                      {dirty && (
                        <button
                          type="button"
                          onClick={() => resetOne(d.varName)}
                          title="zurücksetzen"
                          style={{
                            all: 'unset',
                            cursor: 'pointer',
                            marginLeft: 6,
                            color: '#8b97a5',
                          }}
                        >
                          ↺
                        </button>
                      )}
                    </span>
                    <span style={{ color: '#8b97a5' }}>
                      {isSize(d) ? `${val}px` : val}
                    </span>
                  </div>
                  {isSize(d) ? (
                    <input
                      type="range"
                      min={d.min}
                      max={d.max}
                      step={d.step ?? 1}
                      value={Number(val)}
                      onChange={(e) => set(d.varName, e.target.value)}
                      style={{ width: '100%' }}
                    />
                  ) : (
                    <input
                      type="color"
                      value={val}
                      onChange={(e) => set(d.varName, e.target.value)}
                      style={{ width: '100%', height: 24, background: 'transparent', border: 0 }}
                    />
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
              setExported(css || '/* keine Änderungen */');
              if (css) navigator.clipboard?.writeText(css).catch(() => {});
            }}
            style={{
              flex: 1,
              cursor: 'pointer',
              background: '#1f6feb',
              color: '#fff',
              border: 0,
              borderRadius: 6,
              padding: '6px 8px',
              font: 'inherit',
            }}
          >
            Export ({changedCount})
          </button>
          <button
            type="button"
            onClick={() => {
              setOverrides({});
              setExported(null);
            }}
            style={{
              cursor: 'pointer',
              background: 'transparent',
              color: '#8b97a5',
              border: '1px solid #2b3540',
              borderRadius: 6,
              padding: '6px 8px',
              font: 'inherit',
            }}
          >
            Reset
          </button>
        </div>

        {exported && (
          <>
            <div style={{ color: '#8b97a5', margin: '8px 0 4px' }}>
              in Zwischenablage · nichts wurde am Code geändert
            </div>
            <textarea
              readOnly
              value={exported}
              onFocus={(e) => e.currentTarget.select()}
              style={{
                width: '100%',
                height: 120,
                background: '#0b0f14',
                color: '#e6edf3',
                border: '1px solid #2b3540',
                borderRadius: 6,
                padding: 6,
                font: 'inherit',
                resize: 'vertical',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
