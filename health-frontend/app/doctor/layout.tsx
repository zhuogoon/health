"use client";
import React from "react";
import Image from "next/image";
import { PatientProvider } from "@/context/PatientContext";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Avatar } from "@/components/ui/avatar";
import { DoctorNavbar } from "@/components/ui/DoctorNavbar";

// DoctorLayout 组件
export default function DoctorLayout({
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

        <DoctorNavbar />
        <div className="flex items-center gap-6">
          <ModeToggle />
          <PatientProvider>
            <Avatar />
          </PatientProvider>
        </div>
      </div>
      <div className="flex-grow bg-red-200">{children}</div>
    </div>
  );
}
