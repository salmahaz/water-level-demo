// "use client";

// import { Leaf, TrendingUp } from "lucide-react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// export default function SmartWaterCard() {
//   const score = 87;
//   const grade = "A";

//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm w-full">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Leaf className="text-green-500 w-5 h-5" />
//           <h3 className="font-semibold text-gray-800 text-md">
//             Conservation Score
//           </h3>
//         </div>
//         <TrendingUp className="text-green-500 w-4 h-4" />
//       </div>

//       <div className="flex justify-center my-4">
//         <div className="w-32 h-32">
//           <CircularProgressbar
//             value={score}
//             text={`${score}`}
//             strokeWidth={12}
//             styles={buildStyles({
//               textColor: "#10B981",
//               pathColor: "#10B981",
//               trailColor: "#E5E7EB",
//               textSize: "22px",
//             })}
//           />
//           <p className="text-center mt-1 text-sm text-gray-600">Grade {grade}</p>
//         </div>
//       </div>

//       <div className="space-y-2 text-sm">
//         <div className="flex justify-between">
//           <span className="text-gray-600">Efficiency Rating</span>
//           <span className="text-green-600 font-medium">Excellent</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-600">Monthly Improvement</span>
//           <span className="text-blue-600 font-medium">+5 points</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-600">Rank</span>
//           <span className="font-medium text-black">Top 15%</span>
//         </div>
//       </div>
//     </div>
//   );
// }
