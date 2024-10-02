import Image from "next/image";

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
  return (
    <div className="h-[140px] bg-zinc-50/90 shadow-md mt-4 p-2 rounded-xl">
      <div className="flex justify-between items-end">
        <div className="space-x-4">
          <span className="text-4xl">{name}</span>
          <span className="text-zinc-600 text-xl">{doctor_name}</span>
        </div>
        <div className="space-x-6">
          <span className="font-mono text-xl">{date}</span>
          <span className="text-zinc-700">{room}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="">
          <Image
            src={`/images/${name}.png`}
            width={160}
            height={160}
            alt="heart"
            className="relative -top-10 left-0"
          />
        </div>
        <div className="flex justify-between space-x-2 items-center relative -top-10">
          <span className="h-2 w-2 rounded-full bg-green-400"></span>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckInfoCard;
