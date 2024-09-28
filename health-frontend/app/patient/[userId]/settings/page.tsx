"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { formSchema } from "@/components/form/RegisterForm";
import { get } from "@/net";
import { SettingsForm } from "@/components/form/SettingsForm";

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
            <SettingsForm />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-cover flex  p-3 overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md rounded-xl">
        Test
      </div>
    </div>
  );
};

export default Settings;
