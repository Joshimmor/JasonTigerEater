'use client';
// components/CornerNav.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavColors {
  top: string;
  bottom: string;
}

// Each section registers its background and preferred nav color via data attributes.
// This component reads those at scroll time and updates accordingly.
export default function CornerNav() {
  const [colors, setColors] = useState<NavColors>({ top: '#C84B00', bottom: '#C84B00' });

  useEffect(() => {
    function getNavColor(y: number): string {
      const sections = document.querySelectorAll<HTMLElement>('section[data-navcolor]');
      let color = '#C84B00';
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (y >= top && y < bottom) {
          color = sec.dataset.navcolor ?? '#C84B00';
        }
      });
      return color;
    }

    function onScroll() {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;

      // Top corners read color at top of viewport
      const topColor = getNavColor(scrollY + 40);
      // Bottom corners read color at bottom of viewport
      const bottomColor = getNavColor(scrollY + winH - 40);

      setColors({ top: topColor, bottom: bottomColor });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 50,
    fontSize: '20px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontFamily: "var(--font-virtual-realm), sans-serif",
    transition: 'color 0.4s ease',
    
  };

  return (
    <>
      <Link href="/"        style={{ ...baseStyle, top: '24px',    left: '24px',   color: colors.top }}>Home</Link>
      <Link href="/contact" style={{ ...baseStyle, top: '24px',    right: '24px',  color: colors.top }}>Contact</Link>
      <Link href="/bio"     style={{ ...baseStyle, bottom: '24px', left: '24px',   color: colors.bottom }}>Bio</Link>
      <Link href="/press"   style={{ ...baseStyle, bottom: '24px', right: '24px',  color: colors.bottom }}>Press</Link>
    </>
  );
}
