"use client";

import { ModeToggle } from "@/components/ui/modeToggle";
import Link from "next/link";
import CheckInfoCard from "@/components/ui/CheckInfoCard";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const CaseInfo = () => {
  const params = useParams();
  const { id } = params; // 获取动态路由参数
  useEffect(() => {
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
            <div className="text-6xl font-semibold">Title</div>
            <div className="text-zinc-600 text-2xl font-mono">2024-04-11</div>
          </div>

          <section className="px-12">
            <div className="text-4xl font-semibold">开具检查项</div>
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
              room="血液科A室"
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
          </section>

          <section className="px-12 pt-7">
            <div className="text-4xl font-semibold mt-3">医嘱</div>
            <div className="mt-4">
              爱唠叨哈勒戴林无敌按立为皇帝俩号我i大海我记得拉我的离开，爱哦为皇帝阿基里斯带我好歹是哈勒戴林无敌按立为皇帝俩号我i大海我记得拉我的离开，哈勒戴林无敌按立为皇帝俩号我i大海我记得拉我的离开，爱哦为皇帝阿基里斯带我好歹是都i阿文，带我和读卡水库打黑屋打死哈勒戴林无敌按立为皇帝俩号我i大海我记得拉我的离开，爱哦为皇帝阿基里斯带我好歹是都i阿文，带我和读卡水库打黑屋打死哈勒戴林无敌按立为皇帝俩号我i大海我记得拉我的离开，爱哦为皇帝阿基里斯带我好歹是都i阿文，带我和读卡水库打黑屋打死读卡水库打黑屋打死都i阿文，带我和读卡水库打黑屋打死不看就打不稳定
            </div>
          </section>

          <section className="flex justify-end mt-6 text-xl">
            <span>主治医师：</span>
            <span>李卓</span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CaseInfo;
