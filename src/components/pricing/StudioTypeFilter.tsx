"use client";

import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { StudioType } from "@/domain/models/studio-type/studioType";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";

interface Props {
  studioTypes: StudioType[];
  isLoading: boolean;
  currentStudioTypeId: string;
}

export default function StudioTypeFilter({
  studioTypes,
  isLoading,
  currentStudioTypeId,
}: Props) {
  // Hiển thị Skeleton loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        // Không loop để người dùng biết đã hết lựa chọn
      }}
      className="w-full"
    >
      <CarouselContent>
        {studioTypes.map((studioType) => (
          // 3 cột trên desktop, 2 trên tablet
          <CarouselItem
            key={studioType.id}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              {/* Thêm scroll={false} để không bị cuộn lên đầu trang */}
              <Link href={`/pricing/${studioType.id}`} scroll={false}>
                <Card
                  className={cn(
                    "transition-all duration-200 cursor-pointer hover:shadow-md",
                    // Làm nổi bật mục đang được chọn
                    studioType.id === currentStudioTypeId
                      ? "bg-purple-600 text-white"
                      : "hover:bg-muted"
                  )}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        {studioType.name}
                      </CardTitle>
                      <p className="text-sm opacity-80">
                        {/* Cắt ngắn mô tả nếu quá dài */}
                        {studioType.description.length > 50
                          ? studioType.description.substring(0, 50) + "..."
                          : studioType.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-12" />
      <CarouselNext className="mr-12" />
    </Carousel>
  );
}
