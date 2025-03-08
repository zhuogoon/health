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

interface CheckProject {
  id: string;
  name: string;
  room: string;
  img?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export default function CheckProjectsPage() {
  const [checkProjects, setCheckProjects] = useState<CheckProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CheckProject | null>(
    null
  );
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const jwt = localStorage.getItem("jwt");
      const response = await fetch("http://localhost:8080/api/user/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        throw new Error("上传失败");
      }

      const data = await response.json();
      console.log(data.data);
      // 使用完整的图片URL
      return `${data.data}`;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "上传失败",
        description: "图片上传失败，请重试",
        variant: "destructive",
      });
      throw error;
    }
  };

  const fields = [
    {
      name: "name",
      label: "项目名称",
      type: "text" as const,
      placeholder: "请输入项目名称",
      required: true,
    },
    {
      name: "room",
      label: "检查房间",
      type: "text" as const,
      placeholder: "请输入检查房间",
      required: true,
    },
    {
      name: "img",
      label: "项目图片",
      type: "file" as const,
      accept: "image/*",
      placeholder: "请选择图片",
      onFileUpload: handleImageUpload,
    },
  ];

  useEffect(() => {
    fetchCheckProjects();
  }, []);

  const fetchCheckProjects = async () => {
    try {
      setIsLoading(true);
      const data = await get("/api/admin/info");

      // 格式化数据以适应我们的组件
      const formattedData = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        room: item.room || "",
        img: "http://localhost:8080/api/user/images/" + item.img || "",
        created_at: item.createdAt,
        updated_at: item.updatedAt,
        deleted_at: item.deletedAt,
      }));

      setCheckProjects(formattedData);
    } catch (error) {
      console.error("Error fetching check projects:", error);
      toast({
        title: "加载失败",
        description: "无法加载检查项目数据，请重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    setSelectedProject(null);
    setModalOpen(true);
  };

  const handleEditProject = (project: CheckProject) => {
    setSelectedProject(project);
    setModalOpen(true);
    setDropdownOpen(null);
  };

  const handleDeleteProject = async (id: string) => {
    setDropdownOpen(null);
    if (!confirm("确定要删除该检查项目吗？此操作不可撤销。")) {
      return;
    }

    try {
      await post("/api/admin/info/delete", { id: parseInt(id) });

      toast({
        title: "删除成功",
        description: "检查项目已成功删除",
        variant: "default",
      });

      await fetchCheckProjects();
    } catch (error) {
      console.error("Error deleting check project:", error);
      toast({
        title: "删除失败",
        description: "无法删除检查项目，请重试",
        variant: "destructive",
      });
    }
  };

  const handleModalSuccess = () => {
    fetchCheckProjects();
  };

  const filteredProjects = checkProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          检查项目管理
        </h1>
        <Button
          onClick={handleAddProject}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加检查项目
        </Button>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="搜索项目名称或房间..."
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
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            未找到匹配的检查项目
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow transition-shadow"
            >
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-medium">
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    房间: {project.room}
                  </p>
                </div>
                <DropdownMenu
                  open={dropdownOpen === project.id}
                  onOpenChange={(open) =>
                    setDropdownOpen(open ? project.id : null)
                  }
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDeleteProject(project.id)}
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
                  {project.img && (
                    <div className="relative w-full h-32 rounded-md overflow-hidden">
                      <img
                        src={project.img}
                        alt={project.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    创建时间:{" "}
                    {new Date(project.created_at || "").toLocaleString()}
                  </p>
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
            setSelectedProject(null);
          }
        }}
        entityType="checkProject"
        entityId={selectedProject?.id || null}
        title={selectedProject ? "编辑检查项目" : "添加检查项目"}
        description={
          selectedProject ? "修改检查项目的详细信息" : "添加新的检查项目到系统"
        }
        fields={fields}
        initialData={selectedProject || undefined}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
