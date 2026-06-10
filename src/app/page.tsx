import Link from 'next/link';
import { getCategories, getCountries, getChannelsByCategory, getChannelsByCountry } from '@/lib/channels';
import ChannelCard from '@/components/ChannelCard';

export default async function Home() {
  const [categories, countries, sportsChannels, bdChannels, inChannels] = await Promise.all([
    getCategories(),
    getCountries(),
    getChannelsByCategory('sports'),
    getChannelsByCountry('bd'),
    getChannelsByCountry('in'),
  ]);

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
          {bdChannels.slice(0, 16).map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      </section>

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
          {inChannels.slice(0, 16).map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      </section>

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
          {sportsChannels.slice(0, 16).map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Browse by <span className="text-red-500">Category</span>
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/channels/${cat.key}`}
              className="shrink-0 bg-gray-800/80 hover:bg-gray-700 border border-gray-700/50 hover:border-red-500 rounded-xl p-3 sm:p-4 text-center transition-all min-w-[90px] sm:min-w-[100px]"
            >
              <div className="text-xl sm:text-2xl mb-1">
                {cat.key === 'sports' && '⚽'}
                {cat.key === 'news' && '📰'}
                {cat.key === 'entertainment' && '🎬'}
                {cat.key === 'music' && '🎵'}
                {cat.key === 'movies' && '🎥'}
                {cat.key === 'kids' && '🧒'}
                {cat.key === 'documentary' && '📺'}
                {cat.key === 'religious' && '🕊️'}
                {cat.key === 'education' && '📚'}
                {cat.key === 'business' && '💼'}
                {cat.key === 'general' && '📡'}
                {cat.key === 'lifestyle' && '🌟'}
                {cat.key === 'science' && '🔬'}
                {cat.key === 'travel' && '✈️'}
                {cat.key === 'art' && '🎨'}
                {cat.key === 'series' && '📺'}
                {cat.key === 'anime' && '🎭'}
                {cat.key === 'shop' && '🛒'}
              </div>
              <h3 className="text-white font-semibold text-[10px] sm:text-xs truncate">{cat.name}</h3>
              <p className="text-gray-500 text-[9px] sm:text-[10px]">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Browse by <span className="text-red-500">Country</span>
          </h2>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {countries.map((c) => (
            <Link
              key={c.code}
              href={`/countries/${c.code.toLowerCase()}`}
              className={`bg-gray-800/80 hover:bg-gray-700 border rounded-lg p-2 sm:p-2.5 text-center transition-all ${
                c.code === 'BD'
                  ? 'border-red-500/50 hover:border-red-500 bg-red-900/10'
                  : c.code === 'IN'
                  ? 'border-orange-500/50 hover:border-orange-500 bg-orange-900/10'
                  : 'border-gray-700/50 hover:border-gray-500'
              }`}
            >
              <span className="text-xl sm:text-2xl">{c.flag}</span>
              <h3 className="text-white text-[10px] sm:text-xs font-medium mt-0.5 truncate">{c.name}</h3>
              <p className="text-gray-500 text-[8px] sm:text-[10px]">{c.count}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
