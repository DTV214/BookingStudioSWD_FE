// src/components/services/ServiceIntro.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Video, Users } from "lucide-react";

// Đã xóa hàm animationDelay

const introItems = [
  {
    icon: <Camera className="h-10 w-10 text-amber-700" />,
    title: "Chụp Ảnh Chuyên Nghiệp",
    desc: "Thiết bị hiện đại, concept đa dạng cho ảnh cưới, profile, gia đình...",
  },
  {
    icon: <Video className="h-10 w-10 text-amber-700" />,
    title: "Quay Phim & Dựng Phim",
    desc: "Sản xuất video quảng cáo (TVC), video sự kiện, MV ca nhạc...",
  },
  {
    icon: <Users className="h-10 w-10 text-amber-700" />,
    title: "Ekip Tận Tâm",
    desc: "Đội ngũ photographer, makeup artist và stylist giàu kinh nghiệm.",
  },
];

export function ServiceIntro() {
  return (
    // Nền gradient nhẹ
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      {/* Cân bằng container, mx-auto, và padding responsive */}
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {introItems.map((item, index) => (
          <Card
            key={item.title}
            className="text-center p-6 border-0 shadow-lg transition-all duration-300
                       hover:shadow-2xl hover:-translate-y-2"
            // Đã xóa: opacity-0 animate-fade-in-up và style
          >
            <CardContent className="flex flex-col items-center gap-4 pt-6">
              {/* Nền gradient cho icon */}
              <div
                className="p-4 rounded-full 
                           bg-gradient-to-br from-amber-100 to-amber-300"
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
