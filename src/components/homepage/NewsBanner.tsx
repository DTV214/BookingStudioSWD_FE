"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Eye } from "lucide-react";

type News = {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  views: number;
  href: string;
  cover: string;
};

const FEATURED: News = {
  id: "f1",
  title: "Concept học sinh: Lựa chọn “quốc dân” cho bộ ảnh kỷ yếu cấp 2",
  excerpt:
    "Concept học sinh trong chụp ảnh kỷ yếu cấp 2 tái hiện những hình ảnh quen thuộc như đồng phục, lớp học, sân trường… Không chỉ là trang phục, đó còn là ký ức hồn nhiên và trong sáng của những năm tháng đã qua.",
  date: "22/09/2025",
  views: 5,
  href: "/news/concept-hoc-sinh-ky-yeu-cap-2",
  cover:
    "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619365/chup-anh-ky-yeu-uy-tin-chuyen-nghiep-dep-tron-goi-gia-re-167_owggrm.jpg",
};

const LIST: News[] = [
  {
    id: "n1",
    title: "Concept Sparkling Night – Rực rỡ như chính những ngày thanh xuân",
    date: "22/09/2025",
    views: 5,
    href: "/news/sparkling-night",
    cover:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619003/Chup-anh-ky-yeu-uy-tin-chat-luong-toan-quoc-15_qq0zfk.jpg",
  },
  {
    id: "n2",
    title: "Đơn giản nhưng chất: Concept kỷ yếu với đồng phục",
    date: "16/09/2025",
    views: 26,
    href: "/news/dong-phuc",
    cover:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617585/chup-anh-ky-yeu-tai-mien-bac-27-1_cw4clp.jpg",
  },
  {
    id: "n3",
    title: "Phong cách chụp kỷ yếu đẹp mọi thời đại: concept áo cử nhân",
    date: "12/09/2025",
    views: 45,
    href: "/news/ao-cu-nhan",
    cover:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1758699653/20180521_212321-400x400_npnzmc.jpg",
  },
  {
    id: "n4",
    title: "Hành lang và cầu thang – hai góc chụp kỷ yếu kinh điển",
    date: "12/09/2025",
    views: 46,
    href: "/news/hanh-lang-cau-thang",
    cover:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1758699760/Chup-anh-ky-yeu-cap-2-concept-thanh-xuan-dep-nhat-2025-13_eoyvjn.jpg",
  },
];

export default function NewsBanner() {
  return (
    <section className="relative w-full bg-[#f7faf7]">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-4xl font-extrabold tracking-[0.08em] text-green-800 uppercase">
          Thông tin & Tin tức
        </h2>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Left */}
          <article className="lg:col-span-7">
            <Link
              href={FEATURED.href}
              className="block rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
                <Image
                  src={FEATURED.cover}
                  alt={FEATURED.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 58vw, 100vw"
                  priority
                />
              </div>

              <div className="px-5 md:px-6 pb-6">
                {/* meta */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-green-700" />
                    {FEATURED.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Eye className="w-4 h-4 text-green-700" />
                    {FEATURED.views} lượt xem
                  </span>
                </div>

                <h3 className="mt-3 text-xl md:text-2xl font-extrabold text-green-800 hover:text-green-900 transition-colors">
                  {FEATURED.title}
                </h3>

                <p className="mt-3 text-gray-700 leading-relaxed line-clamp-4 md:line-clamp-5">
                  {FEATURED.excerpt}
                </p>
              </div>
            </Link>
          </article>

          {/* Right list */}
          <div className="lg:col-span-5 space-y-5">
            {LIST.slice(0, 4).map((n) => (
              <Link
                key={n.id}
                href={n.href}
                className="group flex gap-4 rounded-3xl bg-white ring-1 ring-gray-100 p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-28 md:w-36 aspect-[4/3] shrink-0 overflow-hidden rounded-2xl">
                  <Image
                    src={n.cover}
                    alt={n.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="140px"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="text-base md:text-lg font-extrabold text-green-800 leading-snug line-clamp-2 group-hover:text-green-900 transition-colors">
                    {n.title}
                  </h4>

                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-green-700" />
                      {n.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-green-700" />
                      {n.views} lượt xem
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Xem thêm */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-2xl border border-green-800/40 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-900 hover:text-white transition-colors"
          >
            Xem thêm →
          </Link>
        </div>
      </div>
    </section>
  );
}
