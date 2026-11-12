import React, { useState } from 'react';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ChapterCard } from '../components/ChapterCard';
import { FramedViewport } from '../components/FramedViewport';

interface SponsorSpec {
  id: string;
  order: string;
  name: string;
  logoFile: string;
  tagline: string;
  accentColor: string;
  plainLine1: string;
  plainLine2: string;
  deliverablePill: string;
  metricsPill: string;
}

const SPONSORS: SponsorSpec[] = [
  {
    id: 'paypal',
    order: '01 / 05',
    name: 'PayPal Sandbox v2',
    logoFile: 'sponsors/paypal.png',
    tagline: 'THE GROUND-TRUTH PAYMENT RAIL & LEDGER',
    accentColor: '#38BDF8',
    plainLine1:
      'Powers all 9 AI shopper checkouts with real unattended card captures, refunds, voids, webhook verification, and sandbox chargebacks.',
    plainLine2:
      'Serves as our authoritative "Bank Ground Truth" so the Reconciler can catch every dollar where the merchant store database drifted.',
    deliverablePill: 'Orders v2 • Captures • Webhooks • Disputes API',
    metricsPill: 'Join Key: purchase_units[0].custom_id = cart_id',
  },
  {
    id: 'apimatic',
    order: '02 / 05',
    name: 'APIMatic',
    logoFile: 'sponsors/apimatic.png',
    tagline: 'SDK GENERATION & FIX-ENGINE GROUNDING',
    accentColor: '#10B981',
    plainLine1:
      'Grounds our Fix Engine with the APIMatic Context Plugin for PayPal and AsyncPaypalClient v2.29 so our AI never hallucinates fake SDK methods.',
    plainLine2:
      'Auto-generates our typed @agent-ready/sdk from our OpenAPI 3.1 spec so developers can trigger crash tests from CI or MCP.',
    deliverablePill: 'PayPal SDK v2.29 • Context Plugin • @agent-ready/sdk',
    metricsPill: 'Zero Hallucinated PayPal Methods in 10-Line Diffs',
  },
  {
    id: 'channel3',
    order: '03 / 05',
    name: 'Channel3',
    logoFile: 'sponsors/channel3.png',
    tagline: 'LIVE E-COMMERCE PRODUCT & VARIANT CATALOG',
    accentColor: '#F59E0B',
    plainLine1:
      'Stocks both Naive Shop and Hardened Shop with real products, authoritative server prices, and multi-size/color variants in under 50ms.',
    plainLine2:
      'Enables realistic tests for variant confusion (The Misreader) and hidden prompt-injection traps inside product descriptions.',
    deliverablePill: 'Live /v1/search Catalog • 300s TTL Cache',
    metricsPill: 'Authoritative Server Price Lock (<50ms Lookup)',
  },
  {
    id: 'aggrid',
    order: '04 / 05',
    name: 'AG Grid',
    logoFile: 'sponsors/aggrid.png',
    tagline: 'REAL-TIME TELEMETRY & DUAL-LEDGER MATRIX',
    accentColor: '#EC4899',
    plainLine1:
      'Streams live Server-Sent Events from our 9 AI personas and Judge Arena directly into high-frequency rows with instant cell-flash alerts.',
    plainLine2:
      'Ranks all 6 commerce rules by financial severity and powers 1-click drilldowns into the side-by-side PayPal vs. Store JSON diff.',
    deliverablePill: 'AG Grid Quartz Dark • applyTransactionAsync',
    metricsPill: 'enableCellChangeFlash • 6-Rule Severity Sorting',
  },
  {
    id: 'render',
    order: '05 / 05',
    name: 'Render',
    logoFile: 'sponsors/render.png',
    tagline: 'CLOUD ORCHESTRATION & LIVE WEBHOOK INGESTION',
    accentColor: '#A855F7',
    plainLine1:
      'Hosts our FastAPI swarm engine and public HTTPS webhook listener so PayPal Sandbox can deliver real-time payment notifications.',
    plainLine2:
      'Keeps the judge demo warm via /healthz and orchestrates our 2-wave batched buyer concurrency without hitting rate limits.',
    deliverablePill: 'render.yaml Blueprint • Live /webhooks/paypal',
    metricsPill: 'Zero Cold Starts • 2-Wave Semaphore (5 + 4 Buyers)',
  },
];

export const Scene7Ecosystem: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 0s - 2s (60 frames): Fixed Chapter Card */}
      <Sequence from={0} durationInFrames={60}>
        <ChapterCard
          stepNumber="05 · DEVELOPER ECOSYSTEM & SPONSORS"
          title="API-First, MCP & 5-Sponsor Architecture"
          subtitle="How PayPal, APIMatic, Channel3, AG Grid, and Render power every layer of AgentReady Lab."
          accentColor="#10B981"
        />
      </Sequence>


      {/* 6s - 23s (510 frames): Dynamic 5-Sponsor Spotlight Sequence (102 frames / 3.4s per sponsor) */}
      <Sequence from={60} durationInFrames={510}>
        <SponsorArchitectureStage />
      </Sequence>
    </AbsoluteFill>
  );
};

const SponsorArchitectureStage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const framesPerSponsor = 102; // 5 * 102 = 510 frames (17 seconds total)
  const activeIndex = Math.min(
    SPONSORS.length - 1,
    Math.floor(frame / framesPerSponsor)
  );
  const localFrame = frame - activeIndex * framesPerSponsor;
  const activeSponsor = SPONSORS[activeIndex];

  // Spring animations for the active sponsor spotlight card
  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const cardY = interpolate(cardSpring, [0, 1], [36, 0]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.95, 1]);
  const cardOpacity = interpolate(
    localFrame,
    [0, 10, framesPerSponsor - 10, framesPerSponsor],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Overall stage fade out at very end
  const stageFade = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Moving data pulse across the pipeline bus
  const pulseProgress = (frame * 1.8) % 100;

  return (
    <AbsoluteFill
      style={{
        padding: '44px 72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: stageFade,
        zIndex: 10,
      }}
    >
      {/* TOP HEADER & 5-NODE LIVE ARCHITECTURE PIPELINE */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 22,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: 16,
                fontWeight: 800,
                color: activeSponsor.accentColor,
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              ● INTEGRAL SPONSOR ARCHITECTURE ({activeSponsor.order})
            </div>
            <h2
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: '#F8FAFC',
                margin: 0,
                letterSpacing: '-1px',
              }}
            >
              How Each Partner Powers <span style={{ color: '#10B981' }}>AgentReady Lab</span>
            </h2>
          </div>

          <div
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: `1.5px solid ${activeSponsor.accentColor}`,
              fontFamily: 'monospace',
              fontSize: 16,
              fontWeight: 800,
              color: '#F8FAFC',
              boxShadow: `0 0 25px ${activeSponsor.accentColor}33`,
            }}
          >
            ACTIVE LAYER: {activeSponsor.name.toUpperCase()}
          </div>
        </div>

        {/* 5-NODE CONNECTED DATA BUS */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            padding: '18px 24px',
            borderRadius: 20,
            backgroundColor: 'rgba(11, 15, 25, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Animated Background Data Line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 60,
              right: 60,
              height: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              transform: 'translateY(-50%)',
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '28%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${activeSponsor.accentColor}, transparent)`,
                transform: `translateX(${pulseProgress * 3.5}%)`,
              }}
            />
          </div>

          {SPONSORS.map((s, idx) => {
            const isCurrent = idx === activeIndex;
            const isPast = idx < activeIndex;
            return (
              <div
                key={s.id}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 14,
                  backgroundColor: isCurrent
                    ? 'rgba(15, 23, 42, 0.98)'
                    : 'rgba(9, 13, 22, 0.92)',
                  border: isCurrent
                    ? `2px solid ${s.accentColor}`
                    : isPast
                    ? `1.5px solid ${s.accentColor}66`
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isCurrent
                    ? `0 0 28px ${s.accentColor}44`
                    : 'none',
                  transform: isCurrent ? 'scale(1.04)' : 'scale(1)',
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    backgroundColor: isCurrent
                      ? `${s.accentColor}22`
                      : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${s.accentColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'monospace',
                    fontSize: 15,
                    fontWeight: 900,
                    color: s.accentColor,
                    flexShrink: 0,
                  }}
                >
                  0{idx + 1}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: isCurrent ? '#F8FAFC' : '#94A3B8',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      color: isCurrent ? s.accentColor : '#64748B',
                    }}
                  >
                    {isCurrent ? '● ACTIVE SPOTLIGHT' : isPast ? '✓ VERIFIED' : 'STANDBY'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER STAGE: ACTIVE SPONSOR SPOTLIGHT CARD */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          flex: 1,
          margin: '26px 0',
          borderRadius: 28,
          backgroundColor: 'rgba(13, 18, 28, 0.95)',
          border: `2px solid ${activeSponsor.accentColor}`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.85), 0 0 60px ${activeSponsor.accentColor}26`,
          padding: '42px 54px',
          display: 'flex',
          alignItems: 'center',
          gap: 54,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Animated Radial Glow Inside Card */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${activeSponsor.accentColor}28 0%, transparent 70%)`,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* LEFT COLUMN: SPONSOR LOGO BOX + ORDER BADGE */}
        <div
          style={{
            width: 340,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 28px',
            borderRadius: 24,
            backgroundColor: 'rgba(7, 10, 18, 0.9)',
            border: `1.5px solid ${activeSponsor.accentColor}66`,
            boxShadow: `inset 0 0 30px ${activeSponsor.accentColor}15`,
          }}
        >
          <SponsorLogoWithFallback
            logoFile={activeSponsor.logoFile}
            name={activeSponsor.name}
            accentColor={activeSponsor.accentColor}
          />

          <div
            style={{
              marginTop: 22,
              padding: '6px 18px',
              borderRadius: 999,
              backgroundColor: `${activeSponsor.accentColor}18`,
              border: `1px solid ${activeSponsor.accentColor}`,
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 800,
              color: activeSponsor.accentColor,
              letterSpacing: 2,
            }}
          >
            SPONSOR #{activeIndex + 1}
          </div>
        </div>

        {/* RIGHT COLUMN: PLAIN-ENGLISH 2-LINE EXPLANATION & IMPACT PILLS */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              fontWeight: 800,
              color: activeSponsor.accentColor,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            {activeSponsor.tagline}
          </div>

          <h3
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: '#F8FAFC',
              margin: '0 0 22px 0',
              letterSpacing: '-1.5px',
              lineHeight: 1.08,
            }}
          >
            {activeSponsor.name}
          </h3>

          {/* Line 1: How we used it */}
          <p
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: '#F1F5F9',
              lineHeight: 1.42,
              margin: '0 0 16px 0',
            }}
          >
            {activeSponsor.plainLine1}
          </p>

          {/* Line 2: Why it was integral */}
          <p
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: '#94A3B8',
              lineHeight: 1.42,
              margin: '0 0 28px 0',
            }}
          >
            {activeSponsor.plainLine2}
          </p>

          {/* Bottom Technical Proof Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: `1px solid ${activeSponsor.accentColor}88`,
                fontFamily: 'monospace',
                fontSize: 16,
                fontWeight: 700,
                color: '#F8FAFC',
              }}
            >
              ⚡ {activeSponsor.deliverablePill}
            </div>
            <div
              style={{
                padding: '10px 20px',
                borderRadius: 12,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(255,255,255,0.15)',
                fontFamily: 'monospace',
                fontSize: 16,
                fontWeight: 700,
                color: activeSponsor.accentColor,
              }}
            >
              ✓ {activeSponsor.metricsPill}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PROGRESS BAR & VOICEOVER CAPTION */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(11, 15, 25, 0.92)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '14px 28px',
          borderRadius: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: activeSponsor.accentColor,
              boxShadow: `0 0 12px ${activeSponsor.accentColor}`,
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 15,
              fontWeight: 800,
              color: '#E2E8F0',
              letterSpacing: 1,
            }}
          >
            5-SPONSOR FULL-STACK INTEGRATION • ZERO MOCK LOCK-IN
          </span>
        </div>

        {/* 5 Dot Progress Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {SPONSORS.map((s, i) => (
            <div
              key={s.id}
              style={{
                width: i === activeIndex ? 42 : 12,
                height: 10,
                borderRadius: 999,
                backgroundColor:
                  i === activeIndex ? s.accentColor : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SponsorLogoWithFallback: React.FC<{
  logoFile: string;
  name: string;
  accentColor: string;
}> = ({ logoFile, name, accentColor }) => {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <Img
        src={staticFile(logoFile)}
        onError={() => setImgError(true)}
        style={{
          maxWidth: 240,
          maxHeight: 110,
          objectFit: 'contain',
        }}
      />
    );
  }

  // Automatic high-craft vector fallback if the PNG file isn't in public/sponsors/ yet
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 110,
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: '#F8FAFC',
          letterSpacing: '-1px',
          textAlign: 'center',
        }}
      >
        {name.split(' ')[0]}
      </div>
      <div
        style={{
          marginTop: 6,
          width: 48,
          height: 4,
          borderRadius: 2,
          backgroundColor: accentColor,
        }}
      />
    </div>
  );
};