import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

export const Scene8Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(frame, [255, 270], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut, backgroundColor: '#000' }}>
      <OffthreadVideo
        src={staticFile('outro.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Bottom Closing Callout */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(7, 10, 18, 0.94)',
          border: '2px solid #10B981',
          padding: '18px 42px',
          borderRadius: 20,
          textAlign: 'center',
          boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(16, 185, 129, 0.3)',
          backdropFilter: 'blur(14px)',
        }}
      >
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 16,
            color: '#10B981',
            fontWeight: 800,
            letterSpacing: 3,
            marginBottom: 6,
            textTransform: 'uppercase',
          }}
        >
          LIVE URL & GITHUB REPO READY
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, color: '#F8FAFC' }}>
          https://agentreadylab.render.com • GitHub: agent-ready
        </div>
      </div>
    </AbsoluteFill>
  );
};