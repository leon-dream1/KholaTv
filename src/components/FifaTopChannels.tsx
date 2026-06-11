'use client';

import Image from 'next/image';
import Link from 'next/link';
import { fifaBroadcasters } from '@/lib/fifa';

interface Props {
  baseUrl?: string;
  selectedChannelId?: string;
}

export default function FifaTopChannels({ baseUrl = '/watch', selectedChannelId }: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4">
      {fifaBroadcasters.map(channel => {
        const href = baseUrl === '/watch/fifa' 
          ? `/watch/fifa?channelId=${channel.id}` 
          : `/watch/${channel.id}?url=${encodeURIComponent(channel.url)}&name=${encodeURIComponent(channel.name)}&logo=${encodeURIComponent(channel.logo)}`;
        const isSelected = selectedChannelId === channel.id;

        return (
          <Link
            key={channel.id}
            href={href}
            prefetch={false}
            className={`group block bg-gray-800/80 rounded-xl overflow-hidden border ${isSelected ? 'border-red-500 shadow-lg shadow-red-500/20' : 'border-gray-700/50 hover:border-red-500'} transition-all hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]`}
          >
            <div className="aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden flex items-center justify-center">
              {channel.logo ? (
                <Image
                  src={channel.logo}
                  alt={channel.name}
                  width={80}
                  height={80}
                  className="object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  loading="lazy"
                  unoptimized
                />
              ) : (
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-600/30 to-red-800/30 rounded-full flex items-center justify-center">
                  <span className="text-red-400 font-bold text-xl sm:text-2xl">
                    {channel.name.charAt(0)}
                  </span>
                </div>
              )}
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
                🏆 World Cup
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
