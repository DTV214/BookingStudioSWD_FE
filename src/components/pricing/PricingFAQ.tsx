"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Giá trên đã bao gồm thuế (VAT) chưa?",
    a: "Tất cả giá niêm yết trên website đều chưa bao gồm 10% thuế VAT. Vui lòng thanh toán thêm phí VAT khi xuất hóa đơn.",
  },
  {
    q: "Studio có hỗ trợ thiết bị ánh sáng miễn phí không?",
    a: "Có. Mỗi gói studio đều đi kèm 2 đèn flash Godox và 2 softbox cơ bản. Các thiết bị chuyên dụng khác sẽ được tính phí riêng.",
  },
  {
    q: "Tôi có thể thay đổi lịch booking không?",
    a: "Bạn có thể thay đổi lịch booking miễn phí 01 lần, miễn là báo trước 48 giờ. Hủy lịch trong 24 giờ sẽ bị tính 50% phí.",
  },
];

export default function PricingFAQ() {
  return (
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Câu hỏi thường gặp
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
