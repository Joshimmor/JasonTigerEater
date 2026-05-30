'use client';
// components/MusicSection.tsx
import type { SpotifyAlbum } from '@/types/api';

interface MusicSectionProps {
  releases: SpotifyAlbum[];
  spotifyArtistId: string;
}

function formatReleaseType(type: string, date: string): string {
  const year = new Date(date).getFullYear();
  const label = type === 'single' ? 'Single' : type === 'album' ? 'Album' : 'EP';
  return `${label} · ${year}`;
}

export default function MusicSection({ releases, spotifyArtistId }: MusicSectionProps) {
  return (
    <section
      data-navcolor="#ffffff"
      style={{
        minHeight: '100svh',
        background: '#1A1A1A',
        padding: '80px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '32px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Label */}
      <p style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: '10px',
        letterSpacing: '0.28em',
        color: '#C84B00',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        Music
      </p>

      {/* Spotify artist embed — shows top tracks */}
      <iframe
        src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '4px', border: 'none' }}
        title="Jason Tiger Eater on Spotify"
      />

      {/* Releases list */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {releases.map((release, i) => (
          <a
            key={release.id}
            href={release.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'grid',
              gridTemplateColumns: '52px 1fr auto',
              alignItems: 'center',
              gap: '16px',
              padding: '16px 0',
              borderTop: i === 0 ? 'none' : '0.5px solid #2A2A2A',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {/* Album art */}
            <div style={{
              width: '52px',
              height: '52px',
              background: '#2A2A2A',
              flexShrink: 0,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {release.images[2] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={release.images[2].url}
                  alt={release.name}
                  width={52}
                  height={52}
                  style={{ objectFit: 'cover', display: 'block' }}
                />
              )}
            </div>

            {/* Title + type */}
            <div>
              <p style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '14px',
                fontWeight: 700,
                color: '#F5F0EA',
                margin: '0 0 3px',
                letterSpacing: '0.01em',
              }}>
                {release.name}
              </p>
              <p style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '10px',
                color: '#555',
                margin: 0,
                letterSpacing: '0.08em',
              }}>
                {formatReleaseType(release.album_type, release.release_date)}
              </p>
            </div>

            {/* Arrow */}
            <span style={{ color: '#333', fontSize: '16px' }}>→</span>
          </a>
        ))}
      </div>

      {/* Platform links */}
      <div style={{ display: 'flex',  justifyContent: 'space-between', flexWrap: 'wrap', paddingTop: '8px', borderTop: '0.5px solid #2A2A2A' }}>
        {[
          { label: 'Spotify', href: `https://open.spotify.com/artist/${spotifyArtistId}` },
          { label: 'Apple Music', href: process.env.NEXT_PUBLIC_APPLE_MUSIC_URL ?? '#' },
          { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#' },
          { label: 'TikTok', href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? '#' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#444',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C84B00')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444')}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
