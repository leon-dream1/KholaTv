'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FifaMatch, Broadcaster } from '@/lib/fifa';

interface Props {
  match: FifaMatch;
}

export default function FifaMatchCard({ match }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  const isLive = match.status === 'live';
  
  const startDate = new Date(match.startTime);
  const dateStr = startDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeStr = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleWatchClick = () => {
    if (isLive) {
      setShowOptions(true);
    }
  };

  return (
    <>
      <div 
        className={`flex border-b border-gray-800/50 py-4 ${isLive ? 'cursor-pointer hover:bg-gray-800/30 transition-colors' : ''}`}
        onClick={handleWatchClick}
      >
        {/* Left Side: Group, Teams */}
        <div className="w-1/2 pr-4 border-r border-gray-800/50">
          <div className="text-xs text-gray-500 font-bold mb-3">{match.group}</div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-md leading-none">{match.homeFlag}</span>
              <span className="text-sm font-bold text-white">{match.homeTeam}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl drop-shadow-md leading-none">{match.awayFlag}</span>
              <span className="text-sm font-bold text-white">{match.awayTeam}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Time, Badges */}
        <div className="w-1/2 pl-4 flex flex-col justify-center items-center">
          <div className="text-xs font-bold text-gray-300 mb-1">{dateStr}</div>
          <div className="text-sm font-bold text-white mb-3">{timeStr}</div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {match.broadcasters.slice(0, 1).map(b => (
              <span key={b.id} className="text-[10px] text-blue-400 bg-blue-900/30 border border-blue-800/50 px-2 py-1 rounded-full font-bold">
                {b.name}
              </span>
            ))}
            {match.broadcasters.length > 1 && (
              <span className="text-[10px] text-gray-400 bg-gray-800 px-2 py-1 rounded-full font-bold">
                +{match.broadcasters.length - 1} More
              </span>
            )}
          </div>
          
          {isLive && (
            <div className="mt-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Live</span>
            </div>
          )}
        </div>
      </div>

      {/* Multiple TV Options Modal */}
      {showOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0b132c] border border-gray-700 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Choose TV Channel</h3>
              <button onClick={() => setShowOptions(false)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              {match.broadcasters.map((b) => (
                <Link
                  key={b.id}
                  href={`/watch/${b.id}?url=${encodeURIComponent(b.url)}&name=${encodeURIComponent(b.name)}&logo=${encodeURIComponent(b.logo)}`}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-blue-500 rounded-xl p-3 flex items-center justify-between transition-all"
                >
                  <span className="text-sm font-bold text-white">{b.name}</span>
                  <span className="text-xs text-blue-400 font-medium">Watch Now &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
