// src/components/booking/RoomTimeSlotForm.tsx (PHIÊN BẢN HOÀN CHỈNH - SỬA THEO DURATION)

import React from "react";
// Thêm icon Hourglass
import { Calendar, Box, Hourglass } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Thêm CardDescription
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Import thêm Select
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Service } from "@/domain/models/booking/Service"; // Đảm bảo đường dẫn đúng

// --- Interface Props cho Item (Đã thay đổi) ---
interface RoomTimeSlotItemProps {
  index: number;
  allServices: Service[];
  selectedServiceIds: Set<string>;
  startTimeValue: string;
  durationValue: number | null; // Dùng duration
  onStartTimeChange: (index: number, value: string) => void;
  onDurationChange: (index: number, hours: number | null) => void; // Handler mới
  onServiceChange: (
    index: number,
    serviceId: string,
    isChecked: boolean
  ) => void;
  basePrice: number | null;
  // isPriceLoading?: boolean; // Optional loading state
}

// Component con cho từng phòng - dùng React.memo để tối ưu
const RoomTimeSlotItem: React.FC<RoomTimeSlotItemProps> = React.memo(
  ({
    index,
    allServices,
    selectedServiceIds,
    startTimeValue,
    durationValue,
    onStartTimeChange,
    onDurationChange,
    onServiceChange,
    basePrice,
    // isPriceLoading, // Optional
  }) => {
    // Các lựa chọn thời lượng (có thể tùy chỉnh)
    const durationOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8];

    // Hàm format giá tiền an toàn
    const formatPrice = (price: number | null | undefined): string => {
      return (price ?? 0).toLocaleString("vi-VN");
    };

    return (
      <div className="border border-gray-200 p-4 sm:p-6 rounded-xl space-y-4 bg-white shadow-sm">
        {/* Header phòng */}
        <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-lg sm:text-xl text-blue-700">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Phòng #{index + 1} - Thời gian thuê
          </span>
          {/* Hiển thị giá base (có kiểm tra null) */}
          {/* {isPriceLoading ? (
                    <span className="text-base sm:text-lg font-semibold text-gray-500">Đang tính...</span>
                ) : basePrice !== null ? ( */}
          {basePrice !== null ? (
            <span className="text-base sm:text-lg font-semibold text-green-600 whitespace-nowrap">
              {formatPrice(basePrice)} VND
            </span>
          ) : null}
        </div>

        {/* Chọn Thời gian bắt đầu và Thời lượng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div className="space-y-1">
            <Label
              htmlFor={`start-${index}`}
              className="flex items-center gap-1 text-sm font-medium text-gray-700"
            >
              <Calendar className="w-4 h-4" /> Bắt đầu{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`start-${index}`}
              type="datetime-local"
              className="mt-1 w-full"
              step="60" // Ẩn giây
              value={startTimeValue}
              // Dùng onChange để phản hồi nhanh hơn, cập nhật state cha
              onChange={(e) => onStartTimeChange(index, e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor={`duration-${index}`}
              className="flex items-center gap-1 text-sm font-medium text-gray-700"
            >
              <Hourglass className="w-4 h-4" /> Thời lượng{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Select
              // Chuyển giá trị number | null thành string hoặc ""
              value={durationValue !== null ? String(durationValue) : ""}
              // Chuyển value (string) về number hoặc null khi gọi callback
              onValueChange={(value) =>
                onDurationChange(index, value ? Number(value) : null)
              }
            >
              <SelectTrigger id={`duration-${index}`} className="mt-1 w-full">
                <SelectValue placeholder="Chọn số giờ..." />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((hours) => (
                  <SelectItem key={hours} value={String(hours)}>
                    {hours} giờ
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chọn Dịch vụ */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <Label className="font-semibold text-gray-700 flex items-center gap-1">
            <Box className="w-4 h-4" /> Dịch vụ kèm theo (Tùy chọn)
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-2">
            {/* Kiểm tra an toàn trước khi map */}
            {allServices && allServices.length > 0 ? (
              allServices.map(
                (service) =>
                  // Đảm bảo service hợp lệ và AVAILABLE
                  service &&
                  service.status === "AVAILABLE" && (
                    <div
                      key={service.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`service-${index}-${service.id}`}
                        className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                        onChange={(e) =>
                          onServiceChange(index, service.id, e.target.checked)
                        }
                        checked={selectedServiceIds.has(service.id)}
                      />
                      <Label
                        htmlFor={`service-${index}-${service.id}`}
                        className="font-normal text-sm text-gray-700 cursor-pointer"
                      >
                        {/* Sử dụng 'price' theo API Swagger, đã sửa ở page.tsx */}
                        {service.serviceName} ({formatPrice(service.serviceFee)}{" "}
                        VND)
                      </Label>
                    </div>
                  )
              )
            ) : (
              <p className="text-sm text-gray-500 italic col-span-full">
                Không có dịch vụ kèm theo nào.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
RoomTimeSlotItem.displayName = "RoomTimeSlotItem"; // Tên cho React DevTools

// --- Interface Props của Form Chính (Đã thay đổi) ---
interface RoomSlotStateFromPage {
  startTime: string;
  durationHours: number | null; // Sử dụng duration
  serviceIds: Set<string>;
  basePrice: number | null;
  // isPriceLoading?: boolean; // Optional
}

interface RoomTimeSlotFormProps {
  numberOfRooms: number;
  allServices: Service[];
  roomSlots: RoomSlotStateFromPage[]; // Sử dụng interface mới
  // Handlers mới
  onStartTimeChange: (index: number, value: string) => void;
  onDurationChange: (index: number, hours: number | null) => void;
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
  // Nhận handlers mới
  onStartTimeChange,
  onDurationChange,
  onServiceChange,
}) => {
  // Tạo mảng chỉ số để lặp render, tối ưu hơn tạo mảng trống
  const roomIndices = React.useMemo(
    () => Array.from({ length: numberOfRooms }, (_, i) => i),
    [numberOfRooms]
  );

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          2. Chi Tiết Thời Gian & Dịch Vụ
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 pt-1">
          Bạn đang cấu hình cho {numberOfRooms} phòng thuê.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Lặp qua mảng chỉ số */}
        {roomIndices.map((index) => (
          <RoomTimeSlotItem
            key={index}
            index={index}
            allServices={allServices}
            // Truyền props và handlers mới xuống Item
            startTimeValue={roomSlots[index]?.startTime || ""}
            durationValue={roomSlots[index]?.durationHours ?? null}
            onStartTimeChange={onStartTimeChange}
            onDurationChange={onDurationChange}
            onServiceChange={onServiceChange}
            selectedServiceIds={roomSlots[index]?.serviceIds || new Set()}
            basePrice={roomSlots[index]?.basePrice ?? null}
            // isPriceLoading={roomSlots[index]?.isPriceLoading ?? false} // Optional
          />
        ))}
      </CardContent>
    </Card>
  );
};
