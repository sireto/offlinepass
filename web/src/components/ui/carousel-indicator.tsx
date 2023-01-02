import { ButtonProps } from "@mui/material";
import React, { MouseEventHandler } from "react";
import cn from "classnames";

type ShapeNames = "circle" | "flat";

type SizeNames = "large" | "medium" | "small" | "mini";

type ColorNames = "primary" | "slate";

const shapes: Record<ShapeNames, string[]> = {
  circle: ["rounded-full"],
  flat: ["rounded-sm"],
};

const sizes: Record<SizeNames, string[]> = {
  large: ["h-12 w-12", "h-12 w-32"],
  medium: ["h-6 w-6", "h-6 w-24"],
  small: ["h-3 w-3", "h-3 w-8"],
  mini: ["h-2 w-2", "h-1 w-8"],
};

const colors: Record<ColorNames, string[]> = {
  primary: ["bg-brand"],
  slate: ["bg-slate-300"],
};

export interface CaraouselProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: ShapeNames;
  size?: SizeNames;
  color?: ColorNames;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CarouselIndicator: React.FC<CaraouselProps> = ({
  onClick,
  shape = "circle",
  size = "small",
  color = "slate",
  className,
}) => {
  const colorClassNames = colors[color];
  const shapeClassNames = shapes[shape];
  const sizeClassNames = shape === "circle" ? sizes[size][0] : sizes[size][1];

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        shapeClassNames,
        colorClassNames,
        sizeClassNames,
        className
      )}
    ></button>
  );
};

export default CarouselIndicator;
