import { cva } from "class-variance-authority";
import classNames from "classnames";
import { ChangeEventHandler } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const RadioInput = ({
  label,
  name,
  value,
  checked = false,
  onChange,
}: Props) => {
  return (
    <label className="flex flex-row items-center space-x-1.5 min-w-24">
      <div className="w-5 h-5 flex justify-center items-center border-2 rounded-full border-neutral-700 hover:border-blue-600 transition-all duration-150">
        <span
          className={twMerge(
            "w-2.5 h-2.5 rounded-full",
            classNames({ "bg-blue-600": checked })
          )}
        ></span>
      </div>
      <input
        className="appearance-none"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e)}
      />
      <span className="text-neutral-700">{label}</span>
    </label>
  );
};
