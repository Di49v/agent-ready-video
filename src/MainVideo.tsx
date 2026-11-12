import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { CanvasGridBackground } from './components/CanvasGridBackground';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Thesis } from './scenes/Scene2Thesis';
import { Scene3SwarmWire } from './scenes/Scene3SwarmWire';
import { Scene4LedgerFix } from './scenes/Scene4LedgerFix';
import { Scene5HardenedRerun } from './scenes/Scene5HardenedRerun';
import { Scene6JudgeArena } from './scenes/Scene6JudgeArena';
import { Scene7Ecosystem } from './scenes/Scene7Ecosystem';
import { Scene8Outro } from './scenes/Scene8Outro';

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        color: 'white',
        fontFamily: 'sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* GLOBAL DARK ARCHITECTURAL GRID BACKGROUND */}
      <CanvasGridBackground />

      {/* 1. HOOK & STORY (0s - 18s / 540 frames) */}
      <Sequence from={0} durationInFrames={540}>
        <Scene1Hook />
      </Sequence>

      {/* 2. THESIS & LANDING PAGE (18s - 34s / 480 frames) */}
      <Sequence from={540} durationInFrames={480}>
        <Scene2Thesis />
      </Sequence>

      {/* 3. SWARM & CHANNEL3 WIRE INSPECTOR (34s - 60s / 780 frames) */}
      <Sequence from={1020} durationInFrames={780}>
        <Scene3SwarmWire />
      </Sequence>

      {/* 4. DUAL-LEDGER RECONCILER & APIMATIC FIX ENGINE (60s - 85s / 750 frames) */}
      <Sequence from={1800} durationInFrames={750}>
        <Scene4LedgerFix />
      </Sequence>

      {/* 5. HARDENED RERUN & SCORE RECOVERY (85s - 101s / 480 frames) */}
      <Sequence from={2550} durationInFrames={480}>
        <Scene5HardenedRerun />
      </Sequence>

      {/* 6. INTERACTIVE JUDGE ARENA (101s - 119s / 540 frames) */}
      <Sequence from={3030} durationInFrames={540}>
        <Scene6JudgeArena />
      </Sequence>

      {/* 7. ECOSYSTEM & 5 SPONSORS (119s - 127s / 240 frames) */}
      <Sequence from={3570} durationInFrames={240}>
        <Scene7Ecosystem />
      </Sequence>

      {/* 8. OUTRO & CLOSING (127s - 136s / 270 frames) */}
      <Sequence from={3810} durationInFrames={270}>
        <Scene8Outro />
      </Sequence>
    </AbsoluteFill>
  );
};