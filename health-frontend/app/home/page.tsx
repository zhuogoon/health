"use client";

import HomeCalendar from "@/components/ui/HomeCalendar";
import { get } from "@/net";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { url } from "inspector";

const Home = () => {
  const Router = useRouter();
  // interface PatientInfo {
  //   id: string;
  // }

  // const [data, setData] = useState<PatientInfo | null>(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await get("/api/patient/info");
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div
      className="flex h-full justify-center bg-cover bg-center"
      // style={{ backgroundImage: "url(/images/cool-background.png)" }}
    >
      <div className="flex-1 flex h-full justify-center items-center relative">
        <div className="w-[90%] h-[96%] bg-zinc-200/50 dark:bg-zinc-700/40 p-4 rounded-lg shadow backdrop-blur-sm">
          <div className="text-2xl font-semibold text-teal-400">我的病例单</div>
          <div className="flex flex-col gap-4 mt-5">
            <div className="bg-zinc-50 p-2 shadow-md rounded-md dark:bg-zinc-700/30">
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
            <div className="bg-zinc-50/90 p-2 shadow-md rounded-md dark:bg-zinc-700/30">
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
          onClick={() => Router.push(`/cases/list`)}
        >
          查看更多 →
        </a>
      </div>
      <div className="flex-1 h-full flex items-center">
        <div className="h-[96%] w-full bg-zinc-200/50 shadow rounded-lg p-4 flex flex-col backdrop-blur-sm">
          <div className="text-teal-400 text-2xl font-semibold">预约</div>
          <div className=" flex-grow mt-4 flex justify-center">
            <div className="w-[90%] h-full flex flex-col gap-4">
              <div className="flex flex-col flex-1 bg-zinc-300/70 rounded-xl p-3 relative">
                <div className="text-zinc-800 font-semibold text-xl">
                  我的预约
                </div>
                <div className="flex gap-2 flex-grow mt-2">
                  <div className="w-2/3 h-full flex flex-col gap-2">
                    <div className="flex-1 bg-gradient-to-r from-green-300 to-green-100 rounded-lg flex justify-between items-center px-4">
                      <div className=" flex justify-center items-center gap-2">
                        <Image
                          src="/images/dr-remirez.png"
                          height={100}
                          width={100}
                          alt="doctor"
                          className="h-8 w-fit border border-zinc-700 rounded-full"
                        />
                        <div className="text-zinc-700 font-semibold">
                          黄志远
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Image
                          src="/icons/日历.png"
                          height={24}
                          width={24}
                          alt="calender"
                          className="text-black"
                        />
                        <div className="text-zinc-600 font-mono font-semibold">
                          2024/03/23
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-indigo-400 to-indigo-200 rounded-lg flex justify-between items-center px-4">
                      <div className=" flex justify-center items-center gap-2">
                        <Image
                          src="/images/dr-remirez.png"
                          height={100}
                          width={100}
                          alt="doctor"
                          className="h-8 w-fit border border-zinc-700 rounded-full"
                        />
                        <div className="text-zinc-700 font-semibold">
                          黄志远
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Image
                          src="/icons/日历.png"
                          height={24}
                          width={24}
                          alt="calender"
                          className="text-black"
                        />
                        <div className="text-zinc-600 font-mono font-semibold">
                          2024/03/23
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-green-300 to-green-100 rounded-lg flex justify-between items-center px-4">
                      <div className=" flex justify-center items-center gap-2">
                        <Image
                          src="/images/dr-remirez.png"
                          height={100}
                          width={100}
                          alt="doctor"
                          className="h-8 w-fit border border-zinc-700 rounded-full"
                        />
                        <div className="text-zinc-700 font-semibold">
                          黄志远
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Image
                          src="/icons/日历.png"
                          height={24}
                          width={24}
                          alt="calender"
                          className="text-black"
                        />
                        <div className="text-zinc-600 font-mono font-semibold">
                          2024/03/23
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3 h-full bg-gradient-to-b from-green-300 to-teal-500 rounded-lg">
                    <div className="text-2xl text-zinc-700/90 p-4 font-semibold">
                      您已在本院预约
                    </div>
                    <div className="text-center text-zinc-200 mt-4">
                      <span className="text-4xl text-zinc-100/80 mr-2 font-mono">
                        12
                      </span>
                      次
                    </div>
                  </div>
                </div>

                <a
                  className="absolute top-4 right-3 text-teal-400"
                  href="/appointment"
                >
                  查看更多 →
                </a>
              </div>
              <div className="flex flex-col flex-1 bg-zinc-300/70 rounded-xl p-3 relative">
                <div className="text-zinc-800 font-semibold text-xl">
                  名医坐诊
                </div>
                <div className="flex flex-col gap-2 flex-grow mt-2">
                  <div className="flex-1 bg-zinc-100 rounded-lg flex items-center justify-between">
                    <div className="flex gap-2 items-center ml-3">
                      <Image
                        src={"/images/avatar.png"}
                        height={80}
                        width={80}
                        alt="avatar"
                        className="rounded-full h-10 w-10"
                      />
                      <div className="text-lg text-zinc-700">李卓</div>
                    </div>
                    <div className="text-zinc-600 mr-2">
                      <div className="">消化科</div>
                      <div className="text-sm text-right">副主任</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-zinc-100 rounded-lg flex items-center justify-between">
                    <div className="flex gap-2 items-center ml-3">
                      <Image
                        src={"/images/avatar.png"}
                        height={80}
                        width={80}
                        alt="avatar"
                        className="rounded-full h-10 w-10"
                      />
                      <div className="text-lg text-zinc-700">李卓</div>
                    </div>
                    <div className="text-zinc-600 mr-2">
                      <div className="">消化科</div>
                      <div className="text-sm text-right">副主任</div>
                    </div>
                  </div>
                  <div className="flex-1 bg-zinc-100 rounded-lg flex items-center justify-between">
                    <div className="flex gap-2 items-center ml-3">
                      <Image
                        src={"/images/avatar.png"}
                        height={80}
                        width={80}
                        alt="avatar"
                        className="rounded-full h-10 w-10"
                      />
                      <div className="text-lg text-zinc-700">李卓</div>
                    </div>
                    <div className="text-zinc-600 mr-2">
                      <div className="">消化科</div>
                      <div className="text-sm text-right">副主任</div>
                    </div>
                  </div>
                </div>
                <a
                  className="absolute top-4 right-3 text-teal-400"
                  href="/appointment"
                >
                  查看更多 →
                </a>
              </div>
            </div>
          </div>
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
