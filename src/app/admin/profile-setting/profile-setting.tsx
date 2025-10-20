// src/app/admin/profile-setting/profile-setting.tsx
"use client";

import React from "react";
import ProfileSettingForm from "@/components/AdminPage/Profile&SettingForm";

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

const AdminProfileData: AdminProfile = {
  id: "admin_001",
  username: "admin",
  email: "admin@bookingstudio.com",
  phone: "+84 123 456 789",
  role: "Administrator",
  status: "active",
  avatar: "https://via.placeholder.com/150x150/2563eb/ffffff?text=A",
  fullName: "Nguyễn Văn Admin",
  createdAt: "2024-01-01T00:00:00Z",
  lastLogin: "2024-01-15T10:30:00Z"
};

export default function ProfileContainer() {
  return <ProfileSettingForm profile={AdminProfileData} />;
}
