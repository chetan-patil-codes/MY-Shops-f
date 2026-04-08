"use client";

import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";
import { useShop } from "@/components/shop-provider";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const { cart, clearCart, products, removeFromCart, isLoadingProducts, productsError } = useShop();
  const items = products.filter((product) => cart.includes(product.id));
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = items.length ? 12 : 0;
  const discount = items.length >= 3 ? 15 : 0;
  const total = subtotal + deliveryFee - discount;
  const currency = items[0]?.currency || "INR";

  return (
    <AppShell title="Cart" subtitle="Review your items">
      <SectionCard>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Cart items</h2>
          {items.length ? (
            <button
              type="button"
              onClick={clearCart}
              className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-slate-800 dark:text-sky-300"
            >
              Clear cart
            </button>
          ) : null}
        </div>

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
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <strong className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {formatCurrency(item.price, item.currency)}
                    </strong>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
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
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading cart products...</p>
        ) : productsError ? (
          <p className="mt-4 text-sm text-rose-500">{productsError}</p>
        ) : (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Your cart is empty. Explore products on the <Link href="/" className="text-blue-600">homepage</Link>.
          </p>
        )}
      </SectionCard>

      <SectionCard>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Checkout summary</h2>
        <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal, currency)}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Delivery fee</span>
            <strong>{formatCurrency(deliveryFee, currency)}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <strong>-{formatCurrency(discount, currency)}</strong>
          </div>
          <div className="flex items-center justify-between border-t border-sky-100 pt-3 text-base font-bold text-slate-900 dark:border-slate-700 dark:text-white">
            <span>Total</span>
            <span>{formatCurrency(total, currency)}</span>
          </div>
        </div>
      </SectionCard>
    </AppShell>
  );
}
