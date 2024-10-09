"use client";
import Image from "next/image";

const DocgtorHomePage = () => {
  return (
    <div className="h-full flex gap-3">
      <div className="w-1/3 bg-zinc-200/50 h-full mx-4 rounded-xl overflow-y-auto custom-scrollbar p-4">
        <div className="text-3xl font-semibold text-center text-teal-400">
          患者信息
        </div>
        <div className="flex justify-between items-end mt-10 p-2">
          <span className="text-xl font-semibold">黄志远</span>
          <span className="space-x-3">
            <span className="text-lg font-semibold text-blue-500">♂</span>
            <span>22岁</span>
          </span>
        </div>
        <div className="w-full h-[160px] mt-2 p-2 rounded-xl shadow-md bg-zinc-100/90 flex flex-col gap-4">
          <div className="text-zinc-600 text-lg font-semibold">基础信息</div>
          <div className="flex h-[40px] gap-3">
            <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
              <Image
                src="/icons/phone.svg"
                width={24}
                height={24}
                alt="phone"
              />
              <span className="text-zinc-700 text-lg font-mono">
                17784774733
              </span>
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
              <Image
                src="/icons/address.svg"
                width={24}
                height={24}
                alt="address"
              />
              <span className="text-zinc-700 text-lg">浙江省温州市</span>
            </div>
          </div>
          <div className="flex h-[40px] gap-3">
            <div className="flex-1 bg-zinc-100/90 rounded-lg"></div>
          </div>
        </div>

        <div className="w-full h-[240px] mt-5 p-2 rounded-xl shadow-md bg-zinc-100/90 flex flex-col gap-4">
          <div className="text-zinc-600 text-lg font-semibold">医疗信息</div>
          <div className="flex h-[40px] gap-3">
            <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
              <Image src="/icons/身高.svg" width={24} height={24} alt="身高" />
              <span className="text-zinc-700 text-lg font-mono">175cm</span>
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg flex justify-center items-center gap-2">
              <Image src="/icons/体重.svg" width={24} height={24} alt="体重" />
              <span className="text-zinc-700 text-lg font-mono">55kg</span>
            </div>
          </div>
          <div className="flex h-[40px] gap-3 flex-grow">
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 gap-2  overflow-y-auto custom-scrollbar">
              过敏源 😣:
              <div className="text-zinc-700 p-1 bg-cover">
                很伟大很快就我大家玩的大大伟大大王大师大卫
                很伟大很快就我大家玩的大大伟大大王大师大卫
                很伟大很快就我大家玩的大大伟大大王大师大卫
                很伟大很快就我大家玩的大大伟大大王大师大卫
                很伟大很快就我大家玩的大大伟大大王大师大卫
                很伟大很快就我大家玩的大大伟大大王大师大卫
              </div>
            </div>
            <div className="flex-1 bg-zinc-200 rounded-lg p-2 gap-2  overflow-y-auto custom-scrollbar">
              过往病史 📄:
              <div className="text-zinc-700">无</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-blue-200 h-full">
        <div className="h-1/2 w-full bg-slate-200">
          <div className="h-full w-2/3 bg-green-200"></div>
          <div className="h-full w-1/3"></div>
        </div>
        <div className="h-1/2 w-full bg-teal-200"></div>
      </div>
    </div>
  );
};

export default DocgtorHomePage;
