import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/api";
import { formatCurrency } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#dce9ff] bg-white shadow-[0_18px_48px_rgba(9,73,177,0.08)]">
      <div className="relative">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={640}
          height={480}
          className="h-60 w-full object-cover"
        />
        <div className="absolute left-4 top-4 rounded-full bg-[#12233d] px-3 py-1 text-xs font-bold text-white">
          {product.discount_percent}% off
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#3770c7]">{product.category}</p>
          <h3 className="text-xl font-black tracking-tight text-[#12233d]">{product.name}</h3>
          <p className="text-sm leading-6 text-[#617594]">{product.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#ebfff1] px-3 py-1 text-sm font-bold text-[#14804a]">
            {product.rating} star
          </span>
          <span className="text-sm text-[#6b7b94]">{product.num_reviews} reviews</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-black text-[#12233d]">{formatCurrency(product.price)}</p>
            <p className="text-sm text-[#7f91ab] line-through">{formatCurrency(product.original_price)}</p>
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-[linear-gradient(135deg,#0055ff,#2b8fff)] px-5 py-3 text-sm font-bold text-white"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
