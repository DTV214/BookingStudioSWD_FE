// src/components/common/booking/ContactInfoForm.tsx (ĐÃ SỬA LỖI)

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// SỬA LỖI 1: Thêm 'error' và 'onBlur' vào props
interface ContactInfoFormProps {
  phoneNumber: string;
  note: string;
  onChange: (field: "phoneNumber" | "note", value: string) => void;
  onBlur: (field: "phoneNumber" | "note") => void; // Thêm onBlur để validate
  error?: string; // Thêm prop để nhận lỗi
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({
  phoneNumber,
  note,
  onChange,
  onBlur, // Nhận hàm onBlur
  error, // Nhận thông báo lỗi
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          3. Thông Tin Liên Hệ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="phone">
            Số điện thoại liên hệ <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="090xxxxxxx"
            value={phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            // SỬA LỖI 2: Thêm onBlur để kích hoạt validate
            onBlur={() => onBlur("phoneNumber")}
            // SỬA LỖI 3: Hiển thị viền đỏ nếu có lỗi
            className={`mt-1 ${
              error ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />

          {/* SỬA LỖI 4: Hiển thị thông báo lỗi nếu có */}
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div>
          <Label htmlFor="note">Ghi chú (Tùy chọn)</Label>
          <Textarea
            id="note"
            placeholder="Yêu cầu đặc biệt về phòng/thiết bị..."
            value={note}
            onChange={(e) => onChange("note", e.target.value)}
            onBlur={() => onBlur("note")}
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};
