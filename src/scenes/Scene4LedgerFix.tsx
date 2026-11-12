import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ChapterCard } from '../components/ChapterCard';
import { FramedViewport } from '../components/FramedViewport';

export const Scene4LedgerFix: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0s - 2s (60 frames): Chapter Card 02 */}
      <Sequence from={0} durationInFrames={60}>
        <ChapterCard
          stepNumber="02 · DUAL-LEDGER PROOF & APIMATIC FIX ENGINE"
          title="Comparing PayPal's Books Against the Store's"
          subtitle="AG Grid ranks every violation while our APIMatic-grounded Fix Engine writes the exact 10-line code patch."
          accentColor="#38BDF8"
        />
      </Sequence>

      {/* 2s - 25s (690 frames): crashtest.mp4 (0:11.5 to 0:18.5 slowed to 0.30x) */}
      <Sequence from={60} durationInFrames={690}>
        <FramedViewport
          videoFile="crashtest.mp4"
          startFrom={345} // 11.5s
          endAt={555}     // 18.5s (7 seconds of dense drawer & patch inspection)
          playbackRate={0.30} // Stretches 7s into 23s so the JSON diff & Git patch are crystal clear
          stepBadge="02 · DUAL-LEDGER RECONCILER"
          featureTitle="Side-by-Side PayPal vs. Store Diff & 10-Line Code Patch"
          sponsorBadge="AG Grid Quartz • APIMatic Context Plugin & SDK v2.29"
          accentColor="#38BDF8"
          topRightCallout={{
            text: 'PAYPAL: $240 vs STORE: $120',
            subtext: 'Double Capture Proven by Cart ID Join',
            color: '#F59E0B',
          }}
          cameraKeyframes={[
            // Start focused on the AG Grid Results Matrix at bottom
            { frame: 0, scale: 1.24, x: 0, y: -130 },
            { frame: 130, scale: 1.24, x: 0, y: -130 },
            // As Dual-Ledger Drawer opens on the right, pan & zoom into the JSON comparison
            { frame: 210, scale: 1.38, x: -195, y: 20 },
            { frame: 410, scale: 1.38, x: -195, y: 20 },
            // Pan down inside the drawer to spotlight the 10-Line APIMatic Unified Git Patch
            { frame: 490, scale: 1.42, x: -195, y: -125 },
            { frame: 650, scale: 1.42, x: -195, y: -125 },
            { frame: 690, scale: 1.1, x: 0, y: 0 },
          ]}
          captions={[
            {
              startFrame: 0,
              endFrame: 195,
              text: 'Our Reconciler grades 6 strict rules inside AG Grid—flagging every order where',
              highlight: 'money was lost or records disagreed.',
            },
            {
              startFrame: 196,
              endFrame: 445,
              text: "Clicking a red row opens the Dual-Ledger Drawer: PayPal's records show",
              highlight: '$240 captured, while the store only recorded $120.',
            },
            {
              startFrame: 446,
              endFrame: 685,
              text: 'Below, our Fix Engine—grounded with the APIMatic PayPal Context Plugin—',
              highlight: 'explains the bug in plain English and writes a 10-line code patch.',
            },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};