import Link from 'next/link';
import { Channel } from '@/lib/types';
import { getCountryFlag } from '@/lib/channels';

interface Props {
  channel: Channel;
}

export default function ChannelCard({ channel }: Props) {
  const flag = channel.country ? getCountryFlag(channel.country) : '';

  return (
    <Link
      href={`/watch/${encodeURIComponent(channel.id)}?url=${encodeURIComponent(channel.url)}&name=${encodeURIComponent(channel.name)}&logo=${encodeURIComponent(channel.logo)}`}
      className="group block bg-gray-800/80 rounded-xl overflow-hidden border border-gray-700/50 hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 active:scale-[0.98]"
    >
      <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
        {channel.logo ? (
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600/30 to-red-800/30 rounded-full flex items-center justify-center">
            <span className="text-red-400 font-bold text-xl sm:text-2xl">
              {channel.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {flag && (
            <span className="text-xs drop-shadow-lg">{flag}</span>
          )}
        </div>
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1 live-pulse">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
          LIVE
        </div>
      </div>
      <div className="p-2.5 sm:p-3">
        <h3 className="text-white text-xs sm:text-sm font-medium truncate group-hover:text-red-400 transition-colors">
          {channel.name}
        </h3>
        <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 truncate flex items-center gap-1">
          {flag && <span>{flag}</span>}
          {channel.category || channel.country}
        </p>
      </div>
    </Link>
  );
}
