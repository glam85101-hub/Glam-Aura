'use client';
import FacialAnalysis from './FacialAnalysis';
import type { Features } from '../facial-analysis/FacialAnalysis';

export default function Page() {
  const features: Features = {
    faceShape: 'Oval',
    eyeShape: 'Almond',
    eyeColor: 'Brown',
    skinTone: 'Medium',
    undertone: 'Warm',
    lipShape: 'Full',
  };

  return <FacialAnalysis features={features} />;
}