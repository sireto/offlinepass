import React from "react";
import { motion } from "framer-motion";
import cn from "classnames";

interface SeedCardProps {
  index: number;
  seed: string;
  disabled?: boolean;
  isSelected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const seedVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function SeedCard({
  index,
  seed,
  disabled,
  isSelected,
  onClick,
}: SeedCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={seedVariants}
      onClick={disabled ? () => {} : onClick}
      className={cn(
        "rounded pr-8 pl-2 py-2 justify-center items-center bg-gray-400 text-white",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        isSelected && "bg-gray-600"
      )}
    >
      {`${index}. ${seed}`}
    </motion.div>
  );
}
