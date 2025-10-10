"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Profile } from "@/domain/models/profile";

interface EditProfileDialogProps {
  profile: Profile;
  onClose: () => void;
  onSave: (data: Partial<Profile>) => Promise<void>;
}

export function EditProfileDialog({
  profile,
  onClose,
  onSave,
}: EditProfileDialogProps) {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    userType: "PERSONAL",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Load dữ liệu profile vào form khi mở dialog
  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName ?? "",
        phoneNumber: profile.phoneNumber ?? "",
        userType: profile.userType ?? "PERSONAL",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật:", err);
      alert("Cập nhật thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin tài khoản</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Loại tài khoản (Personal | Organization) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Loại tài khoản
            </label>
            <Select
              value={form.userType}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  userType: value as "PERSONAL" | "ORGANIZATION",
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn loại tài khoản" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERSONAL">Cá nhân</SelectItem>
                <SelectItem value="ORGANIZATION">Tổ chức</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
