export default function Box({ children, title, hasShadow }: boxTypes) {
  return (
    <div
      className={`relative rounded-xl flex flex-col gap-3 w-full max-w-[26rem] mx-auto bg-white border border-gray-200 p-3 ${
        hasShadow && "p-2 shadow-[0_0_5px_0_rgba(0,0,0,0.2)"
      }`}>
      {title && <div className="text-xl font-bold">{title}</div>}
      {children}
    </div>
  );
}

type boxTypes = {
  children: React.ReactNode;
  title?: string;
  hasShadow?: boolean;
};
