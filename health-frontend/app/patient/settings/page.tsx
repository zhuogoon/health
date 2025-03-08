"use client";

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import { get } from "@/net";
import { SettingsForm } from "@/components/form/SettingsForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export interface PatientInfo {
  name: string;
  height: number;
  weight: number;
  birthday: string;
  sex: string;
  phone: string;
  address: string;
  allergens: string;
  medical_history: string;
  age: number;
  avatar: string;
}

const Settings = () => {
  const [data, setData] = useState<PatientInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const result = await get("/api/patient/info");
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      uploadAvatar(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadAvatar = async (file: File) => {
    const jwt = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://localhost:8080/api/user/upload-avatar",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("上传成功:", result);
        toast({
          title: "上传成功",
          description: "头像上传成功",
        });

        fetchData();
      } else {
        console.error("上传失败:", result.msg);
      }
    } catch (error) {
      console.error("上传失败:", error);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6 p-6 bg-white dark:bg-gray-950 transition-colors duration-200">
      {/* 左侧表单区域 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex justify-center items-center">
          <div className="w-full max-w-3xl px-6 py-8">
            <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-gray-50">
              设置
              <span className="ml-2 text-teal-500 dark:text-teal-400">
                个人信息
              </span>
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
              这里可以修改您之前的设置信息
            </p>
            <div className="mt-8">
              <SettingsForm data={data} onSuccess={fetchData} />
            </div>
          </div>
        </div>
      </div>

      {/* 右侧信息展示区域 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center w-full p-6">
          {/* 头像区域 */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Image
                src={`http://localhost:8080/api/user/images/${data?.avatar}`}
                alt="头像"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800 shadow-sm"
                width={96}
                height={96}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <Button
              onClick={handleButtonClick}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              更换头像
            </Button>
          </div>

          {/* 个人信息区域 */}
          <div className="w-full max-w-md">
            <div className="flex items-center mb-5">
              <div className="mr-2 bg-teal-100 dark:bg-teal-900/40 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-teal-600 dark:text-teal-300">🧑</span>
              </div>
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-50">
                个人信息
              </h2>
            </div>

            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-5">
              <span className="text-gray-900 dark:text-gray-100 text-lg font-medium">
                {data?.name || "未设置"}
              </span>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-lg font-medium ${
                    data?.sex === "男" ? "text-blue-500" : "text-pink-500"
                  }`}
                >
                  {data?.sex === "男" ? "♂" : "♀"}
                </span>
                <span className="text-gray-500 dark:text-gray-400 font-mono text-sm">
                  {data?.age} 周岁
                </span>
              </div>
            </div>

            {/* 基础信息卡片 */}
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50 mb-5">
              <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4">
                基础信息
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                    <Image
                      unoptimized
                      src="/icons/phone.svg"
                      width={16}
                      height={16}
                      alt="电话"
                      className="opacity-70"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                    {data?.phone || "未设置"}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    <Image
                      unoptimized
                      src="/icons/address.svg"
                      width={16}
                      height={16}
                      alt="地址"
                      className="opacity-70"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
                    {data?.address || "未设置"}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                    <Image
                      unoptimized
                      src="/icons/日历.png"
                      width={16}
                      height={16}
                      alt="生日"
                      className="opacity-70"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                    {data?.birthday
                      ? formatDate(new Date(data.birthday))
                      : "未设置"}
                  </span>
                </div>
              </div>
            </div>

            {/* 医疗信息卡片 */}
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4">
                医疗信息
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                    <Image
                      unoptimized
                      src="/icons/身高.svg"
                      width={16}
                      height={16}
                      alt="身高"
                      className="opacity-70"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                    {data?.height ? `${data.height} cm` : "未设置"}
                  </span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
                    <Image
                      unoptimized
                      src="/icons/体重.svg"
                      width={16}
                      height={16}
                      alt="体重"
                      className="opacity-70"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                    {data?.weight ? `${data.weight} kg` : "未设置"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-amber-600 dark:text-amber-400 mr-2">
                      😣
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      过敏源:
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {data?.allergens || "还没有相关信息"}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">
                      📄
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      过往病史:
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {data?.medical_history || "还没有相关信息"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
