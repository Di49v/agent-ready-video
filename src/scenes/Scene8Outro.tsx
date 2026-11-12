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
import { BrandEmblemCircles } from './Scene1Hook';

export const Scene8Outro: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0.0s - 5.5s (165 frames): Pixar Resolution Clip (outro.mp4) */}
      <Sequence from={0} durationInFrames={165}>
        <PixarPayoffClip />
      </Sequence>

      {/* 5.5s - 9.0s (105 frames): CanvasAI-Style Signature Closing Card */}
      <Sequence from={165} durationInFrames={105}>
        <CanvasStyleClosingCard />
      </Sequence>
    </AbsoluteFill>
  );
};

const PixarPayoffClip: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [152, 165], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, backgroundColor: '#000' }}>
      <OffthreadVideo
        src={staticFile('outro.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 38,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(5, 8, 20, 0.92)',
          border: '1px solid rgba(16, 185, 129, 0.6)',
          padding: '12px 32px',
          borderRadius: 12,
          textAlign: 'center',
          boxShadow: '0 18px 45px rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span style={{ fontSize: 23, fontWeight: 600, color: '#F8FAFC' }}>
          With <span style={{ color: '#10B981', fontWeight: 800 }}>@agent-ready/guard</span>,
          duplicate retries are blocked—Priya is charged{' '}
          <span style={{ color: '#10B981', fontWeight: 800 }}>$120.00 once.</span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

const CanvasStyleClosingCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 115 },
  });

  const opacity = interpolate(frame, [0, 12, 95, 105], [0, 1, 1, 0], {
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
        zIndex: 20,
      }}
    >
      <div
        style={{
          transform: `scale(${interpolate(enter, [0, 1], [0.94, 1])})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 56,
          width: '100%',
          maxWidth: 1480,
          padding: '0 60px',
        }}
      >
        <div style={{ flex: 1, textAlign: 'right' }}>
          <span
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: '#F8FAFC',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              display: 'block',
            }}
          >
            PayPal protects
            <br />
            the payment.
          </span>
        </div>

        <BrandEmblemCircles label="AgentReady" scale={0.95} />

        <div style={{ flex: 1, textAlign: 'left' }}>
          <span
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: '#10B981',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              display: 'block',
            }}
          >
            AgentReady Lab
            <br />
            tests the store.
          </span>
        </div>
      </div>

      {/* Bottom Live URL & Repo Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 44,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div
          style={{
            fontStyle: 'italic',
            fontSize: 21,
            color: '#94A3B8',
          }}
        >
          Built to protect the future of agentic shopping.
        </div>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#64748B',
            letterSpacing: 1.5,
          }}
        >
          PAYPAL SANDBOX V2 • APIMATIC • CHANNEL3 • AG GRID • RENDER
        </div>
      </div>
    </AbsoluteFill>
  );
};