'use client';

import { Channel } from './types';
import { parseM3U } from './m3u-parser';

const INDEX_URL = 'https://iptv-org.github.io/iptv/index.m3u';

let cachedChannels: Channel[] | null = null;
let cachePromise: Promise<Channel[]> | null = null;

export async function fetchAllChannels(): Promise<Channel[]> {
  if (cachedChannels) return cachedChannels;
  if (cachePromise) return cachePromise;

  cachePromise = fetch(INDEX_URL)
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
      return channels;
    })
    .finally(() => {
      cachePromise = null;
    });

  return cachePromise;
}

export async function clientSearchChannels(query: string): Promise<Channel[]> {
  const channels = await fetchAllChannels();
  const q = query.toLowerCase();
  return channels.filter(
    (ch) =>
      ch.name.toLowerCase().includes(q) ||
      ch.category.toLowerCase().includes(q) ||
      ch.country.toLowerCase().includes(q) ||
      ch.language.toLowerCase().includes(q)
  );
}

export async function getTotalChannelCount(): Promise<number> {
  const channels = await fetchAllChannels();
  return channels.length;
}
