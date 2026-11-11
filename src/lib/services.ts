import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The studio's consultation list: its kinds, where each session happens, honest price and length
 * terms, who it suits and what the client actually receives — and the two "featured" consultations
 * the first screen offers to visitors who are not sure where to begin.
 *
 * The engine (2.0.0-beta.3) has no service categories, no location field and no per-service metadata,
 * and a service's id is a database UUID this site cannot know when it is built — so everything here is
 * read from the service's own engine data:
 *
 *   1. its KIND, from its NAME against the rules below — first match wins; if the name has no matching
 *      words, its DESCRIPTION; otherwise "More appointments":
 *        - start    Getting started    (discovery, initial, introductory, first, intro)
 *        - follow   Continuing         (follow-up, follow up, second, check-in, review session)
 *        - focused  Focused advice     (styling, colour/color, material, furniture, layout, lighting, consultation…)
 *      An owner-chosen featured service (Website → Not sure where to begin?) is always "start".
 *   2. its FORMAT, from the description's "Format:" part — studio, video or phone, read from its words;
 *      the owner's own sentence is shown as it is;
 *   3. what its LENGTH means (timeTerms): always the conversation itself — never a design project;
 *   4. what its PRICE means (priceTerms): the fee for that one consultation, paid after it, never online;
 *      zero is free; a starting price (`priceFrom`) reads "from";
 *   5. who it is BEST FOR and what the client RECEIVES: the parts after "Best for:" and "You receive:",
 *      split at "·" — written by the owner in Dashboard → Services.
 *
 * Stable categories, locations, project records or deliverables need an engine version — see
 * docs/ENGINE-PROPOSAL-interior-design.md in the Niche Pack workspace.
 */
export type KindId = 'start' | 'focused' | 'follow' | 'more';
export type Role = 'discovery' | 'consult' | 'follow' | 'advice';
export type FormatKind = 'studio' | 'video' | 'phone' | 'other';

/** Content fields that belong to a kind (src/content/site.ts). */
export type KindNote = 'consult.noteStart' | 'consult.noteFocused' | 'consult.noteFollow';

interface KindRule {
  id: KindId;
  label: string;
  note: KindNote | null;
  match: RegExp;
}

const DISCOVERY = /\b(discovery|intro(?:ductory)? call|free call|chat)\b/i;
const START = /\b(discovery|initial|introductory|intro|first|getting started)\b/i;
const FOLLOW = /\b(follow[- ]?ups?|second|check[- ]?in|returning)\b/i;
const FOCUSED = /\b(styling|style|colou?rs?|materials?|finish(?:es)?|furniture|layout|space[- ]planning|lighting|consult\w*|review|advice|session)\b/i;

const RULES: KindRule[] = [
  { id: 'start', label: 'Getting started', note: 'consult.noteStart', match: START },
  { id: 'follow', label: 'Continuing the conversation', note: 'consult.noteFollow', match: FOLLOW },
  { id: 'focused', label: 'Focused design advice', note: 'consult.noteFocused', match: FOCUSED },
];

const MORE = { id: 'more', label: 'More appointments', note: null } as const;

/** The order kinds are shown in. */
const ORDER: KindId[] = ['start', 'focused', 'follow', 'more'];

export interface Kind {
  id: KindId;
  label: string;
  note: KindNote | null;
  services: Service[];
}

const norm = (s: string | null | undefined) => (s ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

/**
 * The owner's own names for the two featured consultations (Website → Not sure where to begin? →
 * "Featured consultation" / "Featured introductory call"), set once per render by App from the published
 * content. Empty = automatic. The engine gives services no build-time-stable key — only a database id the
 * site cannot know — so these explicit, owner-edited names are how a renamed featured service stays one.
 */
export type Featured = 'consult' | 'discovery';
const chosen: Record<Featured, string> = { consult: '', discovery: '' };

export function setFeaturedNames(names: Partial<Record<Featured, string | null | undefined>>): void {
  chosen.consult = norm(names.consult);
  chosen.discovery = norm(names.discovery);
}

function chosenFeature(name: string): Featured | null {
  const n = norm(name);
  if (chosen.consult && n === chosen.consult) return 'consult';
  if (chosen.discovery && n === chosen.discovery) return 'discovery';
  return null;
}

export function kindOf(service: Pick<Service, 'name' | 'description'>): KindRule | typeof MORE {
  if (chosenFeature(service.name)) return RULES[0];
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const { lead } = splitDescription(service.description);
  return RULES.find((rule) => rule.match.test(lead)) ?? MORE;
}

/** What the session is, read from its NAME (the owner's words) and its price. */
export function roleOf(service: Pick<Service, 'name' | 'description'> & { priceCents?: number | null }): Role {
  const feature = chosenFeature(service.name);
  if (feature === 'discovery' || DISCOVERY.test(service.name)) return 'discovery';
  if (feature === 'consult') return 'consult';
  const kind = kindOf(service).id;
  if (kind === 'start') return 'consult';
  if (kind === 'follow') return 'follow';
  return 'advice';
}

/** Kept for the shared booking flow: consultations carry no size, so the name always comes back whole. */
export function splitName(name: string): { base: string; size: string | null } {
  return { base: name, size: null };
}

/** Services in their kinds, keeping the owner's display order inside each; empty kinds are left out. */
export function kinds(services: readonly Service[]): Kind[] {
  const map = new Map<KindId, Kind>();
  for (const service of services) {
    const rule = kindOf(service);
    let k = map.get(rule.id);
    if (!k) {
      k = { id: rule.id, label: rule.label, note: rule.note, services: [] };
      map.set(rule.id, k);
    }
    k.services.push(service);
  }
  return ORDER.flatMap((id) => (map.has(id) ? [map.get(id)!] : []));
}

/**
 * A featured consultation — what the first screen's "Not sure where to begin?" offers — read from the
 * engine's CURRENT services (so its length and price are always live), never a hard-coded id or price:
 *   1. the service the owner named in Website (exact name, ignoring case and spaces) — survives any rename;
 *   2. otherwise, by name: for 'discovery' a free introductory call (discovery / intro call); for
 *      'consult' an initial / first / introductory consultation that is not a call;
 *   3. otherwise none — deleted, hidden or renamed without telling the site: the link then offers
 *      "See all consultations" and no name, length or price is shown. An unrelated service is never chosen.
 */
export function featuredService(services: readonly Service[], which: Featured, chosenName?: string | null): Service | null {
  const wanted = norm(chosenName);
  if (wanted) {
    const named = services.find((s) => norm(s.name) === wanted);
    if (named) return named;
  }
  if (which === 'discovery') {
    return services.find((s) => DISCOVERY.test(s.name) && !chosenFeature(s.name)) ?? null;
  }
  return (
    services.find((s) => /\b(initial|first|introductory)\b/i.test(s.name) && /consult/i.test(s.name) && !DISCOVERY.test(s.name) && !chosenFeature(s.name)) ??
    null
  );
}

/** The service with exactly this name (case and spaces ignored) — the owner's own mapping, or none. */
export function serviceNamed(services: readonly Service[], name: string | null | undefined): Service | null {
  const wanted = norm(name);
  if (!wanted) return null;
  return services.find((s) => norm(s.name) === wanted) ?? null;
}

export interface Described {
  lead: string;
  /** The owner's own sentence after "Format:", or null. */
  format: string | null;
  bestFor: string[];
  receive: string[];
  /** Kept for the shared booking flow's wording. */
  level: string[];
  includes: string[];
  suits: string[];
}

/**
 * "A focused first conversation… Format: At the studio. Best for: a · b. You receive: c · d" →
 * { lead, format: "At the studio", bestFor: [a, b], receive: [c, d] }.
 * "For:", "Suits:" and "Good for:" read as Best for; "Includes:" and "Included:" as You receive.
 * Without markers the whole description is the lead.
 */
export function splitDescription(description: string | null | undefined): Described {
  const text = (description ?? '').trim();
  const marker = /(?:^|[\s.])(format|location|where|best for|good for|suits|for|you receive|you'll receive|you’ll receive|receive|includes|included)\s*:\s*/gi;
  const marks: { key: 'format' | 'bestFor' | 'receive'; start: number; end: number }[] = [];
  for (let m = marker.exec(text); m; m = marker.exec(text)) {
    const word = m[1].toLowerCase();
    const key = /format|location|where/.test(word) ? 'format' : /receive|includ/.test(word) ? 'receive' : 'bestFor';
    marks.push({ key, start: m.index + (m[0].startsWith('.') ? 1 : 0), end: m.index + m[0].length });
  }
  const empty = { format: null, bestFor: [], receive: [], level: [], includes: [], suits: [] };
  if (marks.length === 0) return { lead: text, ...empty };
  const lead = text.slice(0, marks[0].start).trim();
  let format: string | null = null;
  const lists = { bestFor: [] as string[], receive: [] as string[] };
  marks.forEach((mark, i) => {
    const chunk = text.slice(mark.end, i + 1 < marks.length ? marks[i + 1].start : undefined).trim();
    if (mark.key === 'format') {
      format = chunk.replace(/\.$/, '').trim() || null;
      return;
    }
    lists[mark.key].push(
      ...chunk
        .split(/\s*[·•;]\s*|\s+\|\s+/)
        .map((item) => item.trim().replace(/\.$/, ''))
        .filter(Boolean),
    );
  });
  return { lead, format, bestFor: lists.bestFor, receive: lists.receive, level: lists.bestFor, includes: lists.receive, suits: lists.bestFor };
}

/** Where the session happens, from the owner's "Format:" words: studio, video, phone — or other / unknown. */
export function formatOf(service: Pick<Service, 'description'>): { kind: FormatKind; label: string } | null {
  const { format } = splitDescription(service.description);
  if (!format) return null;
  const kind: FormatKind = /\bvideo|zoom|online|virtual|remote\b/i.test(format)
    ? 'video'
    : /\bphone|call\b/i.test(format)
      ? 'phone'
      : /\bstudio\b/i.test(format)
        ? 'studio'
        : 'other';
  const short = { studio: 'At the studio', video: 'Video call', phone: 'Phone call', other: format.split(/\s[—–-]\s/)[0] }[kind];
  return { kind, label: short };
}

/** "45 min", "1 h 30 min", "2 h" — the session's length, straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/**
 * What the booking's LENGTH means: always the real length of one conversation with the designer —
 * never the time a design project takes.
 */
export interface TimeTerms {
  role: Role;
  /** Small label before the length. */
  label: string;
  /** One honest line under the length, or null. */
  note: string | null;
}

export function timeTerms(service: Pick<Service, 'name' | 'description'>): TimeTerms {
  const role = roleOf(service);
  if (role === 'discovery') return { role, label: 'Call', note: 'An introduction — not a design consultation' };
  if (role === 'follow') return { role, label: 'Session', note: 'After an earlier consultation' };
  return { role, label: 'Session', note: null };
}

type PriceInput = Pick<Service, 'priceCents' | 'priceFrom' | 'currency' | 'name'>;

/** Whole dollars print without ".00" — "$185", not "$185.00". */
const money = (cents: number, currency: string, locale: string) => formatMoney(cents, currency, locale).replace(/([.,])00(?!\d)/, '');

/**
 * What the engine's price MEANS on this site (src/lib/preset.ts):
 *   free    → no charge for this call
 *   from    → a starting price; the studio confirms it before the session
 *   fixed   → the fee for this one consultation, paid after it — not online
 *   request → no price shown: ask the studio
 */
export interface PriceTerms {
  kind: 'free' | 'from' | 'fixed' | 'request';
  label: string;
  amount: string;
  note: string | null;
}

export function priceTerms(service: PriceInput, locale: string): PriceTerms {
  if (service.priceCents === null) return { kind: 'request', label: 'Fee', amount: 'Ask the studio', note: null };
  if (service.priceCents === 0) return { kind: 'free', label: 'Fee', amount: 'Free', note: 'No charge' };
  const amount = money(service.priceCents, service.currency, locale);
  if (service.priceFrom) return { kind: 'from', label: 'From', amount, note: 'Confirmed with you before the session' };
  return { kind: 'fixed', label: 'Fee', amount, note: null };
}

/** One line: "$185", "from $185", "Free", "Ask the studio". */
export function priceLabel(service: PriceInput, locale: string): string {
  const t = priceTerms(service, locale);
  if (t.kind === 'from') return `from ${t.amount}`;
  return t.amount;
}
