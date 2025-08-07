// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import settingsIcon from "@/public/svg/settings.svg";
// import { sensorState } from "@/utils/sensorState";
// import { useMqttContext } from "@/mqtt/MqttProvider";

// import TankSVG from "./svg/TankSVG";
// import TankDetails from "./TankDetails";
// import { UserWaterTank } from "../sections/tankSections/TankList";
// import Badge from "./Badge";
// import { TbReportAnalytics } from "react-icons/tb";
// import { updateDistance } from "@/actions/tanks/updateDistance";

// export default function Tank({ tank }: { tank: UserWaterTank }) {
//   const [waterLevel, setWaterLevel] = useState(0);
//   const [timeStamp, setTimeStamp] = useState<Date | null>(() => {
//     if (typeof window !== "undefined") return new Date();
//     return null;
//   });
//   const [isLoading, setisLoading] = useState(true);
//   const { subscribe, payload } = useMqttContext();

//   /** Subscribe to MQTT distance updates */
//   useEffect(() => {
//     if (tank?.serialNumber) {
//       const macTopic = `${tank.serialNumber}/distance`;
//       subscribe(macTopic);
//     }
//   }, [subscribe, tank?.serialNumber]);

//   /** Handle MQTT Payload Updates */
//   useEffect(() => {
//     console.log("[MQTT] useEffect triggered with payload and tank:", {
//       payload,
//       tank,
//     });

//     if (!payload || !tank) {
//       console.log("[MQTT] Exiting useEffect: missing payload or tank");
//       return;
//     }

//     const payloadData = payload[`${tank.serialNumber}/distance`];
//     console.log(
//       "[MQTT] payloadData for topic:",
//       `${tank.serialNumber}/distance`,
//       payloadData
//     );

//     if (!payloadData) {
//       console.log("[MQTT] No payload data for topic, exiting");
//       return;
//     }

//     try {
//       const currentPayload = JSON.parse(payloadData);
//       console.log("[MQTT] Parsed currentPayload:", currentPayload);

//       const rawDistance = Number(currentPayload?.distance || 0);
//       const tankX = Number(tank?.x || 0);

//       const newDistance = Math.round(Math.round(rawDistance) / 10 - tankX);
//       console.log("[MQTT] Calculated newDistance:", newDistance);

//       updateDistance(tank._id, newDistance);
//       console.log(
//         `[MQTT] Called updateDistance with tankId: ${tank._id}, distance: ${newDistance}`
//       );

//       if (currentPayload.time) {
//         const time = new Date(0);
//         time.setUTCSeconds(currentPayload.time);
//         setTimeStamp(time);
//         console.log("[MQTT] Updated timeStamp:", time);
//       }

//       const newHeight = Number(tank?.height) - tankX;
//       const calc = Math.round(((newHeight - newDistance) * 100) / newHeight);
//       console.log("[MQTT] Calculated water level percent:", calc);

//       setWaterLevel(Math.min(100, Math.max(1, calc)));
//     } catch (error) {
//       console.error("Error parsing MQTT payload:", error);
//     }

//     setisLoading(false);
//   }, [payload, tank]);

//   return (
//     <div className="border border-gray-200 max-w-[29rem] flex-[24rem] px-4 py-2 rounded-2xl bg-white">
//       <div className="text-2xl flex items-center justify-between pt-2">
//         <div className="flex flex-col">
//           <span>{tank?.name}</span>
//           {tank?.userType === "viewer" && <Badge title="Viewer Access" />}
//           {tank?.userType === "agent" && <Badge title="Agent Access" />}
//         </div>
//         <div className="flex items-center gap-2">
//           <Link href="/water-intelligence" title="View Analytics">
//             <TbReportAnalytics className="w-7 h-7 text-gray-400  hover:text-primary transition cursor-pointer" />
//           </Link>
//           <Link href={`/tank-settings/${tank._id}`} title="Settings">
//             <Image
//               width={30}
//               src={settingsIcon}
//               alt="settings"
//               className="w-8 h-8 cursor-pointer"
//             />
//           </Link>
//         </div>
//       </div>

//       <TankDetails
//         tank={tank}
//         waterLevel={waterLevel}
//         timeStamp={timeStamp}
//         isLoading={isLoading}
//       />

//       <div className="transition-all duration-[3s] ease-in-out">
//         <TankSVG level={waterLevel} tankType={tank?.tankType} />
//       </div>

//       <div className="text-xl flex items-center justify-between pt-2">
//         <div>Sensor State</div>
//         {!isLoading && (
//           <div
//             className={`rounded-full w-4 h-4 ${
//               sensorState({
//                 date: timeStamp,
//               })
//                 ? "bg-primary"
//                 : "bg-secondary"
//             }`}
//           ></div>
//         )}
//       </div>
//     </div>
//   );
// }
