"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
  id: number;
  name: string;
  room: string;
};

const handleEdit = (item: Item) => {
  // 处理编辑逻辑，例如打开编辑弹窗
  console.log("Editing item:", item);
};

const handleDelete = (id: number) => {
  // 处理删除逻辑，例如发送删除请求
  console.log("Deleting item with ID:", id);
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "id",
    header: () => (
      <div className="flex justify-center items-center text-left w-full text-xl font-bold">
        ID
      </div>
    ),
    cell: ({ cell }) => (
      <div className="flex justify-center items-center  w-full text-xl ">
        {cell.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex justify-center items-center w-full ">
          <Button
            className="text-xl font-bold"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            检查项目
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ cell }) => (
      <div className="flex justify-center items-center text-xl w-full ">
        {cell.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    accessorKey: "room",
    header: () => (
      <div className="flex justify-center items-center text-left w-full text-xl font-bold ">
        科室
      </div>
    ),
    cell: ({ cell }) => (
      <div className="flex justify-center items-center text-xl w-full ">
        {cell.getValue() as React.ReactNode}
      </div>
    ),
  },
  {
    id: "actions", // 自定义列，id不能重复
    header: () => (
      <div className="flex justify-center items-center text-left w-full text-xl font-bold ">
        选项
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center items-center space-x-3 w-full text-xl ">
        <button
          className="bg-red-500 text-white rounded-xl h-10 w-16"
          onClick={() => handleDelete(row.original.id)}
        >
          删除
        </button>
      </div>
    ),
  },
];
