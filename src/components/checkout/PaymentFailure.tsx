// src/components/checkout/PaymentFailure.tsx
import React from "react";
import Link from "next/link";
import { XCircle, Home, RefreshCw } from "lucide-react"; // Đổi icon nút thử lại
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface PaymentFailureProps {
  // Optional: Nhận thêm props nếu cần hiển thị mã lỗi
  errorCode?: string | null;
}

export const PaymentFailure: React.FC<PaymentFailureProps> = (
  {
    /* errorCode */
  }
) => {
  return (
    <Card className="w-full max-w-md mx-auto text-center border-red-500 shadow-lg">
      <CardHeader>
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <CardTitle className="text-2xl font-bold text-red-600">
          Thanh Toán Thất Bại
        </CardTitle>
        <CardDescription className="text-gray-600">
          Đã xảy ra lỗi trong quá trình thanh toán hoặc giao dịch đã bị hủy. Vui
          lòng thử lại.
          {/* {errorCode && <p className="mt-2">Mã lỗi: <strong>{errorCode}</strong></p>} */}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">
          Nếu bạn tin rằng đây là lỗi, vui lòng liên hệ bộ phận hỗ trợ.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {" "}
          {/* Căn chỉnh nút tốt hơn */}
          <Link href="/booking" passHref>
            {" "}
            {/* Quay lại trang booking */}
            <Button variant="outline" className="w-full sm:w-auto">
              {" "}
              {/* Responsive width */}
              <RefreshCw className="w-4 h-4 mr-2" /> {/* Icon khác */}
              Thử Lại
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="secondary" className="w-full sm:w-auto">
              {" "}
              {/* Responsive width */}
              <Home className="w-4 h-4 mr-2" />
              Về Trang Chủ
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
