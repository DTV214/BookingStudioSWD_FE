"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenueByMonth } from '@/infrastructure/AdminAPI/DashBoard/types';

interface RevenueChartProps {
  revenueByMonth: RevenueByMonth;
}

export default function RevenueChart({ revenueByMonth }: RevenueChartProps) {
  // Transform data for Recharts
  const chartData = Object.entries(revenueByMonth)
    .map(([month, revenue]) => ({
      month: month,
      revenue: revenue,
      displayMonth: new Date(month + '-01').toLocaleDateString('vi-VN', { 
        year: 'numeric', 
        month: 'short' 
      })
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`Tháng: ${label}`}</p>
          <p className="text-blue-600 font-semibold">
            {`Doanh thu: ${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu đồ doanh thu theo tháng</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>Không có dữ liệu doanh thu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Biểu đồ doanh thu theo tháng</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="displayMonth" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="revenue" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]}
              stroke="#2563EB"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
