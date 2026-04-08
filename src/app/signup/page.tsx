import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-140px)] w-full max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-6">
      <section className="rounded-[36px] bg-[linear-gradient(135deg,#12233d,#0f6fff)] p-8 text-white shadow-[0_24px_60px_rgba(9,73,177,0.16)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#dcecff]">Create account</p>
        <h1 className="mt-4 text-5xl font-black leading-none tracking-tight">Join MY shops and unlock a cleaner marketplace experience.</h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-[#eef6ff]">
          Signup uses your FastAPI backend, stores the JWT session locally, and sends you back to the home page.
        </p>
        <div className="mt-8 rounded-[28px] bg-white/12 p-5">
          <p className="text-sm leading-7 text-[#eef6ff]">
            Already registered? Use the login page to continue browsing mobiles, fashion, electronics, and more.
          </p>
          <Link href="/login" className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#12233d]">
            Go to login
          </Link>
        </div>
      </section>
      <AuthForm mode="signup" />
    </main>
  );
}
