"use client";

import EditItemModal from "@/components/ui/EditItemModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { get, post } from "@/net";
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Doctor {
  id: string;
  name: string;
  honor?: string;
  job_title: string;
  job_type: string;
  phone: string;
  user_id?: number;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const fields = [
    {
      name: "name",
      label: "姓名",
      type: "text" as const,
      placeholder: "请输入医生姓名",
      required: true,
    },
    {
      name: "job_title",
      label: "职称",
      type: "select" as const,
      options: [
        { value: "主任医师", label: "主任医师" },
        { value: "副主任医师", label: "副主任医师" },
        { value: "主治医师", label: "主治医师" },
        { value: "住院医师", label: "住院医师" },
      ],
      required: true,
    },
    {
      name: "job_type",
      label: "专业方向",
      type: "text" as const,
      placeholder: "请输入专业方向",
      required: true,
    },
    {
      name: "honor",
      label: "荣誉",
      type: "text" as const,
      placeholder: "请输入荣誉称号",
    },
    {
      name: "phone",
      label: "联系电话",
      type: "text" as const,
      placeholder: "请输入联系电话",
      required: true,
    },
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setIsLoading(true);
      const data = await get("/api/admin/doctor");

      // 格式化数据以适应我们的组件
      const formattedData = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        honor: item.honor || "",
        job_title: item.job_title || "",
        job_type: item.job_type || "",
        phone: item.phone || "",
        user_id: item.user_id,
        avatar: item.avatar,
        created_at: item.created_at,
        updated_at: item.updated_at,
        deleted_at: item.deleted_at,
      }));

      setDoctors(formattedData);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast({
        title: "加载失败",
        description: "无法加载医生数据，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setModalOpen(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
    setDropdownOpen(null);
  };

  const handleDeleteDoctor = async (id: string) => {
    setDropdownOpen(null);
    if (!confirm("确定要删除该医生记录吗？此操作不可撤销。")) {
      return;
    }

    try {
      // 调用实际的删除API
      await post("/api/admin/doctor/delete", { id: parseInt(id) });

      toast({
        title: "删除成功",
        description: "医生记录已成功删除",
        variant: "default",
      });

      // 重新获取医生列表
      await fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast({
        title: "删除失败",
        description: "无法删除医生记录，请重试",
        variant: "destructive",
      });
    }
  };

  const handleModalSuccess = () => {
    fetchDoctors();
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doctor.job_type &&
        doctor.job_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doctor.job_title &&
        doctor.job_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doctor.honor &&
        doctor.honor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          医生管理
        </h1>
        <Button
          onClick={handleAddDoctor}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加医生
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="搜索姓名、职称或专业方向..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Button type="submit" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            未找到匹配的医生记录
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow transition-shadow"
            >
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-medium">
                    {doctor.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {doctor.job_title} | {doctor.job_type}
                  </p>
                </div>
                <DropdownMenu
                  open={dropdownOpen === doctor.id}
                  onOpenChange={(open) =>
                    setDropdownOpen(open ? doctor.id : null)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditDoctor(doctor)}>
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {doctor.honor && (
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      荣誉称号: {doctor.honor}
                    </p>
                  )}
                  {doctor.phone && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      联系电话: {doctor.phone}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <EditItemModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) {
            setSelectedDoctor(null);
          }
        }}
        entityType="doctor"
        entityId={selectedDoctor?.id || null}
        title={selectedDoctor ? "编辑医生信息" : "添加医生"}
        description={
          selectedDoctor ? "修改医生的详细信息" : "添加新的医生到系统"
        }
        fields={fields}
        initialData={selectedDoctor || undefined}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
