import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configurația metadatelor injectată cu nodul grafic absolut
export const metadata: Metadata = {
  metadataBase: new URL('https://harborcafe.vercel.app'),
  title: 'Harbor Cafe | Specialty Coffee București',
  description: 'Un spațiu dedicat cafelei de specialitate în inima Bucureștiului. Slow coffee. Natural light. No sugar needed.',
  openGraph: {
    title: 'Harbor Cafe | Specialty Coffee',
    description: 'Un refugiu în inima Bucureștiului, unde fiecare ceașcă este preparată cu atenție.',
    url: 'https://harborcafe.vercel.app',
    siteName: 'Harbor Cafe',
    locale: 'ro_RO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro" // Corectat pentru coerență SEO și parsare DOM
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}