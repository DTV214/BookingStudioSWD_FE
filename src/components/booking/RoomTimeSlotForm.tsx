// src/components/common/booking/TimeSlotSelector.tsx (Đã đổi tên thành RoomTimeSlotForm trong logic)

import React from "react";
import { Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock Data cho Dịch vụ
const MOCK_SERVICES = [
  { id: "1", name: "Máy ảnh DSLR chuyên nghiệp", price: 100000 },
  { id: "2", name: "Bộ đèn LED Godox SL-60W", price: 75000 },
  { id: "3", name: "Phụ kiện Phông nền", price: 50000 },
  { id: "4", name: "Trang phục/Costumes", price: 150000 },
];

// Mockup cho một slot thời gian/phòng
// Index lúc này đại diện cho số phòng (Studio Assign Request)
const RoomTimeSlotItem = ({ index }: { index: number }) => (
  <div className="border border-gray-200 p-6 rounded-xl space-y-4 bg-white shadow-sm">
    <div className="flex items-center gap-2 font-bold text-xl text-blue-700">
      <Calendar className="w-5 h-5" />
      <span>Phòng #{index + 1} - Khoảng thời gian thuê</span>
    </div>

    {/* Chọn Thời gian */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`start-${index}`}>
          Bắt đầu (Giờ:Phút - Ngày/Tháng/Năm)
        </Label>
        {/* Giá trị mặc định mô phỏng API request: 16/11/2025 04:30 */}
        <Input
          id={`start-${index}`}
          type="datetime-local"
          defaultValue="2025-11-16T04:30"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor={`end-${index}`}>
          Kết thúc (Giờ:Phút - Ngày/Tháng/Năm)
        </Label>
        <Input
          id={`end-${index}`}
          type="datetime-local"
          defaultValue="2025-11-16T06:30"
          className="mt-1"
        />
      </div>
    </div>

    {/* Chọn Dịch vụ */}
    <div className="space-y-2 pt-2 border-t border-gray-100">
      <Label className="font-semibold text-gray-700">
        Dịch vụ kèm theo (Tùy chọn)
      </Label>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {MOCK_SERVICES.map((service) => (
          <div key={service.id} className="flex items-center space-x-2">
            {/* Mocking 3 dịch vụ đầu tiên được chọn theo API request mẫu */}
            <input
              type="checkbox"
              id={`service-${index}-${service.id}`}
              defaultChecked={
                service.id === "1" || service.id === "2" || service.id === "3"
              }
              className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
            />
            <Label
              htmlFor={`service-${index}-${service.id}`}
              className="font-normal text-sm text-gray-700"
            >
              {service.name} ({service.price.toLocaleString("vi-VN")} VND)
            </Label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface RoomTimeSlotFormProps {
  // Số lượng phòng sẽ được truyền từ StudioLocationForm.tsx khi có state
  numberOfRooms: number;
}

// Đổi tên component trong file này cho rõ ràng hơn
export const RoomTimeSlotForm: React.FC<RoomTimeSlotFormProps> = ({
  numberOfRooms,
}) => {
  // Tạo một mảng dựa trên số lượng phòng đã chọn
  const rooms = Array.from({ length: numberOfRooms });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          2. Chi Tiết Thời Gian & Dịch Vụ
        </CardTitle>
        <p className="text-sm text-gray-500">
          Bạn đang cấu hình cho {numberOfRooms} phòng thuê.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {rooms.map((_, index) => (
          <RoomTimeSlotItem key={index} index={index} />
        ))}
      </CardContent>
    </Card>
  );
};
