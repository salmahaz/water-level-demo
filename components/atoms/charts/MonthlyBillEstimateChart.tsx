// "use client";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { DollarSign } from "lucide-react";

// const data = [
//   { month: "Jan", estimate: 42, actual: 45 },
//   { month: "Feb", estimate: 38, actual: 41 },
//   { month: "Mar", estimate: 46, actual: 48 },
//   { month: "Apr", estimate: 44, actual: 46 },
//   { month: "May", estimate: 47, actual: 49 },
//   { month: "Jun", actual: 53.8 }, // Only actual for this month
// ];

// export default function MonthlyBillEstimateChart() {
//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <DollarSign className="text-green-500 w-5 h-5" />
//           <h3 className="font-semibold text-gray-800 text-md">
//             Monthly Bill Estimate
//           </h3>
//         </div>
//         <span className="text-green-500 text-sm font-medium">
//           This month: $53.80
//         </span>
//       </div>

//       <div className="relative h-[220px]">
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-md text-gray-400 z-10">
//           USD ($)
//         </span>
//         <div className="pl-6 h-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={data}>
//               <XAxis dataKey="month" />
//               <YAxis domain={[0, 60]} />
//               <Tooltip />
//               <Bar dataKey="estimate" fill="#10B981" radius={[4, 4, 0, 0]} />
//               <Bar dataKey="actual" fill="#3B82F6" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
