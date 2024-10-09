import { columns, Patient } from "@/components/table/patientColumns";
import { DataTable } from "@/components/table/DataTable";
import React from "react";

async function getData(): Promise<Patient[]> {
  // Fetch data from your API here.
  return [
    {
      id: 2,
      name: "张亚祺",
      height: 178,
      weight: 80,
      sex: "男",
      phone: "17892214123",
      address: "啦啦啦市",
    },
    {
      id: 1,
      name: "黄志远",
      height: 178,
      weight: 80,
      sex: "男",
      phone: "17892214123",
      address: "啦啦啦市",
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
