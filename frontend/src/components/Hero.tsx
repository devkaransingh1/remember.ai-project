import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar.tsx';
import WordsPullUp from './WordsPullUp.tsx';
import CTAButton from './CTAButton.tsx';

export interface HeroProps {
  onOpenGetStarted?: () => void;
  onOpenPrivacy?: () => void;
  onStartRemembering?: () => void;
}

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

export const Hero: React.FC<HeroProps> = ({
  onOpenGetStarted,
  onOpenPrivacy,
  onStartRemembering,
}) => {
  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black select-none box-border flex flex-col">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black flex-1 flex flex-col justify-between">
        {/* Background Cinematic Looping Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src={HERO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Noise Overlay */}
        <div
          className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Atmosphere Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Hanging Centered Navbar */}
        <Navbar
          onOpenGetStarted={onOpenGetStarted}
          onOpenPrivacy={onOpenPrivacy}
        />

        {/* Spacer for top */}
        <div className="w-full h-16" />

        {/* Hero Bottom Content (12-Column Grid) */}
        <div className="relative z-20 w-full p-6 sm:p-8 md:p-10 lg:p-12 pb-6 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left 8 columns: Giant brand heading */}
            <div className="lg:col-span-8 overflow-visible flex items-end">
              <h1 className="m-0 p-0 overflow-visible text-[15.5vw] xs:text-[16vw] sm:text-[17vw] md:text-[15.5vw] lg:text-[11.8vw] xl:text-[11.2vw] 2xl:text-[11.5vw] font-medium leading-[0.84] tracking-[-0.07em] text-[#E1E0CC]">
                <WordsPullUp
                  text="Remember"
                  showAsterisk={true}
                  className="overflow-visible"
                />
              </h1>
            </div>

            {/* Right 4 columns: Description paragraph & CTA */}
            <div className="lg:col-span-4 flex flex-col justify-end gap-5 sm:gap-6 pb-1 lg:pb-2.5 max-w-lg lg:max-w-none">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-primary/80 text-xs sm:text-sm md:text-base leading-[1.3] font-normal m-0"
              >
                Remember AI is your personal memory layer for the digital world.
                Save the facts, ideas, preferences, and details that matter to you
                in natural language, then bring them back whenever you need them.
              </motion.p>

              <div>
                <CTAButton onClick={onStartRemembering} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
