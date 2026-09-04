'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from './HomeIcon';

const LINKS = [
  { label: 'Home',    href: '/' },
  { label: 'Media',   href: '/media' },
  { label: 'Shows',   href: '/shows' },
  { label: 'Bio',     href: '/bio' },
  { label: 'Merch',   href: '/merch' },
  { label: 'Contact', href: '/contact' },
];

const ACTIVE_LINK_COLOR = '#070e01';

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
      <Link href="/" style={{ pointerEvents: 'all', display: 'block' }}>
        <HomeIcon/>
      </Link>

      <nav style={{ maxWidth: '50%',minWidth:'40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'all',paddingRight:"25px" }}>
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
                backgroundImage: isActive ? 'none' : 'linear-gradient(to bottom, #162c04 50%, #0c1802 50%)',
                backgroundColor: isActive ? ACTIVE_LINK_COLOR : 'transparent',
                backgroundSize: '100% 200%',
                backgroundPosition: isActive ? '0% 100%' : '0% 0%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                transition: 'background-position 0.45s ease',
                padding: '1% 1% 4px',
                borderBottom: isActive ? `2px solid ${ACTIVE_LINK_COLOR}` : '2px solid transparent',
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
