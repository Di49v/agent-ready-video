import React from 'react';
import { AbsoluteFill } from 'remotion';
import { FramedViewport } from '../components/FramedViewport';

export const Scene5HardenedRerun: React.FC = () => {
  return (
    <AbsoluteFill>
      <FramedViewport
        videoFile="crashtest.mp4"
        startFrom={555} // 18.5s
        endAt={855}     // 28.5s (10 seconds of hardened rerun & score recovery)
        playbackRate={0.62}
        stepBadge="03 · RED-TO-GREEN RERUN"
        featureTitle="Guard Middleware Protected Re-Run (95/100 PASS)"
        sponsorBadge="AgentReady Guard Middleware • RFC 9457 Problem Details"
        accentColor="#10B981"
        topRightCallout={{
          text: 'HARDENED SHOP: 95 / 100 (PASS)',
          subtext: 'Zero Double Charges • \$0.00 Leakage',
          color: '#10B981',
        }}
        cameraKeyframes={[
          // Focus on the Apply Patch & Re-Run button
          { frame: 0, scale: 1.15, x: 0, y: 15 },
          { frame: 90, scale: 1.25, x: -20, y: -45 },
          // Watch the swarm lanes turn emerald green and the score jump to 95/100
          { frame: 180, scale: 1.28, x: 20, y: -60 },
          { frame: 320, scale: 1.35, x: 0, y: 30 },
          { frame: 450, scale: 1.0, x: 0, y: 0 },
        ]}
        captions={[
          {
            startFrame: 0,
            endFrame: 160,
            text: 'With one click, we apply the patch and re-run the exact same attack',
            highlight: 'against Hardened Shop.',
          },
          {
            startFrame: 161,
            endFrame: 340,
            text: 'Protected by our Guard middleware, duplicate retries replay idempotently and',
            highlight: 'price hacks are blocked instantly.',
          },
          {
            startFrame: 341,
            endFrame: 475,
            text: "The safety score jumps from 18 to 95 out of 100—catching",
            highlight: 'all 12 seeded bugs with zero false alarms.',
          },
        ]}
      />
    </AbsoluteFill>
  );
};