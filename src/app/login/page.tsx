import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-140px)] w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-6">
      <section className="rounded-[36px] bg-[linear-gradient(135deg,#0f6fff,#62bcff)] p-8 text-white shadow-[0_24px_60px_rgba(9,73,177,0.16)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#dcecff]">Sign in</p>
        <h1 className="mt-4 text-5xl font-black leading-none tracking-tight">Pick up your shopping journey where you left it.</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-[#eef6ff]">
          Login redirects straight to home after success, with the session stored locally for the current browser.
        </p>
        <div className="mt-8 rounded-[28px] bg-white/14 p-5">
          <p className="text-sm leading-7 text-[#eef6ff]">
            New here? Create your MY shops account and start browsing backend-powered product listings.
          </p>
          <Link href="/signup" className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0055ff]">
            Go to signup
          </Link>
        </div>
      </section>
      <AuthForm mode="login" />
    </main>
  );
}
