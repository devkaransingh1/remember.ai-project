import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export interface FeatureCardProps {
  index: number;
  type?: 'video' | 'standard';
  videoUrl?: string;
  videoLabel?: string;
  iconUrl?: string;
  title?: string;
  badge?: string;
  checklist?: string[];
  onLearnMore?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  index,
  type = 'standard',
  videoUrl,
  videoLabel,
  iconUrl,
  title,
  badge,
  checklist = [],
  onLearnMore,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl md:rounded-3xl overflow-hidden h-[450px] sm:h-[470px] lg:h-[480px] flex flex-col justify-between border border-white/[0.04] transition-all duration-300 hover:border-white/[0.12]"
    >
      {type === 'video' ? (
        <div className="relative w-full h-full bg-[#121212] overflow-hidden flex flex-col justify-end p-6 sm:p-7">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Subtle noise and gradient for video card */}
          <div
            className="noise-overlay absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none z-10"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />

          <div className="relative z-20">
            <p className="text-xl sm:text-2xl font-normal text-[#E1E0CC] tracking-tight leading-snug m-0">
              {videoLabel || 'Your memory. Your world.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full bg-[#212121] p-6 sm:p-7 flex flex-col justify-between">
          {/* Top section: Icon & Title */}
          <div>
            {iconUrl && (
              <div className="mb-6 sm:mb-8">
                <img
                  src={iconUrl}
                  alt={title || 'Feature icon'}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover shadow-md"
                  loading="lazy"
                />
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-normal text-[#E1E0CC] tracking-tight m-0 mb-6 flex items-baseline gap-1.5">
              <span>{title}</span>
              {badge && (
                <span className="text-gray-400 text-sm font-light">
                  ({badge})
                </span>
              )}
            </h3>

            {/* Checklist */}
            <ul className="space-y-3 m-0 p-0 list-none">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="text-[#DEDBC8] mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                  </span>
                  <span className="text-gray-400 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom link: Learn more with rotated ArrowRight */}
          <div className="pt-6 border-t border-white/[0.05]">
            <button
              type="button"
              onClick={onLearnMore}
              className="group/btn inline-flex items-center gap-2 text-xs sm:text-sm font-normal text-[#E1E0CC] hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-0 p-0"
            >
              <span>Learn more</span>
              <span className="transition-transform duration-200 -rotate-45 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FeatureCard;
