"use client";

import Image from "next/image";

const AppointmentCard = () => {
  return (
    <div className=" bg-zinc-50 p-2 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div>
            <Image
              src="/images/avatar.png"
              width={100}
              height={100}
              alt="doctor"
              className="w-9 h-9 rounded-2xl"
            />
          </div>
          <div className="text-lg">李卓</div>
        </div>
        <div className="flex gap-2 items-end text-sm text-zinc-600">
          <div className="flex gap-1 items-center text-zinc-600">
            <div className="bg-green-400 h-2 w-2 rounded-full"></div>
            已完成
          </div>
          <Image
            src={"/icons/日历.png"}
            width={100}
            height={100}
            alt="doctor"
            className="w-5 h-5"
          />
          <div className="font-mono">2024-07-23</div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-left mt-2 ml-1 text-zinc-600 space-x-2">
          <span className="font-semibold">肛肠科</span>
          <span className="text-sm">主任医师</span>
        </div>
        <div
          onClick={() => {
            console.log(12);
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
