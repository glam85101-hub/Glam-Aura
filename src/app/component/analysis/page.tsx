'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, Eye, Smile, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import FacialAnalysis from '../facial-analysis/page';
import MakeupRecommendations from '../makeup-recommendations/page';
import Image from 'next/image';

// Types for facial features
interface Features {
  faceShape: string;
  eyeShape: string;
  eyeColor: string;
  skinTone: string;
  undertone: string;
  lipShape: string;
}

function AnalysisPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [facialFeatures, setFacialFeatures] = useState<Features | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
          setAnalysisComplete(false);
          setFacialFeatures(null);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive"
        });
      }
    }
  };

  const startAnalysis = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulated AI analysis
    setTimeout(() => {
      const generatedFeatures: Features = {
        faceShape: ['oval', 'round', 'square', 'heart', 'diamond'][Math.floor(Math.random() * 5)],
        eyeShape: ['almond', 'round', 'hooded', 'monolid', 'upturned'][Math.floor(Math.random() * 5)],
        eyeColor: ['brown', 'blue', 'green', 'hazel', 'gray'][Math.floor(Math.random() * 5)],
        skinTone: ['fair', 'light', 'medium', 'tan', 'deep'][Math.floor(Math.random() * 5)],
        lipShape: ['full', 'thin', 'heart', 'wide', 'bow'][Math.floor(Math.random() * 5)],
        undertone: ['warm', 'cool', 'neutral'][Math.floor(Math.random() * 3)]
      };

      setFacialFeatures(generatedFeatures);
      setIsAnalyzing(false);
      setAnalysisComplete(true);

      toast({
        title: "Analysis Complete! ✨",
        description: "Your facial features have been analyzed successfully"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2eceab] via-white to-[#4ea893] relative overflow-hidden">


      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Image Upload & Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Upload Section */}
            <div className="glass-effect rounded-3xl p-8 bg-white">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-black" />
                Upload Your Photo
              </h2>

              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-white/50 rounded-2xl p-8 text-center cursor-pointer hover:border-white transition-colors"
                >
                  <Upload className="w-12 h-12 text-black/80 mx-auto mb-4" />
                  <p className="text-black mb-2">Click to upload your photo</p>
                  <p className="text-black/70 text-sm">Supports JPG, PNG, and other image formats</p>
                </motion.div>

               {selectedImage && (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="relative rounded-2xl overflow-hidden"
  >
    <Image
      src={selectedImage}
      alt="Uploaded"
      width={800}   // ✅ set width
      height={256}  // ✅ set height (64 * 4 because Tailwind h-64 = 16rem = 256px)
      className="w-full h-64 object-cover"
      unoptimized   // ✅ allows blob/base64 without Next.js optimization
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
  </motion.div>
)}
                <Button
                  onClick={startAnalysis}
                  disabled={!selectedImage || isAnalyzing}
                  className="w-full bg-[#46c7ab] hover:bg-[#3bb199] text-black font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2  border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Sparkles className="w-5 h-5 mr-2" />
                  )}
                  {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                </Button>
              </div>
            </div>

            {/* Analysis Results */}
            <AnimatePresence>
              {facialFeatures && (
                <FacialAnalysis features={facialFeatures} />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Side - Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence>
              {analysisComplete && facialFeatures ? (
                <MakeupRecommendations features={facialFeatures} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-effect rounded-3xl p-8 text-center h-full flex flex-col justify-center bg-white"
                >
                  <div className="space-y-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 mx-auto bg-[#46c7ab] rounded-full flex items-center justify-center"
                    >
                      <Sparkles className="w-12 h-12 text-black" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-black">Ready for Analysis?</h3>
                    <p className="text-black/80">
                      Upload your photo and start the analysis to get personalized makeup recommendations
                    </p>

                    <div className="grid grid-cols-3 gap-4 mt-8">
                      {[
                        { icon: Eye, label: "Eye Analysis" },
                        { icon: Smile, label: "Lip Analysis" },
                        { icon: Heart, label: "Face Shape" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="bg-[#46c7ab] rounded-2xl p-4"
                        >
                          <item.icon className="w-8 h-8 text-black mx-auto mb-2" />
                          <p className="text-black text-sm">{item.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
