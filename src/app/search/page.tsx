'use client';

import { use, Suspense } from 'react';
import React from 'react';
import ChannelCard from '@/components/ChannelCard';
import { Channel } from '@/lib/types';
import { clientSearchChannels } from '@/lib/client-channels';

function SearchResults({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = use(searchParams);

  if (!q) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Type something in the search bar to find channels</p>
      </div>
    );
  }

  return <ChannelList query={q} />;
}

function ChannelList({ query }: { query: string }) {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    clientSearchChannels(query).then((results) => {
      setChannels(results);
      setLoading(false);
    });
  }, [query]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-400 mt-4">Searching {query ? `for "${query}"` : '...'}</p>
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">No channels found for &ldquo;{query}&rdquo;</p>
        <p className="text-gray-600 text-sm mt-2">Try searching for &ldquo;sports&rdquo;, &ldquo;news&rdquo;, or a country name</p>
      </div>
    );
  }

  return (
    <>
      <p className="text-gray-400 mt-1 mb-6">
        {channels.length.toLocaleString()} result{channels.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {channels.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </>
  );
}

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">
          <span className="text-red-500">Khola TV</span> Search Results
        </h1>
      </div>
      <Suspense fallback={
        <div className="text-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto" />
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      }>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
