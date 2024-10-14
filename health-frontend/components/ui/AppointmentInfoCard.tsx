const AppointmentInfoCard = () => {
  return (
    <div className="text-zinc-700 bg-zinc-50 p-2 rounded-lg flex justify-between items-end shadow cursor-pointer">
      <div>
        <span className="text-zinc-700">黄志远</span>
        <span className="text-lg font-semibold ml-3 text-blue-500">♂</span>
        <span className="ml-3 text-sm text-zinc-600">22周岁</span>
      </div>
      <span className="text-sm text-zinc-600 font-mono">
        2024-04-11 12:00-13:00
      </span>
    </div>
  );
};

export default AppointmentInfoCard;
