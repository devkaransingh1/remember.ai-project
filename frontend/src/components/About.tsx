import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import WordsPullUpMultiStyle, { TextSegment } from './WordsPullUpMultiStyle.tsx';
import AnimatedLetter from './AnimatedLetter.tsx';

const ABOUT_BODY_TEXT =
  "Remember AI turns the details you share into memories that remain useful beyond a single conversation. From the goals you're working toward to the ideas you want to revisit, your memories stay organized, searchable, and ready when you need them. Instead of repeating yourself, return to the context that matters and keep moving forward.";

export const About: React.FC = () => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const headingSegments: TextSegment[] = [
    { text: 'Your thoughts,', className: 'text-[#E1E0CC] font-normal' },
    {
      text: 'never forgotten.',
      className:
        'font-serif italic font-normal text-[#E1E0CC] tracking-tight',
    },
    {
      text: 'Your knowledge, always within reach.',
      className: 'text-[#E1E0CC] font-normal',
      lineBreakBefore: true,
    },
  ];

  const words = ABOUT_BODY_TEXT.split(' ');
  const totalChars = ABOUT_BODY_TEXT.length;
  let charCounter = 0;

  return (
    <section
      id="about"
      className="bg-black py-24 sm:py-32 md:py-36 px-4 md:px-6 relative select-none"
    >
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-[2rem] p-8 sm:p-14 md:p-20 text-center border border-white/[0.04]">
        {/* Small section label */}
        <div className="text-primary text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-6 sm:mb-8 font-medium">
          Personal memory
        </div>

        {/* Main heading with Almarai and Instrument Serif italic mix */}
        <div className="max-w-3xl mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.0] sm:leading-[0.95] tracking-tight">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* About body paragraph with scroll-linked character reveal and proper word wrapping */}
        <div className="mt-10 sm:mt-12 md:mt-14 max-w-2xl mx-auto">
          <p
            ref={paragraphRef}
            className="text-xs sm:text-sm md:text-base leading-[1.8] text-[#DEDBC8] font-normal tracking-wide text-center"
          >
            {words.map((word, wordIndex) => {
              const letters = word.split('');
              const wordStartChar = charCounter;
              charCounter += letters.length + 1; // +1 for the space

              return (
                <span
                  key={`word-block-${wordIndex}`}
                  className="inline-block whitespace-nowrap mr-[0.28em]"
                >
                  {letters.map((char, letterIndex) => (
                    <AnimatedLetter
                      key={`char-${wordStartChar + letterIndex}`}
                      char={char}
                      index={wordStartChar + letterIndex}
                      totalChars={totalChars}
                      progress={scrollYProgress}
                    />
                  ))}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
