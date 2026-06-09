'use client';

import { use, Suspense } from 'react';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';

interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ url: string; name?: string; logo?: string }>;
}

function WatchContent({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ url: string; name?: string; logo?: string }> }) {
  const { id } = use(params);
  const { url, name, logo } = use(searchParams);

  if (!url) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl text-red-500 font-bold">Khola TV - Invalid Stream URL</h1>
        <p className="text-gray-400 mt-2">No stream URL provided.</p>
        <Link href="/" className="text-red-500 hover:text-red-400 mt-4 inline-block">&larr; Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">&larr; Back to Home</Link>

      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          {logo && <img src={logo} alt={name || 'TV'} className="w-10 h-10 object-contain" />}
          {name || 'Live Channel'}
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">LIVE</span>
        </h1>
      </div>

      <div className="max-w-4xl">
        <VideoPlayer url={url} poster={logo} />
      </div>
    </div>
  );
}

export default function WatchPage(props: WatchPageProps) {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-gray-400 mt-4">Loading stream...</p>
      </div>
    }>
      <WatchContent params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
