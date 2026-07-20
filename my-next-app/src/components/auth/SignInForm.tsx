'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

import AuthLayout from './AuthLayout';
import { InputField, PasswordInput } from './InputField';
import {
  AuthLogo,
  AuthButton,
  SocialButton,
  Divider,
} from './AuthWidgets';
import { signIn } from '@/services/api/AuthServices';
import { useAuth } from '@/context/AuthContext';

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastProps {
  type: 'success' | 'error';
  message: string;
}

function Toast({ type, message }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={[
        'flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border',
        type === 'success'
          ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
          : 'bg-rose-500/10 border-rose-500/25 text-rose-300',
      ].join(' ')}
    >
      <div className={['w-2 h-2 rounded-full flex-shrink-0', type === 'success' ? 'bg-emerald-400' : 'bg-rose-400'].join(' ')} />
      {message}
    </motion.div>
  );
}

// ─── SignIn Form ──────────────────────────────────────────────────────────────

export default function SignInForm() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastProps | null>(null);
  

  const {setUser}=useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields, isSubmitSuccessful },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema), mode: 'onChange',});

  const emailValue = watch('email', '');
  const passwordValue = watch('password', '');

  const onSubmit = async (data: SignInFormData) => {
      console.log("onSubmit called");
        console.log(data);
    setToast(null);
    try {
      console.log('enter the Onsubmit signInForm')
      const response=await signIn({ email: data.email, password: data.password });
      console.log('response+++',response)
      setUser(response.user.user)
      console.log('response+++',response.user.user)
  localStorage.setItem("accessToken", response.user.accessToken);

      setToast({ type: 'success', message: 'Welcome back! Redirecting…' });
      setTimeout(() => router.push('/'), 1200);
    } catch (err: unknown) {
      console.log('it is signIn error++',err)
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Invalid credentials. Please try again.';
      setToast({ type: 'error', message: msg });
    }
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
  };

  return (
    <AuthLayout
      leftHeadline="Every great role starts with a single step."
      leftSubtext="Sign in to your Casto account and discover hundreds of casting opportunities waiting for your talent."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5"
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <AuthLogo />
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-[#64748b] mt-1">Sign in to continue your casting journey.</p>
        </motion.div>

        {/* Toast */}
        <AnimatePresence mode="wait">
          {toast && (
            <motion.div variants={itemVariants} key="toast">
              <Toast type={toast.type} message={toast.message} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit,(errors) => {console.log("Validation errors", errors);})}noValidate className="flex flex-col gap-4">
          {/* Email */}
          <motion.div variants={itemVariants}>
            <InputField
              id="signin-email"
              label="Email Address"
              type="email"
              icon={Mail}
              autoComplete="email"
              error={touchedFields.email ? errors.email?.message : undefined}
              success={touchedFields.email && !errors.email && emailValue.length > 0}
              registration={register('email')}
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
            <PasswordInput
              id="signin-password"
              label="Password"
              autoComplete="current-password"
              error={touchedFields.password ? errors.password?.message : undefined}
              success={touchedFields.password && !errors.password && passwordValue.length > 0}
              showCapsWarning
              registration={register('password')}
            />
          </motion.div>

          {/* Remember / Forgot */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="sr-only peer"
                  {...register('rememberMe')}
                />
                <div className="w-4 h-4 rounded border border-white/20 peer-checked:bg-[#4f8ef7] peer-checked:border-[#4f8ef7] transition-all flex items-center justify-center">
                  <svg className="hidden peer-checked:block w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                    <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </div>
              <span className="text-xs text-[#64748b] group-hover:text-[#94a3b8] transition-colors select-none">
                Remember Me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#4f8ef7] hover:text-white transition-colors"
            >
              Forgot Password?
            </Link>
          </motion.div>

          {/* Submit */}
          <motion.div variants={itemVariants}>
            <AuthButton isLoading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? 'Signing in…' : 'Sign In'}
            </AuthButton>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div variants={itemVariants}>
          <Divider />
        </motion.div>

        {/* Social */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <SocialButton
            icon={<FaGoogle className="text-[#ea4335]" />}
            label="Google"
            disabled={isSubmitting}
          />
          <SocialButton
            icon={<FaGithub className="text-white" />}
            label="GitHub"
            disabled={isSubmitting}
          />
        </motion.div>

        {/* Footer link */}
        <motion.p variants={itemVariants} className="text-center text-sm text-[#475569]">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-[#4f8ef7] font-medium hover:text-white transition-colors"
          >
            Create Account
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}