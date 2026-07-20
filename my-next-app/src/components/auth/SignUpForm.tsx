"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, AtSign, Phone, CheckCircle2 } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";

import AuthLayout from "./AuthLayout";
import { InputField, PasswordInput } from "./InputField";
import {
  AuthLogo,
  AuthButton,
  SocialButton,
  Divider,
  PasswordStrength,
} from "./AuthWidgets";
import { signUp } from "@/services/api/AuthServices";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(60, "Name is too long"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 digits")
    .regex(/^\d+$/, "Password must contain only numbers"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastProps {
  type: "success" | "error";
  message: string;
}

function Toast({ type, message }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={[
        "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border",
        type === "success"
          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-300"
          : "bg-rose-500/10 border-rose-500/25 text-rose-300",
      ].join(" ")}
    >
      <div
        className={[
          "w-2 h-2 rounded-full flex-shrink-0",
          type === "success" ? "bg-emerald-400" : "bg-rose-400",
        ].join(" ")}
      />
      {message}
    </motion.div>
  );
}

// ─── Success Overlay ──────────────────────────────────────────────────────────

function SuccessOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 gap-5 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center"
      >
        <CheckCircle2 size={40} className="text-emerald-400" />
      </motion.div>
      <div>
        <h3 className="text-xl font-bold text-white">Account Created!</h3>
        <p className="text-sm text-[#64748b] mt-1.5">
          Welcome to Casto. Redirecting you to sign in…
        </p>
      </div>
    </motion.div>
  );
}

// ─── SignUp Form ──────────────────────────────────────────────────────────────

export default function SignUpForm() {
  const router = useRouter();
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState<File | null>(null);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: SignUpFormData) => {
      const formdata = new FormData();
    setToast(null);
    console.log("enter the onsubmit");
    try {
      console.log("enter the formdata");
      formdata.append("name", data.fullName);
      formdata.append("email", data.email);
      formdata.append("password", data.password);
      
      if (image) {
        formdata.append("image", image);
      }
      console.log("enter the image");

      await signUp(formdata);
      setSuccess(true);
      setTimeout(() => router.push("/signin"), 2000);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Registration failed. Please try again.";
      setToast({ type: "error", message: msg });
    }
  };

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.065 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: "easeOut" as const },
    },
  };

  if (success) {
    return (
      <AuthLayout
        leftHeadline="Your casting journey starts today."
        leftSubtext="Join 50,000+ artists and 1,200+ production houses already using Casto to connect, audition, and succeed."
      >
        <SuccessOverlay />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      leftHeadline="Your casting journey starts today."
      leftSubtext="Join 50,000+ artists and 1,200+ production houses already using Casto to connect, audition, and succeed."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {/* Logo + Header */}
        <motion.div variants={itemVariants}>
          <AuthLogo />
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-sm text-[#64748b] mt-1">
            Start your acting journey on Casto for free.
          </p>
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
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log("Validation errors", errors);
          })}
          noValidate
          className="flex flex-col gap-3.5"
        >
          <label className="text-sm text-gray-300">Profile Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.length) {
                setImage(e.target.files[0]);
              }
            }}
            className="border border-gray-600 rounded-lg p-2"
          />
          {/* Full Name */}
          <motion.div variants={itemVariants}>
            <InputField
              id="fullName"
              label="Full Name"
              type="text"
              icon={User}
              autoComplete="name"
              error={
                touchedFields.fullName ? errors.fullName?.message : undefined
              }
              success={touchedFields.fullName && !errors.fullName}
              registration={register("fullName")}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants}>
            <InputField
              id="signup-email"
              label="Email Address"
              type="email"
              icon={Mail}
              autoComplete="email"
              error={touchedFields.email ? errors.email?.message : undefined}
              success={touchedFields.email && !errors.email}
              registration={register("email")}
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <PasswordInput
              id="signup-password"
              label="Password"
              autoComplete="new-password"
              error={
                touchedFields.password ? errors.password?.message : undefined
              }
              success={touchedFields.password && !errors.password}
              showCapsWarning
              registration={register("password")}
            />
            {passwordValue && <PasswordStrength password={passwordValue} />}
          </motion.div>

          {/* Submit */}
          <motion.div variants={itemVariants}>
            <AuthButton isLoading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create Account"}
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
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-[#475569]"
        >
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-[#4f8ef7] font-medium hover:text-white transition-colors"
          >
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </AuthLayout>
  );
}
