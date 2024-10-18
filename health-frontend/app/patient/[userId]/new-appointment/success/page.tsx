"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Success = () => {
  const Router = useRouter();

  const back = () => {
    Router.push("/appointment");
  };

  return (
    <div className="flex h-screen max-h-screen px-[5%] justify-center items-center relative">
      <div
        className="absolute left-2 top-3 text-teal-400 hover:text-teal-600 cursor-pointer"
        onClick={back}
      >
        👈 返回预约界面
      </div>
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
        </section>
      </div>
    </div>
  );
};

export default Success;
