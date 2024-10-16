"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: true,
    label: "已完成",
  },
  {
    value: false,
    label: "未完成",
  },
];

interface TypeComboboxProps {
  updateStatus: (newStatus: number) => void;
}

const TypeCombobox: React.FC<TypeComboboxProps> = ({ updateStatus }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<boolean | null>(null);

  const handleSelect = (frameworkValue: boolean) => {
    const newValue = frameworkValue === value ? null : frameworkValue;
    setValue(newValue);
    setOpen(false);
    updateStatus(newValue !== null ? Number(newValue) : 1);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-zinc-500"
        >
          {value !== null
            ? frameworks.find((framework) => framework.value === value)?.label
            : "选择状态筛选..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="查找状态..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.label}
                  value={framework.value.toString()}
                  onSelect={() => handleSelect(framework.value)}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TypeCombobox;
