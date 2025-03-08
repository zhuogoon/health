"use client";

import { Avatar } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/modeToggle";
import { NavigationMenuDemo } from "@/components/ui/navbarMenu";
import { PatientProvider } from "@/context/PatientContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { get } from "@/net";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await get("/api/auth/logout");
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("退出登录失败:", error);
    }
  };

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
            unoptimized
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
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-red-600 dark:text-red-400 border-gray-200 dark:border-gray-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
          <ModeToggle />
          <PatientProvider>
            <Avatar />
          </PatientProvider>
        </div>
      </div>
      <div className="flex-grow bg-blue-50/50 dark:bg-zinc-950">{children}</div>
      <Toaster />
    </div>
  );
}
