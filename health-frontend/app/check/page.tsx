"use client";

import CheckCard from "@/components/ui/CheckCard";
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

  const getList = () => {
    // get("/api/check")
    // setCheck(data);
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
          <CheckCard
            id="1"
            name="血检"
            room="血检A室"
            status="已完成"
            date="2024-05-23"
            update={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Check;
