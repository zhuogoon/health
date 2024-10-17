"use client";

import { columns } from "@/components/table/patientColumns";
import { DataTable } from "@/components/table/DataTable";

import React, { useEffect, useState } from "react";
import { get } from "@/net";
interface Item {
  id: number;
  name: string;
  height: number;
  weight: number;
  sex: string; // 修改性别属性为布尔值
  phone: string;
  address: string;
}
interface Data {
  data: Item[];
}

const Admin = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getData = async () => {
    try {
      const res = await get("/api/admin/patient");
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("无法获取数据");
    } finally {
      setLoading(false);
    }
  };

  const handleDataUpdate = async () => {};
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div className="flex w-full h-full">
      <DataTable
        columns={columns}
        data={data}
        location="/patient"
        onDataUpdate={getData}
        onDelete={handleDataUpdate}
      />
    </div>
  );
};

export default Admin;
