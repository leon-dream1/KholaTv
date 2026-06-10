import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getChannelsByCategory, getCategoryDisplayName, getCategories } from '@/lib/channels';
import ChannelCard from '@/components/ChannelCard';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({ category: cat.key }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const channels = await getChannelsByCategory(category);
  const catName = getCategoryDisplayName(category);

  if (channels.length === 0) notFound();

  const sorted = [...channels].sort((a, b) => {
    if (a.country === 'BD' && b.country !== 'BD') return -1;
    if (a.country !== 'BD' && b.country === 'BD') return 1;
    if (a.country === 'IN' && b.country !== 'IN') return -1;
    if (a.country !== 'IN' && b.country === 'IN') return 1;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="mb-4 sm:mb-6">
        <Link href="/" className="text-gray-400 hover:text-white text-xs sm:text-sm">&larr; Back</Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">
          <span className="text-red-500">Khola TV</span> {catName}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">{channels.length} channels</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
        {sorted.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </div>
  );
}
