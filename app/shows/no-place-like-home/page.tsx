import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No Place Like Home — Jason Tiger Eater',
  description: 'Jason Tiger Eater live at the Queens Public Library in Woodhaven. Thursday, September 24. 6 PM.',
};

const REPEAT_TEXT = 'JASON TIGER EATER  JASON TIGER EATER  JASON TIGER EATER  JASON TIGER EATER  ';

// Rough Queens borough outline + Rockaway Peninsula
const QUEENS_MAIN =
  'M 90,55 C 135,18 230,8 310,34 L 378,78 C 412,120 418,175 406,225 L 382,285 C 358,338 322,375 285,405 L 248,432 C 215,452 178,464 148,462 C 112,460 76,440 56,412 C 38,386 33,352 40,322 C 47,294 66,270 60,244 C 52,212 38,174 48,138 C 58,105 74,78 90,55 Z';

const ROCKAWAY =
  'M 148,462 C 122,480 90,500 62,516 C 36,530 10,542 2,556 C -4,568 10,575 30,570 C 56,563 84,548 108,530 C 130,512 146,486 148,462 Z';

const CLIP_PATH = `${QUEENS_MAIN} ${ROCKAWAY}`;

export default function NoPlaceLikeHomePage() {
  const rows = Array.from({ length: 10 });

  return (
    <main style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>

      {/* ── Green flyer section ── */}
      <section style={{
        position: 'relative',
        background: '#8DC63F',
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* Repeating outline-text background */}
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          {rows.map((_, i) => (
            <div
              key={i}
              style={{
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-virtual-realm), sans-serif',
                fontSize: 'clamp(22px, 3.8vw, 48px)',
                letterSpacing: '0.05em',
                color: 'transparent',
                WebkitTextStroke: '1.5px #E84B00',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
            >
              {REPEAT_TEXT}
            </div>
          ))}
        </div>

        {/* Top-left event info */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '24px',
          zIndex: 10,
        }}>
          <p style={{ fontWeight: 700, fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.5, color: '#0A0A0A', fontFamily: 'monospace' }}>6 PM</p>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.5, color: '#0A0A0A', fontFamily: 'monospace' }}>85-41 Forest Pkwy</p>
          <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.5, color: '#0A0A0A', fontFamily: 'monospace' }}>Woodhaven NY 11421</p>
        </div>

        {/* Top-right date block */}
        <div style={{
          position: 'absolute',
          top: '80px',
          right: '24px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '6px',
        }}>
          <span style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontWeight: 700,
            fontSize: 'clamp(11px, 1.1vw, 14px)',
            letterSpacing: '0.22em',
            color: '#0A0A0A',
            paddingBottom: '4px',
            alignSelf: 'flex-end',
            fontFamily: 'monospace',
          }}>THURSDAY</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontWeight: 900,
              fontSize: 'clamp(52px, 7vw, 82px)',
              lineHeight: 0.88,
              color: '#0A0A0A',
              letterSpacing: '-0.04em',
            }}>24</div>
            <div style={{
              fontWeight: 700,
              fontSize: 'clamp(15px, 2vw, 20px)',
              letterSpacing: '0.14em',
              color: '#0A0A0A',
              fontFamily: 'monospace',
            }}>SEPT</div>
          </div>
        </div>

        {/* Map + center title */}
        <div style={{ position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Queens map SVG */}
          <svg
            viewBox="-10 0 440 590"
            style={{ height: 'clamp(160px, 34vh, 280px)', width: 'auto', display: 'block', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.18))' }}
            aria-hidden
          >
            <defs>
              <clipPath id="queens">
                <path d={CLIP_PATH} />
              </clipPath>
            </defs>

            {/* Borough fill */}
            <path d={QUEENS_MAIN} fill="#3BBCE8" />
            <path d={ROCKAWAY}    fill="#3BBCE8" />

            {/* Road network clipped to borough */}
            <g clipPath="url(#queens)" stroke="#F2E62A" strokeLinecap="round">
              {/* Major east-west */}
              <line x1="0"  y1="108" x2="420" y2="140" strokeWidth="2"   opacity="0.9" />
              <line x1="0"  y1="172" x2="418" y2="198" strokeWidth="1.5" opacity="0.85" />
              <line x1="0"  y1="233" x2="415" y2="254" strokeWidth="2"   opacity="0.9" />
              <line x1="0"  y1="296" x2="400" y2="312" strokeWidth="1.5" opacity="0.85" />
              <line x1="0"  y1="355" x2="370" y2="368" strokeWidth="1.5" opacity="0.8" />
              <line x1="0"  y1="415" x2="330" y2="428" strokeWidth="1"   opacity="0.7" />
              {/* Minor east-west */}
              <line x1="0"  y1="140" x2="418" y2="168" strokeWidth="0.8" opacity="0.55" />
              <line x1="0"  y1="204" x2="416" y2="226" strokeWidth="0.8" opacity="0.55" />
              <line x1="0"  y1="264" x2="408" y2="282" strokeWidth="0.8" opacity="0.55" />
              <line x1="0"  y1="325" x2="385" y2="338" strokeWidth="0.8" opacity="0.55" />
              <line x1="0"  y1="385" x2="350" y2="396" strokeWidth="0.8" opacity="0.55" />
              {/* Major north-south */}
              <line x1="148" y1="0" x2="148" y2="580" strokeWidth="2"   opacity="0.9" />
              <line x1="218" y1="0" x2="218" y2="560" strokeWidth="2"   opacity="0.9" />
              <line x1="290" y1="0" x2="290" y2="480" strokeWidth="1.5" opacity="0.85" />
              <line x1="82"  y1="0" x2="82"  y2="520" strokeWidth="1.5" opacity="0.8" />
              <line x1="356" y1="0" x2="356" y2="410" strokeWidth="1.5" opacity="0.8" />
              {/* Minor north-south */}
              <line x1="115" y1="0" x2="115" y2="555" strokeWidth="0.8" opacity="0.55" />
              <line x1="182" y1="0" x2="182" y2="560" strokeWidth="0.8" opacity="0.55" />
              <line x1="255" y1="0" x2="255" y2="500" strokeWidth="0.8" opacity="0.55" />
              <line x1="325" y1="0" x2="325" y2="440" strokeWidth="0.8" opacity="0.55" />
              {/* Diagonal arterials */}
              <line x1="55"  y1="55"  x2="405" y2="295" strokeWidth="1.5" opacity="0.7" />
              <line x1="42"  y1="340" x2="375" y2="105" strokeWidth="1"   opacity="0.5" />
              {/* Rockaway road */}
              <line x1="148" y1="462" x2="5"   y2="555" strokeWidth="1.5" opacity="0.8" />
            </g>
          </svg>

          {/* Center title — overlaps the bottom of the map */}
          <div style={{
            marginTop: '-28px',
            fontFamily: 'var(--font-virtual-realm), sans-serif',
            fontSize: 'clamp(28px, 5vw, 54px)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: '#E84B00',
            textShadow: '2px 2px 0 #A83200',
            position: 'relative',
            zIndex: 6,
            textAlign: 'center',
          }}>
            JASON TIGER EATER
          </div>
        </div>
      </section>

      {/* ── White bottom section ── */}
      <section style={{
        background: '#F0EDE3',
        padding: 'clamp(18px, 2.8vh, 40px) clamp(20px, 5vw, 60px)',
        textAlign: 'center',
        flex: '0 0 auto',
      }}>
        <h1 style={{
          fontWeight: 900,
          fontSize: 'clamp(32px, 7vw, 80px)',
          letterSpacing: '-0.025em',
          textTransform: 'uppercase',
          color: '#0A0A0A',
          lineHeight: 0.9,
          margin: 0,
        }}>
          NO PLACE LIKE HOME
        </h1>
        <p style={{
          marginTop: '10px',
          fontSize: 'clamp(14px, 1.8vw, 18px)',
          color: '#555',
          fontStyle: 'italic',
        }}>
          a show at the Queens Public Library in Woodhaven
        </p>
      </section>

    </main>
  );
}
