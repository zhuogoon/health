"use client";

interface AppointTimeCardProps {
  val: number;
  status: string;
  onSelect: (val: number | null) => void;
  isSelected: boolean;
}

const AppointTimeCard: React.FC<AppointTimeCardProps> = ({
  val,
  status,
  onSelect,
  isSelected,
}) => {
  const handleClick = () => {
    if (status !== "1") {
      onSelect(isSelected ? null : val);
    }
  };
  const timeSlot = convertToTimeSlot(val);
  return (
    <div
      className={`h-[40px] rounded-lg shadow flex items-center justify-between p-2 border ${
        status === "1"
          ? "cursor-not-allowed"
          : "hover:bg-gray-100 cursor-pointer"
      } ${isSelected ? "bg-blue-100" : ""}`}
      onClick={handleClick}
    >
      <div className="text-sm font-mono">{timeSlot}</div>
      <div
        className={`h-2 w-2 rounded-full ${
          status === "1" ? "bg-red-500" : "bg-green-500"
        }`}
      ></div>
    </div>
  );
};

const convertToTimeSlot = (val: number): string => {
  const timeSlots = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ];

  return timeSlots[val - 1] || "Invalid time slot";
};

export default AppointTimeCard;
