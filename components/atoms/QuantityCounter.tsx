"use client";
interface QuantityCounterProps {
  quantity: number;
  size?: string;
  setQuantity: (quantity: number) => void;
  inCart?: boolean;
}

export default function QuantityCounter({
  quantity,
  size = "w-10 h-10",
  setQuantity,
  inCart = false,
}: QuantityCounterProps) {
  return (
    <div className="flex justify-between items-center">
      {!inCart ? (
        <button
          onClick={() => setQuantity(quantity - 1)}
          className={`rounded-full bg-white ${size} text-primary text-xl border-primary border`}>
          -
        </button>
      ) : quantity !== 1 ? (
        <button
          onClick={() => setQuantity(quantity - 1)}
          className={`rounded-full bg-white ${size} text-primary text-xl border-primary border`}>
          -
        </button>
      ) : (
        <button
          className={`rounded-full bg-white ${size} text-gray-300 text-xl border-gray-300 border`}>
          -
        </button>
      )}

      <div className="px-3 text-lg">{quantity}</div>

      <button
        onClick={() => setQuantity(quantity + 1)}
        className={`rounded-full bg-primary ${size} text-white text-xl`}>
        +
      </button>
    </div>
  );
}
