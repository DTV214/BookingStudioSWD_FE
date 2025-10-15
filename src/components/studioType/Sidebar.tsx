"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { StudioType } from "@/domain/models/studio-type/studioType";

interface SidebarProps {
  types: StudioType[];
  selectedId: string;
}

export default function Sidebar({ types, selectedId }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const mockStudios = [
    { id: "s1", name: "Cộng Studio" },
    { id: "s2", name: "Tâm Studio" },
  ];

  return (
    <div className="space-y-2 relative">
      <h2 className="text-lg font-semibold mb-4 text-green-800">
        Loại hình studio
      </h2>
      {types.map((type) => (
        <div
          key={type.id}
          onMouseEnter={() => setHovered(type.id)}
          onMouseLeave={() => setHovered(null)}
          className="relative"
        >
          <Link href={`/studio-type/${type.id}`}>
            <motion.div
              whileHover={{ scale: 1.02, x: 4 }}
              className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer transition-all ${
                selectedId === type.id
                  ? "bg-green-100 text-green-800 font-semibold"
                  : "hover:bg-green-50 text-gray-700"
              }`}
            >
              <span>{type.name}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </motion.div>
          </Link>

          {/* Studio submenu */}
          {hovered === type.id && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-full top-0 ml-2 bg-white shadow-lg border rounded-xl p-3 w-56 z-10"
            >
              <h4 className="font-semibold text-sm text-green-700 mb-2">
                Studio trong loại
              </h4>
              {mockStudios.map((s) => (
                <p
                  key={s.id}
                  className="text-sm text-gray-700 hover:text-green-600 transition cursor-pointer"
                >
                  {s.name}
                </p>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
