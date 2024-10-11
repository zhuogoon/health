"use client";

import { columns } from "@/components/table/patientColumns";
import { DataTable } from "@/components/table/DataTable";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const getData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjkwNDg0OTcsImlhdCI6MTcyODQ0MzY5NywidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJwYXRpZW50In0.OtH757YSFTa405SMj-cO5mLyK4D7Csayw-x0nYdu-Ng";

        const response = await fetch(
          "http://127.0.0.1:8080/api/admin/patient",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // 在请求头中添加token
              "Content-Type": "application/json", // 可选：根据需要添加其他头部
            },
          }
        ); // 替换为你的 API URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: Data = await response.json();
        setData(result.data);
        console.log("Data fetched:", result);
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
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Admin;
