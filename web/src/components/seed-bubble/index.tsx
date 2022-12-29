import React from "react";
import { MdCancel } from "react-icons/md";

interface SeedBubbleProps {
  seed: string;
  onClick?: React.MouseEventHandler<SVGAElement>;
}

export default function SeedBubble({ seed, onClick }: SeedBubbleProps) {
  return (
    <div className="flex items-center rounded-full px-4 py-1 m-2 bg-green-200 cursor-default">
      {seed}
      <span className="ml-2 cursor-pointer">
        <MdCancel onClick={onClick} />
      </span>
    </div>
  );
}
