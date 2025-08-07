export default function SkeletonBox({ hasShadow }: { hasShadow?: boolean }) {
    return (
      <div
        className={`rounded-xl flex flex-col gap-2 w-full max-w-[26rem] mx-auto bg-white p-6 animate-pulse ${
          hasShadow &&
          "p-4 shadow-[0_0_5px_0_rgba(0,0,0,0.2)] border border-primary"
        }`}
      >
        {/* Skeleton Title */}
        <div className="h-6 w-2/3 bg-gray-300 rounded-md"></div>
  
        {/* Skeleton Lines */}
        <div className="h-4 w-full bg-gray-200 rounded-md"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
      </div>
    );
  }
  