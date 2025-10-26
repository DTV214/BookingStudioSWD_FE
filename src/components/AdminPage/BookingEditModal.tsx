"use client";

import React, { useState, useEffect } from "react";
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
  onSave: (booking: ExtendedBooking) => void;
}

export default function BookingEditModal({ booking, isOpen, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<ExtendedBooking | null>(null);

  useEffect(() => {
    if (booking) {
      setFormData({ ...booking });
    }
  }, [booking]);

  if (!isOpen || !booking || !formData) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handleCustomerChange = (field: string, value: string) => {
    setFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        customer: {
          ...prev.customer,
          [field]: value
        }
      };
    });
  };

  const handleStudioChange = (field: string, value: string) => {
    setFormData(prev => {
      if (!prev) return null;
      return {
        ...prev,
        studio: {
          ...prev.studio,
          [field]: value
        }
      };
    });
  };

  const handlePricingChange = (field: string, value: number) => {
    setFormData(prev => {
      if (!prev) return null;
      const newPricing = {
        ...prev.pricing,
        [field]: value
      };
      // Recalculate total
      newPricing.total = newPricing.studioPrice + newPricing.servicePrice + newPricing.overtimeFee;
      
      return {
        ...prev,
        pricing: newPricing
      };
    });
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Chỉnh sửa Booking</h2>
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách hàng</label>
                  <input
                    type="text"
                    value={formData.customer.name}
                    onChange={(e) => handleCustomerChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.customer.email}
                    onChange={(e) => handleCustomerChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.customer.phone}
                    onChange={(e) => handleCustomerChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Studio Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin studio</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên studio</label>
                  <input
                    type="text"
                    value={formData.studio.name}
                    onChange={(e) => handleStudioChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                  <input
                    type="text"
                    value={formData.studio.address}
                    onChange={(e) => handleStudioChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
                    <input
                      type="date"
                      value={formData.studio.date}
                      onChange={(e) => handleStudioChange('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ</label>
                    <input
                      type="time"
                      value={formData.studio.time}
                      onChange={(e) => handleStudioChange('time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng</label>
                  <input
                    type="text"
                    value={formData.studio.duration}
                    onChange={(e) => handleStudioChange('duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: 3 giờ"
                  />
                </div>
              </div>
            </div>

            {/* Status and Type */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Trạng thái & Loại</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="PENDING">Đang chờ xử lý</option>
                    <option value="IN_PROGRESS">Đang thực hiện</option>
                    <option value="COMPLETED">Đã hoàn thành</option>
                    <option value="CANCELLED">Đã hủy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại booking</label>
                  <select
                    value={formData.bookingType}
                    onChange={(e) => handleInputChange('bookingType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="PAY_FULL">Thanh toán đầy đủ</option>
                    <option value="PAY_PARTIAL">Thanh toán một phần</option>
                    <option value="FREE">Miễn phí</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Chi tiết thanh toán</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá studio (VND)</label>
                  <input
                    type="number"
                    value={formData.pricing.studioPrice}
                    onChange={(e) => handlePricingChange('studioPrice', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá dịch vụ (VND)</label>
                  <input
                    type="number"
                    value={formData.pricing.servicePrice}
                    onChange={(e) => handlePricingChange('servicePrice', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phí quá giờ (VND)</label>
                  <input
                    type="number"
                    value={formData.pricing.overtimeFee}
                    onChange={(e) => handlePricingChange('overtimeFee', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tổng cộng:</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatPrice(formData.pricing.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Ghi chú</h3>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập ghi chú..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}