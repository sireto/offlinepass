import React, { useEffect, useState } from "react";
import cn from "classnames";

interface SeedCardProps {
  index: number;
  seed: string;
  disabled?: boolean;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function SeedCard({
  index,
  seed,
  disabled,
  isSelected,
  onClick,
}: SeedCardProps) {
  return (
    <div
      onClick={disabled ? () => {} : onClick}
      className={cn(
        "rounded pr-8 pl-2 py-2 justify-center items-center bg-gray-400 text-white",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        isSelected && "bg-gray-700"
      )}
    >
      {`${index}. ${seed}`}
    </div>
  );
}
