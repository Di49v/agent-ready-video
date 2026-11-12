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
  accentColor = '#10b981',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enterScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

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
          transform: `scale(${enterScale})`,
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
            padding: '8px 22px',
            borderRadius: 999,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            border: `1.5px solid ${accentColor}`,
            color: accentColor,
            fontFamily: 'monospace',
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: 'uppercase',
            marginBottom: 24,
            boxShadow: `0 0 30px ${accentColor}33`,
          }}
        >
          {stepNumber}
        </div>

        <h1
          style={{
            fontSize: 78,
            fontWeight: 900,
            color: '#F8FAFC',
            letterSpacing: '-1.5px',
            margin: '0 0 18px 0',
            lineHeight: 1.08,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: 30,
            color: '#94A3B8',
            fontWeight: 500,
            margin: 0,
            maxWidth: 920,
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>
    </AbsoluteFill>
  );
};