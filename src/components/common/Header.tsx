"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, X, User, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// --- IMPORT MỚI: SERVICE VÀ MODEL ---
import studioTypeService from "@/infrastructure/api/service/studioTypeService";
import { StudioType } from "@/domain/models/studio-type/studioType";

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
  // --- Mục "Bảng giá" hardcoded đã bị xóa ---
  {
    label: "Studio đặc sắc",
    children: [{ label: "Loại hình studio", href: "/studio-type" }],
  },
  {
    label: "Dịch vụ cho thuê",
    children: [{ label: "Các dịch vụ hấp dẫn", href: "/service" }],
  },
];

// --- Hằng số cho key của localStorage ---
const STUDIO_TYPES_CACHE_KEY = "studioTypesCache";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  // --- STATE MỚI: THAY THẾ REDUX ---
  const [studioTypes, setStudioTypes] = useState<StudioType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  // --- HẾT STATE MỚI ---

  useEffect(() => {
    // Logic xử lý cuộn trang
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- LOGIC MỚI: TẢI STUDIO TYPES (TỪ CACHE HOẶC API) ---
    async function loadStudioTypes() {
      setIsLoadingTypes(true);
      try {
        // 1. Kiểm tra cache trước
        const cachedTypesJSON = localStorage.getItem(STUDIO_TYPES_CACHE_KEY);

        if (cachedTypesJSON) {
          const cachedTypes: StudioType[] = JSON.parse(cachedTypesJSON);
          setStudioTypes(cachedTypes);
        } else {
          // 2. Nếu không có cache, gọi API
          // Sử dụng service bạn đã cung cấp
          const data = await studioTypeService.getStudioTypes();
          setStudioTypes(data);

          // 3. Lưu vào cache cho lần sau
          localStorage.setItem(STUDIO_TYPES_CACHE_KEY, JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to load studio types:", err);
        // Có thể thêm logic xử lý lỗi, ví dụ: setStudioTypes([])
      } finally {
        setIsLoadingTypes(false);
      }
    }

    loadStudioTypes();
    // --- HẾT LOGIC MỚI ---

    return () => window.removeEventListener("scroll", onScroll);
  }, []); // <-- Chạy 1 lần duy nhất khi component mount

  const wrapShadow = useMemo(
    () =>
      scrolled
        ? "shadow-sm border-b border-gray-200"
        : "border-b border-gray-100",
    [scrolled]
  );

  const handleGoogleLogin = async () => {
    // ... (logic đăng nhập giữ nguyên)
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

  // --- COMPONENT CON ĐỂ RENDER DROPDOWN BẢNG GIÁ ---
  const renderPricingDropdown = () => (
    <div className="relative group">
      <button
        className="cursor-pointer inline-flex items-center gap-1 hover:text-gray-900 text-gray-800"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Bảng giá
        <ChevronDown className="w-4 h-4 text-gray-700 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>

      {/* Dropdown wrapper */}
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
            {/* --- CẬP NHẬT BIẾN LOADING --- */}
            {isLoadingTypes ? (
              <li className="px-4 py-2 text-sm text-gray-500">Đang tải...</li>
            ) : studioTypes.length > 0 ? (
              studioTypes.map((studioType) => (
                <li key={studioType.id}>
                  <Link
                    href={`/pricing/${studioType.id}`} // Link động
                    className="cursor-pointer block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-black transition-colors"
                    role="menuitem"
                  >
                    {studioType.name} {/* Tên động */}
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">
                Không có dữ liệu
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

  // --- COMPONENT CON ĐỂ RENDER BẢNG GIÁ TRÊN MOBILE ---
  const renderMobilePricing = () => (
    <details className="group">
      <summary className="flex items-center justify-between py-2 cursor-pointer list-none font-semibold text-gray-900">
        <span>Bảng giá</span>
        <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="ml-3 mt-1 space-y-1">
        {/* --- CẬP NHẬT BIẾN LOADING --- */}
        {isLoadingTypes ? (
          <span className="block py-1 text-sm text-gray-500">Đang tải...</span>
        ) : studioTypes.length > 0 ? (
          studioTypes.map((studioType) => (
            <Link
              key={studioType.id}
              href={`/pricing/${studioType.id}`} // Link động
              className="block py-1 text-sm text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              {studioType.name} {/* Tên động */}
            </Link>
          ))
        ) : (
          <span className="block py-1 text-sm text-gray-500">
            Không có dữ liệu
          </span>
        )}
      </div>
    </details>
  );

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
              // ... (Các mục nav tĩnh "Album", "Studio đặc sắc", ...)
              <div key={item.label} className="relative group">
                <button
                  className="cursor-pointer inline-flex items-center gap-1 hover:text-gray-900 text-gray-800"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {item.label}
                  <ChevronDown className="w-4 h-4 text-gray-700 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
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

            {/* --- THAY THẾ BẢNG GIÁ ĐỘNG --- */}
            {renderPricingDropdown()}
            {/* --- HẾT --- */}

            {/* Booking + Cart */}
            <Link
              href="/booking"
              className="px-3 py-2 rounded-2xl bg-amber-100 text-gray-900 font-bold hover:bg-amber-200 transition-colors"
            >
              Booking
            </Link>

            {/* Auth */}
            {user ? (
              // ... (Logic khi đã đăng nhập giữ nguyên)
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
              // ... (Logic khi chưa đăng nhập giữ nguyên)
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
            // ... (Render các mục nav tĩnh trên mobile)
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

          {/* --- THAY THẾ BẢNG GIÁ ĐỘNG (MOBILE) --- */}
          {renderMobilePricing()}
          {/* --- HẾT --- */}

          {/* Auth - Mobile */}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
            {/* ... (Logic Auth/Booking/Cart trên mobile giữ nguyên) ... */}
            <Link
              href="/booking"
              className="px-3 py-2 rounded-2xl bg-amber-100 text-gray-900 font-bold"
              onClick={() => setMobileOpen(false)}
            >
              Booking
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
