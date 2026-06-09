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

const cache = new Map<string, { data: Channel[]; timestamp: number }>();
const CACHE_TTL = 10 * 60 * 1000;

export function getCountryName(code: string): string {
  return COUNTRY_NAMES[code.toUpperCase()] || code;
}

export function getCountryFlag(code: string): string {
  return FLAG_MAP[code.toUpperCase()] || '🌍';
}

export function getCategoryDisplayName(key: string): string {
  return CATEGORY_DISPLAY[key.toLowerCase()] || key.charAt(0).toUpperCase() + key.slice(1);
}

async function fetchM3U(path: string): Promise<Channel[]> {
  const cached = cache.get(path);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);

  const text = await res.text();
  const parsed = parseM3U(text);

  const channels: Channel[] = parsed.map((ch, i) => ({
    id: `${ch.tvgId || ch.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${i}`,
    name: ch.name,
    url: ch.url,
    logo: ch.logo,
    category: ch.groupTitle,
    country: ch.tvgCountry,
    language: ch.tvgLanguage,
    tvgId: ch.tvgId,
  }));

  cache.set(path, { data: channels, timestamp: Date.now() });
  return channels;
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
        const channels = await fetchM3U(`/categories/${key}.m3u`);
        return { name: getCategoryDisplayName(key), key, count: channels.length };
      } catch {
        return { name: getCategoryDisplayName(key), key, count: 0 };
      }
    })
  );
  return counts.filter((c) => c.count > 0).sort((a, b) => b.count - a.count);
}

const ALL_COUNTRY_CODES = Object.keys(COUNTRY_NAMES);

export async function getCountries(): Promise<{ code: string; name: string; count: number; flag: string }[]> {
  const counts = await Promise.all(
    ALL_COUNTRY_CODES.map(async (code) => {
      try {
        const channels = await fetchM3U(`/countries/${code.toLowerCase()}.m3u`);
        return {
          code,
          name: COUNTRY_NAMES[code],
          count: channels.length,
          flag: FLAG_MAP[code] || '🌍',
        };
      } catch {
        return null;
      }
    })
  );
  return counts.filter((c): c is NonNullable<typeof c> => c !== null && c.count > 0)
    .sort((a, b) => b.count - a.count);
}

const SEARCH_CATEGORIES = ['sports', 'news', 'entertainment', 'general', 'music', 'movies', 'documentary'];

export async function searchChannels(query: string): Promise<Channel[]> {
  const q = query.toLowerCase();
  const results = await Promise.all(
    SEARCH_CATEGORIES.map(async (key) => {
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
