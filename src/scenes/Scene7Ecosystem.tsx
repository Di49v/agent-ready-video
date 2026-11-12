import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ChapterCard } from '../components/ChapterCard';
import { FramedViewport } from '../components/FramedViewport';

export const Scene7Ecosystem:tsx = () => {};

export const Scene7Ecosystem: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0s - 1.5s (45 frames): Chapter Card */}
      <Sequence from={0} durationInFrames={45}>
        <ChapterCard
          stepNumber="05 · DEVELOPER ECOSPRING & SPONSORS"
          title="API-First, MCP & 5-Sponsor Architecture"
          subtitle="Trigger crash tests from CI via REST, export Postman collections, or test directly from your IDE via MCP."
          accentColor="#A855F7"
        />
      </Sequence>

      {/* 1.5s - 8s (195 frames): landingpage.mp4 (0:33 to 0:41) */}
      <Sequence from={45} durationInFrames={195}>
        <FramedViewport
          videoFile="landingpage.mp4"
          startFrom={990} // 33s
          endAt={1230}    // 41s
          playbackRate={1.0}
          stepBadge="05 · DELIVERABLES HUB"
          featureTitle="REST API • APIMatic SDKs • MCP Server • Postman • SVG Badges"
          sponsorBadge="PayPal • APIMatic • AG Grid • Channel3 • Render"
          accentColor="#A855F7"
          cameraKeyframes={[
            { frame: 0, scale: 1.0, x: 0, y: 0 },
            { frame: 60, scale: 1.18, x: 0, y: -30 },
            { frame: 140, scale: 1.22, x: 0, y: 25 },
            { frame: 190, scale: 1.0, x: 0, y: 0 },
          ]}
          captions={[
            {
              startFrame: 0,
              endFrame: 190,
              text: 'Everything is built API-first: use APIMatic-generated SDKs, our 5-tool MCP server',
              highlight: 'in your IDE, or export Postman collections and live SVG badges.',
            },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};