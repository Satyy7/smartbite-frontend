"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
    await refreshUser();
    router.push("/");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Background Gradient Wash */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-(--secondary)/20 via-(--background) to-(--primary)/20" />

      {/* Floating Blob */}
      <div className="absolute w-96 h-96 bg-(--secondary)/20 rounded-full blur-3xl -top-20 -left-20 animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute w-md h-112 bg-(--primary)/15 rounded-full blur-3xl bottom-0 right-0 animate-[pulse_10s_ease-in-out_infinite]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass card-shadow rounded-3xl p-10 w-full max-w-md backdrop-blur-xl"
      >
        <h2 className="text-3xl font-bold mb-2 gradient-text text-center">
          Welcome Back
        </h2>

        <p className="text-neutral-600 text-sm text-center mb-8">
          Login to unlock personalized food recommendations.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-neutral-200 outline-none focus:ring-2 focus:ring-(--secondary)/50 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white/70 border border-neutral-200 outline-none focus:ring-2 focus:ring-(--secondary)/50 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-linear-to-r from-(--secondary) to-(--primary) text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-neutral-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-(--primary) font-medium hover:underline"
          >
            Create one
          </Link>
        </div>
      </motion.div>
    </div>
  );
}