'use client';
// components/MediaPlaylist.tsx
// Renders every video in a YouTube playlist as a full-viewport, scroll-snapped section.
import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface MediaPlaylistProps {
  playlistId: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT: any;
  }
}

function loadYouTubeIframeApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    if (!document.getElementById('youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
  });
}

export default function MediaPlaylist({ playlistId }: MediaPlaylistProps) {
  const [videoIds, setVideoIds] = useState<string[] | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let bootstrapPlayer: any;
    let bootstrapEl: HTMLDivElement | null = null;

    // The IFrame API is the only client-side way to read a playlist's video order
    loadYouTubeIframeApi().then(() => {
      if (cancelled) return;
      bootstrapEl = document.createElement('div');
      document.body.appendChild(bootstrapEl);
      bootstrapPlayer = new window.YT.Player(bootstrapEl, {
        height: '0',
        width: '0',
        playerVars: { listType: 'playlist', list: playlistId },
        events: {
          onReady: (e: any) => {
            if (!cancelled) setVideoIds(e.target.getPlaylist() ?? []);
            e.target.destroy();
            bootstrapEl?.remove();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      bootstrapPlayer?.destroy?.();
      bootstrapEl?.remove();
    };
  }, [playlistId]);

  if (!videoIds) {
    return <div style={loadingStyle}>Loading videos…</div>;
  }

  return (
    <>
    <div
      ref={containerRef}
      onScroll={() => {
        if (!hasScrolled && (containerRef.current?.scrollTop ?? 0) > 20) setHasScrolled(true);
      }}
      style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#0A0A0A',
      }}>
      {videoIds.map((id) => (
        <section
          key={id}
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
          }}
        >
          <div style={{ width: 'min(100vw, 177.78vh)', height: 'min(100vh, 56.25vw)' }}>
            <iframe
              src={`https://www.youtube.com/embed/${id}?rel=0`}
              title={`YouTube video ${id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </section>
      ))}
    </div>
    {videoIds.length > 1 && (
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        color: '#F5F0EB',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: '11px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        opacity: hasScrolled ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }}>
        <span>Scroll</span>
        <span style={{ display: 'inline-block', animation: 'mediaScrollCue 1.4s ease-in-out infinite' }}>↓</span>
      </div>
    )}
    <style>{`
      @keyframes mediaScrollCue {
        0%, 100% { transform: translateY(0); opacity: 0.5; }
        50% { transform: translateY(6px); opacity: 1; }
      }
    `}</style>
    </>
  );
}

const loadingStyle: CSSProperties = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#0A0A0A',
  color: '#F5F0EB',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontSize: '13px',
};
