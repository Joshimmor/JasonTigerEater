import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getShowById, formatShowDate } from '@/lib/bandsintown';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const show = await getShowById(id);
  if (!show) return { title: 'Show Not Found — Jason Tiger Eater' };
  const { full } = formatShowDate(show.datetime);
  return {
    title: `${show.venue.name} — Jason Tiger Eater`,
    description: `${show.venue.name}, ${show.venue.city} — ${full}`,
    ...(show.image_url ? { openGraph: { images: [show.image_url] } } : {}),
  };
}

export default async function ShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await getShowById(id);
  if (!show) notFound();

  const { full, day, month } = formatShowDate(show.datetime);
  const ticketOffer = show.offers.find(o => o.type === 'Tickets') ?? show.offers[0];
  const location = [show.venue.city, show.venue.region, show.venue.country]
    .filter(Boolean)
    .join(', ');
  const supports = show.lineup.filter(a => a.toLowerCase() !== 'jason tiger eater');

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: '#0A0A0A',
        color: '#F5F0EB',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        paddingTop: '88px', // clear fixed nav
      }}
    >
      {/* Back nav */}
      <div style={{ padding: '0 40px' }}>
        <Link
          href="/shows"
          style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#555',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={undefined}
        >
          ← All Shows
        </Link>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '48px auto 0',
          padding: '0 40px 80px',
          display: 'grid',
          gridTemplateColumns: show.image_url ? 'minmax(0, 1fr) minmax(0, 1fr)' : '1fr',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        {/* Event image */}
        {/* {show.image_url && (
          <img
            src={show.image_url}
            alt={`${show.venue.name} event flyer`}
            style={{
              width: '100%',
              display: 'block',
              borderRadius: '2px',
              boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
            }}
          />
        )} */}
        <img
                      src="https://media.bandsintown.com/900x900/26060911.webp"
                      // src={show.thumb_url}
                      alt=""
                      aria-hidden
                      style={{
                      width: '50%',
                      display: 'block',
                      borderRadius: '2px',
                      boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
                    }}
        />
        {/* Event info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Date stamp */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-virtual-realm), sans-serif',
                fontSize: '13px',
                letterSpacing: '0.18em',
                color: '#ee6513',
                textTransform: 'uppercase',
                margin: '0 0 6px',
              }}
            >
              {full}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-virtual-realm), sans-serif',
                  fontSize: 'clamp(72px, 12vw, 120px)',
                  lineHeight: 0.88,
                  color: '#ee6513',
                  letterSpacing: '-0.03em',
                }}
              >
                {day}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-virtual-realm), sans-serif',
                  fontSize: 'clamp(22px, 4vw, 40px)',
                  color: '#ee6513',
                  letterSpacing: '0.1em',
                }}
              >
                {month}
              </span>
            </div>
          </div>

          {/* Venue */}
          <div style={{ borderTop: '0.5px solid #1E1E1E', paddingTop: '28px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-virtual-realm), sans-serif',
                fontSize: 'clamp(22px, 4vw, 36px)',
                color: '#F5F0EB',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                margin: '0 0 8px',
                lineHeight: 1.1,
              }}
            >
              {show.venue.name}
            </h1>
            <p style={{ fontSize: '13px', color: '#888', margin: 0, letterSpacing: '0.06em' }}>
              {location}
            </p>
          </div>

          {/* Supporting acts */}
          {supports.length > 0 && (
            <div style={{ borderTop: '0.5px solid #1E1E1E', paddingTop: '20px' }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#555', textTransform: 'uppercase', margin: '0 0 8px' }}>
                With
              </p>
              <p style={{ fontSize: '14px', color: '#F5F0EB', margin: 0 }}>
                {supports.join(', ')}
              </p>
            </div>
          )}

          {/* Description */}
          {show.description && (
            <div style={{ borderTop: '0.5px solid #1E1E1E', paddingTop: '20px' }}>
              <p style={{ fontSize: '14px', color: '#AAA', lineHeight: 1.7, margin: 0 }}>
                {show.description}
              </p>
            </div>
          )}

          {/* Ticket CTA */}
          {ticketOffer && (
            <div style={{ paddingTop: '8px' }}>
              <a
                href={ticketOffer.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: ticketOffer.status === 'sold_out' ? '#555' : '#C84B00',
                  border: `0.5px solid ${ticketOffer.status === 'sold_out' ? '#333' : '#C84B00'}`,
                  padding: '14px 32px',
                  transition: 'background 0.2s, color 0.2s',
                  cursor: ticketOffer.status === 'sold_out' ? 'default' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (ticketOffer.status !== 'sold_out') {
                    e.currentTarget.style.background = '#C84B00';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={e => {
                  if (ticketOffer.status !== 'sold_out') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#C84B00';
                  }
                }}
              >
                {ticketOffer.status === 'sold_out' ? 'Sold Out' : 'Get Tickets'}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
