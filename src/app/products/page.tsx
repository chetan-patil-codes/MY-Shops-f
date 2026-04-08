import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { getCategories, getProducts } from "@/lib/api";

type Props = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const selectedSearch = params.search || "";
  const selectedCategory = params.category || "All";

  const [{ products, total }, categories] = await Promise.all([
    getProducts(selectedSearch, selectedCategory),
    getCategories()
  ]);

  const availableBrands = Array.from(new Set(products.map((product) => product.brand))).slice(0, 8);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 lg:px-6">
      <section className="rounded-[36px] bg-white p-7 shadow-[0_24px_60px_rgba(9,73,177,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4b73b3]">Products</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-[#12233d]">Browse all products</h1>
            <p className="mt-3 max-w-2xl text-base leading-8 text-[#617594]">
              Search and browse backend-seeded products across the categories you selected for this phase.
            </p>
          </div>
          <div className="rounded-[28px] bg-[#f5f9ff] p-5">
            <p className="text-sm font-semibold text-[#2d5795]">Filters included</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Category", "Brand", "Price", "Rating"].map((item) => (
                <span key={item} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#2d5795]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <form className="mt-6 flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            name="search"
            defaultValue={selectedSearch}
            placeholder="Search by name, brand, or category"
            className="w-full rounded-full border border-[#d6e6ff] bg-[#f8fbff] px-5 py-3 outline-none"
          />
          {selectedCategory !== "All" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
          <button
            type="submit"
            className="rounded-full bg-[linear-gradient(135deg,#0055ff,#2b8fff)] px-6 py-3 text-sm font-bold text-white"
          >
            Search
          </button>
        </form>
      </section>

      <section className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-[32px] border border-[#dce9ff] bg-white p-6 shadow-[0_18px_48px_rgba(9,73,177,0.08)]">
          <div>
            <h2 className="text-xl font-black text-[#12233d]">Category</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/products" className="rounded-full border border-[#dce9ff] px-4 py-2 text-sm font-semibold text-[#295189]">
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    selectedCategory === category.name
                      ? "border-[#0f6fff] bg-[#0f6fff] text-white"
                      : "border-[#dce9ff] text-[#295189]"
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#12233d]">Brand</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {availableBrands.map((brand) => (
                <span key={brand} className="rounded-full bg-[#f5f9ff] px-4 py-2 text-sm font-semibold text-[#295189]">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#12233d]">Price</h2>
            <p className="mt-3 text-sm leading-7 text-[#617594]">INR-only catalog. Dynamic slider wiring can be added in phase 2.</p>
          </div>

          <div>
            <h2 className="text-xl font-black text-[#12233d]">Rating</h2>
            <div className="mt-4 space-y-2 text-sm font-semibold text-[#295189]">
              <p>4 star and above</p>
              <p>3 star and above</p>
            </div>
          </div>
        </aside>

        <section className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#12233d]">{total} products available</h2>
              <p className="mt-2 text-sm text-[#617594]">
                {selectedCategory !== "All" ? `Category: ${selectedCategory}` : "All categories"}
                {selectedSearch ? ` | Search: ${selectedSearch}` : ""}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
