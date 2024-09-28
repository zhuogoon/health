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
    <div>
      <h1>Patient Info</h1>
      <ul>
        {data &&
          Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {(value as any).toString()}
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Home;
