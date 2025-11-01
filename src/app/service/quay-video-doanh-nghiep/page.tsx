"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Video,
  Camera,
  CheckCircle,
  Clock,
  Target,
  PieChart,
  Users,
  Rocket,
  Phone,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default function QuayVideoDoanhNghiepPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-950 via-slate-900 to-sky-900">
      {/* Hero */}
      <section className="relative py-24 md:py-36">
        <div className="absolute inset-0 bg-grid-white/[0.06] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <Badge className="bg-sky-600 text-white px-4 py-1.5 mb-4">Corporate Video</Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            QUAY VIDEO DOANH NGHIỆP
          </h1>
          <p className="text-lg md:text-2xl text-sky-200 max-w-3xl mx-auto">
            Truyền tải thông điệp thương hiệu bằng video chuyên nghiệp: TVC, Profile, Event, Viral.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-sky-700 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" /> Đặt lịch tư vấn
              </Button>
            </Link>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-sky-700">
              <Phone className="w-5 h-5 mr-2" /> Gọi ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center mb-5">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Định hướng nội dung</h3>
              <p className="text-sky-100">Tư vấn concept phù hợp mục tiêu truyền thông và đối tượng khách hàng.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-5">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Thiết bị điện ảnh</h3>
              <p className="text-sky-100">Máy quay 4K, gimbal, slider, lighting kit đáp ứng mọi bối cảnh.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center mb-5">
                <PieChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hiệu quả đo lường</h3>
              <p className="text-sky-100">Theo dõi KPI và tối ưu nội dung cho đa nền tảng social & ads.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Quy trình thực hiện</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[{icon:Briefcase,label:"Brief & Kịch bản"},{icon:Users,label:"Casting & Lên ekip"},{icon:Video,label:"Quay & Đạo diễn"},{icon:Rocket,label:"Dựng & Bàn giao"}].map(({icon:Icon,label},i)=> (
              <div key={i} className="rounded-2xl p-6 border border-white/15 bg-gradient-to-br from-white/10 to-transparent text-white text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[{title:"Starter",price:"6.9 triệu",color:"from-sky-600 to-cyan-600"},{title:"Business",price:"14.9 triệu",color:"from-violet-600 to-fuchsia-600"},{title:"Premium",price:"29.9 triệu",color:"from-emerald-600 to-teal-600"}].map((p,i)=> (
            <Card key={i} className="bg-white/10 border-white/20 text-white overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${p.color}`} />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-3xl font-extrabold mb-4">{p.price}</p>
                <ul className="space-y-2 text-sky-100 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Kịch bản cơ bản</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Quay 4K 1 ngày</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Dựng & color grading</li>
                </ul>
                <Link href="/booking">
                  <Button className="bg-white text-sky-700 hover:bg-gray-100 w-full">Chọn gói này</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl p-12 bg-gradient-to-r from-sky-600 to-violet-600">
            <h3 className="text-4xl font-bold text-white mb-4">Sẵn sàng kể câu chuyện thương hiệu?</h3>
            <p className="text-sky-100 mb-6">Hãy để chúng tôi đồng hành tạo nên video hiệu quả cho doanh nghiệp của bạn.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-white text-sky-700 hover:bg-gray-100"><Calendar className="w-5 h-5 mr-2"/>Đặt lịch ngay</Button>
              </Link>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-sky-700"><Clock className="w-5 h-5 mr-2"/>Xem giờ mở cửa</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
