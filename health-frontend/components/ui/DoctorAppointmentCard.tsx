import Image from "next/image";

const DoctorAppointmentCard = () => {
  return (
    <div className="w-[90%] bg-zinc-100 rounded-xl shadow p-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <Image
              src="/images/avatar.png"
              width={100}
              height={100}
              alt="doctor"
              className="w-9 h-9 rounded-2xl"
            />
          </div>
          <div>李卓</div>
        </div>
        <div className="text-right text-zinc-600">
          <div className="text-lg">肛肠科</div>
          <div className="text-sm">主任医师</div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;
