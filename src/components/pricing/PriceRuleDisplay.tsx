"use client";

import React from "react";
// --- IMPORT COMPONENT MỚI ---
import AnimatedPrice from "./AnimatedPrice";
import { formatRuleDescription, formatCurrency } from "@/lib/pricingUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { PriceRule } from "@/domain/models/priceTable/priceRule";

interface Props {
  priceRules: PriceRule[];
  isLoading: boolean;
  hasSelectedTable: boolean;
}

export default function PriceRuleDisplay({
  priceRules,
  isLoading,
  hasSelectedTable,
}: Props) {
  // Trạng thái Loading
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Trạng thái chưa chọn
  if (!hasSelectedTable) {
    return (
      <Card className="flex items-center justify-center min-h-[300px]">
        <p className="text-muted-foreground">
          Vui lòng chọn một bảng giá từ thanh bên.
        </p>
      </Card>
    );
  }

  // Trạng thái không có dữ liệu
  if (priceRules.length === 0) {
    return (
      <Card className="flex items-center justify-center min-h-[300px]">
        <p className="text-muted-foreground">
          Bảng giá này không có quy tắc tính giá nào.
        </p>
      </Card>
    );
  }

  // Trạng thái có dữ liệu
  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Chi tiết Bảng Giá</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base">
                Mô tả (Điều kiện áp dụng)
              </TableHead>
              <TableHead className="text-right text-base">Giá</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priceRules.map((rule) => (
              // Thêm hiệu ứng hover cho hàng
              <TableRow
                key={rule.id}
                className="transition-colors hover:bg-muted/50"
              >
                <TableCell className="font-medium py-4">
                  {formatRuleDescription(rule)}
                </TableCell>

                {/* --- THAY THẾ HÀM CŨ BẰNG COMPONENT MỚI --- */}
                <TableCell className="py-4">
                  <AnimatedPrice amount={rule.pricePerUnit} unit={rule.unit} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
