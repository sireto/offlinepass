import React from "react";
import { ChevronDown } from "@app/components/icons/chevrondown";
import cn from "classnames";

interface IcarouselSliderButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  IconClassName: string;
}

const CarouselSliderButton: React.FC<IcarouselSliderButtonProps> = ({
  onClick,
  className,
  IconClassName,
}) => {
  return (
    <button onClick={onClick} className={cn("cursor-pointer", className)}>
      <ChevronDown className={cn("h-6 w-6 text-brand", IconClassName)} />
    </button>
  );
};
export default CarouselSliderButton;
