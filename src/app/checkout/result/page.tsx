// src/app/checkout/result/page.tsx (Đã cập nhật)

"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
// Import các component mới
import { PaymentSuccess } from "@/components/checkout/PaymentSuccess";
import { PaymentFailure } from "@/components/checkout/PaymentFailure";

// Component nội dung chính, đọc query param và render component tương ứng
function ResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  // Optional: Lấy các tham số khác nếu cần truyền xuống component con
  // const orderId = searchParams.get('vnp_TxnRef');
  // const errorCode = searchParams.get('vnp_ResponseCode');

  if (status === "success") {
    return <PaymentSuccess /* orderId={orderId} */ />;
  }

  // Mặc định là thất bại nếu status không phải 'success'
  return <PaymentFailure /* errorCode={errorCode} */ />;
}

// Component Page chính, sử dụng Suspense
export default function CheckoutResultPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          // Giao diện loading đơn giản hơn
          <div className="text-center text-gray-500">
            <p>Đang tải kết quả thanh toán...</p>
          </div>
        }
      >
        <ResultContent />
      </Suspense>
    </div>
  );
}
