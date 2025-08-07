import React from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface CardItemProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
  onClick?: () => void;
  trailingText?: string;
}

export default function CardItem({ icon, text, href, onClick, trailingText }: CardItemProps) {
  const classes =
    "group flex items-center justify-between w-full px-3 py-2 rounded-lg transition hover:bg-gray-100 cursor-pointer";

  const content = (
    <>
      <div className="flex items-center gap-2">
        <span className="text-xl text-gray-700 group-hover:text-primary">{icon}</span>
        <span className="text-gray-700 font-medium group-hover:text-primary">{text}</span>
      </div>
      <div className="flex items-center gap-2">
        {trailingText && (
          <span className="text-sm text-gray-500 group-hover:text-primary">{trailingText}</span>
        )}
        {/* Only show arrow if no trailing text */}
        {!trailingText && (
          <FaChevronRight className="text-gray-500 group-hover:text-primary transition" />
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={classes} type="button">
        {content}
      </button>
    );
  }

  return (
    <Link href={href || "#"} className={classes}>
      {content}
    </Link>
  );
}
