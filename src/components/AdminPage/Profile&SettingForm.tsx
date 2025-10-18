"use client";

// src/components/AdminPage/Profile&SettingForm.tsx

import React, { useState } from "react";
import Link from "next/link";

// 1. Định nghĩa kiểu dữ liệu AdminProfile
interface AdminProfile {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  avatar?: string;
  fullName?: string;
  createdAt: string;
  lastLogin: string;
}

// 2. Props cho component
type Props = {
  profile: AdminProfile;
};

/**
 * 3. Presentation component: chỉ render UI dựa trên props
 */
export default function ProfileSettingForm({ profile }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    email: profile.email,
    phone: profile.phone,
    avatar: profile.avatar || ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to default avatar if image fails to load
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${profile.username}&background=2563eb&color=ffffff&size=150`;
  };

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile.fullName || "",
      email: profile.email,
      phone: profile.phone,
      avatar: profile.avatar || ""
    });
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/bookinglist">Bookings List</Link>
            </li>
            <li>
              <Link href="/admin/customers">Customers</Link>
            </li>
            <li>
              <Link href="/admin/studios">Studios</Link>
            </li>
            <li>
              <Link href="/admin/location">Location Management</Link>
            </li>
            <li>
              <Link href="/admin/notifications">Notifications</Link>
            </li>
            <li className="active">
              <Link href="/admin/profile-setting" className="menu-link">Profile & Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <section className="dashboard-root">
        {/* HEADER */}
        <header className="dashboard-header">
          <h1>Profile & Settings</h1>
          <div className="dashboard-search">
            <input aria-label="Search" placeholder="Search" />
          </div>
        </header>

        {/* Profile Content with Tailwind CSS */}
        <div className="profile-tailwind-container">
          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-12 relative">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative flex items-center space-x-8">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      src={formData.avatar || `https://ui-avatars.com/api/?name=${profile.username}&background=2563eb&color=ffffff&size=200`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <input
                        type="file"
                        id="avatar-upload-large"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      <label htmlFor="avatar-upload-large" className="bg-white text-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Thay đổi ảnh</span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-white">
                  <h2 className="text-4xl font-bold mb-2">{formData.fullName || profile.username}</h2>
                  <p className="text-xl text-blue-100 mb-4">{profile.role}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${profile.status === 'active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className="text-blue-100 font-medium">
                      {profile.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex-shrink-0">
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Chỉnh sửa hồ sơ</span>
                    </button>
                  ) : (
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleCancel}
                        className="bg-red-500 bg-opacity-20 backdrop-blur-sm border border-red-300 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300"
                      >
                        Hủy
                      </button>
                      <button 
                        onClick={handleSave}
                        className="bg-green-500 bg-opacity-20 backdrop-blur-sm border border-green-300 text-white px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Lưu thay đổi</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Information Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Thông tin cá nhân
                </h3>
              </div>
              <div className="p-8 space-y-6">
                {/* Username */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Tên đăng nhập
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <span className="text-gray-800 font-semibold text-lg">{profile.username}</span>
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Họ và tên
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nhập họ và tên"
                    />
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                      <span className="text-gray-800">{formData.fullName || "Chưa cập nhật"}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nhập email"
                    />
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                      <a href={`mailto:${formData.email}`} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        {formData.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nhập số điện thoại"
                    />
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                      <a href={`tel:${formData.phone}`} className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                        {formData.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Thông tin tài khoản
                </h3>
              </div>
              <div className="p-8 space-y-6">
                {/* Role */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    Vai trò
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {profile.role}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Trạng thái
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      profile.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        profile.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      {profile.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                    </span>
                  </div>
                </div>

                {/* Created Date */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Ngày tạo tài khoản
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <span className="text-gray-700 font-medium">{formatDate(profile.createdAt)}</span>
                  </div>
                </div>

                {/* Last Login */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Lần đăng nhập cuối
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <span className="text-gray-700 font-medium">{formatDate(profile.lastLogin)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
