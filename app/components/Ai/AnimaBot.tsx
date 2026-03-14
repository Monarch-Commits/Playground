'use client';

import Lottie from 'lottie-react';
import animaBot from '@/app/public/animations/animabot.json';

type AnimaBotProps = {
  width?: number;
  height?: number;
  loop?: boolean;
};

export default function AiBot({
  width = 70,
  height = 70,
  loop = true,
}: AnimaBotProps) {
  return (
    <div style={{ width, height }} data-animabot="true">
      <Lottie animationData={animaBot} loop={loop} autoplay />
    </div>
  );
}
