"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名必须至少拥有2个字符.",
  }),
  password: z.string().min(8, {
    message: "用户名必须至少拥有8个字符.",
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
    (val) => (val === "1" ? 1 : val === "0" ? 0 : val),
    z.union([z.literal(1), z.literal(0), z.string()])
  ),
  allergens: z.string(),
  medical_history: z.string(),
});

// interface RegisterFormProps {
//   username: string;
//   height: number;
//   weight: number;
//   birthday: Date;
//   sex: number;
//   phone: string;
//   address: string;
//   allergens: string;
//   medical_history: string;
// }

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      height: 0,
      weight: 0,
      birthday: new Date(2000, 1, 1),
      sex: 0,
      phone: "",
      address: "",
      allergens: "",
      medical_history: "",
    },
  });
  const handleRegistration = (data: z.infer<typeof formSchema>) =>
    console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegistration)}>
        <section className="text-2xl text-zinc-800 font-semibold mt-16 mb-4 dark:text-zinc-200">
          个人基础信息
        </section>
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">用户名</FormLabel>
                <FormControl>
                  <Input placeholder="用户名..." {...field} />
                </FormControl>
                <FormDescription>请在这里输入您的用户名</FormDescription>
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
                    className="text-red-400 h-8 rounded-md dark:text-zinc-200 dark:border-gray-700"
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
              <FormItem className="space-y-3">
                <FormLabel>性别</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} className="flex">
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
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

export default RegisterForm;
