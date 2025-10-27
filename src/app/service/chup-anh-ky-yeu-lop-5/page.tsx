"use client";

import React from 'react';
import { Camera, CheckCircle, Clock, Users, Star, GraduationCap, Sparkles, Heart, BookOpen, Smile } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChupAnhKyYeuLop5Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header đơn giản */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Chụp Ảnh Kỷ Yếu Lớp 5 - Lưu Giữ Tuổi Thơ Hồn Nhiên</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch Vụ Chụp Ảnh Kỷ Yếu Lớp 5
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lưu giữ những khoảnh khắc hồn nhiên, vui tươi nhất của các em học sinh lớp 5 trong ngày tốt nghiệp tiểu học
          </p>
        </div>

        {/* Thông tin chính - Layout mới với bố trí khác biệt */}
        <div className="mb-16">
          {/* Phần hero với hình ảnh lớn và text overlay */}
          <div className="relative mb-12">
            <div className="relative h-96 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=400&fit=crop&crop=face"
                alt="Học sinh lớp 5 vui vẻ"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-yellow-900/60"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Tại sao chọn SWD Studio?</h2>
                  <p className="text-xl md:text-2xl text-orange-100 max-w-3xl">
                    Chúng tôi hiểu tâm lý trẻ em và tạo nên những khoảnh khắc hồn nhiên, đáng yêu nhất
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phần ưu điểm với layout dạng zigzag */}
          <div className="space-y-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-orange-100 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Smile className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Hiểu tâm lý trẻ em</h3>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Nhiếp ảnh gia có kinh nghiệm chụp ảnh học sinh tiểu học, biết cách tạo không khí vui vẻ và thoải mái cho các em.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500&h=400&fit=crop&crop=face"
                  alt="Học sinh vui vẻ"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop&crop=face"
                  alt="Học sinh chụp ảnh"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <div className="bg-yellow-100 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Tạo không khí vui vẻ</h3>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Tạo môi trường thoải mái, vui nhộn để các em tự nhiên và vui vẻ trong quá trình chụp ảnh.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-orange-100 rounded-2xl p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Chỉnh sửa đáng yêu</h3>
                  </div>
                  <p className="text-gray-700 text-lg">
                    Hậu kỳ tạo nên những bức ảnh hồn nhiên, đáng yêu với màu sắc tươi sáng phù hợp với trẻ em.
                  </p>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&crop=face"
                  alt="Học sinh tốt nghiệp"
                  className="w-full h-80 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Phần CTA chính với layout mới */}
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute bottom-10 left-20 w-12 h-12 bg-white rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-white rounded-full"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Sẵn sàng lưu giữ tuổi thơ hồn nhiên?</h2>
                <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-4xl mx-auto">
                  Hãy để chúng tôi giúp bạn lưu giữ những khoảnh khắc đáng yêu nhất của các em học sinh lớp 5 
                  trong ngày tốt nghiệp tiểu học đặc biệt này.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/booking">
                    <Button 
                      size="lg" 
                      className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-10 py-5 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                    >
                      <Camera className="w-7 h-7 mr-3" />
                      Cùng lưu giữ tuổi thơ hồn nhiên nào
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold px-10 py-5 rounded-full text-lg transition-all duration-300"
                  >
                    <Heart className="w-7 h-7 mr-3" />
                    Xem thêm ảnh mẫu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Các gói dịch vụ - Layout mới */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Các Gói Kỷ Yếu Lớp 5</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chọn gói dịch vụ phù hợp với số lượng học sinh và nhu cầu của trường tiểu học
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gói Cơ Bản */}
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-orange-700">Gói Hồn Nhiên</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">2.500.000đ</p>
                <p className="text-gray-500">/lớp (dưới 25 em)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Chụp 1 buổi (3 tiếng)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 1 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 1 nhiếp ảnh gia</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 40 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Album online</li>
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
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-600 scale-105">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-white bg-orange-600 py-2 rounded-t-lg -mx-6 -mt-6">Gói Vui Tươi</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">3.500.000đ</p>
                <p className="text-gray-500">/lớp (25-35 em)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Chụp 1 buổi (4 tiếng)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 2 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 1 nhiếp ảnh gia, 1 trợ lý</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 70 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Album online & in ấn</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Tặng 1 video ngắn</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Link href="/booking">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Chọn gói này
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Gói Cao Cấp */}
            <Card className="flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-orange-200">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-orange-700">Gói Đáng Yêu</CardTitle>
                <p className="text-4xl font-extrabold text-gray-900 mt-2">5.000.000đ</p>
                <p className="text-gray-500">/lớp (trên 35 em)</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Chụp 1 ngày</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 3 địa điểm</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 2 nhiếp ảnh gia, 2 trợ lý</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> 120 ảnh chỉnh sửa</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Album cao cấp & video</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-orange-500" /> Tặng ảnh in lớn</li>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Album Kỷ Yếu Lớp 5 Mẫu</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những bức ảnh đáng yêu từ các buổi chụp kỷ yếu lớp 5 của chúng tôi
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=300&fit=crop&crop=face"
                alt="Học sinh lớp 5 1"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=300&fit=crop&crop=face"
                alt="Học sinh lớp 5 2"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Smile className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&crop=face"
                alt="Học sinh lớp 5 3"
                className="w-full h-48 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
                alt="Học sinh lớp 5 4"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quy Trình Chụp Ảnh Kỷ Yếu Lớp 5</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đảm bảo các em có trải nghiệm vui vẻ và tạo ra những bức ảnh đáng yêu nhất
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-orange-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Tư vấn & Chuẩn bị</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Tư vấn concept, trang phục và chuẩn bị môi trường phù hợp với học sinh</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-orange-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Tạo không khí vui vẻ</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Tạo môi trường thoải mái, vui nhộn để các em tự nhiên và vui vẻ</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-orange-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Chụp ảnh tự nhiên</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Ghi lại những khoảnh khắc tự nhiên, hồn nhiên nhất của các em</p>
                </div>
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 bg-orange-500 rounded-full transform -translate-y-1/2 z-20"></div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hậu kỳ & Giao ảnh</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Chỉnh sửa ảnh đáng yêu và giao album kỷ yếu đặc biệt</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="bg-orange-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng lưu giữ tuổi thơ hồn nhiên?</h2>
          <p className="text-xl mb-6 text-orange-100">
            Liên hệ với chúng tôi ngay để được tư vấn và đặt lịch chụp kỷ yếu lớp 5!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-2" />
                Đặt lịch ngay
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              <Clock className="w-5 h-5 mr-2" />
              Xem giờ mở cửa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChupAnhKyYeuLop5Page;
