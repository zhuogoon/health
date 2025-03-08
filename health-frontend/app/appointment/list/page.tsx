"use client";

import AppointmentCard from "@/components/ui/AppointmentCard";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import Image from "next/image";
import TypeCombobox from "@/components/ui/TypeCombobox";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { get, post } from "@/net";
import { Appointment } from "../page";

const AppointmentListPage = () => {
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );
  const [latestAppointment, setLatestAppointment] = useState<
    Appointment | undefined
  >(undefined);

  const handleDateChange = (date: DateRange | undefined) => {
    query.from = date?.from?.toISOString() || "";
    query.to = date?.to?.toISOString() || "";
    setSelectedDate(date);
  };

  const query = {
    from: "",
    to: "",
    status: 0,
  };

  const getAppointment = async () => {
    const data = get("/api/appointment/list");
    setAppointment(await data);
  };

  const handleSearch = async () => {
    const data = await post(`/api/appointment/query`, query);
    setAppointment(data);
    console.log(data);
  };

  const updateStatus = (newStatus: number) => {
    query.status = newStatus;
    console.log(query);
  };

  const getLastestAppointment = async () => {
    const data = await get("/api/appointment/latest");
    setLatestAppointment(data);
  };

  const deleteAppointment = (id: string) => {
    get(`/api/appointment/delete?id=${id}`).then(() => {
      getAppointment();
    });
  };

  useEffect(() => {
    getAppointment();
    getLastestAppointment();
  }, []);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-200">
      <div className="flex flex-col h-full gap-6">
        {/* 顶部搜索区域 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-6">
            我的预约记录
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-5">
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                选择日期范围
              </label>
              <DatePickerWithRange onDateChange={handleDateChange} />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                预约状态
              </label>
              <TypeCombobox updateStatus={updateStatus} />
            </div>

            <div className="md:col-span-4 flex justify-end">
              <Button
                onClick={handleSearch}
                className="bg-teal-500 hover:bg-teal-600 text-white transition-colors w-full md:w-auto"
              >
                查询
              </Button>
            </div>
          </div>
        </div>

        {/* 预约列表区域 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1 overflow-hidden flex flex-col">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 flex items-center">
              <span>全部预约</span>
              {appointment.length > 0 && (
                <span className="ml-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs font-medium px-2 py-0.5 rounded-full">
                  {appointment.length}
                </span>
              )}
            </h2>

            {latestAppointment && (
              <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full flex items-center">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mr-2">
                  最近预约:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                  {latestAppointment.doctor_name} ({latestAppointment.date})
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-4">
            {appointment && appointment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointment.map((item) => (
                  <AppointmentCard
                    key={item.id}
                    id={item.id}
                    doctorName={item.doctor_name}
                    doctorImg={item.doctor_avatar}
                    date={item.date}
                    status={item.status}
                    type={item.doctor_type}
                    title={item.doctor_title}
                    deleteAppointment={deleteAppointment}
                  />
                ))}
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg mb-2">暂无预约记录</p>
                <p className="text-sm">您目前没有任何预约记录</p>
                <Button
                  onClick={() => (window.location.href = "/appointment")}
                  className="mt-4 bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                >
                  前往预约
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentListPage;
