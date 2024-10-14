"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addDays } from "date-fns";
import AppointTimeCard from "../ui/AppointTimeCard";
import { useState } from "react";

interface DoctorInfo {
  id: string;
  name: string;
}

interface SelectedInfo {
  doctorId: string | null;
  timeId: number | null;
  time: string | null;
}

export function AppointSheet({ id, name }: DoctorInfo) {
  const [selectedVal, setSelectedVal] = useState<number | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfo>({
    timeId: null,
    doctorId: id,
    time: null,
  });

  const submit = () => {
    console.log(selectedInfo);
    setSelectedVal(null);
  };

  const handleSelect = (val: number | null) => {
    setSelectedVal(val);
    setSelectedInfo((prev) => ({ ...prev, timeId: val }));
  };
  const handleDateChange = (date: string) => {
    setSelectedVal(null);
    setSelectedInfo((prev) => ({ ...prev, time: date }));
  };
  const dates = Array.from({ length: 3 }, (_, i) => addDays(new Date(), i));
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="hover:text-teal-500 hover:bg-none" variant="ghost">
          立即预约 👉
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>确认您的预约时间</SheetTitle>
          <SheetDescription>
            在这里确认和医生的预约时间，请选择绿色标识表示可以该医生有空闲时间.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              医生姓名
            </Label>
            <Input id="name" value={name} className="col-span-3" disabled />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              日期
            </Label>
            <Select onValueChange={handleDateChange}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="选择日期" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>三天内的日期</SelectLabel>
                  {dates.map((date, index) => (
                    <SelectItem key={index} value={format(date, "yyyy-MM-dd")}>
                      {format(date, "yyyy-MM-dd")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <AppointTimeCard
              val={1}
              status="1"
              onSelect={handleSelect}
              isSelected={selectedVal === 1}
            />
            <AppointTimeCard
              val={2}
              status="0"
              onSelect={handleSelect}
              isSelected={selectedVal === 2}
            />
            <AppointTimeCard
              val={3}
              status="1"
              onSelect={handleSelect}
              isSelected={selectedVal === 3}
            />
            <AppointTimeCard
              val={4}
              status="0"
              onSelect={handleSelect}
              isSelected={selectedVal === 4}
            />
            <AppointTimeCard
              val={5}
              status="0"
              onSelect={handleSelect}
              isSelected={selectedVal === 5}
            />
            <AppointTimeCard
              val={6}
              status="1"
              onSelect={handleSelect}
              isSelected={selectedVal === 6}
            />
            <AppointTimeCard
              val={7}
              status="0"
              onSelect={handleSelect}
              isSelected={selectedVal === 7}
            />
            <AppointTimeCard
              val={8}
              status="1"
              onSelect={handleSelect}
              isSelected={selectedVal === 8}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              className="bg-teal-500 hover:bg-teal-600"
              onClick={submit}
              type="submit"
            >
              立即预约 🚀
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
