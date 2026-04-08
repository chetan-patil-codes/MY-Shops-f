"use client";

import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { useAuth } from "@/components/auth-provider";

export default function AccountPage() {
  const { user, isReady } = useAuth();

  return (
    <AppShell title="Account" subtitle="Profile and settings">
      <SectionCard>
        {!isReady ? (
          <>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Checking session</h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Validating your backend login state.
            </p>
          </>
        ) : user ? (
          <>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Profile</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="rounded-[18px] bg-sky-50 p-4 dark:bg-slate-800">
                <strong className="block text-slate-900 dark:text-white">Name</strong>
                <span>{user.name}</span>
              </div>
              <div className="rounded-[18px] bg-sky-50 p-4 dark:bg-slate-800">
                <strong className="block text-slate-900 dark:text-white">Email</strong>
                <span>{user.email}</span>
              </div>
              <div className="rounded-[18px] bg-sky-50 p-4 dark:bg-slate-800">
                <strong className="block text-slate-900 dark:text-white">Saved preferences</strong>
                <span>Blue theme, backend-auth account, browser-saved cart and wishlist state.</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">No account signed in</h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Create an account through the backend API to save your profile and access your shopping state.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex rounded-2xl bg-[linear-gradient(135deg,#2663ff,#1547d5)] px-5 py-3 text-sm font-bold text-white"
            >
              Go to login
            </Link>
          </>
        )}
      </SectionCard>
    </AppShell>
  );
}
