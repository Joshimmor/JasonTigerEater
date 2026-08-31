'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Media',   href: '/media' },
  { label: 'Shows',   href: '/shows' },
  { label: 'Bio',     href: '/bio' },
  { label: 'Merch',   href: '/merch' },
  { label: 'Contact', href: '/contact' },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      pointerEvents: 'none',
    }}>
      <Link href="/" style={{
        fontFamily: "var(--font-virtual-realm), sans-serif",
        fontSize: '18px',
        fontWeight: 700,
        letterSpacing: '0.05em',
        lineHeight: 0.87,
        color: '#C84B00',
        textDecoration: 'none',
        textTransform: 'uppercase',
        pointerEvents: 'all',
      }}>
        JASON<br />TIGER<br />EATER
      </Link>

      <nav style={{ width: '25%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'all' }}>
        {LINKS.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textDecoration: 'none',
                textTransform: 'uppercase',
                // bottom-to-top fill: gradient shifts up on hover to reveal black
                background: 'linear-gradient(to bottom, #C84B00 50%, #0A0A0A 50%)',
                backgroundSize: '100% 200%',
                backgroundPosition: isActive ? '0% 100%' : '0% 0%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                transition: 'background-position 0.45s ease',
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundPosition = '0% 100%';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.backgroundPosition = '0% 0%';
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
