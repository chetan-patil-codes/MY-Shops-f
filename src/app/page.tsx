import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/api";

const heroStats = [
  { label: "Products", value: "30+" },
  { label: "Categories", value: "6" },
  { label: "Trusted style", value: "Brand blue" }
];

const valueCards = [
  { title: "Fast product discovery", text: "Search-first shopping flow with category-led browsing." },
  { title: "Fresh offers", text: "Modern promotional sections, price drops, and launch-ready merchandising." },
  { title: "Backend-powered", text: "Real FastAPI endpoints for auth, products, and category data." }
];

export default async function HomePage() {
  const [{ products }, categories] = await Promise.all([getProducts(), getCategories()]);
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 lg:px-6 lg:py-10">
      <section className="grid gap-8 rounded-[40px] bg-[linear-gradient(135deg,#0055ff_0%,#0d6bff_50%,#55b6ff_100%)] px-7 py-8 text-white shadow-[0_28px_70px_rgba(4,75,194,0.26)] lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-10">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#d7e8ff]">MY shops marketplace</p>
          <h1 className="max-w-3xl text-5xl font-black leading-none tracking-tight lg:text-7xl">
            Cleaner shopping, built for real e-commerce flow.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#edf4ff] lg:text-lg">
            Browse mobiles, fashion, electronics, home, beauty, and appliances with a modern shopping experience backed by a FastAPI + SQLite backend.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0055ff]">
              Shop products
            </Link>
            <Link href="/signup" className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white">
              Create account
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {heroStats.map((item) => (
              <div key={item.label} className="rounded-[24px] border border-white/20 bg-white/10 p-4">
                <p className="text-3xl font-black">{item.value}</p>
                <p className="mt-1 text-sm text-[#e2eeff]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 self-end">
          <div className="rounded-[32px] bg-white p-6 text-[#12233d]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4b73b3]">Popular categories</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories.map((category) => (
                <span key={category.name} className="rounded-full bg-[#edf5ff] px-4 py-2 text-sm font-bold text-[#275392]">
                  {category.name} | {category.count}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-white/20 bg-[#0b2e73]/55 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#cbe1ff]">What you asked for</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/90">
              <li>Login and signup with JWT auth</li>
              <li>Home, products, and product details pages</li>
              <li>Categories and offers in a modern blue UI</li>
              <li>Product data controlled from the backend seed</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {valueCards.map((card) => (
          <article key={card.title} className="rounded-[30px] border border-[#dbe9ff] bg-white p-6 shadow-[0_18px_48px_rgba(9,73,177,0.08)]">
            <h2 className="text-2xl font-black tracking-tight text-[#12233d]">{card.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#617594]">{card.text}</p>
          </article>
        ))}
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4b73b3]">Featured now</p>
            <h2 className="text-4xl font-black tracking-tight text-[#12233d]">Top picks across MY shops</h2>
          </div>
          <Link href="/products" className="rounded-full bg-[#12233d] px-5 py-3 text-sm font-bold text-white">
            View all products
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
