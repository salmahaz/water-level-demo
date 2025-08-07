export default function OrderStatusSkeleton() {
    return (
      <div className="flex flex-col gap-4 pb-28 max-w-lg mx-auto">
        {/* Title */}
        <div className="h-6 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
  
        {/* Summary Card Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-48 bg-gray-100 rounded" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
          <div className="h-4 w-36 bg-gray-100 rounded" />
          <div className="h-4 w-28 bg-gray-100 rounded" />
          <div className="h-4 w-40 bg-gray-100 rounded" />
        </div>
  
        {/* Total Box */}
        <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-20 bg-gray-300 rounded" />
        </div>      
      </div>
    );
  }
  