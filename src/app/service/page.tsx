"use client"; // <--- THÊM DÒNG NÀY Ở ĐẦU FILE PAGE (HOẶC TÁCH COMPONENT)

import { Service } from "@/domain/models/booking/Service";

// Import các component UI
// import { ServiceHeroBanner } from "@/components/services/ServiceHeroBanner";
import { ServiceIntro } from "@/components/services/ServiceIntro";
import { ServiceList } from "@/components/services/ServiceList";
import { NewsBanner } from "@/components/services/NewsBanner";
import { Skeleton } from "@/components/ui/skeleton";

// --- Import React hooks ---
import { useEffect, useState } from "react";
import { getAvailableServicesUseCase } from "@/domain/usecases/service/getAvailableServices";
import LatestNews from "@/components/pricing/LatestNews";
import PricingHero from "@/components/pricing/PricingHero";
import SeviceHeroBanner from "@/components/services/ServiceHeroBanner";

// Component tải (Loading) cho danh sách service
function ServiceListLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Component xử lý việc fetch và hiển thị data (Đã chuyển sang Client Component)
function ServiceDataComponent() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        const data = await getAvailableServicesUseCase();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Không thể tải được danh sách dịch vụ.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []); // Chạy 1 lần khi component mount

  if (isLoading) {
    return <ServiceListLoading />;
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  if (services.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        Hiện chưa có dịch vụ nào.
      </p>
    );
  }

  return <ServiceList services={services} />;
}

// Page chính bây giờ chỉ là layout
export default function ServicesPage() {
  return (
    <main className="flex flex-col items-center overflow-x-hidden">
      {/* 1. Hero Banner */}
      <SeviceHeroBanner />

      {/* 2. Banner giới thiệu */}
      <ServiceIntro />

      {/* 3. Phần Service List (Carousel) */}
      <section
        id="service-section"
        className="w-full max-w-7xl py-12 md:py-20 px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Dịch Vụ Của Chúng Tôi
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-10">
          Trải nghiệm chuyên nghiệp - Chất lượng hàng đầu
        </p>

        {/* Component này giờ sẽ tự fetch data ở client */}
        <ServiceDataComponent />
      </section>

      {/* 4. News Banner */}
      <LatestNews />
    </main>
  );
}
