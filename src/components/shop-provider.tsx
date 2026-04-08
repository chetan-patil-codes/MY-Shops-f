"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { getProducts, type Product } from "@/lib/api";

type ShopContextValue = {
  products: Product[];
  cart: string[];
  wishlist: string[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  isLoadingProducts: boolean;
  productsError: string;
  isReady: boolean;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

const CART_KEY = "myshops-cart";
const WISHLIST_KEY = "myshops-wishlist";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(CART_KEY);
    const savedWishlist = window.localStorage.getItem(WISHLIST_KEY);

    if (savedCart) {
      setCart(JSON.parse(savedCart) as string[]);
    }

    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist) as string[]);
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    let active = true;

    void getProducts()
      .then((response) => {
        if (!active) {
          return;
        }

        setProducts(response.products);
        setProductsError("");
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setProducts([]);
        setProductsError(
          error instanceof Error ? error.message : "Unable to load products from backend."
        );
      })
      .finally(() => {
        if (active) {
          setIsLoadingProducts(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, isReady]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [isReady, wishlist]);

  const value = useMemo<ShopContextValue>(
    () => ({
      products,
      cart,
      wishlist,
      isReady,
      isLoadingProducts,
      productsError,
      addToCart: (productId: string) => {
        setCart((current) => (current.includes(productId) ? current : [...current, productId]));
      },
      removeFromCart: (productId: string) => {
        setCart((current) => current.filter((item) => item !== productId));
      },
      addToWishlist: (productId: string) => {
        setWishlist((current) =>
          current.includes(productId) ? current : [...current, productId]
        );
      },
      removeFromWishlist: (productId: string) => {
        setWishlist((current) => current.filter((item) => item !== productId));
      },
      isInCart: (productId: string) => cart.includes(productId),
      isInWishlist: (productId: string) => wishlist.includes(productId),
      clearCart: () => setCart([])
    }),
    [cart, isLoadingProducts, isReady, products, productsError, wishlist]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }

  return context;
}
