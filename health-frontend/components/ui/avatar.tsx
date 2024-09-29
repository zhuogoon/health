import Image from "next/image";
import { usePatientContext } from "@/context/PatientContext";

export const Avatar: React.FC = () => {
  const { data } = usePatientContext();
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-3 justify-end items-center">
      <div className="text-right space-y-0.5">
        <div className="flex justify-center items-center gap-2">
          <div className="text-zinc-700 font-mono">{data.name}</div>
          <div
            className={`"text-sm ${
              data.role === "admin" ? "bg-zinc-800" : "bg-teal-500"
            } text-white px-1.5 rounded-full font-mono"`}
          >
            {data.role ? data.role : "user"}
          </div>
        </div>
        <div className="text-zinc-500 text-sm">{data.phone}</div>
      </div>
      <Image
        src="http://localhost:8080/api/user/avatar"
        alt="avatar"
        height={200}
        width={200}
        className="w-11 h-11 rounded-full border border-zinc-500 shadow-md"
      />
    </div>
  );
};
