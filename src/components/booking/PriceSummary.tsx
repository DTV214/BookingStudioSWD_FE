// src/components/common/booking/PriceSummary.tsx

import React from "react";
import { DollarSign, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// --- MOCK DATA CỨNG (Sẽ được truyền qua props sau này) ---
const MOCK_STUDIO_INFO = {
  type: "Phòng chụp ảnh thời trang",
  location: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
};

const MOCK_PRICE_RESPONSE = {
  totalPrice: 1200000.0,
  priceResults: [
    {
      price: 500000.0,
      description: "Slot 1 (08:00 - 10:00) - 2 giờ",
    },
    {
      price: 500000.0,
      description: "Slot 2 (10:00 - 12:00) - 2 giờ",
    },
    {
      price: 200000.0,
      description: "Phí dịch vụ bổ sung",
    },
  ],
};

interface PriceSummaryProps {
  // Sẽ nhận dữ liệu giá và thông tin studio qua props
}

export const PriceSummary: React.FC<PriceSummaryProps> = () => {
  const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  return (
    <Card className="sticky top-20 shadow-xl border-amber-500 border-2 bg-white">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 text-xl text-amber-600">
          <DollarSign className="w-5 h-5" /> Tóm Tắt Đơn Hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {/* Studio Info */}
        <div className="space-y-1 pb-4 border-b">
          <h3 className="font-bold text-gray-800">{MOCK_STUDIO_INFO.type}</h3>
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-3 h-3" /> {MOCK_STUDIO_INFO.location}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">Chi tiết phí</h4>
          {MOCK_PRICE_RESPONSE.priceResults.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm text-gray-600"
            >
              <span className="max-w-[70%]">{item.description}</span>
              <span className="font-medium">{formatCurrency(item.price)}</span>
            </div>
          ))}
        </div>

        {/* Payment Method Selector */}
        <div className="pt-4 space-y-2 border-t pt-4">
          <Label className="font-semibold text-gray-700">
            3. Phương thức Thanh toán
          </Label>
          <select
            className="w-full p-2 border rounded-md focus:ring-amber-500 focus:border-amber-500 transition-colors"
            defaultValue="PAY_FULL_MOMO"
          >
            <option value="PAY_FULL_MOMO">Thanh toán đủ - Ví Momo</option>
            <option value="PAY_FULL_VNPAY">Thanh toán đủ - VNPay</option>
            <option value="DEPOSIT_BANK">Đặt cọc 50% - Chuyển khoản</option>
          </select>
        </div>

        {/* Total Price */}
        <div className="flex justify-between font-bold text-xl pt-3 border-t-2 border-dashed">
          <span>TỔNG CỘNG:</span>
          <span className="text-red-600">
            {formatCurrency(MOCK_PRICE_RESPONSE.totalPrice)}
          </span>
        </div>

        <Button className="w-full text-lg bg-red-600 hover:bg-red-700 mt-4 py-6 font-bold tracking-wide transition-colors">
          XÁC NHẬN & THANH TOÁN
        </Button>

        <p className="text-xs text-center text-gray-500 mt-2">
          * Giá trị này là tạm tính và có thể thay đổi khi có dịch vụ phát sinh.
        </p>
      </CardContent>
    </Card>
  );
};
