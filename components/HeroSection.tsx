'use client';
// components/HeroSection.tsx
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  photoUrl?: string; // from Sanity — falls back to placeholder
  photoAlt?: string;
}

export default function HeroSection({ photoUrl, photoAlt = 'Jason Tiger Eater' }: HeroSectionProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      data-navcolor="#C84B00"
      style={{
        minHeight: '100svh',
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '64px 24px',
      }}
    >
      {/* Centered photo rectangle with name overlaid */}
      <div
        suppressHydrationWarning
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '420px',
          aspectRatio: '3/4',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Photo */}
        <div style={{ position: 'absolute', inset: 0, background: '#C8BFB5', overflow: 'hidden' }}>
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={photoAlt}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
          ) : (
            // Placeholder until photo is provided
            <div style={{
              width: '100%',
              height: '100%',
              background: '#C8BFB5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '11px', color: '#888', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>
                BAND PHOTO
              </span>
            </div>
          )}
        </div>

        {/* Name overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <h1 style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(52px, 16vw, 96px)',
            fontWeight: 900,
            lineHeight: 0.86,
            letterSpacing: '-0.03em',
            color: '#C84B00',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: 0,
            // Subtle text shadow to ensure legibility over any photo
            textShadow: '0 1px 20px rgba(0,0,0,0.15)',
          }}>
            JASON<br />TIGER<br />EATER
          </h1>
        </div>
      </div>

      {/* Scroll hint */}
      <div suppressHydrationWarning style={{
        position: 'absolute',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        opacity: loaded ? 0.35 : 0,
        transition: 'opacity 1s ease 1s',
      }}>
        {/* <div style={{
          width: '1px',
          height: '40px',
          background: '#C84B00',
          animation: 'jteScrollPulse 2s ease-in-out infinite',
        }} /> */}
      </div>

      <style>{`
        @keyframes jteScrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.4; }
          50% { transform: scaleY(0.5); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
