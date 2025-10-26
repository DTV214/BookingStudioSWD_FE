// src/components/services/NewsBanner.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NewsBanner() {
  return (
    // Nền gradient
    <section className="w-full bg-gradient-to-r text-white py-16 md:py-24">
      {/* Cân bằng container, mx-auto, và padding responsive */}
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-4">
        {/* Cột hình ảnh (responsive) */}
        <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl">
          <img
            src="https://res.cloudinary.com/dratbz8bh/image/upload/v1758617636/enter-studio-cho-thue-studio-chup-anh-004_v89y7r.jpg"
            alt="News Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cột nội dung (responsive) */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-amber-400">
            Tin Tức & Khuyến Mãi
          </h2>
          <p className="text-lg mt-3 text-gray-300 max-w-lg">
            Đừng bỏ lỡ các ưu đãi hấp dẫn và mẹo chụp ảnh mới nhất từ SWD
            Studio.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 bg-amber-400 text-black font-bold hover:bg-amber-300
                       flex-shrink-0 transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/news">Xem Ngay</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
