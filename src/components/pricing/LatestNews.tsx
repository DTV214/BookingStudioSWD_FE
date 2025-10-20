"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Dữ liệu giả
const news = [
  {
    title: 'Ra mắt Studio Concept "Cyberpunk"',
    desc: "Khám phá không gian neon mới nhất, hoàn hảo cho các MV ca nhạc và bộ ảnh thời trang cá tính...",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1716972052/samples/landscapes/girl-urban-view.jpg",
    href: "#",
  },
  {
    title: 'Giảm giá 30% khi book lịch vào "giờ vàng"',
    desc: "Tiết kiệm chi phí khi đặt lịch vào các khung giờ thấp điểm (9h-11h sáng T2-T4)...",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1716972050/samples/ecommerce/accessories-bag.jpg",
    href: "#",
  },
  {
    title: "Hợp tác cùng Local Brand XYZ",
    desc: "SWD Studio vinh dự là địa điểm thực hiện lookbook mới nhất cho bộ sưu tập Mùa hè của...",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758617638/enter-studio-cho-thue-studio-chup-anh-002_nrm9nz.jpg",
    href: "#",
  },
];

export default function LatestNews() {
  return (
    <div className="bg-muted py-24">
      {" "}
      {/* Thêm nền xám nhạt để tách biệt */}
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Tin tức & Cập nhật
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card
              key={item.title}
              className="flex flex-col shadow-lg rounded-xl overflow-hidden group 
                         transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover 
                             transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{item.desc}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={item.href}
                  className="font-semibold text-purple-600 flex items-center gap-2 
                             group-hover:gap-3 transition-all"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
