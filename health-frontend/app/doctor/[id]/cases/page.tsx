"use client";

import AddCheckCard from "@/components/ui/AddCheckCard";
import { Button } from "@/components/ui/button";
import CheckInfoCard from "@/components/ui/CheckInfoCard";
import { Textarea } from "@/components/ui/textarea";
import TodoCaseCard from "@/components/ui/TodoCaseCard";
import { useState } from "react";

const CasePage = () => {
  const [dialog, setDialog] = useState();
  return (
    <div className="h-full flex gap-2">
      <div className="w-1/3 h-full overflow-y-auto custom-scrollbar px-4 py-2 space-y-3 border-2 border-zinc-200 rounded-xl ml-2">
        <div className="text-teal-400 text-2xl font-semibold">待处理病例</div>
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
        <TodoCaseCard name="黄志远" age={21} sex="1" date="2024-04-11" />
      </div>
      <div className="w-2/3 px-4 py-2 overflow-y-auto custom-scrollbar relative">
        <div className="text-teal-400 text-2xl font-semibold">病历单填写</div>
        <div className="border rounded-lg p-2 mt-2">
          <div className="text-lg font-semibold">患者信息</div>
          <div className="flex justify-between p-2">
            <span>
              <span>姓名：</span>
              <span>黄志远</span>
            </span>
            <span>
              <span>性别：</span>
              <span>男</span>
            </span>
            <span>
              <span>年龄：</span>
              <span>21 周岁</span>
            </span>
          </div>
          <div className="p-2 flex justify-between">
            <span>
              <span>科室：</span>
              <span>消化科</span>
            </span>
            <span className="text-right">
              <span>就诊日期：</span>
              <span className="text-zinc-500 font-mono">2024-04-11 11:24</span>
            </span>
          </div>
        </div>

        <div className="rounded-xl mt-4 border p-2">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">检查项目</div>
            <AddCheckCard />
          </div>

          <div className="px-4">
            <CheckInfoCard
              name="心电图"
              date="2024-04-11"
              room="心电图A室"
              status="已完成"
              doctor_name="lizhuo"
            />
            <CheckInfoCard
              name="血检"
              date="2024-04-11"
              room="血检A室"
              status="已完成"
              doctor_name="lizhuo"
            />
            <CheckInfoCard
              name="脑电图"
              date="2024-04-11"
              room="脑电图A室"
              status="已完成"
              doctor_name="lizhuo"
            />
          </div>
        </div>

        <div className="rounded-xl mt-4 border p-4">
          <div className="text-lg font-semibold">病情</div>
          <div className="mt-4">
            <Textarea placeholder="请在这里填写病情" />
          </div>
          <div className="text-lg font-semibold mt-3">医嘱</div>
          <div className="mt-4">
            <Textarea placeholder="请在这里填写医嘱" />
          </div>
        </div>

        <div>
          <Button className="mt-4 absolute right-4">保存</Button>
        </div>
      </div>
    </div>
  );
};

export default CasePage;
