import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface CameraKeyframe {
  frame: number;
  scale: number;
  x: number;
  y: number;
}

export interface CaptionSegment {
  startFrame: number;
  endFrame: number;
  text: string;
  highlight?: string;
}

interface FramedViewportProps {
  videoFile: string;
  startFrom?: number;
  endAt?: number;
  playbackRate?: number;
  cropTopBrowserBar?: boolean;
  stepBadge: string;
  featureTitle: string;
  sponsorBadge: string;
  accentColor?: string;
  cameraKeyframes?: CameraKeyframe[]; // Accepted for prop compatibility, intentionally locked static
  captions?: CaptionSegment[];
  topRightCallout?: {
    text: string;
    subtext?: string;
    color: string;
  };
}

export const FramedViewport: React.FC<FramedViewportProps> = ({
  videoFile,
  startFrom = 0,
  endAt,
  playbackRate = 1,
  cropTopBrowserBar = true,
  stepBadge,
  featureTitle,
  sponsorBadge,
  accentColor = '#38BDF8',
  captions = [],
  topRightCallout,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const activeCaption = captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  return (
    <AbsoluteFill
      style={{
        padding: '26px 56px 28px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity,
        zIndex: 5,
      }}
    >
      {/* TOP-LEFT CANVAS-AI STYLE SECTION HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              padding: '3px 9px',
              borderRadius: 5,
              backgroundColor: `${accentColor}22`,
              border: `1px solid ${accentColor}66`,
              fontFamily: 'monospace',
              fontSize: 13,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: 1,
            }}
          >
            {stepBadge}
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#E2E8F0',
              letterSpacing: '-0.3px',
            }}
          >
            {featureTitle}
          </span>
        </div>

        {topRightCallout ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: `1px solid ${topRightCallout.color}66`,
              padding: '5px 14px',
              borderRadius: 8,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: topRightCallout.color,
              }}
            />
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 800,
                color: topRightCallout.color,
                letterSpacing: 0.5,
              }}
            >
              {topRightCallout.text}
            </span>
          </div>
        ) : (
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: '#64748B',
              letterSpacing: 1,
            }}
          >
            SANDBOX PINNED • api-m.sandbox.paypal.com
          </div>
        )}
      </div>

      {/* LOCKED STATIC 16:9 VIEWPORT (Zero Zoom / Zero Pan Wobble — Exact CanvasAI Frame) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          borderRadius: 14,
          overflow: 'hidden',
          backgroundColor: '#090D16',
          border: '1px solid rgba(148, 163, 184, 0.18)',
          boxShadow:
            '0 24px 60px -12px rgba(0, 0, 0, 0.85), 0 0 32px rgba(56, 189, 248, 0.06)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: 1,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#090D16',
          }}
        >
          <OffthreadVideo
            src={staticFile(videoFile)}
            startFrom={startFrom}
            endAt={endAt}
            playbackRate={playbackRate}
            muted
            style={{
              width: '100%',
              height: cropTopBrowserBar ? '109%' : '100%',
              marginTop: cropTopBrowserBar ? '-4.2%' : '0%',
              objectFit: 'cover',
            }}
          />

          {/* Clean CanvasAI-Style Subtitle Overlay at Bottom Center */}
          {activeCaption && (
            <div
              style={{
                position: 'absolute',
                bottom: 18,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(5, 8, 20, 0.92)',
                border: '1px solid rgba(148, 163, 184, 0.22)',
                padding: '10px 26px',
                borderRadius: 10,
                maxWidth: '84%',
                textAlign: 'center',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(10px)',
                zIndex: 20,
              }}
            >
              <span
                style={{
                  fontSize: 21,
                  fontWeight: 500,
                  color: '#F8FAFC',
                  lineHeight: 1.35,
                }}
              >
                {activeCaption.text}{' '}
                {activeCaption.highlight && (
                  <span style={{ color: accentColor, fontWeight: 700 }}>
                    {activeCaption.highlight}
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM CANVAS-AI TELEMETRY BAR (Left: Feature Tag | Right: Monospace Tech Stack Pill) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          padding: '0 2px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            border: '1px solid rgba(148, 163, 184, 0.16)',
            padding: '7px 16px',
            borderRadius: 8,
          }}
        >
          <span
            style={{
              padding: '2px 7px',
              borderRadius: 4,
              backgroundColor: `${accentColor}25`,
              color: accentColor,
              fontFamily: 'monospace',
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {stepBadge.split(' ')[0]}
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#F1F5F9',
            }}
          >
            {featureTitle}
          </span>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            border: '1px solid rgba(148, 163, 184, 0.16)',
            padding: '7px 16px',
            borderRadius: 8,
            fontFamily: 'monospace',
            fontSize: 13,
            fontWeight: 500,
            color: '#94A3B8',
          }}
        >
          {sponsorBadge}
        </div>
      </div>
    </AbsoluteFill>
  );
};