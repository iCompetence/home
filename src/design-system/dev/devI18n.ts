import { translations } from '@/contexts/LanguageContext';

/** value → key(s); a value may legitimately map to several keys. */
export const REVERSE: Map<string, string[]> = (() => {
  const m = new Map<string, string[]>();
  for (const [key, langs] of Object.entries(translations)) {
    for (const v of Object.values(langs as Record<string, string>)) {
      if (typeof v !== 'string') continue;
      const norm = v.replace(/\s+/g, ' ').trim();
      if (!norm) continue;
      const list = m.get(norm) ?? [];
      list.push(key);
      m.set(norm, list);
    }
  }
  return m;
})();

export const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

/** The i18n key for a piece of copy, or null when it is not localised yet. */
export function keyForText(text: string): string | null {
  return REVERSE.get(norm(text))?.[0] ?? null;
}
