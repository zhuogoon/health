"use client";

import Image from "next/image";
import { format, parseISO } from "date-fns";

interface AppointmentCardProps {
  id: string;
  doctorName: string;
  doctorImg: string | null;
  date: string;
  status: boolean;
  type: string;
  title: string;
  deleteAppointment: (id: string) => void;
}

const AppointmentCard = ({
  id,
  doctorName,
  doctorImg,
  date,
  status,
  type,
  title,
  deleteAppointment,
}: AppointmentCardProps) => {
  const formattedDate = date ? format(parseISO(date), "yyyy-MM-dd") : "未设置";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <div className="relative">
            {doctorImg ? (
              <Image
                src={
                  doctorImg
                    ? `http://localhost:8080/api/user/images/${doctorImg}`
                    : `/images/avatar.png`
                }
                width={48}
                height={48}
                alt={`${doctorName}医生头像`}
                className="rounded-full object-cover border border-gray-100 dark:border-gray-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700"></div>
            )}
            <div
              className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
                status ? "bg-green-500" : "bg-amber-500"
              }`}
            ></div>
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {doctorName}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {type}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {title}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/60 px-2 py-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span className="font-mono">{formattedDate}</span>
          </div>

          <div className="mt-1.5 text-xs">
            <span
              className={`inline-flex px-2 py-0.5 rounded-full ${
                status
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
              }`}
            >
              {status ? "已完成" : "未完成"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-end">
        <button
          onClick={() => deleteAppointment(id)}
          className="text-sm font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
          取消预约
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
