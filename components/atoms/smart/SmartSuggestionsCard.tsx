// "use client";

// import { Lightbulb, Sparkles } from "lucide-react";

// const suggestions = [
//   {
//     title: "Optimize Morning Usage",
//     description: "Reduce peak hour consumption by 15% with smart scheduling",
//     impact: "High",
//     savings: 12,
//     icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
//   },
//   {
//     title: "Install Smart Valves",
//     description: "Automatic leak detection could prevent 20% wastage",
//     impact: "Medium",
//     savings: 8,
//     icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
//   },
//   {
//     title: "Adjust Tank Refill Schedule",
//     description: "Optimize refill timing based on usage patterns",
//     impact: "Low",
//     savings: 4,
//     icon: <Lightbulb className="w-4 h-4 text-yellow-500" />,
//   },
//   {
//     title: "Enable Conservation Mode",
//     description: "AI-powered usage optimization during low-demand periods",
//     impact: "High",
//     savings: 15,
//     icon: <Sparkles className="w-4 h-4 text-purple-600" />,
//   },
// ];

// const impactStyles = {
//   High: "bg-green-100 text-green-600",
//   Medium: "bg-yellow-100 text-yellow-600",
//   Low: "bg-gray-100 text-gray-500",
// };

// export default function SmartSuggestionsCard() {
//   const total = suggestions.reduce((sum, item) => sum + item.savings, 0);

//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm w-full max-w-md">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Lightbulb className="text-yellow-500 w-5 h-5" />
//           <h3 className="font-semibold text-gray-800 text-sm">Smart Suggestions</h3>
//         </div>
//         <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full font-medium">
//           AI Powered
//         </span>
//       </div>

//       <div className="space-y-3">
//         {suggestions.map((s, i) => (
//           <div key={i} className="border rounded-xl p-3 bg-white flex justify-between items-start hover:bg-gray-50 cursor-pointer transition">
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-1">
//                 {s.icon}
//                 <h4 className="text-sm font-semibold text-gray-800">{s.title}</h4>
//               </div>
//               <p className="text-sm text-gray-500">{s.description}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <span
//                   className={`text-xs font-medium px-2 py-0.5 rounded-full ${impactStyles[s.impact as keyof typeof impactStyles]}`}
//                 >
//                   {s.impact} Impact
//                 </span>
//                 <span className="text-green-600 text-sm font-medium">
//                   ${s.savings}/month
//                 </span>
//               </div>
//             </div>
//             <span className="text-gray-300 text-lg">›</span>
//           </div>
//         ))}
//       </div>

//       <hr className="my-4" />
//       <p className="text-sm text-gray-600 text-center">
//         Potential total savings:{" "}
//         <span className="text-green-600 font-semibold">${total}/month</span>
//       </p>
//     </div>
//   );
// }
