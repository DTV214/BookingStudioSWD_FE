"use client";

import React, { useState } from "react";
import { useStudioAssigns, useServiceAssigns } from "@/infrastructure/AdminAPI/BookingManagementAPI/bookingHooks";
import type { StudioAssign, ServiceAssign } from "@/infrastructure/AdminAPI/BookingManagementAPI/types";

interface Props {
  bookingId: string;
}

export default function StudioAssignList({ bookingId }: Props) {
  const { studioAssigns, loading, error, updateStudioAssignStatus } = useStudioAssigns(bookingId);
  const [selectedStudioAssign, setSelectedStudioAssign] = useState<StudioAssign | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudioAssign, setEditingStudioAssign] = useState<StudioAssign | null>(null);
  const [newStatus, setNewStatus] = useState<StudioAssign['status']>('COMING_SOON');

  const handleViewStudioAssign = (studioAssign: StudioAssign) => {
    setSelectedStudioAssign(studioAssign);
    setIsDetailModalOpen(true);
  };

  const handleEditStudioAssign = (studioAssign: StudioAssign) => {
    setEditingStudioAssign(studioAssign);
    setNewStatus(studioAssign.status);
    setIsEditModalOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!editingStudioAssign) return;
    
    try {
      await updateStudioAssignStatus(editingStudioAssign.id, { status: newStatus });
      setIsEditModalOpen(false);
      setEditingStudioAssign(null);
      alert('Cập nhật trạng thái thành công!');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
    }
  };

  const getStatusDisplay = (status: StudioAssign['status']) => {
    switch (status) {
      case 'COMING_SOON': return 'Sắp tới';
      case 'IS_HAPPENING': return 'Đang diễn ra';
      case 'ENDED': return 'Đã kết thúc';
      case 'CANCELLED': return 'Đã hủy';
      case 'AWAITING_REFUND': return 'Chờ hoàn tiền';
      default: return status;
    }
  };

  const getStatusColor = (status: StudioAssign['status']) => {
    switch (status) {
      case 'COMING_SOON': return 'bg-yellow-100 text-yellow-800';
      case 'IS_HAPPENING': return 'bg-blue-100 text-blue-800';
      case 'ENDED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'AWAITING_REFUND': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-sm text-gray-600">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (studioAssigns.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Không có studio nào được phân công cho booking này
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Studio Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Start Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                End Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Studio Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Service Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studioAssigns.map((studioAssign) => (
              <tr key={studioAssign.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-900">{studioAssign.studioName}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDateTime(studioAssign.startTime)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{formatDateTime(studioAssign.endTime)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{formatPrice(studioAssign.studioAmount)}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{formatPrice(studioAssign.serviceAmount)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(studioAssign.status)}`}>
                    {getStatusDisplay(studioAssign.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewStudioAssign(studioAssign)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => handleEditStudioAssign(studioAssign)}
                      className="text-green-600 hover:text-green-800 font-medium text-sm"
                    >
                      Chỉnh sửa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedStudioAssign && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Chi tiết Studio Assign</h2>
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedStudioAssign(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Studio Name</h3>
                <p className="text-sm text-gray-600">{selectedStudioAssign.studioName}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Location</h3>
                <p className="text-sm text-gray-600">{selectedStudioAssign.locationName}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Start Time</h3>
                <p className="text-sm text-gray-600">{formatDateTime(selectedStudioAssign.startTime)}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">End Time</h3>
                <p className="text-sm text-gray-600">{formatDateTime(selectedStudioAssign.endTime)}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Studio Amount</h3>
                <p className="text-sm text-gray-600 font-semibold">{formatPrice(selectedStudioAssign.studioAmount)}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Service Amount</h3>
                <p className="text-sm text-gray-600 font-semibold">{formatPrice(selectedStudioAssign.serviceAmount)}</p>
              </div>

              {selectedStudioAssign.additionTime && (
                <div>
                  <h3 className="font-medium text-gray-900">Additional Time</h3>
                  <p className="text-sm text-gray-600">{selectedStudioAssign.additionTime} phút</p>
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-900">Status</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedStudioAssign.status)}`}>
                  {getStatusDisplay(selectedStudioAssign.status)}
                </span>
              </div>
            </div>

            {/* Service Assigns Section */}
            <ServiceAssignsList studioAssignId={selectedStudioAssign.id} />

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setSelectedStudioAssign(null);
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {isEditModalOpen && editingStudioAssign && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Chỉnh sửa trạng thái</h2>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingStudioAssign(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Studio: {editingStudioAssign.studioName}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái:</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as StudioAssign['status'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COMING_SOON">Sắp tới</option>
                  <option value="IS_HAPPENING">Đang diễn ra</option>
                  <option value="ENDED">Đã kết thúc</option>
                  <option value="CANCELLED">Đã hủy</option>
                  <option value="AWAITING_REFUND">Chờ hoàn tiền</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingStudioAssign(null);
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveStatus}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Service Assigns List Component
function ServiceAssignsList({ studioAssignId }: { studioAssignId: string }) {
  const { serviceAssigns, loading } = useServiceAssigns(studioAssignId);
  const [selectedService, setSelectedService] = React.useState<ServiceAssign | null>(null);
  const [isServiceDetailModalOpen, setIsServiceDetailModalOpen] = React.useState(false);
  const [serviceStatus, setServiceStatus] = React.useState<'ACTIVE' | 'CANCELLED' | 'AWAITING_REFUND'>('ACTIVE');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Hoạt động';
      case 'CANCELLED': return 'Đã hủy';
      case 'AWAITING_REFUND': return 'Chờ hoàn tiền';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'AWAITING_REFUND': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewServiceDetails = (service: ServiceAssign) => {
    setSelectedService(service);
    setServiceStatus(service.status as 'ACTIVE' | 'CANCELLED' | 'AWAITING_REFUND');
    setIsServiceDetailModalOpen(true);
  };

  const handleSaveServiceStatus = async () => {
    // TODO: Implement API call to update service assign status
    alert('Chức năng cập nhật trạng thái dịch vụ sẽ được triển khai trong tương lai');
    setIsServiceDetailModalOpen(false);
    setSelectedService(null);
  };

  if (loading) {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Những dịch vụ đã đăng kí</h3>
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!serviceAssigns || serviceAssigns.length === 0) {
    return (
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Những dịch vụ đã đăng kí</h3>
        <p className="text-sm text-gray-500">Không có dịch vụ nào được đăng ký cho studio này</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium text-gray-900 mb-3">Những dịch vụ đã đăng kí</h3>
        <div className="space-y-2">
          {serviceAssigns.map((service) => (
            <div key={service.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-md">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{service.serviceName}</p>
                <p className="text-xs text-gray-500">ID: {service.serviceId}</p>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(service.serviceFee)}</p>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(service.status)}`}>
                    {getStatusDisplay(service.status)}
                  </span>
                </div>
                <button
                  onClick={() => handleViewServiceDetails(service)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {isServiceDetailModalOpen && selectedService && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Chi tiết Dịch vụ</h2>
              <button
                onClick={() => {
                  setIsServiceDetailModalOpen(false);
                  setSelectedService(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Tên dịch vụ</h3>
                <p className="text-sm text-gray-600">{selectedService.serviceName}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Phí dịch vụ</h3>
                <p className="text-sm text-gray-600 font-semibold">{formatPrice(selectedService.serviceFee)}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Trạng thái</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedService.status)}`}>
                  {getStatusDisplay(selectedService.status)}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Thay đổi trạng thái:</label>
                <select
                  value={serviceStatus}
                  onChange={(e) => setServiceStatus(e.target.value as 'ACTIVE' | 'CANCELLED' | 'AWAITING_REFUND')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Hoạt động</option>
                  <option value="CANCELLED">Đã hủy</option>
                  <option value="AWAITING_REFUND">Chờ hoàn tiền</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setIsServiceDetailModalOpen(false);
                  setSelectedService(null);
                }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveServiceStatus}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
