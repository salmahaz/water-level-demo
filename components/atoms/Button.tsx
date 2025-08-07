"use client";
import React, { useState } from "react";
import LoadingDots from "./svg/LoadingDots";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  width?: string;
  isPrimary?: boolean;
  isWarning?: boolean;
  isGreen?: boolean;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  formAction?: string | ((formData: FormData) => Promise<void>);
  isLinked?: boolean;
  className?: string;
  padding?: string;
}

export default function Button({
  text,
  onClick,
  icon,
  width = "w-fit",
  isPrimary,
  isWarning,
  isGreen,
  isDisabled,
  type = "submit",
  formAction,
  isLinked,
  className = "",
  padding = "px-8 py-2",
}: ButtonProps) {
  const { pending: isLoading } = useFormStatus();
  const [isClicked, setIsClicked] = useState(false);

  const baseClasses = `block ${padding} mx-auto rounded-full h-fit text-nowrap ${width} border font-bold leading-normal`;

  const variantClass =
    isDisabled || isLoading
      ? "text-white bg-gray-400 border-gray-400 hover:bg-gray-400 cursor-not-allowed"
      : isGreen
        ? "text-white bg-green-500 hover:bg-green-600"
        : isWarning
          ? "text-white bg-red-500 hover:bg-red-600"
          : isPrimary
            ? "text-white bg-blue-300 hover:bg-light_primary"
            : "bg-white text-primary border border-primary hover:bg-light_secondary";

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled || isLoading) {
      e.preventDefault();
      return;
    }
    if (isLinked) {
      setIsClicked(true);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      type={type}
      formAction={formAction}
      disabled={isDisabled || isLoading || isClicked}
      className={`${baseClasses} ${variantClass} ${className}`}>
      {isLoading || isClicked ? (
        <div className="w-6 h-6 mx-auto flex justify-center items-center">
          <LoadingDots />
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-center whitespace-nowrap">
          {icon && <div>{icon}</div>}
          <div>{text}</div>
        </div>
      )}
    </button>
  );
}
