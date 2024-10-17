import React from "react";
import clsx from "clsx";
import Image from "next/image";
interface StatCardProps {
  count: number;
  label: string;
  icon: string;
  type: "appointments" | "patients" | "doctors";
}

const StarCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appiontments": type === "appointments",
        "bg-patients": type === "patients",
        "bg-doctors": type === "doctors",
      })}
    >
      <div className="flex items-center ml-3">
        <Image src={icon} height={32} width={32} alt={label} className="mr-2" />
        <h2 className="text-32-bold text-blue-500 font-bold">{count}</h2>
      </div>
      <p className="text-lg mt-3 text-zinc-700 font-semibold">{label}</p>
    </div>
  );
};

export default StarCard;
