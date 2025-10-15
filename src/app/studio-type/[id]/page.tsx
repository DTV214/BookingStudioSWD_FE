"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import Sidebar from "@/components/studioType/Sidebar";
import StudioList from "@/components/studioType/StudioList";
import DescriptionBlock from "@/components/studioType/DescriptionBlock";
import LocationStudio from "@/components/studioType/LocationStudio";
import { StudioType } from "@/domain/models/studio-type/studioType";
import { Location } from "@/domain/models/studio-type/location";
import { getStudioTypes } from "@/domain/usecases/studioType/getStudioTypes";
import { getLocationsByType } from "@/domain/usecases/studioType/getLocationsByType";
import { getStudiosByType } from "@/domain/usecases/studioType/getStudiosByType";
import { motion } from "framer-motion";

export default function StudioTypeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [types, setTypes] = useState<StudioType[]>([]);
  const [selectedType, setSelectedType] = useState<StudioType | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Gọi danh sách loại studio
        const allTypes = await getStudioTypes();
        setTypes(allTypes);

        // Xác định loại hiện tại
        const currentType = allTypes.find((t) => t.id === id) ?? allTypes[0];
        setSelectedType(currentType);

        // Gọi location và studio theo loại
        if (currentType) {
          const locs = await getLocationsByType(currentType.id);
          setLocations(Array.isArray(locs) ? locs : []);
          await getStudiosByType(currentType.id); // StudioList xử lý riêng
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu chi tiết studio:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-10 h-10 border-4 border-green-300 border-t-green-700 rounded-full mr-3"
        />
        Đang tải dữ liệu...
      </div>
    );

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-green-50">
      {/* Sidebar trái */}
      <aside className="w-full md:w-1/4 border-r border-gray-200 bg-green-50/50 p-4">
        <Sidebar types={types} selectedId={id} />
      </aside>

      {/* Nội dung giữa */}
      <section className="flex-1 p-6 space-y-10">
        {selectedType ? (
          <>
            <DescriptionBlock type={selectedType} />

            {/* 🔹 LocationStudio nằm ngay bên dưới DescriptionBlock */}
            <LocationStudio studioTypeId={id} locations={locations} />
          </>
        ) : (
          <p className="text-gray-500">Đang tải thông tin...</p>
        )}
      </section>

      {/* Danh sách studio bên phải */}
      <aside className="w-full md:w-1/3 border-l border-gray-100 bg-gray-50 p-6">
        <StudioList studioTypeId={id} />
      </aside>
    </main>
  );
}
