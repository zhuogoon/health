"use client";

import { get } from "@/net";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const Router = useRouter;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("/api/patient/info");
        setData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-full justify-center items-center">
      <div className="flex-1 h-full bg-red-300"></div>
      <div className="flex-1 h-full bg-red-400"></div>
      <div className="flex-1 h-full bg-red-500"></div>
    </div>
  );
};
export default Home;
