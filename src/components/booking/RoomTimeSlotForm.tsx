// src/components/booking/RoomTimeSlotForm.tsx (PHIÊN BẢN SỬA ĐỔI)

import React, { useMemo, useEffect } from "react";
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
}

// Component con cho từng phòng
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
  }) => {
    // --- SỬA ĐỔI 2: TẠO THỜI LƯỢNG ĐỘNG ---
    const dynamicDurationOptions = useMemo(() => {
      if (!startTimeValue) return [];

      try {
        const startDate = new Date(startTimeValue);
        if (isNaN(startDate.getTime())) return [];

        const startHour = startDate.getHours();
        const maxDuration = 24 - startHour; // Tối đa 24 giờ trong ngày

        if (maxDuration <= 0) return [];

        // SỬA LỖI: Chỉ lặp qua các số nguyên (bỏ 0.5)
        const options: number[] = [];
        for (let h = 1; h <= maxDuration; h++) {
          // Thay vì h += 0.5
          options.push(h);
        }
        return options;
      } catch (error) {
        console.error("Lỗi khi tính toán thời lượng:", error);
        return [];
      }
    }, [startTimeValue]); // Chỉ tính lại khi startTimeValue thay đổi

    // --- SỬA ĐỔI 3: TỰ RESET THỜI LƯỢNG NẾU KHÔNG HỢP LỆ ---
    // (Ví dụ: user chọn 10:00, chọn 8 giờ. Sau đó đổi thành 20:00.
    // Lựa chọn 8 giờ không còn hợp lệ -> reset về null)
    useEffect(() => {
      if (durationValue && !dynamicDurationOptions.includes(durationValue)) {
        // Gọi callback để reset state ở component cha
        onDurationChange(index, null);
      }
      // Thêm 'index' và 'onDurationChange' vào dependencies
    }, [durationValue, dynamicDurationOptions, index, onDurationChange]);

    // Hàm format giá tiền an toàn
    const formatPrice = (price: number | null | undefined): string => {
      return (price ?? 0).toLocaleString("vi-VN");
    };

    // --- SỬA ĐỔI 1: TẠO HANDLER ĐỂ RESET PHÚT ---
    const handleStartTimeChangeAndResetMinutes = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      if (!value) {
        onStartTimeChange(index, ""); // Cho phép xóa
        return;
      }

      try {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          // Nếu ngày giờ không hợp lệ (đang gõ dở), cứ gửi giá trị gốc
          onStartTimeChange(index, value);
          return;
        }

        // --- Logic chính: Set phút, giây, ms về 0 ---
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        // Format lại thành chuỗi YYYY-MM-DDTHH:00
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = date.getHours().toString().padStart(2, "0");
        const formattedValue = `${year}-${month}-${day}T${hours}:00`;

        // Gửi giá trị đã làm tròn về component cha
        onStartTimeChange(index, formattedValue);
      } catch (error) {
        console.error("Lỗi parse ngày giờ:", error);
        onStartTimeChange(index, value); // Gửi giá trị gốc nếu có lỗi
      }
    };

    return (
      <div className="border border-gray-200 p-4 sm:p-6 rounded-xl space-y-4 bg-white shadow-sm">
        {/* Header phòng */}
        <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-lg sm:text-xl text-blue-700">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Phòng #{index + 1} - Thời gian thuê
          </span>
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
              <Calendar className="w-4 h-4" /> Bắt đầu (Chỉ chọn giờ){" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`start-${index}`}
              type="datetime-local"
              className="mt-1 w-full"
              // step="3600" // (HTML chuẩn, nhưng ít trình duyệt hỗ trợ UI tốt)
              step="60" // Vẫn giữ step 60 để ẩn giây
              value={startTimeValue}
              // SỬ DỤNG HANDLER MỚI ĐỂ RESET PHÚT
              onChange={handleStartTimeChangeAndResetMinutes}
              // onBlur={(e) => handleStartTimeChangeAndResetMinutes(e)} // Dùng onBlur nếu muốn
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
              value={durationValue !== null ? String(durationValue) : ""}
              onValueChange={(value) =>
                onDurationChange(index, value ? Number(value) : null)
              }
              // Vô hiệu hóa nếu chưa chọn giờ bắt đầu
              disabled={dynamicDurationOptions.length === 0}
            >
              <SelectTrigger id={`duration-${index}`} className="mt-1 w-full">
                <SelectValue
                  placeholder={
                    startTimeValue ? "Chọn số giờ..." : "Chọn giờ bắt đầu trước"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {/* SỬ DỤNG DANH SÁCH ĐỘNG */}
                {dynamicDurationOptions.map((hours) => (
                  <SelectItem key={hours} value={String(hours)}>
                    {hours} giờ
                  </SelectItem>
                ))}
                {/* Hiển thị nếu không có lựa chọn */}
                {dynamicDurationOptions.length === 0 && startTimeValue && (
                  <SelectItem value="disabled" disabled>
                    Không còn giờ nào trong ngày
                  </SelectItem>
                )}
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
            {allServices && allServices.length > 0 ? (
              allServices.map(
                (service) =>
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
                        {/* SỬA LỖI: Đổi service.serviceFee thành service.price */}
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
RoomTimeSlotItem.displayName = "RoomTimeSlotItem";

// --- Interface Props của Form Chính (Không đổi) ---
interface RoomSlotStateFromPage {
  startTime: string;
  durationHours: number | null;
  serviceIds: Set<string>;
  basePrice: number | null;
}

interface RoomTimeSlotFormProps {
  numberOfRooms: number;
  allServices: Service[];
  roomSlots: RoomSlotStateFromPage[];
  onStartTimeChange: (index: number, value: string) => void;
  onDurationChange: (index: number, hours: number | null) => void;
  onServiceChange: (
    index: number,
    serviceId: string,
    isChecked: boolean
  ) => void;
}

// --- Component Form Chính (Không đổi) ---
export const RoomTimeSlotForm: React.FC<RoomTimeSlotFormProps> = ({
  numberOfRooms,
  allServices,
  roomSlots,
  onStartTimeChange,
  onDurationChange,
  onServiceChange,
}) => {
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
        {roomIndices.map((index) => (
          <RoomTimeSlotItem
            key={index}
            index={index}
            allServices={allServices}
            // Truyền props và handlers (không đổi)
            startTimeValue={roomSlots[index]?.startTime || ""}
            durationValue={roomSlots[index]?.durationHours ?? null}
            onStartTimeChange={onStartTimeChange}
            onDurationChange={onDurationChange}
            onServiceChange={onServiceChange}
            selectedServiceIds={roomSlots[index]?.serviceIds || new Set()}
            basePrice={roomSlots[index]?.basePrice ?? null}
          />
        ))}
      </CardContent>
    </Card>
  );
};
