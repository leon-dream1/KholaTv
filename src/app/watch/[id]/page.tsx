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
        <h1 className="text-xl sm:text-2xl text-red-500 font-bold">Khola TV</h1>
        <p className="text-gray-400 mt-2">Invalid stream link</p>
        <Link href="/" className="text-red-500 hover:text-red-400 mt-4 inline-block">&larr; Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
      <Link href="/" className="text-gray-400 hover:text-white text-xs sm:text-sm inline-block mb-3">&larr; Back</Link>

      <div className="mb-3">
        <h1 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3 flex-wrap">
          {logo && <img src={logo} alt={name || 'TV'} className="w-7 h-7 sm:w-10 sm:h-10 object-contain rounded" />}
          <span className="truncate max-w-[200px] sm:max-w-none">{name || 'Live Channel'}</span>
          <span className="bg-red-600 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-bold live-pulse">
            LIVE
          </span>
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
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 mt-4">Loading stream...</p>
      </div>
    }>
      <WatchContent params={props.params} searchParams={props.searchParams} />
    </Suspense>
  );
}
