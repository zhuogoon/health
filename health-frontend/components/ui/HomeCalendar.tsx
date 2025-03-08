import React from "react";
import { Calendar } from "./calendar";

const HomeCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="border-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
      classNames={{
        day_selected: "bg-teal-500 text-white hover:bg-teal-600",
        day_today:
          "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
      }}
    />
  );
};

export default HomeCalendar;
