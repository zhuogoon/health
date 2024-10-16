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
    const data = get(`/api/appointment/delete?id=${id}`);
    console.log(data);
  };

  useEffect(() => {
    getLastestAppointment();
    getAppointment();
  }, []);

  return (
    <div className="bg-slate-100 h-full flex">
      <div className="w-1/3 flex justify-center">
        <div className="w-[90%] flex flex-col items-center bg-blue-200 mt-2 rounded-xl shadow-md">
          <div className="w-[90%] mt-8">
            <TypeCombobox updateStatus={updateStatus} />
            <div className="flex justify-between items-end">
              <DatePickerWithRange
                className="w-max-[70%] mt-3"
                onDateChange={handleDateChange}
              />
              <Button onClick={handleSearch} className="w-[90px] bg-teal-500">
                查询
              </Button>
            </div>
            <div className="p-4 bg-zinc-100 rounded-lg mt-6 shadow">
              <div className="dark:bg-zinc-700/30">
                <div className="flex justify-between items-end ">
                  <span className="text-xl text-teal-400 font-semibold ">
                    近期预约
                  </span>
                  <span className="text-zinc-400 text-sm">
                    {latestAppointment?.date}
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
                      {latestAppointment?.doctor_name}
                    </div>
                  </div>
                  <div className="dark:text-zinc-200 text-zinc-600">
                    {latestAppointment?.doctor_type}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right font-mono text-sm text-zinc-500 mt-1">
              更新于 {latestAppointment?.date}
            </div>
          </div>

          <div className="bg-zinc-50 shadow-sm w-[90%] rounded-lg flex-grow p-4 mt-3">
            <div className="text-center text-lg font-semibold text-teal-400">
              健康小知识
            </div>

            <div className="mt-4">
              的挖掘看得见啊大家看我的就打死你打完单，美味的阿达伟大阿瓦达1擦哇哇的
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 overflow-y-auto custom-scrollbar">
        <div className="text-3xl font-semibold pt-5 pl-1">
          我的<span className="text-teal-400 ml-1">预约</span>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
          {appointment
            ? appointment.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  id={appointment.id}
                  doctorName={appointment.doctor_name}
                  doctorImg={appointment.doctor_avatar}
                  date={appointment.date}
                  status={appointment.status}
                  type={appointment.doctor_type}
                  title={appointment.doctor_title}
                  deleteAppointment={deleteAppointment}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default AppointmentListPage;
