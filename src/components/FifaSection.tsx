'use client';

import { useEffect, useState, useRef } from 'react';
import { FifaMatch, fifaMatches, updateMatchStatuses } from '@/lib/fifa';
import FifaMatchCard from './FifaMatchCard';
import WorldCupCountdown from './WorldCupCountdown';
import FifaTopChannels from './FifaTopChannels';

interface Props {
  hideChannels?: boolean;
}

export default function FifaSection({ hideChannels = false }: Props) {
  const [matches, setMatches] = useState<FifaMatch[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update statuses on mount and every minute
    const update = () => {
      setMatches(updateMatchStatuses(fifaMatches));
    };
    
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // Only show upcoming and live matches, strictly limited to the next 4
  const activeMatches = matches.filter(m => m.status !== 'finished').slice(0, 4);

  const scrollToChannels = () => {
    // We scroll to the top where the channels are
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mb-10" ref={containerRef}>
      
      {/* Top Channel Options (hidden if requested) */}
      {!hideChannels && <FifaTopChannels />}

      {/* Main FIFA World Cup Container */}
      <div className="bg-[#0b132c] border border-gray-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-4xl drop-shadow-lg">🏆</span> 
            <div>
              <div>FIFA World Cup 2026</div>
              <div className="text-sm font-medium text-gray-400 mt-1">Match Schedule</div>
            </div>
          </h2>
        </div>

        <div className="p-6">
          {activeMatches.length > 0 && (
            <WorldCupCountdown targetDate={activeMatches[0].startTime} />
          )}

          <div className="flex items-center justify-between mt-8 mb-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Upcoming Matches</h3>
              <p className="text-xs text-gray-500">Live হলে badge দেখাবে, finished হলে hide হবে</p>
            </div>
            <div className="bg-[#162145] text-xs font-bold text-gray-300 px-3 py-1.5 rounded-full border border-gray-800">
              {activeMatches.length} Matches
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
            {activeMatches.map((match, index) => (
              <div key={match.id} className={index % 2 === 0 ? "md:border-r border-gray-800/50 md:pr-4" : "md:pl-4"}>
                <FifaMatchCard match={match} />
              </div>
            ))}
            {activeMatches.length === 0 && (
              <div className="col-span-full py-10 text-center text-gray-500 font-bold">
                No upcoming matches right now.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0f1837] p-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-800">
          <p className="text-xs text-gray-500 italic mb-3 sm:mb-0">
            All times are in Bangladesh Standard Time
          </p>
          <button 
            onClick={scrollToChannels}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-2 px-6 rounded-full transition-colors flex items-center gap-2"
          >
            Watch live channels
            <span>&gt;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
