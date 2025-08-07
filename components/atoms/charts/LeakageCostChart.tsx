// "use client";

// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { AlertTriangle } from "lucide-react";

// const data = [
//   { week: "Week 1", cost: 0 },
//   { week: "Week 2", cost: 3 },
//   { week: "Week 3", cost: 7 },
//   { week: "Week 4", cost: 14 },
//   { week: "Week 5", cost: 24 },
//   { week: "Week 6", cost: 39.2 },
// ];

// export default function LeakageCostChart() {
//   return (
//     <div className="rounded-2xl border border-red-100 bg-white p-4 shadow-sm">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <AlertTriangle className="text-red-500 w-4 h-4" />
//           <h3 className="font-semibold text-gray-800 text-md">
//             Leakage Detection<br />Costs
//           </h3>
//         </div>
//         <span className="text-red-500 text-sm font-medium">
//           Potential loss: <br />$39.20/6wk
//         </span>
//       </div>

//       <div className="relative h-[220px]">
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-md text-gray-400 z-10">
//           USD ($)
//         </span>
//         <div className="pl-6 h-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data}>
//               <XAxis dataKey="week" />
//               <YAxis domain={[0, 40]} tickCount={5} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="cost"
//                 stroke="#EF4444"
//                 strokeWidth={3}
//                 dot={{ r: 5, strokeWidth: 2, fill: "#EF4444" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
