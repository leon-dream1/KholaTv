'use client';

import { Channel } from './types';
import { parseM3U } from './m3u-parser';

const INDEX_URL = 'https://iptv-org.github.io/iptv/index.m3u';
const CACHE_KEY = 'kholatv_channels';
const CACHE_TIME_KEY = 'kholatv_channels_time';
const CACHE_TTL = 30 * 60 * 1000;

let cachedChannels: Channel[] | null = null;
let cachePromise: Promise<Channel[]> | null = null;

function loadFromStorage(): Channel[] | null {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    const time = localStorage.getItem(CACHE_TIME_KEY);
    if (stored && time && Date.now() - Number(time) < CACHE_TTL) {
      return JSON.parse(stored);
    }
  } catch {}
  return null;
}

function saveToStorage(channels: Channel[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(channels));
    localStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
  } catch {}
}

export async function fetchAllChannels(): Promise<Channel[]> {
  if (cachedChannels) return cachedChannels;

  const stored = loadFromStorage();
  if (stored) {
    cachedChannels = stored;
    return stored;
  }

  if (cachePromise) return cachePromise;

  cachePromise = fetch(INDEX_URL, { cache: 'force-cache' })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch index.m3u');
      return res.text();
    })
    .then((text) => {
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
      cachedChannels = channels;
      saveToStorage(channels);
      return channels;
    })
    .finally(() => {
      cachePromise = null;
    });

  return cachePromise;
}

export function preloadAllChannels(): void {
  if (!cachedChannels && !cachePromise) {
    cachePromise = fetchAllChannels();
  }
}

export function sortChannelsByRegion(channels: Channel[]): Channel[] {
  return [...channels].sort((a, b) => {
    if (a.country === 'BD' && b.country !== 'BD') return -1;
    if (a.country !== 'BD' && b.country === 'BD') return 1;
    if (a.country === 'IN' && b.country !== 'IN') return -1;
    if (a.country !== 'IN' && b.country === 'IN') return 1;
    return 0;
  });
}

export async function getBangladeshiChannels(): Promise<Channel[]> {
  const all = await fetchAllChannels();
  return all.filter((ch) => ch.country === 'BD');
}

export async function getIndianChannels(): Promise<Channel[]> {
  const all = await fetchAllChannels();
  return all.filter((ch) => ch.country === 'IN');
}

export async function clientSearchChannels(query: string): Promise<Channel[]> {
  const channels = await fetchAllChannels();
  const q = query.toLowerCase();
  const filtered = channels.filter(
    (ch) =>
      ch.name.toLowerCase().includes(q) ||
      ch.category.toLowerCase().includes(q) ||
      ch.country.toLowerCase().includes(q) ||
      ch.language.toLowerCase().includes(q)
  );
  return sortChannelsByRegion(filtered);
}

export async function getTotalChannelCount(): Promise<number> {
  const channels = await fetchAllChannels();
  return channels.length;
}
