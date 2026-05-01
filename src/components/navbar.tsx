"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useShop } from "@/components/shop-provider";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isReady } = useAuth();
  const { cart } = useShop();
  const userName = user?.name || "";
  const [query, setQuery] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const syncFromLocation = () => {
      const params = new URL(window.location.href).searchParams;
      const existing = params.get("search") || "";
      setQuery(existing);
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [pathname]);

  function onSubmitSearch(e: React.FormEvent) {
    e.preventDefault();
    const next = query.trim();
    const params = new URLSearchParams();
    if (next) params.set("search", next);
    const currentParams = new URL(window.location.href).searchParams;
    const currentCategory = currentParams.get("category") || "";
    if (currentCategory) params.set("category", currentCategory);
    const qs = params.toString();
    router.push(qs ? `/products?${qs}` : "/products");
  }

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <Link href="/" className="logo">
            <span>My Shops</span>
            <span>Explore Plus</span>
          </Link>
          <form className="search-bar" onSubmit={onSubmitSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">&#128269;</button>
          </form>
          <div className="nav-btns">
            <button className="dark-toggle" onClick={toggleDark} title="Toggle dark mode" type="button">
              &#9790;
            </button>
            <div className="nav-btn">
              {userName ? (
                <button className="login-btn" onClick={logout} type="button">
                  {userName}
                </button>
              ) : (
                <Link href="/login">
                  <button className="login-btn" type="button">{isReady ? "Login" : "Loading"}</button>
                </Link>
              )}
            </div>
            <Link href="/cart" className="nav-btn">
              <span>&#128722;</span>
              <span>Cart</span>
              <span className="cart-count">{cart.length}</span>
            </Link>
            <div className={`more-wrap ${moreOpen ? "open" : ""}`}>
              <button className="more-btn" onClick={() => setMoreOpen(!moreOpen)} type="button">
                More <span className="more-arrow">&#9660;</span>
              </button>
              <div className="more-dropdown">
                <div className="more-about-hero">
                  <div className="more-about-logo">My Shops</div>
                  <div className="more-about-tag">Explore Plus — India's Favourite Online Marketplace</div>
                  <div className="more-about-desc">
                    My Shops is India's leading e-commerce platform, connecting millions of buyers with trusted sellers across the country. From electronics and fashion to groceries and home essentials — we bring everything you need, right to your doorstep with guaranteed quality and unbeatable prices.
                  </div>
                  <div className="more-about-stats">
                    <div className="more-stat"><div className="more-stat-val">500M+</div><div className="more-stat-label">Customers</div></div>
                    <div className="more-stat"><div className="more-stat-val">1.4M+</div><div className="more-stat-label">Sellers</div></div>
                    <div className="more-stat"><div className="more-stat-val">150M+</div><div className="more-stat-label">Products</div></div>
                    <div className="more-stat"><div className="more-stat-val">26K+</div><div className="more-stat-label">Pincodes</div></div>
                  </div>
                </div>

                <div className="more-mission" style={{ marginTop: "14px" }}>
                  <div className="more-mission-title">&#127919; Our Mission</div>
                  <div className="more-mission-text">To transform commerce in India through technology, making it simple, affordable and accessible for every Indian — from big cities to the smallest towns.</div>
                </div>

                <div className="more-features">
                  <div className="more-feat-title">Why Shop with Us</div>
                  <div className="more-feat-grid">
                    <div className="more-feat-card" onClick={() => setMoreOpen(false)}>
                      <div className="more-feat-icon">&#128666;</div>
                      <div className="more-feat-name">Fast Delivery</div>
                      <div className="more-feat-sub">Same day in 20+ cities</div>
                    </div>
                    <div className="more-feat-card" onClick={() => setMoreOpen(false)}>
                      <div className="more-feat-icon">&#128260;</div>
                      <div className="more-feat-name">Easy Returns</div>
                      <div className="more-feat-sub">10-day hassle-free</div>
                    </div>
                    <div className="more-feat-card" onClick={() => setMoreOpen(false)}>
                      <div className="more-feat-icon">&#128274;</div>
                      <div className="more-feat-name">Secure Pay</div>
                      <div className="more-feat-sub">100% safe checkout</div>
                    </div>
                    <div className="more-feat-card" onClick={() => setMoreOpen(false)}>
                      <div className="more-feat-icon">&#11088;</div>
                      <div className="more-feat-name">My Shops+</div>
                      <div className="more-feat-sub">Free delivery & more</div>
                    </div>
                    <div className="more-feat-card" onClick={() => setMoreOpen(false)}>
                      <div className="more-feat-icon">&#129689;</div>
                      <div className="more-feat-name">SuperCoins</div>
                      <div className="more-feat-sub">Earn on every order</div>
                    </div>
                    <div className="more-feat-card" onClick={() => setMoreOpen(false)}>
                      <div className="more-feat-icon">&#128179;</div>
                      <div className="more-feat-name">No-Cost EMI</div>
                      <div className="more-feat-sub">On 1000+ products</div>
                    </div>
                  </div>
                </div>

                <div className="more-divider"></div>

                <div className="more-quick-links">
                  <div className="more-quick-title">Quick Links</div>
                  <div className="more-links-grid">
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#128230;</span> My Orders</div>
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#10084;</span> Wishlist</div>
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#128100;</span> My Profile</div>
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#127881;</span> Rewards &amp; Coupons</div>
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#127873;</span> Gift Cards</div>
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#10067;</span> Help Centre</div>
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#128200;</span> Sell on My Shops</div>
                    <div className="more-item" onClick={() => setMoreOpen(false)}><span className="more-item-icon">&#128276;</span> Notifications</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="cat-bar">
        <div className="cat-inner">
          <Link href="/products?category=Grocery" className="cat-item"><div className="cat-emoji">&#127822;</div><span>Grocery</span></Link>
          <Link href="/products?category=Mobiles" className="cat-item"><div className="cat-emoji">&#128241;</div><span>Mobiles</span></Link>
          <Link href="/products?category=Fashion" className="cat-item"><div className="cat-emoji">&#128084;</div><span>Fashion</span></Link>
          <Link href="/products?category=Electronics" className="cat-item"><div className="cat-emoji">&#128187;</div><span>Electronics</span></Link>
          <Link href="/products?category=Home" className="cat-item"><div className="cat-emoji">&#127968;</div><span>Home</span></Link>
          <Link href="/products?category=Appliances" className="cat-item"><div className="cat-emoji">&#128268;</div><span>Appliances</span></Link>
          <Link href="/products?category=Travel" className="cat-item"><div className="cat-emoji">&#9992;</div><span>Travel</span></Link>
          <Link href="/products?category=Beauty" className="cat-item"><div className="cat-emoji">&#128138;</div><span>Beauty</span></Link>
          <Link href="/products?category=Toys" className="cat-item"><div className="cat-emoji">&#127902;</div><span>Toys</span></Link>
          <Link href="/products?category=Sports" className="cat-item"><div className="cat-emoji">&#9917;</div><span>Sports</span></Link>
          <Link href="/products?category=Books" className="cat-item"><div className="cat-emoji">&#128218;</div><span>Books</span></Link>
          <Link href="/products?category=Vehicles" className="cat-item"><div className="cat-emoji">&#128664;</div><span>Vehicles</span></Link>
        </div>
      </div>
    </>
  );
}
