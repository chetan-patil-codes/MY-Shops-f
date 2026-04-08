"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";

type Mode = "login" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSignup = mode === "signup";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = isSignup
        ? await signup(name, email, password)
        : await login(email, password);

      if (!result.ok) {
        throw new Error(result.message || "Authentication failed");
      }

      router.push("/");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[32px] border border-[#d8e8ff] bg-white p-8 shadow-[0_24px_60px_rgba(9,73,177,0.08)]"
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4b73b3]">
          {isSignup ? "Create account" : "Welcome back"}
        </p>
        <h1 className="text-4xl font-black tracking-tight text-[#12233d]">
          {isSignup ? "Start shopping smarter" : "Sign in to MY shops"}
        </h1>
      </div>

      {isSignup ? (
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-[#294a7f]">Full name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-[#d6e6ff] bg-[#f8fbff] px-4 py-3 outline-none"
            placeholder="Enter your full name"
            required
          />
        </label>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-[#294a7f]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-2xl border border-[#d6e6ff] bg-[#f8fbff] px-4 py-3 outline-none"
          placeholder="you@example.com"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-[#294a7f]">Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-[#d6e6ff] bg-[#f8fbff] px-4 py-3 outline-none"
          placeholder="Enter your password"
          required
        />
      </label>

      {error ? <p className="text-sm font-semibold text-[#c83939]">{error}</p> : null}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-[linear-gradient(135deg,#0055ff,#2b8fff)] px-5 py-3.5 text-sm font-bold text-white disabled:opacity-60"
      >
        {isLoading ? "Please wait..." : isSignup ? "Create account" : "Login"}
      </button>
    </form>
  );
}
