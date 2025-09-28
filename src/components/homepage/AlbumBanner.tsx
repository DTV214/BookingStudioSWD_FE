"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Album = {
  title: string;
  img: string;
  href: string;
  featured?: boolean;
};

const albums: Album[] = [
  // Hàng trên (2 thẻ phải)
  {
    title: "Youth Concept",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619649/anh-cuoi-dep-trong-studio-10_keveam.png ",
    href: "/album/youth",
  },
  {
    title: "Tết Concept",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758699140/20221228_WJApRVBXzwOrjZTHWcDo7svT_tcp8kt.png",
    href: "/album/tet",
  },

  // Thẻ nổi bật (to, nền xanh) — sẽ đặt giữa trái
  {
    title: "Chụp ảnh phóng sự cưới – Văn Tuyền & Thu Hương",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619641/anh-cuoi-dep-trong-studio-3_eb3x8h.png", // có thể để ảnh bất kỳ (sẽ phủ bởi overlay xanh)
    href: "/album/van-tuyen-thu-huong",
    featured: true,
  },

  // Hàng dưới (3 thẻ)
  {
    title: "Kỷ yếu lớp 12",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619359/chup-anh-ky-yeu-uy-tin-chuyen-nghiep-dep-tron-goi-gia-re-280_ua2b63.jpg",
    href: "/album/ky-yeu-12",
  },
  {
    title: "Cooking Concept",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758699277/pngtree-woman-cooking-fresh-meal-in-modern-kitchen-image_17485089_vgy9o8.webp",
    href: "/album/cooking",
  },
  {
    title: "Portrait Garden",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758699432/anh-mo-ta_eosiqv.jpg",
    href: "/album/portrait",
  },
];

export default function AlbumBanner() {
  // tách ra để map đúng “mosaic”
  const featured = albums.find((a) => a.featured)!;
  const normal = albums.filter((a) => !a.featured);

  return (
    <section className="relative w-full">
      {/* nền khối bo tròn sáng như ảnh mẫu */}
      <div className="container mx-auto rounded-[40px] bg-[#eaf0ec]">
        <div className="px-4 md:px-8 lg:px-14 py-10 lg:py-16">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Heading */}
            <div className="lg:col-span-4">
              <p className="uppercase tracking-[0.2em] text-sm text-gray-700">
                SWD Studio
              </p>
              <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-green-800">
                Album ảnh nổi bật
              </h2>
              <p className="mt-4 text-gray-700 md:text-lg">
                Một số Album ảnh nổi bật nhất 2025
              </p>

              <Link
                href="/album"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-green-800/50 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-900 hover:text-white transition-colors"
              >
                Xem thêm <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Mosaic */}
            <div className="lg:col-span-8">
              {/* Lưới 12x12 để rải ô giống bố cục mẫu */}
              <div className="grid grid-cols-12 grid-rows-12 gap-6">
                {/* Card top-left (kỷ yếu lớp học) — kích thước lớn ngang */}
                <AlbumCard data={normal[0]} className="col-span-7 row-span-4" />

                {/* Card top-right (youth) */}
                <AlbumCard
                  data={normal[1]}
                  className="col-start-8 col-span-5 row-span-4"
                />

                {/* Featured – khối xanh ở giữa trái */}
                <FeaturedCard
                  data={featured}
                  className="col-span-6 row-span-5 mt-2"
                />

                {/* Cooking (trên phải hàng giữa) */}
                <AlbumCard
                  data={normal[2]}
                  className="col-start-8 col-span-5 row-span-5 mt-2"
                />

                {/* Portrait (dưới trái) */}
                <AlbumCard data={normal[3]} className="col-span-6 row-span-5" />

                {/* Tết (dưới phải) */}
                <AlbumCard
                  data={normal[4]}
                  className="col-start-8 col-span-5 row-span-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======== Cards ======== */

function AlbumCard({
  data,
  className = "",
}: {
  data: Album;
  className?: string;
}) {
  return (
    <Link
      href={data.href}
      className={`group relative block overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${className}`}
    >
      {/* Ảnh */}
      <div className="relative w-full h-full min-h-[180px] md:min-h-[220px]">
        <Image
          src={data.img}
          alt={data.title}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Overlay gradient + Title + Nút (ẩn tới khi hover/focus) */}
      <div className="pointer-events-none absolute inset-0 flex items-end p-5">
        <div className="w-full rounded-2xl bg-gradient-to-t from-black/55 via-black/20 to-transparent p-4">
          <h3 className="text-white font-extrabold uppercase tracking-wide drop-shadow">
            {data.title}
          </h3>
          <div className="mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="inline-flex pointer-events-auto items-center gap-2 rounded-xl border border-white/90 px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-green-900">
              Xem chi tiết
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function FeaturedCard({
  data,
  className = "",
}: {
  data: Album;
  className?: string;
}) {
  return (
    <Link
      href={data.href}
      className={`group relative block overflow-hidden rounded-3xl shadow-[0_14px_40px_rgba(0,0,0,0.10)] ${className}`}
    >
      {/* nền xanh + ảnh mờ nhẹ phía sau (nếu muốn) */}
      <div className="absolute inset-0 bg-emerald-800/95" />
      {/* Nội dung */}
      <div className="relative z-10 p-6 md:p-8 flex h-full items-center">
        <div>
          <h3 className="text-white text-xl md:text-2xl font-extrabold uppercase leading-snug">
            Chụp ảnh phóng sự cưới
            <br />
            Văn Tuyền & Thu Hương
          </h3>
          <div className="mt-5">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white/10 px-4 py-2 text-white font-medium backdrop-blur-sm group-hover:bg-white group-hover:text-emerald-900 transition-colors">
              Xem chi tiết
            </span>
          </div>
        </div>
      </div>

      {/* Nhẹ nhàng: glow khi hover */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/30 transition" />
    </Link>
  );
}
