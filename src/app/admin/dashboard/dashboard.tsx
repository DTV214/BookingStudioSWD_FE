// src/app/admin/dashboard/dashboard.tsx
import React from "react";
import DashBoardForm, { DashProps } from "@/components/AdminPage/DashBoardForm";

/**
 * DashboardContainer is a server component that prepares data (from DB/API)
 * and renders the presentational DashBoardForm with that data.
 */
export default async function DashboardContainer() {
  // === In real app you'd replace the below with real fetch/db calls ===
  // Here we simulate server-side data fetch (synchronous for demo).
  const data: DashProps = {
    stats: {
      bookingsToday: 3,
      revenueToday: 320,
      notifications: 5,
    },
    bookings: [
      {
        id: "134",
        customer: "John Doe",
        time: "8:00 AM",
        studio: "Studio A",
        status: "Checked In",
      },
      {
        id: "135",
        customer: "Jane Smith",
        time: "9:00 AM",
        studio: "Studio B",
        status: "Confirmed",
      },
      {
        id: "136",
        customer: "Sarah Wilson",
        time: "10:00 AM",
        studio: "Studio C",
        status: "Pending",
      },
    ],
    bookingsByStudio: {
      "Studio A": 1,
      "Studio B": 2,
      "Studio C": 1,
      "Studio D": 1,
    },
    studios: [
      { name: "Studio A", status: "Occupied" },
      { name: "Studio B", status: "Vacant" },
      { name: "Studio C", status: "Needs Cleaning" },
      { name: "Studio D", status: "Occupied" },
    ],
    notifications: [
      "Booking 134 has been confirmed",
      "Booking 135 has been checked in",
      "Booking 136 is pending",
      "Booking 137 has been canceled",
    ],
  };

  // Pass data down to the presentational component
  return <DashBoardForm {...data} />;
}
