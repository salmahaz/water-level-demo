// "use client";

// import Button from "@/components/atoms/Button";
// import ConfigLayout from "@/components/sections/configSteps/configLayout";
// import { useRouter } from "next/navigation";

// export default function ComingSoon({title} : {title: string}) {
//   const router = useRouter();
//   return (
//     <div className="text-center">
//       <ConfigLayout src={"/img/gif/cup.gif"}>
//         <h1 className="text-3xl font-bold text-gray-800 animate-bounce pt-2">
//           🚀 {title} Coming Soon!
//         </h1>
//         <p className="text-gray-600 max-w-md">
//           We are working hard to bring you amazing {title.toLowerCase()}. Stay tuned for
//           updates!
//         </p>
//         <Button
//           isPrimary
//           text={"Back to home"}
//           onClick={() => router.push("/")}
//         />
//       </ConfigLayout>
//     </div>
//   );
// }
