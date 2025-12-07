// src/components/WatchRise.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function WatchRise() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      video.play().catch(err => {
        console.log('Autoplay prevented:', err);
        setIsPlaying(false);
      });
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Fallback if video doesn't load
    setTimeout(() => {
      if (!isLoaded) {
        setIsLoaded(true);
      }
    }, 2000);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isLoaded]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true));
      }
    }
  };

  const features = [
    { 
      title: '24k Gold Plated Bezel',
      desc: 'Hand-finished with micro-satin brushing'
    },
    { 
      title: 'Sapphire Crystal Glass',
      desc: 'Anti-reflective coating on both sides'
    },
    { 
      title: 'Swiss Automatic Movement',
      desc: 'Caliber 8800 with 55-hour power reserve'
    },
    { 
      title: 'Water Resistant 100m',
      desc: 'Screw-down crown and case back'
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Video Container */}
          <div className="relative">
            <motion.div 
              className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
              initial={{ y: 80, opacity: 0, rotateY: -15 }} 
              whileInView={{ y: 0, opacity: 1, rotateY: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              onClick={togglePlay}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="videos/watch-rise.mp4" type="video/mp4" />
                <source src="https://assets.mixkit.co/videos/preview/mixkit-luxury-watch-rising-from-a-box-41606-large.mp4" type="video/mp4" />
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
              
              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-gold/30 backdrop-blur-md flex items-center justify-center border-2 border-gold/50"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-12 h-12 bg-gold/80 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[16px] border-transparent border-l-white ml-1"></div>
                    </div>
                  </motion.div>
                </div>
              )}
              
              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-gold/30">
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-white font-medium">
                    {isPlaying ? 'PLAYING' : 'PAUSED'}
                  </span>
                </div>
                <button className="px-4 py-2 bg-gold/20 backdrop-blur-md rounded-full text-gold text-sm font-medium border border-gold/30 hover:bg-gold/30 transition-colors">
                  {isPlaying ? 'PAUSE 3D VIEW' : 'PLAY 3D VIEW'}
                </button>
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
                <motion.div 
                  className="h-full bg-gradient-to-r from-gold to-yellow-300"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              {/* Reflection Effect */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent opacity-30"></div>
            </motion.div>
            
            {/* Animated Background Glow */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)',
                  'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.08) 40%, transparent 70%)',
                  'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-gold rounded-full"
                  initial={{ y: 0, x: Math.random() * 100 - 50, opacity: 0 }}
                  animate={{
                    y: [0, -100, -200],
                    x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Features List */}
          <div className="text-gray-300">
            <motion.h3 
              className="text-3xl md:text-4xl font-semibold mb-6 bg-gradient-to-r from-white to-gold bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 24 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Anti-Gravity Watch Rise
            </motion.h3>
            
            <p className="text-gray-400 mb-8 leading-relaxed">
              Witness the moment of revelation as our timepiece emerges in slow motion. 
              Every detail is highlighted as it rises from its velvet resting place.
            </p>
            
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 24 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="flex items-start gap-4 group hover:bg-gray-900/30 p-4 rounded-xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gold to-yellow-800 mt-2"></div>
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-gold animate-ping opacity-30"></div>
                  </div>
                  <div>
                    <div className="font-medium text-lg text-white mb-1 flex items-center gap-2">
                      {f.title}
                      <span className="text-xs text-gold bg-gold/10 px-2 py-1 rounded-full">
                        PREMIUM
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video Instructions */}
            <motion.div 
              className="mt-8 p-4 rounded-xl bg-gray-900/30 border border-gray-800"
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold"></div>
                </div>
                <div>
                  <div className="font-medium text-white">Interactive 360° View</div>
                  <div className="text-gray-400">
                    Click video to pause/play • Hover for controls • Watch in slow motion
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technical Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { label: 'Rise Time', value: '3.5s', desc: 'Slow motion' },
                { label: 'Frame Rate', value: '120fps', desc: 'Ultra smooth' },
                { label: 'Resolution', value: '4K', desc: 'Cinematic' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-3 rounded-xl bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800/50">
                  <div className="text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-gray-800/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Video Performance</h4>
              <p className="text-sm text-gray-400">Optimized for smooth playback across all devices</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-400">GPU Accelerated</span>
              </div>
              <div className="h-8 w-px bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-400">Adaptive Bitrate</span>
              </div>
              <div className="h-8 w-px bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-400">Lazy Loading</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-gold/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 rounded-full bg-blue-500/3 blur-3xl"></div>
    </section>
  );
}