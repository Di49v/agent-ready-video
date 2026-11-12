import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';

export const Root = () => {
  return (
    <Composition
      id="CodeCovenVideo"
      component={MainVideo}
      durationInFrames={4950} // 2 mins 45 secs at 30fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

// This matches what index.ts is looking for:
export const RemotionRoot = Root;