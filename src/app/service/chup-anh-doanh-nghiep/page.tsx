"use client";

import React from 'react';
import { Camera, CheckCircle, Clock, Users, Star, Briefcase, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChupAnhDoanhNghiepPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header đơn giản */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Chụp Ảnh Doanh Nghiệp Chuyên Nghiệp</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ Chụp Ảnh Doanh Nghiệp
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chụp ảnh doanh nghiệp chuyên nghiệp, tạo dựng hình ảnh thương hiệu mạnh mẽ cho công ty, nhân viên và lãnh đạo
          </p>
        </div>

        {/* Thông tin chính - Layout mới */}
        <div className="mb-16">
          {/* Phần ưu điểm với layout dạng grid */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Tại sao chọn SWD Studio?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chuyên nghiệp quốc tế</h3>
                <p className="text-sm text-gray-600">Chụp ảnh doanh nghiệp đạt chuẩn quốc tế</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Đội ngũ giàu kinh nghiệm</h3>
                <p className="text-sm text-gray-600">Nhiếp ảnh gia chuyên về doanh nghiệp</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Trang thiết bị hiện đại</h3>
                <p className="text-sm text-gray-600">Studio chuyên nghiệp, thiết bị cao cấp</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Tư vấn concept</h3>
                <p className="text-sm text-gray-600">Hỗ trợ styling và concept phù hợp</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Giao ảnh nhanh</h3>
                <p className="text-sm text-gray-600">Đúng hẹn, chất lượng cao</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dịch vụ tận tâm</h3>
                <p className="text-sm text-gray-600">Chăm sóc khách hàng chu đáo</p>
              </div>
            </div>
          </div>

          {/* Phần hình ảnh và CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop&crop=face"
                alt="Chụp ảnh doanh nghiệp chuyên nghiệp"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Chụp ảnh doanh nghiệp</h3>
                <p className="text-blue-100">Tạo dựng hình ảnh thương hiệu mạnh mẽ</p>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Sẵn sàng nâng tầm thương hiệu?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Hãy để chúng tôi giúp bạn tạo ra những bức ảnh doanh nghiệp chuyên nghiệp, 
                phản ánh đúng giá trị và tầm nhìn của công ty.
              </p>
              <div className="space-y-4">
                <Link href="/booking">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full lg:w-auto"
                  >
                    <Camera className="w-6 h-6 mr-3" />
                    Book chúng tôi ngay
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Các Gói Dịch Vụ</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chọn gói dịch vụ phù hợp với quy mô và nhu cầu của doanh nghiệp bạn
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-blue-600">Gói Cơ Bản</CardTitle>
                <div className="text-3xl font-bold text-gray-900">2.500.000đ</div>
                <p className="text-sm text-gray-500">Cho nhóm 5-10 người</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chụp ảnh nhóm 5-10 người
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chụp ảnh cá nhân từng thành viên
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chỉnh sửa cơ bản
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Giao ảnh trong 3-5 ngày
                  </li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full" variant="outline">
                    Chọn gói này
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Phổ biến
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-blue-600">Gói Tiêu Chuẩn</CardTitle>
                <div className="text-3xl font-bold text-gray-900">4.500.000đ</div>
                <p className="text-sm text-gray-500">Cho nhóm 10-20 người</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chụp ảnh nhóm 10-20 người
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chụp ảnh cá nhân + nhóm nhỏ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chỉnh sửa nâng cao
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Tư vấn concept & styling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Giao ảnh trong 2-3 ngày
                  </li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Chọn gói này
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-blue-600">Gói Cao Cấp</CardTitle>
                <div className="text-3xl font-bold text-gray-900">7.500.000đ</div>
                <p className="text-sm text-gray-500">Cho nhóm 20+ người</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chụp ảnh nhóm không giới hạn
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chụp ảnh cá nhân + nhóm + lãnh đạo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Chỉnh sửa chuyên nghiệp
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Tư vấn concept & styling chuyên sâu
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Giao ảnh trong 1-2 ngày
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Album ảnh cao cấp
                  </li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full" variant="outline">
                    Chọn gói này
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quy trình chụp ảnh - Layout mới */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quy Trình Chụp Ảnh Doanh Nghiệp</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quy trình chuyên nghiệp, đảm bảo chất lượng và hiệu quả tối ưu
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Tư vấn & Lên kế hoạch</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Tư vấn concept, thời gian và địa điểm phù hợp với nhu cầu doanh nghiệp</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-blue-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Chuẩn bị & Setup</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Setup studio, ánh sáng và trang thiết bị chuyên nghiệp theo concept đã thống nhất</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-blue-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Chụp ảnh</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Chụp ảnh nhóm, cá nhân và các góc chụp khác nhau với chất lượng cao</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-blue-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Chỉnh sửa & Giao ảnh</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Chỉnh sửa chuyên nghiệp và giao ảnh đúng hẹn với chất lượng tối ưu</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="bg-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng chụp ảnh doanh nghiệp?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Liên hệ ngay để được tư vấn và đặt lịch chụp ảnh doanh nghiệp chuyên nghiệp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-2" />
                Đặt lịch ngay
              </Button>
            </Link>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Clock className="w-5 h-5 mr-2" />
              Xem giờ mở cửa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChupAnhDoanhNghiepPage;
