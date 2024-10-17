"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import { post } from "@/net";

const DoctorformSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "用户名必须至少拥有2个字符.",
    })
    .max(50),
  password: z
    .string()
    .min(8, {
      message: "密码必须至少拥有8个字符.",
    })
    .max(20, {
      message: "密码最多20个字符",
    }),
  name: z
    .string()
    .min(2, {
      message: "姓名必须至少拥有2个字符.",
    })
    .max(50),
  honor: z.string().min(2).max(50),
  job_title: z.string().min(2).max(50),
  job_type: z.string().min(2).max(50),
  phone: z.string().min(2).max(50),
});

interface AddInfoProp {
  path: string;
  onDataUpdate: () => void;
}

const AddInfoCard = ({ path, onDataUpdate }: AddInfoProp) => {
  const form = useForm<z.infer<typeof DoctorformSchema>>({
    resolver: zodResolver(DoctorformSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      honor: "",
      job_title: "",
      job_type: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof DoctorformSchema>) {
    await post("/api/doctor/create", values);
    onDataUpdate(); // 通知父组件更新数据
    setIsDialogOpen(false); // 关闭 AlertDialog
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className="flex w-full h-full">
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">{`添加更多${
            path === "/" ? "检查项" : "医生"
          }信息`}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`添加更多${
              path === "/" ? "检查项" : "医生"
            }信息`}</AlertDialogTitle>
            <AlertDialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>用户名</FormLabel>
                        <FormControl>
                          <Input placeholder="zhansan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>密码</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>真实姓名</FormLabel>
                        <FormControl>
                          <Input placeholder="张三" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="honor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>荣誉</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>职称</FormLabel>
                        <FormControl>
                          <Input placeholder="主治医师" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="job_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>科室</FormLabel>
                        <FormControl>
                          <Input placeholder="内科" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>电话</FormLabel>
                        <FormControl>
                          <Input placeholder="1231231231" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Button type="submit">提交</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddInfoCard;
