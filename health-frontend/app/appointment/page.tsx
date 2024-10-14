import AppointmentCard from "@/components/ui/AppointmentCard";
import { Button } from "@/components/ui/button";
import DoctorAppointmentCard from "@/components/ui/DoctorAppointmentCard";
import DoctorCombobox from "@/components/ui/DoctorTypeCombobox";
import { Input } from "@/components/ui/input";

const AppointmentPage = () => {
  return (
    <div className="h-full flex items-center">
      <div className="h-[96%] w-full flex">
        <div className="w-1/4 bg-zinc-50 shadow-lg rounded-lg">
          <div className="h-20 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-left w-[90%] mb-12 mt-4 text-teal-400">
              预约挂号
            </h1>
            <Input
              placeholder="搜索医生姓名..."
              className="bg-zinc-50 h-16 w-[90%]"
            />
            <div className="h-20 mt-3 m-10 flex w-[90%] justify-between">
              <DoctorCombobox />
              <Button className="bg-teal-400 w-20 hover:bg-teal-500">
                搜索
              </Button>
            </div>
          </div>
        </div>
        <div className="w-2/4 my-4 overflow-y-auto custom-scrollbar">
          <div className="flex items-center flex-col gap-3 mt-3">
            <DoctorAppointmentCard
              id="1"
              name="李卓"
              type="心内科"
              title="主治医师"
            />
            <DoctorAppointmentCard
              id="2"
              name="黄志远"
              type="心内科"
              title="主治医师"
            />
            <DoctorAppointmentCard
              id="3"
              name="陈将"
              type="心内科"
              title="主治医师"
            />
            <DoctorAppointmentCard
              id="4"
              name="黄非"
              type="心内科"
              title="主治医师"
            />
          </div>
        </div>
        <div className="w-1/4  bg-gradient-to-r from-teal-500 to-green-300 flex flex-col rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-left w-[90%] mb-2 mt-4 text-zinc-50 ml-4">
            我的预约
            <div className="mb-4 text-sm text-zinc-100 font-normal mt-2">
              以下是我已有的预约
            </div>
          </h1>

          <div className="flex-grow w-full bg-zinc-100 rounded-lg overflow-y-auto custom-scrollbar p-4 flex flex-col gap-2">
            <AppointmentCard
              id="1"
              doctorName="李卓"
              doctorImg={null}
              date="2024-07-23"
              status={false}
              type="心内科"
              title="主治医师"
            />
            <AppointmentCard
              id="2"
              doctorName="黄志远"
              doctorImg={null}
              date="2024-07-23"
              status={true}
              type="内科"
              title="主治医师"
            />
            <AppointmentCard
              id="3"
              doctorName="黄非"
              doctorImg={null}
              date="2024-07-23"
              status={false}
              type="外科"
              title="主治医师"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
