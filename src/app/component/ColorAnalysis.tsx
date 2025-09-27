"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";
import Link from "next/link";

// Wavy Plane Component (Background)
function WavePlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const clock = new THREE.Clock();

  useFrame(() => {
    const time = clock.getElapsedTime();
    const position = meshRef.current.geometry.attributes.position;
    const array = position.array as Float32Array;

    for (let i = 0; i < array.length; i += 3) {
      array[i + 2] =
        Math.sin(array[i] * 0.3 + time) * 0.2 +
        Math.cos(array[i + 1] * 0.3 + time) * 0.2;
    }
    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[10, 10, 64, 64]} />
      <meshStandardMaterial
        color={"#46c7ab"}
        emissive={"#5af1d0"}
        emissiveIntensity={0.3}
        roughness={0.4}
        metalness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating Particles (Background)
function Particles() {
  const particles = useRef<THREE.Points>(null!);
  const count = 2000;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    particles.current.rotation.y += 0.0005;
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#5af1d0" size={0.03} />
    </points>
  );
}

export default function ColorAnalysis() {
  const features = [
  {
    title: "Smart Color Matching",
    desc: "Get suggestions for colors that complement your skin tone",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    href: "/component/skin-analyzer", // your page route
  },
  {
    title: "Outfit Checker",
    desc: "Get AI-Powered suggestions for Personalized outfit recommendations for every occasion.",
    icon: (
      <>
        <circle cx={6} cy={6} r={3} />
        <circle cx={6} cy={18} r={3} />
        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
      </>
    ),
    href: "/component/outfit", // your page route
  },
  {
    title: "Makeup Suggestions",
    desc: "Snap a selfie and get instant makeup product, shade, and style suggestions.",
    icon: (
      <>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx={12} cy={7} r={4} />
      </>
    ),
    href: "/component/makeup", // your page route
  },
];

  return (
    <section className="relative text-gray-600 body-font bg-black overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Canvas camera={{ position: [0, 1.5, 3], fov: 60 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 3, 2]} intensity={1} />
          <WavePlane />
          <Particles />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container px-4 sm:px-6 lg:px-20 py-16 mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl mt-20 sm:text-4xl md:text-5xl font-bold text-white">
            Personal Styling
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Our AI analyzes your facial features, skin tone, and recommends clothing styles, colors, jewelry, and accessories that enhance your look.
          </p>
        </div>

        {/* Feature Cards */}
       <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
  {features.map((item, index) => (
    <Link key={index} href={item.href} className="w-full sm:w-[48%] lg:w-[30%] max-w-sm px-2 sm:px-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col items-center text-center h-full cursor-pointer">
        <div className="w-16 h-16 sm:w-20 sm:h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#5af1d0] mb-4 sm:mb-5">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24">
            {item.icon}
          </svg>
        </div>
        <h2 className="text-gray-900 text-base sm:text-lg font-medium mb-2 sm:mb-3">{item.title}</h2>
        <p className="text-gray-700 text-sm sm:text-base">{item.desc}</p>
      </div>
    </Link>
  ))}
</div>
      </div>
    </section>
  );
}
