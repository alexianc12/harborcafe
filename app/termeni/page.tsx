'use client';

import { useState } from 'react';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Link from 'next/link';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });

const c = { paper: '#F5EFE6', darkWood: '#2E1C15', caramel: '#A66D4B', muted: '#5A4A42' };

// 1. Dicționarul de traduceri care conține ambele limbi
const DICTIONARY = {
  ro: {
    back: 'Înapoi la site',
    title: 'Termeni și Condiții',
    sections: [
      {
        title: '1. Datele Companiei',
        content: <>Site-ul web <strong>harborcafe.ro</strong> este administrat de societatea <strong>NAUTICA BEANS SRL</strong>, având sediul social în <strong>Bucuresti, sector 3, Aleea Stanila 2 Bl. H12 Sc. 3 Et. 4 Ap. 20 Cod 032708</strong>, înregistrată la Registrul Comerțului sub nr. <strong>J2025034508003</strong>, cod unic de înregistrare (CUI) <strong>51793881</strong>.</>
      },
      {
        title: '2. Caracterul informativ al site-ului',
        content: <>Acest site are un rol exclusiv de prezentare a locației fizice &quot;Harbor Cafe&quot; și a produselor servite. Prețurile afișate în secțiunea &quot;Meniu&quot; au caracter orientativ. Ne rezervăm dreptul de a modifica prețurile direct în locația fizică a cafenelei fără o notificare prealabilă pe site. Produsele pot fi achiziționate și plătite exclusiv în locația noastră fizică.</>
      },
      {
        title: '3. Drepturi de autor (Copyright)',
        content: <>Întregul conținut al acestui site (texte, imagini, logo-uri, elemente de design web) este proprietatea <strong>NAUTICA BEANS SRL</strong> și este protejat de legea drepturilor de autor. Folosirea fără acordul scris al proprietarului a oricăror elemente enumerate mai sus se pedepsește conform legilor în vigoare.</>
      },
      {
        title: '4. Contact',
        content: <>Pentru orice întrebări referitoare la acești Termeni și Condiții, ne puteți contacta la telefon: <strong>+40 757 571 016</strong> sau fizic la adresa cafenelei: Alexandru Ioan Cuza 13, București.</>
      }
    ]
  },
  en: {
    back: 'Back to site',
    title: 'Terms and Conditions',
    sections: [
      {
        title: '1. Company Details',
        content: <>The website <strong>harborcafe.ro</strong> is managed by <strong>NAUTICA BEANS SRL</strong>, headquartered in <strong>Bucharest, sector 3, Aleea Stanila 2 Bl. H12 Sc. 3 Et. 4 Ap. 20 Code 032708</strong>, registered with the Trade Register under no. <strong>J2025034508003</strong>, unique registration code (CUI) <strong>51793881</strong>.</>
      },
      {
        title: '2. Informative nature of the site',
        content: <>This site has an exclusive role of presenting the physical location &quot;Harbor Cafe&quot; and the products served. The prices displayed in the &quot;Menu&quot; section are indicative. We reserve the right to change prices directly at the physical location of the cafe without prior notice on the site. Products can be purchased and paid for exclusively at our physical location.</>
      },
      {
        title: '3. Copyright',
        content: <>The entire content of this site (texts, images, logos, web design elements) is the property of <strong>NAUTICA BEANS SRL</strong> and is protected by copyright law. The use without the written consent of the owner of any of the elements listed above is punishable according to the laws in force.</>
      },
      {
        title: '4. Contact',
        content: <>For any questions regarding these Terms and Conditions, you can contact us by phone: <strong>+40 757 571 016</strong> or physically at the cafe address: Alexandru Ioan Cuza 13, Bucharest.</>
      }
    ]
  }
};

export default function TermeniSiConditii() {
  // 2. Gestionarea stării pentru limba activă
  const [lang, setLang] = useState<'ro' | 'en'>('ro');
  const t = DICTIONARY[lang]; // Pointer către limba selectată

  return (
    <main className={`${cormorant.variable} ${dmSans.variable}`} style={{ background: c.paper, minHeight: '100vh', padding: '4rem 1.5rem', color: c.darkWood, fontFamily: 'var(--font-dm-sans)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Antet cu Buton Înapoi și Comutator de Limbă */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ fontSize: '0.8rem', color: c.caramel, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ← {t.back}
          </Link>

          {/* 3. Buton Schimbare Limbă cu Steaguri Vectoriale SVG */}
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
              <clipPath id="uk-clip-tc">
                <path d="M0,0 v30 h60 v-30 z"/>
              </clipPath>
              <g clipPath="url(#uk-clip-tc)">
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
          {/* Generăm secțiunile dinamic din dicționar */}
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