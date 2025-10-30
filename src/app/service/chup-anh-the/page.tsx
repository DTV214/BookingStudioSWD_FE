"use client";

import React from 'react';
import { Camera, CheckCircle, Clock, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChupAnhThePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header đơn giản */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Chụp Ảnh Thẻ Chuyên Nghiệp</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <Camera className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ Chụp Ảnh Thẻ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chụp ảnh thẻ chuyên nghiệp, đạt chuẩn quốc tế cho hộ chiếu, visa, căn cước công dân và các loại giấy tờ tùy thân khác
          </p>
        </div>

        {/* Thông tin chính */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face"
              alt="Chụp ảnh thẻ chuyên nghiệp"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tại sao chọn SWD Studio?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Chụp ảnh thẻ lấy ngay trong 15-30 phút</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Đảm bảo đúng kích thước và tiêu chuẩn quốc tế</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Hỗ trợ chỉnh sửa nhẹ nhàng, tự nhiên</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Phù hợp cho mọi loại giấy tờ và hồ sơ</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Không gian chụp thoải mái, chuyên nghiệp</span>
                </li>
              </ul>
              {/* Nút Book chúng tôi ngay ngay dưới danh sách */}
              <div className="mt-6">
                <Link href="/booking">
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Book chúng tôi ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Các gói dịch vụ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Các Gói Dịch Vụ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-green-500 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-green-600">Gói Cơ Bản</CardTitle>
                <div className="text-3xl font-bold text-gray-900">50.000đ</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Chụp 4 ảnh 3x4 hoặc 4x6
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Chỉnh sửa cơ bản
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Giao ảnh trong 15 phút
                  </li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full" variant="outline">
                    Chọn gói này
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Phổ biến
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-green-600">Gói Tiêu Chuẩn</CardTitle>
                <div className="text-3xl font-bold text-gray-900">80.000đ</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Chụp nhiều kiểu, chọn 2 ảnh
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Chỉnh sửa nâng cao
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    In 8 ảnh 3x4 và 4 ảnh 4x6
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Giao ảnh trong 30 phút
                  </li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Chọn gói này
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-green-600">Gói Cao Cấp</CardTitle>
                <div className="text-3xl font-bold text-gray-900">120.000đ</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Chụp nhiều kiểu, chọn 4 ảnh
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Chỉnh sửa chuyên nghiệp
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    In 12 ảnh 3x4 và 6 ảnh 4x6
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Kèm file mềm
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Giao ảnh trong 1 giờ
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

        {/* Quy trình chụp ảnh */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Quy Trình Chụp Ảnh</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Đặt lịch hẹn</h3>
              <p className="text-sm text-gray-600">Liên hệ hoặc đặt lịch trực tuyến</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Chuẩn bị</h3>
              <p className="text-sm text-gray-600">Đến studio, chuẩn bị trang phục phù hợp</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Chụp ảnh</h3>
              <p className="text-sm text-gray-600">Nhiếp ảnh gia hướng dẫn tạo dáng</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Hoàn thành</h3>
              <p className="text-sm text-gray-600">Chọn ảnh, chỉnh sửa và in ngay</p>
            </div>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="bg-green-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng chụp ảnh thẻ?</h2>
          <p className="text-xl mb-6 text-green-100">
            Liên hệ ngay để đặt lịch hoặc đến trực tiếp studio của chúng tôi
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-2" />
                Đặt lịch ngay
              </Button>
            </Link>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Clock className="w-5 h-5 mr-2" />
              Xem giờ mở cửa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChupAnhThePage;
