"use client";

import Image from "next/image";
import React from "react";

interface TankMapPinProps {
  imageUrl: string;       
  svgBackgroundUrl?: string; 
  size?: number;              
  imageClassName?: string;    
  wrapperClassName?: string;  
}

export default function MapPin({
  imageUrl,
  svgBackgroundUrl = "/svg/map-marker.svg",
  size = 48,
  imageClassName = "",
  wrapperClassName = "",
}: TankMapPinProps) {
  return (
    <div
      className={`relative ${wrapperClassName}`}
      style={{ width: size, height: size }}
    >
      {/* Background SVG Map Pin */}
      <Image
        src={svgBackgroundUrl}
        alt="Map Pin"
        fill
        className="object-contain"
      />

      {/* Tank Photo on top inside */}
      <Image
        src={imageUrl}
        alt="map pin"
        fill
        className={`object-cover rounded-full absolute top-0 left-0 p-1 ${imageClassName}`}
      />
    </div>
  );
}
