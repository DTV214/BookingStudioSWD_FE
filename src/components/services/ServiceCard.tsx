// src/components/services/ServiceCard.tsx
"use client";

import { Service } from "@/domain/models/booking/Service";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

// Hàm format tiền tệ
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      className="flex flex-col justify-between h-full
                   bg-white rounded-xl overflow-hidden
                   border-transparent
                   transition-all duration-300 ease-in-out
                   shadow-lg hover:shadow-2xl hover:-translate-y-2"
    >
      <CardHeader>
        <CardTitle className="text-xl line-clamp-2 text-gray-900">
          {service.serviceName}
        </CardTitle>
        <CardDescription className="line-clamp-3 h-[60px] text-gray-600 pt-1">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-amber-600">
          {formatCurrency(service.serviceFee)}
        </p>
      </CardContent>
      <CardFooter>
        {/* Nút bấm gradient thu hút */}
        <Button
          asChild
          className="w-full group font-semibold text-white
                     bg-gradient-to-r from-amber-500 to-orange-500
                     hover:from-amber-600 hover:to-orange-600
                     transition-all duration-300 transform hover:scale-105"
        >
          <Link href={`/booking?service_id=${service.id}`}>
            <span className="flex items-center justify-center">
              Đặt lịch ngay
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform
                                 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
