import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import damu from '../../../public/images/damu.png'
import radha from '../../../public/images/radha.png'
import vasu from '../../../public/images/vasu.png'
import jagu from '../../../public/images/jagu.png'

export const metadata: Metadata = {
  title: 'My Profile — Casto',
  description:
    'View and manage your Casto profile, portfolio, personal information, and account settings.',
  keywords: [
    'Casto',
    'profile',
    'actor profile',
    'casting profile',
    'portfolio',
    'account settings',
  ],
  openGraph: {
    title: 'My Profile — Casto',
    description:
      'Manage your Casto profile, showcase your portfolio, and update your personal information.',
    type: 'website',
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Profile Card */}
        <div className="bg-[#0d0d14] border border-white/10 rounded-3xl p-8">

          {/* Profile */}
          <div className="flex flex-col items-center text-center">

            <Image
              src={damu}
              alt="Profile"
              width={140}
              height={140}
              className="rounded-full object-cover border-4 border-[#4f8ef7]"
            />
        

            <h1 className="text-3xl font-bold mt-5">
              John Doe
            </h1>

            <p className="text-[#94a3b8] mt-2">
              +91 9876543210
            </p>
          </div>

          {/* About */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">
              About Me
            </h2>

            <p className="text-[#94a3b8] leading-8">
              Passionate actor with experience in feature films, short films,
              advertisements and web series. I enjoy portraying versatile
              characters and continuously improving my performance through
              workshops and theatre. Looking for exciting opportunities to
              collaborate with talented filmmakers and production houses.
            </p>
          </div>

          {/* Images */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">
              Portfolio Images
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <Image
                src={radha}
                alt="Portfolio"
                width={400}
                height={500}
                className="rounded-2xl object-cover w-full h-72"
              />

              <Image
                src={jagu}
                alt="Portfolio"
                width={400}
                height={500}
                className="rounded-2xl object-cover w-full h-72"
              />

              <Image
                src={vasu}
                alt="Portfolio"
                width={400}
                height={500}
                className="rounded-2xl object-cover w-full h-72"
              />

            </div>
          </div>

          {/* Videos */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">
              Portfolio Videos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


              <video
                controls
                className="rounded-2xl w-full border border-white/10"
              >
                <source src="/videos/demo2.mp4" type="video/mp4" />
              </video>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}