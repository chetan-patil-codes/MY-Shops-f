"use client";

import { AppShell } from "@/components/app-shell";
import { SectionCard } from "@/components/section-card";

const faqs = [
  {
    question: "How do I track an order?",
    answer: "Open the Orders page to see statuses like Placed, Shipped, Out for Delivery, and Delivered."
  },
  {
    question: "How do I save products for later?",
    answer: "Use the wishlist buttons on product cards. They stay saved in your browser."
  },
  {
    question: "Will my cart stay after refresh?",
    answer: "Yes. Cart and wishlist stay in your browser, while login uses the backend API."
  }
];

export default function HelpPage() {
  return (
    <AppShell title="Help Center" subtitle="Support and FAQs">
      <SectionCard>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Support options</h2>
        <div className="mt-4 grid gap-3">
          <div className="rounded-[18px] bg-sky-50 p-4 dark:bg-slate-800">
            <strong className="text-slate-900 dark:text-white">Call support</strong>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">+91 1800-123-myshops</p>
          </div>
          <div className="rounded-[18px] bg-sky-50 p-4 dark:bg-slate-800">
            <strong className="text-slate-900 dark:text-white">Email support</strong>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">support@myshops.local</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">FAQs</h2>
        <div className="mt-4 grid gap-3">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-[18px] bg-sky-50 p-4 dark:bg-slate-800">
              <strong className="text-slate-900 dark:text-white">{faq.question}</strong>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
