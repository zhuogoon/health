import { Avatar } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { NavigationMenuDemo } from "@/components/ui/navbarMenu";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="/images/icon.png"
            width={100}
            height={100}
            alt="icon"
            className="w-10 h-10 rounded-2xl"
          />
          <div className="text-2xl font-semibold">智慧医疗系统</div>
        </div>

        <NavigationMenuDemo />
        <div className="flex items-center gap-6">
          <ModeToggle />
          <Avatar
            avatar="/images/avatar.png"
            name="Beiebi"
            role="User"
            phone="123123123"
          />
        </div>
      </div>
      <div className="flex-grow bg-black">{children}</div>
    </div>
  );
}
