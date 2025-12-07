// src/components/ParticleBackground.jsx
import React, { useState, useEffect } from 'react';

export default function ParticleBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getIntensity = () => {
    if (scrollProgress < 0.3) return 0.08;
    if (scrollProgress < 0.6) return 0.12;
    if (scrollProgress < 0.8) return 0.15;
    return 0.06;
  };

  const intensity = getIntensity();

  // Generate particles
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    speed: Math.random() * 2 + 0.5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            opacity: intensity,
            filter: `blur(${0.3 + (scrollProgress * 0.4)}px) saturate(${1 + (scrollProgress * 0.2)}) brightness(${0.7 + (scrollProgress * 0.3)})`
          }}
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="videos/particles-loop.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-gold-particles-floating-in-space-41985-large.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gold"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.3 * intensity,
              animation: `float ${particle.speed * 6}s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          />
        ))}
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-radial-gold opacity-30"></div>
      
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at ${50 + (scrollProgress * 20)}% ${30 + (scrollProgress * 40)}%, 
            transparent 0%, 
            rgba(0, 0, 0, ${0.3 + (scrollProgress * 0.4)}) 40%,
            rgba(0, 0, 0, ${0.7 + (scrollProgress * 0.3)}) 100%)`,
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Animated Glow Spots */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
          opacity: 0.3 * intensity,
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      
      <div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,100,255,0.03) 0%, transparent 70%)',
          opacity: 0.2 * intensity,
          animation: 'float 25s ease-in-out infinite reverse'
        }}
      />
      
      {/* Loading Fallback */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      )}
    </div>
  );
}
