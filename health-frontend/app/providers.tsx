"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { get } from "@/net";
import { toast } from "@/components/ui/use-toast";

// 不需要检查维护状态的路径
const EXEMPT_PATHS = ["/admin", "/maintenance", "/api"];

export function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // 如果是豁免路径，不需要检查
    const isExemptPath = EXEMPT_PATHS.some((path) =>
      pathname?.startsWith(path)
    );
    if (isExemptPath) {
      setChecked(true);
      return;
    }

    // 检查系统是否处于维护状态
    const checkMaintenance = async () => {
      try {
        console.log("客户端路由守卫: 检查维护状态");
        const response = await get("/api/system/maintenance");
        console.log("客户端路由守卫: 维护状态响应", response);

        // 如果系统处于维护状态，重定向到维护页面
        if (response === true) {
          console.log("客户端路由守卫: 系统处于维护状态，重定向到维护页面");
          router.push("/maintenance");
          return;
        }

        setChecked(true);
      } catch (error) {
        console.error("客户端路由守卫: 检查维护状态失败", error);
        // 出错时允许访问
        setChecked(true);
        toast({
          title: "系统状态检查失败",
          description: "无法确认系统状态，部分功能可能不可用",
          variant: "destructive",
        });
      }
    };

    checkMaintenance();
  }, [pathname, router]);

  // 正在检查时，显示加载状态或空白页面
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return <MaintenanceGuard>{children}</MaintenanceGuard>;
}

export default Providers;
