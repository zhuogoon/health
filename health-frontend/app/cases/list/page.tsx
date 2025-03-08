"use client";

import CaseCard from "@/components/ui/CaseCard";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { get, post } from "@/net";
import { late } from "zod";

export interface Case {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
  ID: string;
  check_id: string;
  content: string;
  doctor_id: string;
  patient_id: string;
  status: boolean;
  title: string;
}

const CaseList = () => {
  const [caseList, setCaseList] = useState<Case[]>([]);
  const [LatestCase, setLatestCase] = useState<Case>();
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );

  const handleDateChange = (date: DateRange | undefined) => {
    query.from = date?.from ?? null;
    query.to = date?.to ?? null;
    setSelectedDate(date);
  };

  const handleSearch = () => {
    queryCase();
    console.log(query);
  };

  const getLastestCase = async () => {
    const data = await get("/api/cases/latest");
    setLatestCase(data);
  };

  const query: { from: Date | null; to: Date | null; title: string } = {
    from: null,
    to: null,
    title: "",
  };

  const queryCase = async () => {
    const data = await post("/api/cases/query", query);
    setCaseList(data);
  };

  useEffect(() => {
    queryCase();
    getLastestCase();
  }, []);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-950 p-6 transition-colors duration-200">
      <div className="flex flex-col h-full gap-6">
        {/* 顶部搜索区域 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-6">
            病例记录
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                选择日期范围
              </label>
              <DatePickerWithRange onDateChange={handleDateChange} />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                病例标题
              </label>
              <div className="flex gap-2 h-full">
                <Input
                  placeholder="请输入病例标题..."
                  className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  onChange={(e) => (query.title = e.target.value)}
                />
                <Button
                  onClick={handleSearch}
                  className="bg-teal-500 hover:bg-teal-600 text-white transition-colors"
                >
                  查询
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 病例列表区域 */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex-1 overflow-hidden flex flex-col">
          <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
              全部病例
            </h2>

            {LatestCase && (
              <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full flex items-center">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium mr-2">
                  最新病例:
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                  {LatestCase.title || "主治医师还未填写病历单"}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-4">
            {caseList && caseList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseList.map((item, index) => (
                  <CaseCard
                    key={index}
                    cid={item.ID}
                    name={item.title}
                    date={item.UpdatedAt}
                    doctor_say={item.content}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>暂无病例记录</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseList;
