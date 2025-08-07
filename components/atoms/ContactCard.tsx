"use client";

interface ContactCardProps {
  name: string;
  phoneNumber?: string;
  address?: string;
}
export default function ContactCard({
  name,
  phoneNumber,
  address,
}: ContactCardProps) {
  return (
    <>
      <div className="flex flex-col justify-center border border-solid rounded-lg bg-white border-t-lighter_gray border-b-lighter_gray gap-2 py-2 px-3  w-full">
        <div className="flex items-center">
          <div className="flex w-11 h-11 justify-center items-center content-center gap-10 flex-wrap  rounded-full bg-primary">
            <h1 className="text-2xl text-white not-italic font-normal">
              {name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start flex-1 self-stretch pl-4 gap">
            <h1 className="text-black_gray text-xl font-medium leading-normal not-italic">
              {name}
            </h1>
            <h1 className="text-medium_gray text-xs font-normal leading-normal w-auto h-auto">
              {phoneNumber}
            </h1>
          </div>
        </div>
        {address && (
          <>
            <div className="flex justify-center items-start gap-2 self-stretch p-2">
              <hr className="flex-1 h-[1px] rounded-full bg-lighter_gray" />
            </div>
            <div className="flex justify-center items-start self-stretch gap-2 py-0 px-3">
              <h1 className="flex-1 text-xs font-normal leading-normal not-italic text-medium_gray">
                {address}
              </h1>
            </div>
          </>
        )}
      </div>
    </>
  );
}
