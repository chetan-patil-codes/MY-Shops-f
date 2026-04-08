"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";

const navItems = [
  { href: "/", label: "Home", icon: "HM" },
  { href: "/orders", label: "Orders", icon: "OR" },
  { href: "/wishlist", label: "Wishlist", icon: "WL" },
  { href: "/cart", label: "Cart", icon: "CT" },
  { href: "/account", label: "Account", icon: "AC" }
];

export function AppShell({
  children,
  title,
  subtitle,
  searchSlot
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  searchSlot?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen p-0 md:p-6">
      <div className="mx-auto flex min-h-screen w-full max-w-[860px] flex-col overflow-hidden border border-sky-100 bg-white shadow-[0_18px_40px_rgba(32,79,166,0.12)] transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_18px_40px_rgba(0,0,0,0.35)] md:rounded-[36px]">
        <header className="border-b border-sky-100 bg-[linear-gradient(180deg,#d9efff_0%,#eef7ff_78%)] px-4 pb-4 pt-6 transition-colors duration-300 dark:border-slate-700 dark:bg-[linear-gradient(180deg,#163154_0%,#121b2c_80%)] md:px-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2663ff,#7ec3ff)] text-lg font-extrabold text-white">
                M
              </div>
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {subtitle}
                </p>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {title}
                  </h1>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-slate-800/80 dark:text-sky-200">
                    {user?.name || "Guest"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {user ? (
                <button
                  onClick={logout}
                  className="rounded-2xl bg-[linear-gradient(135deg,#2663ff,#1547d5)] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(38,99,255,0.26)] transition hover:opacity-95"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="rounded-2xl bg-[linear-gradient(135deg,#2663ff,#1547d5)] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(38,99,255,0.26)] transition hover:opacity-95"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {searchSlot}
        </header>

        <div className="grid flex-1 gap-4 px-4 pb-28 pt-4 md:px-5">{children}</div>

        <nav className="sticky bottom-0 z-10 grid grid-cols-5 gap-1 border-t border-sky-100 bg-white/95 px-3 py-4 backdrop-blur transition-colors dark:border-slate-700 dark:bg-slate-900/95">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`grid justify-items-center gap-2 text-center ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <small className="text-sm font-medium">{item.label}</small>
              </Link>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
