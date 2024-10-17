"use client";

import { AddCheckCard } from "@/components/ui/AddCheckCard";
import { Button } from "@/components/ui/button";
import CheckInfoCard from "@/components/ui/CheckInfoCard";
import { Textarea } from "@/components/ui/textarea";
import TodoCaseCard from "@/components/ui/TodoCaseCard";
import { useEffect, useState } from "react";
import { TodoCase } from "../../home/page";
import { get, post } from "@/net";
import { useParams } from "next/navigation";
import { CaseInfo } from "@/app/cases/[id]/info/page";

const CasePage = () => {
  const { id } = useParams();
  const [todoCase, setTodoCase] = useState<TodoCase[]>([]);
  const [pid, setPid] = useState<string | string[]>(id);
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
    doctor_id: "",
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
    setPid(id);
    try {
      const result = await get(`/api/cases/details?case_id=${id}`);
      setPatientInfo(result);
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
  };

  useEffect(() => {
    getTodoCases();
    getPatientInfo(pid);
  }, []);
  return (
    <div className="h-full flex gap-2">
      <div className="w-1/3 h-full overflow-y-auto custom-scrollbar px-4 py-2 space-y-3 border-2 border-zinc-200 rounded-xl ml-2">
        <div className="text-teal-400 text-2xl font-semibold">待处理病例</div>
        {todoCase ? (
          todoCase.map((item) => (
            <TodoCaseCard
              name={item.patient_name}
              age={item.age}
              sex={item.sex}
              date={item.updated_at}
              onClick={() => {
                getPatientInfo(item.id.toString());
              }}
            />
          ))
        ) : (
          <>已将没有要处理了病例了~</>
        )}
      </div>
      <div className="w-2/3 px-4 py-2 overflow-y-auto custom-scrollbar relative">
        <div className="text-teal-400 text-2xl font-semibold">病历单填写</div>
        <div className="border rounded-lg p-2 mt-2">
          <div className="text-lg font-semibold">患者信息</div>
          <div className="flex justify-between p-2">
            <span>
              <span>姓名：</span>
              <span>{patientInfo?.patient_name}</span>
            </span>
            <span>
              <span>性别：</span>
              <span>{patientInfo?.sex ? "男" : "女"}</span>
            </span>
            <span>
              <span>年龄：</span>
              <span>{patientInfo?.age} 周岁</span>
            </span>
          </div>
          <div className="p-2 flex justify-between">
            <span>
              <span>科室：</span>
              <span>{patientInfo?.doctor_type}</span>
            </span>
            <span className="text-right">
              <span>就诊日期：</span>
              <span className="text-zinc-500 font-mono">
                {patientInfo?.date}
              </span>
            </span>
          </div>
        </div>

        <div className="rounded-xl mt-4 border p-2">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">检查项目</div>
            <AddCheckCard
              case_id={patientInfo.id}
              doctor_id={patientInfo.doctor_id}
              patient_id={patientInfo.patient_id}
              onClose={updateInfo}
            />
          </div>

          {patientInfo?.check_project &&
          patientInfo.check_project.length > 0 ? (
            patientInfo?.check_project.map((item) => (
              <CheckInfoCard
                name={item.name}
                date={item.time}
                room={item.room}
                status={item.status}
                doctor_name={patientInfo.doctor_name}
              />
            ))
          ) : (
            <div>当前没有检查项目哦</div>
          )}
        </div>

        <div className="rounded-xl mt-4 border p-4">
          <div className="text-lg font-semibold">病情</div>
          <div className="mt-4">
            <Textarea
              value={patientInfo.title}
              onChange={handleContentChange}
              placeholder="请在这里填写病情"
            />
          </div>
          <div className="text-lg font-semibold mt-3">医嘱</div>
          <div className="mt-4">
            <Textarea
              value={patientInfo.content}
              onChange={handleTitleChange}
              placeholder="请在这里填写医嘱"
            />
          </div>
        </div>

        <div>
          <Button onClick={Submit} className="mt-4 absolute right-4">
            保存
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CasePage;
