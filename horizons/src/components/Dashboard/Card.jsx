import { cn } from "@/lib/utils";
import React from "react";

const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      "bg-white dark:bg-card rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
