import AppointmentCard from "@/components/ui/AppointmentCard";
import { Button } from "@/components/ui/button";
import DoctorAppointmentCard from "@/components/ui/DoctorAppointmentCard";
import DoctorCombobox from "@/components/ui/DoctorTypeCombobox";
import { Input } from "@/components/ui/input";
import App from "next/app";
import Image from "next/image";
import Link from "next/link";

const AppointmentPage = () => {
  return (
    <div className="h-full flex items-center">
      <div className="h-[96%] bg-stone-200 w-full flex">
        <div className="w-1/4 bg-slate-500 rounded-lg">
          <div className="h-20 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-left w-[90%] mb-12 mt-4 text-teal-400">
              预约挂号
            </h1>
            <Input
              placeholder="搜索医生姓名..."
              className="bg-zinc-100 h-16 w-[90%]"
            />
            <div className="h-20 mt-3 m-10 flex w-[90%] justify-between">
              <DoctorCombobox />
              <Button className="bg-teal-400 w-20 hover:bg-teal-500">
                搜索
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/4 bg-slate-200 my-4 overflow-y-auto custom-scrollbar">
          <div className="flex items-center flex-col gap-3 mt-3">
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
            <DoctorAppointmentCard />
          </div>
        </div>
        <div className="w-1/4 bg-sky-100 flex flex-col">
          <h1 className="text-2xl font-bold text-left w-[90%] mb-2 mt-4 text-teal-400 ml-4">
            我的预约
            <div className="mb-4 text-sm text-zinc-600 font-normal mt-2">
              以下是我已有的预约
            </div>
          </h1>

          <div className="flex-grow w-full bg-red-200 rounded-t-xl overflow-y-auto custom-scrollbar p-4 flex flex-col gap-2">
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
