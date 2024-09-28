"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { get } from "@/net";

interface PatientContextProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const PatientContext = createContext<PatientContextProps | undefined>(
  undefined
);

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatientContext must be used within a PatientProvider");
  }
  return context;
};

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<any>(null);

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
    <PatientContext.Provider value={{ data, setData }}>
      {children}
    </PatientContext.Provider>
  );
};
