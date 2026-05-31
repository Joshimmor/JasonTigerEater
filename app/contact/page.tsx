'use client';
// app/contact/page.tsx
import { useState } from 'react';

type InquiryType = 'general' | 'booking' | '';

interface FormState {
  inquiryType: InquiryType;
  name: string;
  email: string;
  message: string;
  // Booking only
  eventDate: string;
  venue: string;
}

const ORANGE = '#C84B00';
const BLACK = '#111111';
const WHITE = '#ffffff';

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '9px',
  letterSpacing: '0.22em',
  color: ORANGE,
  textTransform: 'uppercase',
  marginTop: '24px',
  marginBottom: '6px',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
};

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  border: 'none',
  borderBottom: `1.5px solid ${BLACK}`,
  background: WHITE,
  color: BLACK,
  fontSize: '13px',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  padding: '8px 0',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  borderRadius: 0,
  boxSizing: 'border-box',
  WebkitBoxShadow: `0 0 0px 1000px ${WHITE} inset`,
  WebkitTextFillColor: BLACK,
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    inquiryType: '',
    name: '',
    email: '',
    message: '',
    eventDate: '',
    venue: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  function update(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.inquiryType || !form.name || !form.email || !form.message) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const isBooking = form.inquiryType === 'booking';

  return (
    <main
      data-navcolor={ORANGE}
      style={{
        minHeight: '100svh',
        background: WHITE,
        padding: '80px 28px 80px',
        maxWidth: '560px',
        margin: '0 auto',
        boxSizing: 'border-box',
        width: '100vw',
      }}
    >
      {/* Heading */}
      <p style={{
        fontSize: '9px',
        letterSpacing: '0.25em',
        color: ORANGE,
        textTransform: 'uppercase',
        margin: '0 0 10px',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}>
        Jason Tiger Eater
      </p>
      <h1 style={{
        fontSize: 'clamp(48px, 14vw, 80px)',
        fontWeight: 900,
        lineHeight: 0.88,
        letterSpacing: '-0.03em',
        color: BLACK,
        textTransform: 'uppercase',
        margin: '0 0 48px',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}>
        GET IN<br /><span style={{ color: ORANGE }}>TOUCH</span>
      </h1>

      {status === 'sent' ? (
        <div style={{ paddingTop: '40px' }}>
          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '32px',
            fontWeight: 900,
            color: ORANGE,
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: '0 0 12px',
          }}>
            Message<br />Sent.
          </p>
          <p style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '12px',
            color: BLACK,
            opacity: 0.5,
            letterSpacing: '0.05em',
          }}>
            We'll be in touch soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>

          {/* Inquiry Type */}
          <label style={labelStyle}>Inquiry Type</label>
          <div style={{ position: 'relative' }}>
            <select
              value={form.inquiryType}
              onChange={e => update('inquiryType', e.target.value)}
              required
              style={{
                ...inputStyle,
                cursor: 'pointer',
                paddingRight: '20px',
                color: form.inquiryType ? BLACK : `${BLACK}55`,
              }}
            >
              <option value="" disabled>Select one</option>
              <option value="general">General Contact</option>
              <option value="booking">Booking Inquiry</option>
            </select>
            <span style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: ORANGE,
              fontSize: '10px',
              pointerEvents: 'none',
            }}>↓</span>
          </div>

          {/* Name */}
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="Your name"
            required
            style={inputStyle}
          />

          {/* Email */}
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            placeholder="your@email.com"
            required
            style={inputStyle}
          />

          {/* Booking-specific fields */}
          {isBooking && (
            <>
              <label style={labelStyle}>Event Date</label>
              <input
                type="date"
                value={form.eventDate}
                onChange={e => update('eventDate', e.target.value)}
                style={inputStyle}
              />

              <label style={labelStyle}>Venue / Location</label>
              <input
                type="text"
                value={form.venue}
                onChange={e => update('venue', e.target.value)}
                placeholder="Venue name and city"
                style={inputStyle}
              />
            </>
          )}

          {/* Message */}
          <label style={labelStyle}>Message</label>
          <textarea
            value={form.message}
            onChange={e => update('message', e.target.value)}
            placeholder={isBooking ? 'Tell us about the event, expected attendance, budget...' : 'What\'s on your mind?'}
            rows={5}
            required
            style={{ ...inputStyle, resize: 'none', paddingTop: '8px', lineHeight: 1.6 }}
          />

          {status === 'error' && (
            <p style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '11px',
              color: 'red',
              marginTop: '12px',
              letterSpacing: '0.05em',
            }}>
              Something went wrong — please try again.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              marginTop: '32px',
              width: '100%',
              background: status === 'sending' ? `${ORANGE}80` : ORANGE,
              color: WHITE,
              border: 'none',
              padding: '16px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              transition: 'opacity 0.2s',
            }}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message →'}
          </button>

        </form>
      )}
    </main>
  );
}
