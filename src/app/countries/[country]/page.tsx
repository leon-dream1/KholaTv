import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getChannelsByCountry, getCountryName, getCountryFlag } from '@/lib/channels';
import ChannelCard from '@/components/ChannelCard';

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const channels = await getChannelsByCountry(country);

  if (channels.length === 0) notFound();

  const countryName = getCountryName(country);
  const flag = getCountryFlag(country);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      <div className="mb-4 sm:mb-6">
        <Link href="/" className="text-gray-400 hover:text-white text-xs sm:text-sm">&larr; Back</Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2 flex items-center gap-2">
          <span>{flag}</span>
          <span className="text-red-500">Khola TV</span> {countryName}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">{channels.length} channels</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
        {channels.map((ch) => (
          <ChannelCard key={ch.id} channel={ch} />
        ))}
      </div>
    </div>
  );
}
