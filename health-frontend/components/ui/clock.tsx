import React, { useState, useEffect } from "react";

const Clock: React.FC = () => {
  // 状态管理当前时间
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    // 每秒更新一次时间
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 清理定时器
    return () => clearInterval(timerId);
  }, []);

  // 格式化时间为 HH:MM:SS
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>当前时间</h1>
      <h2>{formatTime(time)}</h2>
    </div>
  );
};

export default Clock;
