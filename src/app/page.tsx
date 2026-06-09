import Link from 'next/link';
import { getCategories, getCountries, getChannelsByCategory } from '@/lib/channels';
import ChannelCard from '@/components/ChannelCard';

export default async function Home() {
  const [categories, countries, sportsChannels] = await Promise.all([
    getCategories(),
    getCountries(),
    getChannelsByCategory('sports'),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white"><span className="text-red-500">Khola TV</span> Live Channels</h1>
          <Link href="/channels/sports" className="text-red-500 hover:text-red-400 text-sm font-medium">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {sportsChannels.slice(0, 16).map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Browse by <span className="text-red-500">Category</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.slice(0, 18).map((cat) => (
            <Link
              key={cat.key}
              href={`/channels/${cat.key}`}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500 rounded-xl p-5 text-center transition-all group"
            >
              <div className="text-3xl mb-2">
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
              <h3 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-xs mt-1">{cat.count} channels</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Browse by <span className="text-red-500">Country</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {countries.slice(0, 24).map((c) => (
            <Link
              key={c.code}
              href={`/countries/${c.code.toLowerCase()}`}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-red-500 rounded-lg p-3 text-center transition-all"
            >
              <span className="text-2xl">{c.flag}</span>
              <h3 className="text-white text-sm font-medium mt-1 truncate">{c.name}</h3>
              <p className="text-gray-500 text-xs">{c.count} channels</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
