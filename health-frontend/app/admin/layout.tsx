"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ui/modeToggle";
import { useRouter, usePathname } from "next/navigation";
import { get } from "@/net";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { LogOut } from "lucide-react";

export default function AdminLayout({
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
  const pathname = usePathname();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const data = await get("/api/admin/count");

        setCounts({
          appointments: data.check_project_count,
          patients: data.patient_count,
          doctors: data.doctor_count,
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

  // 判断当前活动路径的函数
  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(path);
  };

  // 添加退出登录函数
  const handleLogout = async () => {
    try {
      await get("/api/auth/logout");
      // 清除本地存储
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      // 跳转到登录页
      router.push("/");
    } catch (error) {
      console.error("退出登录失败:", error);
    }
  };

  if (error) return <div>错误: {error}</div>;

  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        {/* 侧边栏 */}
        <div className="w-64 bg-white dark:bg-gray-900 shadow-md flex flex-col border-r border-gray-200 dark:border-gray-800">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/images/icon.png"
                width={40}
                height={40}
                alt="智慧医疗系统"
                className="rounded-md"
              />
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                智慧医疗系统
                <span className="text-xs text-teal-500 ml-1">管理后台</span>
              </span>
            </Link>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin">
              <div
                className={`px-4 py-3 rounded-lg flex items-center text-sm font-medium ${
                  isActive("/admin")
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                控制台概览
              </div>
            </Link>

            <Link href="/admin/patients">
              <div
                className={`px-4 py-3 rounded-lg flex items-center text-sm font-medium ${
                  isActive("/admin/patients")
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                患者管理
              </div>
            </Link>

            <Link href="/admin/doctors">
              <div
                className={`px-4 py-3 rounded-lg flex items-center text-sm font-medium ${
                  isActive("/admin/doctors")
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                医生管理
              </div>
            </Link>

            <Link href="/admin/checkProjects">
              <div
                className={`px-4 py-3 rounded-lg flex items-center text-sm font-medium ${
                  isActive("/admin/checkProjects")
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                检查项目
              </div>
            </Link>

            <div className="pt-2 pb-2">
              <div className="border-t border-gray-200 dark:border-gray-800"></div>
            </div>

            <Link href="/admin/settings">
              <div
                className={`px-4 py-3 rounded-lg flex items-center text-sm font-medium ${
                  isActive("/admin/settings")
                    ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                系统设置
              </div>
            </Link>
          </nav>

          {/* 底部 */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              © 2024 智慧医疗系统
            </div>
            <ModeToggle />
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* 头部导航栏 */}
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-6 sticky top-0 z-10">
            <div className="flex-1">
              <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {pathname === "/admin" && "控制台概览"}
                {pathname === "/admin/patients" && "患者管理"}
                {pathname === "/admin/doctors" && "医生管理"}
                {pathname === "/admin/checkProjects" && "检查项目管理"}
                {pathname === "/admin/settings" && "系统设置"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/")}
                className="text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              >
                返回前台
              </Button>

              {/* 添加退出登录按钮 */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 dark:text-red-400 border-gray-200 dark:border-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                退出登录
              </Button>
            </div>
          </header>

          {/* 统计卡片 - 仅在概览页显示 */}
          {pathname === "/admin" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      检查项目总数
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {counts.appointments}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      患者总数
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {counts.patients}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      医生总数
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {counts.doctors}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 主内容 */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
            {children}
          </main>
        </div>
      </div>

      {/* 将Toaster放在最外层，确保不会被其他元素覆盖 */}
      <Toaster />
    </>
  );
}
