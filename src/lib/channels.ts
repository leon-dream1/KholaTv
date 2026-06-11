import { Channel } from './types';
import { parseM3U } from './m3u-parser';

const BASE_URL = 'https://iptv-org.github.io/iptv';

export const KNOWN_CATEGORIES = [
  'sports', 'news', 'entertainment', 'music', 'movies', 'documentary',
  'kids', 'religious', 'education', 'business', 'general', 'lifestyle',
  'science', 'shop', 'travel', 'art', 'series', 'anime',
];

const CATEGORY_DISPLAY: Record<string, string> = {
  sports: 'Sports', news: 'News', entertainment: 'Entertainment',
  music: 'Music', movies: 'Movies', documentary: 'Documentary',
  kids: 'Kids', religious: 'Religious', education: 'Education',
  business: 'Business', general: 'General', lifestyle: 'Lifestyle',
  science: 'Science', shop: 'Shopping', travel: 'Travel',
  art: 'Art', series: 'Series', anime: 'Anime',
};

const COUNTRY_NAMES: Record<string, string> = {
  BD: 'Bangladesh', IN: 'India', US: 'United States', GB: 'United Kingdom',
  CA: 'Canada', AU: 'Australia', PK: 'Pakistan', NP: 'Nepal',
  LK: 'Sri Lanka', MY: 'Malaysia', SG: 'Singapore',
  SA: 'Saudi Arabia', AE: 'UAE', QA: 'Qatar', OM: 'Oman',
  BH: 'Bahrain', KW: 'Kuwait', JO: 'Jordan', EG: 'Egypt',
  TR: 'Turkey', IR: 'Iran', IQ: 'Iraq', IL: 'Israel',
  LB: 'Lebanon', YE: 'Yemen', SY: 'Syria', DE: 'Germany',
  FR: 'France', IT: 'Italy', ES: 'Spain', PT: 'Portugal',
  NL: 'Netherlands', BE: 'Belgium', CH: 'Switzerland', AT: 'Austria',
  SE: 'Sweden', NO: 'Norway', DK: 'Denmark', FI: 'Finland',
  RU: 'Russia', JP: 'Japan', CN: 'China', KR: 'South Korea',
  BR: 'Brazil', AR: 'Argentina', MX: 'Mexico',
  ZA: 'South Africa', NG: 'Nigeria', KE: 'Kenya', GH: 'Ghana',
};

const FLAG_MAP: Record<string, string> = {
  BD: '🇧🇩', IN: '🇮🇳', US: '🇺🇸', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺',
  PK: '🇵🇰', NP: '🇳🇵', LK: '🇱🇰', MY: '🇲🇾', SG: '🇸🇬',
  SA: '🇸🇦', AE: '🇦🇪', QA: '🇶🇦', OM: '🇴🇲', BH: '🇧🇭', KW: '🇰🇼',
  JO: '🇯🇴', EG: '🇪🇬', TR: '🇹🇷', IR: '🇮🇷', IQ: '🇮🇶', IL: '🇮🇱',
  LB: '🇱🇧', YE: '🇾🇪', SY: '🇸🇾', DE: '🇩🇪', FR: '🇫🇷', IT: '🇮🇹',
  ES: '🇪🇸', PT: '🇵🇹', NL: '🇳🇱', BE: '🇧🇪', CH: '🇨🇭', AT: '🇦🇹',
  SE: '🇸🇪', NO: '🇳🇴', DK: '🇩🇰', FI: '🇫🇮', RU: '🇷🇺', JP: '🇯🇵',
  CN: '🇨🇳', KR: '🇰🇷', BR: '🇧🇷', AR: '🇦🇷', MX: '🇲🇽',
  ZA: '🇿🇦', NG: '🇳🇬', KE: '🇰🇪', GH: '🇬🇭',
};

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 60 * 60 * 1000;

const PENDING = new Map<string, Promise<unknown>>();

async function cachedFetch<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data as T;

  if (PENDING.has(key)) return PENDING.get(key) as Promise<T>;

  const promise = fetcher()
    .then((data) => {
      cache.set(key, { data, timestamp: Date.now() });
      PENDING.delete(key);
      return data;
    })
    .catch((err) => {
      PENDING.delete(key);
      throw err;
    });
  PENDING.set(key, promise);
  return promise;
}

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code;
}

export function getCountryFlag(code: string): string {
  return FLAG_MAP[code.toUpperCase()] || '🌍';
}

export function getCategoryDisplayName(key: string): string {
  return CATEGORY_DISPLAY[key.toLowerCase()] || key.charAt(0).toUpperCase() + key.slice(1);
}

function parseChannels(text: string): Channel[] {
  const parsed = parseM3U(text);
  return parsed.map((ch, i) => ({
    id: `${ch.tvgId || ch.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${i}`,
    name: ch.name,
    url: ch.url,
    logo: ch.logo,
    category: ch.groupTitle,
    country: ch.tvgCountry,
    language: ch.tvgLanguage,
    tvgId: ch.tvgId,
  }));
}

async function fetchM3U(path: string): Promise<Channel[]> {
  return cachedFetch(`m3u:${path}`, async () => {
    const url = `${BASE_URL}${path}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const text = await res.text();
    return parseChannels(text);
  }) as Promise<Channel[]>;
}

async function fetchCount(path: string): Promise<number> {
  return cachedFetch(`count:${path}`, async () => {
    const channels = await fetchM3U(path);
    return channels.length;
  }) as Promise<number>;
}

export async function getChannelsByCategory(category: string): Promise<Channel[]> {
  return fetchM3U(`/categories/${category.toLowerCase()}.m3u`);
}

export async function getChannelsByCountry(country: string): Promise<Channel[]> {
  return fetchM3U(`/countries/${country.toLowerCase()}.m3u`);
}

export async function getCategories(): Promise<{ name: string; key: string; count: number }[]> {
  const counts = await Promise.all(
    KNOWN_CATEGORIES.map(async (key) => {
      try {
        const count = await fetchCount(`/categories/${key}.m3u`);
        return { name: getCategoryDisplayName(key), key, count };
      } catch {
        return { name: getCategoryDisplayName(key), key, count: 0 };
      }
    })
  );
  return counts.filter((c) => c.count > 0).sort((a, b) => b.count - a.count);
}

export async function getCountries(): Promise<{ code: string; name: string; count: number; flag: string }[]> {
  const codes = ['BD', 'IN', 'US', 'GB', 'CA', 'AU', 'PK', 'NP', 'SA', 'AE',
    'DE', 'FR', 'IT', 'ES', 'NL', 'RU', 'JP', 'CN', 'KR', 'BR', 'AR', 'MX',
    'ZA', 'NG', 'TR', 'EG', 'MY', 'SG', 'LK', 'KE', 'GH'];

  const results = await Promise.allSettled(
    codes.map(async (code) => {
      const count = await fetchCount(`/countries/${code.toLowerCase()}.m3u`);
      return { code, name: COUNTRY_NAMES[code], count, flag: FLAG_MAP[code] || '🌍' };
    })
  );

  const valid = results
    .filter((r): r is PromiseFulfilledResult<{ code: string; name: string; count: number; flag: string }> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((c) => c.count > 0);

  return valid.sort((a, b) => {
    if (a.code === 'BD') return -1;
    if (b.code === 'BD') return 1;
    if (a.code === 'IN') return -1;
    if (b.code === 'IN') return 1;
    return b.count - a.count;
  });
}

export async function searchChannels(query: string): Promise<Channel[]> {
  const q = query.toLowerCase();
  const results = await Promise.all(
    KNOWN_CATEGORIES.map(async (key) => {
      try {
        const channels = await fetchM3U(`/categories/${key}.m3u`);
        return channels.filter(
          (ch) =>
            ch.name.toLowerCase().includes(q) ||
            ch.category.toLowerCase().includes(q) ||
            ch.country.toLowerCase().includes(q) ||
            ch.language.toLowerCase().includes(q)
        );
      } catch {
        return [] as Channel[];
      }
    })
  );
  return results.flat();
}
