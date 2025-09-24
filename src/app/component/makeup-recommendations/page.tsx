'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Eye, Smile, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

// Type definitions
interface Features {
  faceShape: string;
  eyeShape: string;
  eyeColor: string;
  skinTone: string;
  undertone: string;
  lipShape: string;
}

interface MakeupRecommendationsProps {
  features: Features;
}

function MakeupRecommendations({ features }: MakeupRecommendationsProps) {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('foundation');

  const getRecommendations = () => {
    return {
      foundation: {
        icon: Palette,
        title: 'Foundation & Base',
        products: [
          {
            name: 'Perfect Match Foundation',
            shade:
              features.skinTone === 'fair'
                ? 'Porcelain'
                : features.skinTone === 'light'
                ? 'Ivory'
                : features.skinTone === 'medium'
                ? 'Beige'
                : features.skinTone === 'tan'
                ? 'Caramel'
                : 'Espresso',
            reason: `Perfect for your ${features.skinTone} skin tone with ${features.undertone} undertones`,
            image: 'Foundation bottle with perfect color match',
          },
          {
            name: 'Color Correcting Primer',
            shade:
              features.undertone === 'warm'
                ? 'Peach'
                : features.undertone === 'cool'
                ? 'Lavender'
                : 'Green',
            reason: `Balances your ${features.undertone} undertones beautifully`,
            image: 'Color correcting primer tube',
          },
        ],
      },
      eyes: {
        icon: Eye,
        title: 'Eye Makeup',
        products: [
          {
            name: 'Eyeshadow Palette',
            shade:
              features.eyeColor === 'brown'
                ? 'Golden Bronze'
                : features.eyeColor === 'blue'
                ? 'Warm Copper'
                : features.eyeColor === 'green'
                ? 'Plum & Berry'
                : features.eyeColor === 'hazel'
                ? 'Earth Tones'
                : 'Smoky Grays',
            reason: `Enhances your beautiful ${features.eyeColor} eyes`,
            image: 'Eyeshadow palette with complementary colors',
          },
          {
            name: 'Eyeliner Style',
            shade:
              features.eyeShape === 'almond'
                ? 'Classic Wing'
                : features.eyeShape === 'round'
                ? 'Extended Wing'
                : features.eyeShape === 'hooded'
                ? 'Thin Line'
                : features.eyeShape === 'monolid'
                ? 'Gradient Liner'
                : 'Dramatic Wing',
            reason: `Perfect technique for your ${features.eyeShape} eye shape`,
            image: 'Eyeliner application demonstration',
          },
        ],
      },
      lips: {
        icon: Smile,
        title: 'Lip Products',
        products: [
          {
            name: 'Lip Color',
            shade:
              features.undertone === 'warm'
                ? 'Coral Pink'
                : features.undertone === 'cool'
                ? 'Berry Red'
                : 'Rose Pink',
            reason: `Complements your ${features.undertone} undertones perfectly`,
            image: 'Lipstick in perfect shade',
          },
          {
            name: 'Lip Liner Technique',
            shade:
              features.lipShape === 'full'
                ? 'Natural Outline'
                : features.lipShape === 'thin'
                ? 'Slightly Overlined'
                : features.lipShape === 'heart'
                ? "Softened Cupid's Bow"
                : features.lipShape === 'wide'
                ? 'Rounded Corners'
                : 'Enhanced Curves',
            reason: `Enhances your naturally ${features.lipShape} lips`,
            image: 'Lip liner application technique',
          },
        ],
      },
      contour: {
        icon: Heart,
        title: 'Contour & Highlight',
        products: [
          {
            name: 'Contour Placement',
            shade:
              features.faceShape === 'oval'
                ? 'Light Contouring'
                : features.faceShape === 'round'
                ? 'Side Contouring'
                : features.faceShape === 'square'
                ? 'Soft Edges'
                : features.faceShape === 'heart'
                ? 'Jawline Focus'
                : 'Cheekbone Enhancement',
            reason: `Perfect technique for your ${features.faceShape} face shape`,
            image: 'Contour placement guide',
          },
          {
            name: 'Highlight Areas',
            shade:
              features.skinTone === 'fair'
                ? 'Pearl Glow'
                : features.skinTone === 'light'
                ? 'Champagne'
                : features.skinTone === 'medium'
                ? 'Golden'
                : features.skinTone === 'tan'
                ? 'Bronze Glow'
                : 'Deep Gold',
            reason: `Illuminates your ${features.skinTone} skin beautifully`,
            image: 'Highlighter application',
          },
        ],
      },
    };
  };

  const recommendations = getRecommendations();
  const categories = Object.keys(recommendations);

  const handleProductClick = (productName: string) => {
    toast({
      title: "🚧 Feature not implemented yet 🚀",
      description: `You clicked on ${productName}. Shopping integration coming soon!`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl p-8 h-full bg-white shadow-lg"
    >
      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-[#46c7ab]" />
        Your Makeup Recommendations
      </h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => {
          const CategoryIcon =
            recommendations[category as keyof typeof recommendations].icon;
          return (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-[#46c7ab] text-white hover:bg-[#3bb199]'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CategoryIcon className="w-4 h-4" />
              {recommendations[category as keyof typeof recommendations].title}
            </motion.button>
          );
        })}
      </div>

      {/* Product Recommendations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {recommendations[activeCategory as keyof typeof recommendations].products.map(
            (product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl p-6 cursor-pointer bg-[#f2faf8] border border-[#46c7ab] hover:shadow-md"
                onClick={() => handleProductClick(product.name)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-[#46c7ab] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Image
  src="https://images.unsplash.com/photo-1635865165118-917ed9e20936"
  alt={`${product.name} - ${product.shade}`}
  width={48}   // 👈 must provide width
  height={48}  // 👈 must provide height
  className="w-12 h-12 object-cover rounded-lg"
/>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black font-semibold mb-1">{product.name}</h3>
                    <p className="text-[#46c7ab] font-medium mb-2">{product.shade}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {product.reason}
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-[#e6f7f4] rounded-full flex items-center justify-center"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#46c7ab]" />
                  </motion.div>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </AnimatePresence>

      {/* Look Complete Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Button
          onClick={() =>
            toast({
              title: "🚧 Virtual Try-on Coming Soon 🚀",
              description: 'Virtual try-on feature will be available shortly!',
            })
          }
          className="w-full bg-[#46c7ab] hover:bg-[#3bb199] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Try Virtual Look
        </Button>
      </motion.div>

      {/* Confidence Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6 bg-[#f2faf8] rounded-2xl p-4 border border-[#46c7ab]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-black font-medium">Recommendation Match</span>
          <span className="text-[#46c7ab] font-bold">98%</span>
        </div>
        <div className="w-full bg-[#e6f7f4] rounded-full h-2">
          <motion.div
            className="bg-[#46c7ab] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '98%' }}
            transition={{ duration: 1, delay: 0.9 }}
          />
        </div>
        <p className="text-gray-600 text-xs mt-2">
          These recommendations are perfectly tailored to your unique features
        </p>
      </motion.div>
    </motion.div>
  );
}

export default MakeupRecommendations;