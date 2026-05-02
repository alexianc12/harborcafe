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

// 1. Dicționarul actualizat cu toate textele pentru footer
const DICTIONARY = {
  ro: {
    nav: { menu: 'Meniu', location: 'Locație', program: 'Program' },
    hero: { city: 'București', quote: 'Slow coffee. Natural light. No sugar needed.' },
    marquee: ['Specialty Coffee', '·', 'Alexandru Ioan Cuza 13', '·', 'București', '·', 'Single Origin', '·', 'Natural Light', '·'],
    story: {
      tag: 'Povestea noastră',
      title: <>Un spațiu gândit<br /><em>pentru simplitate</em></>,
      col1: { title: 'Un act deliberat', text: 'Harbor Cafe nu este un simplu loc unde bei cafea. Este un refugiu în inima Bucureștiului, unde fiecare ceașcă este preparată cu atenție, servită fără grabă și gustată în liniște.' },
      col2: { title: 'Origini singulare', text: 'Boabele noastre sunt selectate cu grijă de la producători care împărtășesc aceleași valori. Prăjirea respectă caracterul unic al fiecărei recolte, oferind claritate în fiecare extracție.' },
      col3: { title: 'Spațiu și lumină', text: 'Lumina naturală și liniștea sunt ingrediente la fel de importante ca și cafeaua însăși. Am creat un loc în care să poți respira.' }
    },
    menu: { tag: 'Ce servim', title: 'Meniu', extra: 'Extra', currency: 'lei' },
    info: { tag: 'Unde ne găsești', title: 'Vino la Harbor Cafe', schedule: 'Program', reviewBtn: 'Vezi recenziile noastre pe Google →' },
    schedule: [
      { days: 'Luni — Vineri', hours: '07:00 – 17:00' },
      { days: 'Sâmbătă', hours: '08:00 – 16:00' },
      { days: 'Duminică', hours: '08:00 – 14:00' },
    ],
    footer: {
      desc: 'Un spațiu dedicat cafelei de specialitate. Lumina naturală, liniștea și gustul clar al originilor singulare.',
      contact: 'Contact', 
      legal: 'Legal', 
      social: 'Social',
      terms: 'Termeni și Condiții', 
      privacy: 'Politica de Confidențialitate',
      anpc: 'A.N.P.C.',
      address: 'Alexandru Ioan Cuza 13, București',
      rights: '© 2026 Harbor Cafe · Slow Coffee'
    }
  },
  en: {
    nav: { menu: 'Menu', location: 'Location', program: 'Hours' },
    hero: { city: 'Bucharest', quote: 'Slow coffee. Natural light. No sugar needed.' },
    marquee: ['Specialty Coffee', '·', 'Alexandru Ioan Cuza 13', '·', 'Bucharest', '·', 'Single Origin', '·', 'Natural Light', '·'],
    story: {
      tag: 'Our Story',
      title: <>A space designed<br /><em>for simplicity</em></>,
      col1: { title: 'A deliberate act', text: 'Harbor Cafe is not just a place to drink coffee. It is a refuge in the heart of Bucharest, where every cup is carefully prepared, served without haste, and tasted in peace.' },
      col2: { title: 'Single origins', text: 'Our beans are carefully selected from producers who share the same values. Roasting respects the unique character of each harvest, offering clarity in every extraction.' },
      col3: { title: 'Space and light', text: 'Natural light and silence are ingredients just as important as the coffee itself. We created a place where you can breathe.' }
    },
    menu: { tag: 'What we serve', title: 'Menu', extra: 'Extras', currency: 'lei' },
    info: { tag: 'Find us', title: 'Visit Harbor Cafe', schedule: 'Hours', reviewBtn: 'Check our Google reviews →' },
    schedule: [
      { days: 'Monday — Friday', hours: '07:00 – 17:00' },
      { days: 'Saturday', hours: '08:00 – 16:00' },
      { days: 'Sunday', hours: '08:00 – 14:00' },
    ],
    footer: {
      desc: 'A space dedicated to specialty coffee. Natural light, silence, and the clear taste of single origins.',
      contact: 'Contact', 
      legal: 'Legal', 
      social: 'Social',
      terms: 'Terms and Conditions', 
      privacy: 'Privacy Policy',
      anpc: 'Consumer Protection',
      address: 'Alexandru Ioan Cuza 13, Bucharest',
      rights: '© 2026 Harbor Cafe · Slow Coffee'
    }
  }
};

const MENU_DATA = {
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

const c = { paper: '#F5EFE6', darkWood: '#2E1C15', caramel: '#A66D4B', caramelLight: '#C68E65', muted: '#5A4A42' };

export default function HarborCafe() {
  const [scrollY, setScrollY] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [lang, setLang] = useState<'ro' | 'en'>('ro');

  const t = DICTIONARY[lang];

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
        html, body { scroll-behavior: smooth; background: ${c.paper}; overflow-x: hidden !important; max-width: 100vw !important; }
        a { text-decoration: none; cursor: pointer; }
        .menu-row:hover span:first-child { color: ${c.caramelLight}; transition: color 0.2s; }
        .schedule-box { padding: 3.5rem; }
        @media (max-width: 900px) {
          .story-grid, .menu-grid, .info-grid, .footer-grid { grid-template-columns: 1fr !important; }
          section { padding: 4rem 1.5rem !important; }
          footer { padding: 4rem 1.5rem 2rem !important; }
          .hero-title { font-size: clamp(3.5rem, 15vw, 6rem) !important; }
          .nav-links { display: none !important; }
          .schedule-box { padding: 1.5rem !important; }
        }
      `}</style>

      <main className={`${cormorant.variable} ${dmSans.variable}`} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', color: c.darkWood }}>
        
        {/* ── NAV ── */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '1.75rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: navScrolled ? 'rgba(245,239,230,0.92)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(12px)' : 'none', transition: '0.4s ease'
        }}>
          <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: navScrolled ? c.darkWood : c.paper }}>
            Harbor Cafe
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div className="nav-links" style={{ display: 'flex', gap: '2.5rem' }}>
              <a href="#menu" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: navScrolled ? c.darkWood : 'rgba(245,239,230,0.8)' }}>{t.nav.menu}</a>
              <a href="#info" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: navScrolled ? c.darkWood : 'rgba(245,239,230,0.8)' }}>{t.nav.location}</a>
              <a href="#info" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: navScrolled ? c.darkWood : 'rgba(245,239,230,0.8)' }}>{t.nav.program}</a>
            </div>
            
            {/* Buton Schimbare Limbă cu Steaguri Vectoriale SVG */}
            <button 
              onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')}
              style={{
                background: 'transparent', 
                border: `1px solid ${navScrolled ? c.darkWood : 'rgba(245,239,230,0.5)'}`,
                padding: '0.4rem 0.6rem', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                display: 'flex', 
                gap: '0.6rem', 
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Steag România SVG */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 3 2" 
                style={{ 
                  width: '22px', 
                  height: 'auto', 
                  borderRadius: '2px', 
                  opacity: lang === 'ro' ? 1 : 0.3, 
                  filter: lang === 'ro' ? 'none' : 'grayscale(100%)', 
                  transition: 'all 0.3s ease' 
                }}
              >
                <rect width="1" height="2" fill="#002B7F"/>
                <rect width="1" height="2" x="1" fill="#FCD116"/>
                <rect width="1" height="2" x="2" fill="#CE1126"/>
              </svg>

              {/* Steag UK SVG */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 60 30" 
                style={{ 
                  width: '22px', 
                  height: 'auto', 
                  borderRadius: '2px', 
                  opacity: lang === 'en' ? 1 : 0.3, 
                  filter: lang === 'en' ? 'none' : 'grayscale(100%)', 
                  transition: 'all 0.3s ease' 
                }}
              >
                <clipPath id="uk-clip">
                  <path d="M0,0 v30 h60 v-30 z"/>
                </clipPath>
                <g clipPath="url(#uk-clip)">
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
          <div style={{ position: 'absolute', inset: 0, transform: `translateY(${scrollY * 0.38}px)`, willChange: 'transform' }}>
            <img src="/harbor.img/croissant.webp" alt="Coffee" style={{ width: '100%', height: '125%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(46,28,21,0.9) 0%, rgba(46,28,21,0.1) 100%)' }} />
          </div>
          <div style={{ position: 'relative', zIndex: 10, padding: '4rem 3rem 5rem', width: '100%' }}>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: c.caramelLight, marginBottom: '1.25rem' }}>
              {t.hero.city} · Specialty Coffee
            </p>
            <h1 className="hero-title" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(4.5rem, 14vw, 11rem)', fontWeight: 300, lineHeight: 0.88, color: c.paper }}>
              Harbor Cafe
            </h1>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', fontStyle: 'italic', color: 'rgba(245,239,230,0.7)', marginTop: '2.5rem' }}>
              {t.hero.quote}
            </p>
          </div>
        </section>

        {/* ── MARQUEE ── */}
        <div style={{ background: c.darkWood, padding: '1.1rem 0', overflow: 'hidden', display: 'flex', gap: '4rem' }}>
          {Array.from({ length: 3 }).map((_, row) =>
            t.marquee.map((item, i) => (
              <span key={`${row}-${i}`} style={{ fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: i % 2 === 1 ? c.caramelLight : 'rgba(245,239,230,0.5)', whiteSpace: 'nowrap' }}>{item}</span>
            ))
          )}
        </div>

        {/* ── STORY ── */}
        <section style={{ padding: '9rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: c.caramel, marginBottom: '1.5rem' }}>{t.story.tag}</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, color: c.darkWood }}>{t.story.title}</h2>
          </div>
          <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
            <div>
              <img src="/harbor.img/bar.webp" alt="Bar" style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', marginBottom: '1rem' }}>{t.story.col1.title}</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: c.muted }}>{t.story.col1.text}</p>
            </div>
            <div>
              <img src="/harbor.img/coldbrew.webp" alt="Coffee beans" style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', marginBottom: '1rem' }}>{t.story.col2.title}</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: c.muted }}>{t.story.col2.text}</p>
            </div>
            <div>
              <img src="/harbor.img/preparare.webp" alt="Interior" style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '2rem' }} />
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', marginBottom: '1rem' }}>{t.story.col3.title}</h3>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.8, color: c.muted }}>{t.story.col3.text}</p>
            </div>
          </div>
        </section>

        {/* ── MENU ── */}
        <section id="menu" style={{ background: c.darkWood, padding: '9rem 3rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: c.caramel }}>{t.menu.tag}</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 7vw, 6rem)', color: c.paper }}>{t.menu.title}</h2>
            </div>
            <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem 7rem' }}>
              {Object.entries(MENU_DATA).map(([category, items]) => (
                <div key={category}>
                  <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.paper, marginBottom: '2rem', borderBottom: '1px solid rgba(198,142,101,0.2)' }}>{category}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                    {items.map((item) => (
                      <div className="menu-row" key={item.name} style={{ display: 'flex', alignItems: 'baseline' }}>
                        <span style={{ fontSize: '0.84rem', color: 'rgba(245,239,230,0.82)' }}>{item.name}</span>
                        <span style={{ flex: 1, borderBottom: '1px dotted rgba(198,142,101,0.28)', margin: '0 0.5rem' }} />
                        <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', color: c.caramelLight }}>{item.price} <span style={{ fontSize: '0.75rem' }}>{t.menu.currency}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INFO ── */}
        <section id="info" style={{ padding: '9rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: c.caramel }}>{t.info.tag}</p>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}>{t.info.title}</h2>
          </div>
          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem' }}>
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.5382827547566!2d26.0859!3d44.4289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f64d3b1e1b1b%3A0x1b1b1b1b1b1b1b1b!2sAlexandru%20Ioan%20Cuza%2013%2C%20Bucure%C8%99ti!5e0!3m2!1sen!2sro!4v1700000000000" width="100%" height="320" style={{ border: 0, borderRadius: '4px' }} allowFullScreen loading="lazy" />
             <div className="schedule-box" style={{ background: 'rgba(166,109,75,0.03)', border: '1px solid rgba(166,109,75,0.15)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: c.caramel, marginBottom: '2.5rem' }}>{t.info.schedule}</p>
                {t.schedule.map((row) => (
                  <div key={row.days} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px dotted rgba(166,109,75,0.2)' }}>
                    <span>{row.days}</span>
                    <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem' }}>{row.hours}</span>
                  </div>
                ))}
                <a href="https://google.com" target="_blank" style={{ display: 'block', textAlign: 'center', border: `1px solid ${c.caramel}`, padding: '1rem', marginTop: '2rem', color: c.darkWood }}>{t.info.reviewBtn}</a>
             </div>
          </div>
        </section>

        {/* ── FOOTER COMPLET ── */}
        <footer style={{ background: c.darkWood, padding: '6rem 3rem 3rem' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            
            {/* Grila cu cele 4 coloane */}
            <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '5rem', alignItems: 'flex-start' }}>
              
              {/* Coloana 1: Brand */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2.5rem', color: c.paper, lineHeight: 1, marginBottom: '1.25rem' }}>Harbor Cafe</h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(245,239,230,0.65)' }}>{t.footer.desc}</p>
              </div>

              {/* Coloana 2: Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.3)', marginBottom: '0.5rem' }}>{t.footer.contact}</p>
                <a href="mailto:hello@harborcafe.ro" style={{ fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}>hello@harborcafe.ro</a>
                <a href="tel:+40700000000" style={{ fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}>+40 700 000 000</a>
              </div>

              {/* Coloana 3: Legal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.3)', marginBottom: '0.5rem' }}>{t.footer.legal}</p>
                <a href="/termeni" style={{ fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}>{t.footer.terms}</a>
                <a href="/confidentialitate" style={{ fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}>{t.footer.privacy}</a>
                <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}>{t.footer.anpc}</a>
              </div>

              {/* Coloana 4: Social */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.3)', marginBottom: '0.5rem' }}>{t.footer.social}</p>
                <a href="https://www.instagram.com/harborcafe.bucuresti/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', color: 'rgba(245,239,230,0.65)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.color = c.caramelLight)} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,239,230,0.65)')}>Instagram</a>
              </div>
            </div>

            {/* Bara de jos cu adresa și drepturile de autor */}
            <div style={{ paddingTop: '2.5rem', borderTop: '1px solid rgba(245,239,230,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(245,239,230,0.25)' }}>{t.footer.address}</p>
              <p style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: 'rgba(245,239,230,0.25)' }}>{t.footer.rights}</p>
            </div>
          </div>
        </footer>

        {/* Buton Instagram Plutitor */}
        <a className="instagram-btn" href="https://www.instagram.com/harborcafe.bucuresti/" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: '20px', right: '20px', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf592 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>

      </main>
    </>
  );
}