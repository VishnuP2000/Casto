import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import TrustedCompanies from '@/components/landing/TrustedCompanies';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturedArtists from '@/components/landing/FeaturedArtists';
import Statistics from '@/components/landing/Statistics';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Casto — Find Your Next Acting Opportunity',
  description:
    'Casto is India\'s premier casting platform. Connect actors, directors, casting agencies, and production houses. Browse auditions and build your portfolio.',
  keywords: ['casting', 'auditions', 'actors', 'film', 'bollywood', 'web series', 'OTT', 'acting jobs India'],
  openGraph: {
    title: 'Casto — Find Your Next Acting Opportunity',
    description:
      'Connect actors, directors, casting agencies, and production houses in one modern platform.',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-x-hidden ">
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <Features />
      <HowItWorks />
      <FeaturedArtists />
      <Statistics />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
