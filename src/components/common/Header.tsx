"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, X, User, ShoppingCart } from "lucide-react";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

// kiểu dữ liệu user (tùy backend bạn lưu gì)
type UserData = {
  name?: string;
  email?: string;
};

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
    label: "Video",
    children: [
      { label: "Highlight", href: "/video/highlight" },
      { label: "Behind the scenes", href: "/video/behind" },
    ],
  },
  {
    label: "Các loại phụ kiện",
    children: [
      { label: "Máy ảnh", href: "/thue/may-anh" },
      { label: "Đèn", href: "/thue/den" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lấy user từ localStorage (tùy bạn đổi key)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
  }, []);

  const wrapShadow = useMemo(
    () =>
      scrolled
        ? "shadow-sm border-b border-gray-200"
        : "border-b border-gray-100",
    [scrolled]
  );

  return (
    <header className={`sticky top-0 z-50 bg-white text-black ${wrapShadow}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0 font-bold tracking-wide">
            SWD Studio
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-semibold">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className="inline-flex items-center gap-1 hover:text-gray-900 text-gray-800"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4 text-gray-700 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown */}
                <div
                  role="menu"
                  className="
                    pointer-events-none absolute left-0 top-full mt-3 min-w-48 rounded-lg
                    bg-white text-black shadow-lg ring-1 ring-black/10
                    opacity-0 translate-y-2 scale-[0.98]
                    transition-all duration-200 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto
                  "
                >
                  <ul className="py-2">
                    {item.children?.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Booking + Cart giữ nguyên */}
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
            {/* Auth (ẩn/hiện theo trạng thái) */}
            {user ? (
              // ĐÃ đăng nhập -> Hiện User
              <Link
                href="/user"
                className=" inline-flex items-center gap-2 text-gray-900"
              >
                <User className="w-4 h-4" /> {user.name ?? "User"}
              </Link>
            ) : (
              // CHƯA đăng nhập -> Hiện Đăng nhập / Đăng ký
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border border-gray-400 text-black font-medium hover:bg-gray-100 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors"
                >
                  Đăng ký
                </Link>
              </>
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

      {/* Mobile drawer (sáng màu) */}
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

          <div className="pt-3 border-t container mx-auto border-gray-100 flex items-center gap-3">
            {/* Auth mobile */}

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
              <Link
                href="/user"
                className="inline-flex items-center gap-2 text-gray-900"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4" /> {user.name ?? "User"}
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg border border-gray-400 text-black font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
