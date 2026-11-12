import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ChapterCard } from '../components/ChapterCard';
import { FramedViewport } from '../components/FramedViewport';

export const Scene3SwarmWire: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0s - 2s (60 frames): Chapter Card 01 */}
      <Sequence from={0} durationInFrames={60}>
        <ChapterCard
          stepNumber="01 · ADVERSARIAL SWARM & WIRE INSPECTOR"
          title="Crash-Testing an Unprotected Store"
          subtitle="9 AI shopper personas attack Naive Shop at once—exposing double charges and $1.50 price hacks on the wire."
          accentColor="#F43F5E"
        />
      </Sequence>

      {/* 2s - 26s (720 frames): crashtest.mp4 (0:00 to 0:11.5 slowed down to 0.48x) */}
      <Sequence from={60} durationInFrames={720}>
        <FramedViewport
          videoFile="crashtest.mp4"
          startFrom={0}
          endAt={345} // 11.5 seconds of source video
          playbackRate={0.48} // Stretches 11.5s into 24s so every click is easy to read
          stepBadge="01 · CRASH-TEST WORKBENCH"
          featureTitle="9-Persona Swarm & Live Channel3 Cart Wire Inspector"
          sponsorBadge="Channel3 Catalog API • Gemini 3.8 Flash • PayPal Orders v2"
          accentColor="#F43F5E"
          topRightCallout={{
            text: 'NAIVE SHOP: 18 / 100 (FAIL)',
            subtext: 'Double Charges & Price Tampering Exploited',
            color: '#F43F5E',
          }}
          cameraKeyframes={[
            // Start full view as Run Crash Test is clicked
            { frame: 0, scale: 1.0, x: 0, y: 0 },
            // Zoom into Top Score & 9-Lane Swarm Strip
            { frame: 90, scale: 1.22, x: 0, y: 95 },
            { frame: 230, scale: 1.22, x: 0, y: 95 },
            // Glide down to the Channel3 Product & Wire Diff Inspector
            { frame: 310, scale: 1.28, x: -30, y: -45 },
            // Pan slightly right to focus on Human HMAC Receipt vs Tampered Wire Payload
            { frame: 520, scale: 1.32, x: -65, y: -55 },
            { frame: 680, scale: 1.05, x: 0, y: 0 },
          ]}
          captions={[
            {
              startFrame: 0,
              endFrame: 220,
              text: 'We pick Naive Shop and launch 9 test bots. Right away, its safety score drops to',
              highlight: '18 out of 100.',
            },
            {
              startFrame: 221,
              endFrame: 470,
              text: 'In our Channel3 Wire Inspector, you can see real store products alongside',
              highlight: 'what the human approved vs. what the bot actually sent.',
            },
            {
              startFrame: 471,
              endFrame: 715,
              text: 'The human approved $149.95—but the hijacked bot changed the price to',
              highlight: '$1.50, and Naive Shop blindly accepted it!',
            },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};