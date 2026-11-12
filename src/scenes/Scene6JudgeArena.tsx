import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ChapterCard } from '../components/ChapterCard';
import { FramedViewport } from '../components/FramedViewport';

export const Scene6JudgeArena: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0s - 2s (60 frames): Chapter Card 03 */}
      <Sequence from={0} durationInFrames={60}>
        <ChapterCard
          stepNumber="03 · THE INTERACTIVE JUDGE ARENA"
          title="Test Any Custom Shopping Prompt"
          subtitle="Type custom instructions, flip live chaos switches, and watch agent payloads stream into AG Grid via SSE."
          accentColor="#38BDF8"
        />
      </Sequence>

      {/* 2s - 18s (480 frames): judge-arena.mp4 */}
      <Sequence from={60} durationInFrames={480}>
        <FramedViewport
          videoFile="judge-arena.mp4"
          startFrom={30}  // 1.0s
          endAt={540}     // 18.0s
          playbackRate={1.0}
          stepBadge="04 · JUDGE ARENA"
          featureTitle="Live AI Shopper, Chaos Switches & SSE Telemetry Stream"
          sponsorBadge="AG Grid Live Row Transactions • Server-Sent Events"
          accentColor="#38BDF8"
          topRightCallout={{
            text: 'CHAOS SWITCHES: ACTIVE',
            subtext: 'Simulating Network Drops & Price Hacks',
            color: '#38BDF8',
          }}
          cameraKeyframes={[
            { frame: 0, scale: 1.0, x: 0, y: 0 },
            // Zoom into the prompt input & Channel3 product card match
            { frame: 90, scale: 1.25, x: -40, y: 40 },
            // Pan to the Chaos Switches
            { frame: 220, scale: 1.32, x: 60, y: -20 },
            // Glide down to the live AG Grid telemetry streaming rows
            { frame: 360, scale: 1.28, x: 0, y: -90 },
            { frame: 460, scale: 1.0, x: 0, y: 0 },
          ]}
          captions={[
            {
              startFrame: 0,
              endFrame: 150,
              text: 'Judges can also test custom prompts—like buying running shoes under $150—',
              highlight: 'matched instantly via Channel3.',
            },
            {
              startFrame: 151,
              endFrame: 320,
              text: 'Flip on live chaos switches to drop responses or tamper prices mid-checkout,',
              highlight: 'and watch every action stream live into AG Grid.',
            },
            {
              startFrame: 321,
              endFrame: 470,
              text: 'Naive Shop takes a loss, while Guard-protected Hardened Shop',
              highlight: 'blocks the exploit with zero financial loss.',
            },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};