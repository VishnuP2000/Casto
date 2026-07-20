import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/providers/Providers';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Casto — Find Your Next Acting Opportunity',
    template: '%s | Casto',
  },
  description:
    "India's premier casting platform connecting actors, directors, casting agencies, and production houses.",
  keywords: ['casting', 'auditions', 'actors', 'bollywood', 'OTT', 'acting jobs India'],
  authors: [{ name: 'Casto' }],
  creator: 'Casto Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Casto',
    title: 'Casto — Find Your Next Acting Opportunity',
    description:
      'Connect actors, directors, casting agencies, and production houses in one modern platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casto — Find Your Next Acting Opportunity',
    description: "India's premier casting and audition platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#050508] text-white antialiased font-sans">
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}