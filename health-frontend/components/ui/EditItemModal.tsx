"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { post } from "@/net";
import { toast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Field {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea" | "date" | "file";
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  accept?: string;
  onFileUpload?: (file: File) => Promise<string>;
}

export interface EditItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityType: "checkProject" | "doctor" | "patient" | "appointment";
  entityId: string | null;
  title: string;
  description: string;
  fields: Field[];
  initialData?: Record<string, any>;
  onSuccess?: () => void;
}

// 直接通知组件
const DirectNotification = ({
  message,
  type = "success",
  onClose,
  autoClose = true,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  autoClose?: boolean;
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose, autoClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white z-[9999]`}
    >
      <div className="flex justify-between">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const EditItemModal = ({
  open,
  onOpenChange,
  entityType,
  entityId,
  title,
  description,
  fields,
  initialData,
  onSuccess,
}: EditItemModalProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [directNotification, setDirectNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (open && initialData) {
      setFormData(initialData);
    } else if (open) {
      // 重置表单数据
      const newFormData: Record<string, any> = {};
      fields.forEach((field) => {
        newFormData[field.name] = "";
      });
      setFormData(newFormData);
    }
  }, [open, initialData, fields]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setIsSubmitting(true);

      // 验证必填字段
      const missingFields = fields
        .filter((field) => field.required && !formData[field.name])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        setError(`请填写以下必填字段: ${missingFields.join(", ")}`);
        setIsSubmitting(false);
        return;
      }

      // 准备要提交的数据
      const submitData: Record<string, any> = {
        ...formData,
        entity_type: entityType,
      };

      // 如果有ID，则添加到提交数据中
      if (entityId) {
        submitData.id = entityId;
      }

      // 确定API端点
      const endpoint = entityId
        ? `/api/${entityType}/update`
        : `/api/${entityType}/create`;

      console.log("提交数据到:", endpoint, submitData);

      try {
        // 发送请求
        const result = await post(endpoint, submitData);
        console.log("API响应:", result);

        // 显示成功提示 - 同时使用toast和直接通知
        toast({
          title: entityId ? "更新成功" : "创建成功",
          description: `${title}已成功${entityId ? "更新" : "创建"}`,
          variant: "default",
        });

        // 使用直接通知
        setDirectNotification({
          message: `${title}已成功${entityId ? "更新" : "创建"}`,
          type: "success",
        });

        onOpenChange(false);
        if (onSuccess) {
          onSuccess();
        }
      } catch (apiError: any) {
        console.error("API错误:", apiError);
        throw apiError;
      }
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(err.message || "操作失败，请重试");

      // 尝试直接使用window.alert作为备用
      window.alert(`操作失败: ${err.message || "请重试"}`);

      // 使用toast
      toast({
        title: "操作失败",
        description: err.message || "请重试",
        variant: "destructive",
      });

      // 使用直接通知
      setDirectNotification({
        message: `操作失败: ${err.message || "请重试"}`,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (name: string, file: File) => {
    try {
      if (file && fields.find((f) => f.name === name)?.onFileUpload) {
        const uploadFunc = fields.find((f) => f.name === name)?.onFileUpload;
        if (uploadFunc) {
          const filename = await uploadFunc(file);
          handleChange(name, filename);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("文件上传失败，请重试");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.name} className="text-right">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
                {field.type === "file" ? (
                  <div className="col-span-3">
                    <Input
                      id={field.name}
                      type="file"
                      accept={field.accept}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileChange(field.name, file);
                        }
                      }}
                      className="col-span-3"
                    />
                    {formData[field.name] && (
                      <p className="text-sm text-gray-500 mt-1">
                        已选择文件: {formData[field.name]}
                      </p>
                    )}
                  </div>
                ) : field.type === "text" || field.type === "number" ? (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="col-span-3"
                  />
                ) : field.type === "select" && field.options ? (
                  <select
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">请选择{field.label}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="col-span-3 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                ) : field.type === "date" ? (
                  <div className="col-span-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData[field.name] && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData[field.name] ? (
                            format(new Date(formData[field.name]), "yyyy-MM-dd")
                          ) : (
                            <span>{field.placeholder || "选择日期"}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            formData[field.name]
                              ? new Date(formData[field.name])
                              : undefined
                          }
                          onSelect={(date) =>
                            handleChange(
                              field.name,
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : null}
              </div>
            ))}

            {error && (
              <div className="text-red-500 text-sm mt-2 col-span-4">
                {error}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-teal-500 hover:bg-teal-600"
            >
              {isSubmitting ? "提交中..." : entityId ? "更新" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 显示直接通知 */}
      {directNotification && (
        <DirectNotification
          message={directNotification.message}
          type={directNotification.type}
          onClose={() => setDirectNotification(null)}
        />
      )}
    </>
  );
};

export default EditItemModal;
