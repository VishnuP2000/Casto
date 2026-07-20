
import Profile from '@/components/auth/Profile';
import type { Metadata } from 'next';
import React from 'react';


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
  return <Profile/>
}