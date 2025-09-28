"use client";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login Data:", data);
    // TODO: Gọi API login ở đây
  };

  return (
    <div className="container mx-auto">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
