"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "@/app/style/register.css";

type RegisterFormProps = {
  onSubmit: (FormData: {
    name: string;
    email: string;
    password: string;
  }) => void;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password });
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <img src="/logo.png" alt="logo" className="logo" />

        <h1>Register 🍂</h1>

        <p>Name</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>Email</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="actions">
          <a href="/login">Login</a>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>

        <button type="button" className="facebook-btn">
          Sign in with Facebook
        </button>

        <button type="button" className="google-btn">
          Sign in with Gmail
        </button>
      </form>
    </div>
  );
}
