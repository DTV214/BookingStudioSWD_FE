"use client";

export interface UserData {
  id?: string | number;
  name?: string;
  email?: string;
  picture?: string;
  phoneNumber?: string;
  role?: string;
  status?: string;
  userType?: string;
}

export const storage = {
  setToken(token: string): void {
    localStorage.setItem("token", token);
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  removeToken(): void {
    localStorage.removeItem("token");
  },

  setUser(user: UserData): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser(): UserData | null {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserData;
    } catch {
      return null;
    }
  },

  removeUser(): void {
    localStorage.removeItem("user");
  },

  clearAll(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
};
