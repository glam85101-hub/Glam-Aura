'use client';
import MakeupRecommendations from './MakeupRecommendations';
import type { Features } from './MakeupRecommendations';

export default function Page() {
  const features: Features = {
    faceShape: 'Oval',
    eyeShape: 'Almond',
    eyeColor: 'Brown',
    skinTone: 'Medium',
    undertone: 'Warm',
    lipShape: 'Full',
  };

  return <MakeupRecommendations features={features} />;
}
