"use client";

import CaseCard from "@/components/ui/CaseCard";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { get, post } from "@/net";

const CaseList = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );

  const handleDateChange = (date: DateRange | undefined) => {
    setSelectedDate(date);
  };

  const handleSearch = () => {
    console.log(selectedDate);
  };

  const getCaseList = () => {
    const data = get("/api/cases/list");
    console.log(data);
  };

  const getLastestCase = () => {
    const data = get("/api/cases/latest");
    console.log(data);
  };

  const query = {
    from: null,
    to: null,
    title: "",
  };

  const queryCase = () => {
    const data = post("/api/cases/query", query);
    console.log(data);
  };

  useEffect(() => {
    // getCaseList();
    // getLastestCase();
    queryCase();
  });

  return (
    <div className="bg-slate-100 h-full flex">
      <div className="w-1/3 flex justify-center">
        <div className="w-[90%] flex flex-col items-center bg-blue-200 mt-2 rounded-xl shadow-md">
          <div className="w-[90%] mt-8">
            <Input
              className="h-12 bg-slate-50 rounded-lg"
              placeholder="搜索..."
            />
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
              <div className="text-teal-400 text-xl font-semibold flex justify-between">
                <span>上次就诊结果</span>
                <span className="flex gap-2 items-center">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  <span className="text-zinc-500 text-sm">已出结果</span>
                </span>
              </div>
              <div className="mt-3 text-xl">感冒</div>
              <div className="mt-4">
                <div>
                  <span className="text-lg">医嘱:</span>
                </div>
                <div className="line-clamp-3 text-justify underline underline-offset-4 indent-8">
                  的急啊离开五角大楼文件的兰卡威大家为了扩大急啊离开我的就的垃圾狄拉克我到家了大家为了肯德基暗恋我
                </div>
              </div>
            </div>
            <div className="text-right font-mono text-sm text-zinc-500 mt-1">
              更新于 2024-04-11
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
          我的<span className="text-teal-400 ml-1">病例单</span>
        </div>
        <CaseCard
          cid="1"
          name="感冒"
          date="2024-04-11"
          doctor_say="的瓦赫空间打开今晚的骄傲会玩空间的哈健康网大家安静和我打完打开居委会大王带个无敌概括的大卫杜"
        />
        <CaseCard
          cid="1"
          name="感冒"
          date="2024-04-11"
          doctor_say="的瓦赫空间打开今晚的骄傲会玩空间的哈健康网大家安静和我打完打开居委会大王带个无敌概括的大卫杜"
        />
        <CaseCard
          cid="1"
          name="感冒"
          date="2024-04-11"
          doctor_say="的瓦赫空间打开今晚的骄傲会玩空间的哈健康网大家安静和我打完打开居委会大王带个无敌概括的大卫杜"
        />
        <CaseCard
          cid="1"
          name="感冒"
          date="2024-04-11"
          doctor_say="的瓦赫空间打开今晚的骄傲会玩空间的哈健康网大家安静和我打完打开居委会大王带个无敌概括的大卫杜"
        />
        <CaseCard
          cid="1"
          name="感冒"
          date="2024-04-11"
          doctor_say="的瓦赫空间打开今晚的骄傲会玩空间的哈健康网大家安静和我打完打开居委会大王带个无敌概括的大卫杜"
        />
      </div>
    </div>
  );
};

export default CaseList;
