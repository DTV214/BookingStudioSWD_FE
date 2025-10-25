"use client";

import React from "react";
import type { Booking } from "@/infrastructure/AdminAPI/BookingManagementAPI";

// Extended interfaces for display
interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface Studio {
  name: string;
  address: string;
  date: string;
  time: string;
  duration: string;
}

interface Service {
  name: string;
  price: number;
}

interface Pricing {
  studioPrice: number;
  servicePrice: number;
  overtimeFee: number;
  total: number;
}

interface BookingHistory {
  date: string;
  action: string;
  updatedBy: string;
}

// Extended Booking interface for display
interface ExtendedBooking extends Booking {
  customer: Customer;
  studio: Studio;
  services: Service[];
  pricing: Pricing;
  notes?: string;
  approvedBy?: string;
  history: BookingHistory[];
}

interface Props {
  booking: ExtendedBooking | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingViewModal({ booking, isOpen, onClose }: Props) {
  if (!isOpen || !booking) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Đang chờ xử lý';
      case 'IN_PROGRESS': return 'Đang thực hiện';
      case 'COMPLETED': return 'Đã hoàn thành';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingTypeDisplay = (bookingType: string) => {
    switch (bookingType) {
      case 'PAY_FULL': return 'Thanh toán đầy đủ';
      case 'PAY_PARTIAL': return 'Thanh toán một phần';
      case 'FREE': return 'Miễn phí';
      default: return bookingType;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Chi tiết Booking</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin khách hàng</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Tên khách hàng</label>
                  <p className="text-sm text-gray-900">{booking.customer.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-sm text-gray-900">{booking.customer.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Số điện thoại</label>
                  <p className="text-sm text-gray-900">{booking.customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Studio Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin studio</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Tên studio</label>
                  <p className="text-sm text-gray-900">{booking.studio.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Địa chỉ</label>
                  <p className="text-sm text-gray-900">{booking.studio.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Ngày</label>
                  <p className="text-sm text-gray-900">{booking.studio.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Giờ</label>
                  <p className="text-sm text-gray-900">{booking.studio.time}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Thời lượng</label>
                  <p className="text-sm text-gray-900">{booking.studio.duration}</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Dịch vụ đi kèm</h3>
              {booking.services.length > 0 ? (
                <div className="space-y-2">
                  {booking.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                      <span className="text-sm text-gray-900">{service.name}</span>
                      <span className="text-sm font-medium text-gray-900">{formatPrice(service.price)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Không có dịch vụ đi kèm</p>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Chi tiết thanh toán</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Giá studio:</span>
                  <span className="text-sm text-gray-900">{formatPrice(booking.pricing.studioPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Giá dịch vụ:</span>
                  <span className="text-sm text-gray-900">{formatPrice(booking.pricing.servicePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Phí quá giờ:</span>
                  <span className="text-sm text-gray-900">{formatPrice(booking.pricing.overtimeFee)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span className="text-sm text-gray-800">Tổng cộng:</span>
                  <span className="text-sm text-green-600">{formatPrice(booking.pricing.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Ghi chú</h3>
                <p className="text-sm text-gray-900">{booking.notes}</p>
              </div>
            </div>
          )}

          {/* Status and Type */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Trạng thái</h3>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                {getStatusDisplay(booking.status)}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Loại booking</h3>
              <p className="text-sm text-gray-900">{getBookingTypeDisplay(booking.bookingType)}</p>
            </div>
          </div>

          {/* History */}
          <div className="mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lịch sử thay đổi</h3>
              <div className="space-y-3">
                {booking.history.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded border">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{entry.action}</p>
                      <p className="text-xs text-gray-500">
                        {entry.date} - {entry.updatedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
