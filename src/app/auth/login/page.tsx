"use client";

import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth-login`
      );
      const json = await res.json();
      if (json.data) {
        window.location.href = json.data; // chuyển hướng tới Google
      } else {
        alert("Không lấy được URL đăng nhập Google.");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi đăng nhập Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[360px] text-center">
        <img
          src="https://res.cloudinary.com/dratbz8bh/image/upload/v1760081795/16191_iqbaet.jpg"
          alt="Logo"
          className="mx-auto w-100 h-60"
        />
        <h2 className="text-2xl font-bold mb-3">Đăng nhập</h2>
        <p className="text-gray-600 mb-6">Chào mừng bạn đến SWD Studio 🍂</p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all"
        >
          <img
            src="https://res.cloudinary.com/dratbz8bh/image/upload/v1760081936/icon-256x256_nto2yu.png"
            alt="Google icon"
            className="w-5 h-5"
          />
          {loading ? "Đang chuyển hướng..." : "Đăng nhập bằng Google"}
        </button>
      </div>
    </div>
  );
}
