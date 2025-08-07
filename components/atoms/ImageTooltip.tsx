"use client";

import Image from "next/image";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface Props {
  imageSrc: string;
  tooltipText?: string;
  imageAlt?: string;
}

export default function ImageTooltip({
  imageSrc,
  tooltipText,
  imageAlt = "Tooltip Image",
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block w-fit"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      <FaInfoCircle className="text-gray-600 text-2xl cursor-pointer" />

      {show && (
        <div className="absolute w-[20rem] right-full bg-white border border-gray-300 p-2 shadow-lg rounded z-10">
          {tooltipText && (
            <div className="text-sm text-gray-700 max-w-[200px]">
              {tooltipText}
            </div>
          )}
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
}
