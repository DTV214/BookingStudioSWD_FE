"use client";

import React, { useState } from "react";
import ServiceManagement from "@/components/AdminPage/ServiceManagement";
import { ServiceData } from "@/components/AdminPage/ServiceManagement";

// Mock data for services
const mockServices: ServiceData[] = [
  {
    id: "1",
    serviceName: "Thuê bộ đèn Flash Studio (3 bộ)",
    serviceFee: 150000,
    description: "Bao gồm 3 đèn flash Godox/Elinchrom cơ bản, softbox và chân đèn.",
    status: "AVAILABLE"
  },
  {
    id: "2", 
    serviceName: "Dịch vụ Makeup Artist",
    serviceFee: 500000,
    description: "Makeup chuyên nghiệp cho chụp ảnh studio, bao gồm cả trang điểm và tạo kiểu tóc.",
    status: "AVAILABLE"
  },
  {
    id: "3",
    serviceName: "Thuê trang phục chụp ảnh",
    serviceFee: 200000,
    description: "Bộ sưu tập trang phục đa dạng cho nam và nữ, phù hợp với nhiều concept chụp ảnh.",
    status: "AVAILABLE"
  },
  {
    id: "4",
    serviceName: "Máy quay phim chuyên nghiệp",
    serviceFee: 800000,
    description: "Máy quay Canon/Sony chuyên nghiệp với ống kính đa dạng cho quay video chất lượng cao.",
    status: "UNAVAILABLE"
  },
  {
    id: "5",
    serviceName: "Máy chụp hình DSLR",
    serviceFee: 300000,
    description: "Máy ảnh Canon/Nikon DSLR với ống kính tele và wide angle cho chụp ảnh studio.",
    status: "AVAILABLE"
  },
  {
    id: "6",
    serviceName: "Đạo cụ chụp ảnh",
    serviceFee: 100000,
    description: "Bộ đạo cụ đa dạng: ghế, bàn, hoa giả, phông nền và các vật dụng trang trí khác.",
    status: "AVAILABLE"
  }
];

// Service Container Component - Updated
export default function ServiceContainer() {
  const [services, setServices] = useState<ServiceData[]>(mockServices);

  const handleUpdateService = async (id: string, serviceData: Partial<Omit<ServiceData, 'id'>>): Promise<ServiceData> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedServices = services.map(service => 
          service.id === id ? { ...service, ...serviceData } : service
        );
        setServices(updatedServices);
        
        const updatedService = updatedServices.find(service => service.id === id);
        resolve(updatedService!);
      }, 500);
    });
  };

  const handleDeleteService = async (id: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setServices(services.filter(service => service.id !== id));
        resolve();
      }, 500);
    });
  };

  return (
    <ServiceManagement
      services={services}
      onUpdateService={handleUpdateService}
      onDeleteService={handleDeleteService}
    />
  );
}
