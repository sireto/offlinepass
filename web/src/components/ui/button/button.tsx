import React from "react";
import cn from "classnames";
import CircularProgress from "@mui/material/CircularProgress";

type ShapeNames = "rounded" | "pill" | "circle" | "square";
type ColorNames =
  | "primary"
  | "white"
  | "gray"
  | "success"
  | "info"
  | "warning"
  | "danger";
type VariantNames = "ghost" | "solid" | "transparent";
type SizeNames = "large" | "medium" | "small" | "mini";

const shapes: Record<ShapeNames, string[]> = {
  rounded: ["rounded-md sm:rounded-lg"],
  pill: ["rounded-full"],
  square: ["rounded-none"],
  circle: ["rounded-full"],
};

const variants: Record<VariantNames, string[]> = {
  ghost: ["bg-transparent"],
  solid: ["text-white"],
  transparent: ["bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800"],
};

const colors: Record<ColorNames, string[]> = {
  primary: ["text-white", "bg-brand", "border-brand"],
  white: ["text-gray-900", "bg-white", "border-white"],
  gray: ["text-gray-900", "bg-gray-100", "border-gray-100"],
  success: ["text-green-500", "bg-green-500", "border-green-500"],
  info: ["text-blue-500", "bg-blue-500", "border-blue-500"],
  warning: ["text-yellow-500", "bg-yellow-500", "border-yellow-500"],
  danger: ["text-red-500", "bg-red-500", "border-red-500"],
};
const sizes: Record<SizeNames, string[]> = {
  large: ["px-7 sm:px-9 h-11 sm:h-13"],
  medium: ["px-5 sm:px-8 h-10 sm:h-12"],
  small: ["px-7 h-10", "w-10 h-10"],
  mini: ["px-4 h-8", "w-8 h-8"],
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  disabled?: boolean;
  shape?: ShapeNames;
  color?: ColorNames;
  variant?: VariantNames;
  size?: SizeNames;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isLoading,
  disabled,
  fullWidth,
  shape = "square",
  color = "primary",
  variant = "solid",
  size = "medium",
  onClick,
  ...buttonProps
}) => {
  const sizeClassNames = sizes[size];
  const colorClassNames = colors[color];
  const shapeClassNames = shapes[shape];

  let buttonColorClassNames = "";
  let buttonDripColor = "";
  switch (variant) {
    case "ghost":
      buttonColorClassNames = `border-2 border-solid ${colorClassNames[0]} ${colorClassNames[2]}`;
      buttonDripColor = "rgba(0, 0, 0, 0.1)";
      break;

    case "transparent":
      buttonColorClassNames = `${colorClassNames[0]} ${
        disabled || isLoading
          ? ""
          : "hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800"
      } `;
      buttonDripColor = "rgba(0, 0, 0, 0.1)";
      break;

    default:
      buttonColorClassNames = `${colorClassNames[0]} ${colorClassNames[1]}`;
      buttonDripColor = "rgba(255, 255, 255, 0.3)";
      break;
  }
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center justify-center h-full",
        fullWidth && "w-full",
        buttonColorClassNames,
        buttonDripColor,
        sizeClassNames[0],
        shapeClassNames,
        className
      )}
      {...buttonProps}
    >
      {isLoading ? <CircularProgress color="inherit" className="p-2" /> : children}
    </button>
  );
};

export default Button;
