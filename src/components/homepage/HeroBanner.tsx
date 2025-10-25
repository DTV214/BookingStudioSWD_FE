"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
interface Banner {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const banners: Banner[] = [
  {
    id: 1,
    title: "SWD Studio",
    subtitle: "Dịch vụ chụp ảnh – quay phim chuyên nghiệp, uy tín, tận tâm",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617636/enter-studio-cho-thue-studio-chup-anh-004_v89y7r.jpg",
  },
  {
    id: 2,
    title: "Khoảnh khắc đáng nhớ",
    subtitle: "Lưu giữ kỷ niệm cùng ekip giàu kinh nghiệm",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617527/Chup-anh-ky-yeu-dep-nhat-Mien-Bac-39-1440x1440_w60v3p.jpg",
  },
  {
    id: 3,
    title: "Dịch vụ trọn gói",
    subtitle: "Trang phục – Makeup – Studio hiện đại – Album cao cấp",
    image:
      "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617594/tour-ky-yeu-NAM-DINH-22-scaled_epoxvk.jpg",
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          {/* Background image */}
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            priority={index === 0}
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0  bg-gray-50 opacity-25 " />

          {/* Text */}
          <div className="relative z-30 flex flex-col items-center justify-center h-full text-center  px-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg animate-fadeInUp text-amber-100 ">
              {banner.title}
            </h1>
            <p className="mt-4 text-lg md:text-2xl max-w-2xl animate-fadeInUp text-white delay-200">
              {banner.subtitle}
            </p>
            <Link
              href="/booking"
              className="mt-6 px-6 py-3 bg-amber-100 text-black rounded-lg font-semibold shadow-md hover:bg-amber-300 transition"
            >
              Đặt lịch ngay
            </Link>
          </div>
        </div>
      ))}
      {/* Arrow controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-white hover:bg-black/50  transition"
        aria-label="Slide trước"
      >
        <ChevronLeft className="w-8 h-8 text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-white hover:bg-black/50 transition"
        aria-label="Slide kế tiếp"
      >
        <ChevronRight className="w-8 h-8 text-black" />
      </button>
      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {banners.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === currentIndex
                ? "bg-amber-100 scale-110"
                : "bg-white/50 hover:bg-white"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
