
"use client";
import Image from "next/image";

type EmptyStateProps = {
  imageSrc: string;
  title: string;
  subtitle?: string;
};

export default function EmptyContent({ imageSrc, title, subtitle }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 gap-2 text-center">
      <Image src={imageSrc} alt={title} width={150} height={150} />
      <p className="text-lg font-medium">{title}</p>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
    </div>
  );
}
