"use client";

import { Service } from "@/domain/models/booking/Service";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import từ Shadcn
import { ServiceCard } from "@/components/services/ServiceCard";
import { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay"; // Import plugin autoplay

// Hàm tiện ích để chia mảng thành các nhóm nhỏ (ví dụ: nhóm 6 item)
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function ServiceList({ services }: { services: Service[] }) {
  // Yêu cầu: 2 hàng, 3 cột = 6 item mỗi slide
  const servicePages = useMemo(() => chunkArray(services, 6), [services]);

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000, // Tự động trượt mỗi 5 giây
          stopOnInteraction: true,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {servicePages.map((page, index) => (
          <CarouselItem key={index}>
            {/* Đây là grid 2 hàng 3 cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
              {page.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-20px] hidden md:flex" />
      <CarouselNext className="absolute right-[-20px] hidden md:flex" />
    </Carousel>
  );
}
