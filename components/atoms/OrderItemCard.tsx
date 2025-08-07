import Image from "next/image";

interface CardProps {
  imageUrl?: string;
  name: string;
  price: number;
  offeredPrice?: number;
  value: string;
  quantity?: number;
}

export default function OrderItemCard({
  item: { imageUrl, name, price, offeredPrice, value, quantity },
}: {
  item: CardProps;
}) {
  return (
    <div className="w-full">
      <div className="flex p-2 gap-2 items-center rounded-lg bg-white cursor-pointer">
        <Image
          src={imageUrl ? imageUrl : "/img/holder/category.png"}
          loading="lazy"
          alt="card image"
          width={64}
          height={64}
          className="object-cover aspect-square rounded"
        />

        <div className="flex w-full justify-between gap-2">
          <div className="flex-auto">
            <h1 className="text-primary font-bold">{name}</h1>
            <div className="text-sm">{value}</div>
            {quantity && <div className="text-xs">Qty: {quantity}</div>}
          </div>
          <div className="flex items-center">
            {` ${
              offeredPrice
                ? quantity
                  ? offeredPrice * quantity
                  : offeredPrice
                : price
            }$`}{" "}
            <span className="text-red-500 line-through text-xs">
              {offeredPrice && `${quantity ? price * quantity : price}$`}
            </span>
            {"  "}
          </div>
        </div>
      </div>
    </div>
  );
}
