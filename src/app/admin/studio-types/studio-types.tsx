// src/app/admin/studio-types/studio-types.tsx
"use client";

import React, { useState } from "react";
import StudioTypesForm from "@/components/AdminPage/Studio-Types";
import { StudioType } from "@/domain/models/studio-type/studioType";

export default function StudioTypesContainer() {
  const [studioTypes, setStudioTypes] = useState<StudioType[]>([
    {
      id: "1",
      name: "Chân Dung (Portrait)",
      description:
        "Phù hợp cho chụp cá nhân, gia đình, hoặc ảnh thẻ. Không gian nhỏ gọn, ánh sáng chuyên biệt.",
      minArea: 15,
      maxArea: 30,
      bufferTime: "2 giờ",
    },
    {
      id: "2",
      name: "Sự kiện & Thời trang",
      description:
        "Không gian rộng phù hợp cho concept thời trang, sự kiện nhỏ và set ánh sáng đa dạng.",
      minArea: 40,
      maxArea: 80,
      bufferTime: "4 giờ",
    },
  ]);

  const handleCreate = async (payload: Omit<StudioType, "id">) => {
    const newItem: StudioType = { id: Date.now().toString(), ...payload } as StudioType;
    setStudioTypes((prev) => [newItem, ...prev]);
    return newItem;
  };

  const handleUpdate = async (id: string, payload: Partial<StudioType>) => {
    let updatedItem: StudioType | null = null;
    setStudioTypes((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          updatedItem = { ...item, ...payload } as StudioType;
          return updatedItem;
        }
        return item;
      })
    );
    return updatedItem;
  };

  const handleDelete = async (id: string) => {
    setStudioTypes((prev) => prev.filter((x) => x.id !== id));
    return true;
  };

  return (
    <StudioTypesForm
      studioTypes={studioTypes}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}


