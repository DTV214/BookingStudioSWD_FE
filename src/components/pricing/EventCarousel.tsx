"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Dữ liệu giả cho sự kiện (URL của bạn đã đúng)
const events = [
  {
    title: "Khuyến mãi 20/11",
    desc: "Giảm giá 20% cho tất cả booking trong tuần lễ tri ân nhà giáo.",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619001/chup-anh-ky-yeu-lop-9-gia-re-chat-luong-uy-tin_it55bu.jpg",
  },
  {
    title: "Workshop Nhiếp Ảnh",
    desc: "Bảng giá đặc biệt cho các studio tổ chức workshop cuối tuần.",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619371/chup-anh-ky-yeu-uy-tin-chuyen-nghiep-dep-tron-goi-gia-re-115_tcwlwf.jpg",
  },
  {
    title: "Chụp ảnh Cưới",
    desc: "Gói ưu đãi trọn gói cho các cặp đôi mùa cưới.",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619645/anh-cuoi-dep-trong-studio-5_rwa1yb.png",
  },
  {
    title: "Chụp ảnh Bãi Biển",
    desc: "Phong cảnh đặc sắc phù hợp cho du lịch",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619649/Beach2_oajqeh.jpg",
  },
];

export default function EventCarousel() {
  const textShadow = { textShadow: "0 2px 4px rgba(0,0,0,0.5)" };

  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold mb-8 text-center">Sự kiện & Ưu đãi</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {events.map((event, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                {/* CẢI TIẾN: Thêm 'overflow-hidden' và 'group' vào Card
                 */}
                <Card className="rounded-lg overflow-hidden group">
                  {/* SỬA LỖI: Bỏ 'rounded-lg' và 'overflow-hidden' ở đây 
                    Thêm 'relative' để làm container cho z-index
                  */}
                  <CardContent className="flex flex-col aspect-video items-start justify-end p-6 relative">
                    {/* --- SỬA LỖI & CẢI TIẾN --- */}
                    {/* 1. Bọc text vào 1 div với z-10 để nó nổi lên trên */}
                    <div className="relative z-10">
                      <CardTitle
                        className="text-2xl font-bold text-white"
                        style={textShadow}
                      >
                        {event.title}
                      </CardTitle>
                      <p
                        className="text-base text-gray-200 mt-2"
                        style={textShadow}
                      >
                        {event.desc}
                      </p>
                    </div>

                    {/* 2. Đặt ảnh ở z-0 (thay vì -z-10) */}
                    <img
                      src={event.img}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover z-0 
                                 transition-transform duration-300 ease-in-out 
                                 group-hover:scale-110" // <-- Hiệu ứng hover
                    />

                    {/* 3. Đặt overlay ở z-0 (thay vì -z-10) */}
                    <div
                      className="absolute inset-0 z-0
                                  bg-gradient-to-t from-black/60 via-black/20 to-transparent" // <-- Gradient đẹp hơn
                    />
                    {/* --- HẾT SỬA LỖI --- */}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
    </div>
  );
}
