// src/app/booking/page.tsx (PHIÊN BẢN HOÀN THIỆN)

"use client";

import React, { useState, useEffect, useCallback, useRef } from "react"; // Thêm useCallback, useRef
import { StudioLocationForm } from "@/components/booking/StudioLocationForm";
import { RoomTimeSlotForm } from "@/components/booking/RoomTimeSlotForm";
import { ContactInfoForm } from "@/components/booking/ContactInfoForm";
import {
  PriceSummary,
  PriceBreakdownItem,
} from "@/components/booking/PriceSummary";

// --- MODELS ---
import { StudioType } from "@/domain/models/studio-type/studioType";
import { Location } from "@/domain/models/studio-type/location";
import { Service } from "@/domain/models/booking/Service";
import {
  BookingRequest,
  BookingResponse,
  StudioAssignRequest,
} from "@/domain/models/booking/Booking";

// --- USE CASES ---
import { getBookingPageDataUseCase } from "@/domain/usecases/booking/getBookingPageData";
import { getLocationsUseCase } from "@/domain/usecases/booking/getLocations";
import { calculateSlotPriceUseCase } from "@/domain/usecases/booking/calculateSlotPrice";
import { createBookingUseCase } from "@/domain/usecases/booking/createBooking";
// Optional: Import a toast library for better UX
// import { toast } from 'react-hot-toast';

// State cho từng slot phòng
interface RoomSlotState {
  startTime: string;
  durationHours: number | null; // Thay endTime bằng durationHours
  serviceIds: Set<string>;
  basePrice: number | null;
  // isPriceLoading: boolean; // Optional
}

// --- TIỆN ÍCH TÍNH TOÁN ENDTIME (Quan trọng) ---
// Trả về string YYYY-MM-DDTHH:mm hoặc null
function calculateEndTimeString(
  startTime: string,
  durationHours: number | null
): string | null {
  // Thêm kiểm tra đầu vào chặt chẽ hơn
  if (!startTime || typeof durationHours !== "number" || durationHours <= 0) {
    return null;
  }
  try {
    const startDate = new Date(startTime);
    // Kiểm tra startDate hợp lệ sau khi parse
    if (isNaN(startDate.getTime())) {
      console.warn("Invalid start time string provided:", startTime);
      return null;
    }
    // Tính toán thời gian kết thúc bằng mili giây
    const durationMs = durationHours * 60 * 60 * 1000;
    const endTimeMs = startDate.getTime() + durationMs;
    const endDate = new Date(endTimeMs);

    // Format về dạng YYYY-MM-DDTHH:mm (cho API)
    const year = endDate.getFullYear();
    const month = (endDate.getMonth() + 1).toString().padStart(2, "0");
    const day = endDate.getDate().toString().padStart(2, "0");
    const hours = endDate.getHours().toString().padStart(2, "0");
    const minutes = endDate.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  } catch (e) {
    console.error("Lỗi khi tính endTime:", startTime, durationHours, e);
    return null; // Trả về null nếu có lỗi
  }
}
// --- TRANG CHÍNH ---
export default function BookingPage() {
  // === API DATA STATE ===
  const [allStudioTypes, setAllStudioTypes] = useState<StudioType[]>([]);
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // === FORM INPUT STATE ===
  const [selectedStudioTypeId, setSelectedStudioTypeId] = useState<
    string | null
  >(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );
  const [roomQuantity, setRoomQuantity] = useState(1);

  const [roomSlots, setRoomSlots] = useState<RoomSlotState[]>(() => [
    {
      startTime: "",
      durationHours: null,
      serviceIds: new Set(),
      basePrice: null,
    },
  ]);
  const [contactInfo, setContactInfo] = useState({ phoneNumber: "", note: "" });
  const [paymentInfo, setPaymentInfo] = useState({
    bookingType: "PAY_FULL",
    paymentMethod: "MOMO",
  });
  const [errors, setErrors] = useState<{ phoneNumber?: string; note?: string }>(
    {}
  );

  // === CALCULATED STATE ===
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdownItem[]>(
    []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  // === REFS (Optional: for debouncing) ===
  // const timeChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // === EFFECT: LOAD INITIAL DATA ===
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const { studioTypes, services } = await getBookingPageDataUseCase();
        setAllStudioTypes(studioTypes);
        setAllServices(services);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu trang:", error);
        // toast.error("Không thể tải dữ liệu cần thiết. Vui lòng thử lại."); // Ví dụ dùng toast
        alert(
          `Không thể tải dữ liệu cần thiết: ${
            error instanceof Error ? error.message : "Lỗi không xác định"
          }`
        );
      }
    };
    loadInitialData();
  }, []);

  // === EFFECT: RECALCULATE TOTAL PRICE ===
  useEffect(() => {
    let currentTotal = 0;
    const breakdown: PriceBreakdownItem[] = [];

    roomSlots.forEach((slot, index) => {
      // Chỉ cộng giá nếu basePrice là một số >= 0
      if (typeof slot.basePrice === "number" && slot.basePrice >= 0) {
        // Chỉ thêm vào breakdown nếu giá > 0
        if (slot.basePrice > 0) {
          breakdown.push({
            description: `Phòng #${index + 1} (Giá thuê)`,
            price: slot.basePrice,
          });
        }
        currentTotal += slot.basePrice;
      }
      slot.serviceIds.forEach((serviceId) => {
        const service = allServices.find((s) => s.id === serviceId);
        if (service && typeof service.serviceFee === "number") {
          // Đảm bảo service.price là số
          breakdown.push({
            description: `Phòng #${index + 1} - ${service.serviceName}`,
            // SỬA LỖI: Quay lại dùng 'price' cho khớp API/Model
            price: service.serviceFee,
          });
          currentTotal += service.serviceFee;
        }
      });
    });

    setPriceBreakdown(breakdown);
    setTotalPrice(currentTotal);
  }, [roomSlots, allServices]); // Dependencies đã chính xác

  // === EVENT HANDLERS (Sử dụng useCallback để tối ưu nếu cần) ===

  // Hàm validate (có thể tách ra file utils)
  const validateContactForm = useCallback((): boolean => {
    const newErrors: { phoneNumber?: string; note?: string } = {};
    let isValid = true;

    if (!contactInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc.";
      isValid = false;
    } else if (!/^\d{10,11}$/.test(contactInfo.phoneNumber.trim())) {
      // Thêm validate cơ bản
      newErrors.phoneNumber = "Số điện thoại không hợp lệ.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [contactInfo.phoneNumber]); // Dependency là contactInfo.phoneNumber

  const handleStudioTypeChange = useCallback(async (typeId: string) => {
    setSelectedStudioTypeId(typeId);
    setSelectedLocationId(null);
    setAvailableLocations([]);
    setIsLocationLoading(true);

    try {
      const locations = await getLocationsUseCase(typeId);
      setAvailableLocations(locations);
    } catch (error) {
      console.error("Lỗi khi lấy locations:", error);
      setAvailableLocations([]);
      // toast.error("Không thể tải danh sách địa điểm.");
    } finally {
      setIsLocationLoading(false);
    }
  }, []); // Không có dependency vì chỉ gọi API

  const handleLocationChange = useCallback((locationId: string) => {
    setSelectedLocationId(locationId);
  }, []);

  const handleRoomQuantityChange = useCallback((quantity: number) => {
    const validQuantity = Math.max(1, quantity); // Đảm bảo ít nhất 1 phòng
    setRoomQuantity(validQuantity);

    setRoomSlots((prevSlots) => {
      const newSlots = Array(validQuantity)
        .fill(null)
        .map(
          (_, i) =>
            prevSlots[i] || {
              startTime: "",
              durationHours: null,
              serviceIds: new Set(),
              basePrice: null,
              // isPriceLoading: false,
            }
        );
      // Optional: Reset basePrice cho các slot mới/cũ khi đổi số lượng?
      // newSlots.forEach(slot => slot.basePrice = null);
      return newSlots;
    });
  }, []); // Dependency là roomSlots nếu bạn muốn giữ lại dữ liệu cũ khi giảm số lượng

  // Hàm tính giá cho một slot (tách ra để tái sử dụng)
  const calculateAndSetSlotPrice = useCallback(
    async (
      index: number,
      startTime: string,
      endTime: string,
      studioTypeId: string
    ) => {
      // Optional: Set loading state for the specific slot
      // setRoomSlots(prev => {
      //     const newSlots = [...prev];
      //     if (newSlots[index]) newSlots[index] = {...newSlots[index], isPriceLoading: true};
      //     return newSlots;
      // });
      if (!startTime || !endTime || !studioTypeId) {
        console.warn("Thiếu thông tin để tính giá slot", {
          index,
          startTime,
          endTime,
          studioTypeId,
        });
        // Reset giá nếu đang tính mà thông tin bị thiếu
        setRoomSlots((prevSlots) => {
          const newSlots = [...prevSlots];
          if (newSlots[index] && newSlots[index].basePrice !== null) {
            newSlots[index] = { ...newSlots[index], basePrice: null };
          }
          return newSlots;
        });
        return;
      }
      try {
        const basePrice = await calculateSlotPriceUseCase({
          startTime,
          endTime,
          studioTypeId,
        });
        setRoomSlots((prevSlots) => {
          const newSlots = [...prevSlots];
          // Kiểm tra lại index phòng trường hợp số lượng phòng thay đổi nhanh
          if (newSlots[index]) {
            newSlots[index] = { ...newSlots[index], basePrice: basePrice };
          }
          return newSlots;
        });
      } catch (error) {
        console.error(`Lỗi khi tính giá slot ${index}:`, error);
        setRoomSlots((prevSlots) => {
          const newSlots = [...prevSlots];
          if (newSlots[index]) {
            newSlots[index] = { ...newSlots[index], basePrice: null };
          }
          return newSlots;
        });
        // toast.error(`Không thể tính giá cho Phòng #${index + 1}. Thời gian có thể không hợp lệ.`);
      }
    },
    [calculateSlotPriceUseCase]
  ); // Dependencies là calculateSlotPriceUseCase (thường ổn định)

  const handleStartTimeChange = useCallback(
    (index: number, value: string) => {
      let calculatedEndTime: string | null = null;
      let shouldCallApi = false;
      let currentDuration: number | null = null; // Lấy duration hiện tại

      // Cập nhật state startTime và tính endTime/giá
      setRoomSlots((prevSlots) => {
        const newSlots = [...prevSlots];
        if (!newSlots[index]) return prevSlots;

        // Cập nhật startTime trước
        newSlots[index] = { ...newSlots[index], startTime: value };
        const currentSlot = newSlots[index];
        currentDuration = currentSlot.durationHours; // Lưu lại duration để dùng ngoài setState

        // Tính endTime dựa trên startTime MỚI và duration hiện tại
        calculatedEndTime = calculateEndTimeString(
          currentSlot.startTime,
          currentSlot.durationHours
        );

        // Quyết định có gọi API không
        if (calculatedEndTime && selectedStudioTypeId) {
          shouldCallApi = true;
        } else {
          // Reset giá nếu chưa đủ thông tin hoặc endTime không hợp lệ
          if (newSlots[index].basePrice !== null) {
            newSlots[index] = { ...newSlots[index], basePrice: null };
          }
        }
        return newSlots; // Trả về state đã cập nhật startTime (và có thể là basePrice=null)
      });

      // Gọi API tính giá (nằm ngoài setRoomSlots) nếu cần
      // Dùng 'value' (startTime mới) và 'currentDuration' (lấy từ bên trong setState)
      if (
        shouldCallApi &&
        calculatedEndTime &&
        selectedStudioTypeId &&
        currentDuration !== null
      ) {
        calculateAndSetSlotPrice(
          index,
          value,
          calculatedEndTime,
          selectedStudioTypeId
        );
      }
    },
    [selectedStudioTypeId, calculateAndSetSlotPrice]
  );
  const handleDurationChange = useCallback(
    (index: number, hours: number | null) => {
      let calculatedEndTime: string | null = null;
      let shouldCallApi = false;
      let currentStartTime: string = ""; // Lấy startTime hiện tại

      // Cập nhật state durationHours và tính endTime/giá
      setRoomSlots((prevSlots) => {
        const newSlots = [...prevSlots];
        if (!newSlots[index]) return prevSlots;

        // Cập nhật durationHours trước
        newSlots[index] = { ...newSlots[index], durationHours: hours };
        const currentSlot = newSlots[index];
        currentStartTime = currentSlot.startTime; // Lưu lại startTime để dùng ngoài setState

        // Tính endTime dựa trên startTime hiện tại và duration MỚI
        calculatedEndTime = calculateEndTimeString(
          currentSlot.startTime,
          currentSlot.durationHours
        );

        // Quyết định có gọi API không
        if (calculatedEndTime && selectedStudioTypeId) {
          shouldCallApi = true;
        } else {
          // Reset giá nếu chưa đủ thông tin hoặc endTime không hợp lệ
          if (newSlots[index].basePrice !== null) {
            newSlots[index] = { ...newSlots[index], basePrice: null };
          }
        }
        return newSlots; // Trả về state đã cập nhật durationHours (và có thể là basePrice=null)
      });

      // Gọi API tính giá (nằm ngoài setRoomSlots) nếu cần
      // Dùng 'currentStartTime' (lấy từ bên trong setState) và 'calculatedEndTime'
      if (
        shouldCallApi &&
        calculatedEndTime &&
        selectedStudioTypeId &&
        currentStartTime
      ) {
        calculateAndSetSlotPrice(
          index,
          currentStartTime,
          calculatedEndTime,
          selectedStudioTypeId
        );
      }
    },
    [selectedStudioTypeId, calculateAndSetSlotPrice]
  ); // Bỏ roomSlots khỏi dependencies
  const handleServiceChange = useCallback(
    (index: number, serviceId: string, isChecked: boolean) => {
      setRoomSlots((prevSlots) => {
        const newSlots = [...prevSlots];
        if (!newSlots[index]) return prevSlots;

        const currentServices = new Set(newSlots[index].serviceIds); // Luôn clone Set trước khi sửa
        isChecked
          ? currentServices.add(serviceId)
          : currentServices.delete(serviceId);
        newSlots[index] = { ...newSlots[index], serviceIds: currentServices };
        return newSlots;
      });
    },
    []
  );

  const handleContactChange = useCallback(
    (field: "phoneNumber" | "note", value: string) => {
      setContactInfo((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  ); // Dependency là errors

  const handleContactBlur = useCallback(
    (field: "phoneNumber" | "note") => {
      if (field === "phoneNumber") {
        validateContactForm();
      }
    },
    [validateContactForm]
  ); // Dependency là hàm validate

  const handlePaymentChange = useCallback(
    (field: "bookingType" | "paymentMethod", value: string) => {
      setPaymentInfo((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Handler cho nút submit booking
  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      if (event) event.preventDefault();

      const isContactValid = validateContactForm();
      // Cập nhật kiểm tra slot hợp lệ
      const hasValidTimeSlot = roomSlots.some(
        (slot) =>
          slot.startTime &&
          slot.durationHours !== null &&
          slot.durationHours > 0 &&
          typeof slot.basePrice === "number" &&
          slot.basePrice >= 0
      );

      if (
        !isContactValid ||
        !selectedStudioTypeId ||
        !selectedLocationId ||
        !hasValidTimeSlot
      ) {
        alert("Vui lòng kiểm tra lại thông tin...");
        return;
      }

      setIsSubmitting(true);

      // Format YYYY-MM-DDTHH:mm (giữ nguyên)
      const formatStartTimeLocal = (dateString: string): string => {
        // ... (code format giữ nguyên) ...
        if (!dateString) return "";
        try {
          const date = new Date(dateString);
          if (isNaN(date.getTime())) return "";
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          return `${year}-${month}-${day}T${hours}:${minutes}`;
        } catch (e) {
          return dateString;
        }
      };
      // Tạo mảng request theo Swagger mới (startTime, hour, serviceIds)
      const studioAssignRequests = roomSlots
        .filter(
          // Lọc slot hợp lệ
          (slot) =>
            slot.startTime &&
            slot.durationHours !== null &&
            slot.durationHours > 0 &&
            typeof slot.basePrice === "number"
        )
        .map((slot) => {
          const formattedStartTime = formatStartTimeLocal(slot.startTime);
          // Kiểm tra startTime hợp lệ sau khi format
          if (!formattedStartTime) {
            console.error("handleSubmit: Lỗi format startTime cho slot:", slot);
            return null; // Bỏ qua slot này nếu startTime lỗi
          }

          // **TRẢ VỀ OBJECT KHỚP SWAGGER MỚI**
          return {
            startTime: formattedStartTime,
            hour: slot.durationHours!, // Gửi durationHours dưới tên 'hour'
            serviceIds: Array.from(slot.serviceIds),
          };
        })
        .filter(Boolean) as StudioAssignRequest[];
      // Tính lại endTime cho mỗi slot hợp lệ
      // const calculatedEndTimeString = calculateEndTimeString(
      //   slot.startTime,
      //   slot.durationHours
      // );
      // if (!calculatedEndTimeString) {
      //   console.error("handleSubmit: Không thể tính endTime cho slot:", slot);
      //   return null; // Rất quan trọng: trả về null nếu không tính được
      // }

      // // Format cả startTime và endTime đã tính
      // // Cần parse lại startTime vì nó là string từ state
      // const formattedStartTime = formatDateTimeLocal(
      //   new Date(slot.startTime)
      // );
      // const formattedEndTime = formatDateTimeLocal(
      //   new Date(calculatedEndTimeString)
      // );

      // // Kiểm tra lại sau khi format (phòng trường hợp Date parse lỗi)
      // if (!formattedStartTime || !formattedEndTime) {
      //   console.error("handleSubmit: Lỗi format thời gian cho slot:", slot);
      //   return null;
      // }

      //   return {
      //     startTime: formattedStartTime,
      //     endTime: formattedEndTime, // Gửi endTime đã tính cho API
      //     serviceIds: Array.from(slot.serviceIds),
      //   };
      // })
      // .filter(Boolean); // Lọc bỏ các giá trị null (nếu có lỗi tính/format)

      if (studioAssignRequests.length === 0) {
        alert("Không có khoảng thời gian hợp lệ nào được chọn.");
        setIsSubmitting(false);
        return;
      }

      const bookingData: BookingRequest = {
        studioTypeId: selectedStudioTypeId!,
        locationId: selectedLocationId!,
        note: contactInfo.note.trim(),
        phoneNumber: contactInfo.phoneNumber.trim(),
        ...paymentInfo,
        studioAssignRequests: studioAssignRequests,
      };

      try {
        const result: BookingResponse = await createBookingUseCase(bookingData);
        if (
          result &&
          typeof result.data === "string" &&
          result.data.startsWith("http")
        ) {
          window.location.href = result.data;
        } else {
          alert(`Booking thành công! ${result?.message || ""}`);
          setIsSubmitting(false);
          // TODO: Reset form hoặc chuyển hướng đến trang khác
        }
      } catch (error) {
        console.error("Lỗi khi tạo booking:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Lỗi không xác định";
        // toast.error(`Booking thất bại: ${errorMessage}`);
        alert(`Đã xảy ra lỗi khi booking: ${errorMessage}`);
        setIsSubmitting(false); // Dừng loading khi lỗi
      }
    },
    [
      contactInfo,
      errors, // Thêm errors vào dependency của handleSubmit/validateContactForm
      paymentInfo,
      roomSlots,
      selectedLocationId,
      selectedStudioTypeId,
      totalPrice, // Hoặc hasValidTimeSlot nếu bạn tính nó ngoài handleSubmit
      validateContactForm, // Thêm hàm validate vào dependency
      createBookingUseCase, // Thêm use case vào dependency
    ]
  );

  // === RENDER ===
  return (
    // Sử dụng min-h-screen để đảm bảo layout chiếm ít nhất toàn bộ chiều cao màn hình
    <div className="container mx-auto bg-gray-50 min-h-screen py-10 md:py-16">
      {/* Container chính: Giới hạn chiều rộng tối đa, căn giữa, thêm padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-8 border-b border-gray-200 pb-4">
          Xác Nhận Đặt Studio
        </h1>
        {/* Grid layout chính: 1 cột trên mobile, 3 cột trên desktop (lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cột Trái: Chứa các form, chiếm 2/3 không gian trên desktop */}
          {/* SỬA ĐỔI: Thêm min-w-0 */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            <StudioLocationForm
              studioTypes={allStudioTypes}
              locations={availableLocations}
              isLocationLoading={isLocationLoading}
              onStudioTypeChange={handleStudioTypeChange}
              onLocationChange={handleLocationChange}
              onRoomQuantityChange={handleRoomQuantityChange}
            />
            <RoomTimeSlotForm
              numberOfRooms={roomQuantity}
              allServices={allServices}
              roomSlots={roomSlots}
              // Bỏ onTimeChange
              onStartTimeChange={handleStartTimeChange}
              onDurationChange={handleDurationChange}
              onServiceChange={handleServiceChange}
            />
            <ContactInfoForm
              phoneNumber={contactInfo.phoneNumber}
              note={contactInfo.note}
              onChange={handleContactChange}
              onBlur={handleContactBlur}
              error={errors.phoneNumber}
            />
          </div>

          {/* Cột Phải: Chứa tóm tắt đơn hàng, chiếm 1/3 không gian trên desktop */}
          {/* SỬA ĐỔI: Thêm min-w-0 */}
          <div className="lg:col-span-1 min-w-0">
            {/* Component PriceSummary có 'sticky top-20' nên nó sẽ tự dính khi cuộn */}
            <PriceSummary
              selectedStudioType={
                allStudioTypes.find((t) => t.id === selectedStudioTypeId)
                  ?.name || null
              }
              selectedLocation={
                availableLocations?.find((l) => l.id === selectedLocationId)
                  ?.locationName || null
              }
              priceBreakdown={priceBreakdown}
              totalPrice={totalPrice}
              onPaymentChange={handlePaymentChange}
              onSubmitBooking={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
      {/* Optional: Component Toast Container */}
      {/* <Toaster position="top-right" /> */}
    </div>
  );
}
