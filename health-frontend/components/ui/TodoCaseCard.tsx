const TodoCaseCard = ({
  name,
  age,
  date,
  sex,
}: {
  name: string;
  age: number;
  sex: string;
  date: string;
}) => {
  return (
    <div className="bg-zinc-50 shadow-lg rounded-xl h-[80px] px-4 py-2 cursor-pointer">
      <div className="flex justify-between items-start w-full mt-2">
        <span className="text-lg font-semibold">{name}</span>
        <span className="space-x-2">
          <span className="text-lg text-blue-500">
            {sex === "1" ? "♂" : "♀"}
          </span>
          <span className="text-sm text-zinc-700 mt-2">{age}周岁</span>
        </span>
      </div>
      <div className="text-right text-zinc-500 text-sm font-mono">{date}</div>
    </div>
  );
};

export default TodoCaseCard;
