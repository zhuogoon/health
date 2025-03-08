"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Scroll,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { get, post } from "@/net";
import { toast } from "@/components/ui/use-toast";
import EditItemModal from "@/components/ui/EditItemModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar as CalendarIcon } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  gender: "male" | "female" | "other";
  age?: number;
  sex?: boolean | string; // 修改为布尔值类型
  height?: number;
  weight?: number;
  phone: string;
  email?: string;
  address?: string;
  medicalHistory?: string;
  medical_history?: string; // API返回的字段名
  allergens?: string;
  birthday?: string;
  registrationDate?: string;
}

// 扩展Field接口以支持日期类型
interface PatientField {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "textarea" | "date";
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
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

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [viewPatient, setViewPatient] = useState<Patient | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [directNotification, setDirectNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const fields: PatientField[] = [
    {
      name: "name",
      label: "姓名",
      type: "text" as const,
      placeholder: "请输入患者姓名",
      required: true,
    },
    {
      name: "sex",
      label: "性别",
      type: "select" as const,
      options: [
        { value: "true", label: "男" },
        { value: "false", label: "女" },
      ],
      required: false,
    },
    {
      name: "birthday",
      label: "出生日期",
      type: "date" as const,
      placeholder: "请选择出生日期",
    },
    {
      name: "height",
      label: "身高(cm)",
      type: "number" as const,
      placeholder: "请输入身高",
    },
    {
      name: "weight",
      label: "体重(kg)",
      type: "number" as const,
      placeholder: "请输入体重",
    },
    {
      name: "phone",
      label: "电话",
      type: "text" as const,
      placeholder: "请输入联系电话",
      required: true,
    },
    {
      name: "address",
      label: "地址",
      type: "text" as const,
      placeholder: "请输入地址",
    },
    {
      name: "allergens",
      label: "过敏源",
      type: "text" as const,
      placeholder: "请输入过敏源，多个以逗号分隔",
    },
    {
      name: "medical_history",
      label: "病史",
      type: "textarea" as const,
      placeholder: "请输入病史记录",
    },
  ];

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const data = await get("/api/admin/patient");

      // 格式化数据以适应我们的组件
      const formattedData = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        gender: item.sex || "other", // 保持原始值
        sex: item.sex,
        age: item.age,
        height: item.height,
        weight: item.weight,
        phone: item.phone || "",
        address: item.address || "",
        medical_history: item.medical_history || "",
        allergens: item.allergens || "",
        birthday: item.birthday || "",
      }));

      setPatients(formattedData);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast({
        title: "加载失败",
        description: "无法加载患者数据，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setModalOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    if (patient.sex == "男") {
      patient.sex = true;
    } else if (patient.sex == "女") {
      patient.sex = false;
    }
    setSelectedPatient(patient);
    setModalOpen(true);
    setDropdownOpen(null);
  };

  const handleDeletePatient = async (id: string) => {
    setDropdownOpen(null);
    if (!confirm("确定要删除该患者记录吗？此操作不可撤销。")) {
      return;
    }

    try {
      // 调用实际的删除API
      await post("/api/admin/patient/delete", { id: parseInt(id) });

      toast({
        title: "删除成功",
        description: "患者记录已成功删除",
        variant: "default",
      });

      // 使用直接通知
      setDirectNotification({
        message: "患者记录已成功删除",
        type: "success",
      });

      // 重新获取患者列表
      await fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast({
        title: "删除失败",
        description: "无法删除患者记录，请重试",
        variant: "destructive",
      });

      // 使用直接通知
      setDirectNotification({
        message: "删除失败: 无法删除患者记录，请重试",
        type: "error",
      });
    }
  };

  const handleModalSuccess = () => {
    fetchPatients();
  };

  const handleViewDetails = (patient: Patient) => {
    setViewPatient(patient);
    setDetailsOpen(true);
    setDropdownOpen(null);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "未知";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("zh-CN");
    } catch (e) {
      return dateStr;
    }
  };

  const filteredPatients = patients.filter((patient) => {
    // 搜索筛选
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient.phone && patient.phone.includes(searchQuery)) ||
      (patient.address &&
        patient.address.toLowerCase().includes(searchQuery.toLowerCase()));

    // 性别筛选
    const matchesGender =
      genderFilter === "all" ||
      (genderFilter === "true" && patient.sex === true) ||
      (genderFilter === "false" && patient.sex === false);

    return matchesSearch && matchesGender;
  });

  const formatGender = (gender: string | boolean | undefined | null) => {
    if (gender === true || gender === "true" || gender === "男") return "男";
    if (gender === false || gender === "false" || gender === "女") return "女";
    return "未设置";
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            患者管理
          </h1>
          <Button
            onClick={handleAddPatient}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            添加患者
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex items-center w-full max-w-sm space-x-2">
            <Input
              type="text"
              placeholder="搜索姓名、电话或地址..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">性别:</span>
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="选择性别" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部</SelectItem>
                <SelectItem value="true">男</SelectItem>
                <SelectItem value="false">女</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              未找到匹配的患者记录
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-gray-200 dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>性别</TableHead>
                  <TableHead>年龄</TableHead>
                  <TableHead>身高/体重</TableHead>
                  <TableHead>电话</TableHead>
                  <TableHead>地址</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{formatGender(patient.sex || "")}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>
                      {patient.height
                        ? `${patient.height}cm/${patient.weight}kg`
                        : "-"}
                    </TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {patient.address}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu
                        open={dropdownOpen === patient.id}
                        onOpenChange={(open) =>
                          setDropdownOpen(open ? patient.id : null)
                        }
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(patient)}
                          >
                            <Scroll className="h-4 w-4 mr-2" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditPatient(patient)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeletePatient(patient.id)}
                            className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            删除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <EditItemModal
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open);
            if (!open) {
              setSelectedPatient(null);
            }
          }}
          entityType="patient"
          entityId={selectedPatient?.id || null}
          title={selectedPatient ? "编辑患者信息" : "添加患者"}
          description={
            selectedPatient ? "修改患者的详细信息" : "添加新的患者到系统"
          }
          fields={fields}
          initialData={selectedPatient || undefined}
          onSuccess={handleModalSuccess}
        />

        <Dialog
          open={detailsOpen}
          onOpenChange={(open) => {
            setDetailsOpen(open);
            if (!open) {
              setViewPatient(null);
            }
          }}
        >
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="text-xl">患者详细信息</DialogTitle>
              <DialogDescription>
                查看患者 {viewPatient?.name} 的完整信息
              </DialogDescription>
            </DialogHeader>

            {viewPatient && (
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    姓名
                  </p>
                  <p className="text-base">{viewPatient.name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    性别
                  </p>
                  <p className="text-base">
                    {formatGender(viewPatient.sex || "")}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    年龄
                  </p>
                  <p className="text-base">{viewPatient.age || "未知"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    生日
                  </p>
                  <p className="text-base flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {formatDate(viewPatient.birthday)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    身高
                  </p>
                  <p className="text-base">
                    {viewPatient.height ? `${viewPatient.height} cm` : "未知"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    体重
                  </p>
                  <p className="text-base">
                    {viewPatient.weight ? `${viewPatient.weight} kg` : "未知"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    电话
                  </p>
                  <p className="text-base">{viewPatient.phone || "未知"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    地址
                  </p>
                  <p className="text-base">{viewPatient.address || "未知"}</p>
                </div>

                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    过敏源
                  </p>
                  <p className="text-base p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                    {viewPatient.allergens || "无记录"}
                  </p>
                </div>

                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    病史
                  </p>
                  <p className="text-base p-2 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[80px]">
                    {viewPatient.medical_history ||
                      viewPatient.medicalHistory ||
                      "无记录"}
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

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
}
