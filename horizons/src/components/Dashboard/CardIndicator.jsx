import React from "react";
import Card from "./Card";

const Gauge = ({ value = 0, color = "green" }) => (
  <div className="w-full flex flex-col items-center mt-2">
    <div className="relative w-16 h-8">
      <svg width="64" height="32" viewBox="0 0 64 32">
        <path
          d="M8,28 A24,24 0 0,1 56,28"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <path
          d="M8,28 A24,24 0 0,1 56,28"
          fill="none"
          stroke={color === "red" ? "#ef4444" : color === "blue" ? "#2563eb" : "#22c55e"}
          strokeWidth="6"
          strokeDasharray={`${(value / 100) * 75} 75`}
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold">
        {value}%
      </span>
    </div>
  </div>
);

const CardIndicator = ({ icon, label, value, color = "primary", subvalue, gaugeValue }) => (
  <Card className="flex flex-col items-center justify-center text-center py-6">
    <div className="mb-2">{icon}</div>
    <div className={`text-3xl font-bold ${color === "red" ? "text-red-500" : color === "blue" ? "text-blue-500" : color === "green" ? "text-green-500" : "text-primary"}`}>
      {value}
    </div>
    <div className="text-sm text-muted-foreground">{label}</div>
    {subvalue && <div className="text-xs mt-1 text-gray-500">{subvalue}</div>}
    {typeof gaugeValue === "number" && <Gauge value={gaugeValue} color={color} />}
  </Card>
);

export default CardIndicator;
