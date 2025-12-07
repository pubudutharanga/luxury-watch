// src/components/LidReveal.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Info, RotateCcw, Maximize2, Magnet, Star, Scale, Target } from 'lucide-react';

export default function LidReveal() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2.3);
  const [showDetails, setShowDetails] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setIsLoaded(false);
      setHasError(false);
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      setDuration(video.duration || 2.3);
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        const current = video.currentTime;
        setCurrentTime(current);
        setProgress((current / video.duration) * 100);
      }
    };

    const handleError = (e) => {
      console.error('Video error:', e);
      setHasError(true);
      setIsLoaded(true);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);

    // Try to load video
    setTimeout(() => {
      if (!isLoaded && !hasError) {
        video.load();
      }
    }, 500);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(err => {
              console.log('Play failed:', err);
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true));
            });
        }
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setProgress(0);
      if (!isPlaying) {
        togglePlay();
      }
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(err => {
        console.log(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoaded(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const fallbackVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-opening-a-luxury-box-31655-large.mp4';

  const features = [
    { 
      icon: <Magnet className="w-6 h-6 text-gold" />,
      title: 'Magnetic Closure', 
      desc: 'Silent magnetic seal system with 4-point alignment'
    },
    { 
      icon: <Star className="w-6 h-6 text-gold" />,
      title: 'Velvet Lining', 
      desc: 'Custom-milled velvet interior with anti-static treatment'
    },
    { 
      icon: <Scale className="w-6 h-6 text-gold" />,
      title: 'Precision Balance', 
      desc: 'Perfect 85° opening angle with hydraulic dampers'
    },
    { 
      icon: <Target className="w-6 h-6 text-gold" />,
      title: 'Weighted Base', 
      desc: '850g solid steel foundation for stability'
    }
  ];

  const stats = [
    { label: 'Open Angle', value: '85°', desc: 'Optimal viewing angle' },
    { label: 'Reveal Time', value: '2.3s', desc: 'Smooth hydraulic motion' },
    { label: 'Hinge Cycles', value: '10k+', desc: 'Tested durability' }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/30 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
              <span className="text-sm text-gold uppercase tracking-widest font-medium">
                Step 3 • The Reveal
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gold bg-clip-text text-transparent">
              Lid Opening Sequence
            </h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the precision-engineered lid reveal. The perfect balance of weight, 
              sound, and motion that unveils the masterpiece within.
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
                className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group bg-black video-container"
                style={{ aspectRatio: '16/9' }}
              >
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  poster="/images/video-poster.jpg"
                >
                  <source src="/videos/lid-open.mp4" type="video/mp4" />
                  <source src={fallbackVideoUrl} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>

                {/* Loading State */}
                {!isLoaded && !hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 border-3 border-gold/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-3 border-gold rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm text-gray-400 animate-pulse">Loading lid reveal video...</p>
                  </div>
                )}

                {/* Error State */}
                {hasError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="text-center p-6 max-w-sm">
                      <div className="text-4xl mb-4">📦</div>
                      <h4 className="text-lg font-semibold text-gray-200 mb-2">Video Preview</h4>
                      <p className="text-gray-400 text-sm mb-6">
                        The lid reveal video shows the precision-engineered box opening mechanism.
                        For the full experience, add your video file to <code>/public/videos/lid-reveal.mp4</code>
                      </p>
                      <button
                        onClick={togglePlay}
                        className="px-4 py-2.5 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg border border-gold/30 transition-colors flex items-center justify-center gap-2 mx-auto"
                      >
                        <Play size={16} />
                        Simulate Reveal
                      </button>
                    </div>
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Play/Pause Overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={togglePlay}
                >
                  <motion.div
                    className="flex flex-col items-center gap-4"
                    animate={{ scale: isPlaying ? 0.95 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Play/Pause Button */}
                    <div className="relative">
                      <motion.div
                        className="relative w-20 h-20 rounded-full bg-black/60 backdrop-blur-lg border-2 border-gold/40 group-hover:border-gold/60 transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPlaying ? (
                          <div className="flex gap-1">
                            <motion.div 
                              className="w-1.5 h-6 bg-gold rounded-sm"
                              animate={{ height: ['6px', '10px', '6px'] }}
                              transition={{ duration: 0.8, repeat: Infinity }}
                            />
                            <motion.div 
                              className="w-1.5 h-6 bg-gold rounded-sm"
                              animate={{ height: ['10px', '6px', '10px'] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                            />
                          </div>
                        ) : (
                          <Play size={24} className="text-gold ml-1" />
                        )}
                      </motion.div>
                      
                      {/* Progress Ring */}
                      <svg className="absolute inset-0 w-20 h-20" viewBox="0 0 100 100">
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
                        {isPlaying ? 'Playing...' : 'Click to Play'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {hasError ? 'Simulated reveal' : 'Lid opening reveal'}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Bottom Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="px-3 py-1.5 rounded-full text-xs bg-gray-800/60 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/80 transition-all flex items-center gap-2"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        <span>{isMuted ? 'Muted' : 'Sound On'}</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          restartVideo();
                        }}
                        className="px-3 py-1.5 rounded-full text-xs bg-gray-800/60 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/80 transition-all flex items-center gap-2"
                        title="Restart video"
                      >
                        <RotateCcw size={14} />
                        <span>Restart</span>
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-gray-400">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDetails(!showDetails);
                        }}
                        className="px-3 py-1.5 rounded-full text-xs bg-gray-800/60 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/80 transition-all flex items-center gap-2"
                        title="Show details"
                      >
                        <Info size={14} />
                        <span>Details</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFullscreen();
                        }}
                        className="px-3 py-1.5 rounded-full text-xs bg-gray-800/60 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/80 transition-all flex items-center gap-2"
                        title="Fullscreen"
                      >
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3 h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-gold to-yellow-300"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => {
                        if (videoRef.current && videoRef.current.duration) {
                          const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
                          videoRef.current.currentTime = newTime;
                          setProgress(parseFloat(e.target.value));
                        }
                      }}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gold/10 blur-xl"></div>
                </div>
              </div>
              
              {/* Stats under video */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    className="text-center p-3 rounded-xl bg-gradient-to-b from-gray-900/30 to-gray-900/10 border border-gray-800/50 hover:border-gold/30 transition-colors"
                  >
                    <div className="text-2xl font-bold text-gold">{stat.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Content Panel */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 50 }}
              className="space-y-8"
            >
              {/* Main Description */}
           

              {/* Features Grid */}
              <div className="grid gap-4">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="p-4 rounded-xl bg-gradient-to-br from-gray-900/30 to-gray-900/10 border border-gray-800/50 hover:border-gold/30 transition-all duration-300 group hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white mb-1">{feature.title}</div>
                        <div className="text-sm text-gray-400">{feature.desc}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Technical Specifications */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="pt-6 border-t border-gray-800/50"
              >
                <h4 className="text-lg font-semibold mb-4 text-gray-300">Technical Specifications</h4>
                <div className="space-y-3">
                  {[
                    { spec: 'Opening Mechanism', value: 'Dual-hinge with hydraulic dampers' },
                    { spec: 'Material', value: '6061 Aluminum + Stainless Steel' },
                    { spec: 'Finish', value: 'Matte black anodized' },
                    { spec: 'Weight', value: '1.2kg total' },
                    { spec: 'Sound Profile', value: 'Silent operation < 20dB' },
                    { spec: 'Production', value: 'CNC machined, hand-finished' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-900/50 last:border-0">
                      <span className="text-sm text-gray-400">{item.spec}</span>
                      <span className="text-sm font-medium text-gray-300">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Interactive Tip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="p-4 rounded-xl bg-gradient-to-r from-gray-900/30 to-black/30 border border-gray-800/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                  </div>
                  <div>
                    <div className="font-medium text-white mb-1">Interactive Experience</div>
                    <div className="text-sm text-gray-400">
                      Click the video to pause and examine details. Drag the progress bar to scrub through the animation.
                      {hasError && ' (Using simulation mode - add video file for full experience)'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Detail Modal */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                onClick={() => setShowDetails(false)}
              >
                <motion.div 
                  className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 25 }}
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">Lid Mechanism Details</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-gold flex items-center gap-2">
                          <span>Mechanical Design</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
                            Precision
                          </span>
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Dual-torque hinge system with progressive resistance</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Hydraulic dampening (45N·m) for smooth motion</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Self-aligning magnetic seals with 4-point contact</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Zero-gravity counterbalance system</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Over-engineered for 10,000+ opening cycles</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-gold flex items-center gap-2">
                          <span>User Experience</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            Luxury
                          </span>
                        </h4>
                        <ul className="space-y-2 text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Perfect 85° viewing angle with auto-hold position</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Silent operation (&lt; 20dB) - library quiet</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>One-finger opening with minimal force</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Auto-locking when closed with audible confirmation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-gold mt-1">•</span>
                            <span>Tactile feedback at critical opening points</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-gray-700 flex items-center justify-center text-white hover:bg-black/80 hover:border-gray-600 transition-all"
                    aria-label="Close details"
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"></div>
    </section>
  );
}