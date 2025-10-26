"use client";

import React from 'react';
import { Camera, CheckCircle, Clock, Users, Star, GraduationCap, Sparkles, Heart, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChupAnhKyYeuDaiHocPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header đơn giản */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Chụp Ảnh Kỷ Yếu Đại Học - Đánh Dấu Cột Mốc Quan Trọng</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ Chụp Ảnh Kỷ Yếu Đại Học
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lưu giữ những khoảnh khắc đáng nhớ nhất của thời sinh viên, đánh dấu cột mốc quan trọng trong cuộc đời
          </p>
        </div>

        {/* Thông tin chính - Layout mới với nhiều hình ảnh */}
        <div className="mb-16">
          {/* Phần ưu điểm với layout dạng grid */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Tại sao chọn SWD Studio cho kỷ yếu đại học?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chuyên nghiệp cao cấp</h3>
                <p className="text-sm text-gray-600">Nhiếp ảnh gia giàu kinh nghiệm với kỷ yếu sinh viên</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Concept độc đáo</h3>
                <p className="text-sm text-gray-600">Tạo nên những concept sáng tạo, phù hợp với sinh viên</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Chỉnh sửa nghệ thuật</h3>
                <p className="text-sm text-gray-600">Hậu kỳ chuyên nghiệp, tạo nên những bức ảnh đẹp mắt</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lưu giữ kỷ niệm</h3>
                <p className="text-sm text-gray-600">Tạo nên những kỷ niệm đẹp nhất của thời sinh viên</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Album kỷ yếu cao cấp</h3>
                <p className="text-sm text-gray-600">Thiết kế album kỷ yếu chuyên nghiệp, sang trọng</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Dịch vụ tận tâm</h3>
                <p className="text-sm text-gray-600">Chăm sóc khách hàng chu đáo, hỗ trợ tận tình</p>
              </div>
            </div>
          </div>

          {/* Phần hình ảnh gallery và CTA */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Khoảnh Khắc Đáng Nhớ Của Sinh Viên</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop&crop=face"
                  alt="Sinh viên đại học vui vẻ"
                  className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Thời sinh viên tươi đẹp</p>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=face"
                  alt="Sinh viên đại học chụp ảnh"
                  className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Khoảnh khắc vui vẻ</p>
                </div>
              </div>
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face"
                  alt="Sinh viên đại học tốt nghiệp"
                  className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Ngày tốt nghiệp</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phần CTA chính */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng lưu giữ thời sinh viên?</h2>
            <p className="text-lg mb-6 text-indigo-100">
              Hãy để chúng tôi giúp bạn lưu giữ những khoảnh khắc đáng nhớ nhất của thời sinh viên 
              trong ngày tốt nghiệp đặc biệt này.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  <Camera className="w-6 h-6 mr-3" />
                  Cùng lưu giữ thời sinh viên nào
                </Button>
              </Link>
              <Button 
                size="lg" 
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold px-8 py-4 rounded-full w-full sm:w-auto transition-all duration-300"
              >
                <Heart className="w-6 h-6 mr-3" />
                Xem thêm ảnh mẫu
              </Button>
            </div>
          </div>
        </div>

        {/* Các gói dịch vụ - Layout mới */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Các Gói Kỷ Yếu Đại Học</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chọn gói dịch vụ phù hợp với số lượng sinh viên và nhu cầu của trường đại học
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gói Cơ Bản */}
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-indigo-700">Gói Sinh Viên</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">4.500.000đ</p>
                <p className="text-gray-500">/lớp (dưới 30 người)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Chụp 1 buổi (5 tiếng)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 2 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 1 nhiếp ảnh gia</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 80 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Album online</li>
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
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-600 scale-105">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white bg-indigo-600 py-2 rounded-t-lg -mx-6 -mt-6">Gói Cử Nhân</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">7.500.000đ</p>
                <p className="text-gray-500">/lớp (30-50 người)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Chụp 1 ngày (8 tiếng)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 3 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 1 nhiếp ảnh gia, 1 trợ lý</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 150 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Album online & in ấn</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Tặng 1 video ngắn</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/booking">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Gói Cao Cấp */}
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-indigo-700">Gói Thạc Sĩ</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">12.000.000đ</p>
                <p className="text-gray-500">/lớp (trên 50 người)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Chụp 2 ngày</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 4 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 2 nhiếp ảnh gia, 2 trợ lý</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> 300 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Album cao cấp & video</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-indigo-500" /> Tặng ảnh in lớn</li>
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

        {/* Phần showcase ảnh mẫu */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Album Kỷ Yếu Đại Học Mẫu</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những bức ảnh đẹp mắt từ các buổi chụp kỷ yếu đại học của chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=300&fit=crop&crop=face"
                alt="Sinh viên đại học 1"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop&crop=face"
                alt="Sinh viên đại học 2"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                alt="Sinh viên đại học 3"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face"
                alt="Sinh viên đại học 4"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quy trình chụp ảnh - Layout mới */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quy Trình Chụp Ảnh Kỷ Yếu Đại Học</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đảm bảo mỗi khoảnh khắc đều được ghi lại một cách hoàn hảo và đáng nhớ
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Tư vấn & Lên ý tưởng</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Cùng sinh viên xây dựng concept, chọn địa điểm và trang phục phù hợp</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-indigo-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Thực hiện chụp ảnh</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Ekip chuyên nghiệp sẽ ghi lại những khoảnh khắc tự nhiên và đẹp nhất</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-indigo-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hậu kỳ & Chỉnh sửa</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Chỉnh sửa ảnh chuyên nghiệp, đảm bảo chất lượng cao nhất</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-indigo-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
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
        <div className="bg-indigo-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng lưu giữ thời sinh viên?</h2>
          <p className="text-xl mb-6 text-indigo-100">
            Liên hệ với chúng tôi ngay để được tư vấn và đặt lịch chụp kỷ yếu đại học!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-2" />
                Đặt lịch ngay
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
              <Clock className="w-5 h-5 mr-2" />
              Xem giờ mở cửa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChupAnhKyYeuDaiHocPage;
