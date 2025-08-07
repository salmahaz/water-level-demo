// "use client";

// import { Wrench, CalendarDays, Clock, CheckCircle } from "lucide-react";

// const tasks = [
//   {
//     title: "Tank Cleaning",
//     date: "Mar 15, 2024",
//     duration: "Est. 2–3 hours",
//     level: "high",
//     color: "red",
//     icon: <Clock className="w-4 h-4 text-red-600" />,
//   },
//   {
//     title: "Filter Replacement",
//     date: "Mar 20, 2024",
//     duration: "Est. 30 mins",
//     level: "medium",
//     color: "blue",
//     icon: <Clock className="w-4 h-4 text-blue-600" />,
//   },
//   {
//     title: "Pipe Inspection",
//     date: "Mar 10, 2024",
//     duration: "Est. 1 hour",
//     level: "low",
//     color: "green",
//     icon: <CheckCircle className="w-4 h-4 text-green-600" />,
//   },
//   {
//     title: "Sensor Calibration",
//     date: "Mar 25, 2024",
//     duration: "Est. 45 mins",
//     level: "medium",
//     color: "blue",
//     icon: <Clock className="w-4 h-4 text-blue-600" />,
//   },
// ];

// const levelColors = {
//   high: "bg-red-100 text-red-600",
//   medium: "bg-yellow-100 text-yellow-600",
//   low: "bg-gray-100 text-gray-600",
// };

// export default function MaintenanceCalendarCard() {
//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm w-full max-w-md">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Wrench className="text-orange-500 w-5 h-5" />
//           <h3 className="font-semibold text-gray-800 text-md">Maintenance Calendar</h3>
//         </div>
//         <CalendarDays className="text-gray-400 w-5 h-5" />
//       </div>

//       <div className="space-y-3">
//         {tasks.map((task, idx) => (
//           <div
//             key={idx}
//             className={`rounded-lg p-3 border ${
//               task.color === "red"
//                 ? "bg-red-50 border-red-100"
//                 : task.color === "green"
//                 ? "bg-green-50 border-green-100"
//                 : "bg-blue-50 border-blue-100"
//             }`}
//           >
//             <div className="flex justify-between items-start">
//               <div className="flex items-center gap-2">
//                 {task.icon}
//                 <h4
//                   className={`font-semibold ${
//                     task.color === "red"
//                       ? "text-red-600"
//                       : task.color === "green"
//                       ? "text-green-600"
//                       : "text-blue-600"
//                   }`}
//                 >
//                   {task.title}
//                 </h4>
//               </div>
//               <span
//                 className={`text-xs rounded-full px-2 py-0.5 font-medium ${levelColors[task.level as keyof typeof levelColors]}`}
//               >
//                 {task.level}
//               </span>
//             </div>
//             <p className="text-sm text-gray-600 mt-1">{task.date}</p>
//             <p className="text-xs text-gray-400">{task.duration}</p>
//           </div>
//         ))}
//       </div>

//       <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-xl transition">
//         Schedule Maintenance
//       </button>
//     </div>
//   );
// }
