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
    <div className="h-full bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 transition-colors duration-200">
      <div className="flex flex-col h-full">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 mb-3 sm:mb-4">
          <h1 className="text-xl font-medium text-gray-900 dark:text-gray-50">
            我的检查项目
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm">
            这里显示您的所有检查项目及状态
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1 overflow-hidden">
          <div className="p-3 sm:p-4 h-full">
            {Check.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 sm:gap-3 h-full overflow-y-auto custom-scrollbar pr-1">
                {Check.map((item) => (
                  <CheckCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    room={item.room}
                    status={item.status}
                    date={item.date}
                    update={handleUpdate}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-3 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <p className="text-base mb-1">暂无检查项目</p>
                <p className="text-xs">您目前没有安排中的检查项目</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Check;
