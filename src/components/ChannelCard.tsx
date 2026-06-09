import Link from 'next/link';
import { Channel } from '@/lib/types';

interface Props {
  channel: Channel;
}

export default function ChannelCard({ channel }: Props) {
  return (
    <Link
      href={`/watch/${encodeURIComponent(channel.id)}?url=${encodeURIComponent(channel.url)}&name=${encodeURIComponent(channel.name)}&logo=${encodeURIComponent(channel.logo)}`}
      className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1"
    >
      <div className="aspect-video bg-gray-900 relative overflow-hidden flex items-center justify-center">
        {channel.logo ? (
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-20 h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
            <span className="text-red-500 font-bold text-2xl">
              {channel.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Live
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-white text-sm font-medium truncate group-hover:text-red-400 transition-colors">
          {channel.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1 truncate">{channel.category}</p>
      </div>
    </Link>
  );
}
