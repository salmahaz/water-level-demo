export default function WaterTankDetailsSkeleton() {
    return (
      <div className="max-w-md mx-auto my-11 p-8 bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl rounded-2xl border border-blue-200 animate-pulse">
        <h1 className="text-3xl font-bold text-center text-primary mb-8 bg-gray-300 h-8 rounded-md"></h1>
        <div className="space-y-6">
          {/* Input Placeholders */}
          <div className="h-16 bg-gray-300 rounded-md"></div>
          <div className="h-16 bg-gray-300 rounded-md"></div>
          <div className="h-16 bg-gray-300 rounded-md"></div>
  
          {/* Button Placeholder */}
          <div className="flex justify-center pt-6">
            <div className="h-12 w-32 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }