"use client";

import { useEffect, ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface RouteGuardProps {
  children: ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 确保代码在客户端执行
    if (typeof window !== "undefined") {
      // 检查用户是否已登录
      const jwt = localStorage.getItem("jwt");
      const role = localStorage.getItem("role");
      const isLoggedIn = !!jwt;

      // 登录页特殊处理
      if (pathname === "/") {
        if (isLoggedIn) {
          // 已登录用户根据角色重定向
          if (role === "admin") {
            router.push("/admin");
          } else if (role === "doctor") {
            router.push("/doctor/home");
          } else {
            // 默认为患者
            router.push("/home");
          }
        } else {
          // 未登录用户可以访问登录页
          setIsAuthorized(true);
        }
        return;
      }

      // 处理未登录用户
      if (!isLoggedIn) {
        router.push("/");
        return;
      }

      // 根据角色检查路径权限
      if (pathname.startsWith("/admin") && role !== "admin") {
        router.push("/");
        return;
      }

      if (pathname.startsWith("/doctor") && role !== "doctor") {
        router.push("/");
        return;
      }

      if (pathname.startsWith("/home") && role !== "patient" && !role) {
        router.push("/");
        return;
      }

      // 如果通过所有检查，则授权访问
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  // 等待授权检查完成
  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
