// app/layout.tsx
import type { Metadata } from "next";
// src/app/layout.tsx
import "./style/admin.css";

export const metadata: Metadata = {
  title: "Booking Studio",
  description: "Staff app for booking studio management",
};
import Header from "@/components/common/Header";
import "./globals.css";
import Footer from "@/components/common/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900 container mx-auto">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
