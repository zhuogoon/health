"use client";

import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import { get } from "@/net";
import { SettingsForm } from "@/components/form/SettingsForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface PatientInfo {
  name: string;
  height: number;
  weight: number;
  birthday: string;
  sex: boolean;
  phone: string;
  address: string;
  allergens: string;
  medical_history: string;
  age: number;
}

const Settings = () => {
  const [data, setData] = useState<PatientInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const response = await fetch("http://localhost:8080/api/user/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        console.log("上传成功:", result);
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
    <div className="flex h-full gap-3">
      <div className="flex-1 mx-3 overflow-y-auto custom-scrollbar border border-zinc-200 dark:border-zinc-800 shadow-md rounded-xl">
        <div className="flex justify-center items-center">
          <div className="w-[90%] h-[94%] overflow-y-auto custom-scrollbar">
            <div className="text-4xl font-semibold mt-16 ml-4">
              设置
              <span className="text-teal-400">个人信息📄</span>
            </div>
            <div className="text-zinc-600 ml-4 mt-3">
              这里可以修改您之前的设置
            </div>
            <SettingsForm data={data} onSuccess={fetchData} />
          </div>
        </div>
      </div>
      <div className="flex-1 mx-3 flex p-3 custom-scrollbar overflow-y-auto border border-zinc-200 dark:border-zinc-800 shadow-md rounded-xl">
        <div className="flex flex-col items-center w-full mt-4">
          <img
            width={64}
            height={64}
            src="http://localhost:8080/api/user/avatar"
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            onClick={handleButtonClick}
            className="m-3 bg-teal-300 text-zinc-700 w-16 h-6 hover:bg-teal-500 "
          >
            修改头像
          </Button>
          <div className="w-[80%] border-t-2 border-zinc-200 pt-4 mt-2 flex flex-col">
            <div className="space-x-1 m-3">
              <span className="text-2xl font-semibold">🧑</span>
              <span className="text-2xl font-semibold">个人信息</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-700 text-xl font-semibold">
                {data?.name}
              </span>
              <span className="space-x-5">
                {data?.sex ? (
                  <span className="text-blue-400 text-2xl font-semibold ">
                    ♂
                  </span>
                ) : (
                  <span className="text-red-400 text-2xl font-semibold">♀</span>
                )}
                <span className="text-zinc-500 font-mono">
                  {data?.age} 周岁
                </span>
              </span>
            </div>
            <div className="w-full h-[160px] mt-2 p-2 rounded-xl shadow-md bg-zinc-100/90 flex flex-col gap-4">
              <div className="text-zinc-600 text-lg font-semibold">
                基础信息
              </div>
              <div className="flex h-[40px] gap-3">
                <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
                  <Image
                    src="/icons/phone.svg"
                    width={24}
                    height={24}
                    alt="phone"
                  />
                  <span className="text-zinc-700 text-lg font-mono">
                    {data?.phone}
                  </span>
                </div>
                <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
                  <Image
                    src="/icons/address.svg"
                    width={24}
                    height={24}
                    alt="address"
                  />
                  <span className="text-zinc-700 text-lg">{data?.address}</span>
                </div>
              </div>
              <div className="flex h-[40px] gap-3">
                <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
                  <Image
                    src="/icons/日历.png"
                    width={24}
                    height={24}
                    alt="birthday"
                  />
                  <span className="text-zinc-700 text-lg font-mono">
                    {" "}
                    {data?.birthday ? formatDate(new Date(data.birthday)) : ""}
                  </span>
                </div>
                <div className="flex-1 bg-zinc-100/90 rounded-lg"></div>
              </div>
            </div>

            <div className="w-full h-[240px] mt-5 p-2 rounded-xl shadow-md bg-zinc-100/90 flex flex-col gap-4">
              <div className="text-zinc-600 text-lg font-semibold">
                医疗信息
              </div>
              <div className="flex h-[40px] gap-3">
                <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
                  <Image
                    src="/icons/身高.svg"
                    width={24}
                    height={24}
                    alt="身高"
                  />
                  <span className="text-zinc-700 text-lg font-mono">
                    {data?.height}cm
                  </span>
                </div>
                <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
                  <Image
                    src="/icons/体重.svg"
                    width={24}
                    height={24}
                    alt="体重"
                  />
                  <span className="text-zinc-700 text-lg font-mono">
                    {data?.weight}kg
                  </span>
                </div>
              </div>
              <div className="flex h-[40px] gap-3 flex-grow">
                <div className="flex-1 bg-zinc-200 rounded-lg p-2 gap-2">
                  过敏源 😣:
                  <div className="text-zinc-700 line-clamp-3">
                    {data?.allergens ? data.allergens : "还没有信息哦"}
                  </div>
                </div>
                <div className="flex-1 bg-zinc-200 rounded-lg p-2 gap-2">
                  过往病史 📄:
                  <div className="text-zinc-700 line-clamp-3">
                    {data?.medical_history
                      ? data.medical_history
                      : "还没有信息哦"}
                  </div>
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
