"use client";

import Box from "../Box";

export default function UserCardSkeleton() {
  return (
    <>
      <Box>
        <>
          {/* Avatar and name row */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="flex flex-col space-y-2 flex-1">
              <div className="h-3 w-2/3 bg-gray-200 rounded" />
              <div className="h-2 w-1/2 bg-gray-200 rounded" />
            </div>
          </div>

          {/* WhatsApp button placeholder */}
          <div className="h-8 w-full bg-gray-200 rounded mt-2" />
        </>
      </Box>
    </>
  );
}
