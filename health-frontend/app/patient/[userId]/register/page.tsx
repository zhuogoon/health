import { CustomForm } from "@/components/form/CustomForm";
import { RegisterForm } from "@/components/form/RegisterForm";
import { ModeToggle } from "@/components/ui/modeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen">
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
              让我们更加了解你
            </div>
            <div className="text-zinc-600 ml-4 mt-3">
              请在下方完善您的个人信息，以便我们为您提供更好的服务
            </div>
            <RegisterForm />
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
