'use client';

import Lottie from 'lottie-react';
import animaBot from '@/public/animations/AnimaBot.json';

type AnimaBotProps = {
  width?: number;
  height?: number;
  loop?: boolean;
};

export default function Animabot({
  width = 70,
  height = 70,
  loop = true,
}: AnimaBotProps) {
  return (
    <div style={{ width, height }}>
      <Lottie
        animationData={animaBot}
        loop={loop}
        autoplay
      />
    </div>
  );
}