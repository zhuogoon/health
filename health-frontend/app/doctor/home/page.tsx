"use client";

import Clock from "@/components/ui/clock";
const stylewxhq = {
  backgroundImage: "url('/images/wxhq.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "-200px center",
};

const DocgtorHomePage = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 bg-yellow-500"></div>
      <div className="flex flex-1 bg-green-600">
        <div className="flex-1 bg-blue-400"></div>
        <div className="flex flex-col flex-1">
          <div
            style={stylewxhq}
            className="flex bg-cover  flex-1 items-center justify-center"
          >
            <div className="flex flex-col items-center w-40 h-40 justify-center bg-black border-2 border-white rounded-full">
              <div className="text-3xl text-white mb-2">
                <Clock />
              </div>
            </div>
          </div>
          <div
            style={stylewxhq}
            className="flex bg-cover h-full w-full flex-1  items-center justify-center text-3xl text-yellow-300"
          >
            全心全意为人民服务！
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocgtorHomePage;
