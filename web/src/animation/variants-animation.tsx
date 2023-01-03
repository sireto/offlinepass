import { motion } from "framer-motion";
import React from "react";

interface IVariantsAnimationProps {
  startingPosition: number;
  endingPostion: number;
  className?: string;
  children?: React.ReactNode;
}

const VariantsAnimation: React.FC<IVariantsAnimationProps> = ({
  startingPosition,
  endingPostion,
  className,
  children,
}) => {
  const variants = {
    hidden: { opacity: 0, y: startingPosition },
    visible: { opacity: 1, y: endingPostion },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default VariantsAnimation;
