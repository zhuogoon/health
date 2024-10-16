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
    value: "心内科",
    label: "心内科",
  },
  {
    value: "介入科",
    label: "介入科",
  },
  {
    value: "肛肠科",
    label: "肛肠科",
  },
  {
    value: "泌尿科",
    label: "泌尿科",
  },
  {
    value: "内科",
    label: "内科",
  },
];

interface DoctorComboboxProps {
  query: {
    doctor_name: string;

    doctor_type: string;
  };

  setQuery: React.Dispatch<
    React.SetStateAction<{
      doctor_name: string;

      doctor_type: string;
    }>
  >;
}

const DoctorCombobox: React.FC<DoctorComboboxProps> = ({ query, setQuery }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleTypeChange = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setQuery((prevQuery: any) => ({
      ...prevQuery,
      doctor_type: newValue,
    }));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "选择科室筛选..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜索科室..." className="h-9" />
          <CommandList>
            <CommandEmpty>未找到科室.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={handleTypeChange}
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

export default DoctorCombobox;
