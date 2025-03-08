"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

// 简单的自定义通知组件
const Notification = ({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white z-[9999]`}
    >
      <div className="flex justify-between">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default function ToastTestPage() {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  } | null>(null);

  // 使用我们的toast组件
  const showSuccessToast = () => {
    toast({
      title: "成功测试",
      description: "这是一个成功提示消息",
      variant: "default",
    });
    console.log("尝试显示成功toast");
  };

  const showErrorToast = () => {
    toast({
      title: "错误测试",
      description: "这是一个错误提示消息",
      variant: "destructive",
    });
    console.log("尝试显示错误toast");
  };

  // 使用浏览器原生alert
  const showBrowserAlert = () => {
    window.alert("这是一个浏览器原生的alert");
  };

  // 使用我们的自定义通知组件
  const showCustomSuccess = () => {
    setNotification({
      message: "这是一个自定义成功通知",
      type: "success",
      visible: true,
    });

    // 5秒后自动关闭
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const showCustomError = () => {
    setNotification({
      message: "这是一个自定义错误通知",
      type: "error",
      visible: true,
    });

    // 5秒后自动关闭
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Toast测试页面</h1>
      <p className="mb-4">点击下面的按钮测试各种通知功能是否正常工作</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-800 rounded-md">
          <h2 className="text-lg font-medium">内置Toast组件</h2>
          <div className="flex gap-4">
            <Button
              onClick={showSuccessToast}
              className="bg-green-500 hover:bg-green-600"
            >
              显示成功Toast
            </Button>

            <Button
              onClick={showErrorToast}
              className="bg-red-500 hover:bg-red-600"
            >
              显示错误Toast
            </Button>
          </div>
        </div>

        <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-800 rounded-md">
          <h2 className="text-lg font-medium">浏览器原生Alert</h2>
          <Button
            onClick={showBrowserAlert}
            className="bg-blue-500 hover:bg-blue-600"
          >
            显示浏览器Alert
          </Button>
        </div>

        <div className="space-y-4 p-4 border border-gray-200 dark:border-gray-800 rounded-md md:col-span-2">
          <h2 className="text-lg font-medium">自定义通知组件</h2>
          <div className="flex gap-4">
            <Button
              onClick={showCustomSuccess}
              className="bg-green-500 hover:bg-green-600"
            >
              显示自定义成功通知
            </Button>

            <Button
              onClick={showCustomError}
              className="bg-red-500 hover:bg-red-600"
            >
              显示自定义错误通知
            </Button>
          </div>
        </div>
      </div>

      {/* 显示自定义通知 */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
