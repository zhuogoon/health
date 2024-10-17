"use client";
import Link from "next/link";
import Image from "next/image";
import StarCard from "@/components/ui/StarCard";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjk2ODUyMjAsImlhdCI6MTcyOTA4MDQyMCwidXNlcm5hbWUiOiJjaGVuIn0.U8iMSxTTHMrT10TWg35xHXiCB8R97m00KHlksKWlmQI";

        const response = await fetch("http://127.0.0.1:8080/api/admin/count", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // 在请求头中添加token
            "Content-Type": "application/json", // 可选：根据需要添加其他头部
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setCounts({
          appointments: result.data.check_project_count, // 根据实际返回数据字段调整
          patients: result.data.patient_count, // 根据实际返回数据字段调整
          doctors: result.data.doctor_count, // 根据实际返回数据字段调整
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
      <div className="flex justify-center">
        <header className="admin-header flex w-[900px] justify-between items-center bg-gray-300 border-b-2 rounded-3xl p-2">
          <Link href="/home" className="cursor-pointer">
            <Image
              src="/images/icon.png" // 确保图像路径正确
              width={100}
              height={100}
              alt="GoDoc logo"
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>
      </div>

      <section className="w-full space-y-4">
        <p className="text-6xl text-teal-400">欢迎你，管理员！</p>
        <p>从管理检查项目、患者、医生等信息，开始新的一天。</p>
      </section>
      <div className="flex w-full space-x-4 mt-10">
        <div className="flex flex-1 py-5 rounded-3xl bg-yellow-200 items-center justify-center">
          <a href="/admin">
            <StarCard
              type="appointments"
              count={counts.appointments}
              icon="/images/appiontment.png"
              label="检查项目管理"
            />
          </a>
        </div>
        <div className="flex flex-1 py-5 rounded-3xl bg-yellow-400 items-center justify-center">
          <a href="/admin/patient">
            <StarCard
              type="patients"
              count={counts.patients}
              icon="/images/patient.png"
              label="患者管理"
            />
          </a>
        </div>
        <div className="flex flex-1 py-5 rounded-3xl bg-yellow-600 items-center justify-center">
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
