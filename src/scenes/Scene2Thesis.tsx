import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FramedViewport } from '../components/FramedViewport';

export const Scene2Thesis: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Part A (0s - 6s / 180 frames): CanvasAI-Style Two-Card Problem vs Solution Slide */}
      <Sequence from={0} durationInFrames={180}>
        <ThesisComparisonSlide />
      </Sequence>

      {/* Part B (6s - 16s / 300 frames): Landing Page Hero & 4-Stage Pipeline */}
      <Sequence from={180} durationInFrames={300}>
        <FramedViewport
          videoFile="landingpage.mp4"
          startFrom={0}
          endAt={450} // First 15 seconds of landingpage.mp4 played at 1.5x = 10s
          playbackRate={1.5}
          stepBadge="00 · THE PLATFORM"
          featureTitle="4-Stage Checkout Crash-Test Pipeline"
          sponsorBadge="PayPal Sandbox v2 • Channel3 • AG Grid • APIMatic"
          accentColor="#10B981"
          cameraKeyframes={[
            { frame: 0, scale: 1.0, x: 0, y: 0 },
            { frame: 90, scale: 1.12, x: 0, y: 20 },
            { frame: 210, scale: 1.15, x: 0, y: -35 },
            { frame: 300, scale: 1.0, x: 0, y: 0 },
          ]}
          captions={[
            {
              startFrame: 0,
              endFrame: 145,
              text: 'AgentReady Lab sends 9 test AI shoppers into a store to deliberately trigger',
              highlight: 'retries, price edits, and network drops.',
            },
            {
              startFrame: 146,
              endFrame: 295,
              text: "It compares PayPal's payment records against the store's database—and",
              highlight: 'writes the code fix automatically.',
            },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const ThesisComparisonSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEnter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const opacity = interpolate(frame, [0, 12, 165, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        padding: '60px 90px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 18,
          color: '#38BDF8',
          letterSpacing: 4,
          fontWeight: 800,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}
      >
        WHY DO AI ORDERS GO WRONG?
      </div>

      <h2
        style={{
          fontSize: 60,
          fontWeight: 900,
          color: '#F8FAFC',
          textAlign: 'center',
          margin: '0 0 44px 0',
          letterSpacing: '-1.5px',
          lineHeight: 1.12,
        }}
      >
        PayPal protects the payment.{' '}
        <span style={{ color: '#10B981' }}>Who tests the store?</span>
      </h2>

      <div
        style={{
          display: 'flex',
          gap: 36,
          width: '100%',
          maxWidth: 1560,
          transform: `scale(${cardEnter})`,
        }}
      >
        {/* Left Card: PayPal's Side */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: '2px solid rgba(56, 189, 248, 0.4)',
            borderRadius: 24,
            padding: '38px 42px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 999,
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#38BDF8',
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: 15,
              marginBottom: 18,
            }}
          >
            ✓ PAYPAL PAYMENT RAIL
          </div>
          <h3 style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', margin: '0 0 16px 0' }}>
            Flawless Payment Security
          </h3>
          <p style={{ fontSize: 22, color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
            PayPal securely moves the money, verifies cards, and runs fraud checks. If a store asks PayPal to charge two separate orders, PayPal does its job.
          </p>
        </div>

        {/* Right Card: The Store's Checkout Code */}
        <div
          style={{
            flex: 1,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            border: '2px solid rgba(244, 63, 94, 0.55)',
            borderRadius: 24,
            padding: '38px 42px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(244, 63, 94, 0.15)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: 999,
              backgroundColor: 'rgba(244, 63, 94, 0.18)',
              color: '#F43F5E',
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: 15,
              marginBottom: 18,
            }}
          >
            ⚠ MERCHANT STORE BACKEND
          </div>
          <h3 style={{ fontSize: 36, fontWeight: 800, color: '#F8FAFC', margin: '0 0 16px 0' }}>
            Where Agent Bugs Hide
          </h3>
          <p style={{ fontSize: 22, color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
            Stores forget safety keys on retries, trust hacked `$1.50` prices from the buyer side, or take money without shipping. <strong style={{ color: '#10B981' }}>AgentReady Lab catches all of them.</strong>
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};