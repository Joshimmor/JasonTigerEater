'use client';
// components/Nav.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Media',   href: '/media' },
  { label: 'Shows',   href: '/shows' },
  { label: 'Bio',     href: '/bio' },
  { label: 'Merch',   href: '/merch' },
  { label: 'Contact', href: '/contact' },

];

const SOCIALS = [
  { label: 'Instagram',   href: process.env.NEXT_PUBLIC_INSTAGRAM_URL   ?? '#' },
  { label: 'TikTok',      href: process.env.NEXT_PUBLIC_TIKTOK_URL      ?? '#' },
  { label: 'Spotify',     href: process.env.NEXT_PUBLIC_SPOTIFY_URL     ?? '#' },
  { label: 'Apple Music', href: process.env.NEXT_PUBLIC_APPLE_MUSIC_URL ?? '#' },
];

const easeCurve = [0.42, 0, 0.58, 1] as const;
const easePop = [0.16, 1, 0.3, 1] as const;
const easeSocial = [0.22, 1, 0.36, 1] as const;

// Fullscreen menu animation
const menuVariants = {
  closed: { opacity: 0, transition: { duration: 0.3, ease: easeCurve } },
  open:   { opacity: 1, transition: { duration: 0.3, ease: easeCurve } },
};

// Stagger nav links
const linkContainerVariants = {
  closed: {},
  open:   { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const linkVariants = {
  closed: { opacity: 0, y: 32 },
  open:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: easePop } },
};

const socialsVariants = {
  closed: { opacity: 0, y: 12 },
  open:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeSocial, delay: 0.55 } },
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Top bar ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Transparent — pages set their own bg
        pointerEvents: 'none',
      }}>
        {/* JTE wordmark */}
        <Link href="/" onClick={() => setOpen(false)} style={{
          fontFamily: "var(--font-virtual-realm), sans-serif",
          fontSize: '24px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          lineHeight: .87,
          color: open ? '#f5f0eb00' : '#C84B00',
          textDecoration: 'none',
          textTransform: 'uppercase',
          pointerEvents: 'all',
          transition: 'color 0.3s ease',
          zIndex: 110,
          position: 'relative',
          textAlign: 'left',
        }}>
        JASON <br/>
        TIGER <br/>
        EATER
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '4px', display: 'flex', flexDirection: 'column',
            gap: '5px', pointerEvents: 'all', zIndex: 110, position: 'relative',
          }}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: '24px', height: '2px', background: '#C84B00', transformOrigin: 'center' }}
          />
          <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', width: '16px', height: '2px', background: '#F5F0EB', alignSelf: 'flex-end' }}
          />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: '24px', height: '2px', background: '#C84B00', transformOrigin: 'center' }}
          />
        </button>
      </header>

      {/* ── Fullscreen menu overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              position: 'fixed', inset: 0, zIndex: 90,
              background: '#0A0A0A',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '80px 40px 48px',
            }}
          >
            {/* Nav links */}
            <motion.nav
              variants={linkContainerVariants}
              initial="closed"
              animate="open"
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              {LINKS.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <motion.div key={href} variants={linkVariants}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                        fontSize: 'clamp(36px, 10vw, 56px)',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.05,
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        color: isActive ? '#C84B00' : '#F5F0EB',
                        display: 'block',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#C84B00';
                      }}
                      onMouseLeave={e => {
                        if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#F5F0EB';
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '1px', background: '#1E1E1E', margin: '32px 0' }}
            />

            {/* Socials row */}
            <motion.div
              variants={socialsVariants}
              initial="closed"
              animate="open"
              style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}
            >
              {SOCIALS.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '11px', letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: '#555',
                    textDecoration: 'none', transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C84B00')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}