import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = '',
  showAsterisk = false,
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const words = text.trim().split(/\s+/);

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap items-baseline select-none ${className}`}
    >
      {words.map((word, wordIndex) => {
        const isLastWord = wordIndex === words.length - 1;

        return (
          <span
            key={`word-${wordIndex}`}
            className="inline-block whitespace-nowrap mr-[0.22em] relative"
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.7,
                delay: wordIndex * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>

            {isLastWord && showAsterisk && (
              <span
                className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] font-light leading-none pointer-events-none select-none"
                style={{ color: '#E1E0CC' }}
                aria-hidden="true"
              >
                *
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default WordsPullUp;
