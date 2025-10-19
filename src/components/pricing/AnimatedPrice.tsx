"use client";

import CountUp from "react-countup";

interface Props {
  amount: number;
  unit: string;
}

export default function AnimatedPrice({ amount, unit }: Props) {
  const perUnit = unit.toUpperCase() === "HOUR" ? "giờ" : unit.toLowerCase();

  return (
    <div className="text-right font-semibold text-base">
      <CountUp
        end={amount}
        duration={1.75} // Thời gian animation
        separator="."
        decimals={0}
        suffix={` ₫ / ${perUnit}`}
      />
    </div>
  );
}
