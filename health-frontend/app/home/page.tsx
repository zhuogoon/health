"use client";

import HomeCalendar from "@/components/ui/HomeCalendar";
import { get } from "@/net";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Home = () => {
  const Router = useRouter();
  interface PatientInfo {
    id: string;
    // Add other properties as needed
  }

  const [data, setData] = useState<PatientInfo | null>(null);
  const id = data?.id;
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
    <div className="flex h-full justify-center">
      <div className="flex-1 flex h-full justify-center items-center relative">
        <div className="w-[90%] h-[96%] bg-zinc-200/50 dark:bg-zinc-700/40 p-4 rounded-lg shadow">
          <div className="text-2xl font-semibold text-teal-400">我的病例单</div>
          <div className="flex flex-col gap-4 mt-5">
            <div className="bg-zinc-100/90 p-2 shadow-md rounded-md dark:bg-zinc-700/30">
              <div className="flex justify-between items-end ">
                <span className="text-xl font-semibold">感冒</span>
                <span className="text-zinc-400 text-sm">
                  2024-04-11 10:00-11:00
                </span>
              </div>
              <div className="mt-2">
                <div className="text-lg">感冒</div>
                <div className="text-zinc-400 dark:text-zinc-300">
                  医嘱医嘱医嘱医嘱医嘱
                </div>
              </div>
            </div>
            <div className="bg-zinc-100/90 p-2 shadow-md rounded-md dark:bg-zinc-700/30">
              <div className="flex justify-between items-end ">
                <span className="text-xl font-semibold">感冒</span>
                <span className="text-zinc-400 text-sm">
                  2024-04-11 10:00-11:00
                </span>
              </div>
              <div className="mt-2">
                <div className="text-lg">感冒</div>
                <div className="text-zinc-400 dark:text-zinc-300">
                  医嘱医嘱医嘱医嘱医嘱
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="absolute bottom-8 right-12 h-10 text-teal-400 hover:text-teal-500 dark:text-teal-500 dark:hover:text-teal-600 cursor-pointer"
          onClick={() => Router.push(`/cases/${id}/list`)}
        >
          查看更多 →
        </a>
      </div>
      <div className="flex-1 h-full flex items-center">
        <div className="h-[96%] w-full bg-zinc-200/50 shadow rounded-lg p-4">
          <div className="text-teal-400 text-2xl font-semibold">预约</div>
        </div>
      </div>
      <div className="w-1/4 flex flex-col items-center gap-5">
        <div className="">
          <HomeCalendar />
        </div>
        <div className="flex h-grow h-full w-full justify-center">
          <div className="w-[86%] bg-zinc-200/50 dark:bg-zinc-800/40 m-4 p-3 rounded-xl flex flex-col gap-4">
            <div className="bg-slate-100 p-2 shadow-md rounded-md dark:bg-zinc-700/30">
              <div className="flex justify-between items-end ">
                <span className="text-xl text-teal-400 font-semibold ">
                  近期预约
                </span>
                <span className="text-zinc-400 text-sm">
                  2024-04-11 10:00-11:00
                </span>
              </div>
              <div className="flex items-center mt-2 justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full h-8 w-8 shadow-sm border-2 border-slate-200"
                    src="/images/avatar.png"
                    width={20}
                    height={20}
                    alt="doctor"
                  />
                  <div className="text-zinc-600 font-semibold dark:text-zinc-300">
                    李卓
                  </div>
                </div>
                <div className="dark:text-zinc-200 text-zinc-600">消化科</div>
              </div>
            </div>
            <div className="bg-slate-100 p-2 shadow-md rounded-md dark:bg-zinc-700/30">
              <div className="flex justify-between items-end ">
                <span className="text-xl text-teal-400 font-semibold">
                  最新报告
                </span>
                <span className="text-zinc-400 text-sm">
                  2024-04-11 10:00-11:00
                </span>
              </div>
              <div className="mt-2">
                <div className="text-lg">感冒</div>
                <div className="text-zinc-400 dark:text-zinc-300">
                  医嘱医嘱医嘱医嘱医嘱
                </div>
              </div>
            </div>

            <Button className="h-10 bg-teal-400 hover:bg-teal-500 dark:bg-teal-500 dark:text-zinc-200 dark:hover:bg-teal-600">
              查看更多 →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
