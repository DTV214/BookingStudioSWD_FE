"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: "Chụp ảnh thẻ",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758618220/anh-the-nen-trang-inkythuatso-27-10-33-14_obb6hv.jpg",
    href: "/category/chup-anh-the",
  },
  {
    title: "Chụp ảnh doanh nghiệp",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758618411/50532682592_0ede566417_k_rxxreq.jpg",
    href: "/category/chup-anh-doanh-nghiep",
  },
  {
    title: "Chụp ảnh kỷ yếu lớp 12",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758616794/Chup-anh-ky-yeu-dep-uy-tin-gia-re-chat-luong-hang-dau-scaled_enbf08.webp",
    href: "/category/chup-anh-ky-yeu-12",
    button: "Xem chi tiết",
  },
  {
    title: "Chụp ảnh kỷ yếu mầm non",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758618590/chup-ky-yeu-mam-non-39-1536x1024_n0857d.jpg",
    href: "/category/chup-anh-ky-yeu-mam-non",
  },
  {
    title: "Chụp ảnh kỷ yếu đại học",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619363/chup-anh-ky-yeu-uy-tin-chuyen-nghiep-dep-tron-goi-gia-re-75_sdzlmb.png",
    href: "/category/chup-anh-ky-yeu-dai-hoc",
  },
  {
    title: "Chụp ảnh kỷ yếu lớp 5",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619020/Chup-anh-ky-yeu-mam-non-dep-gia-re-uy-tin-2_niazex.jpg",
    href: "/category/chup-anh-ky-yeu-lop-5",
  },
  {
    title: "Chụp ảnh studio",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617638/enter-studio-cho-thue-studio-chup-anh-002_nrm9nz.jpg",
    href: "/category/chup-anh-studio",
  },
  {
    title: "Chụp ảnh kỷ yếu lớp 9",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619001/chup-anh-ky-yeu-lop-9-gia-re-chat-luong-uy-tin_it55bu.jpg",
    href: "/category/chup-anh-ky-yeu-lop-9",
  },
  {
    title: "Cho thuê thiết bị chụp ảnh",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619099/1-1_rdxbfk.jpg",
    href: "/category/cho-thue-thiet-bi-chup-anh",
  },
  {
    title: "Quay video doanh nghiệp",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617175/41536e796f4d685f61375541426c78773858426246_zai0xr.jpg",
    href: "/category/quay-video-doanh-nghiep",
  },
  {
    title: "Quay video kỷ yếu ",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617588/Chup-anh-ky-yeu-tai-vinh-phuc-33-scaled_xk3qnt.jpg",
    href: "/category/quay-video-ky-yeu",
  },
  {
    title: "Quay phim sự kiện",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617597/CHUP-ANH-KY-YEU-TAI-NGHE-AN-15-2_f7wceo.jpg",
    href: "/category/quay-phim-su-kien",
  },
];

export default function CategoryBanner() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  // Mỗi slide tối đa 6 mục (3 x 2)
  const chunkSize = 6;
  const slides = Array.from(
    { length: Math.ceil(categories.length / chunkSize) },
    (_, i) => categories.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  const scrollByPage = useCallback((dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth;
    el.scrollBy({
      left: dir === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  // Auto play (pause khi hover)
  // 👇 đặt trong component
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return; // <- cleanup: undefined (hợp lệ)

    // dùng number cho trình duyệt (vì "use client")
    let timer: number | null = null;

    const start = () => {
      stop();
      timer = window.setInterval(() => {
        const atEnd =
          Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft) < 8;
        if (atEnd) {
          el.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollByPage("next");
        }
      }, 5000);
    };

    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    if (!isHover) start();

    // ✅ luôn trả về một HÀM cleanup kiểu void
    return () => {
      stop();
    };
  }, [isHover, scrollByPage]);

  return (
    <section
      className="relative w-full bg-white py-10 md:py-16"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-center text-lg font-semibold tracking-wide text-gray-900 uppercase">
          Danh mục dịch vụ
        </h2>

        {/* Carousel */}
        <div className="relative mt-8">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]"
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {slides.map((group, slideIdx) => (
              <div
                key={`slide-${slideIdx}`}
                className="snap-start shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {group.map((cat, colIdx) => {
                  const globalIdx = slideIdx * chunkSize + colIdx; // chỉ số duy nhất toàn cục
                  return (
                    <Card
                      key={`cat-${globalIdx}`} // ✅ key luôn duy nhất
                      className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative h-52 w-full">
                        <Image
                          src={cat.img}
                          alt={cat.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <CardContent className="absolute inset-0 flex flex-col items-center justify-end p-5">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-900/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 w-full flex flex-col items-center">
                          <h3 className="text-white text-lg font-extrabold uppercase tracking-wide text-center drop-shadow">
                            {cat.title}
                          </h3>
                          <Link
                            href={cat.href}
                            className="mt-3 inline-flex items-center justify-center px-4 py-2 rounded-lg border border-white/90 text-white text-sm font-medium opacity-0 translate-y-2 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 hover:bg-white hover:text-emerald-900 focus-visible:opacity-100 focus-visible:translate-y-0 focus-visible:scale-100"
                          >
                            {cat.button || "Xem chi tiết"}
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            aria-label="Prev"
            onClick={() => scrollByPage("prev")}
            className="absolute -left-35 top-1/2 -translate-y-1/2 z-20
             p-3 rounded-full shadow-md
             border border-emerald-900 text-emerald-900
             bg-white/90 backdrop-blur
             hover:bg-emerald-900 hover:text-white
             transition-colors"
          >
            <ChevronLeft />
          </button>

          <button
            aria-label="Next"
            onClick={() => scrollByPage("next")}
            className="absolute -right-35 top-1/2 -translate-y-1/2 z-20
             p-3 rounded-full shadow-md
             border border-emerald-900 text-emerald-900
             bg-white/90 backdrop-blur
             hover:bg-emerald-900 hover:text-white
             transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
