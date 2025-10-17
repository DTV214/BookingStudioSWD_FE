// src/components/common/booking/ContactInfoForm.tsx (Phiên bản đã đơn giản hóa)

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactInfoFormProps {}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = () => {
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
            defaultValue="0909989876" // Mock theo API request
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="note">Ghi chú (Tùy chọn)</Label>
          <Textarea
            id="note"
            placeholder="Yêu cầu đặc biệt về phòng/thiết bị..."
            defaultValue="No" // Mock theo API request
            className="mt-1"
          />
        </div>
      </CardContent>
    </Card>
  );
};
