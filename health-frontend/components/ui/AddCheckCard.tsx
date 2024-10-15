import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddCheckCard() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-teal-400 text-zinc-100" variant="outline">
          添加检查项
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>添加检查项</SheetTitle>
          <SheetDescription>在这里为患者添加一个检查项目.</SheetDescription>
        </SheetHeader>
        <Card className="w-[350px] mt-3">
          <CardHeader>
            <CardTitle>创建检查</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">检查</Label>
                  <Select>
                    <SelectTrigger id="check">
                      <SelectValue placeholder="请在这里选择一个检查" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">取消</Button>
            <Button>创建</Button>
          </CardFooter>
        </Card>
      </SheetContent>
    </Sheet>
  );
}
