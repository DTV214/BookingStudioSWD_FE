"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { History, User, ChevronRight, Camera } from "lucide-react";

import { Profile } from "@/domain/models/profile";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { getProfileUseCase } from "@/domain/usecases/profile/getProfile";
import { updateProfileUseCase } from "@/domain/usecases/profile/updateProfile";
import { storage } from "@/infrastructure/utils/storage";

// --- COMPONENT BANNER ---
const ProfileBanner = ({ name }: { name: string }) => (
  <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-lg relative overflow-hidden">
    <div className="absolute -bottom-10 -right-10 opacity-10">
      <Camera size={150} />
    </div>
    <div className="relative z-10">
      <h1 className="text-3xl font-bold">Chào mừng trở lại, {name}!</h1>
      <p className="mt-2 text-blue-100">
        Quản lý thông tin cá nhân và xem lại các booking của bạn một cách dễ
        dàng.
      </p>
    </div>
  </div>
);

// --- COMPONENT SKELETON ---
const ProfilePageSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-4 md:p-8">
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-64 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  </div>
);

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Giảm thời gian tải giả để xem skeleton
    setTimeout(() => {
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
    }, 500); // Giả lập thời gian tải
  }, []);

  const handleSave = async (data: Partial<Profile>) => {
    await updateProfileUseCase(data);
    const updated = await getProfileUseCase();
    setProfile(updated);
    setOpenEdit(false);
  };

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  if (!storage.getToken() || !profile) {
    // Giao diện chưa đăng nhập giữ nguyên
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Bạn chưa đăng nhập
        </h2>
        <Button onClick={() => (window.location.href = "/auth/login")}>
          Đăng nhập ngay
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        <ProfileBanner name={profile.fullName || "bạn"} />

        {/* Card thông tin cá nhân */}
        <ProfileCard profile={profile} onEdit={() => setOpenEdit(true)} />

        {/* Card điều hướng đến lịch sử booking */}
        <Card
          className="rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
          onClick={() => router.push("/profile/history")}
        >
          <CardContent className="p-6 flex items-center justify-between bg-white">
            <div className="flex items-center gap-5">
              <div className="bg-blue-100 text-blue-600 rounded-lg p-3 group-hover:scale-110 transition-transform">
                <History className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Lịch sử Đặt phòng
                </h3>
                <p className="text-sm text-gray-500">
                  Xem lại tất cả các đơn đặt phòng của bạn.
                </p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </CardContent>
        </Card>

        {openEdit && (
          <EditProfileDialog
            profile={profile}
            onClose={() => setOpenEdit(false)}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
