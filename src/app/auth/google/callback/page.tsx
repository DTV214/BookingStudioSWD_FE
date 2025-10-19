"use client";

import { Suspense } from "react";
import GoogleCallbackInner from "./GoogleCallbackInner";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div>Đang xử lý đăng nhập...</div>}>
      <GoogleCallbackInner />
    </Suspense>
  );
}
