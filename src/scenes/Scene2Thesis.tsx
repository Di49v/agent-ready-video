import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FramedViewport } from '../components/FramedViewport';

// 1. MAIN WRAPPER
export const Scene2Thesis: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0B0F19' }}>
      {/* Part A (0s - 6s / 180 frames): Thesis Slide with Sequential Cards */}
      <Sequence from={0} durationInFrames={180}>
        <ThesisComparisonSlide />
      </Sequence>

      {/* Part B (6s - 16s / 300 frames): Landing Page Hero & 4-Stage Pipeline */}
      <Sequence from={180} durationInFrames={300}>
        <FramedViewport
          videoFile="landingpage.mp4"
          startFrom={0}
          endAt={450} 
          playbackRate={1.5}
          stepBadge="00 · THE PLATFORM"
          featureTitle="4-Stage Checkout Crash-Test Pipeline"
          sponsorBadge="PayPal Sandbox v2 • Channel3 • AG Grid • APIMatic"
          accentColor="#10B981"
          cameraKeyframes={[
            { frame: 0, scale: 1.0, x: 0, y: 0 },
            { frame: 90, scale: 1.12, x: 0, y: 20 },
            { frame: 210, scale: 1.15, x: 0, y: -35 },
            { frame: 300, scale: 1.0, x: 0, y: 0 },
          ]}
          captions={[
            {
              startFrame: 0,
              endFrame: 145,
              text: 'AgentReady Lab sends 9 test AI shoppers into a store to deliberately trigger',
              highlight: 'retries, price edits, and network drops.',
            },
            {
              startFrame: 146,
              endFrame: 295,
              text: "It compares PayPal's payment records against the store's database—and",
              highlight: 'writes the code fix automatically.',
            },
          ]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

// 2. THE THESIS SLIDE
const ThesisComparisonSlide: React.FC = () => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame, [165, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A', 
        opacity,
        zIndex: 10,
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 0,
        }}
      />

      {/* Shared Static Header - Fixed to the top so it doesn't shift */}
      <div style={{ position: 'absolute', top: 100, width: '100%', zIndex: 12, display: 'flex', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 18, color: '#64748B', letterSpacing: 6, fontWeight: 700, textTransform: 'uppercase' }}>
          Why do AI orders go wrong?
        </div>
      </div>

      {/* Frame 0 to 90 (0s to 3s): PayPal Side */}
      <Sequence from={0} durationInFrames={90}>
        <PayPalFocus />
      </Sequence>

      {/* Frame 90 to 180 (3s to 6s): Store Side */}
      <Sequence from={90} durationInFrames={90}>
        <StoreFocus />
      </Sequence>
    </AbsoluteFill>
  );
};

// 3. MICRO COMPONENT: PayPal Side
const PayPalFocus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const yOffset = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 2, 
        opacity, 
        transform: `translateY(${100 - (yOffset * 100)}px)` 
      }}
    >
      <h2 style={{ fontSize: 72, fontWeight: 800, color: '#F8FAFC', margin: '0 0 80px 0', letterSpacing: '-1.5px' }}>
        PayPal protects the payment.
      </h2>

      {/* Scaled up to 1500px wide to fill the frame */}
      <div style={{ display: 'flex', width: 1500, gap: 100, alignItems: 'center' }}>
        {/* Left Side: Typography */}
        <div style={{ flex: 1 }}>
          <div style={{ color: '#94A3B8', fontFamily: 'monospace', fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
            01 / PAYMENT RAIL
          </div>
          <h3 style={{ fontSize: 44, fontWeight: 700, color: '#FFFFFF', margin: '0 0 24px 0', lineHeight: 1.2 }}>
            Flawless Security
          </h3>
          <p style={{ fontSize: 24, color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
            PayPal securely moves the money, verifies cards, and runs fraud checks. If asked to charge two orders, it executes the job perfectly.
          </p>
        </div>

        {/* Right Side: Mock Browser Window */}
        <div style={{ flex: 1.2, backgroundColor: '#1E293B', borderRadius: 20, border: '1px solid #334155', overflow: 'hidden', boxShadow: '0 35px 60px -15px rgba(0,0,0,0.5)' }}>
          <div style={{ height: 56, backgroundColor: '#0F172A', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#EF4444' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#F59E0B' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981' }} />
            <div style={{ marginLeft: 24, fontSize: 15, color: '#64748B', fontFamily: 'monospace', backgroundColor: '#1E293B', padding: '6px 20px', borderRadius: 6 }}>
              api.paypal.com/checkout
            </div>
          </div>
          <div style={{ padding: 60, display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
            <div style={{ width: '100%', backgroundColor: 'white', borderRadius: 16, padding: 40, border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: 20, marginBottom: 20 }}>
                <span style={{ color: '#0F172A', fontWeight: 800, fontSize: 24 }}>Transaction Approved</span>
                <span style={{ color: '#0F172A', fontWeight: 800, fontSize: 24 }}>$49.99</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#10B981', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: 18, fontWeight: 'bold' }}>✓</div>
                <span style={{ color: '#475569', fontSize: 20, fontWeight: 600 }}>Status: 201 Created</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 4. MICRO COMPONENT: Store Side
const StoreFocus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const yOffset = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  const opacity = interpolate(frame, [0, 15], [0, 1]);

  return (
    <AbsoluteFill 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 2, 
        opacity, 
        transform: `translateY(${100 - (yOffset * 100)}px)` 
      }}
    >
      <h2 style={{ fontSize: 72, fontWeight: 800, color: '#64748B', margin: '0 0 80px 0', letterSpacing: '-1.5px' }}>
        <span style={{ color: '#F8FAFC' }}>Who tests the store?</span>
      </h2>

      <div style={{ display: 'flex', width: 1500, gap: 100, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#94A3B8', fontFamily: 'monospace', fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
            02 / MERCHANT BACKEND
          </div>
          <h3 style={{ fontSize: 44, fontWeight: 700, color: '#FFFFFF', margin: '0 0 24px 0', lineHeight: 1.2 }}>
            Where Bugs Hide
          </h3>
          <p style={{ fontSize: 24, color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
            Stores forget safety keys on retries, trust <span style={{ color: '#FFFFFF', fontWeight: 600, borderBottom: '2px solid #CBD5E1' }}>manipulated prices</span>, or take money without shipping.
          </p>
        </div>

        <div style={{ flex: 1.2, backgroundColor: '#1E293B', borderRadius: 20, border: '1px solid #334155', overflow: 'hidden', boxShadow: '0 35px 60px -15px rgba(0,0,0,0.5)' }}>
          <div style={{ height: 56, backgroundColor: '#0F172A', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#EF4444' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#F59E0B' }} />
            <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981' }} />
            <div style={{ marginLeft: 24, fontSize: 15, color: '#64748B', fontFamily: 'monospace', backgroundColor: '#1E293B', padding: '6px 20px', borderRadius: 6 }}>
              merchant-admin.local/database
            </div>
          </div>
          <div style={{ padding: 60, display: 'flex', justifyContent: 'center', backgroundColor: '#1E293B' }}>
            <div style={{ width: '100%', backgroundColor: '#0F172A', borderRadius: 16, padding: 40, border: '1px solid #334155', boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: 20, marginBottom: 20 }}>
                <span style={{ color: '#94A3B8', fontWeight: 700, fontSize: 20, fontFamily: 'monospace' }}>DATABASE_RECORD</span>
                <span style={{ color: '#EF4444', fontWeight: 800, fontSize: 24 }}>$1.50</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                 <div style={{ color: '#64748B', fontFamily: 'monospace', fontSize: 18 }}>{'>'} Expected: $49.99</div>
                 <div style={{ color: '#EF4444', fontFamily: 'monospace', fontSize: 18 }}>{'>'} Error: Price mismatch detected on retry</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};