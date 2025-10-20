"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

// --- CÁC IMPORTS CẦN THIẾT ---
import { StudioType } from "@/domain/models/studio-type/studioType";
import studioTypeService from "@/infrastructure/api/service/studioTypeService";
import { PriceTable } from "@/domain/models/priceTable/priceTable";
import { PriceRule } from "@/domain/models/priceTable/priceRule";
import { getPriceTablesByStudioTypeUseCase } from "@/domain/usecases/priceTable/getPriceTablesByStudioType";
import { getPriceRulesUseCase } from "@/domain/usecases/priceTable/getPriceRules";

// --- IMPORT CÁC COMPONENT GIAO DIỆN ---
import StudioTypeFilter from "@/components/pricing/StudioTypeFilter"; // <-- Bộ lọc mới
import PricingSidebar from "@/components/pricing/PricingSidebar";
import PriceRuleDisplay from "@/components/pricing/PriceRuleDisplay";
import PricingHero from "@/components/pricing/PricingHero";
import EventCarousel from "@/components/pricing/EventCarousel";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import CustomerReviews from "@/components/pricing/CustomerReviews";
import FeatureStaircase from "@/components/pricing/FeatureStaircase";
import LatestNews from "@/components/pricing/LatestNews";

// Hằng số cho key của localStorage
const STUDIO_TYPES_CACHE_KEY = "studioTypesCache";

function PricingPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const studioTypeId = params.studioTypeId as string;
  const selectedPriceTableId = searchParams.get("table");

  // --- THÊM STATE CHO STUDIO TYPES ---
  const [studioTypes, setStudioTypes] = useState<StudioType[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);

  // State cho bảng giá và quy tắc giá
  const [priceTables, setPriceTables] = useState<PriceTable[]>([]);
  const [isTablesLoading, setIsTablesLoading] = useState(false);
  const [priceRules, setPriceRules] = useState<PriceRule[]>([]);
  const [isRulesLoading, setIsRulesLoading] = useState(false);

  // --- THÊM useEffect ĐỂ LẤY STUDIO TYPES ---
  useEffect(() => {
    async function loadStudioTypes() {
      setIsLoadingTypes(true);
      try {
        const cachedTypesJSON = localStorage.getItem(STUDIO_TYPES_CACHE_KEY);
        if (cachedTypesJSON) {
          setStudioTypes(JSON.parse(cachedTypesJSON));
        } else {
          const data = await studioTypeService.getStudioTypes();
          setStudioTypes(data);
          localStorage.setItem(STUDIO_TYPES_CACHE_KEY, JSON.stringify(data));
        }
      } catch (err) {
        console.error("Failed to load studio types:", err);
      } finally {
        setIsLoadingTypes(false);
      }
    }
    loadStudioTypes();
  }, []);

  // useEffect để lấy Price Tables
  useEffect(() => {
    if (studioTypeId) {
      async function fetchPriceTables() {
        setIsTablesLoading(true);
        try {
          const data = await getPriceTablesByStudioTypeUseCase(studioTypeId);
          setPriceTables(data);
        } catch (error) {
          console.error("Failed to fetch price tables:", error);
        } finally {
          setIsTablesLoading(false);
        }
      }
      fetchPriceTables();
    }
  }, [studioTypeId]);

  // useEffect để lấy Price Rules
  useEffect(() => {
    if (studioTypeId && selectedPriceTableId) {
      async function fetchPriceRules() {
        setIsRulesLoading(true);
        setPriceRules([]);
        try {
          const data = await getPriceRulesUseCase(
            studioTypeId,
            selectedPriceTableId!
          );
          setPriceRules(data);
        } catch (error) {
          console.error("Failed to fetch price rules:", error);
        } finally {
          setIsRulesLoading(false);
        }
      }
      fetchPriceRules();
    } else {
      setPriceRules([]);
    }
  }, [studioTypeId, selectedPriceTableId]);

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* 1. Hero Banner */}
      <PricingHero />
      <div
        id="pricing-section"
        className="container mx-auto max-w-7xl space-y-12"
      >
        {/* 2. MỚI: Khối bộ lọc Studio Type */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Chọn loại Studio bạn quan tâm
          </h2>
          <StudioTypeFilter
            studioTypes={studioTypes}
            isLoading={isLoadingTypes}
            currentStudioTypeId={studioTypeId}
          />
        </div>

        {/* 3. Phần Bảng giá chính */}
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cột 1: Sidebar */}
            <aside className="w-full md:w-1/3 lg:w-1/4">
              {isTablesLoading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <PricingSidebar
                  priceTables={priceTables}
                  currentStudioTypeId={studioTypeId}
                  selectedPriceTableId={selectedPriceTableId}
                />
              )}
            </aside>

            {/* Cột 2: Nội dung chính */}
            <main className="w-full md:w-2/3 lg:w-3/4">
              <PriceRuleDisplay
                priceRules={priceRules}
                isLoading={isRulesLoading}
                hasSelectedTable={!!selectedPriceTableId}
              />
            </main>
          </div>
        </div>

        {/* 4. Banner kêu gọi Booking */}
        <div className="container mx-auto max-w-7xl">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-8 md:p-12 text-white shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">Sẵn sàng trải nghiệm?</h2>
                <p className="text-lg text-purple-100 mt-2">
                  Chọn gói giá phù hợp và đặt lịch studio của bạn ngay hôm nay!
                </p>
              </div>
              <Button
                asChild // Dùng asChild để Link nhận style của Button
                size="lg"
                className="bg-white text-purple-600 font-bold hover:bg-gray-100 
                         px-8 py-6 text-base rounded-full 
                         transition-all duration-300 hover:scale-105 shrink-0"
              >
                <Link href="/booking">
                  Booking ngay
                  <CalendarCheck className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Carousel Sự kiện/Quảng cáo */}
      <EventCarousel />
      {/* 6. Đánh giá của khách hàng */}
      <CustomerReviews />
      {/* 7. Bố cục cầu thang */}
      <FeatureStaircase />
      {/* 8. Tin tức */}
      <LatestNews />
      {/* 9. FAQ */}
      <PricingFAQ />
    </div>
  );
}

// Bọc component chính bằng Suspense
export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto max-w-7xl py-8">Đang tải...</div>
      }
    >
      <PricingPageContent />
    </Suspense>
  );
}
