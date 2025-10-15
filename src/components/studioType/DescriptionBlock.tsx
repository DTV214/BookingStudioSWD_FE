"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { StudioType } from "@/domain/models/studio-type/studioType";
import {
  Star,
  Clock,
  ShieldCheck,
  Zap,
  Play,
  Newspaper,
  Heart,
} from "lucide-react";


export default function DescriptionBlock({ type }: { type: StudioType }) {
  const bannerImages = [
    "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617638/enter-studio-cho-thue-studio-chup-anh-002_nrm9nz.jpg",
    "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617665/goi-thue-khong-gian-workshop-chup-anh-tp-hcm-005_n3ajde.jpg",
    "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617656/cho-thue-studio-chup-anh-quay-phim-005_ubd7jr.jpg",
    "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617656/cho-thue-studio-vo-cuc-chup-anh-quay-phim-014_zz4wot.jpg",
    "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617175/41536e796f4d685f61375541426c78773858426246_zai0xr.jpg",
  ];

  // responsive: 1 / 2 / 3 slides
  const [visibleSlides, setVisibleSlides] = useState(3);
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) setVisibleSlides(1);
      else if (window.innerWidth < 1024) setVisibleSlides(2);
      else setVisibleSlides(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // --- infinite loop logic (clone head/tail) ---
  const realLen = bannerImages.length;
  const headClones = bannerImages.slice(-visibleSlides);
  const tailClones = bannerImages.slice(0, visibleSlides);
  const slides = [...headClones, ...bannerImages, ...tailClones];

  // bắt đầu từ phần tử thật đầu tiên (sau headClones)
  const [index, setIndex] = useState(visibleSlides);
  const [anim, setAnim] = useState(true); // bật/tắt animation khi cần "nhảy" tức thời

  // reset index khi breakpoint đổi
  useEffect(() => {
    setAnim(false);
    setIndex(visibleSlides);
    const t = setTimeout(() => setAnim(true), 0);
    return () => clearTimeout(t);
  }, [visibleSlides]);

  // autoplay
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), 9000);
    return () => clearInterval(id);
  }, [visibleSlides, realLen]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  // nếu chạm clone thì nhảy về vị trí thật tương ứng (không animation -> không hở trắng)
  useEffect(() => {
    if (!anim) return;

    // đi sang phải: vượt quá phần tử thật cuối cùng -> rơi vào clone tail
    if (index >= realLen + visibleSlides) {
      setTimeout(() => {
        setAnim(false);
        setIndex(visibleSlides); // quay về phần tử thật đầu tiên
        requestAnimationFrame(() => setAnim(true));
      }, 10);
    }

    // đi sang trái: thấp hơn head (rơi vào clone head)
    if (index < visibleSlides) {
      setTimeout(() => {
        setAnim(false);
        setIndex(realLen + visibleSlides - 1); // phần tử thật cuối cùng
        requestAnimationFrame(() => setAnim(true));
      }, 10);
    }
  }, [index, anim, realLen, visibleSlides]);

  // dots đang hoạt động (theo danh sách thật)
  const activeDot = (((index - visibleSlides) % realLen) + realLen) % realLen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl space-y-10"
    >
      {/* 🎠 Carousel */}
      <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
        <motion.div
          className="flex"
          animate={{ x: `-${index * (100 / visibleSlides)}%` }}
          transition={{ duration: anim ? 0.7 : 0 }}
          style={{ width: `${(slides.length * 100) / visibleSlides}%` }}
        >
          {slides.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-1"
            >
              <Image
                src={src}
                alt={`Studio banner ${i + 1}`}
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-56 sm:h-64 lg:h-72"
              />
            </div>
          ))}
        </motion.div>

        {/* Nút điều hướng */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 p-2 rounded-full shadow-md transition"
          aria-label="Prev"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-green-700 p-2 rounded-full shadow-md transition"
          aria-label="Next"
        >
          ›
        </button>

        {/* Chấm điều hướng */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAnim(true);
                setIndex(i + visibleSlides);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                i === activeDot ? "bg-green-600 scale-110" : "bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      {/* 🧾 Thông tin chính */}
      <div>
        <h1 className="text-3xl font-bold text-green-900 mb-3">{type.name}</h1>
        <p className="text-gray-700 leading-relaxed mb-6">
          {type.description || "Đang cập nhật thông tin chi tiết..."}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-800">Diện tích:</span>{" "}
            {type.minArea}–{type.maxArea} m²
          </div>
          <div>
            <span className="font-medium text-gray-800">Thời gian đệm:</span>{" "}
            {type.bufferTime ?? "Không có"}
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star fill="currentColor" />
            <span>4.8 / 5 (2.3k lượt đánh giá)</span>
          </div>
        </div>
      </div>
      {/* 🌿 Ưu điểm nổi bật */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-sm border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          🌿 Ưu điểm nổi bật
        </h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Không gian được trang bị hiện đại, tiện nghi.</li>
          <li>Hỗ trợ setup nhanh và chuyên nghiệp cho buổi chụp.</li>
          <li>Có gói ưu đãi giảm giá khi đặt lịch dài ngày.</li>
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          {
            icon: <Zap className="text-green-700 w-6 h-6" />,
            title: "Giao dịch nhanh chóng",
            desc: "Chỉ vài thao tác, bạn đã có thể đặt studio mong muốn.",
          },
          {
            icon: <ShieldCheck className="text-blue-700 w-6 h-6" />,
            title: "Uy tín & an toàn",
            desc: "Được hàng ngàn khách hàng và chủ studio tin tưởng.",
          },
          {
            icon: <Clock className="text-amber-600 w-6 h-6" />,
            title: "Tiết kiệm thời gian",
            desc: "Hệ thống thông minh giúp bạn tìm và đặt lịch chỉ trong vài phút.",
          },
          {
            icon: <Heart className="text-pink-600 w-6 h-6" />,
            title: "Yêu thích cao",
            desc: "Hơn 2000+ lượt đánh giá tích cực từ người dùng.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              {item.icon}
              <h4 className="font-semibold text-green-900 text-base">
                {item.title}
              </h4>
            </div>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
      {/* 📰 Tin tức nổi bật */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-gray-100 shadow-md rounded-xl p-6 space-y-3"
      >
        <h3 className="text-xl font-bold text-green-900 flex items-center gap-2 mb-4">
          <Newspaper className="w-5 h-5 text-green-700" /> Tin Tức & Cập Nhật
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>📅 Ra mắt gói chụp lookbook mùa Thu 2025 với ưu đãi 20%.</li>
          <li>🎥 Nâng cấp không gian quay phim 4K tại các chi nhánh Hà Nội.</li>
          <li>🖼️ Cập nhật hơn 50+ concept chụp hình nghệ thuật mới nhất.</li>
        </ul>
      </motion.div>
      {/* 🎥 Video nổi bật */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-video rounded-2xl overflow-hidden shadow-lg"
      >
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/9bZkp7q19f0"
          title="Video giới thiệu studio"
          allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 text-white flex items-center gap-2">
          <Play size={18} />
          <span className="font-semibold">Xem video giới thiệu</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
