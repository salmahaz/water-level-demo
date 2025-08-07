"use client";
import sendOrder, { SendOrderDT } from "@/utils/sendOrder";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/cardStore";

export default function WhatsappButton({
  orderId,
  name,
  phoneNumber,
  address,
  url,
}: SendOrderDT) {
  const clearCart = useStore((state) => state.clearCart);
  const router = useRouter();

  const handleClick = async () => {
    sendOrder({ name, phoneNumber, address, url });
    clearCart();
    setTimeout(() => {
      router.replace(`/cart/${orderId}/sendOrder`);
    }, 2000);
  };
  return (
    <button
      onClick={handleClick}
      className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded">
      Confirm by sending on Whatsapp
    </button>
  );
}
