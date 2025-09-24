   
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

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
  return (
    <section className="relative text-gray-600 body-font bg-black">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 3], fov: 60 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 3, 2]} intensity={1} />
          <WavePlane />
          <Particles />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div
        className="relative z-10 container px-5 py-20 mx-auto"
        data-aos="fade-up"
      >
        {/* Heading */}
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black">
            <span className="text-white">Personal</span> Styling
          </h1>
          <p className="mt-4 text-lg text-[#444] max-w-2xl mx-auto">
            Our AI analyzes your facial features, skin tone and
            recommend clothing styles, colors, jewelry, and accessories that
            enhance your look.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          className="flex flex-wrap sm:-m-4 -mx-4 -mb-8 -mt-4 md:space-y-0 space-y-6"
          data-aos="zoom-in"
        >
          {[
            {
              title: "Smart Color Matching",
              desc: "Get suggestions for colors that complement your skin tone",
              icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
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
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 md:w-1/3 flex flex-col text-center items-center transform transition-transform duration-500 hover:scale-105 hover:rotate-1 hover:shadow-xl bg-white rounded-2xl shadow-md"
            >
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#5af1d0] mb-5 flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  {item.title}
                </h2>
                <p className="leading-relaxed text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}