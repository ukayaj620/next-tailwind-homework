import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import type { IconComponent } from "@/components/icon";
import Link from "next/link";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  form?: ButtonHTMLAttributes<HTMLButtonElement>["form"];
  disabled?: boolean;
  variant: "fill" | "outline" | "text";
  className?: string;
  StartIcon?: IconComponent;
  EndIcon?: IconComponent;
  children?: ReactNode;
  href?: string;
  onClick?: MouseEventHandler;
};

const buttonClassNames = cva(
  [
    "flex items-center justify-center gap-x-2 px-5 py-2.5 rounded-lg font-medium text-sm md:text-base transition-colors border",
  ],
  {
    variants: {
      variant: {
        fill: [
          "bg-blue-500",
          "hover:bg-blue-700",
          "text-neutral-50",
          "border-transparent",
          "border-blue-500",
          "hover:border-blue-700",
        ],
        outline: [
          "bg-neutral-50",
          "hover:bg-blue-100",
          "text-blue-500",
          "hover:text-blue-700",
          "border-blue-500",
          "hover:border-blue-700",
        ],
        text: [
          "bg-neutral-50",
          "hover:bg-blue-100",
          "text-blue-500",
          "hover:text-blue-700",
          "border-neutral-50",
          "hover:border-blue-100",
        ],
      },
    },
  }
);

const iconClassNames = cva([], {
  variants: {
    variant: {
      fill: ["text-neutral-50"],
      outline: ["text-blue-500", "hover:text-blue-700"],
      text: ["text-blue-500", "hover:text-blue-700"],
      disabled: ["text-neutral-400"],
    },
  },
});

export const Button = ({
  type = "submit",
  form,
  disabled = false,
  className = "",
  variant,
  StartIcon,
  EndIcon,
  href,
  onClick,
  children,
}: Props) => {
  const renderContent = () => {
    return (
      <>
        {StartIcon && (
          <StartIcon
            size="w-6 h-6 flex-shrink-0"
            color={iconClassNames({
              variant: disabled ? "disabled" : variant,
            })}
          />
        )}
        {children && <span>{children}</span>}
        {EndIcon && (
          <EndIcon
            size="w-6 h-6 flex-shrink-0"
            color={iconClassNames({
              variant: disabled ? "disabled" : variant,
            })}
          />
        )}
      </>
    );
  };

  if (href && !disabled) {
    return (
      <Link href={href} legacyBehavior>
        <a
          className={twMerge(
            buttonClassNames({ variant }),
            classNames({
              "bg-neutral-300 hover:bg-neutral-300 text-neutral-400 hover:text-neutral-400 cursor-not-allowed":
                disabled,
              "border-transparent hover:border-transparent":
                disabled && variant !== "outline",
              "border-neutral-400 hover:border-neutral-400":
                disabled && variant === "outline",
            }),
            className
          )}
          type={type}
        >
          {renderContent()}
        </a>
      </Link>
    );
  }

  return (
    <button
      className={twMerge(
        buttonClassNames({ variant }),
        classNames({
          "bg-neutral-300 hover:bg-neutral-300 text-neutral-400 hover:text-neutral-400 cursor-not-allowed":
            disabled,
          "border-transparent hover:border-transparent":
            disabled && variant !== "outline",
          "border-neutral-400 hover:border-neutral-400":
            disabled && variant === "outline",
        }),
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
      form={form}
    >
      {renderContent()}
    </button>
  );
};
