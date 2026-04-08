export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export type Category = {
  name: string;
  count: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  original_price: number;
  discount_percent: number;
  currency: string;
  images: string[];
  thumbnail: string;
  rating: number;
  num_reviews: number;
  stock: number;
  is_available: boolean;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: User;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(data.detail || "Request failed");
  }

  return response.json();
}

export function getProducts(search?: string, category?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category && category !== "All") params.set("category", category);
  const query = params.toString() ? `?${params.toString()}` : "";
  return request<{ products: Product[]; total: number }>(`/products${query}`);
}

export function getProduct(slug: string) {
  return request<Product>(`/products/${slug}`);
}

export function getCategories() {
  return request<Category[]>("/categories");
}

export function signup(payload: { name: string; email: string; password: string }) {
  return request<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function login(payload: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getCurrentUser(token: string) {
  return request<User>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
