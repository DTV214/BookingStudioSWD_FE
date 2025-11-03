"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { getStudiosByType } from "@/domain/usecases/studioType/getStudiosByType";
import { Studio } from "@/domain/models/studio-type/studio";

interface StudioListProps {
  studioTypeId: string;
}

export default function StudioList({ studioTypeId }: StudioListProps) {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudios() {
      try {
        const data = await getStudiosByType(studioTypeId);
        setStudios(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi khi tải danh sách studio:", err);
        setStudios([]);
      } finally {
        setLoading(false);
      }
    }
    fetchStudios();
  }, [studioTypeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Đang tải danh sách studio...
      </div>
    );
  }

  if (studios.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        Không có studio nào thuộc loại này.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-bold text-green-800 mb-2">
        Studio thuộc loại này
      </h3>

      <div className="grid grid-cols-1 gap-5">
        {studios.map((studio) => (
          <motion.div
            key={studio.id}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all bg-white border border-gray-100"
          >
            {studio.imageUrl ? (
              <div className="relative">
                <Image
                  src={studio.imageUrl}
                  alt={studio.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-700 shadow">
                  {studio.locationName ?? "Chưa xác định"}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-100 to-green-200 h-48 flex items-center justify-center">
                <i className="fa-solid fa-camera text-green-700 text-4xl opacity-80"></i>
              </div>
            )}

            <div className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-gray-900 text-base">
                  {studio.name}
                </h4>
                <h4 className="font-semibold text-gray-900 text-base">
                  {studio.id}
                </h4>
                <p className="text-sm text-gray-500">
                  {studio.locationName ?? "Đang cập nhật"}
                </p>
              </div>
              {/* <div className="flex items-center gap-1 text-pink-600">
                <Heart size={16} fill="#e91e63" />
                <span className="text-xs font-medium">
                  {studio.likes ?? Math.floor(Math.random() * 400 + 100)}
                </span>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
