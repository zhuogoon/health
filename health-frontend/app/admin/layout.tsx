"use client";
import Link from "next/link";
import Image from "next/image";
import StarCard from "@/components/ui/StarCard";

import React, { useEffect, useState } from "react";
import { NavigationMenuDemo } from "@/components/ui/navbarMenu";
import { ModeToggle } from "@/components/ui/modeToggle";
import { useRouter } from "next/navigation";
import { get } from "@/net";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [counts, setCounts] = useState<{
    appointments: number;
    patients: number;
    doctors: number;
  }>({
    appointments: 0,
    patients: 0,
    doctors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await get("/api/admin/count");

        setCounts({
          appointments: data.check_project_count, // 根据实际返回数据字段调整
          patients: data.patient_count, // 根据实际返回数据字段调整
          doctors: data.doctor_count, // 根据实际返回数据字段调整
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
        setError("无法获取统计数据");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
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
        <ModeToggle />
      </div>

      <section className="w-full space-y-4">
        <p className="text-6xl text-teal-400">欢迎你，管理员！</p>
        <p>从管理检查项目、患者、医生等信息，开始新的一天。</p>
      </section>
      <div className="flex w-full space-x-4 mt-10">
        <div className="flex flex-1 py-5 rounded-3xl bg-green-200 items-center justify-center">
          <a href="/admin">
            <StarCard
              type="appointments"
              count={counts.appointments}
              icon="/images/appiontment.png"
              label="检查项目管理"
            />
          </a>
        </div>
        <div className="flex flex-1 py-5 rounded-3xl bg-green-300 items-center justify-center">
          <a href="/admin/patient">
            <StarCard
              type="patients"
              count={counts.patients}
              icon="/images/patient.png"
              label="患者管理"
            />
          </a>
        </div>
        <div className="flex flex-1 py-5 rounded-3xl bg-green-400 items-center justify-center">
          <a href="/admin/doctor">
            <StarCard
              type="doctors"
              count={counts.doctors}
              icon="/images/doctor.png"
              label="医生管理"
            />
          </a>
        </div>
      </div>

      {children}
    </div>
  );
}
