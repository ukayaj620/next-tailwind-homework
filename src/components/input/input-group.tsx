import { ReactNode } from "react";

type InputGroupProps = {
  label?: string;
  description?: string;
  children: ReactNode;
};

export const InputGroup = ({
  label,
  description,
  children,
}: InputGroupProps) => {
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row xl:gap-x-24 items-stretch md:items-center">
      <div className="w-full max-w-[22.5rem]">
        <p className="text-neutral-900 font-base md:font-medium mb-0.5 text-sm md:text-base">
          {label}
        </p>
        <p className="text-neutral-400 text-xs md:text-sm hidden md:block">
          {description}
        </p>
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};
