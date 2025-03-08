"use client";

import { AddCheckCard } from "@/components/ui/AddCheckCard";
import { Button } from "@/components/ui/button";
import CheckInfoCard from "@/components/ui/CheckInfoCard";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { TodoCase } from "../../home/page";
import { get, post } from "@/net";
import { useParams } from "next/navigation";
import { CaseInfo } from "@/app/cases/[id]/info/page";

const CasePage = () => {
  const { id } = useParams();
  const [todoCase, setTodoCase] = useState<TodoCase[]>([]);
  const [pid, setPid] = useState<string | string[]>(id);
  const [showAddCheck, setShowAddCheck] = useState(false);

  const getTodoCases = async () => {
    try {
      const result = await get("/api/doctor/nonfinishcases");
      setTodoCase(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [patientInfo, setPatientInfo] = useState<CaseInfo>({
    id: "",
    title: "",
    doctor_name: "",
    doctor_type: "",
    doctorId: "",
    check_project: [],
    content: "",
    sex: false,
    patient_name: "",
    patient_id: "",
    age: 0,
    date: "",
    check_id: "",
  });

  const getPatientInfo = async (id: string | string[]) => {
    try {
      const data = await get(`/api/cases/details?case_id=${id}`);
      setPatientInfo(data);
      setPid(id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatientInfo({ ...patientInfo, title: event.target.value });
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setPatientInfo({ ...patientInfo, content: event.target.value });
  };

  const Submit = async () => {
    await post("/api/cases/update", patientInfo);
    getPatientInfo(pid);
  };

  const updateInfo = () => {
    getPatientInfo(pid);
    setShowAddCheck(false);
  };

  useEffect(() => {
    getTodoCases();
    getPatientInfo(pid);
  }, []);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-950 p-5 transition-colors duration-200 flex flex-col">
      <div className="flex flex-col md:flex-row h-full gap-5 overflow-hidden">
        {/* 左侧待处理病例列表 - 固定不滚动 */}
        <div className="md:w-1/3 w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col max-h-full">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              待处理病例
            </h2>
          </div>

          <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
            {todoCase && todoCase.length > 0 ? (
              <div className="space-y-3">
                {todoCase.map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer ${
                      patientInfo.id === item.id.toString()
                        ? "border-teal-500 dark:border-teal-400"
                        : ""
                    }`}
                    onClick={() => {
                      getPatientInfo(item.id.toString());
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                          {item.sex === "1" ? "♂" : "♀"}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 dark:text-gray-200">
                            {item.patientName}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.age}岁
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400 dark:text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-2 opacity-40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>已经没有要处理的病例了</p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧病历填写区域 - 可滚动 */}
        <div className="md:w-2/3 w-full flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1 max-h-full">
          {/* 患者信息卡片 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              患者信息
            </h2>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    姓名
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {patientInfo?.patient_name || "未知"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    性别
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {patientInfo?.sex ? "男" : "女"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    年龄
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {patientInfo?.age} 周岁
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    科室
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {patientInfo?.doctor_type || "未知"}
                  </span>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    就诊日期
                  </span>
                  <span className="text-gray-800 dark:text-gray-200 font-mono">
                    {patientInfo?.date || "未知"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 检查项目区域 - 使用更明确的样式强制显示 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border-2 border-teal-300 dark:border-teal-700 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-teal-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <span className="text-teal-600 dark:text-teal-400">
                  检查项目
                </span>
              </h2>

              <Button
                onClick={() => setShowAddCheck(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full text-sm px-4 py-1.5"
              >
                添加检查
              </Button>
            </div>

            {/* 添加检查卡片 - 始终渲染，但条件显示 */}
            {showAddCheck && patientInfo && patientInfo.id && (
              <div className="mb-4">
                <AddCheckCard
                  case_id={patientInfo.id}
                  doctor_id={patientInfo.doctorId || "doctor_default"}
                  patient_id={patientInfo.patient_id || "patient_default"}
                  onClose={updateInfo}
                />
              </div>
            )}

            {/* 检查项目列表 */}
            {patientInfo?.check_project &&
            patientInfo.check_project.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {patientInfo.check_project.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {item.name}
                      </h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          item.status === "已完成"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        检查室: {item.room}
                      </span>
                      <span className="text-gray-500 dark:text-gray-500 text-xs">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/30 rounded-lg p-8 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-3 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <p className="text-gray-600 dark:text-gray-300 font-medium mb-1">
                  暂无检查项目
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  点击上方"添加检查"按钮添加新的检查项目
                </p>
              </div>
            )}
          </div>

          {/* 病例信息填写区域 */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              病例信息
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  诊断结果
                </label>
                <Textarea
                  value={patientInfo?.title}
                  onChange={handleTitleChange}
                  placeholder="请输入诊断结果..."
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  医嘱内容
                </label>
                <Textarea
                  value={patientInfo?.content}
                  onChange={handleContentChange}
                  placeholder="请输入医嘱内容..."
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg"
                  rows={6}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={Submit}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2"
                >
                  保存病例
                </Button>
              </div>
            </div>
          </div>

          {/* 底部间距 */}
          <div className="h-4 flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default CasePage;
