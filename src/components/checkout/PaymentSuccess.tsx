// src/components/checkout/PaymentSuccess.tsx
import React from "react";
import Link from "next/link";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface PaymentSuccessProps {
  // Optional: Nhận thêm props nếu cần hiển thị thông tin cụ thể
  orderId?: string | null;
}

export const PaymentSuccess: React.FC<PaymentSuccessProps> = (
  {
    /* orderId */
  }
) => {
  return (
    <Card className="w-full max-w-md mx-auto text-center border-green-500 shadow-lg">
      <CardHeader>
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <CardTitle className="text-2xl font-bold text-green-600">
          Thanh Toán Thành Công!
        </CardTitle>
        <CardDescription className="text-gray-600">
          Cảm ơn bạn đã đặt studio. Đơn hàng của bạn đã được xác nhận.
          {/* {orderId && <p className="mt-2">Mã đơn hàng: <strong>{orderId}</strong></p>} */}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">
          Bạn sẽ sớm nhận được email xác nhận chi tiết.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {" "}
          {/* Căn chỉnh nút tốt hơn */}
          <Link href="/" passHref>
            <Button variant="outline" className="w-full sm:w-auto">
              {" "}
              {/* Responsive width */}
              <Home className="w-4 h-4 mr-2" />
              Về Trang Chủ
            </Button>
          </Link>
          <Link href="/profile/bookings" passHref>
            {" "}
            {/* Điều chỉnh link nếu cần */}
            <Button className="w-full sm:w-auto">
              {" "}
              {/* Responsive width */}
              <ShoppingBag className="w-4 h-4 mr-2" />
              Xem Lịch Sử Đặt Phòng
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
