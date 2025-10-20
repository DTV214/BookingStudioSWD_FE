"use client";

import { Star, StarHalf } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Dữ liệu giả
const reviews = [
  {
    name: "An Nguyễn",
    role: "Nhiếp ảnh gia tự do",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    quote:
      "Studio này là lựa chọn số một của tôi. Ánh sáng tự nhiên tuyệt vời, thiết bị hiện đại và đội ngũ hỗ trợ cực kỳ chuyên nghiệp. 10/10!",
  },
  {
    name: "Minh Trần",
    role: "Nhà sáng tạo nội dung",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4.5,
    quote:
      "Tôi đã quay 3 video TikTok tại đây. Các bối cảnh (concept) rất đa dạng và hợp trend. Sẽ quay lại chắc chắn. Chỉ trừ điểm vì hơi khó book lịch.",
  },
  {
    name: "Hoàng Lê",
    role: "Wedding Planner",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    quote:
      "Khách hàng của tôi (cặp đôi cô dâu chú rể) đã rất hài lòng với bộ ảnh cưới chụp tại đây. Không gian sang trọng và riêng tư.",
  },
];

// Component con để render sao
const Rating = ({ stars }: { stars: number }) => {
  const fullStars = Math.floor(stars);
  const halfStar = stars % 1 !== 0;
  return (
    <div className="flex text-amber-400">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-current" />
        ))}
      {halfStar && <StarHalf className="w-5 h-5 fill-current" />}
    </div>
  );
};

export default function CustomerReviews() {
  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Khách hàng nói gì về chúng tôi?
      </h2>
      <p className="text-lg text-muted-foreground text-center mb-12">
        Những trải nghiệm thực tế từ các nhà sáng tạo đã tin tưởng SWD Studio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card
            key={review.name}
            className="flex flex-col justify-between shadow-lg rounded-xl overflow-hidden"
          >
            <CardContent className="p-6">
              <Rating stars={review.rating} />
              <blockquote className="mt-4 text-lg text-gray-700">
                {review.quote}
              </blockquote>
            </CardContent>
            <div className="bg-muted p-6 mt-auto">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
