import React from "react";

const colorMap = {
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
};

const StatusBar = ({ label, value, total, color = "green" }) => {
  const percent = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span>
          {value} de {total}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`${colorMap[color]} h-3 rounded-full transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default StatusBar;
