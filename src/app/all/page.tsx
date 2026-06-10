'use client';

import React from 'react';
import Link from 'next/link';
import { fetchAllChannels, sortChannelsByRegion } from '@/lib/client-channels';
import ChannelCard from '@/components/ChannelCard';
import { Channel } from '@/lib/types';

export default function AllChannelsPage() {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [displayCount, setDisplayCount] = React.useState(48);
  const [filter, setFilter] = React.useState<'all' | 'bd' | 'in'>('all');

  React.useEffect(() => {
    fetchAllChannels().then((all) => {
      setChannels(sortChannelsByRegion(all));
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? channels : channels.filter((ch) => ch.country === (filter === 'bd' ? 'BD' : 'IN'));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 mt-4">Loading all channels...</p>
      </div>
    );
  }

  const visible = filtered.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          <span className="text-red-500">Khola TV</span> All Channels
        </h1>
        <p className="text-gray-400 text-sm mt-1">{channels.length.toLocaleString()} channels total</p>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => { setFilter('all'); setDisplayCount(48); }}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🌍 All ({channels.length.toLocaleString()})
        </button>
        <button
          onClick={() => { setFilter('bd'); setDisplayCount(48); }}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'bd' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🇧🇩 Bangladesh ({channels.filter(c => c.country === 'BD').length.toLocaleString()})
        </button>
        <button
          onClick={() => { setFilter('in'); setDisplayCount(48); }}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === 'in' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          🇮🇳 India ({channels.filter(c => c.country === 'IN').length.toLocaleString()})
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
        {visible.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>

      {displayCount < filtered.length && (
        <div className="text-center mt-6 sm:mt-8">
          <button
            onClick={() => setDisplayCount((prev) => prev + 48)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base active:scale-95"
          >
            Load More ({Math.min(48, filtered.length - displayCount)})
          </button>
        </div>
      )}
    </div>
  );
}
