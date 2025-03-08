import Image from "next/image";
import { AppointSheet } from "../form/AppointSheet";

interface DoctorAppointmentCardProps {
  id: string;
  name: string;
  type: string;
  title: string;
}

const DoctorAppointmentCard = ({
  id,
  name,
  type,
  title,
}: DoctorAppointmentCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Image
              src="/images/dr-remirez.png"
              width={48}
              height={48}
              alt={`${name}医生头像`}
              className="rounded-full object-cover border border-gray-100 dark:border-gray-700"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {name}
            </span>
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {type}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            {title}
          </span>
          <AppointSheet id={id} name={name} />
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;
