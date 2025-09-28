"use client";

import React from "react";

export default function About() {
  return (
    <section className="relative w-full bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">
        {/* Title */}
        <h2
          className="
            text-3xl md:text-5xl font-extrabold tracking-wide
            text-black hover:text-green-800
            transition-colors duration-300
          "
        >
          DỊCH VỤ TẠI SWD STUDIO
        </h2>

        {/* Divider */}
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-amber-600/80 transition-all duration-300 hover:w-24" />

        {/* Subtitle */}
        <p
          className="
            mt-6 md:mt-8 text-base md:text-2xl leading-relaxed
            text-black/80 hover:text-black
            transition-colors duration-300
          "
        >
          SWD Studio – thương hiệu hàng đầu trong lĩnh vực Chụp Ảnh với đội ngũ
          Ekip Chuyên nghiệp – dịch vụ Uy tín – Trọn gói{" "}
          <span className="font-semibold text-black">2025</span>
        </p>
      </div>

      {/* Subtle strip (amber nhạt hơn ở dưới) */}
      <div
        className="absolute inset-x-0 bottom-0 h-12 bg-gray-200"
        aria-hidden
      />
    </section>
  );
}
