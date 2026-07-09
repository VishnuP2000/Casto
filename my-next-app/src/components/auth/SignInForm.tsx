"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { signIn } from "@/src/services/api/AuthServices";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await signIn({
        email,
        password,
      });

      router.push("/home");
    } catch (err) {
      console.log("err",err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Casto
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome Back 👋
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

          <div className="flex items-center gap-3">
            <hr className="flex-1" />
            <span className="text-gray-400">OR</span>
            <hr className="flex-1" />
          </div>

          <button
            type="button"
            className="w-full border py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <p className="text-center text-gray-500">
            Dont have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-semibold"
            >
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}