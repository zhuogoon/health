"use client";

import { Avatar } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { NavigationMenuDemo } from "@/components/ui/navbarMenu";
import { PatientProvider } from "@/context/PatientContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between px-3 py-3">
        <Link href="/home" className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/images/icon.png"
            width={100}
            height={100}
            alt="icon"
            className="w-10 h-10 rounded-2xl"
          />
          <div
            className="text-2xl font-semibold"
            onClick={() => router.push("/home")}
          >
            <div className="text-3xl font-semibold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-500">
                智慧医疗系统
              </span>
            </div>
          </div>
        </Link>

        <NavigationMenuDemo />
        <div className="flex items-center gap-6">
          <ModeToggle />
          <PatientProvider>
            <Avatar />
          </PatientProvider>
        </div>
      </div>
      <div
        className="flex-grow  dark:bg-zinc-950"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        {children}
      </div>
    </div>
  );
}
