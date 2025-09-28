"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-10">
        {/* Brand + tagline */}
        <div className="mb-10">
          <Link href="/" className="inline-flex items-baseline gap-3 group">
            <span className="text-2xl md:text-3xl font-extrabold tracking-wide">
              SWD Studio
            </span>
            <span className="text-gray-600 text-sm md:text-base group-hover:text-gray-800 transition-colors">
              – Ghi dấu khoảnh khắc, kể chuyện bằng ánh sáng.
            </span>
          </Link>
        </div>

        {/* Grid desktop / Accordion mobile */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 text-sm">
          {/* Liên hệ */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold uppercase tracking-wide mb-3">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Địa chỉ 1</p>
                  <p>21 Ngõ 98, Thái Hà, Đống Đa, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-gray-600" />
                <p>0358.475.789 • 0976.475.789 • 0342.895.000</p>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Địa chỉ 2</p>
                  <p>264 Lạc Long Quân, Tây Hồ, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-gray-600" />
                <p>0975.475.789 • 0975.397.923</p>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Địa chỉ 3</p>
                  <p>38 Ngõ 40 Hồng Tiến, Long Biên, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-gray-600" />
                <p>0379.475.789 • 0975.397.923</p>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-gray-600" />
                <a
                  href="mailto:congstudio.vn@gmail.com"
                  className="text-gray-800 hover:text-black underline underline-offset-4"
                >
                  swdstudio.vn@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Dịch vụ */}
          <div>
            <h3 className="font-semibold uppercase tracking-wide mb-3">
              Dịch vụ nổi bật
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-gray-700">
              {[
                ["Chụp Ảnh Kỷ Yếu", "/dich-vu/ky-yeu"],
                ["Chụp Ảnh Cưới", "/dich-vu/cuoi"],
                ["Chụp Ảnh Sự Kiện", "/dich-vu/su-kien"],
                ["Chụp Ảnh Gia Đình", "/dich-vu/gia-dinh"],
                ["Thuê Áo Dài", "/thue/ao-dai"],
                ["Thuê Vest Nam", "/thue/vest"],
                ["Tour Kỷ Yếu", "/tour"],
                ["Cho Thuê Trang Phục", "/thue/trang-phuc"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 text-gray-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Khám phá */}
          <div>
            <h3 className="font-semibold uppercase tracking-wide mb-3">
              Khám phá
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link
                  href="/album"
                  className="hover:text-black transition-colors"
                >
                  Album
                </Link>
              </li>
              <li>
                <Link
                  href="/bang-gia"
                  className="hover:text-black transition-colors"
                >
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link
                  href="/video"
                  className="hover:text-black transition-colors"
                >
                  Video
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-black transition-colors"
                >
                  Góc tư vấn
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="hover:text-black transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Kết nối */}
          <div>
            <h3 className="font-semibold uppercase tracking-wide mb-3">
              Kết nối
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="p-2 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter */}
            <form onSubmit={(e) => e.preventDefault()} className="mt-5">
              <label className="block text-sm text-gray-700 mb-2">
                Nhận ưu đãi & cảm hứng mỗi tuần
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 h-11 rounded-lg bg-gray-100 text-black placeholder:text-gray-500 px-3 outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="h-11 px-4 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Accordion Mobile */}
        <div className="md:hidden space-y-3 text-sm">
          <Accordion title="Thông tin liên hệ">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Địa chỉ 1</p>
                  <p>21 Ngõ 98, Thái Hà, Đống Đa, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-gray-600" />
                <p>0358.475.789 • 0976.475.789 • 0342.895.000</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Địa chỉ 2</p>
                  <p>264 Lạc Long Quân, Tây Hồ, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-gray-600" />
                <p>0975.475.789 • 0975.397.923</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Địa chỉ 3</p>
                  <p>38 Ngõ 40 Hồng Tiến, Long Biên, Hà Nội</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-gray-600" />
                <p>0379.475.789 • 0975.397.923</p>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 text-gray-600" />
                <a
                  href="mailto:congstudio.vn@gmail.com"
                  className="text-gray-800 hover:text-black underline underline-offset-4"
                >
                  congstudio.vn@gmail.com
                </a>
              </li>
            </ul>
          </Accordion>

          <Accordion title="Dịch vụ nổi bật">
            <ul className="grid grid-cols-1 gap-2 text-gray-700">
              {[
                ["Chụp Ảnh Kỷ Yếu", "/dich-vu/ky-yeu"],
                ["Chụp Ảnh Cưới", "/dich-vu/cuoi"],
                ["Chụp Ảnh Sự Kiện", "/dich-vu/su-kien"],
                ["Chụp Ảnh Gia Đình", "/dich-vu/gia-dinh"],
                ["Thuê Áo Dài", "/thue/ao-dai"],
                ["Thuê Vest Nam", "/thue/vest"],
                ["Tour Kỷ Yếu", "/tour"],
                ["Cho Thuê Trang Phục", "/thue/trang-phuc"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 hover:text-black transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 text-gray-500" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="Khám phá">
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link
                  href="/album"
                  className="hover:text-black transition-colors"
                >
                  Album
                </Link>
              </li>
              <li>
                <Link
                  href="/bang-gia"
                  className="hover:text-black transition-colors"
                >
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link
                  href="/video"
                  className="hover:text-black transition-colors"
                >
                  Video
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-black transition-colors"
                >
                  Góc tư vấn
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className="hover:text-black transition-colors"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </Accordion>

          <Accordion title="Kết nối">
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Youtube"
                className="p-2 rounded-full ring-1 ring-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </Accordion>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2016 – {new Date().getFullYear()} CỘNG STUDIO. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-700">
            <Link
              href="/privacy"
              className="hover:text-black transition-colors text-xs"
            >
              Chính sách bảo mật
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/terms"
              className="hover:text-black transition-colors text-xs"
            >
              Điều khoản sử dụng
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/help"
              className="hover:text-black transition-colors text-xs"
            >
              Trung tâm hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** ---------- Small Accordion for mobile ---------- */
function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-lg bg-white ring-1 ring-gray-200 open:bg-gray-50 transition-colors">
      <summary className="list-none cursor-pointer select-none flex items-center justify-between px-4 py-3 text-gray-900">
        <span className="font-semibold">{title}</span>
        <svg
          className="w-4 h-4 transition-transform group-open:rotate-180"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}
