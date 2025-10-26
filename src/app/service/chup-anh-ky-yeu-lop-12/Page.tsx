"use client";

import React from 'react';
import { Camera, CheckCircle, Clock, Users, Star, GraduationCap, Sparkles, Heart, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChupAnhKyYeuLop12Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header đơn giản */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Chụp Ảnh Kỷ Yếu Lớp 12 - Lưu Giữ Thanh Xuân</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ Chụp Ảnh Kỷ Yếu Lớp 12
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lưu giữ những khoảnh khắc đáng nhớ nhất của tuổi học trò, đánh dấu cột mốc quan trọng trước khi bước vào tương lai
          </p>
        </div>

        {/* Thông tin chính - Layout mới */}
        <div className="mb-16">
          {/* Phần ưu điểm với layout dạng grid */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Tại sao chọn SWD Studio cho kỷ yếu lớp 12?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Concept độc đáo</h3>
                <p className="text-sm text-gray-600">Tạo nên những concept sáng tạo, phù hợp với tuổi học trò</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Ekip chuyên nghiệp</h3>
                <p className="text-sm text-gray-600">Nhiếp ảnh gia giàu kinh nghiệm với kỷ yếu học sinh</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chỉnh sửa nghệ thuật</h3>
                <p className="text-sm text-gray-600">Hậu kỳ chuyên nghiệp, tạo nên những bức ảnh đẹp mắt</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lưu giữ kỷ niệm</h3>
                <p className="text-sm text-gray-600">Tạo nên những kỷ niệm đẹp nhất của tuổi học trò</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Album kỷ yếu</h3>
                <p className="text-sm text-gray-600">Thiết kế album kỷ yếu đẹp mắt, lưu giữ trọn vẹn</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dịch vụ tận tâm</h3>
                <p className="text-sm text-gray-600">Chăm sóc khách hàng chu đáo, hỗ trợ tận tình</p>
              </div>
            </div>
          </div>

          {/* Phần hình ảnh và CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=face"
                alt="Chụp ảnh kỷ yếu lớp 12"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Khoảnh Khắc Thanh Xuân</h3>
                <p className="text-purple-100">Cùng bạn bè tạo nên những kỷ niệm đẹp nhất</p>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sẵn sàng lưu giữ kỷ niệm?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Hãy để chúng tôi giúp bạn tạo ra những bức ảnh kỷ yếu đẹp nhất, 
                lưu giữ trọn vẹn những khoảnh khắc đáng nhớ của tuổi học trò.
              </p>
              <div className="space-y-4">
                <Link href="/booking">
                  <Button 
                    size="lg" 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full lg:w-auto"
                  >
                    <Camera className="w-6 h-6 mr-3" />
                    Cùng chúng tôi giữ mãi thanh xuân nào
                  </Button>
                </Link>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Miễn phí tư vấn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Báo giá nhanh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Các gói dịch vụ - Layout mới */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Các Gói Kỷ Yếu Đặc Biệt</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chọn gói dịch vụ phù hợp với số lượng thành viên và phong cách kỷ yếu của lớp bạn
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gói Cơ Bản */}
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-purple-700">Gói Thanh Xuân</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">3.500.000đ</p>
                <p className="text-gray-500">/lớp (dưới 20 người)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Chụp 1 buổi (4 tiếng)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 1 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 1 nhiếp ảnh gia</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 50 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Album online</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/booking">
                  <Button className="w-full" variant="outline">
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Gói Tiêu Chuẩn */}
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-600 scale-105">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white bg-purple-600 py-2 rounded-t-lg -mx-6 -mt-6">Gói Kỷ Niệm Vàng</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">5.000.000đ</p>
                <p className="text-gray-500">/lớp (20-40 người)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Chụp 1 ngày (8 tiếng)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 2 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 1 nhiếp ảnh gia, 1 trợ lý</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 100 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Album online & in ấn</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Tặng 1 video ngắn</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/booking">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Gói Cao Cấp */}
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-purple-700">Gói Huyền Thoại</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">7.500.000đ</p>
                <p className="text-gray-500">/lớp (trên 40 người)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Chụp 2 ngày</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 3 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 2 nhiếp ảnh gia, 2 trợ lý</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> 200 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Album cao cấp & video</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-purple-500" /> Tặng ảnh in lớn</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/booking">
                  <Button className="w-full" variant="outline">
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Quy trình chụp ảnh - Layout mới */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quy Trình Chụp Ảnh Kỷ Yếu</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đảm bảo mỗi khoảnh khắc đều được ghi lại một cách hoàn hảo và đáng nhớ
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-purple-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Tư vấn & Lên ý tưởng</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Cùng lớp bạn xây dựng concept, chọn địa điểm và trang phục phù hợp</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-purple-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Thực hiện chụp ảnh</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Ekip chuyên nghiệp sẽ ghi lại những khoảnh khắc tự nhiên và đẹp nhất</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-purple-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hậu kỳ & Chỉnh sửa</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Chỉnh sửa ảnh chuyên nghiệp, đảm bảo chất lượng cao nhất</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-purple-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Bàn giao sản phẩm</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Giao album, ảnh in và file mềm đúng hẹn với chất lượng tối ưu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="bg-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng lưu giữ kỷ niệm?</h2>
          <p className="text-xl mb-6 text-purple-100">
            Liên hệ với chúng tôi ngay để được tư vấn và đặt lịch chụp kỷ yếu lớp 12!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-2" />
                Đặt lịch ngay
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              <Clock className="w-5 h-5 mr-2" />
              Xem giờ mở cửa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChupAnhKyYeuLop12Page;
