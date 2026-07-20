"use client";

import React from 'react'
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';


export default function Profile() {
    const { user } = useAuth();

    console.log("enter the profile",user)
    console.log(user?.name);
console.log(user?.email);
console.log(user?.image.url);

    if(!user){
         return <p>Loading...</p>;
    }

    

  return (
   <main className="min-h-screen bg-[#050508] text-white py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Profile Card */}
        <div className="bg-[#0d0d14] border border-white/10 rounded-3xl p-8">

          {/* Profile */}
          <div className="flex flex-col items-center text-center">

            <Image
              src={user.image.url}
              alt="Profile"
              width={140}
              height={140}
              className="rounded-full object-cover border-4 border-[#4f8ef7]"
            />
        

            <h1 className="text-3xl font-bold mt-5">
              {user.name}
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
                src={user.image.url}
                alt="Portfolio"
                width={400}
                height={500}
                className="rounded-2xl object-cover w-full h-72"
              />

              <Image
                src={user.image.url}
                alt="Portfolio"
                width={400}
                height={500}
                className="rounded-2xl object-cover w-full h-72"
              />

              <Image
                src={user.image.url}
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
  )
}

 
