import { columns, Doctor } from "@/components/table/doctorColumns";
import { DataTable } from "@/components/table/DataTable";
import React from "react";

async function getData(): Promise<Doctor[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "黄志远",
      job_type: "101",
      job_title: "主任医师",
    },
    {
      id: 2,
      name: "张亚祺",
      job_type: "102",
      job_title: "副主任医师",
    },
  ];
}

export default async function page() {
  const data = await getData();
  return (
    <div className="flex w-full h-full">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
