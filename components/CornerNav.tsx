
'use client';
// components/CornerNav.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface NavColors {
  top: string;
  bottom: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

// --- Social links config ---
// Update hrefs to match your .env.local / Sanity social links
const SOCIALS: SocialLink[] = [
  {
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? '#',
    icon: '📷',
    iconBg: '#fce4ec',
    iconColor: '#111',
  },
  {
    label: 'TikTok',
    href: process.env.NEXT_PUBLIC_TIKTOK_URL ?? '#',
    icon: '♪',
    iconBg: '#111',
    iconColor: '#fff',
  },
  {
    label: 'Spotify',
    href: process.env.NEXT_PUBLIC_SPOTIFY_URL ?? '#',
    icon: '🎵',
    iconBg: '#e8f5e9',
    iconColor: '#111',
  },
  {
    label: 'Apple Music',
    href: process.env.NEXT_PUBLIC_APPLE_MUSIC_URL ?? '#',
    icon: '🎶',
    iconBg: '#fce4ec',
    iconColor: '#111',
  },
];

// --- Animation variants ---
const pillContainerVariants = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const pillVariants = {
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
  },
  closed: {
    opacity: 0,
    y: 12,
    scale: 0.85,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

const overlayVariants = {
  open:   { opacity: 1 },
  closed: { opacity: 0 },
};

// --- Helpers ---
function getNavColor(scrollY: number): string {
  const sections = document.querySelectorAll<HTMLElement>('section[data-navcolor]');
  let color = '#C84B00';
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      color = sec.dataset.navcolor ?? '#C84B00';
    }
  });
  return color;
}

// --- Component ---
export default function CornerNav() {
  const [colors, setColors] = useState<NavColors>({ top: '#C84B00', bottom: '#C84B00' });
  const [socialsOpen, setSocialsOpen] = useState(false);

  // Adaptive color on scroll
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      setColors({
        top: getNavColor(scrollY + 40),
        bottom: getNavColor(scrollY + winH - 40),
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close socials on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSocialsOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const baseStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 50,
    fontSize: '20px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontFamily: "var(--font-virtual-realm), sans-serif",
    transition: 'color 0.4s ease',
    
  };
  return (
    <>
      {/* Overlay — closes socials on tap outside */}
      <AnimatePresence>
        {socialsOpen && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3 }}
            onClick={() => setSocialsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(255,255,255,0.55)',
              zIndex: 40,
              pointerEvents: 'all',
            }}
          />
        )}
      </AnimatePresence>

      {/* Top-left: Home */}
      <Link href="/" style={{ ...baseStyle, top: '24px', left: '24px', color: colors.top }}>
        Home
      </Link>

      {/* Top-right: Contact */}
      <Link href="/contact" style={{ ...baseStyle, top: '24px', right: '24px', color: colors.top }}>
        Contact
      </Link>

      {/* Bottom-left: Bio */}
      <Link href="/bio" style={{ ...baseStyle, bottom: '24px', left: '24px', color: colors.bottom }}>
        Bio
      </Link>

      {/* Bottom-right: Socials trigger + pill stack */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}>
        {/* Staggered pill stack */}
        <AnimatePresence>
          {socialsOpen && (
            <motion.div
              key="pills"
              variants={pillContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              {/* Reversed so Apple Music is closest to the trigger */}
              {[...SOCIALS].reverse().map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={pillVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#fff',
                    border: '0.5px solid #E8E0D8',
                    borderRadius: '100px',
                    padding: '8px 14px 8px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: '#111',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: social.iconBg,
                    color: social.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    flexShrink: 0,
                  }}>
                    {social.icon}
                  </span>
                  {social.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Socials trigger button */}
        <motion.button
          onClick={() => setSocialsOpen((prev) => !prev)}
          whileTap={{ scale: 0.92 }}
          style={{
            ...baseStyle,
            position: 'relative',
            background: 'none',
            border: 'none',
            padding: 0,
            color: colors.bottom,
          }}
        >
          <AnimatePresence mode="wait">
            {socialsOpen ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'block' }}
              >
                ✕ Close
              </motion.span>
            ) : (
              <motion.span
                key="socials"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'block' }}
              >
                Socials
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}