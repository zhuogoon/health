"use client";
import React from "react";
import Image from "next/image";
import { PatientProvider } from "@/context/PatientContext";
import { ModeToggle } from "@/components/ui/modeToggle";
import { Avatar } from "@/components/ui/avatar";
import { DoctorNavbar } from "@/components/ui/DoctorNavbar";
import Link from "next/link";

// DoctorLayout 组件
export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between px-3 py-3">
        <Link href={"/doctor/home"} className="flex items-center gap-2">
          <Image
            src="/images/icon.png"
            width={100}
            height={100}
            alt="icon"
            className="w-10 h-10 rounded-2xl"
          />
          <div className="text-3xl font-semibold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-500">
              智慧医疗系统
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <ModeToggle />
          <PatientProvider>
            <Avatar />
          </PatientProvider>
        </div>
      </div>
      <div
        className="flex-grow bg-zinc-50/50"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        {children}
      </div>
    </div>
  );
}
