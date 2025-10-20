import { PriceRule } from "@/domain/models/priceTable/priceRule";


/**
 * HÀM MỚI: Dịch mảng WDAY sang tiếng Việt
 */
const DAY_TRANSLATION: { [key: string]: string } = {
  MONDAY: "Thứ 2",
  TUESDAY: "Thứ 3",
  WEDNESDAY: "Thứ 4",
  THURSDAY: "Thứ 5",
  FRIDAY: "Thứ 6",
  SATURDAY: "Thứ 7",
  SUNDAY: "Chủ Nhật",
};

/**
 * HÀM MỚI: Định dạng mảng ngày
 * Ví dụ: ["MONDAY", ..., "FRIDAY"] -> "Thứ 2 - Thứ 6"
 */
function formatDayArray(days: string[]): string {
  // Check các trường hợp phổ biến
  if (days.length === 5 && days[0] === "MONDAY" && days[4] === "FRIDAY") {
    return "Thứ 2 - Thứ 6";
  }
  if (days.length === 2 && days[0] === "SATURDAY" && days[1] === "SUNDAY") {
    return "Thứ 7 & Chủ Nhật";
  }

  // Logic dự phòng nếu là ngày lẻ
  return days.map((day) => DAY_TRANSLATION[day] || day).join(", ");
}

/**
 * Định dạng giờ, bỏ giây (HH:mm:ss -> HH:mm)
 */
function formatTime(time: string | null): string {
  if (!time) return "";
  return time.substring(0, 5); // "08:00:00" -> "08:00"
}

/**
 * Hàm chính dịch một PriceRule thành mô tả dễ hiểu
 * ĐÃ ĐƯỢC CẬP NHẬT (Bỏ logic bitmask)
 */
export function formatRuleDescription(rule: PriceRule): string {
  // Rule 3 & 4: Phân loại theo ngày cụ thể (date)
  if (rule.date) {
    const formattedDate = new Date(rule.date).toLocaleDateString("vi-VN");

    // Rule 4: Ngày đặc biệt (cả ngày, không có giờ)
    if (!rule.startTime && !rule.endTime) {
      return `Ngày đặc biệt: ${formattedDate} (Cả ngày)`;
    }

    // Rule 3: Khung giờ trong ngày đặc biệt
    if (rule.startTime && rule.endTime) {
      return `Ngày ${formattedDate} (từ ${formatTime(
        rule.startTime
      )} - ${formatTime(rule.endTime)})`;
    }
  }

  // --- LOGIC CẬP NHẬT CHO DAYFILTER ---
  // Rule 1 & 2: Phân loại theo thứ (dayFilter)
  if (rule.dayFilter && rule.dayFilter.length > 0) {
    const days = formatDayArray(rule.dayFilter); // <-- Dùng hàm mới

    // Rule 2: Cả ngày theo thứ (không có giờ)
    if (!rule.startTime && !rule.endTime) {
      return `${days} (Cả ngày)`;
    }

    // Rule 1: Khung giờ theo thứ
    if (rule.startTime && !rule.endTime) {
      return `${days} (từ ${formatTime(rule.startTime)})`;
    }

    if (rule.startTime && rule.endTime) {
      return `${days} (từ ${formatTime(rule.startTime)} - ${formatTime(
        rule.endTime
      )})`;
    }
  }
  // --- HẾT LOGIC CẬP NHẬT ---

  return "Quy tắc không xác định";
}

/**
 * Định dạng tiền tệ
 * CẬP NHẬT: Nhận thêm 'unit'
 */
export function formatCurrency(amount: number, unit: string): string {
  // Định dạng số tiền, bỏ ",00 đ"
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);

  // Dịch unit
  const perUnit = unit.toUpperCase() === "HOUR" ? "giờ" : unit.toLowerCase();

  return `${formattedAmount} / ${perUnit}`;
}
