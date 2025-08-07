// "use client";

// import { useState } from "react";
// import Box from "@/components/atoms/Box";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { CalendarDays } from "lucide-react";

// const dailyData = [
//   { day: "Mon", liters: 140 },
//   { day: "Tue", liters: 125 },
//   { day: "Wed", liters: 160 },
//   { day: "Thu", liters: 145 },
//   { day: "Fri", liters: 175 },
//   { day: "Sat", liters: 180 },
//   { day: "Sun", liters: 150 },
// ];

// const weeklyData = [
//   { week: "Week 1", liters: 1020 },
//   { week: "Week 2", liters: 980 },
//   { week: "Week 3", liters: 1110 },
//   { week: "Week 4", liters: 1040 },
// ];

// const monthlyData = [
//   { month: "Jan", liters: 4250 },
//   { month: "Feb", liters: 3900 },
//   { month: "Mar", liters: 4420 },
//   { month: "Apr", liters: 4100 },
//   { month: "May", liters: 4600 },
//   { month: "Jun", liters: 4370 },
// ];


// const options = ["Daily", "Weekly", "Monthly"];

// export default function UsageChart() {
//   const [selected, setSelected] = useState("Daily");

//   const getData = () => {
//     switch (selected) {
//       case "Weekly":
//         return { data: weeklyData, xKey: "week" };
//       case "Monthly":
//         return { data: monthlyData, xKey: "month" };
//       default:
//         return { data: dailyData, xKey: "day" };
//     }
//   };

//   const { data, xKey } = getData();

//   return (
//     <Box title="Usage Tracking" hasShadow={true}>
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center gap-2 ">
//           <CalendarDays className="text-primary w-5 h-5" />
//           <h3 className="text-md font-semibold">Usage Tracking</h3>
//         </div>
//         <div className="flex gap-2">
//           {options.map((option) => (
//             <button
//               key={option}
//               onClick={() => setSelected(option)}
//               className={`px-3 py-1 rounded-full text-sm ${
//                 selected === option
//                   ? "bg-primary text-white"
//                   : "bg-gray-100 text-gray-500"
//               }`}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="relative h-[220px]">
//         <span className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-md text-gray-400 z-10">
//           Liters
//         </span>
//         <div className="pl-4 h-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={data}>
//               <XAxis dataKey={xKey} />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="liters"
//                 stroke="#3B82F6"
//                 strokeWidth={3}
//                 dot={{ r: 4, strokeWidth: 2, fill: "#3B82F6" }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </Box>
//   );
// }
