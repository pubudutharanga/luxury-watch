// src/components/ExplodedView.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExplodedView() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLabels, setShowLabels] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReassembling, setIsReassembling] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const components = [
    { 
      id: 'bezel', 
      name: 'Ceramic Bezel', 
      desc: '120-click unidirectional',
      icon: '◇',
      timeIn: 1.2,
      timeOut: 6.8,
      color: '#d4af37'
    },
    { 
      id: 'crystal', 
      name: 'Sapphire Crystal', 
      desc: 'Anti-reflective coating',
      icon: '⬭',
      timeIn: 1.5,
      timeOut: 6.5,
      color: '#98c1d9'
    },
    { 
      id: 'dial', 
      name: 'Guilloché Dial', 
      desc: 'Hand-finished sunray',
      icon: '◉',
      timeIn: 1.8,
      timeOut: 6.2,
      color: '#d4af37'
    },
    { 
      id: 'hands', 
      name: 'Sword Hands', 
      desc: 'Luminous BGW9',
      icon: '↻',
      timeIn: 2.1,
      timeOut: 5.9,
      color: '#d4af37'
    },
    { 
      id: 'movement', 
      name: 'Swiss Movement', 
      desc: 'ETA 2824-2 automatic',
      icon: '⚙',
      timeIn: 2.4,
      timeOut: 5.6,
      color: '#d4af37'
    },
    { 
      id: 'caseback', 
      name: 'Exhibition Caseback', 
      desc: 'Screw-down, 5 ATM',
      icon: '⭕',
      timeIn: 2.7,
      timeOut: 5.3,
      color: '#d4af37'
    }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      video.loop = true;
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration && video.currentTime > video.duration / 2) {
        setIsReassembling(true);
      } else {
        setIsReassembling(false);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const restartAnimation = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setIsReassembling(false);
    }
  };

  const toggleReassembly = () => {
    if (videoRef.current && videoRef.current.duration) {
      const targetTime = isReassembling ? 0 : videoRef.current.duration / 2;
      videoRef.current.currentTime = targetTime;
      setIsReassembling(!isReassembling);
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const visibleComponents = components.filter(comp => {
    return currentTime >= comp.timeIn && currentTime <= comp.timeOut;
  });

  const progress = videoRef.current && videoRef.current.duration 
    ? (currentTime / videoRef.current.duration) * 100 
    : 0;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
            <span className="text-sm text-gold uppercase tracking-widest font-medium">
              Technical Breakdown
            </span>
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
              Exploded Engineering View
            </span>
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interactive technical breakdown revealing the precision assembly of each component
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Column - Video Player */}
          <div className="w-full lg:w-2/3">
            <motion.div 
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              onMouseEnter={() => setShowLabels(true)}
              onMouseLeave={() => setShowLabels(false)}
            >
              {/* Video Container */}
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className={`w-full h-full object-contain transition-opacity duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                >
                  <source src="videos/exploded-animation.mp4" type="video/mp4" />
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-gears-of-a-mechanism-exploding-in-slow-motion-41527-large.mp4" type="video/mp4" />
                </video>

                {/* Loading State */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
                    <div className="relative">
                      <div className="w-16 h-16 border-3 border-gold/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-3 border-gold rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}

                {/* Animated Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <div className="absolute inset-0 border border-gray-800/50 rounded-3xl"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700/50 to-transparent"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
                </div>

                {/* Dynamic Component Indicators */}
                <AnimatePresence>
                  {showLabels && visibleComponents.map((comp, idx) => (
                    <motion.div
                      key={comp.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: Math.sin(idx * 0.5) * 10,
                        y: Math.cos(idx * 0.5) * 10
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      className={`absolute ${idx % 2 === 0 ? 'left-8' : 'right-8'}`}
                      style={{ 
                        top: `${20 + (idx * 15)}%`,
                        transformOrigin: 'center'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          style={{ 
                            backgroundColor: `${comp.color}20`, 
                            border: `1px solid ${comp.color}80` 
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                          {comp.icon}
                        </motion.div>
                        <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm border border-gray-800">
                          <div className="text-sm font-medium text-white">{comp.name}</div>
                          <div className="text-xs text-gray-400">{comp.desc}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Video Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause Button */}
                    <motion.button
                      onClick={togglePlay}
                      className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center border border-gray-700 hover:border-gold transition-colors group video-control-button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-white">
                        {isPlaying ? (
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-3 bg-current"></div>
                            <div className="w-1 h-3 bg-current"></div>
                          </div>
                        ) : (
                          <div className="ml-1">
                            <div className="w-0 h-0 border-t-2 border-b-2 border-l-3 border-transparent border-l-white"></div>
                          </div>
                        )}
                      </div>
                    </motion.button>

                    {/* Restart Button */}
                    <motion.button
                      onClick={restartAnimation}
                      className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs text-gray-300 hover:text-white hover:bg-black/70 transition-all border border-gray-800 video-control-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ↻ Restart
                    </motion.button>

                    {/* Direction Toggle */}
                    <motion.button
                      onClick={toggleReassembly}
                      className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs text-gray-300 hover:text-white hover:bg-black/70 transition-all border border-gray-800 video-control-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isReassembling ? '◀ Explode' : '▶ Reassemble'}
                    </motion.button>
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex-1 max-w-md mx-6">
                    <div className="relative h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold/80 to-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold shadow-lg"></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1 text-center">
                      {isReassembling ? 'Reassembling...' : 'Exploding...'} • {currentTime.toFixed(1)}s
                    </div>
                  </div>

                  {/* Loop Indicator */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-gray-800">
                    <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className="text-xs text-gray-300">Looping</span>
                  </div>
                </div>

                {/* Hover Instructions */}
                <motion.div 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: 20 }}
                  animate={{ x: 0 }}
                >
                  <div className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-gray-700">
                    <div className="text-xs text-gray-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
                      Hover to see components
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Video Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Resolution', value: '4K' },
                { label: 'Duration', value: '8s' },
                { label: 'Components', value: '6' },
                { label: 'Frame Rate', value: '60fps' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-4 rounded-xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800/50 hover:border-gold/30 transition-all"
                >
                  <div className="text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Component Details */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/20 border border-gray-800/50">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
                  <span>Technical Breakdown</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/30">
                    Interactive
                  </span>
                </h4>
                
                <div className="space-y-4">
                  {components.map((component, idx) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                        visibleComponents.some(c => c.id === component.id)
                          ? 'bg-black/40 border-gold/30 shadow-lg shadow-gold/5'
                          : 'bg-gray-900/30 border-gray-800/50'
                      }`}
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = component.timeIn;
                          if (!isPlaying) {
                            videoRef.current.play();
                            setIsPlaying(true);
                          }
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: component.color }}
                            ></div>
                            <h5 className="font-medium text-white">{component.name}</h5>
                          </div>
                          <p className="text-sm text-gray-400">{component.desc}</p>
                        </div>
                        <div className="text-2xl opacity-60">{component.icon}</div>
                      </div>
                      
                      {/* Timing indicator */}
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-gray-500">Appears at {component.timeIn}s</span>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${
                            visibleComponents.some(c => c.id === component.id)
                              ? 'bg-green-500 animate-pulse'
                              : 'bg-gray-700'
                          }`}></div>
                          <span className="text-gray-400">
                            {visibleComponents.some(c => c.id === component.id) ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Assembly Controls */}
              <motion.div 
                className="p-6 rounded-2xl bg-gradient-to-br from-black/50 to-gray-900/30 border border-gray-800/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h5 className="font-medium mb-4 text-gray-300">Assembly Controls</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Explosion Speed</span>
                    <div className="flex items-center gap-2">
                      <button 
                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs hover:bg-gray-700 video-control-button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.playbackRate = Math.max(0.5, videoRef.current.playbackRate - 0.25);
                          }
                        }}
                      >
                        −
                      </button>
                      <span className="text-sm">
                        {videoRef.current ? videoRef.current.playbackRate.toFixed(1) : '1.0'}x
                      </span>
                      <button 
                        className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs hover:bg-gray-700 video-control-button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.playbackRate = Math.min(2, videoRef.current.playbackRate + 0.25);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Auto-Rotate</span>
                    <div 
                      className="relative w-12 h-6 flex items-center bg-gray-800 rounded-full p-1 cursor-pointer"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      <motion.div 
                        className="w-4 h-4 bg-gold rounded-full"
                        animate={{ x: isPlaying ? 24 : 0 }}
                        transition={{ type: "spring" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Reset All Button */}
                <motion.button
                  onClick={restartAnimation}
                  className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-black border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all flex items-center justify-center gap-2 btn-outline-gold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Reset Animation</span>
                  <span className="text-lg">↺</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
              <span>Click components to highlight in animation</span>
            </div>
            <div className="h-4 w-px bg-gray-800 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span>Hover video to see real-time component labels</span>
            </div>
            <div className="h-4 w-px bg-gray-800 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span>8-second seamless loop with 60fps smoothness</span>
            </div>
          </div>
        </motion.div>

        {/* Performance Note */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-gray-800/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-400">
              Optimized 4K video • WebGL accelerated
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-4 w-64 h-64 rounded-full bg-gradient-to-r from-gold/5 to-transparent blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-4 w-80 h-80 rounded-full bg-gradient-to-l from-blue-500/3 to-transparent blur-3xl pointer-events-none"></div>
    </section>
  );
}