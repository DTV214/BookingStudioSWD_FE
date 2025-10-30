"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Users, 
  Clock, 
  Star, 
  CheckCircle, 
  Lightbulb,
  Palette,
  Zap,
  Award,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import Link from "next/link";

const ChupAnhStudioPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        
        {/* Studio Equipment Pattern */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div className="absolute bottom-32 left-1/4 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center">
          <Palette className="w-7 h-7 text-white" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-sm font-medium mb-4">
              Professional Studio
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              CHỤP ẢNH STUDIO
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Không gian chuyên nghiệp với thiết bị hiện đại, tạo nên những bức ảnh hoàn hảo
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Camera className="w-5 h-5 mr-2" />
                Đặt lịch chụp
              </Button>
            </Link>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600">
              <Clock className="w-5 h-5 mr-2" />
              Xem giờ mở cửa
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tại sao chọn studio của chúng tôi?
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Với hơn 10 năm kinh nghiệm và trang thiết bị hiện đại nhất
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Thiết bị chuyên nghiệp</h3>
                <p className="text-purple-100">
                  Camera full-frame, đèn studio cao cấp, backdrop đa dạng
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Ekip chuyên nghiệp</h3>
                <p className="text-purple-100">
                  Photographer và makeup artist có kinh nghiệm lâu năm
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Chất lượng đảm bảo</h3>
                <p className="text-purple-100">
                  Cam kết 100% hài lòng với từng bức ảnh
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Studio Spaces Section */}
      <div className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Không gian studio đa dạng
            </h2>
            <p className="text-xl text-purple-200">
              Từ studio nhỏ ấm cúng đến studio lớn sang trọng
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Studio 1 */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Studio VIP</h3>
                  <p className="text-purple-200">50m² - Thiết bị cao cấp</p>
                </div>
              </div>
              <ul className="space-y-3 text-purple-100">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Đèn studio Profoto
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Backdrop không giới hạn
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Phòng thay đồ riêng
                </li>
              </ul>
            </div>

            {/* Studio 2 */}
            <div className="bg-gradient-to-br from-blue-600/20 to-green-600/20 rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Studio Standard</h3>
                  <p className="text-purple-200">30m² - Tiết kiệm chi phí</p>
                </div>
              </div>
              <ul className="space-y-3 text-purple-100">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Đèn studio cơ bản
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Backdrop cơ bản
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  Phòng thay đồ chung
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sẵn sàng tạo nên những bức ảnh tuyệt vời?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Liên hệ ngay để được tư vấn và đặt lịch chụp studio chuyên nghiệp!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Calendar className="w-5 h-5 mr-2" />
                  Đặt lịch ngay
                </Button>
              </Link>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600">
                <Phone className="w-5 h-5 mr-2" />
                Liên hệ tư vấn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChupAnhStudioPage;

