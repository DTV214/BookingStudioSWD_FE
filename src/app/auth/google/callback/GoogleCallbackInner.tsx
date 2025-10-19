"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { storage, UserData } from "@/infrastructure/utils/storage";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/AuthContext";

// Cấu trúc user decode từ Google JWT
interface DecodedUser {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
  exp?: number;
}

// Cấu trúc phản hồi từ backend (theo swagger)
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export default function GoogleCallbackInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const code = params.get("code");
    if (!code) {
      router.replace("/login");
      return;
    }

    const exchangeCode = async (): Promise<void> => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google/callback?code=${code}`
        );
        const json: ApiResponse<string> = await res.json();

        if (json.code === 200 && json.data) {
          const token: string = json.data;
          storage.setToken(token);

          let user: UserData | null = null;

          try {
            // ✅ gọi API đúng theo swagger
            const userRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/account/profile`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (userRes.ok) {
              const userJson: ApiResponse<UserData> = await userRes.json();
              user = userJson.data;
            } else {
              console.warn(
                "API /api/account/profile trả lỗi, fallback decode JWT"
              );
              user = mapDecodedUser(jwtDecode<DecodedUser>(token));
            }
          } catch (err) {
            console.warn(
              "Không thể gọi /api/account/profile, fallback decode JWT"
            );
            user = mapDecodedUser(jwtDecode<DecodedUser>(token));
          }

          if (user) {
            storage.setUser(user);
            setUser(user);
          }

          router.replace("/");
        } else {
          alert("Đăng nhập thất bại.");
          router.replace("/login");
        }
      } catch (err) {
        console.error("Lỗi khi xử lý callback:", err);
        alert("Lỗi đăng nhập.");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    exchangeCode();
  }, [params, router, setUser]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-700">
      {loading ? "Đang đăng nhập bằng Google..." : "Đang chuyển hướng..."}
    </div>
  );
}

/**
 * Convert DecodedUser (JWT) → UserData chuẩn hóa
 */
function mapDecodedUser(decoded: DecodedUser): UserData {
  return {
    id: decoded.sub ?? "",
    name: decoded.name ?? "",
    email: decoded.email ?? "",
    picture: decoded.picture ?? "",
  };
}
