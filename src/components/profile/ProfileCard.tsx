"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import type { Profile } from "@/domain/models/profile";

interface ProfileCardProps {
  profile: Profile;
  onEdit: () => void;
}

export function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  return (
    <Card className="shadow-md border border-gray-100 rounded-2xl overflow-hidden bg-white">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {profile.fullName || "Chưa có tên"}
              </h2>
              <p className="text-gray-500">
                {profile.email || "Không có email"}
              </p>
            </div>
          </div>

          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={onEdit}
          >
            Chỉnh sửa
          </Button>
        </div>

        {/* Thông tin chi tiết */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <InfoRow label="ID người dùng" value={profile.id ?? "—"} />
          <InfoRow label="Số điện thoại" value={profile.phoneNumber ?? "—"} />
          <InfoRow label="Loại tài khoản" value={profile.userType ?? "—"} />
          <InfoRow label="Vai trò" value={profile.accountRole ?? "—"} />
          <InfoRow label="Trạng thái" value={profile.status ?? "—"} />
          <InfoRow
            label="Ngày tạo"
            value={
              profile.createdDate
                ? new Date(profile.createdDate).toLocaleString("vi-VN")
                : "—"
            }
          />
          <InfoRow
            label="Cập nhật gần nhất"
            value={
              profile.updatedDate
                ? new Date(profile.updatedDate).toLocaleString("vi-VN")
                : "—"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

/** ✅ Component con để render từng dòng thông tin */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}
