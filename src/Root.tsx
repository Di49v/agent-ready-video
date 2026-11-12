import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';

export const Root: React.FC = () => {
  return (
    <Composition
      id="CodeCovenVideo"
      component={MainVideo}
      durationInFrames={4530} // 2 mins 31 secs at 30fps
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

export const RemotionRoot = Root;