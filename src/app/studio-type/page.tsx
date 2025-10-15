"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { StudioType } from "@/domain/models/studio-type/studioType";
import { getStudioTypes } from "@/domain/usecases/studioType/getStudioTypes";
import {
  Camera,
  ImageIcon,
  Video,
  Lightbulb,
  Palette,
  Star,
  Heart,
  Info,
} from "lucide-react";
import BackToTop from "@/components/homepage/BackToTop";

export default function StudioTypeListPage() {
  const [types, setTypes] = useState<StudioType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getStudioTypes();
        setTypes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi tải studio types:", err);
        setTypes([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-gray-500">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="border-4 border-green-300 border-t-green-700 rounded-full w-12 h-12 mb-4"
        />
        Đang tải danh sách loại studio...
      </div>
    );
  }

  // 🔹 Danh sách icon & màu gradient
  const icons = [Camera, ImageIcon, Video, Lightbulb, Palette, Star];
  const colors = [
    "from-green-200 to-green-100",
    "from-blue-200 to-blue-100",
    "from-yellow-200 to-yellow-100",
    "from-pink-200 to-pink-100",
    "from-teal-200 to-teal-100",
    "from-rose-200 to-rose-100",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* 🌄 Hero Banner */}
      <section className="relative w-full h-[70vh] overflow-hidden mb-12">
        <Image
          src="https://res.cloudinary.com/dratbz8bh/image/upload/v1758602688/cld-sample.jpg"
          alt="Studio Banner"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Khám Phá Các Loại Hình Studio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-100 max-w-2xl"
          >
            Nơi quy tụ những không gian sáng tạo, chuyên nghiệp – từ lookbook,
            cưới, đến nghệ thuật cao cấp.
          </motion.p>
        </div>
      </section>

      {/* 🏷️ Danh sách loại hình studio */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-green-900 mb-8 text-center"
        >
          Danh Sách Các Loại Studio
        </motion.h2>

        {types.length === 0 ? (
          <div className="text-center text-gray-500">
            Không có loại studio nào được tìm thấy.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((type, i) => {
              const Icon = icons[i % icons.length];
              const bgColor = colors[i % colors.length];

              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/studio-type/${type.id}`}>
                    <div
                      className={`group relative rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 bg-gradient-to-br ${bgColor} overflow-hidden`}
                    >
                      <div className="flex flex-col justify-center items-center h-48 text-center px-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 3 }}
                          className="text-green-800 mb-3"
                        >
                          <Icon size={48} strokeWidth={1.5} />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-green-900 mb-1">
                          {type.name}
                        </h3>
                        <p className="text-gray-700 text-sm line-clamp-2 max-w-xs">
                          {type.description}
                        </p>
                      </div>

                      <div className="px-5 py-4 bg-white/70 backdrop-blur-sm border-t border-gray-200 flex justify-between items-center text-sm text-gray-700">
                        <span>
                          Diện tích: {type.minArea}–{type.maxArea} m²
                        </span>
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className="flex items-center gap-1 text-pink-600"
                        >
                          <Heart size={15} fill="#ec407a" /> 230+
                        </motion.span>
                      </div>

                      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity duration-300" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 🧭 Banner giới thiệu thông tin */}
      <section className="bg-green-100 py-14 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="https://res.cloudinary.com/dratbz8bh/image/upload/v1758619649/anh-cuoi-dep-trong-studio-10_keveam.png"
              alt="Giới thiệu studio"
              width={600}
              height={400}
              className="rounded-2xl shadow-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-green-900 mb-3 flex items-center gap-2">
              <Info className="w-6 h-6 text-green-700" /> Thông Tin & Giới Thiệu
            </h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Mỗi loại hình studio mang phong cách và mục đích sử dụng riêng: từ
              studio cưới lãng mạn, lookbook trẻ trung đến concept nghệ thuật
              chuyên sâu.
            </p>
            <p className="text-gray-700">
              Chúng tôi cung cấp các gói dịch vụ chuyên nghiệp, hỗ trợ setup ánh
              sáng, thiết bị và tư vấn concept cho từng nhu cầu chụp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ⚙️ Banner thiết bị */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-green-900 mb-6 text-center"
        >
          💡 Thiết Bị Hiện Đại
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Camera className="text-green-700 w-8 h-8" />,
              title: "Ánh sáng & Softbox",
              desc: "Hệ thống ánh sáng được setup chuyên nghiệp, phù hợp mọi concept.",
            },
            {
              icon: <Star className="text-yellow-500 w-8 h-8" />,
              title: "Background cao cấp",
              desc: "Phông nền đa dạng, từ tối giản đến nghệ thuật, phù hợp chụp lookbook và cưới.",
            },
            {
              icon: <Heart className="text-pink-500 w-8 h-8" />,
              title: "Không gian sáng tạo",
              desc: "Không gian mở, tiện nghi, giúp bạn tự do sáng tạo với nhiều phong cách.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 text-center"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h4 className="font-semibold text-green-800 text-lg mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🤝 Banner quảng bá */}
      <section className="bg-green-900 text-white py-16 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          Trở Thành Đối Tác Cùng Chúng Tôi
        </motion.h3>
        <p className="text-gray-200 max-w-2xl mx-auto mb-6">
          Nếu bạn là chủ studio, hãy hợp tác cùng hệ thống chúng tôi để quảng bá
          thương hiệu, tiếp cận hàng nghìn khách hàng mỗi tháng.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-green-900 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition"
        >
          Liên Hệ Ngay
        </Link>
      </section>

      <BackToTop />
    </main>
  );
}
