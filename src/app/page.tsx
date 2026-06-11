import Link from 'next/link';
import { Suspense } from 'react';
import { getChannelsByCategory, getChannelsByCountry } from '@/lib/channels';
import ChannelCard from '@/components/ChannelCard';
import FifaHeroBanner from '@/components/FifaHeroBanner';
import FifaTopChannels from '@/components/FifaTopChannels';

function SectionSkeleton() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden">
          <div className="aspect-video skeleton" />
          <div className="p-3 space-y-2">
            <div className="h-3 skeleton rounded w-3/4" />
            <div className="h-2 skeleton rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function BDSection() {
  const channels = await getChannelsByCountry('bd');
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span>🇧🇩</span> Bangladesh
        </h2>
        <Link href="/countries/bd" className="text-red-500 hover:text-red-400 text-xs sm:text-sm font-medium">
          View All &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
        {channels.slice(0, 16).map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </section>
  );
}

async function INSection() {
  const channels = await getChannelsByCountry('in');
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <span>🇮🇳</span> India
        </h2>
        <Link href="/countries/in" className="text-red-500 hover:text-red-400 text-xs sm:text-sm font-medium">
          View All &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
        {channels.slice(0, 16).map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </section>
  );
}

async function SportsSection() {
  const channels = await getChannelsByCategory('sports');
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          ⚽ Sports
        </h2>
        <Link href="/channels/sports" className="text-red-500 hover:text-red-400 text-xs sm:text-sm font-medium">
          View All &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
        {channels.slice(0, 16).map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            <span className="text-red-500">Khola TV</span>
          </h1>
          <p className="text-gray-400 text-sm">84,000+ Live TV Channels</p>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar pb-1">
          <Link href="/countries/bd" className="shrink-0 flex items-center gap-1.5 bg-red-600/20 border border-red-600/30 text-red-400 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-red-600/30 transition-colors">
            🇧🇩 BD
          </Link>
          <Link href="/countries/in" className="shrink-0 flex items-center gap-1.5 bg-orange-600/20 border border-orange-600/30 text-orange-400 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-orange-600/30 transition-colors">
            🇮🇳 India
          </Link>
          <Link href="/channels/sports" className="shrink-0 bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
            ⚽ Sports
          </Link>
          <Link href="/channels/news" className="shrink-0 bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
            📰 News
          </Link>
          <Link href="/channels/entertainment" className="shrink-0 bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
            🎬 Entertainment
          </Link>
          <Link href="/all" className="shrink-0 bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors">
            📺 All
          </Link>
        </div>
      </div>

      <FifaHeroBanner />

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <span className="text-red-500">🔴</span> LIVE WORLD CUP CHANNELS
          </h2>
        </div>
        <FifaTopChannels />
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <BDSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <INSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <SportsSection />
      </Suspense>
    </div>
  );
}
