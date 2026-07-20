import type { Metadata } from 'next';
import SignUpForm from '@/components/auth/SignUpForm';

export const metadata: Metadata = {
  title: 'Create Account — Casto',
  description: 'Join Casto for free. Create your artist profile and start applying for casting opportunities today.',
};

export default function SignUpPage() {
  return <SignUpForm />;
}