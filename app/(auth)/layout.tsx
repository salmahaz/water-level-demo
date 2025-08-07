import Logo from "@/components/atoms/Logo";
//import TopBar from "@/components/sections/sectionComponents/TopBar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <TopBar noLogo hasBack /> */}
      <div className="p-4 max-w-md m-auto">
        <div className="w-52 mx-auto py-14">
          <Logo isPrimary />
        </div>
        {children}
      </div>
    </>
  );
}
