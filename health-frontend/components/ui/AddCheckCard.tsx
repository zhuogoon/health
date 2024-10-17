"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  ID: number;
  CreatedAt: string;
  DeletedAt: string | null;
  UpdatedAt: string;
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
      console.error("Error fetching check projects:", error);
    }
  };

  const handleValueChange = async (value: string) => {
    setCheckId(Number(value));
  };

  const Submit = async () => {
    try {
      await post("/api/check/add", {
        case_id,
        doctor_id,
        patient_id,
        check_project_id: check_id,
      });
      onClose();
    } catch (error) {
      console.error("Error adding check project:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-teal-400 text-zinc-100" variant="outline">
          添加检查项
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>添加检查项</SheetTitle>
          <SheetDescription>在这里为患者添加一个检查项目.</SheetDescription>
        </SheetHeader>
        <Card className="w-[350px] mt-3">
          <CardHeader>
            <CardTitle>创建检查</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">检查</Label>
                  <Select onValueChange={handleValueChange}>
                    <SelectTrigger id="check">
                      <SelectValue placeholder="请在这里选择一个检查" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {check?.map((item) => (
                        <SelectItem key={item.ID} value={item.ID.toFixed()}>
                          {item.room}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">取消</Button>
            <Button onClick={Submit}>创建</Button>
          </CardFooter>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
