import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProduct, type Product } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import { CheckoutModal } from "@/components/checkout-modal";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product: Product;

  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 lg:px-6">
      <Link href="/products" className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#295189] shadow-[0_14px_36px_rgba(9,73,177,0.08)]">
        Back to products
      </Link>

      <section className="grid gap-8 rounded-[36px] border border-[#dce9ff] bg-white p-6 shadow-[0_24px_60px_rgba(9,73,177,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[32px] bg-[#f4f8ff]">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={900}
              height={700}
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {product.images.slice(1).map((image: string) => (
              <div key={image} className="overflow-hidden rounded-[24px] bg-[#f4f8ff]">
                <Image src={image} alt={product.name} width={500} height={360} className="h-52 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4b73b3]">
              {product.category} | {product.brand}
            </p>
            <h1 className="text-5xl font-black leading-none tracking-tight text-[#12233d]">{product.name}</h1>
            <p className="text-base leading-8 text-[#617594]">{product.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#ebfff1] px-4 py-2 text-sm font-bold text-[#14804a]">
              {product.rating} star
            </span>
            <span className="text-sm font-semibold text-[#617594]">{product.num_reviews} ratings and reviews</span>
            <span className="rounded-full bg-[#edf5ff] px-4 py-2 text-sm font-semibold text-[#295189]">
              Stock: {product.stock}
            </span>
          </div>

          <div className="rounded-[28px] bg-[#f7faff] p-5">
            <div className="flex items-end gap-4">
              <p className="text-4xl font-black text-[#12233d]">{formatCurrency(product.price)}</p>
              <p className="pb-1 text-lg text-[#8293ac] line-through">{formatCurrency(product.original_price)}</p>
              <p className="pb-1 text-lg font-bold text-[#14804a]">{product.discount_percent}% off</p>
            </div>
            <p className="mt-2 text-sm text-[#617594]">Inclusive of all taxes. Currency fixed to INR as requested.</p>
          </div>

          <div className="rounded-[28px] bg-[linear-gradient(135deg,#0f6fff,#58b8ff)] p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#dcecff]">Checkout</p>
            <h2 className="mt-3 text-2xl font-black">Pay now or choose an EMI plan.</h2>
            <p className="mt-3 text-sm leading-7 text-[#edf5ff]">
              This is a safe demo checkout flow (no real payment gateway yet), but the buttons are functional so you can test the UI end-to-end.
            </p>
            <CheckoutModal productName={product.name} price={product.price} currencyLabel={product.currency} disabled={!product.is_available} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[32px] border border-[#dce9ff] bg-white p-6 shadow-[0_18px_48px_rgba(9,73,177,0.08)]">
          <h2 className="text-2xl font-black tracking-tight text-[#12233d]">Key features</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#617594]">
            {product.features.map((feature: string) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-[32px] border border-[#dce9ff] bg-white p-6 shadow-[0_18px_48px_rgba(9,73,177,0.08)]">
          <h2 className="text-2xl font-black tracking-tight text-[#12233d]">Specifications</h2>
          <div className="mt-4 divide-y divide-[#ebf2ff]">
            {Object.entries(product.specifications).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 py-3">
                <span className="text-sm font-semibold text-[#617594]">{label}</span>
                <span className="text-sm font-bold text-[#12233d]">{value}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
