// src/components/common/booking/StudioLocationForm.tsx

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsRight } from "lucide-react";

// Mock Data cho Studio Types và Locations
const MOCK_STUDIO_TYPES = [
  {
    id: "b1437061-01e6-4a47-b772-f454fd057060",
    name: "Phòng chụp ảnh thời trang",
  },
  { id: "type-2", name: "Phòng thu âm chuyên nghiệp" },
  { id: "type-3", name: "Phòng Livestream đa năng" },
];

const MOCK_LOCATIONS = [
  {
    id: "a329d001-67c0-44bb-a4d2-5ae072515a4f",
    name: "Quận 1, TP.HCM - Chi nhánh Nguyễn Huệ",
  },
  { id: "location-2", name: "Quận 3, TP.HCM - Chi nhánh CMT8" },
  { id: "location-3", name: "Quận Hai Bà Trưng, Hà Nội" },
];

interface StudioLocationFormProps {
  // Sẽ thêm props để handle state sau
}

export const StudioLocationForm: React.FC<StudioLocationFormProps> = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          1. Chọn Studio & Phòng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chọn Loại Studio */}
        <div className="space-y-2">
          <Label htmlFor="studioType">
            Loại Studio <span className="text-red-500">*</span>
          </Label>
          {/* Sử dụng Shadcn Select */}
          <Select defaultValue={MOCK_STUDIO_TYPES[0].id}>
            <SelectTrigger id="studioType" className="w-full">
              <SelectValue placeholder="Chọn loại Studio..." />
            </SelectTrigger>
            <SelectContent>
              {MOCK_STUDIO_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chọn Địa điểm/Location */}
        <div className="space-y-2">
          <Label htmlFor="location">
            Địa điểm (Location) <span className="text-red-500">*</span>
          </Label>
          <Select defaultValue={MOCK_LOCATIONS[0].id}>
            <SelectTrigger id="location" className="w-full">
              <SelectValue placeholder="Chọn địa điểm..." />
            </SelectTrigger>
            <SelectContent>
              {MOCK_LOCATIONS.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chọn Số lượng phòng */}
        <div className="space-y-2">
          <Label htmlFor="roomQuantity">
            Số lượng phòng cần thuê <span className="text-red-500">*</span>
          </Label>
          <Select defaultValue="2">
            {" "}
            {/* Mock chọn 2 phòng */}
            <SelectTrigger id="roomQuantity" className="w-full">
              <SelectValue placeholder="Chọn số lượng..." />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} phòng
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <ChevronsRight className="w-4 h-4 text-blue-500" /> Mỗi phòng tương
            ứng với một khoảng thời gian thuê riêng biệt.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
