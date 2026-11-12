import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const CanvasGridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const driftX = Math.sin(frame / 60) * 24;
  const driftY = Math.cos(frame / 70) * 18;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050814',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Fine Architectural Blueprint Grid (CanvasAI style) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Soft Top-Left Cyan/Teal Ambient Aura */}
      <div
        style={{
          position: 'absolute',
          top: '-18%',
          left: '4%',
          width: 760,
          height: 760,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, rgba(16, 185, 129, 0.05) 45%, transparent 70%)',
          filter: 'blur(70px)',
          transform: `translate(${driftX}px, ${driftY}px)`,
        }}
      />

      {/* Soft Bottom-Right Indigo/Emerald Ambient Aura */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '4%',
          width: 820,
          height: 820,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 72%)',
          filter: 'blur(75px)',
          transform: `translate(${-driftX}px, ${-driftY}px)`,
        }}
      />
    </AbsoluteFill>
  );
};