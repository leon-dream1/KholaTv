'use client';

import { useRef, useEffect } from 'react';
import Hls from 'hls.js';

interface Props {
  url: string;
  poster?: string;
}

export default function VideoPlayer({ url, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (url.includes('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 30,
          maxBufferLength: 10, // Download fewer chunks ahead to prevent connection choking
          maxMaxBufferLength: 20,
          maxBufferSize: 30 * 1000 * 1000,
          maxBufferHole: 2.0, // Super important: skip corrupted/missing chunks quickly instead of buffering
          liveSyncDurationCount: 3,
          startLevel: -1,
          capLevelToPlayerSize: true, // Bandwidth saver: Don't fetch 1080p if player is small
          testBandwidth: true,
          fragLoadingTimeOut: 15000,
          manifestLoadingTimeOut: 15000,
          levelLoadingTimeOut: 15000,
          fragLoadingMaxRetry: 10,
          manifestLoadingMaxRetry: 5,
        });
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });

        // Add auto-recovery for network and media errors (reduces buffering/freezing)
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.warn('Network error, trying to recover...');
                hls?.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.warn('Media error, recovering...');
                hls?.recoverMediaError();
                break;
              default:
                hls?.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      }
    } else {
      video.src = url;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        controls
        poster={poster}
        className="w-full aspect-video object-contain"
        playsInline
      />
    </div>
  );
}
