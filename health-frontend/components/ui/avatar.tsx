import Image from "next/image";

interface AvatarProps {
  avatar: string;
  name: string;
  phone: string;
  role: string;
}

export function Avatar({ avatar, name, phone, role }: AvatarProps) {
  return (
    <div className="flex gap-3 justify-end items-center">
      <div className="text-right">
        <div className="flex justify-center items-center gap-1">
          <div className="text-zinc-700">{name}</div>
          <div className="text-sm bg-zinc-800 text-white px-1.5 rounded-full">
            {role}
          </div>
        </div>
        <div className="text-zinc-500 text-sm">{phone}</div>
      </div>
      <Image
        src={avatar}
        alt="avatar"
        height={200}
        width={200}
        className="w-11 h-11 rounded-full border border-zinc-500 shadow-md"
      />
    </div>
  );
}
