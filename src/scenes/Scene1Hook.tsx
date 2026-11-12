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
      {/* 0.0s - 2.5s (75 frames): CanvasAI-Style Minimalist Opening Emblem */}
      <Sequence from={0} durationInFrames={75}>
        <BrandTitleCard />
      </Sequence>

      {/* 2.5s - 14.5s (360 frames = 12.0s): Full Trimmed Pixar Story (story.mp4) */}
      <Sequence from={75} durationInFrames={360}>
        <PixarHookStory />
      </Sequence>

      {/* 14.5s - 18.0s (105 frames = 3.5s): "We Present the Solution: AgentReady Lab" */}
      <Sequence from={435} durationInFrames={105}>
        <SolutionRevealCard />
      </Sequence>
    </AbsoluteFill>
  );
};

export const BrandEmblemCircles: React.FC<{ label?: string; scale?: number }> = ({
  label = 'AgentReady',
  scale = 1.35, // Increased default scale to make the colorful circle big and prominent
}) => {
  const circles = [
    { angle: 0, colors: ['#38BDF8', '#1D4ED8'] },
    { angle: 60, colors: ['#10B981', '#047857'] },
    { angle: 120, colors: ['#F59E0B', '#B45309'] },
    { angle: 180, colors: ['#F43F5E', '#BE123C'] },
    { angle: 240, colors: ['#A855F7', '#6D28D9'] },
    { angle: 300, colors: ['#06B6D4', '#0E7490'] },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: 440, // Expanded container size
        height: 440,
        transform: `scale(${scale})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {circles.map((c, idx) => {
        const rad = (c.angle * Math.PI) / 180;
        const radius = 105; // Wider orbit radius for a bigger, bolder spread
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              width: 190, // Larger individual glowing orb size
              height: 190,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${c.colors[0]}DD, ${c.colors[1]}AA)`,
              transform: `translate(${x}px, ${y}px)`,
              mixBlendMode: 'screen',
              boxShadow: `0 0 45px ${c.colors[0]}44`,
            }}
          />
        );
      })}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          fontSize: 28, // Larger inner label text
          fontWeight: 900,
          color: '#FFFFFF',
          letterSpacing: '-0.5px',
          textShadow: '0 2px 16px rgba(0,0,0,0.9)',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const BrandTitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const opacity = interpolate(frame, [0, 10, 63, 75], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050814',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        zIndex: 10,
      }}
    >
      <div
        style={{
          transform: `scale(${interpolate(scale, [0, 1], [0.94, 1])})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 64,
          width: '100%',
          maxWidth: 1600,
          padding: '0 60px',
        }}
      >
        <div style={{ flex: 1, textAlign: 'right' }}>
          <span
            style={{
              fontSize: 62, // Increased font size for dramatic impact
              fontWeight: 800,
              color: '#F8FAFC',
              letterSpacing: '-2px',
              lineHeight: 1.1,
            }}
          >
            Checkouts that
          </span>
        </div>

        {/* Big prominent colorful circle element */}
        <BrandEmblemCircles label="AgentReady" scale={1.2} />

        <div style={{ flex: 1, textAlign: 'left' }}>
          <span
            style={{
              fontSize: 62, // Increased font size matching left side
              fontWeight: 800,
              color: '#F8FAFC',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              display: 'block',
            }}
          >
            survive AI
            <br />
            shoppers.
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 52,
          fontStyle: 'italic',
          fontSize: 24,
          color: '#94A3B8',
          letterSpacing: '-0.3px',
        }}
      >
        not the other way around.
      </div>
    </AbsoluteFill>
  );
};

const PixarHookStory: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [348, 360], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const captions = [
    {
      start: 0,
      end: 110,
      text: 'Priya asks her AI assistant to buy size 8 running shoes for',
      highlight: '$120.00.',
      color: '#38BDF8',
    },
    {
      start: 111,
      end: 235,
      text: 'PayPal captures $120—but a network timeout hits before the bot hears "Done"...',
      highlight: 'so the bot retries automatically.',
      color: '#F59E0B',
    },
    {
      start: 236,
      end: 358,
      text: "Because the store's code missed PayPal-Request-Id, Priya is charged twice:",
      highlight: '$240.00 for 1 pair of shoes!',
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

      {/* Minimalist Top-Left Pill */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 44,
          backgroundColor: 'rgba(5, 8, 20, 0.85)',
          border: '1px solid rgba(148, 163, 184, 0.25)',
          padding: '8px 18px',
          borderRadius: 8,
          fontFamily: 'monospace',
          fontSize: 14,
          fontWeight: 700,
          color: '#E2E8F0',
          letterSpacing: 1.5,
          backdropFilter: 'blur(10px)',
        }}
      >
        ● THE HIDDEN BUG IN AGENTIC SHOPPING
      </div>

      {/* Synced Plain-English Subtitle */}
      {activeCaption && (
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(5, 8, 20, 0.92)',
            border: `1px solid ${activeCaption.color}88`,
            padding: '12px 30px',
            borderRadius: 12,
            maxWidth: '84%',
            textAlign: 'center',
            boxShadow: '0 16px 40px rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span style={{ fontSize: 23, fontWeight: 500, color: '#F8FAFC' }}>
            {activeCaption.text}{' '}
            <span style={{ color: activeCaption.color, fontWeight: 800 }}>
              {activeCaption.highlight}
            </span>
          </span>
        </div>
      )}
    </AbsoluteFill>
  );
};

const SolutionRevealCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const translateY = interpolate(enter, [0, 1], [24, 0]);
  const opacity = interpolate(frame, [0, 10, 93, 105], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        zIndex: 15,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 1280,
          padding: '0 48px',
        }}
      >
        <div
          style={{
            padding: '7px 18px',
            borderRadius: 6,
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.45)',
            color: '#10B981',
            fontFamily: 'monospace',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 3.5,
            textTransform: 'uppercase',
            marginBottom: 22,
          }}
        >
          WE PRESENT THE SOLUTION
        </div>

        {/* Increased font size for AgentReady Lab in the solution reveal screen */}
        <h1
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: '-3px',
            margin: '0 0 18px 0',
            lineHeight: 1.05,
          }}
        >
          AgentReady <span style={{ color: '#10B981' }}>Lab</span>
        </h1>

        <p
          style={{
            fontSize: 34,
            color: '#CBD5E1',
            fontWeight: 500,
            margin: 0,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Built to protect the future of agentic shopping.
        </p>
      </div>
    </AbsoluteFill>
  );
};