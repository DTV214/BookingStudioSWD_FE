// src/app/booking/page.tsx (PHIÊN BẢN HOÀN CHỈNH)

"use client";

import { ContactInfoForm } from "@/components/booking/ContactInfoForm";
import { PriceSummary } from "@/components/booking/PriceSummary";
import { RoomTimeSlotForm } from "@/components/booking/RoomTimeSlotForm";
import { StudioLocationForm } from "@/components/booking/StudioLocationForm";
import React from "react";


export default function BookingPage() {
  // Dữ liệu Mocking để đảm bảo RoomTimeSlotForm hiển thị đúng số lượng phòng
  const mockNumberOfRooms = 2;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-4">
          Xác Nhận Đặt Studio
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột Trái: Form nhập liệu (2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. Chọn Loại Studio, Địa điểm & Số lượng phòng */}
            <StudioLocationForm />

            {/* 2. Chi Tiết Thời Gian & Dịch Vụ */}
            <RoomTimeSlotForm
              numberOfRooms={mockNumberOfRooms} // Truyền số lượng phòng mock
            />

            {/* 3. Thông Tin Liên Hệ */}
            <ContactInfoForm />
          </div>

          {/* Cột Phải: Tóm tắt và Thanh toán (1/3 width) */}
          <div className="lg:col-span-1">
            <PriceSummary
            // Giữ nguyên PriceSummary với mock data cũ cho đến khi tích hợp logic
            />
          </div>
        </div>
      </div>
    </div>
  );
}

