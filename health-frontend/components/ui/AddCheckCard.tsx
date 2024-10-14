import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCombobox } from "./CheckCombobox";

const AddCheckCard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-400 text-zinc-50" variant="outline">
          新增检查项
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增检查项</DialogTitle>
          <DialogDescription>为患者创建一个新的检查项目.</DialogDescription>
        </DialogHeader>
        <CheckCombobox />
        <DialogFooter>
          <Button type="submit">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCheckCard;
