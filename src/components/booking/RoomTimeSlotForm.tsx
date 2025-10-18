// src/components/booking/RoomTimeSlotForm.tsx (ĐÃ SỬA LỖI)

import React from "react";
import { Clock, Calendar, Box } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Service } from "@/domain/models/booking/Service";

interface RoomTimeSlotItemProps {
  index: number;
  allServices: Service[];
  selectedServiceIds: Set<string>;
  onTimeChange: (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => void;
  onServiceChange: (
    index: number,
    serviceId: string,
    isChecked: boolean
  ) => void;
  basePrice: number | null;
}

// Component con cho từng phòng
const RoomTimeSlotItem: React.FC<RoomTimeSlotItemProps> = ({
  index,
  allServices,
  selectedServiceIds,
  onTimeChange,
  onServiceChange,
  basePrice,
}) => (
  <div className="border border-gray-200 p-6 rounded-xl space-y-4 bg-white shadow-sm">
    <div className="flex items-center justify-between font-bold text-xl text-blue-700">
      <span className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Phòng #{index + 1} - Khoảng thời gian thuê
      </span>
      {/* * SỬA LỖI NHỎ: Thêm "?." để phòng trường hợp basePrice là 0
       * (mặc dù '!= null' đã xử lý null/undefined)
       */}
      {basePrice !== null && (
        <span className="text-lg font-semibold text-green-600">
          {basePrice?.toLocaleString("vi-VN")} VND
        </span>
      )}
    </div>

      {/* Chọn Thời gian */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`start-${index}`}>
            Bắt đầu (Giờ:Phút - Ngày/Tháng/Năm)
          </Label>
          <Input
            id={`start-${index}`}
            type="datetime-local"
            className="mt-1"
            step="60"
            onBlur={(e) => onTimeChange(index, "startTime", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor={`end-${index}`}>
            Kết thúc (Giờ:Phút - Ngày/Tháng/Năm)
          </Label>
          <Input
            id={`end-${index}`}
            type="datetime-local"
            className="mt-1"
            onBlur={(e) => onTimeChange(index, "endTime", e.target.value)}
          />
        </div>
      </div>

    {/* Chọn Dịch vụ */}
    <div className="space-y-2 pt-3 border-t border-gray-100">
      <Label className="font-semibold text-gray-700 flex items-center gap-1">
        <Box className="w-4 h-4" /> Dịch vụ kèm theo (Tùy chọn)
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 pt-2">
        {allServices?.map(
          (service) =>
            // Thêm kiểm tra 'service' để đảm bảo service không bị null
            service &&
            service.status === "AVAILABLE" && (
              <div key={service.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`service-${index}-${service.id}`}
                  className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                  onChange={(e) =>
                    onServiceChange(index, service.id, e.target.checked)
                  }
                  checked={selectedServiceIds.has(service.id)}
                />
                <Label
                  htmlFor={`service-${index}-${service.id}`}
                  className="font-normal text-sm text-gray-700 cursor-pointer"
                >
                  {/* * SỬA LỖI CHÍNH: Thêm "?." trước 'toLocaleString'
                   * để xử lý 'service.price' bị null hoặc undefined
                   */}
                  {service.serviceName} (
                  {service.serviceFee?.toLocaleString("vi-VN")} VND)
                </Label>
              </div>
            )
        )}
      </div>
    </div>
  </div>
);

// Định nghĩa lại kiểu dữ liệu mà page.tsx đang dùng
interface RoomSlotState {
  startTime: string;
  endTime: string;
  serviceIds: Set<string>;
  basePrice: number | null;
}

interface RoomTimeSlotFormProps {
  numberOfRooms: number;
  allServices: Service[];
  roomSlots: RoomSlotState[];

  // Callbacks
  onTimeChange: (
    index: number,
    field: "startTime" | "endTime",
    value: string
  ) => void;
  onServiceChange: (
    index: number,
    serviceId: string,
    isChecked: boolean
  ) => void;
}

export const RoomTimeSlotForm: React.FC<RoomTimeSlotFormProps> = ({
  numberOfRooms,
  allServices,
  roomSlots,
  onTimeChange,
  onServiceChange,
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
        {/* * Thêm "?." (Optional Chaining) cho 'rooms'
         * Mặc dù 'rooms' gần như luôn tồn tại, đây là cách code an toàn
         */}
        {rooms?.map((_, index) => (
          <RoomTimeSlotItem
            key={index}
            index={index}
            allServices={allServices}
            onTimeChange={onTimeChange}
            onServiceChange={onServiceChange}
            selectedServiceIds={roomSlots[index]?.serviceIds || new Set()}
            basePrice={roomSlots[index]?.basePrice ?? null}
          />
        ))}
      </CardContent>
    </Card>
  );
};
