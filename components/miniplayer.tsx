'use client';
// components/MiniPlayer.tsx
// Uses Spotify's iframe Embed API — plays full tracks if user is logged into Spotify.
// Docs: https://developer.spotify.com/documentation/embeds/references/iframe-api

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface Track {
  name: string;
  artist: string;
  spotifyUri: string;   // e.g. spotify:track:abc123
  albumArt: string;
  spotifyUrl: string;
}

interface MiniPlayerProps {
  tracks: Track[];
}

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    SpotifyIframeApi: any;
  }
}

export default function MiniPlayer({ tracks }: MiniPlayerProps) {
  const embedRef      = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const [index, setIndex]       = useState(0);
  const [playing, setPlaying]   = useState(false);
  const [position, setPosition] = useState(0);   // ms
  const [duration, setDuration] = useState(0);   // ms
  const [mounted, setMounted]   = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => { setMounted(true); }, []);

  const track = tracks[index];

  // Load Spotify Embed SDK once
  useEffect(() => {
    if (!mounted) return;
    if (document.getElementById('spotify-embed-sdk')) return;

    const script = document.createElement('script');
    script.id  = 'spotify-embed-sdk';
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);
  }, [mounted]);

  // Init controller once SDK is ready
  useEffect(() => {
    if (!mounted || !track) return;

    window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
      if (!embedRef.current) return;

      const options = {
        uri: track.spotifyUri,
        width: '100%',
        height: '0',
      };

      IFrameAPI.createController(embedRef.current, options, (controller: any) => {
        controllerRef.current = controller;

        controller.addListener('playback_update', (e: any) => {
          setPlaying(!e.data.isPaused);
          setPosition(e.data.position);
          setDuration(e.data.duration);

          // Auto advance when track ends
          if (e.data.position > 0 && e.data.position >= e.data.duration - 500) {
            setIndex(i => (i + 1) % tracks.length);
          }
        });
      });
    };

    // If SDK already loaded, fire manually
    if (window.SpotifyIframeApi) {
      window.onSpotifyIframeApiReady(window.SpotifyIframeApi);
    }
  }, [mounted, track, tracks.length]);

  // Load new track when index changes
  useEffect(() => {
    if (controllerRef.current && track) {
      controllerRef.current.loadUri(track.spotifyUri);
      controllerRef.current.play();
    }
  }, [index, track]);

  function togglePlay() {
    const c = controllerRef.current;
    if (!c) return;
    playing ? c.pause() : c.play();
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const c = controllerRef.current;
    if (!c || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    c.seek(pct * duration);
  }

  function nextTrack() {
    setIndex(i => (i + 1) % tracks.length);
  }

  function fmt(ms: number): string {
    const s   = Math.floor(ms / 1000);
    const m   = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  const progress  = duration > 0 ? (position / duration) * 100 : 0;
  const remaining = Math.max(0, duration - position);

  if (!mounted || !track) return null;

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        zIndex: 80, background: '#ffffff00',
        borderTop: '0.5px solid #e8e2da00',
        width: windowSize.width > 768 ? "25%" : "100%"
      }}
    >
      {/* Hidden Spotify embed iframe — handles actual playback */}
      <div
        ref={embedRef}
        style={{visibility: 'hidden',   left: '-9999px', top: '-9999px', position: 'absolute', overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Seekable progress bar */}
      <div
        onClick={seek}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#EEE8E0', cursor: 'pointer' }}
      >
        <div style={{ height: '100%', background: '#C84B00', width: `${progress}%`, transition: 'width 0.25s linear' }} />
      </div>

      {/* Player row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px 16px' }}>

        {/* Album art */}
        <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '2px', overflow: 'hidden', background: '#1A1A1A', position: 'relative' }}>
            {track.albumArt ? (
              <Image src={track.albumArt} alt={track.name} fill style={{ objectFit: 'cover' }} sizes="34px" />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #C84B00, #1A1A1A)' }} />
            )}
          </div>
        </a>

        {/* Play / pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#111"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#111"><path d="M8 5v14l11-7z"/></svg>
          )}
        </button>

        {/* Track info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#111', margin: 0,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {track.name}
          </p>
          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '9px', color: '#bbb', letterSpacing: '0.06em', margin: '2px 0 0',
          }}>
            {track.artist}
          </p>
        </div>

        {/* Timer */}
        <p style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontSize: '10px', color: '#bbb', letterSpacing: '0.06em', margin: 0, flexShrink: 0,
        }}>
          {duration > 0 ? `-${fmt(remaining)}` : '--:--'}
        </p>

        {/* Skip */}
        <button
          onClick={nextTrack}
          aria-label="Next track"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', flexShrink: 0, opacity: 0.35, transition: 'opacity 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.35')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#111"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/></svg>
        </button>
      </div>
    </motion.div>
  );
}