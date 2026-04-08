"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { useShop } from "@/components/shop-provider";
import { nearbyItems, products, supportItems } from "@/data/products";

const categories = [
  { icon: "FY", label: "For You", value: "All" },
  { icon: "FS", label: "Fashion", value: "Fashion" },
  { icon: "MB", label: "Mobiles", value: "Mobiles" },
  { icon: "BY", label: "Beauty", value: "Beauty" },
  { icon: "EL", label: "Electronics", value: "Electronics" }
];

const quickActions = [
  { icon: "OR", label: "Orders", href: "/orders" },
  { icon: "WL", label: "Wishlist", href: "/wishlist" },
  { icon: "CP", label: "Coupons", href: "/account" },
  { icon: "HP", label: "Help Center", href: "/help" }
];

export function Storefront() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const {
    addToCart,
    addToWishlist,
    isInCart,
    isInWishlist,
    removeFromWishlist
  } = useShop();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesQuery =
        !normalizedQuery ||
        [product.title, product.type, product.category, product.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const lookingItems = filteredProducts.slice(0, 3);
  const featuredProducts = filteredProducts.slice(0, 6);

  return (
    <AppShell
      title="myshops"
      subtitle="Welcome back"
      searchSlot={
        <>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-3 rounded-[24px] border-2 border-sky-300 bg-white px-4 py-4 transition-colors dark:border-sky-800 dark:bg-slate-900">
              <span className="text-xl text-slate-400 dark:text-slate-500">S</span>
              <input
                aria-label="Search products"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                placeholder="Search for shoes, mobiles, fashion..."
              />
              <span className="text-xl text-slate-400 dark:text-slate-500">C</span>
            </div>
            <button
              type="button"
              aria-label="Open scanner"
              className="grid h-[52px] w-[52px] place-items-center rounded-[18px] bg-white text-lg text-slate-500 shadow-[0_10px_30px_rgba(32,79,166,0.12)] transition-colors dark:bg-slate-800 dark:text-slate-300"
            >
              QR
            </button>
          </div>

          <nav className="mt-4 grid grid-cols-5 gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.value;

              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => setActiveCategory(category.value)}
                  className={`grid min-w-[72px] justify-items-center gap-2 border-b-[3px] px-1 pb-3 pt-2 text-center text-sm ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-white text-lg shadow-[0_10px_30px_rgba(32,79,166,0.12)] transition-colors dark:bg-slate-800">
                    {category.icon}
                  </span>
                  <span>{category.label}</span>
                </button>
              );
            })}
          </nav>
        </>
      }
    >
      <section className="grid gap-4 rounded-[30px] bg-[linear-gradient(135deg,rgba(27,88,230,0.95),rgba(23,31,51,0.96))] p-6 text-white shadow-[0_18px_40px_rgba(32,79,166,0.18)]">
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-blue-100">
            Summer Sale
          </p>
          <h2 className="max-w-xl text-3xl font-extrabold leading-tight">
            Search and shop real product styles across fashion, mobiles, beauty, and electronics.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50/90">
            Discover curated products fast with a cleaner mobile-first shopping experience.
          </p>
        </div>
        <div className="grid w-fit gap-1 rounded-[22px] bg-white/12 px-5 py-4">
          <span className="text-sm text-blue-100">Results</span>
          <strong className="text-4xl font-extrabold">{filteredProducts.length}</strong>
          <small className="text-sm text-blue-50/90">products matched your current search</small>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-4 rounded-[22px] border border-sky-100 bg-white px-5 py-5 text-xl shadow-[0_18px_40px_rgba(32,79,166,0.12)] transition-colors dark:border-slate-700 dark:bg-slate-900"
          >
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-sky-50 text-xl text-blue-600">
                  {action.icon}
                </span>
                <strong className="dark:text-white">{action.label}</strong>
          </Link>
        ))}
      </section>

      <SectionCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#ffe37a,#ff9d66)] text-lg text-amber-900">
            UP
          </span>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add/Verify your Email</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Get the latest updates about orders, offers, and account activity.
            </p>
          </div>
        </div>
        <Link
          href="/account"
          className="rounded-2xl bg-[linear-gradient(135deg,#2663ff,#1547d5)] px-5 py-3 text-center text-sm font-bold text-white shadow-[0_10px_30px_rgba(38,99,255,0.26)]"
        >
          Update
        </Link>
      </SectionCard>

      <SectionCard className="bg-[linear-gradient(180deg,#dff0ff,#ffffff)]">
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Chetan, still looking for these?
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {lookingItems.map((item) => (
            <article
              key={item.id}
              className="rounded-[20px] border border-sky-100 bg-white p-2 shadow-[0_10px_30px_rgba(32,79,166,0.08)] transition-colors dark:border-slate-700 dark:bg-slate-900"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={320}
                height={220}
                className="h-[180px] w-full rounded-2xl object-cover"
              />
              <p className="px-1 pb-2 pt-3 text-base font-medium text-slate-700 dark:text-slate-100">
                {item.title}
              </p>
              <div className="px-1 pb-2">
                <button
                  type="button"
                  onClick={() =>
                    isInWishlist(item.id)
                      ? removeFromWishlist(item.id)
                      : addToWishlist(item.id)
                  }
                  className="rounded-full bg-sky-50 px-3 py-2 text-xs font-semibold text-blue-700"
                >
                  {isInWishlist(item.id) ? "Remove Wishlist" : "Save Wishlist"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard className="bg-[linear-gradient(180deg,#82c9ff,#dff1ff)] dark:bg-[linear-gradient(180deg,#23558f,#162236)]">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Popular nearby
          </h3>
          <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold text-slate-700">
            Fresh picks
          </span>
        </div>
        <div className="mt-4 grid gap-3">
          {nearbyItems.map((item) => (
            <article
              key={item.title}
              className="grid gap-4 rounded-[20px] bg-white/80 p-3 shadow-[0_10px_30px_rgba(32,79,166,0.08)] transition-colors dark:bg-slate-900/80 sm:grid-cols-[120px_minmax(0,1fr)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={160}
                className="h-[110px] w-full rounded-2xl object-cover"
              />
              <div>
                <strong className="text-lg text-slate-900 dark:text-white">{item.title}</strong>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Finance Options
        </p>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          EMI, rewards, wallet cash, and instant bank discounts.
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Make larger purchases easier with flexible payment options built into checkout.
        </p>
      </SectionCard>

      <section>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Featured Products
          </h3>
          <span className="text-sm font-bold text-blue-600">
            {query ? `Showing results for "${query}"` : "Browse all"}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[20px] border border-sky-100 bg-white shadow-[0_18px_40px_rgba(32,79,166,0.12)] transition-colors dark:border-slate-700 dark:bg-slate-900"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={320}
                height={220}
                className="h-[210px] w-full object-cover"
              />
              <div className="p-4">
                <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">{product.type}</p>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{product.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <strong className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {product.price}
                  </strong>
                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="rounded-2xl bg-[linear-gradient(135deg,#2663ff,#1547d5)] px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(38,99,255,0.26)]"
                  >
                    {isInCart(product.id) ? "Added" : "Add"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product.id)
                  }
                  className="mt-3 rounded-full bg-sky-50 px-3 py-2 text-xs font-semibold text-blue-700 dark:bg-slate-800 dark:text-sky-300"
                >
                  {isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                </button>
              </div>
            </article>
          ))}
        </div>
        {featuredProducts.length === 0 ? (
          <SectionCard className="mt-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">No products found</h4>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Try a different keyword like `shoes`, `mobile`, `beauty`, or `laptop`.
            </p>
          </SectionCard>
        ) : null}
      </section>

      <SectionCard className="bg-[linear-gradient(180deg,#eff6ff,#ffffff)]">
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Account and support
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {supportItems.map((item) => (
            <div key={item.title} className="rounded-[18px] bg-sky-50 p-4 transition-colors dark:bg-slate-800">
              <strong className="text-lg text-slate-900 dark:text-white">{item.title}</strong>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
