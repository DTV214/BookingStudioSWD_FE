"use client";

import React from "react";
import Image from "next/image";
import {
  FaGem,
  FaClock,
  FaCamera,
  FaWallet,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

export default function ServiceBanner() {
  return (
    <section className="relative w-full bg-white py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left side with background image + overlay content */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dratbz8bh/image/upload/v1758618435/14264951_1686710521649875_8026794389250307993_n_l8rdjk.jpg" // thay bằng ảnh nền của bạn
            alt="Service Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6">
            <div className="border border-white p-6 md:p-10 rounded-lg text-white max-w-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                SWD Studio
              </h3>
              <p className="text-sm md:text-base leading-relaxed mb-6">
                SWD Studio là đơn vị chuyên về chụp ảnh sản phẩm quảng cáo.
                Ngoài ra, chúng tôi còn cung cấp các dịch vụ: chụp ảnh món ăn,
                quay video quảng cáo, cho thuê studio. Được xây dựng bởi sự tin
                tưởng của đối tác và sự sáng tạo của mỗi thành viên, chúng tôi
                mong muốn phá bỏ giới hạn, luôn đổi mới.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition">
                  Liên hệ ngay
                </button>
                <button className="px-5 py-2 rounded-lg bg-gray-800 text-white font-semibold hover:bg-gray-700 transition">
                  Yêu cầu gọi lại
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side with services */}
        <div className="grid grid-cols-2 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <FaGem className="w-10 h-10 text-gray-800" />
            <p className="font-medium">Ảnh sản phẩm chất lượng</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaClock className="w-10 h-10 text-gray-800" />
            <p className="font-medium">Tiết kiệm thời gian</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaCamera className="w-10 h-10 text-gray-800" />
            <p className="font-medium">Thiết bị hiện đại</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaWallet className="w-10 h-10 text-gray-800" />
            <p className="font-medium">Ưu đãi hấp dẫn</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaUsers className="w-10 h-10 text-gray-800" />
            <p className="font-medium">Nhân sự</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <FaLightbulb className="w-10 h-10 text-gray-800" />
            <p className="font-medium">Ý tưởng sáng tạo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
