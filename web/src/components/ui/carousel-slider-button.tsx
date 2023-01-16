import React from "react";
import { ChevronDown } from "@app/components/icons/chevrondown";

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
    <button onClick={onClick} className={className}>
      <ChevronDown className={IconClassName} />
    </button>
  );
};
export default CarouselSliderButton;
