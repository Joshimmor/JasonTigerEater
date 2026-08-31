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
      background: 'rgba(10,10,10,0.88)',
      backdropFilter: 'blur(10px)',
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
      }}>
        JASON<br />TIGER<br />EATER
      </Link>

      <nav style={{ width: '50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                color: isActive ? '#C84B00' : '#F5F0EB',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#C84B00'; }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#F5F0EB'; }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
