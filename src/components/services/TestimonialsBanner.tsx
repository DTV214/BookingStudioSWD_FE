"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

// Dữ liệu mẫu (sau này bạn sẽ thay bằng API)
const testimonials = [
  {
    name: "Nguyễn Văn An",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "Dịch vụ tuyệt vời! Ekip rất chuyên nghiệp và thân thiện. Ảnh chụp rất đẹp và ưng ý. Chắc chắn sẽ quay lại.",
  },
  {
    name: "Trần Thị Bích",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 4.5,
    review:
      "Studio có nhiều concept đẹp, ánh sáng tốt. Chỉ tiếc là hơi đông vào cuối tuần. Nhưng chất lượng ảnh thì không chê được.",
  },
  {
    name: "Lê Minh Tuấn",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    review:
      "Tôi đã dùng dịch vụ quay TVC ở đây. Mọi thứ đều hoàn hảo, từ kịch bản đến hậu kỳ. Rất hài lòng với sản phẩm cuối cùng.",
  },
  {
    name: "Phạm Thu Hà",
    avatar: "https://i.pravatar.cc/150?img=49",
    rating: 5,
    review:
      "Giá cả rất hợp lý so với chất lượng. Các bạn makeup và stylist tư vấn rất có tâm. Sẽ giới thiệu cho bạn bè.",
  },
];

// Component con để render sao
const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
      );
    } else if (i - 0.5 === rating) {
      stars.push(
        <StarHalf key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
      );
    } else {
      stars.push(<Star key={i} className="h-5 w-5 text-gray-300" />);
    }
  }
  return <div className="flex gap-1">{stars}</div>;
};

export function TestimonialsBanner() {
  return (
    // Nền gradient thu hút
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Cân bằng container, mx-auto, và padding responsive */}
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12">
          Sự hài lòng của bạn là động lực của SWD Studio
        </p>

        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
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
            {testimonials.map((item, index) => (
              // Responsive: 1 card (mobile), 2 (tablet), 3 (desktop)
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 p-4"
              >
                <Card className="h-full flex flex-col shadow-lg rounded-xl overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4 bg-white">
                    <Avatar className="h-14 w-14 border-2 border-amber-200 p-0.5">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="font-semibold text-lg">{item.name}</p>
                      <RatingStars rating={item.rating} />
                    </div>
                  </CardHeader>
                  <CardContent className="bg-gray-50 flex-grow">
                    <p className="text-muted-foreground italic text-base">
                      {item.review}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
