"use client";

import CheckInfoCard from "@/components/ui/CheckInfoCard";
import { ModeToggle } from "@/components/ui/modeToggle";
import { get } from "@/net";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Clipboard,
  ChevronLeft,
  Calendar,
  UserCircle,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface CheckItem {
  name: string;
  room: string;
  img: string;
  status: string;
  time: string;
}

export interface CaseInfo {
  id: string;
  title: string;
  doctor_name: string;
  doctor_type: string;
  doctorId: string;
  check_project: CheckItem[];
  content: string;
  sex: boolean;
  patient_name: string;
  patient_id: string;
  age: number;
  date: string;
  check_id: string;
}

const formatDate = (date: string) => {
  try {
    return format(parseISO(date), "yyyy-MM-dd");
  } catch (error) {
    return date;
  }
};

const CaseInfo = () => {
  const params = useParams();
  const { id } = params; // 获取动态路由参数
  const [caseInfo, setCaseInfo] = useState<CaseInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const getInfo = async () => {
    try {
      setIsLoading(true);
      const data = await get(`/api/cases/details?case_id=${id}`);
      setCaseInfo(data);
    } catch (error) {
      console.error("获取病例详情失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="/cases/list"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回病例列表
          </Link>
        </Button>
        <ModeToggle />
      </div>

      {/* 主要内容区域 */}
      <div className="flex-grow px-4 md:px-8 py-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {/* 病例标题和日期 */}
          <div className="border-b border-gray-200 dark:border-gray-700 p-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {caseInfo?.title}
                </h1>
                <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {caseInfo?.date ? formatDate(caseInfo.date) : "日期未知"}
                </div>
              </>
            )}
          </div>

          {/* 检查项目 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
              <Clipboard className="h-5 w-5 text-lime-600 dark:text-lime-400" />
              开具检查项
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : caseInfo?.check_project && caseInfo.check_project.length > 0 ? (
              <div className="space-y-4">
                {caseInfo.check_project.map((item, index) => (
                  <CheckInfoCard
                    key={`${item.name}-${index}`}
                    name={item.name}
                    date={item.time}
                    room={item.room}
                    status={item.status}
                    doctor_name={caseInfo.doctor_name}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                未开具检查项目
              </p>
            )}
          </div>

          {/* 医嘱 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-lime-600 dark:text-lime-400" />
              医嘱
            </h2>

            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-gray-800 dark:text-gray-200">
                {caseInfo?.content || "暂无医嘱"}
              </div>
            )}
          </div>

          {/* 主治医师 */}
          <div className="p-6 text-right">
            {isLoading ? (
              <Skeleton className="h-4 w-1/3 ml-auto" />
            ) : (
              <div className="flex items-center justify-end text-gray-700 dark:text-gray-300">
                <UserCircle className="h-5 w-5 mr-2 text-lime-600 dark:text-lime-400" />
                <span className="mr-2">主治医师:</span>
                <span className="font-medium">
                  {caseInfo?.doctor_name || "未知"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseInfo;
