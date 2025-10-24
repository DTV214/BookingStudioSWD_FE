"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Import Button của Shadcn
import { ArrowDown } from "lucide-react"; // Thêm icon

// --- Các biến thể animation của Framer Motion ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function SeviceHeroBanner() {
  // --- HÀM MỚI ĐỂ CUỘN TRANG ---
  const handleScrollToPricing = () => {
    // Tìm đến element có id 'pricing-section'
    const section = document.getElementById("service-section");
    if (section) {
      // Cuộn mượt mà
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  // --- HẾT HÀM MỚI ---

  return (
    <div className="relative w-full py-24 md:py-40 overflow-hidden">
      {/* Lớp nền Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-200 via-pink-200 to-orange-200" />

      {/* Nội dung */}
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl text-center mx-auto"
        >
          {/* 1. Văn bản "mồi" (Eyebrow text) */}
          <motion.p
            variants={itemVariants}
            className="text-lg font-semibold text-purple-700"
          >
            BẠN ĐANG ĐAU ĐẦU VỀ VIỆC TÌM KIẾM DỊCH VỤ CHẤT LƯỢNG?
          </motion.p>

          {/* 2. Tiêu đề chính (Thu hút) */}
          <motion.h1
            variants={itemVariants}
            className="mt-2 text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
          >
            Hiện Thực Hóa Tầm Nhìn
          </motion.h1>

          {/* 3. Mô tả (Thuyết phục) */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-gray-700"
          >
            Từ ý tưởng đến tác phẩm hoàn hảo. Khám phá các dịch vụ linh hoạt,
            minh bạch được dànhriêng cho nhiếp ảnh gia, nhà quay phim và
            nhà sáng tạo nội dung.
          </motion.p>

          {/* 4. Nút Kêu gọi hành động (Call to Action) */}
          <motion.div variants={itemVariants} className="mt-10">
            <Button
              size="lg"
              className="bg-purple-600 text-white font-bold hover:bg-purple-700
                         px-8 py-6 text-base rounded-full
                         transition-all duration-300 hover:scale-105"
              // --- THÊM onClick VÀO ĐÂY ---
              onClick={handleScrollToPricing}
            >
              Khám Phá Các Dịch Vụ Của Chúng Tôi
              <ArrowDown className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
