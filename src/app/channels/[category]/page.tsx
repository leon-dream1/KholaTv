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

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/" className="text-gray-400 hover:text-white text-sm">&larr; Back to Home</Link>
        <h1 className="text-3xl font-bold text-white mt-2">
          <span className="text-red-500">Khola TV</span> {catName} Channels
        </h1>
        <p className="text-gray-400 mt-1">{channels.length} channels available &mdash; by MD Leon</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {channels.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </div>
  );
}
