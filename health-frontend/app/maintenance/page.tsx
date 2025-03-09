"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Clock, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { get } from "@/net";

export default function MaintenancePage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(30);
  const [checking, setChecking] = useState(false);

  // 每30秒检查一次系统是否仍在维护
  useEffect(() => {
    const checkMaintenanceStatus = async () => {
      try {
        setChecking(true);
        console.log("正在检查维护状态...");
        const response = await get("/api/system/maintenance");
        console.log("维护状态响应:", response);

        // 处理多种可能的API响应格式
        let isInMaintenance = false;

        if (typeof response === "boolean") {
          // 直接返回布尔值: true/false
          isInMaintenance = response;
        } else if (response && typeof response === "object") {
          if ("data" in response) {
            // {data: true/false} 或 {code: 200, message: "success", data: true/false}
            isInMaintenance = response.data === true;
          }
        }

        console.log("系统是否处于维护状态:", isInMaintenance);

        if (!isInMaintenance) {
          console.log("系统已退出维护模式，即将跳转到首页");
          // 如果系统不再维护，返回首页
          router.push("/");
        } else {
          console.log("系统仍在维护中，保持在当前页面");
        }
      } catch (error) {
        console.error("检查维护状态失败:", error);
      } finally {
        setChecking(false);
      }
    };

    // 设置倒计时
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          checkMaintenanceStatus();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    // 初始检查
    checkMaintenanceStatus();

    return () => {
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-lime-50 to-lime-100 dark:from-green-900/30 dark:to-green-950 px-4">
      <div className="max-w-md w-full">
        <Card className="border-2 border-lime-400 dark:border-lime-700 shadow-lg">
          <CardHeader className="bg-lime-100 dark:bg-green-900/30 border-b border-lime-300 dark:border-lime-800">
            <CardTitle className="flex items-center justify-center text-green-700 dark:text-lime-400">
              <AlertTriangle className="h-6 w-6 mr-2" />
              系统维护中
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 pb-8 px-6 text-center space-y-6">
            <div className="flex flex-col items-center justify-center">
              <Settings className="h-16 w-16 text-lime-500 dark:text-lime-400 animate-spin-slow" />
              <div className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                我们正在升级系统
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                系统正在进行例行维护和升级，以提供更好的服务体验。
                请稍后再试，感谢您的理解与支持。
              </p>
            </div>

            <div className="bg-lime-100 dark:bg-green-900/40 rounded-lg p-4 inline-block">
              <div className="flex items-center text-green-700 dark:text-lime-300">
                <Clock className="h-5 w-5 mr-2" />
                <span>
                  将在 <span className="font-medium">{countdown}</span> 秒后
                  {checking ? "检查中..." : "自动检查系统状态"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="border-lime-400 dark:border-lime-700 text-green-700 dark:text-lime-300 hover:bg-lime-50 dark:hover:bg-green-900/30"
                onClick={() => router.push("/admin")}
              >
                前往管理员页面
              </Button>
              <Button variant="ghost" onClick={() => window.location.reload()}>
                刷新页面
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          如需紧急帮助，请联系系统管理员
        </p>
      </div>
    </div>
  );
}
