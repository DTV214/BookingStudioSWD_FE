"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { storage, UserData } from "@/infrastructure/utils/storage";

export interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserData | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  /**
   * 🔄 Load user & token từ localStorage khi khởi động
   */
  useEffect(() => {
    const existingUser = storage.getUser();
    const existingToken = storage.getToken();

    if (existingUser) setUser(existingUser);
    if (existingToken) setToken(existingToken);
  }, []);

  /**
   * 🧠 Lắng nghe event "storage" để đồng bộ login/logout giữa các tab
   */
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(storage.getUser());
      setToken(storage.getToken());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /**
   * 🚪 Đăng xuất toàn cục
   */
  const logout = useCallback(() => {
    storage.clearAll();
    setUser(null);
    setToken(null);
  }, []);

  /**
   * 🧩 Gói dữ liệu context
   */
  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      setUser,
      setToken,
      logout,
    }),
    [user, token, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
};
