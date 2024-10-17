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
    <div className="w-[90%] bg-zinc-100 rounded-xl shadow p-2 h-[70px]">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <Image
              src="/images/dr-remirez.png"
              width={100}
              height={100}
              alt="doctor"
              className="w-9 h-9 rounded-2xl"
            />
          </div>
          <div>{name}</div>
        </div>
        <div className="relative">
          <div className="text-right text-zinc-600 flex gap-2 items-end">
            <div className="">{type}</div>
            <div className="text-sm">{title}</div>
          </div>
          <div className="absolute right-0">
            <AppointSheet id={id} name={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;
