"use client";

import { useEffect, useState, useMemo } from "react";
import { BookingHistoryItem } from "@/domain/models/booking/BookingHistory";
import { storage } from "@/infrastructure/utils/storage";
import {
  BookingStatusSidebar,
  StatusItem,
} from "@/components/profile/history/BookingStatusSidebar";
import { BookingList } from "@/components/profile/history/BookingList";
import { BookingDetailDialog } from "@/components/profile/history/BookingDetailDialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, AlertCircle, Inbox, ListOrdered } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getUserBookingsUseCase } from "@/domain/usecases/history-booking/getUserBookings";

// --- COMPONENT BANNER ---
const HistoryBanner = ({ count }: { count: number }) => (
  <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white shadow-lg relative overflow-hidden">
    <div className="absolute -bottom-8 -right-8 opacity-10">
      <ListOrdered size={120} />
    </div>
    <div className="relative z-10">
      <h1 className="text-3xl font-bold">Lịch sử Đơn hàng</h1>
      <p className="mt-2 text-slate-300">
        Bạn có tổng cộng <span className="font-bold text-white">{count}</span>{" "}
        đơn hàng đã được ghi nhận.
      </p>
    </div>
  </div>
);

// --- COMPONENT SKELETON ---
const HistoryPageSkeleton = () => (
  <div className="min-h-screen bg-slate-50">
    <main className="container mx-auto max-w-7xl p-4 md:p-8 space-y-8">
      <Skeleton className="h-36 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
        <div className="md:col-span-3 space-y-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    </main>
  </div>
);

const ALL_STATUS = "ALL";
const STATUS_LIST: StatusItem[] = [
  { key: ALL_STATUS, label: "Tất cả" },
  { key: "IN_PROGRESS", label: "Đang tiến hành" },
  { key: "COMPLETED", label: "Hoàn thành" },
  { key: "CANCELLED", label: "Đã hủy" },
  { key: "AWAITING_REFUND", label: "Chờ hoàn tiền" },
];

export default function BookingHistoryPage() {
  const router = useRouter();
  const [allBookings, setAllBookings] = useState<BookingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(ALL_STATUS);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Giảm thời gian tải giả để xem skeleton
    setTimeout(() => {
      const fetchBookings = async () => {
        if (!storage.getToken()) {
          setLoading(false);
          setError("Bạn cần đăng nhập để xem lịch sử.");
          return;
        }
        try {
          const bookings = await getUserBookingsUseCase();
          setAllBookings(bookings || []);
          setError(null);
        } catch (err) {
          console.error("Lỗi khi tải lịch sử booking:", err);
          setError("Đã xảy ra lỗi khi tải dữ liệu.");
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }, 500); // Giả lập thời gian tải
  }, []);

  const filteredBookings = useMemo(() => {
    if (selectedStatus === ALL_STATUS) return allBookings;
    return allBookings.filter((booking) => booking.status === selectedStatus);
  }, [allBookings, selectedStatus]);

  const handleViewDetails = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => setIsDialogOpen(false);

  if (loading) {
    return <HistoryPageSkeleton />;
  }

  if (error) {
    // Giao diện lỗi giữ nguyên
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-10 w-10 mb-4 text-red-500" />
        <h2 className="text-2xl font-semibold mb-2">{error}</h2>
        <Button onClick={() => router.push("/auth/oauth-login")}>
          Đăng nhập lại
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <main className="container mx-auto max-w-7xl p-4 md:p-8 space-y-8">
          <HistoryBanner count={allBookings.length} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="md:col-span-1 sticky top-8">
              <BookingStatusSidebar
                statusList={STATUS_LIST}
                currentStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
              />
            </div>
            <div className="md:col-span-3">
              <BookingList
                bookings={filteredBookings}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </main>
      </div>
      <BookingDetailDialog
        open={isDialogOpen}
        bookingId={selectedBookingId}
        onClose={handleCloseDialog}
      />
    </>
  );
}
