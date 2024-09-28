import Image from "next/image";

const DoctorInfoPage = () => {
  return (
    <div className="flex h-full w-screen space-x-2">
      <div className="flex items-center justify-center relative h-1/1 w-1/3 mt-5 ml-5 mb-5">
        <Image
          className="rounded-2xl"
          src="/images/zhongnanshan.jpg"
          alt="doctor"
          layout="fill" // 使用 layout="fill" 使图片填充父容器
          objectFit="cover" // 保持图片比例填充容器
        />
      </div>
      <div className="h-5/5 w-2/3 bg-white mt-5 ml-5 mb-5">
        <div className="flex  bg-gray-400 h-1/4 items-center ">
          <div>
            <h1 className="text-center text-6xl font-bold">钟南山</h1>
          </div>
        </div>
        <div className="flex h-3/4 bg-red-400">
          <div className="flex-1 bg-purple-500">
            <div>
              钟南山，1936年10月20日出生于江苏南京，祖籍福建厦门，中共党员，呼吸病学学家
              ，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任，广州医科大学教授，中国工程院院士
              中国医学科学院学部委员
              中国抗击非典型肺炎、新冠肺炎疫情的领军人物，第十一、十二届全国人大代表，第八、九、十届全国政协委员
            </div>
          </div>
          <div className="flex flex-col flex-1 bg-pink-500">
            <div className="h-1/3 w-full bg-yellow-200"></div>
            <div className="h-2/3 w-full bg-green-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoPage;
