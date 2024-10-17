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
    getLastestCase();
    queryCase();
  }, []);

  return (
    <div className="bg-slate-100 h-full flex">
      <div className="w-1/3 flex justify-center">
        <div className="w-[90%] flex flex-col items-center bg-blue-200 mt-2 rounded-xl shadow-md">
          <div className="w-[90%] mt-8">
            <Input
              className="h-12 bg-slate-50 rounded-lg"
              placeholder="搜索..."
              onChange={(e) =>
                (query.title = (e.target as HTMLInputElement).value)
              }
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
                {LatestCase ? (
                  <span className="flex gap-2 items-center">
                    <div
                      className={`h-2 w-2 ${
                        LatestCase?.status ? "bg-green-400" : "bg-red-500"
                      } rounded-full`}
                    ></div>
                    <span className="text-zinc-500 text-sm">
                      {LatestCase?.status ? "已出结果" : "未出结果"}
                    </span>
                  </span>
                ) : (
                  <div className="text-sm text-zinc-600 font-medium">
                    暂无病例记录哦
                  </div>
                )}
              </div>
              {LatestCase?.status && (
                <div>
                  <div className="mt-3 text-xl">{LatestCase?.title}</div>
                  <div className="mt-4">
                    <div>
                      <span className="text-lg">医嘱:</span>
                    </div>
                    <div className="line-clamp-3 text-justify underline underline-offset-4 indent-8">
                      {LatestCase?.content}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {LatestCase && (
              <div className="text-right font-mono text-sm text-zinc-500 mt-1">
                更新于 {LatestCase?.UpdatedAt}
              </div>
            )}
          </div>

          <div className="bg-zinc-50 shadow-sm w-[90%] rounded-lg flex-grow p-4 mt-3">
            <div className="text-center text-lg font-semibold text-teal-400">
              健康小知识
            </div>

            <div className="mt-4">
              【选择合适的时间吃零食】零食一般放在两餐之间吃。起到少食多餐的效果，既能补充体能的需要，又能减少下次进餐的能量。很多人喜欢边看电视边吃零食，这是个很不好的习惯。我们看电视的时候注意力大都集中在电视内容上，会在不经意间吃进更多的零食。经常这样会导致能量过剩，引发肥胖或者其他慢性病。
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 overflow-y-auto custom-scrollbar">
        <div className="text-3xl font-semibold pt-5 pl-1">
          我的<span className="text-teal-400 ml-1">病例单</span>
        </div>
        {caseList.length > 0 ? (
          caseList.map((c) => (
            <CaseCard
              key={c.ID}
              cid={c.ID}
              name={c.title}
              date={c.CreatedAt}
              doctor_say={c.content}
            />
          ))
        ) : (
          <div className="m-2 text-zinc-600">目前还没有病例信息哦</div>
        )}
      </div>
    </div>
  );
};

export default CaseList;
