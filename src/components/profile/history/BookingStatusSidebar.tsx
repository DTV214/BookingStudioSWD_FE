// src/components/profile/history/BookingStatusSidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Import hàm 'cn' từ Shadcn (giả sử bạn có)

/**
 * Định nghĩa kiểu dữ liệu cho mỗi mục trạng thái
 */
export interface StatusItem {
  key: string;
  label: string;
}

interface BookingStatusSidebarProps {
  statusList: StatusItem[]; // Danh sách các trạng thái (bao gồm "Tất cả")
  currentStatus: string; // Trạng thái hiện tại đang được chọn
  onStatusChange: (statusKey: string) => void; // Hàm callback khi bấm
}

export function BookingStatusSidebar({
  statusList,
  currentStatus,
  onStatusChange,
}: BookingStatusSidebarProps) {
  return (
    // Sử dụng Card của Shadcn để tạo khung
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3 px-2">Trạng thái Đơn hàng</h3>
      <div className="flex flex-col space-y-1">
        {statusList.map((status) => (
          <Button
            key={status.key}
            // Dùng 'cn' để gán class động
            className={cn(
              "w-full justify-start text-left", // Căn lề trái
              currentStatus === status.key
                ? "font-semibold" // In đậm nếu được chọn
                : "text-muted-foreground" // Màu xám nếu không
            )}
            // Dùng 'secondary' cho nút được chọn, 'ghost' cho nút thường
            variant={currentStatus === status.key ? "secondary" : "ghost"}
            onClick={() => onStatusChange(status.key)}
          >
            {status.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
