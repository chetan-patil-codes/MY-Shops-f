export type Product = {
  id: string;
  type: string;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "shoe-casual-01",
    type: "Footwear",
    title: "Men's Casual Shoes",
    price: "$79",
    category: "Fashion",
    description: "Clean everyday sneakers with soft cushioning and a modern street profile.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "shoe-sport-01",
    type: "Footwear",
    title: "Men's Sports Shoes",
    price: "$92",
    category: "Fashion",
    description: "Performance-ready runners with lightweight support and breathable mesh.",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "laptop-01",
    type: "Electronics",
    title: 'ASUS Vivobook S',
    price: "$899",
    category: "Electronics",
    description: "Slim laptop with sharp display, long battery life, and daily productivity power.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "audio-01",
    type: "Audio",
    title: "Echo Pro Headphones",
    price: "$149",
    category: "Electronics",
    description: "Noise-cancelling over-ear headphones with rich sound and premium comfort.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "mobile-01",
    type: "Mobiles",
    title: "Nova X Smartphone",
    price: "$299",
    category: "Mobiles",
    description: "Fast 5G phone with vivid display, dual cameras, and all-day battery.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "fashion-tee-01",
    type: "Fashion",
    title: "Minimal Cotton Tee",
    price: "$39",
    category: "Fashion",
    description: "Soft premium cotton T-shirt with a clean fit for daily essentials.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "beauty-01",
    type: "Beauty",
    title: "Hydra Glow Serum",
    price: "$29",
    category: "Beauty",
    description: "Lightweight face serum that hydrates, smooths, and brightens skin tone.",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "home-01",
    type: "Home",
    title: "Nordic Table Lamp",
    price: "$59",
    category: "Home",
    description: "Minimal blue-accent lamp designed to warm up modern workspaces.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
  }
];

export const nearbyItems = [
  {
    title: "Urban Fashion",
    description: "Trending streetwear and modern fits.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Audio Deals",
    description: "Premium sound under this week's best prices.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80"
  }
];

export const supportItems = [
  {
    title: "Orders",
    description: "Track shipments, cancel requests, and re-order quickly."
  },
  {
    title: "Cart",
    description: "Review saved items and jump back into checkout anytime."
  },
  {
    title: "Profile",
    description: "Manage addresses, payment methods, and preferences."
  },
  {
    title: "Offers",
    description: "Unlock coupons, referrals, and special member discounts."
  }
];
