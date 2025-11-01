"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  BookOpen,
  Paintbrush,
  Clock,
  Smile,
  CheckCircle,
  Users,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default function ChupAnhKyYeuLop9Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-rose-900">
      {/* Hero */}
      <section className="relative py-24 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-amber-600 text-white px-4 py-1.5 mb-4">Grade 9 Memories</Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">KỶ YẾU LỚP 9</h1>
            <p className="text-lg md:text-2xl text-amber-100 mb-6">Nhẹ nhàng, vui tươi và đáng nhớ — phong cách chụp phù hợp lứa tuổi.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking"><Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100"><Calendar className="w-5 h-5 mr-2"/>Đặt lịch</Button></Link>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-amber-700"><Clock className="w-5 h-5 mr-2"/>Xem giờ mở cửa</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {icon:GraduationCap,label:"Trang phục lớp"},
              {icon:Paintbrush,label:"Backdrop màu"},
              {icon:Users,label:"Chụp nhóm"},
              {icon:Smile,label:"Chụp cá nhân"}
            ].map(({icon:Icon,label},i)=> (
              <div key={i} className="rounded-2xl h-36 md:h-40 bg-white/10 border border-white/20 flex flex-col items-center justify-center text-white">
                <Icon className="w-7 h-7 mb-2"/>
                <span className="text-sm opacity-90">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages grid 3 */}
      <section className="px-6 py-16 bg-black/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {["Basic","Sweet","Memorable"].map((title,i)=> (
            <Card key={i} className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <ul className="space-y-2 text-amber-100 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Trang điểm nhẹ nhàng</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Chụp tại trường</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Ảnh chỉnh màu</li>
                </ul>
                <Link href="/booking"><Button className="bg-white text-amber-700 hover:bg-gray-100 w-full">Chọn gói</Button></Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl p-12 bg-gradient-to-r from-amber-600 to-rose-600">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Ghi lại kỷ niệm tuổi 15</h3>
            <p className="text-amber-100 mb-6">Chúng tôi giúp bạn lưu lại những nụ cười và tình bạn đáng quý.</p>
            <Link href="/booking"><Button size="lg" className="bg-white text-amber-700 hover:bg-gray-100">Đặt lịch ngay</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

