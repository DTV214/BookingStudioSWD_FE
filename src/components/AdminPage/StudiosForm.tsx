// src/app/components/AdminPage/StudiosForm.tsx
"use client";

import React from "react";
import Link from "next/link";

type Studio = {
  id: string;
  name: string;
  image: string;
  studioTypeId: string;
  studioTypeName: string;
  locationId: string;
  locationName: string;
  acreage: number;
  startTime: string;
  endTime: string;
  description: string;
  status: "AVAILABLE" | "MAINTENANCE";
};

type StudioFormData = {
  name: string;
  image: File | string; // Support both File upload and URL string
  studioTypeId: string;
  locationId: string;
  acreage: number;
  startTime: string;
  endTime: string;
  description: string;
  status: "AVAILABLE" | "MAINTENANCE";
};

type StudioType = {
  id: string;
  name: string;
  description: string;
  minArea: number;
  maxArea: number;
  bufferTime?: string | null;
  services: string[];
};

type Location = {
  id: string;
  locationName: string;
  address: string;
  contactNumber: string;
  longitude: string;
  latitude: string;
  isDeleted: boolean;
};

type Props = {
  studios: Studio[];
  filteredStudios: Studio[];
  searchTerm: string;
  selectedImage: string | null;
  selectedStudio: Studio | null;
  editingStudio: Studio | null;
  showNewStudioForm: boolean;
  newStudioFormData: StudioFormData;
  newStudioErrors: Partial<Record<keyof StudioFormData, string>>;
  studioTypes: StudioType[];
  locations: Location[];
  onSearchChange: (term: string) => void;
  onImageClick: (imageUrl: string) => void;
  onCloseImage: () => void;
  onViewDetails: (studio: Studio) => void;
  onCloseDetails: () => void;
  onEdit: (studioId: string) => void;
  onCloseEdit: () => void;
  onEditInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSaveEdit: () => void;
  onDelete: (studioId: string) => void;
  onNewStudioInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCreateNewStudio: () => void;
  onCancelNewStudio: () => void;
  onShowNewStudioForm: () => void;
};

/**
 * Presentation component: chỉ nhận props và render UI.
 * Không có state management hay business logic.
 */
export default function StudiosForm({
  studios,
  filteredStudios,
  searchTerm,
  selectedImage,
  selectedStudio,
  editingStudio,
  showNewStudioForm,
  newStudioFormData,
  newStudioErrors,
  studioTypes,
  locations,
  onSearchChange,
  onImageClick,
  onCloseImage,
  onViewDetails,
  onCloseDetails,
  onEdit,
  onCloseEdit,
  onEditInputChange,
  onSaveEdit,
  onDelete,
  onNewStudioInputChange,
  onCreateNewStudio,
  onCancelNewStudio,
  onShowNewStudioForm
}: Props) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar (giữ y hệt form khác để consistent) */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="menu-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/bookinglist" className="menu-link">
                Bookings List
              </Link>
            </li>
            <li>
              <Link href="/admin/account" className="menu-link">
                Account Management
              </Link>
            </li>
            <li className="active">
              <Link href="/admin/studios" className="menu-link">
                Studios
              </Link>
            </li>
            <li>
              <Link href="/admin/studio-types" className="menu-link">
                Studio Types
              </Link>
            </li>
            <li>
              <Link href="/admin/location" className="menu-link">
                Location Management
              </Link>
            </li>
            <li>
              <Link href="/admin/service" className="menu-link">
                Service Management
              </Link>
            </li>
            <li>
              <Link href="/admin/notifications" className="menu-link">
                Notifications
              </Link>
            </li>
            <li>
              <Link href="/admin/profile-setting" className="menu-link">
                Profile & Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="booking-root">
        {/* Header */}
        <div className="booking-header">
          <h1>Studios</h1>
          <div className="header-controls">
            <input 
              className="search-input" 
              placeholder="Search studios..." 
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button 
              onClick={onShowNewStudioForm}
              className="btn primary"
            >
              + New Studio
            </button>
          </div>
        </div>

        {/* Studio List */}
          <div className="card bookings-card">
            <h2>Studio List</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hình ảnh</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Tên Studio</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Loại Studio</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Địa điểm</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Diện tích</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Giờ hoạt động</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Trạng thái</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudios.map((studio) => (
                  <tr key={studio.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="relative">
                        <img
                          src={studio.image}
                          alt={studio.name}
                          className="w-16 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => onImageClick(studio.image)}
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 font-medium">{studio.name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                      {studio.studioTypeName}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">{studio.locationName}</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">{studio.acreage} m²</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      {studio.startTime} - {studio.endTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          studio.status === "AVAILABLE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {studio.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onViewDetails(studio)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                          title="Xem chi tiết"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onEdit(studio.id)}
                          className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                          title="Chỉnh sửa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onDelete(studio.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                          title="Xóa"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Card */}
        <div className="card studio-status-card mt-6">
          <h3>Tổng quan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{studios.length}</p>
              <p className="text-sm text-gray-600">Tổng số studio</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{studios.filter(s => s.status === "AVAILABLE").length}</p>
              <p className="text-sm text-gray-600">AVAILABLE</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{studios.filter(s => s.status === "MAINTENANCE").length}</p>
              <p className="text-sm text-gray-600">MAINTENANCE</p>
            </div>
          </div>
          {searchTerm && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                Hiển thị {filteredStudios.length} studio phù hợp với từ khóa: &quot;<strong>{searchTerm}</strong>&quot;
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={onCloseImage}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Studio preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Studio Details Modal */}
      {selectedStudio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chi tiết Studio</h2>
              <button
                onClick={onCloseDetails}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
          </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tên Studio</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudio.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <span
                    className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      selectedStudio.status === "AVAILABLE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedStudio.status}
                    </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Loại Studio</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudio.studioTypeName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudio.locationName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Diện tích</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudio.acreage} m²</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Giờ hoạt động</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedStudio.startTime} - {selectedStudio.endTime}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <p className="mt-1 text-sm text-gray-900">{selectedStudio.description}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                <img
                  src={selectedStudio.image}
                  alt={selectedStudio.name}
                  className="mt-2 w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Studio Modal */}
      {editingStudio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Chỉnh sửa Studio</h2>
              <button
                onClick={onCloseEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); onSaveEdit(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tên Studio */}
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Tên Studio *
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={editingStudio.name}
                    onChange={onEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Loại Studio */}
                <div>
                  <label htmlFor="edit-studioTypeName" className="block text-sm font-medium text-gray-700 mb-2">
                    Loại Studio *
                  </label>
                  <select
                    id="edit-studioTypeName"
                    name="studioTypeId"
                    value={editingStudio.studioTypeId}
                    onChange={onEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn loại studio</option>
                    {studioTypes.map((studioType) => (
                      <option key={studioType.id} value={studioType.id}>
                        {studioType.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Địa điểm */}
                <div>
                  <label htmlFor="edit-locationName" className="block text-sm font-medium text-gray-700 mb-2">
                    Địa điểm *
                  </label>
                  <select
                    id="edit-locationName"
                    name="locationId"
                    value={editingStudio.locationId}
                    onChange={onEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn địa điểm</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Diện tích */}
                <div>
                  <label htmlFor="edit-acreage" className="block text-sm font-medium text-gray-700 mb-2">
                    Diện tích (m²) *
                  </label>
                  <input
                    type="number"
                    id="edit-acreage"
                    name="acreage"
                    value={editingStudio.acreage}
                    onChange={onEditInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Giờ bắt đầu */}
                <div>
                  <label htmlFor="edit-startTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ bắt đầu *
                  </label>
                  <input
                    type="time"
                    id="edit-startTime"
                    name="startTime"
                    value={editingStudio.startTime}
                    onChange={onEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Giờ kết thúc */}
                <div>
                  <label htmlFor="edit-endTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ kết thúc *
                  </label>
                  <input
                    type="time"
                    id="edit-endTime"
                    name="endTime"
                    value={editingStudio.endTime}
                    onChange={onEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Trạng thái */}
                <div>
                  <label htmlFor="edit-status" className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái *
                  </label>
                  <select
                    id="edit-status"
                    name="status"
                    value={editingStudio.status}
                    onChange={onEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </select>
                </div>

                {/* Upload hình ảnh */}
                <div>
                  <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload hình ảnh *
                  </label>
                  <input
                    type="file"
                    id="edit-image"
                    name="image"
                    accept="image/*"
                    onChange={onEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Mô tả */}
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả *
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={editingStudio.description}
                  onChange={onEditInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Preview hình ảnh */}
              {editingStudio.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xem trước hình ảnh
                  </label>
                  <img
                    src={editingStudio.image}
                    alt="Preview"
                    className="w-64 h-48 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={onCloseEdit}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Studio Modal */}
      {showNewStudioForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tạo Studio Mới</h2>
              <button
                onClick={onCancelNewStudio}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); onCreateNewStudio(); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tên Studio */}
                <div>
                  <label htmlFor="new-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Tên Studio *
                  </label>
                  <input
                    type="text"
                    id="new-name"
                    name="name"
                    value={newStudioFormData.name}
                    onChange={onNewStudioInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      newStudioErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ví dụ: Phòng A - Portrait Basic"
                    required
                  />
                  {newStudioErrors.name && <p className="mt-1 text-sm text-red-600">{newStudioErrors.name}</p>}
                </div>

                {/* Loại Studio */}
                <div>
                  <label htmlFor="new-studioTypeName" className="block text-sm font-medium text-gray-700 mb-2">
                    Loại Studio *
                  </label>
                  <select
                    id="new-studioTypeName"
                    name="studioTypeId"
                    value={newStudioFormData.studioTypeId}
                    onChange={onNewStudioInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      newStudioErrors.studioTypeId ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Chọn loại studio</option>
                    {studioTypes.map((studioType) => (
                      <option key={studioType.id} value={studioType.id}>
                        {studioType.name}
                      </option>
                    ))}
                  </select>
                  {newStudioErrors.studioTypeId && <p className="mt-1 text-sm text-red-600">{newStudioErrors.studioTypeId}</p>}
                </div>

                {/* Địa điểm */}
                <div>
                  <label htmlFor="new-locationName" className="block text-sm font-medium text-gray-700 mb-2">
                    Địa điểm *
                  </label>
                  <select
                    id="new-locationName"
                    name="locationId"
                    value={newStudioFormData.locationId}
                    onChange={onNewStudioInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      newStudioErrors.locationId ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Chọn địa điểm</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.locationName}
                      </option>
                    ))}
                  </select>
                  {newStudioErrors.locationId && <p className="mt-1 text-sm text-red-600">{newStudioErrors.locationId}</p>}
                </div>

                {/* Diện tích */}
                <div>
                  <label htmlFor="new-acreage" className="block text-sm font-medium text-gray-700 mb-2">
                    Diện tích (m²) *
                  </label>
                  <input
                    type="number"
                    id="new-acreage"
                    name="acreage"
                    value={newStudioFormData.acreage}
                    onChange={onNewStudioInputChange}
                    min="1"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      newStudioErrors.acreage ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ví dụ: 18"
                    required
                  />
                  {newStudioErrors.acreage && <p className="mt-1 text-sm text-red-600">{newStudioErrors.acreage}</p>}
                </div>

                {/* Giờ bắt đầu */}
                <div>
                  <label htmlFor="new-startTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ bắt đầu *
                  </label>
                  <input
                    type="time"
                    id="new-startTime"
                    name="startTime"
                    value={newStudioFormData.startTime}
                    onChange={onNewStudioInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      newStudioErrors.startTime ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {newStudioErrors.startTime && <p className="mt-1 text-sm text-red-600">{newStudioErrors.startTime}</p>}
                </div>

                {/* Giờ kết thúc */}
                <div>
                  <label htmlFor="new-endTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ kết thúc *
                  </label>
                  <input
                    type="time"
                    id="new-endTime"
                    name="endTime"
                    value={newStudioFormData.endTime}
                    onChange={onNewStudioInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      newStudioErrors.endTime ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {newStudioErrors.endTime && <p className="mt-1 text-sm text-red-600">{newStudioErrors.endTime}</p>}
                </div>

                {/* Trạng thái */}
                <div>
                  <label htmlFor="new-status" className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái *
                  </label>
                  <select
                    id="new-status"
                    name="status"
                    value={newStudioFormData.status}
                    onChange={onNewStudioInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </select>
                </div>

                {/* Upload hình ảnh */}
                <div>
                  <label htmlFor="new-image" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload hình ảnh *
                  </label>
                  <input
                    type="file"
                    id="new-image"
                    name="image"
                    accept="image/*"
                    onChange={onNewStudioInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      newStudioErrors.image ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {newStudioErrors.image && <p className="mt-1 text-sm text-red-600">{newStudioErrors.image}</p>}
                </div>
              </div>

              {/* Mô tả */}
              <div>
                <label htmlFor="new-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả *
                </label>
                <textarea
                  id="new-description"
                  name="description"
                  value={newStudioFormData.description}
                  onChange={onNewStudioInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    newStudioErrors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Mô tả chi tiết về studio..."
                  required
                />
                {newStudioErrors.description && <p className="mt-1 text-sm text-red-600">{newStudioErrors.description}</p>}
              </div>

              {/* Preview hình ảnh */}
              {newStudioFormData.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Xem trước hình ảnh
                  </label>
                  <img
                    src={newStudioFormData.image}
                    alt="Preview"
                    className="w-64 h-48 object-cover rounded-lg border border-gray-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={onCancelNewStudio}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Tạo Studio
                </button>
              </div>
            </form>
            </div>
        </div>
      )}
    </div>
  );
}
