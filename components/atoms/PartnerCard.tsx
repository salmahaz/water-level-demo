
// import Image from "next/image";
// import { Partner } from "../sections/sectionComponents/PartnersCarousel";

// export default function PartnerCard({ partner }: { partner: Partner }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="w-24 h-24  rounded-full overflow-hidden border border-gray-300 shadow-md transition-transform duration-300 hover:scale-105">
//         <Image
//           src={partner.imageUrl || "/img/category/cooler.png"}
//           alt={partner.name|| "Partner"}
//           width={96}
//           height={96}
//           className="object-cover w-full h-full"
//           priority={true}
//         />
//       </div>
//       <p
//         className="text-md font-medium text-gray-700 truncate text-center"
//         title={partner.name}
//       >
//         {partner.name|| "Unnamed Partner"}
//       </p>
//     </div>
//   );
// }