"use client";
import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  const handleLogin = (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log("Register Data:", data);
    // TODO: Gọi API Register ở đây
  };

  return (
    <div className="container mx-auto">
      <RegisterForm onSubmit={handleLogin} />
    </div>
  );
}
