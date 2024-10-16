"use client";

import { ModeToggle } from "@/components/ui/modeToggle";
import Link from "next/link";
import CheckInfoCard from "@/components/ui/CheckInfoCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { get } from "@/net";
import { log } from "console";

interface CheckItem {
  name: string;
  room: string;
  img: string;
  status: string;
  time: string;
}

interface CaseInfo {
  id: string;
  title: string;
  doctor_name: string;
  check_project: CheckItem[];
  content: string;
}

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const CaseInfo = () => {
  const params = useParams();
  const { id } = params; // 获取动态路由参数
  const [caseInfo, setCaseInfo] = useState<CaseInfo | undefined>(undefined);

  const getInfo = async () => {
    const data = await get(`/api/cases/details?case_id=${id}`);
    setCaseInfo(data);
  };
  useEffect(() => {
    getInfo();
    console.log("id:", id);
  }, []);
  return (
    <div className="h-screen w-screen bg-zinc-200 flex flex-col">
      <div className="flex justify-between items-center p-3">
        <div>
          <Link className="text-teal-400 text-lg" href="/cases/list">
            ◀ 返回病例列表
          </Link>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="flex flex-grow justify-center mt-4 overflow-y-auto custom-scrollbar">
        <div className="w-[76%] bg-zinc-100/80 shadow-md p-4 rounded-2xl flex flex-col overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-end mb-10">
            <div className="text-6xl font-semibold">{caseInfo?.title}</div>
            <div className="text-zinc-600 text-2xl font-mono">2024-04-11</div>
          </div>

          <section className="px-12">
            <div className="text-4xl font-semibold">开具检查项</div>
            {caseInfo?.check_project.map((item) => (
              <CheckInfoCard
                name={item.name}
                date={item.time}
                room={item.room}
                status={item.status}
                doctor_name={caseInfo.doctor_name}
              />
            ))}
          </section>

          <section className="px-12 pt-7">
            <div className="text-4xl font-semibold mt-3">医嘱</div>
            <div className="mt-4">{caseInfo?.content}</div>
          </section>

          <section className="flex justify-end mt-6 text-xl">
            <span>主治医师：</span>
            <span>{caseInfo?.doctor_name}</span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CaseInfo;
