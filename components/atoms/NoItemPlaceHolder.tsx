import { LuShoppingBag } from "react-icons/lu";

export default function NoItemPlaceHolder({ text }: { text: string }) {
  return (
    <>
      <div className="flex flex-col justify-center gap-8 p-2 pt-20 text-center text-black_gray">
        <div className="text-8xl mx-auto">
          <LuShoppingBag />
        </div>
        <div>{text}</div>
      </div>
    </>
  );
}
