'use client';

import { use, Suspense } from 'react';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import FifaTopChannels from '@/components/FifaTopChannels';
import FifaSection from '@/components/FifaSection';
import { fifaBroadcasters } from '@/lib/fifa';

interface FifaWatchPageProps {
  searchParams: Promise<{ channelId?: string }>;
}

function FifaWatchContent({ searchParams }: { searchParams: Promise<{ channelId?: string }> }) {
  const { channelId } = use(searchParams);
  
  // Default to the first broadcaster if none is selected
  const activeChannel = fifaBroadcasters.find(c => c.id === channelId) || fifaBroadcasters[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
      <Link href="/" className="text-gray-400 hover:text-white text-xs sm:text-sm inline-block mb-3 transition-colors">&larr; Back to Home</Link>

      <div className="mb-6 bg-[#0b132c] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Video Player */}
        <div className="max-w-4xl mx-auto bg-black">
          <VideoPlayer url={activeChannel.url} poster={activeChannel.logo} />
        </div>
        
        {/* Now Playing Info */}
        <div className="p-4 bg-[#0a1128] border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-bold tracking-wider">Now Playing &bull;</span>
            <span className="text-sm sm:text-base font-extrabold text-white">{activeChannel.name}</span>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Play
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors border border-gray-700"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-white mb-4">Channels <span className="text-gray-500 text-xs font-normal ml-2">{fifaBroadcasters.length} available</span></h2>
        {/* Use the Top Channels component but pass baseUrl so it routes back here */}
        <FifaTopChannels baseUrl="/watch/fifa" selectedChannelId={activeChannel.id} />
      </div>

      <div className="mt-12">
        <FifaSection hideChannels />
      </div>
    </div>
  );
}

export default function FifaWatchPage(props: FifaWatchPageProps) {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 mt-4">Loading FIFA stream...</p>
      </div>
    }>
      <FifaWatchContent searchParams={props.searchParams} />
    </Suspense>
  );
}
