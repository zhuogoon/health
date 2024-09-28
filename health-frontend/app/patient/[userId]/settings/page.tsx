"use client";

import { formSchema } from "@/components/form/RegisterForm";
import { get } from "@/net";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PatientInfo {
  name: string;
  height: number;
  weight: number;
  birthday: string;
  sex: boolean;
  phone: string;
  address: string;
  allergens: string;
  medical_history: string;
}

const Settings = () => {
  const [data, setData] = useState<PatientInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("/api/patient/info");
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      height: data?.height,
      weight: data?.weight,
      birthday: data?.birthday ? new Date(data.birthday) : undefined,
      sex: data?.sex,
      phone: data?.phone,
      address: data?.address,
      allergens: data?.allergens,
      medical_history: data?.medical_history,
    },
  });

  return (
    <div className="h-full flex flex-col">
      <div>
        <h1 className="text-4xl font-semibold ml-8">设置</h1>
        <div className="ml-8 text-zinc-600 mt-2">请在这里设置您的个人信息</div>
      </div>
      <div className="flex h-hull flex-grow">
        <div className="flex-1 bg-red-300 h-full"></div>
        <div className="flex-1 bg-red-400 h-full"></div>
      </div>
    </div>
  );
};

export default Settings;
