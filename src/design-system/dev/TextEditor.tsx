'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { translations } from '@/contexts/LanguageContext';
import { REVERSE } from './devI18n';

/**
 * DEV-ONLY copy editor.
 *
 * Click any text on the page; the key is resolved from a reverse index built
 * out of the translation table, so you never have to hunt through ~740 keys.
 * Edits are applied live through the dev override consulted by t(), and kept
 * in localStorage. Nothing is written to LanguageContext until you export.
 */

const STORAGE_KEY = 'ic-dev-text';
type Lang = 'de' | 'en';
type Overrides = Record<Lang, Record<string, string>>;

const EMPTY: Overrides = { de: {}, en: {} };


function publish(o: Overrides) {
  (globalThis as Record<string, unknown>).__ICDEV_TEXT__ = o;
  window.dispatchEvent(new Event('icdev:text'));
}

/** Walk up from the clicked node until the text matches a known key. */
function resolveKeys(start: Element | null): { keys: string[]; text: string } | null {
  let el: Element | null = start;
  for (let depth = 0; el && depth < 4; depth++, el = el.parentElement) {
    const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (!text || text.length > 400) continue;
    const keys = REVERSE.get(text);
    if (keys?.length) return { keys, text };
  }
  return null;
}

export function TextEditor({ panelEl }: { panelEl: HTMLElement | null }) {
  const [overrides, setOverrides] = useState<Overrides>(EMPTY);
  const [picking, setPicking] = useState(false);
  const [hover, setHover] = useState<DOMRect | null>(null);
  const [keys, setKeys] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [exported, setExported] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...EMPTY, ...JSON.parse(raw) } as Overrides;
        setOverrides(parsed);
        publish(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const update = useCallback((lang: Lang, key: string, value: string) => {
    setOverrides((o) => {
      const next: Overrides = { de: { ...o.de }, en: { ...o.en } };
      next[lang][key] = value;
      publish(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota errors */
      }
      return next;
    });
    setExported(null);
  }, []);

  const clearKey = useCallback((key: string) => {
    setOverrides((o) => {
      const next: Overrides = { de: { ...o.de }, en: { ...o.en } };
      delete next.de[key];
      delete next.en[key];
      publish(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setExported(null);
  }, []);

  // Text picker.
  useEffect(() => {
    if (!picking) return;
    const inPanel = (t: EventTarget | null) => t instanceof Node && panelEl?.contains(t);
    const onMove = (e: MouseEvent) => {
      if (inPanel(e.target)) return setHover(null);
      const hit = resolveKeys(e.target as Element);
      setHover(hit ? (e.target as Element).getBoundingClientRect() : null);
    };
    const onClick = (e: MouseEvent) => {
      if (inPanel(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const hit = resolveKeys(e.target as Element);
      if (hit) {
        setKeys(hit.keys);
        setActiveKey(hit.keys[0]);
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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.keys(translations)
      .filter(
        (k) =>
          k.toLowerCase().includes(q) ||
          Object.values(translations[k] as Record<string, string>).some(
            (v) => typeof v === 'string' && v.toLowerCase().includes(q),
          ),
      )
      .slice(0, 12);
  }, [query]);

  const changed = new Set([...Object.keys(overrides.de), ...Object.keys(overrides.en)]);

  const exportText = useCallback(() => {
    if (!changed.size) return '/* keine Textänderungen */';
    return Array.from(changed)
      .map((k) => {
        const base = (translations[k] ?? {}) as Record<string, string>;
        const en = overrides.en[k] ?? base.en ?? '';
        const de = overrides.de[k] ?? base.de ?? '';
        const esc = (v: string) => v.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `  '${k}': {\n    en: '${esc(en)}',\n    de: '${esc(de)}'\n  },`;
      })
      .join('\n');
  }, [changed, overrides]);

  const btn: React.CSSProperties = {
    cursor: 'pointer',
    background: 'transparent',
    color: '#8b97a5',
    border: '1px solid #2b3540',
    borderRadius: 6,
    padding: '4px 8px',
    font: 'inherit',
  };
  const field: React.CSSProperties = {
    width: '100%',
    background: '#0b0f14',
    color: '#e6edf3',
    border: '1px solid #2b3540',
    borderRadius: 6,
    padding: 6,
    font: 'inherit',
    resize: 'vertical',
  };

  const base = activeKey ? ((translations[activeKey] ?? {}) as Record<string, string>) : null;

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
            outline: '2px solid #d29922',
            background: 'rgba(210,153,34,0.14)',
          }}
        />
      )}

      <div style={{ padding: '8px 10px' }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setPicking((p) => !p)}
            style={{
              ...btn,
              color: picking ? '#fff' : '#8b97a5',
              background: picking ? '#d29922' : 'transparent',
              borderColor: picking ? '#d29922' : '#2b3540',
            }}
          >
            ✎ {picking ? 'Text anklicken…' : 'Text wählen'}
          </button>
          {changed.size > 0 && <span style={{ color: '#7ee787' }}>{changed.size} geändert</span>}
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="oder Key/Text suchen…"
          style={{ ...field, marginTop: 8 }}
        />
        {results.length > 0 && (
          <div style={{ marginTop: 4, maxHeight: 120, overflowY: 'auto' }}>
            {results.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setKeys([k]);
                  setActiveKey(k);
                  setQuery('');
                }}
                style={{ ...btn, display: 'block', width: '100%', textAlign: 'left', marginBottom: 2, border: 0 }}
              >
                {k}
              </button>
            ))}
          </div>
        )}

        {keys.length > 1 && (
          <div style={{ marginTop: 8, color: '#8b97a5' }}>
            mehrere Keys mit diesem Text:
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
              {keys.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActiveKey(k)}
                  style={{ ...btn, color: k === activeKey ? '#fff' : '#8b97a5', borderColor: k === activeKey ? '#d29922' : '#2b3540' }}
                >
                  {k.split('.').slice(-2).join('.')}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeKey && base && (
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7ee787', marginBottom: 4 }}>
              <span style={{ wordBreak: 'break-all' }}>{activeKey}</span>
              {changed.has(activeKey) && (
                <button type="button" onClick={() => clearKey(activeKey)} title="zurücksetzen" style={{ all: 'unset', cursor: 'pointer', color: '#8b97a5' }}>
                  ↺
                </button>
              )}
            </div>
            {(['de', 'en'] as Lang[]).map((lang) => (
              <div key={lang} style={{ marginBottom: 6 }}>
                <div style={{ color: '#8b97a5' }}>{lang.toUpperCase()}</div>
                <textarea
                  rows={3}
                  value={overrides[lang][activeKey] ?? base[lang] ?? ''}
                  onChange={(e) => update(lang, activeKey, e.target.value)}
                  style={field}
                />
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          <button
            type="button"
            onClick={() => {
              const txt = exportText();
              setExported(txt);
              navigator.clipboard?.writeText(txt).catch(() => {});
            }}
            style={{ flex: 1, cursor: 'pointer', background: '#1f6feb', color: '#fff', border: 0, borderRadius: 6, padding: '6px 8px', font: 'inherit' }}
          >
            Export ({changed.size})
          </button>
          <button
            type="button"
            onClick={() => {
              setOverrides(EMPTY);
              publish(EMPTY);
              localStorage.removeItem(STORAGE_KEY);
              setExported(null);
            }}
            style={btn}
          >
            Alle
          </button>
        </div>

        {exported && (
          <>
            <div style={{ color: '#8b97a5', margin: '8px 0 4px' }}>
              für LanguageContext.tsx · in Zwischenablage
            </div>
            <textarea readOnly value={exported} onFocus={(e) => e.currentTarget.select()} style={{ ...field, height: 130 }} />
          </>
        )}
      </div>
    </>
  );
}
