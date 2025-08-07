export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"text-sm pl-2 py-2 text-red-500 font-bold"}>{children}</div>
  );
}
