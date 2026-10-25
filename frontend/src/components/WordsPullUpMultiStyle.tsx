import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface TextSegment {
  text: string;
  className?: string;
  lineBreakBefore?: boolean;
}

export interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  // Group segments into lines based on lineBreakBefore
  const lines: {
    words: { word: string; className: string; index: number }[];
  }[] = [];

  let currentLine: { word: string; className: string; index: number }[] = [];
  let globalWordIndex = 0;

  segments.forEach((seg, idx) => {
    if (seg.lineBreakBefore && currentLine.length > 0) {
      lines.push({ words: currentLine });
      currentLine = [];
    }

    const words = seg.text.trim().split(/\s+/).filter(Boolean);
    words.forEach((w) => {
      currentLine.push({
        word: w,
        className: seg.className || '',
        index: globalWordIndex++,
      });
    });

    if (idx === segments.length - 1 && currentLine.length > 0) {
      lines.push({ words: currentLine });
    }
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center text-center select-none ${className}`}
    >
      {lines.map((line, lineIdx) => (
        <div
          key={`line-${lineIdx}`}
          className="inline-flex flex-wrap items-center justify-center text-center max-w-full"
        >
          {line.words.map((item) => (
            <span
              key={`line-${lineIdx}-word-${item.index}`}
              className={`inline-block mr-[0.24em] ${item.className}`}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: item.index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {item.word}
              </motion.span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordsPullUpMultiStyle;
