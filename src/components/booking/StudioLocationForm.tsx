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

// Giả định chúng ta sẽ tạo các Models này trong domain/models/
interface StudioType {
  id: string;
  name: string;
  description: string;
  minArea: number;
  maxArea: number;
  bufferTime?: string | null;
  selected?: boolean;
  services?: string[];
}

interface Location {
  id: string;
  locationName: string;
  address: string;
  latitude?: string;
  longitude?: string;
  studioTypeId?: string;
  isDeleted?: boolean;
}

interface StudioLocationFormProps {
  studioTypes: StudioType[]; // Nhận từ API GET /studio-types
  locations: Location[]; // Nhận từ API GET /locations?typeId=...

  // Các hàm callback để báo cho component cha (page.tsx)
  onStudioTypeChange: (typeId: string) => void;
  onLocationChange: (locationId: string) => void;
  onRoomQuantityChange: (quantity: number) => void;

  // Trạng thái loading khi đang gọi API
  isLocationLoading: boolean;
}

export const StudioLocationForm: React.FC<StudioLocationFormProps> = ({
  studioTypes,
  locations,
  onStudioTypeChange,
  onLocationChange,
  onRoomQuantityChange,
  isLocationLoading,
}) => {
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
          <Select onValueChange={onStudioTypeChange}>
            <SelectTrigger id="studioType" className="w-full">
              <SelectValue placeholder="Chọn loại Studio..." />
            </SelectTrigger>
            <SelectContent>
              {studioTypes?.map((type) => (
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
          <Select
            onValueChange={onLocationChange}
            disabled={isLocationLoading || locations?.length === 0}
          >
            <SelectTrigger id="location" className="w-full">
              <SelectValue
                placeholder={
                  isLocationLoading
                    ? "Đang tải địa điểm..."
                    : "Chọn địa điểm..."
                }
              />
            </SelectTrigger>
            <SelectContent>
              {locations?.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.locationName}
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
          <Select
            defaultValue="1"
            onValueChange={(value) => onRoomQuantityChange(Number(value))}
          >
            <SelectTrigger id="roomQuantity" className="w-full">
              <SelectValue placeholder="Chọn số lượng..." />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
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
