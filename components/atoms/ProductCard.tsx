import Link from "next/link";
import { Product } from "@/models/Product";
import Image from "next/image";
import OutOfStock from "./OutOfStock";
import Button from "./Button";
import ToggleButton from "./ToggleButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <>
      {product?.isAvailable ? (
        !product?.variations?.length ? (
          <div className="flex flex-col justify-between flex-[1_1_9rem] max-w-52 rounded-xl  border bg-white  border-GrayA hover:shadow-lg hover:border-primary cursor-pointer overflow-hidden">
            <Link
              href=""
              className="flex flex-col flex-auto"
              // href={`/categories/product/${product?._id}/${product?.name}`}
              prefetch>
              <Image
                src={
                  (product?.imageUrls &&
                    typeof product?.coverImageIndex === "number" &&
                    product?.imageUrls[product?.coverImageIndex]) ||
                  "/img/holder/category.png"
                }
                width={500}
                height={500}
                alt={product?.name}
                className="rounded-lg h-full aspect-square object-cover"
              />
              <div className="flex justify-between items-center flex-auto gap-2 p-2 pb-0">
                <h1 className="text-wrap first-letter:capitalize leading-5">
                  {product?.name}
                </h1>
                <div className="flex items-center">
                  {`${product?.offeredPrice ?? product?.price}$`}{" "}
                  <span className="text-red-500 line-through text-xs">
                    {product?.offeredPrice && `${product?.price}$`}
                  </span>
                </div>
              </div>
            </Link>
            <div className="p-2">
              <ToggleButton
                id={product?._id}
                name={product?.name}
                value={""}
                price={product?.price}
                offeredPrice={product?.offeredPrice}
                imageUrl={
                  (product?.imageUrls &&
                    typeof product?.coverImageIndex === "number" &&
                    product?.imageUrls[product?.coverImageIndex]) ||
                  "/img/holder/category.png"
                }
              />
            </div>
          </div>
        ) : (
          // ITEM HAS VARIATIONS
          <div className="flex flex-col justify-between flex-[1_1_9rem] max-w-56 rounded-xl  border  border-GrayA hover:shadow-lg hover:border-primary cursor-pointer overflow-hidden">
            <Image
              src={
                (product?.imageUrls &&
                  typeof product?.coverImageIndex === "number" &&
                  product?.imageUrls[product?.coverImageIndex]) ||
                "/img/holder/category.png"
              }
              width={500}
              height={500}
              alt={product?.name}
              className="rounded-lg w-full aspect-square object-cover"
            />
            <h1 className="flex justify-center items-center flex-auto p-2 pb-0 text-wrap first-letter:capitalize">
              {product?.name}
            </h1>
            <div className="p-2">
              <Link
                href=""
                // href={`/categories/product/${product?._id}/${product?.name}`}
                prefetch>
                <Button text="Variations" />
              </Link>
            </div>
          </div>
        )
      ) : (
        // OUT OF THE STOCK
        <div className="flex flex-col justify-between flex-[1_1_9rem] max-w-52 rounded-xl  border  border-GrayA hover:shadow-lg hover:border-primary overflow-hidden">
          <Image
            src={
              (product?.imageUrls &&
                typeof product?.coverImageIndex === "number" &&
                product?.imageUrls[product?.coverImageIndex]) ||
              "/img/holder/category.png"
            }
            width={500}
            height={500}
            alt={product?.name}
            className="rounded-lg w-full aspect-square object-cover"
          />
          <div className="flex justify-between items-center flex-auto gap-2 p-2 pb-0">
            <h1 className="text-wrap first-letter:capitalize leading-5">
              {product?.name}
            </h1>
          </div>
          <div className="p-2">
            <OutOfStock />
          </div>
        </div>
      )}
    </>
  );
}
