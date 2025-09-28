"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="
            fixed bottom-6 right-6 z-50 
            p-3 rounded-full shadow-lg
            bg-amber-200 hover:bg-amber-400 
            text-white hover:scale-110
            transition-all duration-300 ease-out
            animate-bounce
          "
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
