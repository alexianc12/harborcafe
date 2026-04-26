'use client';

import { useEffect, useState } from 'react';

import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
});

const MENU: Record<string, { name: string; volume: string; price: number }[]> = {
  'Espresso Bar': [
    { name: 'Espresso', volume: '20ml', price: 11 },
    { name: 'Espresso Double', volume: '40ml', price: 13 },
    { name: 'Long Black', volume: '100ml', price: 14 },
    { name: 'Cortado', volume: '100ml', price: 14 },
    { name: 'Americano', volume: '100ml', price: 13 },
  ],
  'Milk Based': [
    { name: 'Cappuccino', volume: '180ml', price: 16 },
    { name: 'Flat White', volume: '220ml', price: 18 },
    { name: 'Latte', volume: '300ml', price: 20 },
    { name: 'Babyccino', volume: '220ml', price: 15 },
  ],
  Alternative: [
    { name: 'Matcha Latte', volume: '220ml', price: 23 },
    { name: 'Hot Chocolate', volume: '220ml', price: 19 },
    { name: 'V60', volume: '250ml', price: 23 },
  ],
  'Cold Drinks': [
    { name: 'Cold Brew', volume: '220ml', price: 23 },
    { name: 'Cold Brew Latte', volume: '220ml', price: 26 },
    { name: 'Cold Brew Tonic', volume: '220ml', price: 28 },
  ],
};

const EXTRAS = [
  { name: 'Extra Shot', price: 4 },
  { name: 'Regular Milk', price: 4 },
  { name: 'Alternative Milk', price: 5 },
];

const SCHEDULE = [
  { days: 'Luni — Vineri', hours: '07:00 – 17:00' },
  { days: 'Sâmbătă', hours: '08:00 – 16:00' },
  { days: 'Duminică', hours: '08:00 – 14:00' },
];

// Noua paletă de culori lemnoase/pământii
const c = {
  paper: '#F5EFE6',        // Hârtie puțin mai caldă
  darkWood: '#2E1C15',     // Maro espresso intens (înlocuiește navy)
  caramel: '#A66D4B',      // Caramel pământiu (înlocuiește gold)
  caramelLight: '#C68E65', // Nuanță de lemn deschis (înlocuiește goldLight)
  muted: '#5A4A42',        // Text secundar cald
  warm: '#D9CBB8',         // Bej latte
} as const;

export default function HarborCafe() {
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${c.paper}; overflow-x: hidden; }
        a { text-decoration: none; cursor: pointer; }
        .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .fade-in.visible { opacity: 1; transform: none; }
        .menu-row:hover span:first-child { color: ${c.caramelLight}; transition: color 0.2s; }
        @media (max-width: 900px) {
          .story-grid { grid-template-columns: 1fr !important; }
          .menu-grid { grid-template-columns: 1fr !important; }
          .info-grid { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; gap: 2rem !important; align-items: flex-start !important; }
          .hero-title { font-size: clamp(4rem, 22vw, 9rem) !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <main
        className={`${cormorant.variable} ${dmSans.variable}`}
        style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: c.darkWood }}
      >

        {/* ── NAV ── */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '1.75rem 3rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          background: navScrolled ? 'rgba(245,239,230,0.92)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(12px)' : 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '1.4rem', fontWeight: 600,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: navScrolled ? c.darkWood : c.paper,
            transition: 'color 0.4s ease',
          }}>Harbor Cafe</span>

          <div className="nav-links" style={{ display: 'flex', gap: '2.5rem' }}>
            {(['Meniu', 'Locație', 'Program'] as const).map((label, i) => {
              const hrefs: Record<string, string> = { Meniu: '#menu', Locație: '#info', Program: '#info' };
              return (
                <a key={i} href={hrefs[label]} style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: navScrolled ? c.darkWood : 'rgba(245,239,230,0.8)',
                  transition: 'color 0.4s ease',
                }}>{label}</a>
              );
            })}
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
          <div style={{
            position: 'absolute', inset: 0,
            transform: `translateY(${scrollY * 0.38}px)`,
            willChange: 'transform',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/harbor.img/bar1.webp" alt="Harbor Cafe coffee preparation"
              style={{ width: '100%', height: '125%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            {/* Gradient actualizat la nuanțe de maro închis */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(
                to top,
                rgba(46,28,21,0.9) 0%,
                rgba(46,28,21,0.45) 40%,
                rgba(46,28,21,0.15) 75%,
                rgba(46,28,21,0.05) 100%
              )`,
            }} />
          </div>

          <div style={{ position: 'relative', zIndex: 10, padding: '4rem 3rem 5rem', width: '100%' }}>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase',
              color: c.caramelLight, marginBottom: '1.25rem',
            }}>
              București · Specialty Coffee
            </p>

            <h1 className="hero-title" style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(5.5rem, 17vw, 15rem)',
              fontWeight: 300, lineHeight: 0.88,
              color: c.paper, letterSpacing: '-0.01em',
            }}>
              Harbor Cafe
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: '2.5rem' }}>
              <div style={{ width: '2.5rem', height: '1px', background: c.caramelLight }} />
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.2rem', fontStyle: 'italic',
                color: 'rgba(245,239,230,0.7)',
              }}>
                Slow coffee. Natural light. No sugar needed.
              </p>
            </div>

            <div style={{
              position: 'absolute', right: '3rem', bottom: '5rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.55rem', letterSpacing: '0.4em', textTransform: 'uppercase',
                color: 'rgba(245,239,230,0.45)', writingMode: 'vertical-rl',
              }}>Scroll</span>
              <div style={{ width: '1px', height: '3rem', background: 'rgba(245,239,230,0.2)' }} />
            </div>
          </div>
        </section>

        {/* ── MARQUEE STRIP ── */}
        <div style={{ background: c.darkWood, padding: '1.1rem 0', overflow: 'hidden', display: 'flex', gap: '4rem' }}>
          {Array.from({ length: 3 }).map((_, row) =>
            ['Specialty Coffee', '·', 'Alexandru Ioan Cuza 13', '·', 'București', '·', 'Single Origin', '·', 'Natural Light', '·'].map((item, i) => (
              <span key={`${row}-${i}`} style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase',
                color: i % 2 === 1 ? c.caramelLight : 'rgba(245,239,230,0.5)',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>{item}</span>
            ))
          )}
        </div>

        {/* ── STORY SECTION (VARIANTA NOUĂ: 3 COLOANE) ── */}
        <section style={{ padding: '9rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Titlul secțiunii, centrat */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase',
              color: c.caramel, marginBottom: '1.5rem',
            }}>Povestea noastră</p>

            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400,
              lineHeight: 1.1, color: c.darkWood,
            }}>
              Un spațiu gândit<br />
              <em>pentru simplitate</em>
            </h2>
            <div style={{ width: '4rem', height: '1px', background: c.caramel, margin: '2rem auto 0' }} />
          </div>

          {/* Grila cu cele 3 piloni/valori */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem', alignItems: 'stretch'
          }}>
            
            {/* Coloana 1: Ritualul */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '250px', overflow: 'hidden', marginBottom: '2rem' }}>
                <img src="/harbor.img/bar1.webp" alt="Preparare cafea" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>Un act deliberat</h3>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.88rem', lineHeight: 1.8, color: c.muted }}>
                Harbor Cafe nu este un simplu loc unde bei cafea. Este un refugiu în inima Bucureștiului, unde fiecare ceașcă este preparată cu atenție, servită fără grabă și gustată în liniște.
              </p>
            </div>

            {/* Coloana 2: Originea */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '250px', overflow: 'hidden', marginBottom: '2rem' }}>
                <img src="/harbor.img/boabe.webp" alt="Boabe de cafea" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>Origini singulare</h3>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.88rem', lineHeight: 1.8, color: c.muted }}>
                Boabele noastre sunt selectate cu grijă de la producători care împărtășesc aceleași valori. Prăjirea respectă caracterul unic al fiecărei recolte, oferind claritate în fiecare extracție.
              </p>
            </div>

            {/* Coloana 3: Spațiul */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '250px', overflow: 'hidden', marginBottom: '2rem' }}>
                <img src="/harbor.img/torn.webp" alt="Design cafenea" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>Spațiu și lumină</h3>
              <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.88rem', lineHeight: 1.8, color: c.muted, marginBottom: '2rem' }}>
                Lumina naturală, texturile de lemn și liniștea sunt ingrediente la fel de importante ca și cafeaua însăși. Am creat un loc în care să poți respira.
              </p>
              
              <a href="#menu" style={{
                fontFamily: 'var(--font-dm-sans)', fontSize: '0.68rem', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: c.darkWood, borderBottom: `1px solid ${c.caramel}`,
                paddingBottom: '0.3rem', alignSelf: 'flex-start', marginTop: 'auto'
              }}>Explorează meniul →</a>
            </div>

          </div>
        </section>

        {/* ── MENU SECTION ── */}
        <section id="menu" style={{ background: c.darkWood, padding: '9rem 3rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: '6rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(198,142,101,0.2)' }} />
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase',
                  color: c.caramel, marginBottom: '0.75rem',
                }}>Ce servim</p>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300,
                  color: c.paper, lineHeight: 1,
                }}>Meniu</h2>
              </div>
              <div style={{ flex: 1, height: '1px', background: 'rgba(198,142,101,0.2)' }} />
            </div>

            <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem 7rem' }}>
              {Object.entries(MENU).map(([category, items]) => (
                <div key={category}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.8rem', fontWeight: 400, color: c.paper,
                      whiteSpace: 'nowrap',
                    }}>{category}</h3>
                    <div style={{ flex: 1, height: '1px', background: `rgba(198,142,101,0.25)` }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    {items.map((item) => (
                      <div
                        className="menu-row"
                        key={item.name}
                        style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
                      >
                        <span style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.84rem', color: 'rgba(245,239,230,0.82)',
                          whiteSpace: 'nowrap', transition: 'color 0.2s',
                        }}>{item.name}</span>
                        <span style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.6rem', color: 'rgba(198,142,101,0.55)',
                          marginLeft: '0.15rem', whiteSpace: 'nowrap',
                        }}>{item.volume}</span>
                        <span style={{
                          flex: 1,
                          borderBottom: `1px dotted rgba(198,142,101,0.28)`,
                          marginBottom: '0.22rem',
                          minWidth: '16px',
                        }} />
                        <span style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: '1.15rem', color: c.caramelLight,
                          whiteSpace: 'nowrap',
                        }}>{item.price} <span style={{ fontSize: '0.75rem' }}>lei</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '5rem', paddingTop: '3rem',
              borderTop: `1px solid rgba(198,142,101,0.18)`,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.5rem', fontWeight: 400, color: c.paper,
                marginBottom: '1.75rem',
              }}>Extra</h3>

              <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                {EXTRAS.map((extra) => (
                  <div key={extra.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.8rem', color: 'rgba(245,239,230,0.65)',
                    }}>{extra.name}</span>
                    <span style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.05rem', color: c.caramelLight,
                    }}>+{extra.price} <span style={{ fontSize: '0.7rem' }}>lei</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INFO SECTION ── */}
        <section id="info" style={{ padding: '9rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Titlul secțiunii */}
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase',
              color: c.caramel, marginBottom: '2rem',
            }}>Unde ne găsești</p>

            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: 300,
              color: c.darkWood, marginBottom: 0, lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}>
              Vino la Harbor Cafe
            </h2>
          </div>

          {/* Grila cu 2 coloane */}
          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'flex-start' }}>
            
            {/* STÂNGA: Hartă și Adresă */}
            <div>
              <div style={{
                marginBottom: '2rem',
                overflow: 'hidden',
                borderRadius: '4px',
                boxShadow: '0 10px 30px rgba(46,28,21,0.05)', // O umbră foarte fină
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.5382827547566!2d26.0859!3d44.4289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f64d3b1e1b1b%3A0x1b1b1b1b1b1b1b1b!2sAlexandru%20Ioan%20Cuza%2013%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1700000000000"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '1rem', color: c.darkWood, fontWeight: 500,
                marginBottom: '0.5rem', textAlign: 'center',
              }}>Alexandru Ioan Cuza 13</p>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.85rem', color: c.muted,
                textAlign: 'center',
              }}>București, România</p>
            </div>

            {/* DREAPTA: Card Program & Buton Recenzii */}
            <div style={{
              background: 'rgba(166,109,75,0.03)', // Un fundal extrem de subtil
              border: `1px solid rgba(166,109,75,0.15)`,
              padding: '3.5rem',
              borderRadius: '8px',
            }}>
              {/* Antet Program */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                <span style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase',
                  color: c.caramel,
                }}>Program</span>
              </div>

              {/* Lista cu zile și ore */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem' }}>
                {SCHEDULE.map((row) => (
                  <div key={row.days} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: '0.9rem', color: c.darkWood,
                      minWidth: '150px', flexShrink: 0,
                    }}>{row.days}</span>
                    <span style={{
                      flex: 1,
                      borderBottom: `1px dotted rgba(166,109,75,0.3)`,
                      marginBottom: '0.25rem',
                      minWidth: '16px',
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: '1.2rem', color: c.darkWood,
                      whiteSpace: 'nowrap',
                    }}>{row.hours}</span>
                  </div>
                ))}
              </div>

              {/* Buton Recenzii */}
              <a
                href="https://www.google.com/search?q=Harbor+Cafe+Alexandru+Ioan+Cuza+Bucuresti+reviews"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: c.darkWood,
                  border: `1px solid ${c.caramel}`,
                  padding: '1.2rem 2rem',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.caramel;
                  e.currentTarget.style.color = c.paper;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = c.darkWood;
                }}
              >
                Vezi recenziile noastre pe Google →
              </a>
            </div>

          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: c.darkWood, padding: '6rem 3rem 3rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            {/* Partea de sus: Grila cu 4 coloane */}
            <div 
              className="footer-grid" 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '4rem', 
                marginBottom: '5rem',
                alignItems: 'flex-start' 
              }}
            >
              {/* Coloana 1: Brand */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '2.5rem', fontWeight: 300,
                  color: c.paper, lineHeight: 1, marginBottom: '1.25rem',
                }}>Harbor Cafe</h3>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.85rem', lineHeight: 1.6,
                  color: 'rgba(245,239,230,0.65)',
                }}>
                  Un spațiu dedicat cafelei de specialitate. Lumina naturală, liniștea și gustul clar al originilor singulare.
                </p>
              </div>

              {/* Coloana 2: Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.3)', marginBottom: '0.5rem'
                }}>Contact</p>
                <a 
                  href="mailto:hello@harborcafe.ro" 
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}
                >hello@harborcafe.ro</a>
                <a 
                  href="tel:+40700000000" 
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}
                >+40 700 000 000</a>
              </div>

              {/* Coloana 3: Legal (Termeni și Condiții) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.3)', marginBottom: '0.5rem'
                }}>Legal</p>
                <a 
                  href="#termeni" 
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}
                >Termeni și Condiții</a>
                <a 
                  href="#confidentialitate" 
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}
                >Politica de Confidențialitate</a>
                <a 
                  href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" 
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}
                >A.N.P.C.</a>
              </div>

              {/* Coloana 4: Social */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(245,239,230,0.3)', marginBottom: '0.5rem'
                }}>Social</p>
                <a 
                  href="https://instagram.com/harborcafe" target="_blank" rel="noopener noreferrer" 
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}
                >Instagram</a>
                <a 
                  href="https://facebook.com/harborcafe" target="_blank" rel="noopener noreferrer" 
                  style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}
                >Facebook</a>
              </div>
            </div>

            {/* Partea de jos: Copyright & Adresă */}
            <div style={{
              paddingTop: '2.5rem',
              borderTop: '1px solid rgba(245,239,230,0.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.62rem', letterSpacing: '0.15em',
                color: 'rgba(245,239,230,0.25)',
              }}>Alexandru Ioan Cuza 13, București</p>
              <p style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '0.62rem', letterSpacing: '0.15em',
                color: 'rgba(245,239,230,0.25)',
              }}>© {new Date().getFullYear()} Harbor Cafe · Slow Coffee</p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}