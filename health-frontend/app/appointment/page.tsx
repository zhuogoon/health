"use client";

import AppointmentCard from "@/components/ui/AppointmentCard";
import { Button } from "@/components/ui/button";
import DoctorAppointmentCard from "@/components/ui/DoctorAppointmentCard";
import DoctorCombobox from "@/components/ui/DoctorTypeCombobox";
import { Input } from "@/components/ui/input";
import { get, post } from "@/net";
import { useEffect, useState } from "react";

export interface Appointment {
  id: string;
  date: string;
  doctor_avatar: string;
  doctor_name: string;
  doctor_title: string;
  doctor_type: string;
  status: boolean;
  time_id: number;
}

export interface Doctor {
  id: string;
  name: string;
  job_type: string;
  job_title: string;
}

const AppointmentPage = () => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [appointment, setAppointment] = useState<Appointment[]>([]);
  const [query, setQuery] = useState({
    doctor_name: "",
    doctor_type: "",
  });

  const getDoctor = async () => {
    try {
      const data = await get("/api/admin/doctor");
      setDoctorList(data);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };

  const getAppointment = async () => {
    try {
      const data = await get("/api/appointment/nonfinished");
      setAppointment(data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  const getDoctorByQuery = async () => {
    try {
      const data = await post(`/api/doctor/query`, query);
      setDoctorList(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch doctors by query:", error);
    }
  };

  const deleteAppointment = async (id: string) => {
    try {
      await get(`/api/appointment/delete?id=${id}`);
      await getAppointment(); // 确保在删除操作完成后调用 getAppointment
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  useEffect(() => {
    getDoctor();
    getAppointment();
  }, []);

  return (
    <div className="h-full flex items-center p-6 bg-white dark:bg-gray-950 transition-colors duration-200">
      <div className="h-full w-full flex flex-col lg:flex-row gap-6">
        {/* 左侧搜索区域 */}
        <div className="lg:w-1/4 w-full bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 flex flex-col">
          <h1 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-50 mb-6">
            预约挂号
          </h1>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                医生姓名
              </label>
              <Input
                placeholder="搜索医生姓名..."
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
                value={query.doctor_name}
                onChange={(e) =>
                  setQuery((prevQuery) => ({
                    ...prevQuery,
                    doctor_name: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-1 block">
                医生类型
              </label>
              <DoctorCombobox query={query} setQuery={setQuery} />
            </div>

            <Button
              className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-medium transition-colors"
              onClick={getDoctorByQuery}
            >
              查找医生
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              提示
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              您可以通过医生姓名或科室筛选医生，点击医生卡片可以进行预约挂号。
            </p>
          </div>
        </div>

        {/* 中间医生列表区域 */}
        <div className="lg:w-2/4 w-full overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-gray-50 mb-4">
            可预约医生
          </h2>

          <div className="grid grid-cols-1 gap-4 mt-3">
            {doctorList.length > 0 ? (
              doctorList.map((doctor) => (
                <DoctorAppointmentCard
                  key={doctor.id}
                  id={doctor.id}
                  name={doctor.name}
                  type={doctor.job_type}
                  title={doctor.job_title}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                未找到符合条件的医生，请尝试其他搜索条件
              </div>
            )}
          </div>
        </div>

        {/* 右侧我的预约区域 */}
        <div className="lg:w-1/4 w-full rounded-2xl shadow-sm overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800">
          <div className="bg-gradient-to-r from-teal-500 to-teal-400 p-5">
            <h2 className="text-xl font-medium text-white mb-1">我的预约</h2>
            <p className="text-sm text-teal-100 mb-0">查看已预约的就诊信息</p>
          </div>

          <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto custom-scrollbar p-4">
            {appointment && appointment.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
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
              <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-3 opacity-40"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="M12 11h4" />
                  <path d="M12 16h4" />
                  <path d="M8 11h.01" />
                  <path d="M8 16h.01" />
                  <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                </svg>
                <p>当前还没有未完成预约</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
