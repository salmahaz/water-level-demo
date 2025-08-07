// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Clock } from "lucide-react";

// const data = [
//   { time: "6AM", liters: 2 },
//   { time: "8AM", liters: 4.2 },
//   { time: "10AM", liters: 3.1 },
//   { time: "12PM", liters: 6.1 },
//   { time: "2PM", liters: 2.8 },
//   { time: "4PM", liters: 3.6 },
//   { time: "6PM", liters: 5.2 },
//   { time: "8PM", liters: 4.6 },
//   { time: "10PM", liters: 2.2 },
// ];

// export default function PeakUsageChart() {
//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Clock className="text-orange-500 w-5 h-5" />
//           <h3 className="font-semibold text-gray-800 text-md">
//             Peak Usage Hours
//           </h3>
//         </div>
//         <span className="text-orange-500 text-sm font-medium">
//           Peak: <span className="font-semibold">12PM (6.1L)</span>
//         </span>
//       </div>

//       <div className="relative h-[220px]">
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-md text-gray-400 z-10">
//           Liters
//         </span>
//         <div className=" h-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//               <XAxis dataKey="time" />
//               <YAxis domain={[0, 8]} />
//               <Tooltip />
//               <Bar dataKey="liters" fill="#F97316" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
