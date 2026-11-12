import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const CanvasGridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const driftX = Math.sin(frame / 45) * 35;
  const driftY = Math.cos(frame / 50) * 25;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Subtle Architectural Blueprint Grid (CanvasAI style) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Ambient Top-Left Teal Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-12%',
          left: '8%',
          width: 720,
          height: 720,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.13) 0%, rgba(6, 182, 212, 0.05) 45%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(${driftX}px, ${driftY}px)`,
        }}
      />

      {/* Ambient Bottom-Right Warm Amber/Rose Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '6%',
          width: 780,
          height: 780,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(244, 63, 94, 0.06) 50%, transparent 72%)',
          filter: 'blur(65px)',
          transform: `translate(${-driftX}px, ${-driftY}px)`,
        }}
      />
    </AbsoluteFill>
  );
};