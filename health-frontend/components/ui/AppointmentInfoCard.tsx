interface AppointmentInfoCardProps {
  name: string;
  age: number;
  date: string;
  onClick?: () => void; // Add the onClick property
}

const AppointmentInfoCard = ({
  name,
  age,
  date,
  onClick,
}: AppointmentInfoCardProps) => {
  return (
    <div
      className="text-zinc-700 bg-zinc-50 p-2 rounded-lg flex justify-between items-end shadow cursor-pointer"
      onClick={onClick}
    >
      <div>
        <span className="text-zinc-700">{name}</span>
        <span className="ml-3 text-sm text-zinc-600">{age}周岁</span>
      </div>
      <span className="text-sm text-zinc-600 font-mono">{date}</span>
    </div>
  );
};

export default AppointmentInfoCard;
