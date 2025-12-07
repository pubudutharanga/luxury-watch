// src/components/SealBreak.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SealBreak() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Preload video
    const video = videoRef.current;
    if (video) {
      video.preload = 'auto';
      
      const handleLoadedData = () => {
        setIsLoaded(true);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasPlayed(true);
              
              // Haptic feedback on mobile
              if (isMobile && 'vibrate' in navigator) {
                navigator.vibrate([50, 30, 50]);
              }
            })
            .catch(console.error);
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const features = [
    { 
      title: 'Unique Identification', 
      desc: 'Individual serial number embedded in wax',
      icon: '①'
    },
    { 
      title: 'Tactile Experience', 
      desc: 'Satisfying physical feedback of wax breaking',
      icon: '②'
    },
    { 
      title: 'Gold Flake Infused', 
      desc: '24K gold particles in the sealing wax',
      icon: '③'
    },
    { 
      title: 'One-Time Moment', 
      desc: 'Irreversible action marking ownership',
      icon: '④'
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/3 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <motion.div 
                className="w-2 h-2 rounded-full bg-gold"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm text-gold uppercase tracking-widest font-medium">
                Step 2 • The Ceremony
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gold bg-clip-text text-transparent">
              Break The Official Seal
            </h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The moment of authenticity. Each timepiece bears a unique wax seal, certifying its 
              untouched journey from our atelier to your hands.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Video Container */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
              className="relative"
            >
              <div 
                className="relative aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-2xl group cursor-pointer video-container"
                onClick={handlePlay}
              >
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  preload="metadata"
                  muted
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="videos/seal-break.mp4" type="video/mp4" />
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-breaking-a-wax-seal-on-a-document-40918-large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Loading State */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="relative">
                      <div className="w-16 h-16 border-3 border-gold/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-3 border-gold rounded-full animate-spin"></div>
                    </div>
                  </div>
                )}
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60"></div>
                
                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="flex flex-col items-center gap-6"
                    animate={{ scale: isPlaying ? 0.95 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Outer Glow Ring */}
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ 
                          boxShadow: isPlaying 
                            ? '0 0 60px rgba(212, 175, 55, 0.4)'
                            : '0 0 30px rgba(212, 175, 55, 0.2)'
                        }}
                      />
                      
                      {/* Button */}
                      <div className="relative w-24 h-24 rounded-full bg-black/60 backdrop-blur-lg border-2 border-gold/40 group-hover:border-gold/60 transition-all duration-300 flex items-center justify-center">
                        {isPlaying ? (
                          <div className="flex gap-2">
                            <motion.div 
                              className="w-2 h-8 bg-gold rounded-sm"
                              animate={{ height: ['8px', '16px', '8px'] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                            <motion.div 
                              className="w-2 h-8 bg-gold rounded-sm"
                              animate={{ height: ['16px', '8px', '16px'] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                            />
                          </div>
                        ) : (
                          <motion.div
                            animate={{ x: hasPlayed ? 0 : [0, 2, 0] }}
                            transition={{ 
                              repeat: hasPlayed ? 0 : Infinity,
                              duration: 1.5
                            }}
                          >
                            <div className="ml-1">
                              <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-gold"></div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Progress Ring */}
                      <svg className="absolute inset-0 w-24 h-24" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="48"
                          fill="none"
                          stroke="rgba(212, 175, 55, 0.2)"
                          strokeWidth="1"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="48"
                          fill="none"
                          stroke="#D4AF37"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="301.6"
                          strokeDashoffset={301.6 - (progress * 301.6) / 100}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    
                    {/* Label */}
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gold mb-1">
                        {isPlaying ? 'Seal Breaking...' : hasPlayed ? 'Break Again' : 'Click to Break'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {isPlaying ? '3s of satisfaction' : 'Official wax seal'}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded-full text-xs bg-gray-800/60 backdrop-blur-sm text-gray-400 border border-gray-700">
                        <span className="text-base">🔇</span>
                        <span className="ml-2">Muted</span>
                      </div>
                    </div>
                    
                    {hasPlayed && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestart();
                        }}
                        className="px-3 py-1.5 rounded-full text-xs bg-gray-800/60 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors"
                      >
                        ↻ Reset
                      </button>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3 h-0.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-gold to-yellow-300"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gold/10 blur-xl"></div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-3 rounded-xl bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800/50"
                >
                  <div className="text-2xl font-bold text-gold">3s</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Duration</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-3 rounded-xl bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800/50"
                >
                  <div className="text-2xl font-bold text-gold">0.2mm</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Wax Depth</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-3 rounded-xl bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800/50"
                >
                  <div className="text-2xl font-bold text-gold">47°C</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Sealing Temp</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content Panel */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
              className="space-y-8"
            >
              {/* Main Description */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  The Ceremony of Authenticity
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  This isn't just packaging—it's a certified seal of excellence. Each wax seal contains 
                  24K gold flakes and is imprinted with the watch's unique serial number, ensuring 
                  complete traceability from our Swiss workshop to your wrist.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 group hover:border-gold/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <span className="text-gold text-lg">{feature.icon}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-white mb-1">{feature.title}</div>
                        <div className="text-sm text-gray-400">{feature.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Technical Specs */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-4 rounded-xl bg-gradient-to-br from-black/40 to-gray-900/30 border border-gray-800/50"
              >
                <h4 className="text-lg font-semibold mb-3 text-white">Technical Specifications</h4>
                <div className="space-y-3">
                  {[
                    { spec: 'Seal Material', value: 'Beeswax + 24K Gold Flakes' },
                    { spec: 'Breaking Force', value: '12N (2.7 lbs)' },
                    { spec: 'Sound Frequency', value: '120-180 Hz' },
                    { spec: 'Certification', value: 'ISO 9001 Compliant' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-900/50 last:border-0">
                      <span className="text-sm text-gray-400">{item.spec}</span>
                      <span className="text-sm font-medium text-gray-300">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <button
                  onClick={handlePlay}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-900 to-black border border-gray-800 hover:border-gold/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold group-hover:animate-pulse"></div>
                    <span className="text-gold font-medium">
                      Experience The Seal Break
                    </span>
                    <div className="w-2 h-2 rounded-full bg-gold group-hover:animate-pulse"></div>
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-16 pt-8 border-t border-gray-800/30"
          >
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              <span className="text-gold/80">Note:</span> The seal breaking ceremony is a one-time experience 
              in physical unboxing. This digital recreation allows you to relive the moment indefinitely.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent"></div>
    </section>
  );
}