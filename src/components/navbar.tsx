"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" }
];

const categoryLinks = ["Mobiles", "Fashion", "Electronics", "Home", "Beauty", "Appliances"];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isReady } = useAuth();
  const userName = user?.name || "";
  const [query, setQuery] = useState("");

  useEffect(() => {
    const syncFromLocation = () => {
      const params = new URL(window.location.href).searchParams;
      const existing = params.get("search") || "";
      setQuery(existing);
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [pathname]);

  function onSubmitSearch(e: React.FormEvent) {
    e.preventDefault();
    const next = query.trim();
    const params = new URLSearchParams();
    if (next) params.set("search", next);
    const currentParams = new URL(window.location.href).searchParams;
    const currentCategory = currentParams.get("category") || "";
    if (currentCategory) params.set("category", currentCategory);
    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : "/products");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#d9e8ff] bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 lg:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0055ff,#37a6ff)] text-lg font-black text-white">
            MY
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5d7290]">
              Modern storefront
            </p>
            <h1 className="text-2xl font-black tracking-tight text-[#12233d]">MY shops</h1>
          </div>
        </Link>

        <form
          onSubmit={onSubmitSearch}
          className="hidden flex-1 items-center gap-3 rounded-full border border-[#d5e6ff] bg-[#f4f8ff] px-4 py-3 lg:flex"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mobiles, fashion, electronics, beauty..."
            className="w-full bg-transparent text-sm font-semibold text-[#23406d] outline-none placeholder:text-[#7f93b2]"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0055ff] shadow-[0_10px_24px_rgba(9,73,177,0.12)]"
          >
            Search
          </button>
        </form>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? "bg-[#0f6fff] text-white" : "text-[#23406d] hover:bg-[#eef5ff]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <Link
            href="/cart"
            className="hidden rounded-full border border-[#d5e6ff] px-4 py-2 text-sm font-semibold text-[#23406d] md:block"
          >
            Cart
          </Link>
          {userName ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-[#12233d] px-4 py-2 text-sm font-semibold text-white"
            >
              {userName} | Logout
            </button>
          ) : (
            <Link href="/login" className="rounded-full bg-[#12233d] px-4 py-2 text-sm font-semibold text-white">
              {isReady ? "Account" : "Loading..."}
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-[#edf4ff] bg-[#f9fbff]">
        <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 py-3 lg:px-6">
          {categoryLinks.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="shrink-0 rounded-full border border-[#d7e8ff] bg-white px-4 py-2 text-sm font-semibold text-[#295189]"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
