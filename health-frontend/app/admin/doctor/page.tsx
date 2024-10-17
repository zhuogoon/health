"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/doctorColumns";
import { get } from "@/net";
import { getDate } from "date-fns";
// import { get } from "@/net";

interface Item {
  id: number;
  name: string;
  honor: string;
  job_title: string;
  job_type: string;
  phone: string;
}
interface Data {
  data: Item[];
}

const Admin = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDataUpdate = async () => {
    await getData();
  };
  const getData = async () => {
    try {
      const res = await get("/api/admin/doctor");
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

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div className="flex w-full h-full">
      <DataTable
        columns={columns}
        data={data}
        location="/doctor"
        onDataUpdate={handleDataUpdate}
        onDelete={handleDataUpdate}
      />
    </div>
  );
};

export default Admin;
