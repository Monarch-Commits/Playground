'use client';

import Lottie from 'lottie-react';


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
        animationData="/animations/AnimaBot.json" 
        loop={loop}
        autoplay
      />
    </div>
  );
}