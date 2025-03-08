import { RegisterForm } from "@/components/form/RegisterForm";
import { ModeToggle } from "@/components/ui/modeToggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* 表单区域 */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-950 transition-colors duration-200">
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/images/icon.png"
            width={48}
            height={48}
            alt="icon"
            className="rounded-xl shadow-sm"
            unoptimized
          />
          <h1 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-50">
            智慧医疗系统
          </h1>
        </div>

        <div className="flex justify-center items-start">
          <div className="w-full max-w-xl">
            <h2 className="text-3xl font-medium tracking-tight mt-12 text-gray-900 dark:text-gray-50">
              让我们更加了解你
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
              请在下方完善您的个人信息，以便我们为您提供更好的服务
            </p>

            <div className="mt-6">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>

      {/* 背景图片区域 */}
      <div
        className="flex-1 bg-cover bg-center flex justify-end p-6 overflow-hidden"
        style={{ backgroundImage: `url('/images/bg-1.png')` }}
      >
        <div className="backdrop-blur-sm bg-white/10 dark:bg-black/10 p-2 rounded-full">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
