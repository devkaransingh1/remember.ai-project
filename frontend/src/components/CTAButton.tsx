import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface CTAButtonProps {
  onClick?: () => void;
  className?: string;
  text?: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  onClick,
  className = '',
  text = 'Start remembering',
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative inline-flex items-center justify-between gap-2.5 sm:gap-3 pl-6 sm:pl-7 pr-2 py-1.5 sm:py-2 bg-primary text-black rounded-full font-medium text-sm sm:text-base cursor-pointer transition-all duration-300 hover:gap-3 sm:hover:gap-4 hover:shadow-[0_0_30px_rgba(222,219,200,0.25)] focus:outline-none focus:ring-2 focus:ring-[#DEDBC8] focus:ring-offset-2 focus:ring-offset-black ${className}`}
      aria-label={text}
    >
      <span className="tracking-tight select-none font-semibold">{text}</span>
      <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black text-[#E1E0CC] transition-transform duration-300 ease-out group-hover:scale-110 shrink-0">
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1E0CC]" />
      </span>
    </motion.button>
  );
};

export default CTAButton;
