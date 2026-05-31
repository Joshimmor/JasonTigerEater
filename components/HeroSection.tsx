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
        
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '0 0',
        height: '100vh',
        
      }}
    >
      {/* Centered photo rectangle with name overlaid */}

        {/* Photo */}
        <div
        suppressHydrationWarning
        style={{
          position: 'relative',
          width: '75%',
          maxWidth: '1000px',
          height: 'auto',
          aspectRatio: '3/4',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={photoAlt}
              fill
              style={{ objectFit: 'contain', objectPosition: 'center center' }}
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

    




      <style>{`
        @keyframes jteScrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.4; }
          50% { transform: scaleY(0.5); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
