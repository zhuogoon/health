"use client";

import HomeCalendar from "@/components/ui/HomeCalendar";
import { get, post } from "@/net";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Case } from "../cases/list/page";
import { Appointment, Doctor } from "../appointment/page";
import { format } from "date-fns";

const Home = () => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const Router = useRouter();
  const [caseList, setCaseList] = useState<Case[]>([]);
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [latestAppointment, setLatestAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const [doctoquery, setQuery] = useState({
    doctor_name: "",
    doctor_type: "",
  });
  const [LatestCase, setLatestCase] = useState<Case>();
  const query: { from: Date | null; to: Date | null; title: string } = {
    from: null,
    to: null,
    title: "",
  };
  const [sum, setSum] = useState(0);

  const queryCase = async () => {
    const data = await post("/api/cases/query", query);
    setCaseList(data);
  };

  const getAppointment = async () => {
    const data = await get("/api/appointment/list");
    if (!data) {
      setAppointment([]);
    } else if (data.length > 3) {
      setAppointment(data.slice(0, 3));
    } else {
      setAppointment(data);
    }
  };

  const getLastestAppointment = async () => {
    const data = await get("/api/appointment/latest");
    setLatestAppointment(data);
  };

  const getDoctorByQuery = async () => {
    const data = await post(`/api/doctor/query`, query);
    if (data) {
      setDoctorList(data.slice(0, 3));
    } else {
      setDoctorList([]);
    }
  };

  const getLastestCase = async () => {
    const data = await get("/api/cases/latest");
    setLatestCase(data);
  };

  const getSum = async () => {
    const data = await get("/api/appointment/sum");
    setSum(data);
  };

  const goto = (path: string) => {
    Router.push(path);
  };

  useEffect(() => {
    queryCase();
    getAppointment();
    getLastestAppointment();
    getDoctorByQuery();
    getLastestCase();
    getSum();
  }, []);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* 左侧病例卡片 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col h-full overflow-hidden">
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-50">
                我的病例单
              </h2>
              <button
                onClick={() => Router.push("/cases/list")}
                className="text-sm font-medium text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors flex items-center"
              >
                查看全部
                <svg
                  className="ml-1 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 pb-6 flex-1 overflow-y-auto custom-scrollbar">
            {caseList && caseList.length > 0 ? (
              <div className="space-y-4">
                {caseList.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {item.title || "医生暂未处理"}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        {format(new Date(item.UpdatedAt), "yyyy-MM-dd")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {item.content || "医生暂未添加内容"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>目前还没有病例信息</p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧预约和快速查看区域 */}
        <div className="flex flex-col gap-6 h-full">
          {/* 预约卡片 */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col">
            <div className="p-6 pb-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-gray-50 mb-4">
                我的预约
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {appointment.length > 0 ? (
                  appointment.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-xl p-4 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src="/images/dr-remirez.png"
                            height={40}
                            width={40}
                            alt={`${item.doctor_name}医生`}
                            className="rounded-full object-cover border border-white dark:border-gray-700"
                            unoptimized
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-700 ${
                              item.status ? "bg-green-500" : "bg-amber-500"
                            }`}
                          ></div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {item.doctor_name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.doctor_type}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="4"
                            rx="2"
                            ry="2"
                          />
                          <line x1="16" x2="16" y1="2" y2="6" />
                          <line x1="8" x2="8" y1="2" y2="6" />
                          <line x1="3" x2="21" y1="10" y2="10" />
                        </svg>
                        <span className="font-mono">{item.date}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                    <p>暂无预约信息</p>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex justify-end">
              <Button
                onClick={() => Router.push("/appointment")}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm font-medium px-4"
              >
                预约挂号
              </Button>
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex-1">
            <h2 className="text-xl font-medium text-gray-900 dark:text-gray-50 mb-6">
              健康概览
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex flex-col">
                <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  总预约次数
                </span>
                <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-2">
                  {sum}
                </span>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 flex flex-col">
                <span className="text-amber-600 dark:text-amber-400 text-sm font-medium">
                  最近预约
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                  {latestAppointment ? latestAppointment.doctor_name : "暂无"}
                </span>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 flex flex-col">
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                  最新病例
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 truncate">
                  {LatestCase ? LatestCase.title || "未命名" : "暂无"}
                </span>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 flex flex-col">
                <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                  快速检查
                </span>
                <div className="mt-2">
                  <button
                    onClick={() => Router.push("/check")}
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    查看我的检查 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
