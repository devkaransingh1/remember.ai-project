import React from 'react';
import WordsPullUpMultiStyle, { TextSegment } from './WordsPullUpMultiStyle.tsx';
import FeatureCard from './FeatureCard.tsx';

export interface FeaturesProps {
  onLearnMore?: (featureIndex: number) => void;
}

const FEATURE_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4';

const ICON_CARD_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85';

const ICON_CARD_3 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85';

const ICON_CARD_4 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85';

export const Features: React.FC<FeaturesProps> = ({ onLearnMore }) => {
  const headingSegments: TextSegment[] = [
    {
      text: 'A personal memory layer for everything that matters.',
      className: 'text-[#E1E0CC] font-normal leading-snug',
    },
    {
      text: 'Capture once. Recall whenever you need it.',
      className: 'text-gray-500 font-normal leading-snug mt-1',
      lineBreakBefore: true,
    },
  ];

  return (
    <section
      id="features"
      className="min-h-screen bg-black relative py-20 sm:py-28 md:py-32 px-4 md:px-8 select-none"
    >
      {/* Background Subtle Noise Overlay */}
      <div
        className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading with 2 lines */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* Four-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2.5 md:gap-2 lg:gap-2">
          {/* Card 1: Immersive Video Card */}
          <FeatureCard
            index={0}
            type="video"
            videoUrl={FEATURE_VIDEO_URL}
            videoLabel="Your memory. Your world."
          />

          {/* Card 2: Memory Capture (01) */}
          <FeatureCard
            index={1}
            type="standard"
            iconUrl={ICON_CARD_2}
            title="Memory Capture."
            badge="01"
            checklist={[
              'Save facts in everyday language',
              'Extract meaningful details with AI',
              'Organize memories as structured data',
              'Store memories persistently in MongoDB',
            ]}
            onLearnMore={() => onLearnMore?.(1)}
          />

          {/* Card 3: Contextual Recall (02) */}
          <FeatureCard
            index={2}
            type="standard"
            iconUrl={ICON_CARD_3}
            title="Contextual Recall."
            badge="02"
            checklist={[
              'Find memories by meaning and context',
              'Retrieve related facts across conversations',
              'Get answers grounded in saved memories',
              'Connect related details with semantic search',
            ]}
            onLearnMore={() => onLearnMore?.(2)}
          />

          {/* Card 4: Smart Memory Controls (03) */}
          <FeatureCard
            index={3}
            type="standard"
            iconUrl={ICON_CARD_4}
            title="Smart Memory Controls."
            badge="03"
            checklist={[
              'Update outdated or changing facts',
              'Remove memories you no longer need',
              'Detect similar or duplicate memories',
              'Keep personal memories private to you',
            ]}
            onLearnMore={() => onLearnMore?.(3)}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
