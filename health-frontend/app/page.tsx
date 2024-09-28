import { CustomForm } from "@/components/form/CustomForm";
import { ModeToggle } from "@/components/ui/modeToggle";
import PassKeyModal from "@/components/ui/PassKeyModal";
import Image from "next/image";

interface SearchParamsProps {
  searchParams: {
    admin: string;
  };
}

export default function Home({ searchParams }: SearchParamsProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen">
      {isAdmin && <PassKeyModal />}

      <div className="flex-1 p-3">
        <div className="icon flex items-center gap-2 ">
          <Image
            src="/images/icon.png"
            width={100}
            height={100}
            alt="icon"
            className="w-10 h-10 rounded-2xl"
          />
          <div className="text-2xl font-semibold font-sans">智慧医疗系统</div>
        </div>
        <div className=" flex justify-center items-center">
          <div className="w-[90%] h-[94%] ">
            <div className="text-4xl font-semibold mt-16 ml-4">
              Hi,欢迎使用智慧医疗系统 👋
            </div>
            <div className="text-zinc-600 ml-4 mt-3 dark:text-zinc-400">
              开始你的智能医疗体验
            </div>
            <CustomForm />
          </div>
        </div>
      </div>
      <div
        className="flex-1 bg-cover flex justify-end p-3 "
        style={{ backgroundImage: `url('/images/bg-2.png')` }}
      >
        <ModeToggle />
      </div>
    </div>
  );
}
