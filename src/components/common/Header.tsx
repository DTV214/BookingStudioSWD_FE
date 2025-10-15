"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, X, User, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const navItems: NavItem[] = [
  {
    label: "Album",
    children: [
      { label: "Album 1", href: "/album/1" },
      { label: "Album 2", href: "/album/2" },
    ],
  },
  {
    label: "Bảng giá",
    children: [
      { label: "Gói cơ bản", href: "/bang-gia/co-ban" },
      { label: "Gói VIP", href: "/bang-gia/vip" },
    ],
  },
  {
    label: "Studio đặc sắc",
    children: [{ label: "Loại hình studio", href: "/studio-type" }],
  },
  {
    label: "Dịch vụ cho thuê",
    children: [
      { label: "Máy ảnh", href: "/thue/may-anh" },
      { label: "Đèn", href: "/thue/den" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wrapShadow = useMemo(
    () =>
      scrolled
        ? "shadow-sm border-b border-gray-200"
        : "border-b border-gray-100",
    [scrolled]
  );

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth-login`
      );
      const json = await res.json();
      if (json.code === 200 && json.data) {
        window.location.href = json.data;
      } else {
        alert("Không thể lấy URL đăng nhập Google.");
      }
    } catch (err) {
      console.error("Lỗi khi gọi /auth/oauth-login:", err);
      alert("Lỗi đăng nhập Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-white text-black ${wrapShadow}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 font-bold text-lg tracking-wide text-gray-900"
          >
            SWD Studio
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-semibold">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className="cursor-pointer inline-flex  items-center gap-1 hover:text-gray-900 text-gray-800"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4 text-gray-700 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>

                {/* Dropdown wrapper: tạo cầu nối hover bằng ::before */}
                <div
                  className="
          absolute left-0 top-full pt-3
          opacity-0 translate-y-1 scale-[0.98]
          transition-all duration-150 ease-out
          pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto
          group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:pointer-events-auto
          before:content-[''] before:absolute before:left-0 before:right-0 before:-top-3 before:h-3
        "
                  role="menu"
                >
                  {/* Panel thật của dropdown */}
                  <div className="min-w-48 rounded-lg bg-white text-black shadow-lg ring-1 ring-black/10">
                    <ul className="py-2">
                      {item.children?.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors"
                            role="menuitem"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Booking + Cart */}
            <Link
              href="/booking"
              className="px-3 py-2 rounded-2xl bg-amber-100 text-gray-900 font-bold hover:bg-amber-200 transition-colors"
            >
              Booking
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-gray-900"
            >
              <ShoppingCart className="w-4 h-4" /> Cart
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                  title="Trang cá nhân"
                >
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-gray-700" />
                  )}
                </Link>

                <span className="text-gray-800">{user.name ?? "User"}</span>

                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Đang chuyển hướng..." : "Đăng nhập bằng Google"}
              </button>
            )}
          </nav>

          {/* Mobile trigger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2"
            aria-label="Mở menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 bg-white ${
          mobileOpen ? "max-h-[80vh] border-t border-gray-100" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <details key={item.label} className="group">
              <summary className="flex items-center justify-between py-2 cursor-pointer list-none font-semibold text-gray-900">
                <span>{item.label}</span>
                <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
              </summary>
              {item.children && (
                <div className="ml-3 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-1 text-sm text-gray-700 hover:text-black"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </details>
          ))}

          {/* Auth - Mobile */}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
            <Link
              href="/booking"
              className="px-3 py-2 rounded-2xl bg-amber-100 text-gray-900 font-bold"
              onClick={() => setMobileOpen(false)}
            >
              Booking
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-gray-900"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingCart className="w-4 h-4" /> Cart
            </Link>

            {user ? (
              <div className="flex items-center justify-between">
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-700" />
                  <span>{user.name ?? "User"}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-500"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Đang chuyển hướng..." : "Đăng nhập với Google"}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
