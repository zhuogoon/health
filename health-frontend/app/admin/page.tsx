"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { get } from "@/net";
// import { get } from "@/net";

interface Item {
  id: number;
  name: string;
  room: string;
}
interface Data {
  data: Item[];
}

const Admin = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    getData();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div className="flex w-full h-full">
      <DataTable columns={columns} data={data} location="/" />
    </div>
  );
};

export default Admin;
