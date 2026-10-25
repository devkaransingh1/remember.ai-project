import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';

export interface AnimatedLetterProps {
  char: string;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
}

export const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  char,
  index,
  totalChars,
  progress,
}) => {
  const charProgress = totalChars > 0 ? index / totalChars : 0;
  const start = Math.max(0, Math.min(0.95, charProgress - 0.1));
  const end = Math.min(1, Math.max(start + 0.02, charProgress + 0.05));

  const opacity = useTransform(progress, [start, end], [0.2, 1], {
    clamp: true,
  });

  return (
    <motion.span
      style={{ opacity }}
      className="inline will-change-[opacity]"
    >
      {char}
    </motion.span>
  );
};

export default AnimatedLetter;
