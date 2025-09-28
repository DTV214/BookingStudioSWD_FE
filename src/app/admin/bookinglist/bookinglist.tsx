// src/app/admin/bookinglist/bookinglist.tsx
import React from "react";
import BookingListForm from "@/components/AdminPage/BookingListForm";

type Booking = {
  id: string;
  customer: string;
  time: string;
  studio: string;
  status: "Checked In" | "Confirmed" | "Pending" | "Cancelled";
};

type StudioStatus = {
  name: string;
  status: "Occupied" | "Vacant" | "Needs Cleaning" | "Occupied Soon";
};

type BookingsByStudio = {
  [studio: string]: number;
};

export default async function BookingListContainer() {
  const bookings: Booking[] = [
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
  ];

  const bookingsByStudio: BookingsByStudio = {
    "Studio A": 1,
    "Studio B": 2,
    "Studio C": 1,
    "Studio D": 0,
  };

  const studios: StudioStatus[] = [
    { name: "Studio A", status: "Occupied" },
    { name: "Studio B", status: "Vacant" },
    { name: "Studio C", status: "Needs Cleaning" },
    { name: "Studio D", status: "Occupied" },
  ];

  return (
    <BookingListForm
      bookings={bookings}
      bookingsByStudio={bookingsByStudio}
      studios={studios}
    />
  );
}
