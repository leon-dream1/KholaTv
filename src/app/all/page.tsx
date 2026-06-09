'use client';

import React from 'react';
import { fetchAllChannels } from '@/lib/client-channels';
import ChannelCard from '@/components/ChannelCard';
import { Channel } from '@/lib/types';

export default function AllChannelsPage() {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [displayCount, setDisplayCount] = React.useState(48);

  React.useEffect(() => {
    fetchAllChannels().then((all) => {
      setChannels(all);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-400 mt-4">Loading all channels...</p>
        <p className="text-gray-600 text-sm mt-2">Khola TV by MD Leon &mdash; Fetching from iptv-org (84,000+ channels)</p>
      </div>
    );
  }

  const visible = channels.slice(0, displayCount);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-red-500">Khola TV</span> All Channels
        </h1>
        <p className="text-gray-400 mt-1">{channels.length.toLocaleString()} channels total</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {visible.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>

      {displayCount < channels.length && (
        <div className="text-center mt-8">
          <button
            onClick={() => setDisplayCount((prev) => prev + 48)}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Load More ({Math.min(48, channels.length - displayCount)})
          </button>
        </div>
      )}
    </div>
  );
}
