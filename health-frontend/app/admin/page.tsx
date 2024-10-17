"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { get } from "@/net";

interface Item {
  id: number;
  name: string;
  room: string;
}

const Admin = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const res = await get("/api/admin/info");
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("无法获取数据");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDataUpdate = async () => {
    await getData();
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div className="flex w-full h-full">
      <DataTable
        columns={columns}
        data={data}
        location="/"
        onDataUpdate={handleDataUpdate}
        onDelete={handleDataUpdate} // 传递 handleDataUpdate 作为 onDelete 回调
      />
    </div>
  );
};

export default Admin;
