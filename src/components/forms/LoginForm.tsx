"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "@/app/style/login.css";

type LoginFormProps = {
  onSubmit: (formData: { email: string; password: string }) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome back 🍂</h2>

        <p>Email</p>
        <input
          type="email"
          placeholder="Example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>

        <input
          type="password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="actions">
          <a href="/register" type="button" className="register-btn">
            Register
          </a>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" className="login-btn">
          Sign in
        </button>

        <button type="submit" className="facebook-btn">
          Sign in with Facebook
        </button>

        <button type="submit" className="google-btn">
          Sign in with Gmail
        </button>
      </form>
    </div>
  );
}
