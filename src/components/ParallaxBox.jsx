// src/components/ParallaxBox.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ParallaxBox() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    
    const onMove = (e) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const my = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      
      controls.start({
        rotateY: mx * 15,
        rotateX: my * -8,
        transition: { type: "spring", stiffness: 100, damping: 20 }
      });
    };
    
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [controls]);

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

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
            <span className="text-sm text-gold uppercase tracking-widest font-medium">
              Step 1 • The Unveiling
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gold bg-clip-text text-transparent">
            Premium Packaging Experience
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the magnetic reveal of our precision-engineered packaging. Every detail,
            from the satin finish to the weight distribution, is crafted for maximum impact.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Video Container */}
          <div className="lg:w-2/3">
            <motion.div 
              ref={containerRef}
              animate={controls}
              className="relative w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden group cursor-pointer perspective-3d"
              whileHover={{ scale: 1.02 }}
              onClick={togglePlay}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {/* Video Background */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ 
                  transform: 'scale(1.1)',
                  filter: 'brightness(0.9) contrast(1.1) saturate(1.2)'
                }}
                onLoadedData={handleVideoLoad}
              >
                <source src="videos/box-unboxing.mp4" type="video/mp4" />
                <source src="https://assets.mixkit.co/videos/preview/mixkit-a-luxury-black-watch-box-being-opened-41604-large.mp4" type="video/mip4" />
                Your browser does not support the video tag.
              </video>

              {/* Loading State */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
                  <div className="relative">
                    <div className="w-16 h-16 border-3 border-gold/20 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-3 border-gold rounded-full animate-spin"></div>
                  </div>
                </div>
              )}

              {/* Video Overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/20"></div>
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Interactive Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <motion.div 
                  className="relative"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isPlaying ? 0.9 : 1.1 }}
                  transition={{ type: "spring" }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-black/80 to-black/50 backdrop-blur-md flex items-center justify-center border border-gold/30 shadow-2xl">
                    <div className="text-2xl text-gold">
                      {isPlaying ? '⏸️' : '▶️'}
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    Click to {isPlaying ? 'pause' : 'play'}
                  </div>
                </motion.div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800">
                  <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-300">{isPlaying ? 'Playing' : 'Paused'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-400 hidden group-hover:block transition-opacity">
                    360° Interactive View
                  </div>
                  <div className="w-6 h-6 rounded-full border border-gold/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                  </div>
                </div>
              </div>

              {/* Edge Glow */}
              <div className="absolute -inset-[1px] rounded-3xl border border-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>

            {/* Stats Bar */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Box Weight', value: '1.2kg', desc: 'Perfect Balance' },
                { label: 'Opening Angle', value: '85°', desc: 'Optimal Viewing' },
                { label: 'Material', value: '6061 Alum', desc: 'Aerospace Grade' },
                { label: 'Finish', value: 'Matte Black', desc: 'Satin Texture' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-4 rounded-xl bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800/50 hover:border-gold/30 transition-all"
                >
                  <div className="text-2xl font-bold text-gold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features Panel */}
          <div className="lg:w-1/3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/30 to-black/30 border border-gray-800/50"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Design Philosophy</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our packaging is engineered to create a memorable first impression. The magnetic
                closure provides a satisfying click, while the weighted base ensures stability
                during unboxing.
              </p>
              
              <div className="space-y-3">
                {[
                  'Silent magnetic closure system',
                  'Anti-static velvet interior',
                  'Humidity-controlled environment',
                  'Fingerprint-resistant coating',
                  'Reusable presentation case'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold"></div>
                    <span className="text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-black/40 to-gray-900/30 border border-gold/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-gold">Interactive Features</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">360° Rotation</span>
                  <div className="px-3 py-1 rounded-full bg-gold/10 text-gold text-sm">
                    Active
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Parallax Effect</span>
                  <div className="px-3 py-1 rounded-full bg-gold/10 text-gold text-sm">
                    On Hover
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Auto-play</span>
                  <div className="px-3 py-1 rounded-full bg-gold/10 text-gold text-sm">
                    Enabled
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Video Quality</span>
                  <div className="px-3 py-1 rounded-full bg-gold/10 text-gold text-sm">
                    4K
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
              <span>Move cursor to rotate box in 3D space</span>
            </div>
            <div className="h-4 w-px bg-gray-800"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>Click video to pause/resume animation</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-gold/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 rounded-full bg-blue-500/3 blur-3xl"></div>
    </section>
  );
}
