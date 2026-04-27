'use client';

import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Link from 'next/link';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-dm-sans' });

const c = { paper: '#F5EFE6', darkWood: '#2E1C15', caramel: '#A66D4B', muted: '#5A4A42' };

export default function PoliticaConfidentialitate() {
  return (
    <main className={`${cormorant.variable} ${dmSans.variable}`} style={{ background: c.paper, minHeight: '100vh', padding: '4rem 1.5rem', color: c.darkWood, fontFamily: 'var(--font-dm-sans)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/" style={{ fontSize: '0.8rem', color: c.caramel, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ← Înapoi la site
        </Link>

        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '2rem', marginBottom: '3rem', fontWeight: 400 }}>
          Politica de Confidențialitate
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '0.95rem', lineHeight: 1.8, color: c.muted }}>
          
          <section>
            <p>Conform cerințelor Regulamentului (UE) 2016/679 (GDPR), <strong>NAUTICA BEANS SRL</strong> are obligația de a administra în condiții de siguranță și numai pentru scopurile specificate, datele personale pe care ni le furnizați.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>1. Ce date colectăm</h2>
            <p>Site-ul nostru este unul strict de prezentare și <strong>nu colectează direct</strong> date cu caracter personal prin intermediul formularelor, conturilor de utilizator sau sistemelor de comenzi online.</p>
            <p>Singurele date pe care le putem prelucra sunt cele pe care ni le oferiți voluntar în momentul în care ne contactați prin telefon sau prin intermediul rețelelor sociale (ex: Instagram).</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>2. Scopul prelucrării</h2>
            <p>Datele furnizate voluntar prin apel telefonic sau social media sunt folosite exclusiv pentru a vă putea răspunde la întrebări, mesaje sau solicitări. Nu folosim aceste date pentru a vă trimite mesaje de marketing nesolicitate (spam) și nu vindem datele către terți.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>3. Cookie-uri</h2>
            <p>Site-ul folosește exclusiv cookie-uri tehnice, strict necesare pentru funcționarea și găzduirea platformei web. Nu folosim sisteme avansate de urmărire (tracking) sau profilare publicitară.</p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: c.darkWood, marginBottom: '1rem' }}>4. Drepturile dumneavoastră</h2>
            <p>Aveți dreptul de a solicita accesul la datele dumneavoastră, rectificarea sau ștergerea acestora. Pentru orice solicitare legată de protecția datelor, ne puteți contacta la <strong>+40 757 571 016</strong>.</p>
          </section>

        </div>
      </div>
    </main>
  );
}