"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PatientInfo } from "@/app/patient/settings/page";
import { useEffect } from "react";
import { post } from "@/net";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "用户名必须至少拥有2个字符.",
  }),
  height: z.preprocess(
    (val) => Number(val),
    z.number().min(0, {
      message: "身高必须大于0.",
    })
  ),
  weight: z.preprocess(
    (val) => Number(val),
    z.number().min(0, {
      message: "体重必须大于0.",
    })
  ),
  birthday: z.date().min(new Date(1900, 1, 1), {
    message: "生日必须大于1900年.",
  }),
  phone: z.string().min(5, {
    message: "电话号码必须至少拥有5个字符.",
  }),
  address: z.string().min(2, {
    message: "地址必须至少拥有2个字符.",
  }),
  sex: z.preprocess(
    (val) => (val === "1" ? true : val === "0" ? false : val),
    z.union([z.literal(true), z.literal(false), z.string()])
  ),
  allergens: z.string(),
  medical_history: z.string(),
});

export function SettingsForm({
  data,
  onSuccess,
}: {
  data: PatientInfo | null;
  onSuccess: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      height: 0,
      weight: 0,
      birthday: new Date(),
      sex: true,
      phone: "",
      address: "",
      allergens: "",
      medical_history: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        height: data.height,
        weight: data.weight,
        birthday: data.birthday ? new Date(data.birthday) : new Date(),
        sex: data.sex === "男" ? true : false,
        phone: data.phone,
        address: data.address,
        allergens: data.allergens,
        medical_history: data.medical_history,
      });
    }
  }, [data, form]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await post("/api/patient/update", data);
      onSuccess(); // 调用回调函数
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mr-20 shadow-sm ml-3 ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[480px]"
        >
          <section className="text-2xl text-zinc-800 font-semibold mt-16 mb-4 dark:text-zinc-200">
            个人基础信息
          </section>
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">真实姓名</FormLabel>
                  <FormControl>
                    <Input placeholder="真实姓名..." {...field} />
                  </FormControl>
                  <FormDescription>请在这里输入您的真实姓名</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">电话号码</FormLabel>
                  <FormControl>
                    <PhoneInput
                      onChange={field.onChange}
                      defaultCountry="CN"
                      placeholder="请输入电话号码"
                      international
                      withCountryCallingCode
                      value={field.value as E164Number | undefined}
                      className="text-zinc-500 h-8 rounded-md dark:text-zinc-200 dark:border-gray-700 border border-zinc-200 font-mono"
                    />
                  </FormControl>
                  <FormDescription>请在这里输入您的电话号码</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">地址</FormLabel>
                  <FormControl>
                    <Input placeholder="浙江省温州市..." {...field} />
                  </FormControl>
                  <FormDescription>请在这里输入您的地址</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>性别</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className="flex px-3 gap-3"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 border p-2 rounded-lg">
                        <FormControl>
                          <RadioGroupItem value="1" />
                        </FormControl>
                        <FormLabel className="font-normal">男</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 border p-2 rounded-lg">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">女</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0 border p-2 rounded-lg">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">其他</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <div className="flex items-center gap-1 rounded-md border border-zinc-200 w-[45%] h-9">
              <Image
                unoptimized
                src="/icons/calendar.svg"
                height={20}
                width={20}
                alt="calendar"
                className="ml-2 filter-black"
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date as Date)}
                    className=" border-none text-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 font-mono"
                    dateFormat="yyyy-MM-dd"
                    timeInputLabel="Time:"
                    wrapperClassName=""
                  />
                )}
              />
            </div>
          </div>

          <section className="text-2xl text-zinc-800 font-semibold mb-4 dark:text-zinc-200">
            个人医疗信息
          </section>
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">身高（cm）</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="font-mono text-md"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">体重（kg）</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="font-mono text-md"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="allergens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="allergens">过敏源</FormLabel>
                  <FormControl>
                    <Textarea
                      id="allergens"
                      placeholder="牛奶，花生..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medical_history"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="medical_history">过往病史</FormLabel>
                  <FormControl>
                    <Textarea
                      id="medical_history"
                      placeholder="高血压..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300  w-full bg-teal-600"
          >
            📄保存信息
          </Button>
        </form>
      </Form>

      <div className="flex justify-between items-center mt-10">
        <div className="text-zinc-600">©2025慧医智慧医疗系统</div>
      </div>
    </div>
  );
}
