import Link from "next/link";
import Image from "next/image";
import StarCard from "@/components/ui/StarCard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <div className="flex justify-center">
        <header className="admin-header flex w-[900px] justify-between items-center bg-gray-300 border-b-2 rounded-3xl p-2">
          <Link href="/home" className="cursor-pointer">
            <Image
              src="/images/icon.png" // 确保图像路径正确
              width={100}
              height={100}
              alt="GoDoc logo"
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>
      </div>

      <section className="w-full space-y-4">
        <p className="text-6xl text-teal-400">欢迎你，管理员！</p>
        <p>从管理检查项目、患者、医生等信息，开始新的一天。</p>
      </section>
      <div className="flex   w-full space-x-4 mt-10">
        <div className="flex flex-1 py-5 rounded-3xl bg-yellow-200 items-center justify-center">
          <a href="/admin">
            <StarCard
              type="appointments"
              count={5}
              icon="/images/appiontment.png"
              label="检查项目管理"
            />
          </a>
        </div>
        <div className="flex flex-1 py-5 rounded-3xl bg-yellow-400 items-center justify-center">
          <a href="/admin/patient">
            <StarCard
              type="patients"
              count={2}
              icon="/images/patient.png"
              label="患者管理"
            />
          </a>
        </div>
        <div className="flex flex-1 py-5 rounded-3xl bg-yellow-600 items-center justify-center">
          <a href="/admin/doctor">
            <StarCard
              type="doctors"
              count={20}
              icon="/images/doctor.png"
              label="医生管理"
            />
          </a>
        </div>
      </div>

      {children}
    </div>
  );
}
