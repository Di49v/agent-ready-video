import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';

export const MainVideo = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#020617', color: 'white', fontFamily: 'sans-serif', overflow: 'hidden'}}>
      
      {/* Uncomment once voiceover.mp3 is inside public/ */}
      {/* <Audio staticFile('voiceover.mp3')} /> */}

      {/* GLOBAL BACKGROUND SPHERES (VISIBLE ACROSS ENTIRE VIDEO) */}
      <GlobalFloatingSpheres />

      {/* 1. LOGO INTRO (Frames 0 to 180 / 6 seconds) */}
      <Sequence from={0} durationInFrames={180}>
        <FuturisticLogoIntro />
      </Sequence>

      {/* 2. CUSTOM STORY VIDEO (Frames 180 to 750 / 19 seconds) */}
      <Sequence from={180} durationInFrames={570}>
        <VideoWithCaption
          videoFile="story.mp4"
          label="The Autonomous Shopping Hazard & Double-Charge Scenario"
        />
      </Sequence>

      {/* 3. SOLUTION / LANDING PAGE VIDEO (Frames 750 to 2010 / 42 seconds) */}
      <Sequence from={750} durationInFrames={1260}>
        <VideoWithCaption
          videoFile="landingpage.mp4"
          label="AgentReady — Compliance & Resilience Firewall"
        />
      </Sequence>

      {/* 4. CRASH TEST VIDEO (Frames 2010 to 2850 / 28 seconds) */}
      <Sequence from={2010} durationInFrames={840}>
        <VideoWithCaption
          videoFile="crashtest.MP4"
          label="9 Adversarial Personas: Naive Shop vs Hardened Shop"
        />
      </Sequence>

      {/* 5. JUDGE ARENA VIDEO (Frames 2850 to 3390 / 18 seconds) */}
      <Sequence from={2850} durationInFrames={540}>
        <VideoWithCaption
          videoFile="judge-arena.mp4"
          label="Live Judge Arena & Real-Time AG Grid Telemetry"
        />
      </Sequence>

      {/* 6. SPONSOR INTEGRATIONS & ECOSYSTEM (Frames 3390 to 4740 / 45 seconds) */}
      <Sequence from={3390} durationInFrames={1350}>
        <SponsorsSequenceHub />
      </Sequence>

      {/* 7. TECH STACK (Frames 4740 to 5100 / 12 seconds) */}
      <Sequence from={4740} durationInFrames={360}>
        <TechStackVerticalSequence />
      </Sequence>

      {/* 8. CUSTOM OUTRO VIDEO (Frames 5100 onwards) */}
      <Sequence from={5100} durationInFrames={450}>
        <VideoWithCaption
          videoFile="outro.mp4"
          label="AgentReady Lab — Thank You For Watching"
        />
      </Sequence>

    </AbsoluteFill>
  );
};

// --- GLOBAL BACKGROUND FLOATING SPHERES ---
const GlobalFloatingSpheres = () => {
  const frame = useCurrentFrame();
  const floatY1 = Math.sin(frame / 35) * 60;
  const floatX1 = Math.cos(frame / 40) * 70;
  const floatY2 = Math.cos(frame / 30) * 55;
  const floatX2 = Math.sin(frame / 32) * 50;

  return (
    <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'hidden'}}>
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.25) 0%, rgba(14, 165, 233, 0.05) 60%, rgba(0,0,0,0) 80%)',
        filter: 'blur(45px)',
        transform: `translate(${floatX1}px, ${floatY1}px)`,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.22) 0%, rgba(99, 102, 241, 0.05) 60%, rgba(0,0,0,0) 80%)',
        filter: 'blur(55px)',
        transform: `translate(${-floatX1}px, ${floatY2}px)`,
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '15%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(244, 63, 94, 0.18) 0%, rgba(234, 179, 8, 0.05) 60%, rgba(0,0,0,0) 80%)',
        filter: 'blur(45px)',
        transform: `translate(${floatY2}px, ${-floatX2}px)`,
      }} />
    </div>
  );
};

// --- 1. POPPING LOGO INTRO WITH FOREGROUND GRADIENT SPHERES ---
const FuturisticLogoIntro = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: {damping: 9, stiffness: 120},
  });

  const logoOpacity = interpolate(frame, [0, 20, 150, 180], [0, 1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'radial-gradient(circle at 50% 40%, #0c1222 0%, #020617 75%, #000000 100%)',
        overflow: 'hidden',
        opacity: logoOpacity,
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: `scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          maxWidth: '1300px',
          padding: '0 40px',
        }}
      >
        <div style={{
          color: '#38bdf8',
          fontSize: 26,
          fontFamily: 'monospace',
          letterSpacing: 6,
          textTransform: 'uppercase',
          marginBottom: 18,
          textShadow: '0 0 25px rgba(56,189,248,0.7)',
          fontWeight: 700
        }}>
          The Code Coven Presents
        </div>

        <div style={{
          fontSize: 104,
          fontWeight: 900,
          background: 'linear-gradient(135deg, #ffffff 15%, #38bdf8 45%, #a855f7 75%, #f43f5e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 50px rgba(56,189,248,0.6)) drop-shadow(0 0 25px rgba(168,85,247,0.5))',
          letterSpacing: '-2px',
          lineHeight: 1.05,
          marginBottom: 20,
        }}>
          AgentReady
        </div>

        <div style={{
          color: '#cbd5e1',
          fontSize: 32,
          lineHeight: 1.4,
          maxWidth: '1000px',
          textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          fontWeight: 600
        }}>
          Securing Autonomous Commerce Against Double-Charges & Backend Failures
        </div>
      </div>
    </AbsoluteFill>
  );
};


// --- SPONSOR INTEGRATIONS HUB (VERTICAL CENTERED LAYOUT) ---
const SponsorsSequenceHub = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: 'transparent', color: 'white', fontFamily: 'sans-serif', zIndex: 1}}>
      {frame < 120 && <SponsorIntroScene />}
      {frame >= 120 && frame < 390 && <SponsorPostmanScene />}
      {frame >= 390 && frame < 630 && <SponsorApimaticScene />}
      {frame >= 630 && frame < 870 && <SponsorAgGridScene />}
      {frame >= 870 && frame < 1110 && <SponsorChannel3Scene />}
      {frame >= 1110 && <SponsorRenderScene />}
    </AbsoluteFill>
  );
};

const SponsorIntroScene = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, 100, 120], [0, 1, 1, 0]);
  const scale = spring({frame, fps: 30, config: {damping: 12}});

  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 80, textAlign: 'center', opacity, zIndex: 2}}>
      <h1 style={{fontSize: 82, fontWeight: 900, color: '#f8fafc', letterSpacing: '3px', margin: '0 0 20px 0', transform: `scale(${scale})`, background: 'linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
        SPONSOR ECOSYSTEM
      </h1>
      <p style={{color: '#94a3b8', fontSize: 32, maxWidth: 1000, margin: 0, fontWeight: 500}}>
        Industry-leading platforms powering AgentReady's resilience & validation pipeline.
      </p>
    </AbsoluteFill>
  );
};

const SponsorPostmanScene = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 120;
  const opacity = interpolate(localFrame, [0, 15, 255, 270], [0, 1, 1, 0]);
  const progress = interpolate(localFrame, [30, 90], [0, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const showCheck = localFrame > 90;
  const cardScale = spring({frame: localFrame, fps: 30, config: {damping: 14}});

  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', padding: '40px 80px', alignItems: 'center', justifyContent: 'center', opacity, zIndex: 2}}>
      <div style={{width: '100%', maxWidth: '1050px', display: 'flex', flexDirection: 'column', gap: '24px', transform: `scale(${cardScale})`}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '28px', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '24px 36px', borderRadius: '24px', border: '2px solid rgba(255, 108, 55, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)'}}>
          <div style={{width: '84px', height: '84px', borderRadius: '22px', backgroundColor: '#ff6c37', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 42, fontWeight: 900, boxShadow: '0 0 30px rgba(255, 108, 55, 0.5)', flexShrink: 0}}>P</div>
          <div>
            <div style={{color: '#38bdf8', fontSize: 16, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '3px'}}>Sponsor Highlight #1</div>
            <h2 style={{fontSize: 52, fontWeight: 900, color: '#f8fafc', margin: '4px 0 0 0', lineHeight: 1.1}}>Postman API Hub</h2>
          </div>
        </div>
        <div style={{backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: 20, padding: '28px 36px', border: '2px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 10, display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>⚡</span> How we used it:
          </div>
          <div style={{fontSize: 19, color: '#e2e8f0', lineHeight: 1.5, fontWeight: 500}}>
            Used across the entire project to send requests, test APIs, check responses, and identify problems[cite: 3]. Endpoints are packaged for developers to execute rigorous local testing[cite: 3].
          </div>
        </div>
        <div style={{backgroundColor: '#0f172a', borderRadius: 20, border: '2px solid #334155', padding: '26px 36px', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{display: 'flex', gap: '14px', marginBottom: '18px', alignItems: 'center'}}>
            <div style={{backgroundColor: '#10b981', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontWeight: 800, fontSize: '15px'}}>POST</div>
            <div style={{flex: 1, backgroundColor: '#020617', border: '1px solid #475569', borderRadius: '8px', padding: '10px 16px', color: '#38bdf8', fontFamily: 'monospace', fontSize: '15px'}}>https://api.agentready.sandbox/v1/verify-payment</div>
          </div>
          <div style={{backgroundColor: '#020617', borderRadius: '14px', padding: '20px 24px', color: '#f8fafc', fontFamily: 'monospace', border: '1px solid #1e293b'}}>
            <div style={{fontSize: '15px', color: '#94a3b8', marginBottom: '10px'}}>Executing Postman Collection Test Suite...</div>
            <div style={{width: '100%', height: '6px', backgroundColor: '#1e293b', borderRadius: '3px', overflow: 'hidden', marginBottom: '14px'}}>
              <div style={{width: `${progress}%`, height: '100%', backgroundColor: '#38bdf8', transition: 'width 0.1s linear'}} />
            </div>
            {showCheck ? (
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', color: '#4ade80', fontSize: '16px', fontWeight: 'bold'}}>
                <span>✓</span> Test Passed: 200 OK — Double charge prevented & verified[cite: 3].
              </div>
            ) : (
              <div style={{color: '#38bdf8', fontSize: '15px'}}>Sending request payload & validating ledger response...</div>
            )}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SponsorApimaticScene = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 390;
  const opacity = interpolate(localFrame, [0, 15, 225, 240], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', padding: '40px 80px', alignItems: 'center', justifyContent: 'center', opacity, zIndex: 2}}>
      <div style={{width: '100%', maxWidth: '1050px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '28px', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '24px 36px', borderRadius: '24px', border: '2px solid rgba(2, 132, 199, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)'}}>
          <div style={{width: '84px', height: '84px', borderRadius: '22px', backgroundColor: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 38, fontWeight: 900, boxShadow: '0 0 30px rgba(2, 132, 199, 0.5)', flexShrink: 0}}>AM</div>
          <div>
            <div style={{color: '#38bdf8', fontSize: 16, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '3px'}}>Sponsor Highlight #2</div>
            <h2 style={{fontSize: 52, fontWeight: 900, color: '#f8fafc', margin: '4px 0 0 0', lineHeight: 1.1}}>APIMatic SDK & Context</h2>
          </div>
        </div>
        <div style={{backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: 20, padding: '28px 36px', border: '2px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 10, display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>⚡</span> How we used it:
          </div>
          <div style={{fontSize: 19, color: '#e2e8f0', lineHeight: 1.5, fontWeight: 500}}>
            Provided the typed client wrapper and Context Plugin to ground LLM code fixes in official specs[cite: 3], preventing hallucinations during automated remediation.
          </div>
        </div>
        <div style={{backgroundColor: '#0f172a', borderRadius: 20, padding: '32px 36px', color: '#f8fafc', border: '2px solid #334155', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontFamily: 'monospace', fontSize: '19px', lineHeight: 1.8, color: '#e2e8f0'}}>
            <span style={{color: '#f43f5e'}}>from</span> apimatic_core <span style={{color: '#f43f5e'}}>import</span> APIClient<br/>
            client = MerchantClient(access_token=<span style={{color: '#a855f7'}}>"sandbox_key"</span>)<br/>
            response = client.verify_transaction_ledger()
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SponsorAgGridScene = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 630;
  const opacity = interpolate(localFrame, [0, 15, 225, 240], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', padding: '40px 80px', alignItems: 'center', justifyContent: 'center', opacity, zIndex: 2}}>
      <div style={{width: '100%', maxWidth: '1050px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '28px', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '24px 36px', borderRadius: '24px', border: '2px solid rgba(16, 185, 129, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)'}}>
          <div style={{width: '84px', height: '84px', borderRadius: '22px', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 38, fontWeight: 900, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)', flexShrink: 0}}>AG</div>
          <div>
            <div style={{color: '#38bdf8', fontSize: 16, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '3px'}}>Sponsor Highlight #3</div>
            <h2 style={{fontSize: 52, fontWeight: 900, color: '#f8fafc', margin: '4px 0 0 0', lineHeight: 1.1}}>AG Grid Quartz</h2>
          </div>
        </div>
        <div style={{backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: 20, padding: '28px 36px', border: '2px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 10, display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>⚡</span> How we used it:
          </div>
          <div style={{fontSize: 19, color: '#e2e8f0', lineHeight: 1.5, fontWeight: 500}}>
            Rendered high-performance 9-lane swarm telemetry in real time[cite: 3] with batched asynchronous row transactions and custom conditional status renderers.
          </div>
        </div>
        <div style={{backgroundColor: '#0f172a', borderRadius: 20, border: '2px solid #334155', padding: '28px 36px', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontWeight: 800, color: '#f8fafc', marginBottom: '16px', fontSize: '20px'}}>Live Judge Telemetry Grid</div>
          <div style={{display: 'flex', backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '12px 16px', borderRadius: '10px', color: '#38bdf8', fontWeight: 800, marginBottom: '10px', fontSize: '15px'}}>
            <span style={{flex: 2}}>Test Persona</span><span style={{flex: 2}}>Status</span><span style={{flex: 1}}>Score</span>
          </div>
          <div style={{display: 'flex', padding: '12px 16px', borderBottom: '1px solid #334155', color: '#cbd5e1', fontSize: '16px', fontWeight: 500}}>
            <span style={{flex: 2}}>Double-Charge Bot</span><span style={{flex: 2, color: '#10b981', fontWeight: 800}}>Blocked</span><span style={{flex: 1, fontWeight: 700}}>100/100</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SponsorChannel3Scene = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 870;
  const opacity = interpolate(localFrame, [0, 15, 225, 240], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', padding: '40px 80px', alignItems: 'center', justifyContent: 'center', opacity, zIndex: 2}}>
      <div style={{width: '100%', maxWidth: '1050px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '28px', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '24px 36px', borderRadius: '24px', border: '2px solid rgba(139, 92, 246, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)'}}>
          <div style={{width: '84px', height: '84px', borderRadius: '22px', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 38, fontWeight: 900, boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)', flexShrink: 0}}>C3</div>
          <div>
            <div style={{color: '#38bdf8', fontSize: 16, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '3px'}}>Sponsor Highlight #4</div>
            <h2 style={{fontSize: 52, fontWeight: 900, color: '#f8fafc', margin: '4px 0 0 0', lineHeight: 1.1}}>Channel3 Catalog API</h2>
          </div>
        </div>
        <div style={{backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: 20, padding: '28px 36px', border: '2px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 10, display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>⚡</span> How we used it:
          </div>
          <div style={{fontSize: 19, color: '#e2e8f0', lineHeight: 1.5, fontWeight: 500}}>
            Supplied real-world e-commerce product listings to test ambiguous variant handling and adversarial prompt-injection descriptions.
          </div>
        </div>
        <div style={{backgroundColor: '#0f172a', borderRadius: 20, border: '2px solid #334155', padding: '28px 36px', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontWeight: 800, color: '#f8fafc', marginBottom: '16px', fontSize: '20px'}}>Channel3 Catalog Integration</div>
          <div style={{backgroundColor: '#1e293b', padding: '22px 28px', borderRadius: '14px', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{fontWeight: 800, color: '#f8fafc', fontSize: '18px'}}>Running Shoes S8</div>
            <div style={{color: '#38bdf8', fontWeight: 'bold', fontSize: '22px'}}>$80.00</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SponsorRenderScene = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 1110;
  const opacity = interpolate(localFrame, [0, 15, 225, 240], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', padding: '40px 80px', alignItems: 'center', justifyContent: 'center', opacity, zIndex: 2}}>
      <div style={{width: '100%', maxWidth: '1050px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '28px', backgroundColor: 'rgba(15, 23, 42, 0.9)', padding: '24px 36px', borderRadius: '24px', border: '2px solid rgba(14, 165, 233, 0.4)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)'}}>
          <div style={{width: '84px', height: '84px', borderRadius: '22px', backgroundColor: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 38, fontWeight: 900, boxShadow: '0 0 30px rgba(14, 165, 233, 0.5)', flexShrink: 0}}>R</div>
          <div>
            <div style={{color: '#38bdf8', fontSize: 16, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '3px'}}>Sponsor Highlight #5</div>
            <h2 style={{fontSize: 52, fontWeight: 900, color: '#f8fafc', margin: '4px 0 0 0', lineHeight: 1.1}}>Render Cloud Hosting</h2>
          </div>
        </div>
        <div style={{backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: 20, padding: '28px 36px', border: '2px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontSize: 20, fontWeight: 800, color: '#38bdf8', marginBottom: 10, display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span>⚡</span> How we used it:
          </div>
          <div style={{fontSize: 19, color: '#e2e8f0', lineHeight: 1.5, fontWeight: 500}}>
            Hosted our FastAPI backend and Next.js frontend with zero-downtime render.yaml blueprint deployments[cite: 3], eliminating cold starts during judge evaluations.
          </div>
        </div>
        <div style={{backgroundColor: '#0f172a', borderRadius: 20, padding: '28px 36px', color: '#f8fafc', border: '2px solid #334155', boxShadow: '0 15px 30px rgba(0,0,0,0.4)'}}>
          <div style={{fontFamily: 'monospace', fontSize: '17px', lineHeight: 1.8, color: '#e2e8f0'}}>
            services:<br/>
            &nbsp;&nbsp;- type: web<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;name: agentready-backend<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;env: python<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;buildCommand: <span style={{color: '#a855f7'}}>"pip install -r requirements.txt"</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};


// --- TECH STACK: VERTICAL NODES WITH LARGER ICON-ONLY SIDE BADGES ---
const TechStackVerticalSequence = () => {
  const frame = useCurrentFrame();
  const titleOpacity = interpolate(frame, [0, 15, 65, 80], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const nodesOpacity = interpolate(frame, [70, 85], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const techNodes = [
    {area: "Frontend", title: "Next.js 16 • React 19 • TypeScript", desc: "AG Grid for data-heavy live telemetry views and SSE updates."},
    {area: "Backend / API", title: "FastAPI • Python • Uvicorn", desc: "Asynchronous HTTP backend with SQLAlchemy & asyncpg."},
    {area: "Database", title: "PostgreSQL (Supabase)", desc: "Dual-ledger reconciliation tracking test runs and orders."},
    {area: "AI & Tools", title: "Gemini • PayPal Sandbox • Channel3", desc: "Language test personas and mock commerce records."},
    {area: "MCP & SDK", title: "Node.js • TypeScript • Zod", desc: "Exposes crash-test workflows with a typed client SDK."},
    {area: "Deployment", title: "Render & GitHub Actions", desc: "Hosted Python backend and Node frontend with automated checks."}
  ];

  const sideBadges = [
    {symbol: "⚛️", color: "#61dafb", top: "18%", left: "3%", delay: 0},
    {symbol: "⚡", color: "#009688", top: "40%", left: "2.5%", delay: 2},
    {symbol: "🐘", color: "#336791", top: "62%", left: "3%", delay: 4},
    {symbol: "🟩", color: "#5fa04e", top: "82%", left: "3.5%", delay: 6},
    {symbol: "▲", color: "#ffffff", top: "18%", right: "3%", delay: 5},
    {symbol: "🐍", color: "#3776ab", top: "40%", right: "2.5%", delay: 7},
    {symbol: "TS", color: "#3178c6", top: "62%", right: "3%", delay: 1},
    {symbol: "⚡", color: "#3ecf8e", top: "82%", right: "3.5%", delay: 3},
  ];

  const adjustedFrame = Math.max(0, frame - 80);
  const activeIndex = Math.floor(adjustedFrame / 45) % techNodes.length;

  return (
    <AbsoluteFill style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '40px 100px', background: 'transparent', overflow: 'hidden', zIndex: 1}}>
      <div style={{position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1}}>
        {sideBadges.map((badge, idx) => {
          const floatOffset = Math.sin((frame + badge.delay * 15) / 25) * 12;
          return (
            <div
              key={idx}
              style={{
                position: 'absolute',
                top: badge.top,
                left: badge.left,
                right: badge.right,
                transform: `translateY(${floatOffset}px)`,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: `2px solid ${badge.color}77`,
                boxShadow: `0 0 35px ${badge.color}44`,
                width: '74px',
                height: '74px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                opacity: nodesOpacity,
                color: badge.color,
                fontSize: '32px',
                fontWeight: 900,
                fontFamily: 'monospace',
              }}
            >
              {badge.symbol}
            </div>
          );
        })}
      </div>

      {frame < 85 && (
        <div style={{position: 'absolute', opacity: titleOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10}}>
          <div style={{color: '#38bdf8', fontSize: 32, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 8, marginBottom: 20}}>System Architecture</div>
          <h2 style={{fontSize: 72, fontWeight: 900, margin: '0 0 20px 0', background: 'linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Core Stack & Resilience Flow</h2>
        </div>
      )}
      {frame >= 70 && (
        <div style={{opacity: nodesOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1200px', zIndex: 10}}>
          <div style={{color: '#38bdf8', fontSize: 24, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: 6, marginBottom: 14}}>Architecture & Tech Stack</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', marginTop: '10px'}}>
            {techNodes.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div key={idx} style={{
                  backgroundColor: isActive ? 'rgba(15, 23, 42, 0.98)' : 'rgba(15, 23, 42, 0.65)',
                  border: isActive ? '2px solid #38bdf8' : '1px solid rgba(51, 65, 85, 0.6)',
                  borderRadius: 20, padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  boxShadow: isActive ? '0 0 40px rgba(56, 189, 248, 0.4)' : 'none',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)', transition: 'all 0.3s ease', opacity: isActive ? 1 : 0.65,
                }}>
                  <div style={{color: isActive ? '#38bdf8' : '#94a3b8', fontSize: 18, fontFamily: 'monospace', fontWeight: 800, width: '25%', letterSpacing: '1px'}}>{item.area}</div>
                  <div style={{width: '75%'}}>
                    <div style={{fontSize: 24, fontWeight: 800, color: '#f8fafc', marginBottom: 6}}>{item.title}</div>
                    <div style={{color: '#94a3b8', fontSize: 16, lineHeight: 1.5}}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};


// --- REUSABLE COMPONENTS ---
const VideoWithCaption = ({videoFile, label}: {videoFile: string; label: string}) => (
  <AbsoluteFill style={{padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 1}}>
    <div style={{width: '100%', height: '88%', borderRadius: 20, overflow: 'hidden', border: '2px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'}}>
      <OffthreadVideo src={staticFile(videoFile)} style={{width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#000'}} />
    </div>
    <div style={{marginTop: 20, backgroundColor: '#0f172a', border: '1px solid #334155', padding: '10px 28px', borderRadius: 999, fontSize: 24, fontWeight: 600, color: '#38bdf8'}}>{label}</div>
  </AbsoluteFill>
);