"use client";

import CheckCard from "@/components/ui/CheckCard";
import { get } from "@/net";
import { useEffect, useState } from "react";

interface CheckProps {
  id: string;
  name: string;
  room: string;
  status: string;
  date: string;
}

const Check = () => {
  const [Check, setCheck] = useState<CheckProps[]>([]);

  const handleUpdate = () => {
    getList();
  };

  const getList = async () => {
    const data = await get("/api/patient/checkinfo");
    setCheck(data);
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-semibold m-5 ">
        我的<span className="text-teal-400">检查项目</span>
      </h1>
      <div className="flex-grow h-full flex justify-center">
        <div className="w-[86%] h-full grid grid-cols-2 gap-4 p-2 overflow-y-auto custom-scrollbar">
          {Check.length > 0 ? (
            Check.map((item) => (
              <CheckCard
                key={item.id}
                id={item.id}
                name={item.name}
                room={item.room}
                status={item.status}
                date={item.date}
                update={handleUpdate}
              />
            ))
          ) : (
            <>暂无数据哦</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Check;
