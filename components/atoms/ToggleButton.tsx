"use client";
import { useEffect, useState } from "react";
import QuantityCounter from "@/components/atoms/QuantityCounter";
import Button from "@/components/atoms/Button";
import { useStore } from "@/store/cardStore";

export default function ToggleButton({
  id,
  name,
  size,
  value,
  price,
  offeredPrice,
  imageUrl,
  isAvailable,
  inCart,
}: {
  id: string;
  name: string;
  size?: string;
  value: string;
  price: number;
  offeredPrice?: number;
  imageUrl?: string;
  isAvailable?: boolean;
  inCart?: boolean;
}) {
  const cart = useStore((state) => state.cart);
  const updateCart = useStore((state) => state.updateCart);
  const removeItem = useStore((state) => state.removeItem);
  const setTotal = useStore((state) => state.setTotal);
  const [quantity, setQuantity] = useState(cart[id]?.quantity || 0);

  useEffect(() => {
    if (!!id && !!quantity) {
      updateCart({
        [`${id}`]: {
          productId: id,
          name,
          value,
          price,
          offeredPrice,
          imageUrl,
          quantity,
          isAvailable,
        },
      });
    }

    if (!!id && quantity === 0) removeItem(id);
  }, [
    quantity,
    id,
    imageUrl,
    name,
    price,
    offeredPrice,
    removeItem,
    updateCart,
    value,
    isAvailable,
  ]);

  useEffect(() => {
    if (!!cart[id]) setQuantity(cart[id]?.quantity);
    setTotal();
  }, [setTotal, cart, id]);

  return (
    <div className="max-w-xs mx-auto w-full">
      {quantity > 0 ? (
        <div className="fadeIn">
          <QuantityCounter
            inCart={inCart}
            size={size}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      ) : (
        <div className="w-full">
          <Button
            width={"w-full"}
            text={"Add"}
            onClick={() => setQuantity(1)}
            isPrimary={true}
          />
        </div>
      )}
    </div>
  );
}
