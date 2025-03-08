"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { post } from "@/net";

interface Field {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
  fields: Field[];
  initialData: Record<string, any>;
  submitEndpoint: string;
  entityType: "patient" | "doctor" | "checkProject";
}

export function EditModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  description,
  fields,
  initialData,
  submitEndpoint,
  entityType,
}: EditModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // 添加实体类型标识，让API知道正在修改什么
      const dataToSubmit = {
        ...formData,
        entity_type: entityType,
      };

      const result = await post(submitEndpoint, dataToSubmit);

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.message || "修改失败，请重试");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("提交时发生错误，请重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-0 overflow-hidden">
        <DialogHeader className="bg-gray-50 dark:bg-gray-800 p-6">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400 mt-1.5">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label
                htmlFor={field.name}
                className="text-gray-700 dark:text-gray-300"
              >
                {field.label}
              </Label>

              {field.type === "text" || field.type === "number" ? (
                <Input
                  id={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                />
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full min-h-[80px] p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                />
              ) : field.type === "select" && field.options ? (
                <select
                  id={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
                >
                  <option value="">请选择</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ))}
        </div>

        <DialogFooter className="bg-gray-50 dark:bg-gray-800 p-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
          >
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            {isSubmitting ? "保存中..." : "保存修改"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
