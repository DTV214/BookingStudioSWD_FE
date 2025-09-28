"use client";

import React from "react";

const infos = [
  {
    number: "10+",
    title: "Năm kinh nghiệm",
    desc: "Với 10 năm hoạt động trong lĩnh vực chụp ảnh. SWD Studio được biết đến với đội ngũ ekip chụp hình chuyên nghiệp, sáng tạo, tận tâm và nhiệt huyết đã đem lại trải nghiệm hài lòng cho khách hàng.",
  },
  {
    number: "85+",
    title: "Nhân viên chuyên nghiệp",
    desc: "SWD Studio có một đội ngũ nhân viên, thợ chụp ảnh và chuyên viên make – up trang điểm đông đảo, nhiệt tình đã có nhiều năm kinh nghiệm làm việc trong nghề.",
  },
  {
    number: "26984+",
    title: "Dự án đã thực hiện",
    desc: "Tên tuổi Cộng Studio được khẳng định bằng chính các sản phẩm chất lượng, màu sắc riêng biệt, độ bền dài lâu mà khách hàng nhận được.",
  },
];

export default function TextInformationBanner() {
  return (
    <section className="relative w-full bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {infos.map((item, idx) => (
            <div
              key={idx}
              className={`relative text-center md:text-left ${
                idx < infos.length - 1
                  ? "md:border-r md:pr-8 border-gray-200"
                  : ""
              }`}
            >
              <h3 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-1">
                {item.number}
              </h3>
              <p className="text-green-700 font-semibold text-lg mb-4">
                {item.title}
              </p>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
