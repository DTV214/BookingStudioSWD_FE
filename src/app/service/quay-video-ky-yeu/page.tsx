"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Film,
  PartyPopper,
  Users,
  Sparkles,
  Clock,
  Heart,
  CheckCircle,
  Camera,
  Music2,
  Calendar
} from "lucide-react";
import Link from "next/link";

export default function QuayVideoKyYeuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-fuchsia-900 to-violet-900">
      {/* Hero */}
      <section className="relative py-24 md:py-36 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.08),transparent_40%)]" />
        <div className="relative px-6 max-w-5xl mx-auto">
          <Badge className="bg-pink-600 text-white px-4 py-1.5 mb-4">Graduation Video</Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">QUAY VIDEO KỶ YẾU</h1>
          <p className="text-lg md:text-2xl text-pink-100 mb-6">
            Lưu giữ khoảnh khắc tuổi trẻ bằng những thước phim cảm xúc và sáng tạo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-pink-700 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2"/> Đặt lịch ngay
              </Button>
            </Link>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-pink-700">
              <Clock className="w-5 h-5 mr-2"/> Xem giờ mở cửa
            </Button>
          </div>
        </div>
      </section>

      {/* Mood blocks */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[{icon:Sparkles,title:"Sáng tạo concept",desc:"Từ retro, học đường đến nghệ thuật điện ảnh"},{icon:Users,title:"Đồng hành cùng lớp",desc:"Ekip nhiệt tình, bắt trọn khoảnh khắc tự nhiên"},{icon:Music2,title:"Âm nhạc cảm xúc",desc:"Chọn nhạc & nhịp dựng phù hợp câu chuyện lớp"}].map(({icon:Icon,title,desc},i)=> (
            <Card key={i} className="bg-white/10 border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-white/15 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-pink-100">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-16 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Hành trình kỷ yếu</h2>
          <div className="space-y-6">
            {["Lên kịch bản & phân vai","Quay tại trường & địa điểm đẹp","Dựng phim & chỉnh màu","Chiếu phim tốt nghiệp"].map((step,i)=> (
              <div key={i} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-white/20 text-white flex items-center justify-center font-bold">{i+1}</div>
                <p className="text-white/90">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages - 2-column emphasis */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-pink-600/20 to-violet-600/20 border-white/20 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Gói Classic</h3>
              <ul className="space-y-2 text-pink-100 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Quay 1 ngày | 1 máy</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>MV 3-4 phút</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Color grade cơ bản</li>
              </ul>
              <Link href="/booking"><Button className="bg-white text-pink-700 hover:bg-gray-100 w-full">Chọn gói</Button></Link>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Gói Cinema</h3>
              <ul className="space-y-2 text-pink-100 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Quay 2 ngày | 2 máy</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>MV 5-6 phút + teaser</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-emerald-400 mr-2"/>Color grade nâng cao</li>
              </ul>
              <Link href="/booking"><Button className="bg-white text-pink-700 hover:bg-gray-100 w-full">Chọn gói</Button></Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl p-12 bg-gradient-to-r from-pink-600 to-violet-600">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Lưu giữ tuổi trẻ bằng video</h3>
            <p className="text-pink-100 mb-6">Chúng tôi sẽ biến những khoảnh khắc rực rỡ thành thước phim đáng nhớ.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking"><Button size="lg" className="bg-white text-pink-700 hover:bg-gray-100"><Film className="w-5 h-5 mr-2"/>Đặt lịch</Button></Link>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-pink-700"><Clock className="w-5 h-5 mr-2"/>Xem giờ mở cửa</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

