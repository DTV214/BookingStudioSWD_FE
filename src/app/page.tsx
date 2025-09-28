import About from "@/components/homepage/About";
import AlbumBanner from "@/components/homepage/AlbumBanner";
import BackToTop from "@/components/homepage/BackToTop";
import CategoryBanner from "@/components/homepage/CategoryBanner";
import HeroBanner from "@/components/homepage/HeroBanner";
import NewsBanner from "@/components/homepage/NewsBanner";
import ServiceBanner from "@/components/homepage/ServiceBanner";
import TextInformationBanner from "@/components/homepage/TextInformationBanner";
import React from "react";


export default function Homepage() {
  return (
    <div>
      <HeroBanner />
      <About />
      <CategoryBanner />
      <TextInformationBanner />
      <AlbumBanner />
      <NewsBanner />
      <ServiceBanner />
      <BackToTop />
    </div>
  );
}
