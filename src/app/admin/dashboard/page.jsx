// src/app/admin/dashboard/page.tsx
import React from "react";
import DashboardContainer from "./dashboard";
import "@/app/style/admin.css"; // base

export default function Page() {
  // Note: DashboardContainer is a server component that will render the UI.
  return <DashboardContainer />;
}
