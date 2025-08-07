"use client";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface MyImageProps extends ImageProps {
  className?: string;
}

export default function MyImage({ className, ...props }: MyImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <div className="fixed flex justify-center items-center top-0 right-0 w-screen h-screen z-40">
          <div
            className="fixed top-0 right-0 w-screen h-screen bg-gray-600 bg-opacity-80 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
          <Image
            src={props.src}
            width={600}
            height={600}
            alt={props.alt}
            className={`${className} z-50`}
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}
      <Image
        src={props.src}
        width={props.width}
        height={props.height}
        alt={props.alt}
        className={className}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}
