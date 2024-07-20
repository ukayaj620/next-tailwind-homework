import { ReactNode } from "react";

type Props = {
  errorMessage?: string;
  children?: ReactNode;
};

export const RadioGroup = ({ errorMessage, children }: Props) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="h-fit md:h-10 py-0.5 flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:space-x-4 md:items-center">
        {children}
      </div>
      {errorMessage ? (
        <span className="text-sm text-red-600">{errorMessage}</span>
      ) : null}
    </div>
  );
};
