import * as RadixSelect from "@radix-ui/react-select";
import { ArrowDropDown, CheckIcon } from "../icon";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: Option[];
  placeholder: string;
  label: string;
  defaultValue: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const SingleSelect = ({
  name,
  options = [],
  placeholder,
  label,
  defaultValue,
  value,
  onChange,
  className = "",
}: Props) => {
  const valueLabelMap = useMemo(() => {
    const map = new Map();

    options.forEach((o) => {
      map.set(o.value, o.label);
    });

    return map;
  }, [options]);

  return (
    <RadixSelect.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
      name={name}
    >
      <RadixSelect.Trigger
        className={twMerge(
          "w-full group flex items-center justify-between gap-x-2 px-3 py-2.5 border border-neutral-400 rounded-lg outline-none hover:border-blue-600",
          className
        )}
      >
        {value ? (
          <p className="text-base text-neutral-700">
            {label}:{" "}
            <span className="font-medium">{valueLabelMap.get(value)}</span>
          </p>
        ) : (
          <p
            className="text-base
 text-neutral-400"
          >
            {placeholder}
          </p>
        )}
        <RadixSelect.Icon>
          <div className="duration-150 group-data-[state=open]:rotate-180 rotate-0">
            <ArrowDropDown color="group-data-[state=open]:text-neutral-700 text-neutral-400" />
          </div>
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Content
        sideOffset={4}
        className="py-2.5 bg-neutral-50 shadow-lg rounded-lg min-w-[22.5rem] z-40 overflow-y-auto max-h-[22.5rem]"
        position="popper"
      >
        {options.map(({ label, value }, index) => {
          return (
            <RadixSelect.Item
              key={`select-item-${value}-${index}`}
              value={value}
              className="cursor-pointer flex justify-between items-center min-h-[2.25rem] px-3 data-[state=checked]:bg-blue-100 hover:bg-blue-100 data-[state=checked]:text-sky-700 text-basetext-neutral-700 transition-colors outline-none"
            >
              <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
              <RadixSelect.ItemIndicator>
                <CheckIcon size="w-6 h-6" color="text-blue-700" />
              </RadixSelect.ItemIndicator>
            </RadixSelect.Item>
          );
        })}
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};
