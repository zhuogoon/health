import Link from "next/link";
import React from "react";
import Image from "next/image";

const Success = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%] justify-center items-center">
      <div className="flex justify-center flex-col items-center">
        <Link
          className="flex items-center text-3xl text-zinc-700 font-semibold gap-4 mr-10"
          href="/"
        >
          <Image
            src="/images/icon.png"
            height={1000}
            width={1000}
            alt="logo"
            className="h-12 w-fit"
          />
          健康医疗系统
        </Link>

        <section className="flex flex-col items-center mt-20">
          <Image
            src="/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
            className="mb-6"
          />
          <h2 className="text-3xl text-center max-w-[600px] font-semibold text-zinc-600">
            你的<span className="text-teal-500">预约请求</span>成功提交！✅
          </h2>
          <p className="text-zinc-500 mt-4">
            我们将会尽快给您发送预约确认信息。
          </p>

          <div className="bg-zinc-100 rounded-2xl shadow-sm w-[150%] h-14 mt-4 flex items-center justify-center gap-6">
            <div className="text-zinc-600 font-mono">您的预约信息：</div>
            <div className=" flex justify-center items-center gap-2">
              <Image
                src="/images/dr-remirez.png"
                height={100}
                width={100}
                alt="doctor"
                className="h-8 w-fit border border-zinc-700 rounded-full"
              />
              <div className="text-zinc-700 text-sm font-semibold">黄志远</div>
            </div>
            <div className="flex gap-2">
              <Image
                src="/icons/日历.png"
                height={24}
                width={24}
                alt="calender"
                className="text-black"
              />
              <div className="text-zinc-600 font-mono font-semibold">
                2024/03/23
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Success;
