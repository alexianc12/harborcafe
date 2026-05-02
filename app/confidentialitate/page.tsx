'use client';

import { useState } from 'react';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Link from 'next/link';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });

const c = { paper: '#F5EFE6', darkWood: '#2E1C15', caramel: '#A66D4B', muted: '#5A4A42' };

// 1. Dicționarul de traduceri bilingv
const DICTIONARY = {
  ro: {
    back: 'Înapoi la site',
    title: 'Politica de Confidențialitate',
    intro: <>Conform cerințelor Regulamentului (UE) 2016/679 (GDPR), <strong>NAUTICA BEANS SRL</strong> are obligația de a administra în condiții de siguranță și numai pentru scopurile specificate, datele personale pe care ni le furnizați.</>,
    sections: [
      {
        title: '1. Ce date colectăm',
        content: <>Site-ul nostru este unul strict de prezentare și <strong>nu colectează direct</strong> date cu caracter personal prin intermediul formularelor, conturilor de utilizator sau sistemelor de comenzi online.<br /><br />Singurele date pe care le putem prelucra sunt cele pe care ni le oferiți voluntar în momentul în care ne contactați prin telefon sau prin intermediul rețelelor sociale (ex: Instagram).</>
      },
      {
        title: '2. Scopul prelucrării',
        content: <>Datele furnizate voluntar prin apel telefonic sau social media sunt folosite exclusiv pentru a vă putea răspunde la întrebări, mesaje sau solicitări. Nu folosim aceste date pentru a vă trimite mesaje de marketing nesolicitate (spam) și nu vindem datele către terți.</>
      },
      {
        title: '3. Cookie-uri',
        content: <>Site-ul folosește exclusiv cookie-uri tehnice, strict necesare pentru funcționarea și găzduirea platformei web. Nu folosim sisteme avansate de urmărire (tracking) sau profilare publicitară.</>
      },
      {
        title: '4. Drepturile dumneavoastră',
        content: <>Aveți dreptul de a solicita accesul la datele dumneavoastră, rectificarea sau ștergerea acestora. Pentru orice solicitare legată de protecția datelor, ne puteți contacta la <strong>+40 757 571 016</strong>.</>
      }
    ]
  },
  en: {
    back: 'Back to site',
    title: 'Privacy Policy',
    intro: <>According to the requirements of Regulation (EU) 2016/679 (GDPR), <strong>NAUTICA BEANS SRL</strong> is obliged to safely manage, and only for the specified purposes, the personal data you provide us.</>,
    sections: [
      {
        title: '1. What data we collect',
        content: <>Our site is strictly for presentation and <strong>does not directly collect</strong> personal data through forms, user accounts, or online ordering systems.<br /><br />The only data we may process is what you voluntarily provide when contacting us by phone or through social networks (e.g., Instagram).</>
      },
      {
        title: '2. Purpose of processing',
        content: <>The data provided voluntarily by phone call or social media is used exclusively to answer your questions, messages, or requests. We do not use this data to send you unsolicited marketing messages (spam) and we do not sell the data to third parties.</>
      },
      {
        title: '3. Cookies',
        content: <>The site uses exclusively technical cookies, strictly necessary for the operation and hosting of the web platform. We do not use advanced tracking systems or advertising profiling.</>
      },
      {
        title: '4. Your rights',
        content: <>You have the right to request access to your data, its rectification, or deletion. For any request related to data protection, you can contact us at <strong>+40 757 571 016</strong>.</>
      }
    ]
  }
};

export default function PoliticaConfidentialitate() {
  // 2. Definirea stării pentru componenta client
  const [lang, setLang] = useState<'ro' | 'en'>('ro');
  const t = DICTIONARY[lang]; // Referință directă către textele din limba curentă

  return (
    <main className={`${cormorant.variable} ${dmSans.variable}`} style={{ background: c.paper, minHeight: '100vh', padding: '4rem 1.5rem', color: c.darkWood, fontFamily: 'var(--font-dm-sans)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Container pentru navigare: Buton Înapoi și Comutator Limbi */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ fontSize: '0.8rem', color: c.caramel, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ← {t.back}
          </Link>

          {/* 3. Buton SVG Steaguri */}
          <button 
            onClick={() => setLang(lang === 'ro' ? 'en' : 'ro')}
            style={{
              background: 'transparent', 
              border: `1px solid rgba(46,28,21,0.2)`,
              padding: '0.4rem 0.6rem', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              display: 'flex', 
              gap: '0.6rem', 
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Steag România */}
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

            {/* Steag Marea Britanie */}
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
              <clipPath id="uk-clip-privacy">
                <path d="M0,0 v30 h60 v-30 z"/>
              </clipPath>
              <g clipPath="url(#uk-clip-privacy)">
                <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
              </g>
            </svg>
          </button>
        </div>

        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '1rem', marginBottom: '3rem', fontWeight: 400 }}>
          {t.title}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '0.95rem', lineHeight: 1.8, color: c.muted }}>
          
          {/* Paragraful introductiv */}
          <section>
            <p>{t.intro}</p>
          </section>

          {/* Generarea dinamică a secțiunilor folosind map() */}
          {t.sections.map((section, index) => (
            <section key={index}>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>
                {section.title}
              </h2>
              <p>{section.content}</p>
            </section>
          ))}

        </div>
      </div>
    </main>
  );
}