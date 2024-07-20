import { cva } from "class-variance-authority";
import { ChangeEventHandler, InputHTMLAttributes } from "react";
import { IconComponent, VisibilityIcon, VisibilityOffIcon } from "../icon";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type Props = {
  label?: string;
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: InputHTMLAttributes<HTMLInputElement>["placeholder"];
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  defaultValue?: InputHTMLAttributes<HTMLInputElement>["defaultValue"];
  disabled?: InputHTMLAttributes<HTMLInputElement>["disabled"];
  inputRootClassNames?: InputHTMLAttributes<HTMLInputElement>["className"];
  inputWrapperClassNames?: InputHTMLAttributes<HTMLInputElement>["className"];
  inputClassNames?: InputHTMLAttributes<HTMLInputElement>["className"];
  errorMessage?: string;
  StartIcon?: IconComponent;
  onStartIconClick?: () => void;
  EndIcon?: IconComponent;
  onEndIconClick?: () => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const _inputWrapperClassNames = cva(
  ["w-full border rounded-lg px-3 py-2.5 flex flex-row items-center"],
  {
    variants: {
      state: {
        default: ["border-neutral-400", "focus-within:border-blue-500"],
        error: ["border-red-600"],
        disabled: [
          "border-neutral-400",
          "bg-neutral-300",
          "cursor-not-allowed",
        ],
      },
    },
  }
);

export const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  defaultValue,
  disabled,
  errorMessage,
  inputRootClassNames,
  inputWrapperClassNames,
  inputClassNames,
  StartIcon,
  onStartIconClick,
  EndIcon,
  onEndIconClick,
  onChange,
}: Props) => {
  const state = errorMessage ? "error" : "default";

  return (
    <div className={twMerge("flex flex-col space-y-1", inputRootClassNames)}>
      {label ? (
        <label className="font-medium text-neutral-700">{label}</label>
      ) : null}
      <div
        className={twMerge(
          _inputWrapperClassNames({
            state: disabled ? "disabled" : state,
          }),
          inputWrapperClassNames
        )}
      >
        {StartIcon ? (
          <div
            className={classNames("mr-2", {
              "cursor-pointer": !!onStartIconClick,
            })}
            onClick={onStartIconClick}
          >
            <StartIcon />
          </div>
        ) : null}
        <input
          className={twMerge(
            "min-h-6 border-none outline-none w-full bg-transparent placeholder:text-neutral-400 text-neutral-700",
            inputClassNames
          )}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          onChange={onChange}
        />
        {EndIcon ? (
          <div
            className={classNames("ml-2", {
              "cursor-pointer": !!onEndIconClick,
            })}
            onClick={onEndIconClick}
          >
            <EndIcon />
          </div>
        ) : null}
      </div>
      {errorMessage ? (
        <span className="text-sm text-red-600">{errorMessage}</span>
      ) : null}
    </div>
  );
};

export const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      EndIcon={showPassword ? VisibilityOffIcon : VisibilityIcon}
      onEndIconClick={() => setShowPassword((st) => !st)}
    />
  );
};
