'use client';

import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Link from 'next/link';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });

const c = { paper: '#F5EFE6', darkWood: '#2E1C15', caramel: '#A66D4B', muted: '#5A4A42' };

export default function TermeniSiConditii() {
  return (
    <main className={`${cormorant.variable} ${dmSans.variable}`} style={{ background: c.paper, minHeight: '100vh', padding: '4rem 1.5rem', color: c.darkWood, fontFamily: 'var(--font-dm-sans)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/" style={{ fontSize: '0.8rem', color: c.caramel, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ← Înapoi la site
        </Link>

        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '2rem', marginBottom: '3rem', fontWeight: 400 }}>
          Termeni și Condiții
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '0.95rem', lineHeight: 1.8, color: c.muted }}>
          
          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>1. Datele Companiei</h2>
            <p>Site-ul web <strong>harborcafe.ro</strong> este administrat de societatea <strong>NAUTICA BEANS SRL</strong>, având sediul social în <strong>Bucuresti, sector 3, Aleea Stanila 2 Bl. H12 Sc. 3 Et. 4 Ap. 20 Cod 032708</strong>, înregistrată la Registrul Comerțului sub nr. <strong>J2025034508003</strong>, cod unic de înregistrare (CUI) <strong>51793881</strong>.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>2. Caracterul informativ al site-ului</h2>
            <p>Acest site are un rol exclusiv de prezentare a locației fizice "Harbor Cafe" și a produselor servite. Prețurile afișate în secțiunea "Meniu" au caracter orientativ. Ne rezervăm dreptul de a modifica prețurile direct în locația fizică a cafenelei fără o notificare prealabilă pe site. Produsele pot fi achiziționate și plătite exclusiv în locația noastră fizică.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>3. Drepturi de autor (Copyright)</h2>
            <p>Întregul conținut al acestui site (texte, imagini, logo-uri, elemente de design web) este proprietatea <strong>NAUTICA BEANS SRL</strong> și este protejat de legea drepturilor de autor. Folosirea fără acordul scris al proprietarului a oricăror elemente enumerate mai sus se pedepsește conform legilor în vigoare.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>4. Contact</h2>
            <p>Pentru orice întrebări referitoare la acești Termeni și Condiții, ne puteți contacta la telefon: <strong>+40 757 571 016</strong> sau fizic la adresa cafenelei: Alexandru Ioan Cuza 13, București.</p>
          </section>

        </div>
      </div>
    </main>
  );
}