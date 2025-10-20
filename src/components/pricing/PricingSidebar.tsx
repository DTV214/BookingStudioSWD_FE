"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Shadcn
import { Button } from "@/components/ui/button"; // Shadcn
import { cn } from "@/lib/utils"; // file utils mặc định của Shadcn
import { PriceTable } from "@/domain/models/priceTable/priceTable";
import { CalendarCheck, CalendarClock } from "lucide-react";
interface Props {
  priceTables: PriceTable[];
  currentStudioTypeId: string;
  selectedPriceTableId: string | null;
}

export default function PricingSidebar({
  priceTables,
  currentStudioTypeId,
  selectedPriceTableId,
}: Props) {
  // Phân loại bảng giá theo 2 nhóm
  const { happening, comingSoon } = useMemo(() => {
    return priceTables.reduce(
      (acc, table) => {
        if (table.status === "IS_HAPPENING") {
          acc.happening.push(table);
        } else if (table.status === "COMING_SOON") {
          acc.comingSoon.push(table);
        }
        return acc;
      },
      { happening: [] as PriceTable[], comingSoon: [] as PriceTable[] }
    );
  }, [priceTables]);

  // Hàm render 1 mục bảng giá
  const renderTableLink = (table: PriceTable) => (
    <Button
      key={table.id}
      asChild
      variant="ghost"
      className={cn(
        "w-full justify-start font-normal text-base", // <-- Tăng font
        "transition-all duration-200 hover:pl-6", // <-- Thêm hiệu ứng hover
        table.id === selectedPriceTableId
          ? "bg-accent font-semibold text-accent-foreground"
          : "text-muted-foreground"
      )}
    >
      {/* --- SỬA Ở ĐÂY: Thêm scroll={false} --- */}
      <Link
        href={`/pricing/${currentStudioTypeId}?table=${table.id}`}
        scroll={false}
      >
        Bảng giá (Từ {new Date(table.startDate).toLocaleDateString("vi-VN")})
      </Link>
    </Button>
  );

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-lg sticky top-24">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">Các Bảng Giá</h3>
      </div>
      <Accordion type="multiple" defaultValue={["happening", "coming_soon"]}>
        {/* Nhóm ĐANG ÁP DỤNG */}
        <AccordionItem value="happening" className="border-t px-6">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-green-500" />
              Đang áp dụng
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 flex flex-col gap-1">
            {happening.length > 0 ? (
              happening.map(renderTableLink)
            ) : (
              <p className="text-sm text-muted-foreground p-2">
                Không có bảng giá nào.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Nhóm SẮP ÁP DỤNG */}
        <AccordionItem value="coming_soon" className="border-t px-6">
          <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            <div className="flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-blue-500" />
              Sắp áp dụng
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4 flex flex-col gap-1">
            {comingSoon.length > 0 ? (
              comingSoon.map(renderTableLink)
            ) : (
              <p className="text-sm text-muted-foreground p-2">
                Không có bảng giá nào.
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
