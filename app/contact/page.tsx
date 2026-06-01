'use client';
// app/contact/page.tsx
import { useState } from 'react';
import { motion, cubicBezier } from 'framer-motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.16, 1, 0.3, 1) } },
};

const lineGrow = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: cubicBezier(0.16, 1, 0.3, 1) } },
};

function Field({
  label, type = 'text', textarea = false, value, onChange, required,
}: {
  label: string; type?: string; textarea?: boolean;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const base: React.CSSProperties = {
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${focused ? '#C84B00' : '#E0D8D0'}`,
    outline: 'none', padding: '10px 0', resize: 'none',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '15px', color: '#111',
    transition: 'border-color 0.25s ease',
  };
  return (
    <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
        fontWeight: 700, color: focused ? '#C84B00' : '#bbb',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        transition: 'color 0.25s ease',
      }}>
        {label}
      </label>
      {textarea
        ? <textarea rows={4} value={value} required={required}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onChange={e => onChange(e.target.value)}
            style={{ ...base, lineHeight: 1.6 }} />
        : <input type={type} value={value} required={required}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onChange={e => onChange(e.target.value)}
            style={base} />
      }
    </motion.div>
  );
}

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main style={{
      minHeight: '100svh', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 28px',
    }}>
      <motion.div
        variants={container} initial="hidden" animate="show"
        style={{ width: '100%', maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '40px' }}
      >
        {/* Label */}
        <motion.p variants={fadeUp} style={{
          fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
          color: '#C84B00', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          margin: 0,
        }}>
          Booking Inquiry
        </motion.p>

        {/* Heading */}
        <div>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(52px, 14vw, 88px)', fontWeight: 900,
            lineHeight: 0.88, letterSpacing: '-0.03em',
            color: '#111', textTransform: 'uppercase', margin: 0,
          }}>
            GET<br />IN<br /><span style={{ color: '#C84B00' }}>TOUCH</span>
          </motion.h1>
          <motion.div variants={lineGrow} style={{
            height: '2px', background: '#C84B00', marginTop: '20px', width: '48px',
          }} />
        </div>

        {/* Success state */}
        {status === 'sent' ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '15px', color: '#111', lineHeight: 1.7,
            }}>
              Message received —<br />we'll be in touch shortly.
            </p>
            <button onClick={() => setStatus('idle')} style={{
              marginTop: '24px', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C84B00',
            }}>
              Send another →
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <Field label="Name"    value={name}    onChange={setName}    required />
            <Field label="Email"   type="email" value={email}   onChange={setEmail}   required />
            <Field label="Message" textarea     value={message} onChange={setMessage} required />

            <motion.div variants={fadeUp}>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: '#C84B00', color: '#fff', border: 'none',
                  padding: '16px 36px', cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
                  opacity: status === 'sending' ? 0.6 : 1, transition: 'opacity 0.2s',
                }}
              >
                {status === 'sending' ? 'Sending...' : 'Send →'}
              </motion.button>

              {status === 'error' && (
                <p style={{
                  marginTop: '12px', fontSize: '11px', color: '#e53e3e',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}>
                  Something went wrong — please try again.
                </p>
              )}
            </motion.div>
          </form>
        )}
      </motion.div>
    </main>
  );
}