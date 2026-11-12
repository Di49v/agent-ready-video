import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface CameraKeyframe {
  frame: number;
  scale: number;
  x: number; // percentage or px offset
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
  startFrom?: number; // in frames (30fps)
  endAt?: number;
  playbackRate?: number;
  cropTopBrowserBar?: boolean;
  stepBadge: string;
  featureTitle: string;
  sponsorBadge: string;
  accentColor?: string;
  cameraKeyframes?: CameraKeyframe[];
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
  accentColor = '#10b981',
  cameraKeyframes,
  captions = [],
  topRightCallout,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const containerEnter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 110 },
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Interpolate smooth camera zoom & pan across keyframes
  let camScale = 1;
  let camX = 0;
  let camY = 0;

  if (cameraKeyframes && cameraKeyframes.length >= 2) {
    const frames = cameraKeyframes.map((k) => k.frame);
    const scales = cameraKeyframes.map((k) => k.scale);
    const xs = cameraKeyframes.map((k) => k.x);
    const ys = cameraKeyframes.map((k) => k.y);

    camScale = interpolate(frame, frames, scales, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    camX = interpolate(frame, frames, xs, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    camY = interpolate(frame, frames, ys, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  const activeCaption = captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  return (
    <AbsoluteFill
      style={{
        padding: '28px 54px 34px 54px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: fadeOut,
        zIndex: 5,
      }}
    >
      {/* MAIN ROUNDED APP VIEWPORT (CanvasAI style) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '85%',
          borderRadius: 22,
          overflow: 'hidden',
          backgroundColor: '#0B0E14',
          border: '1.5px solid rgba(255, 255, 255, 0.12)',
          boxShadow:
            '0 30px 70px -15px rgba(0, 0, 0, 0.85), 0 0 40px rgba(16, 185, 129, 0.08)',
          transform: `scale(${interpolate(containerEnter, [0, 1], [0.96, 1])})`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Clean Custom Window Header replacing the raw Chrome URL bar */}
        <div
          style={{
            height: 40,
            backgroundColor: '#0F141C',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#F43F5E' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span
              style={{
                marginLeft: 12,
                fontFamily: 'monospace',
                fontSize: 13,
                color: '#94A3B8',
                backgroundColor: 'rgba(255,255,255,0.04)',
                padding: '3px 12px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              https://agentreadylab.render.com/simulate
            </span>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
              color: accentColor,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            ● PAYPAL SANDBOX PINNED (api-m.sandbox.paypal.com)
          </div>
        </div>

        {/* Video Container with Top-Bar Crop + Dynamic Camera Zoom/Pan */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#090D16',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${camScale}) translate(${camX}px, ${camY}px)`,
              transformOrigin: 'center center',
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
                // Crops out the top 82px Chrome tabs & bookmark bar automatically
                height: cropTopBrowserBar ? '111%' : '100%',
                marginTop: cropTopBrowserBar ? '-4.6%' : '0%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Optional Floating Top-Right Callout Pill (e.g., "18/100 FAIL -> 95/100 PASS") */}
          {topRightCallout && (
            <div
              style={{
                position: 'absolute',
                top: 22,
                right: 24,
                backgroundColor: 'rgba(9, 13, 22, 0.92)',
                border: `2px solid ${topRightCallout.color}`,
                borderRadius: 16,
                padding: '12px 22px',
                boxShadow: `0 12px 35px rgba(0,0,0,0.75), 0 0 25px ${topRightCallout.color}44`,
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                zIndex: 15,
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: topRightCallout.color,
                  fontFamily: 'monospace',
                  letterSpacing: 0.5,
                }}
              >
                {topRightCallout.text}
              </div>
              {topRightCallout.subtext && (
                <div
                  style={{
                    fontSize: 14,
                    color: '#CBD5E1',
                    fontWeight: 600,
                    marginTop: 3,
                  }}
                >
                  {topRightCallout.subtext}
                </div>
              )}
            </div>
          )}

          {/* Synced Plain-English Subtitle Overlay at Bottom of Viewport */}
          {activeCaption && (
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(7, 10, 18, 0.92)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                padding: '14px 32px',
                borderRadius: 16,
                maxWidth: '82%',
                textAlign: 'center',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 20,
              }}
            >
              <span
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                  color: '#F8FAFC',
                  lineHeight: 1.35,
                }}
              >
                {activeCaption.text}{' '}
                {activeCaption.highlight && (
                  <span style={{ color: accentColor, fontWeight: 800 }}>
                    {activeCaption.highlight}
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM TELEMETRY FOOTER BAR (Exact CanvasAI Bottom-Left & Bottom-Right Badges) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          marginTop: 14,
        }}
      >
        {/* Bottom-Left Feature Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '12px 24px',
            borderRadius: 14,
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: accentColor,
              boxShadow: `0 0 12px ${accentColor}`,
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              fontWeight: 800,
              color: accentColor,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {stepBadge}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#F8FAFC',
            }}
          >
            {featureTitle}
          </span>
        </div>

        {/* Bottom-Right Sponsor Proof Pill */}
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            border: `1px solid ${accentColor}55`,
            padding: '12px 24px',
            borderRadius: 14,
            fontFamily: 'monospace',
            fontSize: 16,
            fontWeight: 700,
            color: '#E2E8F0',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          }}
        >
          {sponsorBadge}
        </div>
      </div>
    </AbsoluteFill>
  );
};