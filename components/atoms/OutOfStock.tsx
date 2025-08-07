import { FaCartShopping } from "react-icons/fa6";

export default function OutOfStock() {
  return (
    <div
      className={`flex gap-2 items-center justify-center rounded-md py-3 px-2 text-center h-12 w-full border transition-all duration-200 ease-in-out text-base not-italic leading-normal border-red-500 text-red-500`}>
      <FaCartShopping />
      Out of stock
    </div>
  );
}
