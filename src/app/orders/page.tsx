"use client";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";

const orders = [
  { id: "OD-2091", item: "Nova X Smartphone", status: "Placed", eta: "Arriving tomorrow" },
  { id: "OD-1844", item: "Echo Pro Headphones", status: "Shipped", eta: "Reached city hub" },
  { id: "OD-1533", item: "Men's Sports Shoes", status: "Out for Delivery", eta: "Today by 7 PM" },
  { id: "OD-1208", item: "ASUS Vivobook S", status: "Delivered", eta: "Delivered on Monday" }
];

export default function OrdersPage() {
  return (
    <AppShell title="Orders" subtitle="Track your purchases">
      <SectionCard>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Recent orders</h2>
        <div className="mt-4 grid gap-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[20px] border border-sky-100 bg-sky-50 p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-slate-900 dark:text-white">{order.item}</strong>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-slate-900 dark:text-sky-300">
                  {order.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{order.id}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{order.eta}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
