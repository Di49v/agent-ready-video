import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const Scene1Hook: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0s - 3s (90 frames): Crisp Title Card */}
      <Sequence from={0} durationInFrames={90}>
        <BrandTitleCard />
      </Sequence>

      {/* 3s - 18s (450 frames): Full-Bleed Pixar Story (story.mp4) */}
      <Sequence from={90} durationInFrames={450}>
        <PixarHookStory />
      </Sequence>
    </AbsoluteFill>
  );
};

const BrandTitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, 12, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        zIndex: 10,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 40px',
        }}
      >
        <div
          style={{
            padding: '8px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1.5px solid #10B981',
            color: '#10B981',
            fontFamily: 'monospace',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 22,
          }}
        >
          THE CODE COVEN PRESENTS
        </div>

        <h1
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: '-2.5px',
            margin: '0 0 16px 0',
            lineHeight: 1.05,
          }}
        >
          AgentReady <span style={{ color: '#10B981' }}>Lab</span>
        </h1>

        <p
          style={{
            fontSize: 30,
            color: '#94A3B8',
            maxWidth: 880,
            margin: 0,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          The Crash-Test Facility for Online Checkouts in the Age of AI Shoppers
        </p>
      </div>
    </AbsoluteFill>
  );
};

const PixarHookStory: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [435, 450], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const captions = [
    {
      start: 5,
      end: 135,
      text: 'Priya asks her AI assistant to buy size 8 running shoes for',
      highlight: '\$120.00.',
      color: '#38BDF8',
    },
    {
      start: 136,
      end: 280,
      text: 'PayPal captures the \$120 payment—but the internet hiccups before the bot hears "Done"...',
      highlight: 'so the bot automatically tries again.',
      color: '#F59E0B',
    },
    {
      start: 281,
      end: 445,
      text: "Because the store's code forgot a simple safety key, Priya is charged twice:",
      highlight: '\$240.00 for 1 pair of shoes!',
      color: '#F43F5E',
    },
  ];

  const activeCaption = captions.find((c) => frame >= c.start && frame <= c.end);

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, backgroundColor: '#000' }}>
      <OffthreadVideo
        src={staticFile('story.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Top-Left Story Context Pill */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 48,
          backgroundColor: 'rgba(7, 10, 18, 0.85)',
          border: '1px solid rgba(255,255,255,0.18)',
          padding: '10px 22px',
          borderRadius: 999,
          fontFamily: 'monospace',
          fontSize: 16,
          fontWeight: 800,
          color: '#E2E8F0',
          letterSpacing: 1.5,
          backdropFilter: 'blur(10px)',
        }}
      >
        ● REAL-WORLD AI SHOPPING HAZARD
      </div>

      {/* Bottom Synced Plain-English Subtitle */}
      {activeCaption && (
        <div
          style={{
            position: 'absolute',
            bottom: 42,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(7, 10, 18, 0.92)',
            border: `1.5px solid ${activeCaption.color}88`,
            padding: '16px 36px',
            borderRadius: 18,
            maxWidth: '84%',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ fontSize: 27, fontWeight: 600, color: '#F8FAFC' }}>
            {activeCaption.text}{' '}
            <span style={{ color: activeCaption.color, fontWeight: 900 }}>
              {activeCaption.highlight}
            </span>
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};