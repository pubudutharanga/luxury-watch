// components/3DWatchView.jsx - FIXED
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function WatchModel({ rotationSpeed = 0.5, ...props }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * rotationSpeed
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <>
      <Float
        speed={2}
        rotationIntensity={1}
        floatIntensity={2}
      >
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.1 : 1}
          {...props}
        >
          <cylinderGeometry args={[1.2, 1.2, 0.3, 64]} />
          <meshPhysicalMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0}
            envMapIntensity={1}
          />
          
          <mesh position={[0, 0, 0.16]}>
            <cylinderGeometry args={[1.1, 1.1, 0.02, 64]} />
            <meshPhysicalMaterial
              color="#000000"
              metalness={0.5}
              roughness={0.2}
              clearcoat={1}
            />
          </mesh>
          
          <mesh position={[0, 0, 0.18]}>
            <torusGeometry args={[1.15, 0.05, 16, 100]} />
            <meshPhysicalMaterial
              color="#FFD700"
              metalness={1}
              roughness={0.1}
              envMapIntensity={2}
            />
          </mesh>
          
          <mesh position={[1.1, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
            <meshPhysicalMaterial
              color="#D4AF37"
              metalness={1}
              roughness={0.2}
            />
          </mesh>
        </mesh>
      </Float>
      
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
    </>
  )
}

export default function InteractiveWatchView() {
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        className="rounded-3xl"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <WatchModel rotationSpeed={rotationSpeed} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={rotationSpeed * 2}
            minDistance={3}
            maxDistance={10}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white hover:bg-black/80 transition-colors"
          >
            {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Speed:</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-32 accent-gold"
            />
            <span className="text-sm text-gold">{rotationSpeed.toFixed(1)}x</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-white/50 mb-1">Interactive 3D Model</div>
          <div className="text-sm text-white">Drag to rotate • Scroll to zoom</div>
        </div>
      </div>
      
      <div className="absolute top-6 right-6">
        <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Real-time 3D • WebGL
          </div>
        </div>
      </div>
    </div>
  )
}