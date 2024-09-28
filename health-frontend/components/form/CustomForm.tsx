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
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名必须至少拥有2个字符.",
  }),
  password: z.string().min(8, {
    message: "用户名必须至少拥有8个字符.",
  }),
});

export function CustomForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  interface FormValues {
    username: string;
    password: string;
  }

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  // ...

  return (
    <div className="mr-20 shadow-sm ml-3 ">
      <div className="text-2xl text-zinc-800 font-semibold mt-16 mb-14">
        让我们快速开始
        <span className="text-sm text-zinc-600">
          （如果您第一次使用,这将会为您创建一个账号）
        </span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-[480px]"
        >
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">密码</FormLabel>
                <FormControl>
                  <Input placeholder="密码..." {...field} />
                </FormControl>
                <FormDescription>请在这里输入您的密码</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-400 duration-300  w-full bg-teal-600"
            type="submit"
          >
            🚀 快速开始
          </Button>
        </form>
      </Form>

      <div className="flex justify-between items-center mt-10">
        <div className="text-zinc-600">©2024 智慧医疗系统</div>
        <Link href="/admin" className=" text-teal-500">
          Admin
        </Link>
      </div>
    </div>
  );
}
