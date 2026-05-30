'use client';
// components/ShowsSection.tsx

import type { BandsintownEvent } from '@/types/api';
import { formatShowDate } from '@/lib/bandsintown';

interface ShowsSectionProps {
  shows: BandsintownEvent[];
}

export default function ShowsSection({ shows }: ShowsSectionProps) {
  return (
    <section
      data-navcolor="#C84B00"
      style={{
        minHeight: '100svh',
        background: '#F5F0EA',
        padding: '80px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '32px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Label */}
      <p style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: '10px',
        letterSpacing: '0.28em',
        color: '#C84B00',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        Shows
      </p>

      {/* Shows list */}
      {shows.length === 0 ? (
        <div style={{ padding: '40px 0' }}>
          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '13px',
            color: '#888',
            margin: 0,
            letterSpacing: '0.05em',
          }}>
            No upcoming shows — check back soon.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {shows.map((show, i) => {
            const { day, month } = formatShowDate(show.datetime);
            const ticketOffer = show.offers.find(o => o.type === 'Tickets') ?? show.offers[0];
            const location = [show.venue.city, show.venue.region].filter(Boolean).join(', ');

            return (
              <div
                key={show.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '56px 1fr auto',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 0',
                  borderTop: '0.5px solid #D8D0C4',
                  ...(i === shows.length - 1 ? { borderBottom: '0.5px solid #D8D0C4' } : {}),
                }}
              >
                {/* Date */}
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '16px',
                    fontWeight: 800,
                    color: '#111',
                    margin: 0,
                    lineHeight: 1,
                  }}>
                    {day}
                  </p>
                  <p style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '9px',
                    color: '#C84B00',
                    letterSpacing: '0.15em',
                    margin: '3px 0 0',
                    textTransform: 'uppercase',
                  }}>
                    {month}
                  </p>
                </div>

                {/* Venue + location */}
                <div>
                  <p style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#111',
                    margin: '0 0 3px',
                  }}>
                    {show.venue.name}
                  </p>
                  <p style={{
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    fontSize: '10px',
                    color: '#888',
                    margin: 0,
                    letterSpacing: '0.05em',
                  }}>
                    {location}
                  </p>
                </div>

                {/* Ticket link */}
                {ticketOffer && (
                  <a
                    href={ticketOffer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: '9px',
                      letterSpacing: '0.15em',
                      color: '#C84B00',
                      textDecoration: 'none',
                      border: '0.5px solid #C84B00',
                      padding: '7px 10px',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#C84B00';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#C84B00';
                    }}
                  >
                    {ticketOffer.status === 'sold_out' ? 'Sold Out' : 'Tickets'}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Booking CTA */}
      <div style={{ paddingTop: '8px' }}>
        <a
          href="/contact"
          style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '11px',
            color: '#888',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C84B00')}
          onMouseLeave={e => (e.currentTarget.style.color = '#888')}
        >
          Want us at your event? → Book a show
        </a>
      </div>
    </section>
  );
}
