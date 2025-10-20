// src/app/admin/bookinglist/bookingfilter.tsx
"use client";

import React from "react";

interface BookingFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddNewBooking: () => void;
}

export default function BookingFilter({ 
  searchTerm, 
  onSearchChange, 
  onAddNewBooking 
}: BookingFilterProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search by customer name or studio"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Add New Booking Button */}
      <button 
        onClick={onAddNewBooking}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        <span>+ New Booking</span>
      </button>
    </div>
  );
}
