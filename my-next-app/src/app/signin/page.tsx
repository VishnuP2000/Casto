import type { Metadata } from 'next';
import SignInForm from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign In — Casto',
  description: 'Sign in to your Casto account and continue your casting journey.',
};

export default function SignInPage() {
  return <SignInForm />;
}
