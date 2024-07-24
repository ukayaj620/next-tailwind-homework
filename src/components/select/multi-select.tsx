import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowDropDown } from "../icon";
import { twMerge } from "tailwind-merge";

export type MultiSelectOption = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: MultiSelectOption[];
  placeholder: string;
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
};

export const MultiSelect = ({
  name,
  options,
  placeholder,
  label,
  values,
  className,
  onChange,
}: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={twMerge(
          "group flex items-center justify-between gap-x-2 px-3 py-2.5 border border-neutral-400 rounded-lg outline-none hover:border-blue-600",
          className
        )}
      >
        {values.length > 0 ? (
          <p className="text-base text-neutral-700">
            {label}:{" "}
            <span className="font-medium text-blue-700">
              {values.length === options.length
                ? "Semua"
                : `${values.length} pilihan`}
            </span>
          </p>
        ) : (
          <p className="text-base text-neutral-400">{placeholder}</p>
        )}
        <div>
          <div className="duration-150 group-data-[state=open]:rotate-180 rotate-0">
            <ArrowDropDown color="group-data-[state=open]:text-neutral-700 text-neutral-400" />
          </div>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="py-2.5 bg-neutral-50 shadow-lg rounded-lg min-w-80 z-40 overflow-y-auto max-h-[22.5rem]"
        hideWhenDetached={true}
        side="bottom"
        sideOffset={4}
      >
        <label className="cursor-pointer flex gap-x-3 items-center min-h-[2.5rem] px-3 hover:bg-blue-100 text-base text-neutral-700 transition-colors outline-none">
          <input
            type="checkbox"
            checked={values.length === options.length}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                onChange(options.map((o) => o.value));
              } else {
                onChange([]);
              }
            }}
          />
          <div>Semua</div>
        </label>
        {options.map(({ label, value }, index) => {
          return (
            <label
              key={`select-item-${value}-${index}`}
              className="cursor-pointer flex gap-x-3 items-center min-h-[2.5rem] px-3 hover:bg-blue-100 text-base text-neutral-700 transition-colors outline-none"
            >
              <input
                type="checkbox"
                name={name}
                value={value}
                checked={values.includes(value)}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    onChange([...values, value]);
                  } else {
                    onChange(values.filter((v) => v !== value));
                  }
                }}
              />
              <div>{label}</div>
            </label>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
