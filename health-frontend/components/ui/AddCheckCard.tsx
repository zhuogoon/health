"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { get, post } from "@/net";
import { useEffect, useState } from "react";

interface CheckItem {
  id: number;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  img: string;
  name: string;
  room: string;
}

interface CheckProps {
  doctor_id: string;
  patient_id: string;
  case_id: string;
  onClose: () => void;
}
export function AddCheckCard({
  doctor_id,
  patient_id,
  case_id,
  onClose,
}: CheckProps) {
  const [check, setCheck] = useState<CheckItem[]>([]);
  const [check_id, setCheckId] = useState<number>();

  const getProject = async () => {
    try {
      const data = await get("/api/checkProject/list");
      setCheck(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleValueChange = async (value: string) => {
    setCheckId(Number(value));
  };

  useEffect(() => {
    getProject();
  }, []);

  const Submit = async () => {
    try {
      if (!check_id) {
        console.error("No Check ID");
        return;
      }
      const data = await post("/api/check/addCheck", {
        doctor_id,
        patient_id,
        check_id,
        case_id,
      });
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          添加检查项目
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400 text-sm">
          请为患者选择需要进行的检查项目
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="select-project"
              className="text-gray-700 dark:text-gray-300"
            >
              检查项目
            </Label>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger
                id="select-project"
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                <SelectValue placeholder="请在这里选择一个检查" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              >
                {check?.map((item) => {
                  if (!item.id) return null;
                  const itemValue = item.id.toString();
                  if (!itemValue) return null;

                  return (
                    <SelectItem
                      key={item.id}
                      value={itemValue}
                      className="text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {item.room || `检查项目 ${itemValue}`}
                    </SelectItem>
                  );
                })}
                {(!check || check.length === 0) && (
                  <div className="py-2 px-2 text-sm text-gray-500 dark:text-gray-400">
                    无可用检查项目
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-3 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={onClose}
          variant="outline"
          className="mr-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          取消
        </Button>
        <Button
          onClick={Submit}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          添加
        </Button>
      </CardFooter>
    </Card>
  );
}
