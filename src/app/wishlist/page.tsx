"use client";

import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { useShop } from "@/components/shop-provider";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, products, isLoadingProducts, productsError } =
    useShop();
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <AppShell title="Wishlist" subtitle="Saved products">
      <SectionCard>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Wishlist items</h2>
        {items.length ? (
          <div className="mt-4 grid gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 rounded-[20px] border border-sky-100 bg-white p-3 dark:border-slate-700 dark:bg-slate-900 sm:grid-cols-[140px_minmax(0,1fr)]"
              >
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  width={220}
                  height={180}
                  className="h-[130px] w-full rounded-2xl object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => addToCart(item.id)}
                      className="rounded-2xl bg-[linear-gradient(135deg,#2663ff,#1547d5)] px-4 py-2.5 text-sm font-bold text-white"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item.id)}
                      className="rounded-2xl bg-sky-50 px-4 py-2.5 text-sm font-semibold text-blue-700 dark:bg-slate-800 dark:text-sky-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isLoadingProducts ? (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading wishlist products...</p>
        ) : productsError ? (
          <p className="mt-4 text-sm text-rose-500">{productsError}</p>
        ) : (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            No saved products yet. Browse the <Link href="/" className="text-blue-600">homepage</Link> and add some.
          </p>
        )}
      </SectionCard>
    </AppShell>
  );
}
