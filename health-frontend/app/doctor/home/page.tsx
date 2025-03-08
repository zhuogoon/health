"use client";
import { PatientInfo } from "@/app/patient/settings/page";
import AppointmentInfoCard from "@/components/ui/AppointmentInfoCard";
import HomeCalendar from "@/components/ui/HomeCalendar";
import { get } from "@/net";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TodayAppointment {
  patientName: string;
  age: number;
  date: string;
  appointId: number;
  patientId: number;
}

export interface TodoCase {
  id: number;
  patientName: string;
  age: number;
  updatedAt: string;
  sex: string;
}

const DocgtorHomePage = () => {
  const [data, setData] = useState<PatientInfo | null>(null);
  const [appointments, setAppointments] = useState<TodayAppointment[]>([]);
  const [todoCase, setTodoCase] = useState<TodoCase[]>([]);

  const getTodayAppointments = async () => {
    try {
      const result = await get("/api/doctor/todayappoint");
      setAppointments(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getInfo = async (id: number) => {
    try {
      const result = await get(`/api/patient/infobyid?pid=${id}`);
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTodoCases = async () => {
    try {
      const result = await get("/api/doctor/nonfinishcases");
      setTodoCase(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const router = useRouter();
  useEffect(() => {
    getTodayAppointments();
    getTodoCases();
  }, []);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-950 p-5 transition-colors duration-200">
      <div className="flex flex-col md:flex-row h-full gap-5">
        {/* 左侧患者信息面板 */}
        <div className="md:w-1/3 w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
          <div className="p-4 bg-gradient-to-r from-teal-500 to-teal-400 text-white">
            <h2 className="text-xl font-medium text-center">患者详细信息</h2>
          </div>

          <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
            {data ? (
              <div className="space-y-5">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                  <span className="text-xl font-medium text-gray-900 dark:text-gray-100">
                    {data?.name || "未知患者"}
                  </span>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-medium ${
                        data?.sex === "1" ? "text-blue-500" : "text-pink-500"
                      }`}
                    >
                      {data?.sex === "1" ? "♂" : "♀"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                      {data?.age}岁
                    </span>
                  </div>
                </div>

                {/* 基础信息卡片 */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    基础信息
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <Image
                          src="/icons/phone.svg"
                          width={16}
                          height={16}
                          alt="电话"
                          className="opacity-70"
                          unoptimized
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                        {data?.phone || "未提供"}
                      </span>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                        <Image
                          src="/icons/address.svg"
                          width={16}
                          height={16}
                          alt="地址"
                          className="opacity-70"
                          unoptimized
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
                        {data?.address || "未提供"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 医疗信息卡片 */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                  <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2 text-teal-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    医疗信息
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                        <Image
                          src="/icons/身高.svg"
                          width={16}
                          height={16}
                          alt="身高"
                          className="opacity-70"
                          unoptimized
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                        {data?.height ? `${data.height} cm` : "未记录"}
                      </span>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
                        <Image
                          src="/icons/体重.svg"
                          width={16}
                          height={16}
                          alt="体重"
                          className="opacity-70"
                          unoptimized
                        />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                        {data?.weight ? `${data.weight} kg` : "未记录"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                      <div className="flex items-center mb-2">
                        <span className="text-amber-600 dark:text-amber-400 mr-2">
                          😣
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          过敏源:
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-sm max-h-20 overflow-y-auto custom-scrollbar">
                        {data?.allergens ? data?.allergens : "暂无记录"}
                      </div>
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
                      <div className="text-gray-600 dark:text-gray-400 text-sm max-h-20 overflow-y-auto custom-scrollbar">
                        {data?.medical_history
                          ? data?.medical_history
                          : "暂无记录"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg mb-2">未选择患者</p>
                <p className="text-sm text-center px-6">
                  请从右侧面板选择一位患者查看其详细信息
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧任务面板 */}
        <div className="md:w-2/3 w-full flex flex-col gap-5">
          {/* 上半区域：今日预约 */}
          <div className="flex flex-col md:flex-row gap-5 h-1/2">
            <div className="md:w-2/3 w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 text-teal-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  今日预约患者
                </h2>
              </div>

              <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
                {appointments && appointments.length > 0 ? (
                  <div className="space-y-3">
                    {appointments.map((appointment, index) => (
                      <AppointmentInfoCard
                        key={index}
                        name={appointment.patientName}
                        date={appointment.date}
                        age={appointment.age}
                        onClick={() => getInfo(appointment.patientId)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400 dark:text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mb-2 opacity-40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <p>当前无患者预约</p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:w-1/3 w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
              <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  日历
                </h3>
              </div>
              <div className="p-2 flex-1 flex items-center justify-center max-h-[300px] overflow-hidden">
                <div className="transform scale-90 origin-center">
                  <HomeCalendar />
                </div>
              </div>
            </div>
          </div>

          {/* 下半区域：待完成病例 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden h-1/2">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                待完成病例
                {todoCase && todoCase.length > 0 && (
                  <span className="ml-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-medium px-2 py-0.5 rounded-full">
                    {todoCase.length}
                  </span>
                )}
              </h2>
            </div>

            <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
              {todoCase && todoCase.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {todoCase.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        router.push(`/doctor/${item.id}/cases`);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                            {item.sex === "1" ? "♂" : "♀"}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800 dark:text-gray-200">
                              {item.patientName}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.age}岁
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(item.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-gray-400 dark:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mb-2 opacity-40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p>已经没有要处理的病例了</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocgtorHomePage;
