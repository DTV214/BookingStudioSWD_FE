// src/components/common/booking/PriceSummary.tsx (ĐÃ SỬA LỖI)

import React from "react";
import { DollarSign, MapPin, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Kiểu dữ liệu cho chi tiết giá (tính ở page.tsx)
export interface PriceBreakdownItem {
  description: string;
  price: number; // Mặc dù type là number, runtime có thể là undefined
}

interface PriceSummaryProps {
  selectedStudioType: string | null;
  selectedLocation: string | null;

  // Dữ liệu đã tính toán từ page.tsx
  priceBreakdown: PriceBreakdownItem[];
  totalPrice: number;

  // Callback
  onPaymentChange: (
    field: "bookingType" | "paymentMethod",
    value: string
  ) => void;
  onSubmitBooking: () => void;
  isSubmitting: boolean; // Trạng thái loading khi nhấn nút
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  selectedStudioType,
  selectedLocation,
  priceBreakdown,
  totalPrice,
  onPaymentChange,
  onSubmitBooking,
  isSubmitting,
}) => {
  // SỬA LỖI:
  // Thêm (amount ?? 0) để xử lý trường hợp 'amount' là null hoặc undefined.
  const formatCurrency = (amount: number) =>
    (amount ?? 0).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });

  return (
    <Card className="sticky  top-20 shadow-xl border-amber-500 border-2 bg-white">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-xl text-amber-600">
          <DollarSign className="w-5 h-5" /> Tóm Tắt Đơn Hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Studio Info */}
        <div className="space-y-1 pb-4 border-b">
          <h3 className="font-bold text-gray-800">
            {selectedStudioType || "Chưa chọn loại studio"}
          </h3>
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-3 h-3" />
            {selectedLocation || "Chưa chọn địa điểm"}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">
            Chi tiết phí (Tạm tính)
          </h4>
          {/* Thêm "?." (optional chaining) để an toàn nếu priceBreakdown bị undefined */}
          {priceBreakdown?.length > 0 ? (
            priceBreakdown.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-600"
              >
                <span className="max-w-[70%]">{item.description}</span>
                <span className="font-medium">
                  {/* Hàm formatCurrency giờ đã an toàn */}
                  {formatCurrency(item.price)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Vui lòng chọn thời gian để tính giá...
            </p>
          )}
        </div>

        {/* Payment Method Selector */}
        <div className="pt-4 space-y-4 border-t pt-4">
          <div className="space-y-2">
            <Label className="font-semibold text-gray-700">Hình thức</Label>
            <Select
              defaultValue="PAY_FULL"
              onValueChange={(value) => onPaymentChange("bookingType", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PAY_FULL">Thanh toán đủ</SelectItem>
                <SelectItem value="DEPOSIT">Thanh toán đặt cọc 30%</SelectItem>
                {/* Thêm PAY_DEPOSIT nếu backend hỗ trợ */}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="font-semibold text-gray-700">
              Phương thức Thanh toán
            </Label>
            <Select
              defaultValue="MOMO"
              onValueChange={(value) => onPaymentChange("paymentMethod", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MOMO">Ví Momo</SelectItem>
                <SelectItem value="VNPAY">VNPay</SelectItem>
                <SelectItem value="CASH">Tiền mặt</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between font-bold text-2xl pt-3 border-t-2 border-dashed text-red-600">
          <span>TỔNG CỘNG:</span>
          {/* Hàm formatCurrency giờ đã an toàn */}
          <span>{formatCurrency(totalPrice)}</span>
        </div>

        <Button
          className="w-full text-lg bg-red-600 hover:bg-red-700 mt-4 py-6 font-bold tracking-wide transition-colors"
          onClick={onSubmitBooking}
          disabled={isSubmitting || totalPrice === 0}
        >
          <CreditCard className="w-5 h-5 mr-2" />
          {isSubmitting ? "Đang xử lý..." : "XÁC NHẬN BOOKING"}
        </Button>
      </CardContent>
    </Card>
  );
};
