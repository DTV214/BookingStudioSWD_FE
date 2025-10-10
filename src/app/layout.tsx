// app/layout.tsx
import type { Metadata } from "next";
// src/app/layout.tsx

export const metadata: Metadata = {
  title: "Booking Studio",
  description: "Staff app for booking studio management",
};
import Header from "@/components/common/Header";
import "./globals.css";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900 container mx-auto">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
