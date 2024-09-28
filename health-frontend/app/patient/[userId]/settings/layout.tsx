"use client";

import { Avatar } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { NavigationMenuDemo } from "@/components/ui/navbarMenu";
import { PatientProvider } from "@/context/PatientContext";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
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
          <PatientProvider>
            <Avatar />
          </PatientProvider>
        </div>
      </div>
      <div className="flex-grow " style={{ height: "calc(100vh - 5rem)" }}>
        {children}
      </div>
    </div>
  );
}
