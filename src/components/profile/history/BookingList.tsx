// src/components/profile/history/BookingList.tsx
"use client";

import { BookingHistoryItem } from "@/domain/models/booking/BookingHistory";
import { BookingCard } from "./BookingCard";
import { Info } from "lucide-react";

interface BookingListProps {
  bookings: BookingHistoryItem[];
  onViewDetails: (bookingId: string) => void;
}

/**
 * Component chịu trách nhiệm render danh sách các BookingCard
 * hoặc hiển thị thông báo nếu danh sách rỗng.
 */
export function BookingList({ bookings, onViewDetails }: BookingListProps) {
  // Trường hợp 1: Đang tải (bookings là undefined)
  // (Chúng ta sẽ xử lý loading ở trang page.tsx,
  // nhưng an toàn là kiểm tra ở đây)
  if (!bookings) {
    return null; // Hoặc một skeleton loader
  }

  // Trường hợp 2: Không có booking nào
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center h-[300px] bg-gray-50">
        <Info className="h-10 w-10 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">
          Không tìm thấy đơn hàng
        </h3>
        <p className="text-gray-500 mt-1">
          Bạn không có đơn hàng nào trong trạng thái này.
        </p>
      </div>
    );
  }

  // Trường hợp 3: Có booking
  return (
    <div className="grid grid-cols-1 gap-6">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
