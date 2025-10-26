"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PaymentDetail } from "@/domain/models/booking/BookingHistory";
import {
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  Landmark,
  Receipt,
  LucideIcon,
} from "lucide-react";

// --- Helper Functions ---

// Format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// Format ngày
const formatDate = (dateString: string | null) => {
  if (!dateString) return "Chưa cập nhật";
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Format loại thanh toán
const formatPaymentType = (type: string) => {
  if (type === "FULL_PAYMENT") return "Thanh toán toàn bộ";
  if (type === "DEPOSIT") return "Thanh toán cọc";
  if (type === "REMAINING") return "Thanh toán phần còn lại";
  return type;
};

// --- Helper Components (Đã nâng cấp) ---

// Component Badge Trạng thái (với Icon)
const StatusBadge = ({ status }: { status: string }) => {
  let Icon: LucideIcon = Clock;
  let className = "bg-yellow-100 text-yellow-800 border-yellow-200";
  let text = "Đang chờ";

  if (status === "SUCCESS") {
    Icon = CheckCircle;
    className = "bg-green-100 text-green-800 border-green-200";
    text = "Thành công";
  } else if (status === "FAILED") {
    Icon = XCircle;
    className = "bg-red-100 text-red-800 border-red-200";
    text = "Thất bại";
  } else if (status !== "PENDING") {
    text = status; // Hiển thị trạng thái lạ nếu có
  }

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1.5 w-fit ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="font-medium">{text}</span>
    </Badge>
  );
};

// Component Phương thức Thanh toán (với Icon)
const MethodBadge = ({ method }: { method: string }) => {
  const isVNPay = method.toUpperCase().includes("VNPAY");
  const Icon = isVNPay ? CreditCard : Landmark;
  const text = isVNPay ? "VNPay" : "Tiền mặt"; // Giả định

  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <Icon
        className={`h-4 w-4 ${isVNPay ? "text-blue-600" : "text-emerald-600"}`}
      />
      <span className="capitalize">{text}</span>
    </div>
  );
};

// --- Main Component ---

interface PaymentHistoryTableProps {
  payments: PaymentDetail[];
}

export function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  // Giao diện "Rỗng" chuyên nghiệp hơn
  if (!payments || payments.length === 0) {
    return (
      <div className="text-center text-slate-500 p-8 border-2 border-dashed rounded-xl bg-white flex flex-col items-center justify-center">
        <Receipt className="h-12 w-12 text-slate-300 mb-4" />
        <h4 className="font-semibold text-slate-700">
          Chưa có lịch sử thanh toán
        </h4>
        <p className="text-sm text-slate-400 mt-1">
          Các giao dịch của bạn sẽ xuất hiện ở đây.
        </p>
      </div>
    );
  }

  // Giao diện Bảng (Đã nâng cấp)
  return (
    <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="py-3 px-4 text-sm font-medium text-slate-500">
              Ngày thanh toán
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-slate-500">
              Loại
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-slate-500">
              Phương thức
            </TableHead>
            <TableHead className="py-3 px-4 text-sm font-medium text-slate-500">
              Trạng thái
            </TableHead>
            <TableHead className="py-3 px-4 text-right text-sm font-medium text-slate-500">
              Số tiền
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow
              key={payment.id}
              className="hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <TableCell className="py-4 px-4 text-sm text-slate-600 font-medium">
                {formatDate(payment.paymentDate)}
              </TableCell>
              <TableCell className="py-4 px-4 text-sm text-slate-700">
                {formatPaymentType(payment.paymentType)}
              </TableCell>
              <TableCell className="py-4 px-4 text-sm text-slate-700">
                <MethodBadge method={payment.paymentMethod} />
              </TableCell>
              <TableCell className="py-4 px-4 text-sm text-slate-700">
                <StatusBadge status={payment.status} />
              </TableCell>
              <TableCell className="py-4 px-4 text-right text-sm font-semibold text-slate-900 tracking-wide">
                {formatCurrency(payment.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
