'use client';
// components/SocialLinks.tsx
// Fixed bottom-right social links, shown on the homepage.

const SOCIAL_LINKS = [
  { label: 'Instagram',   href: process.env.NEXT_PUBLIC_INSTAGRAM_URL   ?? '#' },
  { label: 'TikTok',      href: process.env.NEXT_PUBLIC_TIKTOK_URL      ?? '#' },
  { label: 'Spotify',     href: process.env.NEXT_PUBLIC_SPOTIFY_URL     ?? '#' },
  { label: 'Apple Music', href: process.env.NEXT_PUBLIC_APPLE_MUSIC_URL ?? '#' },
];

export default function SocialLinks() {
  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 50,
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      pointerEvents: 'all',
    }}>
      {SOCIAL_LINKS.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#555',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C84B00')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
