"use client";

import Image from "next/image";

interface AppointmentCardProps {
  id: string;
  doctorName: string;
  doctorImg: string | null;
  date: string;
  status: boolean;
  type: string;
  title: string;
  deleteAppointment: (id: string) => void;
}

const AppointmentCard = ({
  id,
  doctorName,
  doctorImg,
  date,
  status,
  type,
  title,
  deleteAppointment,
}: AppointmentCardProps) => {
  return (
    <div className=" bg-zinc-50 p-2 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div>
            <Image
              src={
                doctorImg
                  ? `http://localhost:8080/api/file?img=${doctorImg}`
                  : `/images/avatar.png`
              }
              width={100}
              height={100}
              alt="doctor"
              className="w-9 h-9 rounded-2xl"
            />
          </div>
          <div className="text-lg">{doctorName}</div>
        </div>
        <div className="flex gap-2 items-center text-sm text-zinc-600 justify-end">
          <div className="flex gap-1 items-center text-zinc-600">
            <div
              className={`${
                status ? "bg-green-400" : "bg-red-500"
              } h-2 w-2 rounded-full`}
            ></div>
            {status ? "已完成" : "未完成"}
          </div>
          <Image
            src={"/icons/日历.png"}
            width={100}
            height={100}
            alt="doctor"
            className="w-5 h-5"
          />
          <div className="font-mono max-w-[100px]">
            {date ? date : "2000-01-01"}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-left mt-2 ml-1 text-zinc-600 space-x-2">
          <span className="font-semibold">{type}</span>
          <span className="text-sm">{title}</span>
        </div>
        <div
          onClick={() => {
            deleteAppointment(id);
          }}
          className="text-teal-400 cursor-pointer hover:text-teal-500"
        >
          取消预约
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
