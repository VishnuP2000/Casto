"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Lock,
  LucideIcon,
} from "lucide-react";

// ─── InputField ────────────────────────────────────────────────────────────────

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  icon: LucideIcon;
  error?: string;
  success?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  registration: Record<string, unknown>;
}

export function InputField({
  id,
  label,
  type = "text",
  icon: Icon,
  error,
  success,
  autoComplete,
  disabled,
  registration,
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);

  console.log('enter the inputField')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    console.log('enter the handleChange')
    if (registration.onChange) {
      (
        registration.onChange as (e: React.ChangeEvent<HTMLInputElement>,) => void)(e);
    }
  };

  const borderColor = error
    ? "border-rose-500/60"
    : success
      ? "border-emerald-500/60"
      : focused
        ? "border-[#4f8ef7]/60"
        : "border-white/10";

  const glowColor = error
    ? "rgba(244,63,94,0.12)"
    : success
      ? "rgba(16,185,129,0.12)"
      : "rgba(79,142,247,0.12)";

  const iconColor = error
    ? "text-rose-400"
    : success
      ? "text-emerald-400"
      : focused
        ? "text-[#4f8ef7]"
        : "text-[#475569]";

  return (
    <div className="relative">
      {/* Floating Label */}
      <motion.label
        htmlFor={id}
        animate={{
          y: focused || hasValue ? -22 : 0,
          scale: focused || hasValue ? 0.8 : 1,
          color: focused ? "#4f8ef7" : error ? "#f87171" : "#64748b",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute left-11 top-3.5 text-sm font-medium origin-left pointer-events-none z-10"
        style={{ transformOrigin: "left center" }}
      >
        {label}
      </motion.label>

      {/* Icon */}
      <div
        className={[
          "absolute inset-y-0 left-3.5 flex items-center pointer-events-none transition-colors duration-200",
          iconColor,
        ].join(" ")}
      >
        <Icon size={16} />
      </div>

      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...registration}
        onChange={handleChange}
        className={[
          "w-full h-13 pt-5 pb-1.5 pl-11 pr-10 text-sm text-white rounded-xl",
          "bg-white/5 border",
          "focus:outline-none transition-all duration-200",
          "placeholder:text-[#334155] disabled:opacity-50",
          borderColor,
        ].join(" ")}
        style={{
          boxShadow: focused ? `0 0 0 3px ${glowColor}` : undefined,
        }}
      />

      {/* Right indicator */}
      <div className="absolute inset-y-0 right-3 flex items-center">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              <AlertCircle size={15} className="text-rose-400" />
            </motion.div>
          )}
          {success && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              <CheckCircle2 size={15} className="text-emerald-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-1.5 ml-1 text-xs text-rose-400 flex items-center gap-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PasswordInput ─────────────────────────────────────────────────────────────

interface PasswordInputProps {
  id: string;
  label: string;
  error?: string;
  success?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  registration: Record<string, unknown>;
  showCapsWarning?: boolean;
}

export function PasswordInput({
  id,
  label,
  error,
  success,
  autoComplete,
  disabled,
  registration,
  showCapsWarning,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleKeyUp = (e: React.KeyboardEvent) => {
    setCapsLock(e.getModifierState?.("CapsLock") ?? false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    if (registration.onChange) {
      (
        registration.onChange as (
          e: React.ChangeEvent<HTMLInputElement>,
        ) => void
      )(e);
    }
  };

  const borderColor = error
    ? "border-rose-500/60"
    : success
      ? "border-emerald-500/60"
      : focused
        ? "border-[#4f8ef7]/60"
        : "border-white/10";

  const glowColor = error
    ? "rgba(244,63,94,0.12)"
    : success
      ? "rgba(16,185,129,0.12)"
      : "rgba(79,142,247,0.12)";

  return (
    <div className="relative">
      {/* Floating Label */}
      <motion.label
        htmlFor={id}
        animate={{
          y: focused || hasValue ? -22 : 0,
          scale: focused || hasValue ? 0.8 : 1,
          color: focused ? "#4f8ef7" : error ? "#f87171" : "#64748b",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="absolute left-11 top-3.5 text-sm font-medium origin-left pointer-events-none z-10"
        style={{ transformOrigin: "left center" }}
      >
        {label}
      </motion.label>

      {/* Lock Icon */}
      <div
        className={[
          "absolute inset-y-0 left-3.5 flex items-center pointer-events-none transition-colors",
          error
            ? "text-rose-400"
            : success
              ? "text-emerald-400"
              : focused
                ? "text-[#4f8ef7]"
                : "text-[#475569]",
        ].join(" ")}
      >
        <Lock size={16} />
      </div>

      <input
        id={id}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setCapsLock(false);
        }}
        onKeyUp={handleKeyUp}
        {...registration}
        onChange={handleChange}
        className={[
          "w-full h-13 pt-5 pb-1.5 pl-11 pr-20 text-sm text-white rounded-xl",
          "bg-white/5 border",
          "focus:outline-none transition-all duration-200",
          "disabled:opacity-50",
          borderColor,
        ].join(" ")}
        style={{
          boxShadow: focused ? `0 0 0 3px ${glowColor}` : undefined,
        }}
      />

      {/* Right side: caps lock + show/hide */}
      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
        {showCapsWarning && capsLock && focused && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] text-amber-400 font-medium"
          >
            CAPS
          </motion.span>
        )}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((v) => !v)}
          className="text-[#475569] hover:text-white transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 ml-1 text-xs text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
