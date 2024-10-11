import React from "react";
import { Calendar } from "./calendar";

const HomeCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg mt-4 bg-zinc-100 shadow dark:bg-zinc-800/40"
    />
  );
};

export default HomeCalendar;
