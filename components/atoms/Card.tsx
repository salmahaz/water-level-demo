import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  onClick?: () => void;
  isClickable?: boolean;
}

export default function Card({
  children,
  title,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  onClick,
  isClickable = false,
}: CardProps) {
  const baseClasses = "bg-white rounded-lg shadow p-4";
  const clickableClasses = isClickable ? "cursor-pointer hover:shadow-md transition-shadow" : "";
  
  return (
    <div 
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className={`font-semibold mb-2 ${headerClassName}`}>
          {title}
        </div>
      )}
      <div className={bodyClassName}>
        {children}
      </div>
    </div>
  );
} 