"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Profile } from "@/domain/models/profile";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { getProfileUseCase } from "@/domain/usecases/profile/getProfile";
import { updateProfileUseCase } from "@/domain/usecases/profile/updateProfile";
import { storage } from "@/infrastructure/utils/storage";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = storage.getToken();
      if (!token) {
        setLoading(false);
        setProfile(null);
        return;
      }

      try {
        const data = await getProfileUseCase();
        setProfile(data);
      } catch (error) {
        console.error("❌ Lỗi khi tải profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (data: Partial<Profile>) => {
    await updateProfileUseCase(data);
    const updated = await getProfileUseCase();
    setProfile(updated);
    setOpenEdit(false);
  };

  // ✅ 1️⃣ Trạng thái đang tải
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Đang tải thông tin người dùng...
      </div>
    );

  // ✅ 2️⃣ Nếu chưa đăng nhập
  if (!storage.getToken() || !profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Bạn chưa đăng nhập
        </h2>
        <p className="text-gray-500">
          Vui lòng đăng nhập để xem và chỉnh sửa thông tin tài khoản của bạn.
        </p>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => (window.location.href = "/auth/login")}
        >
          Đăng nhập ngay
        </Button>
      </div>
    );
  }

  // ✅ 3️⃣ Nếu đã đăng nhập
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <ProfileCard profile={profile} onEdit={() => setOpenEdit(true)} />
        {openEdit && (
          <EditProfileDialog
            profile={profile}
            onClose={() => setOpenEdit(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}
