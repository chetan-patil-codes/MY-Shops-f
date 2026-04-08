import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth-provider";
import { Navbar } from "@/components/navbar";
import { ShopProvider } from "@/components/shop-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MY shops",
  description: "Modern e-commerce storefront built with Next.js and FastAPI."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>
          <ShopProvider>
            <Navbar />
            {children}
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
