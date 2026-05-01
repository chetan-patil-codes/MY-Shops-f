"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useShop } from "@/components/shop-provider";
import { askAi, type Category, type HomeFeed } from "@/lib/api";
import { formatCurrency } from "@/lib/format";

type ToastState = {
  message: string;
  visible: boolean;
};

const countdownSeed = 2 * 3600 + 45 * 60 + 30;

export function FlipkartHome({
  feed,
  categories
}: {
  feed: HomeFeed;
  categories: Category[];
}) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, cart } = useShop();
  const [slideIndex, setSlideIndex] = useState(0);
  const [countdown, setCountdown] = useState(countdownSeed);
  const [toast, setToast] = useState<ToastState>({ message: "", visible: false });
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: "bot" | "user"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hi! I'm MY shops AI. Ask me about deals, products, returns, or order help."
    }
  ]);

  useEffect(() => {
    const slider = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % feed.banners.length);
    }, 4000);

    const timer = window.setInterval(() => {
      setCountdown((current) => (current > 0 ? current - 1 : current));
    }, 1000);

    return () => {
      window.clearInterval(slider);
      window.clearInterval(timer);
    };
  }, [feed.banners.length]);

  function showToast(message: string) {
    setToast({ message, visible: true });
    window.setTimeout(() => {
      setToast({ message: "", visible: false });
    }, 2200);
  }

  async function handleAiSend(prefill?: string) {
    const message = (prefill ?? chatInput).trim();
    if (!message || chatLoading) {
      return;
    }

    setChatMessages((current) => [...current, { role: "user", text: message }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const result = await askAi(message);
      setChatMessages((current) => [...current, { role: "bot", text: result.reply }]);
    } catch {
      setChatMessages((current) => [
        ...current,
        { role: "bot", text: "I'm having trouble connecting right now. Please try again." }
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  const heroVideo = feed.video_ads.find((item) => item.placement === "hero");
  const stripVideo = feed.video_ads.find((item) => item.placement === "strip");
  const gridVideos = feed.video_ads.filter((item) => item.placement === "grid");

  const countdownParts = useMemo(() => {
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;

    return [hours, minutes, seconds].map((value) => value.toString().padStart(2, "0"));
  }, [countdown]);

  function prevSlide() {
    setSlideIndex((prev) => (prev === 0 ? feed.banners.length - 1 : prev - 1));
  }

  function nextSlide() {
    setSlideIndex((prev) => (prev + 1) % feed.banners.length);
  }

  return (
    <>
      <div className="main">
        <div className="banner">
          <div
            className="banner-track"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {feed.banners.map((banner, idx) => (
              <div key={banner.id} className={`banner-slide ${banner.theme === "midnight" ? "s1" : banner.theme === "sunset" ? "s2" : "s3"}`}>
                <div className="banner-content">
                  <h2>{banner.title}</h2>
                  <p>{banner.subtitle}</p>
                  <button className="banner-cta" onClick={() => showToast(`${banner.title} opened!`)}>
                    {banner.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="banner-arrow left" onClick={prevSlide}>&#10094;</button>
          <button className="banner-arrow right" onClick={nextSlide}>&#10095;</button>
          <div className="banner-nav">
            {feed.banners.map((_, idx) => (
              <div key={idx} className={`dot ${slideIndex === idx ? "active" : ""}`} onClick={() => setSlideIndex(idx)}></div>
            ))}
          </div>
        </div>

        {heroVideo && (
          <div className="video-ad-section">
            <span className="ad-label">SPONSORED VIDEO</span>
            <div className="video-ad-hero">
              <div className="video-ad-hero" style={{ position: "relative", borderRadius: "6px", overflow: "hidden" }}>
                <iframe
                  src={heroVideo.video_url}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{ width: "100%", height: "380px", display: "block", border: "none", borderRadius: "6px" }}
                ></iframe>
                <div className="video-ad-overlay" style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.6)", color: "#ffe500", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "3px", letterSpacing: "0.5px" }}>AD</div>
                <button className="skip-btn" style={{ position: "absolute", bottom: "16px", right: "16px", background: "rgba(0,0,0,0.75)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", padding: "7px 16px", fontSize: "13px", cursor: "pointer", borderRadius: "2px" }} onClick={() => showToast('Ad skipped')}>Skip Ad &#10095;</button>
              </div>
            </div>
            <div className="video-ad-meta">
              <div>
                <div className="ad-title">{heroVideo.title}</div>
                <div className="ad-sub">{heroVideo.subtitle}</div>
              </div>
              <button className="shop-now-btn" onClick={() => addToCart(heroVideo.brand)}>{heroVideo.cta}</button>
            </div>
          </div>
        )}

        <div className="flash-section">
          <div className="flash-header">
            <div className="flash-title">&#9889; Flash Sale</div>
            <div className="flash-badge">LIVE</div>
            <div className="countdown">
              <div className="flash-counter-wrap"><div className="count-block">{countdownParts[0]}</div><div className="flash-label">HRS</div></div>
              <span className="count-sep">:</span>
              <div className="flash-counter-wrap"><div className="count-block">{countdownParts[1]}</div><div className="flash-label">MIN</div></div>
              <span className="count-sep">:</span>
              <div className="flash-counter-wrap"><div className="count-block">{countdownParts[2]}</div><div className="flash-label">SEC</div></div>
            </div>
          </div>
          <div className="products">
            {feed.flash_sale.map(product => (
              <div key={product.id} className="product-card" onClick={() => addToCart(product.id)}>
                <button
                  className={`wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                      showToast("Removed from wishlist");
                    } else {
                      addToWishlist(product.id);
                      showToast("Added to wishlist");
                    }
                  }}
                >
                  &#9825;
                </button>
                <div className="product-img">
                  <Image src={product.thumbnail} alt={product.name} width={160} height={160} style={{ objectFit: "contain" }} />
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-rating">{product.rating} &#9733;</div>
                <div className="product-price-row">
                  <span className="product-price">{formatCurrency(product.price)}</span>
                  <span className="product-mrp">{formatCurrency(product.original_price)}</span>
                  <span className="product-discount">{product.discount_percent}% off</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <div className="section-title">&#128293; Best Deals For You</div>
            <button className="view-all" onClick={() => showToast('Loading all deals...')}>View All</button>
          </div>
          <div className="deal-grid">
            {feed.deals.map((deal, idx) => (
              <div key={idx} className="deal-card" onClick={() => showToast(`Exploring ${deal.title} deals`)}>
                <div className="deal-icon">
                  {deal.category === "Electronics" ? "💻" : deal.category === "Home" ? "❄️" : deal.category === "Mobiles" ? "📱" : deal.category === "Fashion" ? "👕" : "📸"}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="deal-name">{deal.title}</div>
                  <div className="deal-tag">{deal.subtitle}</div>
                  <div className="deal-save">{deal.savings}</div>
                </div>
                <div style={{ color: "#878787", fontSize: "20px" }}>&#10095;</div>
              </div>
            ))}
          </div>
        </div>

        {stripVideo && (
          <div className="strip-ad">
            <div className="strip-ad-video">
              <iframe
                src={stripVideo.video_url}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
            <div className="strip-ad-body">
              <div className="strip-ad-tag">&#127381; LIMITED TIME OFFER</div>
              <div className="strip-ad-title">{stripVideo.title}</div>
              <div className="strip-ad-sub">{stripVideo.subtitle}</div>
            </div>
            <button className="strip-ad-cta" onClick={() => addToCart(stripVideo.brand)}>{stripVideo.cta}</button>
          </div>
        )}

        <div className="section">
          <div className="section-header">
            <div className="section-title">&#11088; Top Picks For You</div>
            <button className="view-all" onClick={() => showToast('Loading all top picks...')}>View All</button>
          </div>
          <div className="products">
            {feed.top_picks.map(product => (
              <div key={product.id} className="product-card" onClick={() => addToCart(product.id)}>
                <button
                  className={`wishlist-btn ${isInWishlist(product.id) ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                      showToast("Removed from wishlist");
                    } else {
                      addToWishlist(product.id);
                      showToast("Added to wishlist");
                    }
                  }}
                >
                  &#9825;
                </button>
                <div className="product-img">
                  <Image src={product.thumbnail} alt={product.name} width={160} height={160} style={{ objectFit: "contain" }} />
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-rating">{product.rating} &#9733;</div>
                <div className="product-price-row">
                  <span className="product-price">{formatCurrency(product.price)}</span>
                  <span className="product-mrp">{formatCurrency(product.original_price)}</span>
                  <span className="product-discount">{product.discount_percent}% off</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="offer-strip">
          <div className="offer-strip-card" onClick={() => showToast('Opening Fashion Sale!')}>
            <Image src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=240&fit=crop&auto=format" alt="Fashion" width={600} height={240} style={{ objectFit: "cover" }} />
            <div className="offer-strip-text">
              <div className="offer-strip-title">Fashion Week</div>
              <div className="offer-strip-sub">Up to 70% off on brands</div>
              <div className="offer-strip-badge">ENDS TONIGHT</div>
            </div>
          </div>
          <div className="offer-strip-card" onClick={() => showToast('Opening Electronics Bonanza!')}>
            <Image src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=240&fit=crop&auto=format" alt="Electronics" width={600} height={240} style={{ objectFit: "cover" }} />
            <div className="offer-strip-text">
              <div className="offer-strip-title">Electronics</div>
              <div className="offer-strip-sub">Gadgets from ₹499</div>
              <div className="offer-strip-badge">NEW ARRIVALS</div>
            </div>
          </div>
          <div className="offer-strip-card" onClick={() => showToast('Opening Home Makeover Sale!')}>
            <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=240&fit=crop&auto=format" alt="Home" width={600} height={240} style={{ objectFit: "cover" }} />
            <div className="offer-strip-text">
              <div className="offer-strip-title">Home Makeover</div>
              <div className="offer-strip-sub">Furniture & decor deals</div>
              <div className="offer-strip-badge">HOT DEALS</div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <div className="section-title">&#128293; Trending Now</div>
            <button className="view-all" onClick={() => showToast('Loading trending products...')}>View All</button>
          </div>
          <div className="trending-scroll">
            {feed.top_picks.map((product) => (
              <div key={`trending-${product.id}`} className="trending-card" onClick={() => addToCart(product.id)}>
                <Image src={product.thumbnail} alt={product.name} width={150} height={150} style={{ objectFit: "cover" }} />
                <div className="trending-card-body">
                  <div className="trending-card-name">{product.name}</div>
                  <div className="trending-card-price">{formatCurrency(product.price)}</div>
                  <div className="trending-card-off">{product.discount_percent}% off</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>About</h3>
              <ul>
                <li><a onClick={() => showToast("Contact Us")}>Contact Us</a></li>
                <li><a onClick={() => showToast("About Us")}>About Us</a></li>
                <li><a onClick={() => showToast("Careers")}>Careers</a></li>
                <li><a onClick={() => showToast("My Shops Stories")}>My Shops Stories</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Help</h3>
              <ul>
                <li><a onClick={() => showToast("Payments")}>Payments</a></li>
                <li><a onClick={() => showToast("Shipping")}>Shipping</a></li>
                <li><a onClick={() => showToast("Cancellation & Returns")}>Cancellation & Returns</a></li>
                <li><a onClick={() => showToast("FAQ")}>FAQ</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Policy</h3>
              <ul>
                <li><a onClick={() => showToast("Return Policy")}>Return Policy</a></li>
                <li><a onClick={() => showToast("Terms Of Use")}>Terms Of Use</a></li>
                <li><a onClick={() => showToast("Security")}>Security</a></li>
                <li><a onClick={() => showToast("Privacy")}>Privacy</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Social</h3>
              <ul>
                <li><a onClick={() => showToast("Facebook")}>Facebook</a></li>
                <li><a onClick={() => showToast("Twitter")}>Twitter</a></li>
                <li><a onClick={() => showToast("YouTube")}>YouTube</a></li>
                <li><a onClick={() => showToast("Instagram")}>Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-logo">My Shops</div>
            &copy; {new Date().getFullYear()} My Shops. All rights reserved.
          </div>
        </div>
      </footer>

      <div className={`toast ${toast.visible ? "show" : ""}`}>
        {toast.message}
      </div>

      <button className="ai-fab" onClick={() => setChatOpen(!chatOpen)}>
        <div className="ai-fab-pulse"></div>
        &#129302;
      </button>

      <div className={`ai-chat-panel ${chatOpen ? "open" : ""}`}>
        <div className="ai-chat-header">
          <div className="ai-avatar">&#129302;</div>
          <div className="ai-header-info">
            <div className="ai-header-name">My Shops AI</div>
            <div className="ai-header-status">
              <span className="ai-status-dot"></span> Online
            </div>
          </div>
          <button className="ai-close-btn" onClick={() => setChatOpen(false)}>&#10005;</button>
        </div>
        <div className="ai-chat-messages" id="aiMessages">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`ai-msg ${msg.role}`}>
              {msg.text}
            </div>
          ))}
          {chatLoading && (
            <div className="ai-typing">
              <span></span><span></span><span></span>
            </div>
          )}
        </div>
        <div className="ai-quick-chips">
          <div className="ai-chip" onClick={() => handleAiSend("Where is my order?")}>Where is my order?</div>
          <div className="ai-chip" onClick={() => handleAiSend("Top mobile deals")}>Top mobile deals</div>
          <div className="ai-chip" onClick={() => handleAiSend("Return policy")}>Return policy</div>
        </div>
        <div className="ai-chat-input-row">
          <input
            type="text"
            className="ai-chat-input"
            placeholder="Type a message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAiSend(); }}
          />
          <button className="ai-send-btn" onClick={() => handleAiSend()}>&#10148;</button>
        </div>
      </div>
    </>
  );
}
