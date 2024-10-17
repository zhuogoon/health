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
import { useEffect, useState } from "react";
import { post } from "@/net";
import { useRouter } from "next/navigation";


interface DoctorInfo {
  id: string;
  name: string;
}

interface SelectedInfo {
  doctor_id: string | null;
  time_id: number | null;
  time: string | null;
}

interface AppointmentTime {
  val: number;
  status: number;
}

export function AppointSheet({ id, name }: DoctorInfo) {
  const [selectedVal, setSelectedVal] = useState<number | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfo>({
    time_id: null,
    doctor_id: id,
    time: null,
  });
  const [appointmentTime, setAppointmentTime] = useState<AppointmentTime[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const doctor_id = id.toString();
  const chooseProp = {
    doctor_id: doctor_id,
    date: selectedDate,
  };
  const Router = useRouter();

  const getAppointment = async () => {
    try {
      const data = await post("/api/appointment/choose", chooseProp);
      setAppointmentTime(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedInfo((prev) => ({ ...prev, time: date }));
    chooseProp.date = date;
    getAppointment();
  };

  const submit = async () => {
    try {
      const data = await post("/api/appointment/increase", selectedInfo);
      console.log(data);
      setSelectedVal(null);
      setAppointmentTime([]);
      Router.push("/patient/1/new-appointment/success");
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }

  };

  const handleSelect = (val: number | null) => {
    setSelectedVal(val);
    setSelectedInfo((prev) => ({ ...prev, time_id: val }));
  };

  const dates = Array.from({ length: 3 }, (_, i) => addDays(new Date(), i));

  useEffect(() => {
    console.log(appointmentTime);
  }, [appointmentTime]);

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
            在这里确认和医生的预约时间，请选择绿色标识表示该医生有空闲时间.
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
            {appointmentTime.map((time) => (
              <AppointTimeCard
                key={time.val}
                val={time.val}
                status={time.status.toString()}
                onSelect={handleSelect}
                isSelected={selectedVal === time.val}
              />
            ))}

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
