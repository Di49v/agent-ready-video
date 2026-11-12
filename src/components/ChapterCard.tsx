import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface ChapterCardProps {
  stepNumber: string;
  title: string;
  subtitle: string;
  accentColor?: string;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  stepNumber,
  title,
  subtitle,
  accentColor = '#38BDF8',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const translateY = interpolate(enterProgress, [0, 1], [18, 0]);
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        zIndex: 20,
      }}
    >
      <div
        style={{
          transform: `translateY(${translateY}px)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 1240,
          padding: '0 48px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 16px',
            borderRadius: 6,
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            color: accentColor,
            fontFamily: 'monospace',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 22,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: accentColor,
            }}
          />
          {stepNumber}
        </div>

        <h1
          style={{
            fontSize: 66,
            fontWeight: 700,
            color: '#F8FAFC',
            letterSpacing: '-1.8px',
            margin: '0 0 16px 0',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: 24,
            color: '#94A3B8',
            fontWeight: 400,
            margin: 0,
            maxWidth: 880,
            lineHeight: 1.45,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};