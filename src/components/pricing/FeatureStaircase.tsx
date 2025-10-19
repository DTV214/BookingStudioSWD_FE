"use client";

// Dữ liệu giả
const features = [
  {
    title: "Trải nghiệm Chụp ảnh Cưới",
    desc: "Không gian lãng mạn, đa dạng concept từ cổ điển đến hiện đại. Chúng tôi cung cấp phòng thay đồ rộng rãi và khu vực tư vấn riêng tư cho các cặp đôi.",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619645/anh-cuoi-dep-trong-studio-5_rwa1yb.png",
  },
  {
    title: "Sự kiện Workshop Nhiếp Ảnh",
    desc: "Studio lớn của chúng tôi (Studio C) là địa điểm lý tưởng cho các buổi workshop, với sức chứa lên đến 30 người và đầy đủ thiết bị trình chiếu.",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619371/chup-anh-ky-yeu-uy-tin-chuyen-nghiep-dep-tron-goi-gia-re-115_tcwlwf.jpg",
  },
  {
    title: "Trải nghiệm Chụp ảnh Kỷ yếu",
    desc: "Lưu giữ khoảnh khắc thanh xuân với các bối cảnh độc đáo. Hỗ trợ phông nền, đạo cụ và hệ thống đèn chuyên nghiệp cho cả lớp.",
    img: "https://res.cloudinary.com/dratbz8bh/image/upload/v1758619001/chup-anh-ky-yeu-lop-9-gia-re-chat-luong-uy-tin_it55bu.jpg",
  },
];

export default function FeatureStaircase() {
  return (
    <div className="container mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Trải nghiệm thực tế tại Studio
      </h2>

      {/* Đây là logic "cầu thang" (zigzag):
        - Bọc các item trong một div.
        - Dùng selector :nth-child(even) để đảo ngược thứ tự flex (flex-row-reverse)
          cho các phần tử chẵn (thứ 2, 4, 6...) trên màn hình md trở lên.
      */}
      <div className="space-y-16 md:space-y-24 [&>:nth-child(even)]:md:flex-row-reverse">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            {/* Cột 1: Ảnh */}
            <div className="w-full md:w-1/2">
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-auto aspect-video object-cover rounded-xl shadow-2xl"
              />
            </div>

            {/* Cột 2: Chữ */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
