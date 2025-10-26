"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  StudioAssignDetail,
  ServiceAssign,
  PaymentDetail, // 1. THÊM IMPORT PAYMENT
} from "@/domain/models/booking/BookingHistory";
import {
  Loader2,
  AlertCircle,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
  Camera,
  Info,
  CreditCard, // 2. THÊM ICON MỚI
  type LucideIcon,
} from "lucide-react";
import { getBookingDetailsUseCase } from "@/domain/usecases/history-booking/getBookingDetails";
import { getServiceAssignsUseCase } from "@/domain/usecases/history-booking/getServiceAssigns";
// 3. THÊM IMPORT USE CASE MỚI
import { getPaymentsForBookingUseCase } from "@/domain/usecases/history-booking/getPaymentsForBooking";
// 4. THÊM IMPORT BẢNG MỚI
import { PaymentHistoryTable } from "./PaymentHistoryTable";

// --- Helper Types & Components ---

interface BookingDetailDialogProps {
  bookingId: string | null;
  open: boolean;
  onClose: () => void;
}

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}

// --- Main Component ---

export function BookingDetailDialog({
  bookingId,
  open,
  onClose,
}: BookingDetailDialogProps) {
  const [details, setDetails] = useState<StudioAssignDetail[]>([]);
  const [services, setServices] = useState<Record<string, ServiceAssign[]>>({});
  const [payments, setPayments] = useState<PaymentDetail[]>([]); // 5. THÊM STATE MỚI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 6. CẬP NHẬT useEffect ĐỂ GỌI 3 API
  useEffect(() => {
    if (open && bookingId) {
      const fetchAllDetails = async () => {
        setLoading(true);
        setError(null);
        setDetails([]);
        setServices({});
        setPayments([]); // Reset payment state

        try {
          // Chạy song song API lấy Slot và API lấy Payment
          const [slotData, paymentData] = await Promise.all([
            getBookingDetailsUseCase(bookingId),
            getPaymentsForBookingUseCase(bookingId), // Gọi API payment
          ]);

          setDetails(slotData);
          setPayments(paymentData); // Set state payment

          // Sau khi có slotData, gọi API lấy services
          if (slotData?.length > 0) {
            const servicePromises = slotData.map((slot) =>
              getServiceAssignsUseCase(slot.id)
            );
            const serviceResults = await Promise.all(servicePromises);

            const servicesMap: Record<string, ServiceAssign[]> = {};
            serviceResults.forEach((serviceArray, index) => {
              const slotId = slotData[index].id;
              servicesMap[slotId] = serviceArray;
            });
            setServices(servicesMap);
          }
        } catch (err) {
          setError("Không thể tải chi tiết đơn hàng. Vui lòng thử lại.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchAllDetails();
    }
  }, [open, bookingId]);
  // --- KẾT THÚC CẬP NHẬT useEffect ---

  // 7. CẬP NHẬT renderContent ĐỂ HIỂN THỊ BẢNG
  const renderContent = () => {
    if (loading) return <DialogSkeleton />;

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-56 text-center">
          <AlertCircle className="h-12 w-12 mb-4 text-red-500" />
          <h3 className="text-lg font-semibold text-slate-800">
            Đã xảy ra lỗi
          </h3>
          <p className="text-slate-500 mt-1">{error}</p>
        </div>
      );
    }

    if (details.length === 0 && payments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-56 text-center">
          <Info className="h-12 w-12 mb-4 text-slate-400" />
          <h3 className="text-lg font-semibold text-slate-800">
            Không có dữ liệu
          </h3>
          <p className="text-slate-500 mt-1">
            Không tìm thấy thông tin chi tiết cho đơn hàng này.
          </p>
        </div>
      );
    }

    // Chia làm 2 phần: Slot và Payment
    return (
      <div className="space-y-8 max-h-[65vh] overflow-y-auto p-1 pr-4">
        {/* Phần 1: Chi tiết Slot */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <Camera className="h-5 w-5 text-blue-600" />
            Chi tiết Phòng & Dịch vụ
          </h3>
          {details.length > 0 ? (
            details.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                services={services[slot.id] || []}
              />
            ))
          ) : (
            <p className="text-slate-500 italic text-sm">
              Không có thông tin phòng.
            </p>
          )}
        </div>

        {/* Phần 2: Lịch sử Thanh toán */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            Lịch sử Thanh toán
          </h3>
          <PaymentHistoryTable payments={payments} />
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-slate-50">
        <DialogHeader className="pr-6">
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-slate-800">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Camera className="h-6 w-6 text-blue-600" />
            </div>
            Chi tiết Đơn hàng
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Thông tin chi tiết về các phòng, dịch vụ và lịch sử thanh toán của
            bạn.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">{renderContent()}</div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// --- Sub-components (SlotCard, DateTimeDisplay, InfoRow) giữ nguyên ---

const SlotCard = ({
  slot,
  services,
}: {
  slot: StudioAssignDetail;
  services: ServiceAssign[];
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-900">
            {slot.studioName}
          </h3>
          <Badge variant="outline" className="capitalize">
            {slot.status.toLowerCase().replace("_", " ")}
          </Badge>
        </div>
      </div>
      <div className="bg-slate-50/70 p-5 border-t border-b border-slate-200">
        <DateTimeDisplay startTime={slot.startTime} endTime={slot.endTime} />
      </div>
      <div className="p-5 space-y-4">
        <InfoRow icon={MapPin} label="Địa điểm">
          <p className="text-slate-700">{slot.locationName}</p>
        </InfoRow>
        <InfoRow icon={Sparkles} label="Dịch vụ">
          {services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Badge key={s.id} variant="secondary">
                  {s.serviceName}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 italic">Không có dịch vụ đi kèm</p>
          )}
        </InfoRow>
      </div>
    </div>
  );
};

const DateTimeDisplay = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex items-center gap-4 text-center">
      <div className="flex-1 flex items-center justify-center gap-3 bg-white p-3 rounded-lg border">
        <CalendarDays className="h-6 w-6 text-blue-500" />
        <div>
          <p className="text-sm text-slate-500">Ngày</p>
          <p className="font-semibold text-slate-800 capitalize">
            {dateFormatter.format(start)}
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-3 bg-white p-3 rounded-lg border">
        <Clock className="h-6 w-6 text-green-500" />
        <div>
          <p className="text-sm text-slate-500">Thời gian</p>
          <p className="font-mono font-bold text-lg text-slate-800 tracking-wider">
            {timeFormatter.format(start)} - {timeFormatter.format(end)}
          </p>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon: Icon, label, children }: InfoRowProps) => (
  <div className="flex items-start gap-4">
    <Icon className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
    <div className="w-full">
      <p className="font-semibold text-slate-600">{label}</p>
      <div className="text-slate-800 mt-1">{children}</div>
    </div>
  </div>
);

// 8. CẬP NHẬT SKELETON
const DialogSkeleton = () => (
  <div className="space-y-8 p-1 pr-4">
    {/* Skeleton cho Slot */}
    <div className="space-y-4">
      <Skeleton className="h-7 w-1/3" />
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-5">
          <Skeleton className="h-7 w-3/5" />
        </div>
        <div className="bg-slate-50/70 p-5 border-t border-b border-slate-200">
          <div className="flex gap-4">
            <Skeleton className="h-16 w-1/2 rounded-lg" />
            <Skeleton className="h-16 w-1/2 rounded-lg" />
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Skeleton cho Bảng Payment */}
    <div className="space-y-4">
      <Skeleton className="h-7 w-1/3" />
      <Skeleton className="h-32 w-full rounded-lg" />
    </div>
  </div>
);
