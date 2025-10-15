"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface LocationStudioProps {
  studioTypeId: string;
  locations: {
    id: string;
    locationName: string;
    address: string;
    latitude?: string;
    longitude?: string;
  }[];
}

export default function LocationStudio({
  studioTypeId,
  locations,
}: LocationStudioProps) {
  if (!locations || locations.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        Chưa có địa điểm nào được thêm cho loại studio này.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
    >
      <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
        <MapPin className="text-green-700 w-5 h-5" /> Địa điểm hoạt động
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-xl bg-gradient-to-br from-green-100 to-green-50 p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <MapPin className="text-green-700 w-4 h-4" />
                <span className="font-medium text-green-900">
                  {loc.locationName}
                </span>
              </div>
              <p className="text-sm text-gray-600">{loc.address}</p>
              <div className="text-xs text-gray-500 mt-1">
                {loc.latitude && loc.longitude
                  ? `Tọa độ: ${loc.latitude}, ${loc.longitude}`
                  : "Tọa độ chưa cập nhật"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
