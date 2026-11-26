/**
 * Snapshot of the services configured in Usercentrics, for the privacy
 * policy (src/components/lavender/ConsentServices.tsx).
 *
 * The page shows the live list of Usercentrics when the consent script loads
 * in the browser. Where it does not (blocked by the browser, no JavaScript,
 * crawlers), it shows this snapshot instead, so the list is never missing.
 * `npm run build` runs this file first ("prebuild"), so every deploy carries
 * the list as it is in Usercentrics at that moment.
 *
 * The endpoints are the ones the consent script itself calls; they are not a
 * documented API. If one fails or answers in another shape, the committed
 * snapshot stays as it is and the build goes on.
 *
 * Run by hand: node scripts/consent-services.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const SETTINGS_ID = 'gRxSmB1lD'; // the same id as in app/[lang]/layout.tsx
const API = 'https://v1.api.service.cmp.usercentrics.eu/latest';
const OUT = fileURLToPath(new URL('../src/data/consent-services.json', import.meta.url));

async function get(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}

const text = (value) => (typeof value === 'string' ? value.trim() : '');

/** One block of a service's details, as the consent tool shows it. */
function section(raw) {
  const out = { id: text(raw.id), title: text(raw.title) };
  if (text(raw.description)) out.description = text(raw.description);
  const body = raw.body;
  if (body?.type === 'link' && text(body.value)) out.link = text(body.value);
  else if (body?.type === 'text' && text(body.value)) out.text = text(body.value);
  else if (Array.isArray(body?.value)) {
    const items = body.value.map((item) => text(item.label)).filter(Boolean);
    if (items.length) out.items = items;
  }
  return out;
}

/** "What is stored on the device": one line per cookie or storage entry. */
function stored(raw) {
  const entries = (raw?.disclosures ?? [])
    .map((entry) => {
      const facts = (entry.body ?? []).map((fact) => `${text(fact.label)}: ${text(fact.value)}`).join(', ');
      return [text(entry.name), facts && `(${facts})`].filter(Boolean).join(' ');
    })
    .filter(Boolean);
  if (!entries.length) return null;
  const out = { id: 'storedInformation', title: text(raw.title), items: entries };
  if (text(raw.description)) out.description = text(raw.description);
  return out;
}

async function language(lang, type, version) {
  const [cmp, i18n] = await Promise.all([
    get(`${API}/1/cmp/${lang}/${type}/${SETTINGS_ID}/${version}/${version}`),
    get(`${API}/i18n/${lang}/${type}/${SETTINGS_ID}/${version}?theme=uc`),
  ]);
  const categories = cmp.dps.categories;
  // In the order of the consent tool.
  const services = Object.entries(cmp.dps.services).map(([id, service]) => {
    const details = i18n.services[id]?.details;
    if (!details?.genericContent?.length) throw new Error(`no details for ${service.name}`);
    const extra = stored(details.storedInfoContent);
    return {
      id,
      name: text(service.name),
      category: text(categories[service.category]?.name),
      // Essential services load without consent, all others only after it.
      needsConsent: !service.essential,
      sections: [...details.genericContent.map(section), ...(extra ? [extra] : [])],
    };
  });
  if (!services.length) throw new Error('no services');
  return services;
}

async function main() {
  const core = await get(`${API}/core/${SETTINGS_ID}`);
  const type = String(core.cmp?.type ?? 'gdpr').toUpperCase();
  const languages = {};
  for (const lang of core.languages) languages[lang] = await language(lang, type, core.version);
  const next = `${JSON.stringify({ settingsId: SETTINGS_ID, version: core.version, languages }, null, 2)}\n`;
  const before = await readFile(OUT, 'utf8').catch(() => '');
  if (next === before) return console.log(`consent services: unchanged (Usercentrics ${core.version})`);
  await writeFile(OUT, next);
  const count = Object.values(languages)[0].length;
  console.log(`consent services: ${count} services written (Usercentrics ${core.version})`);
}

main().catch((error) => {
  console.warn(`consent services: kept the committed snapshot (${error.message})`);
});
