import ToggleButton from "./ToggleButton";
import MyImage from "./MyImage";
import { FaTrash } from "react-icons/fa";
import { CartItem, useStore } from "@/store/cardStore";
import Link from "next/link";

export default function ItemCard({
  item,
  inCart,
}: {
  item: CartItem;
  inCart?: boolean;
}) {
  const removeItem = useStore((state) => state.removeItem);
  const cart = useStore((state) => state.cart);

  return (
    <div className="flex p-2 justify-between rounded-lg bg-white border border-light_gray">
      <div className="flex items-center gap-2">
        {item?.productId && inCart && cart[item?.productId].quantity == 1 && (
          <div
            className="text-red-500 cursor-pointer"
            onClick={() => removeItem(item?.productId)}>
            <FaTrash />
          </div>
        )}
        <Link
          href="#"
          prefetch>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
              <MyImage
                src={
                  (item?.imageUrl && item?.imageUrl) ||
                  "/img/holder/category.png"
                }
                alt={item?.name}
                width={64}
                height={64}
                className="rounded object-cover aspect-square"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-primary leading-4">{item?.name}</h1>
              <div className="text-sm">{item?.value}</div>
              <div className="text-sm text-gray-500">
                {" "}
                {`${item?.offeredPrice ?? item?.price}$`}{" "}
                <span className="text-red-500 line-through text-xs">
                  {item?.offeredPrice && `${item?.price}$`}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ToggleButton
          id={item?.productId}
          name={item?.name}
          size="w-8 h-8"
          value={item?.value}
          imageUrl={item?.imageUrl}
          price={item?.price}
          offeredPrice={item?.offeredPrice}
          inCart={inCart}
        />
        {
          <div className="text-sm text-gray-500">{`Total: ${
            (item?.offeredPrice || item?.price) *
            cart[item?.productId]?.quantity
          }$`}</div>
        }
      </div>
    </div>
  );
}
