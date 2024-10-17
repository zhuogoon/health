"use client";
import { PatientInfo } from "@/app/patient/settings/page";
import AppointmentInfoCard from "@/components/ui/AppointmentInfoCard";
import HomeCalendar from "@/components/ui/HomeCalendar";
import TodoCaseCard from "@/components/ui/TodoCaseCard";
import { get } from "@/net";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TodayAppointment {
  patient_name: string;
  age: number;
  date: string;
  appoint_id: number;
  patient_id: number;
}

export interface TodoCase {
  id: number;
  patient_name: string;
  age: number;
  updated_at: string;
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
    <div className="h-full flex gap-3">
      <div className="w-1/3 bg-zinc-200/50 h-full mx-4 rounded-xl overflow-y-auto custom-scrollbar p-4">
        <div className="text-3xl font-semibold text-center text-teal-400">
          患者信息
        </div>
        {data ? (
          <div>
            <div className="flex justify-between items-end mt-10 p-2">
              <span className="text-xl font-semibold">{data?.name}</span>
              <span className="space-x-3">
                <span
                  className={`text-lg font-semibold ${
                    data?.sex === "1" ? "text-blue-400" : "text-red-500"
                  }`}
                >
                  {data?.sex === "1" ? "♂" : "♀"}
                </span>
                <span>{data?.age}岁</span>
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
                <div className="flex-1 bg-zinc-100/90 rounded-lg"></div>
              </div>
            </div>

            <div className="w-full h-[300px] mt-5 p-2 rounded-xl shadow-md bg-zinc-100/90 flex flex-col gap-4">
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
                <div className="flex-1 bg-zinc-200 rounded-lg p-2 gap-2  overflow-y-auto custom-scrollbar">
                  过敏源 😣:
                  <div className="text-zinc-700 p-1 bg-cover">
                    {data?.allergens ? data?.allergens : "暂无消息"}
                  </div>
                </div>
                <div className="flex-1 bg-zinc-200 rounded-lg p-2 gap-2  overflow-y-auto custom-scrollbar">
                  过往病史 📄:
                  <div className="text-zinc-700">
                    {data?.medical_history ? data?.medical_history : "暂无消息"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-5">
            请选择右侧的预约信息来查看患者预留的信息
          </div>
        )}
      </div>
      <div className="w-2/3 h-full flex flex-col gap-4">
        <div className="h-1/2 w-full flex">
          <div className="h-full w-2/3 bg-zinc-100 p-4 rounded-xl">
            <div className="text-xl font-semibold text-teal-400">
              今日预约患者信息
            </div>
            <div className="space-y-3 mt-2 overflow-y-auto custom-scrollbar h-[90%]">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <AppointmentInfoCard
                    name={appointment.patient_name}
                    date={appointment.date}
                    age={appointment.age}
                    onClick={() => getInfo(appointment.patient_id)}
                  />
                ))
              ) : (
                <div>当前无患者预约</div>
              )}
            </div>
          </div>
          <div className="h-full w-1/3 flex justify-center p-4">
            <HomeCalendar />
          </div>
        </div>
        <div className="h-1/2 w-full bg-zinc-100 rounded-xl">
          <div className="text-xl font-semibold text-teal-400 p-3">
            待完成病例
          </div>
          <div className="h-[260px] w-full grid grid-cols-2 gap-3 overflow-y-auto custom-scrollbar px-4">
            {todoCase ? (
              todoCase.map((item) => (
                <TodoCaseCard
                  name={item.patient_name}
                  age={item.age}
                  sex={item.sex}
                  date={item.updated_at}
                  onClick={() => {
                    router.push(`/doctor/${item.id}/cases`);
                  }}
                />
              ))
            ) : (
              <>已将没有要处理了病例了~</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocgtorHomePage;
