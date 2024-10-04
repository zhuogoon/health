import Image from "next/image";
import Link from "next/link";

const DoctorInfoPage = () => {
  return (
    <div className="flex h-full w-screen space-x-2">
      <div className="flex items-center justify-center relative h-1/1 w-1/3 mt-5 ml-5 mb-5">
        <Image
          className="rounded-2xl -rotate-2"
          src="/images/zhongnanshan.jpg"
          alt="doctor"
          layout="fill" // 使用 layout="fill" 使图片填充父容器
          objectFit="cover" // 保持图片比例填充容器
        />
      </div>
      <div className="h-5/5 w-2/3 bg-zinc-200/60 m-5 rounded-xl">
        <div className="flex h-1/4 items-center relative">
          <div className="">
            <h1 className="text-center text-5xl font-bold ml-4">钟南山</h1>
          </div>
          <Link
            href={"/home"}
            className="text-teal-400 absolute right-2 top-2 text-lg"
          >
            立即预约 →
          </Link>
          <div className="absolute right-5 bottom-2 text-zinc-600 text-xl space-y-2 text-right">
            <div className="text-2xl">主任</div>
            <div>呼吸系统科</div>
          </div>
        </div>
        <div className="h-3/4 mx-5 overflow-y-auto custom-scrollbar pt-4 border-t border-t-zinc-400">
          <div className="text-2xl font-semibold">个人信息📄</div>
          <div className="mt-2 p-2">
            钟南山，1936年10月20日出生于江苏南京，祖籍福建厦门，中共党员，呼吸病学学家
            [1]，广州医科大学附属第一医院国家呼吸系统疾病临床医学研究中心主任，广州医科大学教授，中国工程院院士
            [2]，中国医学科学院学部委员
            [3]，中国抗击非典型肺炎、新冠肺炎疫情的领军人物，第十一、十二届全国人大代表，第八、九、十届全国政协委员
            [40] [72]。
            1953年，钟南山就读于华南师范学院附属中学，两年后考入北京医学院（现北京大学医学部）医疗系
            [72]，毕业后留校任教，曾下乡当农民、当工人。1971年9月，到广州市第四人民医院工作，担任内科住院医师
            [72-73]。1974年，钟南山进入慢支炎防治小组，从此走上钻研“呼吸”的道路，之后从事呼吸内科的医疗、教学、科研工作。重点开展哮喘，慢阻肺疾病，呼吸衰竭和呼吸系统常见疾病的规范化诊疗、疑难病、少见病和呼吸危重症监护与救治等方面的研究
            [72]
            [74]。1979年，赴英国爱丁堡大学医学院及伦敦大学呼吸系进修，1981年毕业并获得博士学位
            [1]。1991年，钟南山首次提出“隐匿型哮喘”观点。2003年，“非典”爆发，以钟南山为代表的医护工作者经长期努力，抗击了非典
            [73]。2006年，在钟南山院士的倡导下，中国正式成立了中国慢阻肺联盟。
            2009年，钟南山被评为“100位新中国成立以来感动中国人物”
            [75]。2018年，被党中央、国务院授予“改革先锋”称号，先后荣获中国首批国家级有突出贡献专家、全国五一劳动奖章、最美奋斗者、“白求恩奖章”等奖项和荣誉称号
            [76-77]。2020年，被授予“共和国勋章” [75]
          </div>

          <div className="text-2xl font-semibold mt-6">个人荣誉🏆</div>
          <div className=" mt-2 p-2">
            <div>
              截至2010年9月，钟南山取得中国国家、省市各级科研成果20余项，2005年获中国国家科技进步二等奖，2004年获广东省科技进步特等奖，省科技进步一等奖，并获得了广东省和广州市科技进步个人特等奖。2003年获何梁何利科技奖。
              [48]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInfoPage;
