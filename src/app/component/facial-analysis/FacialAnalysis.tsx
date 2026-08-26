'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Palette, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-is-mobile';

// ✅ Export the interface
export interface Features {
  faceShape: string;
  eyeShape: string;
  eyeColor: string;
  skinTone: string;
  undertone: string;
  lipShape: string;
}

interface FacialAnalysisProps {
  features: Features;
}

export default function FacialAnalysis({ features }: FacialAnalysisProps) {
  const isMobile = useIsMobile();
  const analysisData = [
    {
      icon: Heart,
      label: 'Face Shape',
      value: features.faceShape,
      description: `Your ${features.faceShape} face shape is beautifully balanced`,
    },
    {
      icon: Eye,
      label: 'Eye Shape',
      value: features.eyeShape,
      description: `${features.eyeShape} eyes with ${features.eyeColor} color`,
    },
    {
      icon: Palette,
      label: 'Skin Tone',
      value: features.skinTone,
      description: `${features.skinTone} skin with ${features.undertone} undertones`,
    },
    {
      icon: User,
      label: 'Lip Shape',
      value: features.lipShape,
      description: `Beautiful ${features.lipShape} lip shape`,
    },
  ];

  return (
    <motion.div
      initial={isMobile ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
        <Eye className="w-6 h-6 text-[#46c7ab]" />
        Facial Analysis Results
      </h2>

      <div className="space-y-4">
        {analysisData.map((item, index) => (
          <motion.div
            key={index}
            initial={isMobile ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#46c7ab] rounded-2xl p-4 hover:bg-[#3bb199] transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#3bb199] rounded-xl flex items-center justify-center">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{item.label}</span>
                  <span className="text-white font-semibold capitalize">{item.value}</span>
                </div>
                <p className="text-white text-sm">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confidence Score */}
      <motion.div
        initial={isMobile ? {} : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-[#46c7ab] rounded-2xl p-4 border border-[#3bb199]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-black font-medium">Analysis Confidence</span>
          <span className="text-white font-bold">94%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-[#3bb199] h-2 rounded-full"
            initial={isMobile ? {} : { width: 0 }}
            animate={{ width: '94%' }}
            transition={{ duration: 1, delay: 0.7 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}