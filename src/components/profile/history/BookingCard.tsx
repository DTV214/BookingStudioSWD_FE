// src/components/profile/history/BookingCard.tsx
"use client";

import {
  BookingHistoryItem,
  BookingStatus,
} from "@/domain/models/booking/BookingHistory";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, Check, Clock, Loader, Package, Tag, X } from "lucide-react";

interface BookingCardProps {
  booking: BookingHistoryItem;
  onViewDetails: (bookingId: string) => void; // Callback khi bấm xem chi tiết
  onCancelBooking: (booking: BookingHistoryItem) => void;
}

/**
 * Component hiển thị thông tin tóm tắt của một đơn booking
 */
export function BookingCard({
  booking,
  onViewDetails,
  onCancelBooking,
}: BookingCardProps) {
  // --- Helper Functions ---
  const canCancel = booking.status === "IN_PROGRESS";
  const displayDate = booking.bookingDate;
  // Format tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Format ngày tháng
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Lấy thông tin (màu sắc, icon, text) dựa trên Status
  const getStatusInfo = (status: BookingStatus) => {
    switch (status) {
      case "IN_PROGRESS":
        return {
          label: "Đang tiến hành",
          className: "bg-blue-100 text-blue-800",
          icon: <Loader className="h-4 w-4" />,
        };
      case "COMPLETED":
        return {
          label: "Hoàn thành",
          className: "bg-green-100 text-green-800",
          icon: <Check className="h-4 w-4" />,
        };
      case "CANCELLED":
        return {
          label: "Đã hủy",
          className: "bg-red-100 text-red-800",
          icon: <X className="h-4 w-4" />,
        };
      case "AWAITING_REFUND":
        return {
          label: "Chờ hoàn tiền",
          className: "bg-yellow-100 text-yellow-800",
          icon: <Clock className="h-4 w-4" />,
        };
      default:
        return {
          label: status,
          className: "bg-gray-100 text-gray-800",
          icon: <Package className="h-4 w-4" />,
        };
    }
  };

  const statusInfo = getStatusInfo(booking.status);

  return (
    <Card className="shadow-md transition-shadow hover:shadow-lg rounded-xl overflow-hidden">
      {/* Header: Tên Studio Type và Trạng thái */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          {booking.studioTypeName || "Không có tên studio"}
        </CardTitle>
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full",
            statusInfo.className
          )}
        >
          {statusInfo.icon}
          <span className="ml-1.5">{statusInfo.label}</span>
        </Badge>
      </CardHeader>

      {/* Content: Thông tin chi tiết */}
      <CardContent className="space-y-4 pt-4">
        {/* Ngày tạo */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-2 h-4 w-4" />
          <span>
            Ngày tạo: <strong>{formatDate(booking.bookingDate)}</strong>
          </span>
        </div>

        {/* Loại booking */}
        <div className="flex items-center text-sm text-gray-600">
          <Package className="mr-2 h-4 w-4" />
          <span>
            Loại: <strong>{booking.bookingType}</strong>
          </span>
        </div>

        {/* Tổng tiền */}
        <div className="flex items-center text-lg font-semibold text-gray-900">
          <Tag className="mr-2 h-5 w-5 text-blue-600" />
          <span>Tổng cộng: {formatCurrency(booking.total)}</span>
        </div>
      </CardContent>

      {/* Footer: Nút bấm */}
      <CardFooter className="bg-gray-50 p-4 flex justify-end gap-3">
        {/* 4. THÊM NÚT HỦY VÀ HIỂN THỊ CÓ ĐIỀU KIỆN */}
        {canCancel && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onCancelBooking(booking)}
          >
            <X className="mr-1.5 h-4 w-4" />
            Hủy lịch
          </Button>
        )}
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          size="sm" // Thêm size để đồng bộ
          onClick={() => onViewDetails(booking.id)}
        >
          Xem chi tiết
        </Button>
      </CardFooter>
    </Card>
  );
}
