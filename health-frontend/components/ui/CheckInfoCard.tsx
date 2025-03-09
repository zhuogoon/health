import Image from "next/image";
import { MapPin, Calendar, User, Activity } from "lucide-react";

interface CheckInfoCardProps {
  name: string;
  date: string;
  room: string;
  status: string;
  doctor_name: string;
}

const CheckInfoCard = ({
  name,
  date,
  room,
  status,
  doctor_name,
}: CheckInfoCardProps) => {
  // 确定状态颜色
  const statusColor =
    status === "未检查"
      ? "text-red-500 dark:text-red-400"
      : "text-green-500 dark:text-green-400";

  const statusBgColor =
    status === "未检查"
      ? "bg-red-500 dark:bg-red-400"
      : "bg-green-500 dark:bg-green-400";

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow rounded-lg p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center">
          <div className="relative mr-4 hidden sm:block">
            <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <Image
                src={`/images/${name}.png`}
                width={64}
                height={64}
                alt={name}
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/images/default-check.png";
                }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              <User className="h-3.5 w-3.5 mr-1" />
              <span>{doctor_name}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{date}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{room}</span>
          </div>

          <div className={`flex items-center text-sm ${statusColor}`}>
            <span
              className={`h-2 w-2 rounded-full ${statusBgColor} mr-1.5`}
            ></span>
            <span>{status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInfoCard;
