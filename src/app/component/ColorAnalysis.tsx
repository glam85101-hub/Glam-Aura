"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import Link from "next/link";

// Floating Particles (Background)
function Particles() {
  const particles = useRef<THREE.Points>(null!);
  const count = 1500;

  const circleTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    particles.current.rotation.y += 0.0003;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        color="#5af1d0"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.6}
        alphaTest={0.5}
      />
    </points>
  );
}

export default function ColorAnalysis() {
  const features = [
  {
    title: "Smart Color Matching",
    desc: "Discover colors that naturally complement your unique skin tone and features.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    href: "/component/skin-analyzer",
  },
  {
    title: "Personalized Outfits",
    desc: "AI-driven recommendations for outfits that match your style and the occasion.",
    icon: (
      <>
        <circle cx={6} cy={6} r={3} />
        <circle cx={6} cy={18} r={3} />
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
      </>
    ),
    href: "/component/outfit",
  },
  {
    title: "Makeup Insights",
    desc: "Instant suggestions for makeup shades and styles based on a simple selfie.",
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx={12} cy={7} r={4} />
      </>
    ),
    href: "/component/makeup",
  },
];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-brand-dark overflow-hidden py-20">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 2, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Particles />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 max-w-4xl mx-auto" data-aos="fade-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
            Elevate Your <span className="text-brand-mint italic">Personal Style</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Our advanced AI analyzes your features to curate a wardrobe and palette as unique as you are.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/component/face-analyzer-front" className="px-8 py-4 bg-brand-teal text-white rounded-full font-bold text-lg shadow-xl shadow-brand-teal/20 hover:bg-brand-mint hover:text-brand-dark transition-all transform hover:-translate-y-1">
              Start Free Analysis
            </Link>
            <Link href="/component/about" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1">
              Learn How It Works
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 bg-brand-mint/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transition-all duration-500 group-hover:bg-white/10 group-hover:border-brand-mint/50 group-hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 text-brand-mint flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} className="w-8 h-8" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-brand-mint transition-colors">{item.title}</h2>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}