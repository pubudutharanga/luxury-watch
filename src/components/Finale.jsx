// components/Finale.jsx - FIXED FOR 688x464 VIDEO
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function Finale() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Initialize video with proper handling for 688x464
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setHasError(false);
      
      // For 688x464 video, we need to adjust playback
      video.playbackRate = 1.0;
      video.loop = true;
      
      // Try to autoplay with muted first
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.log('Autoplay prevented, trying muted:', err);
            video.muted = true;
            setIsMuted(true);
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                console.log('Muted autoplay also failed');
                setIsPlaying(false);
              });
          });
      }
    };

    const handleError = (e) => {
      console.error('Video error details:', e);
      console.log('Video error code:', video.error?.code);
      console.log('Video error message:', video.error?.message);
      setHasError(true);
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      if (video.duration && !isNaN(video.duration)) {
        const currentProgress = (video.currentTime / video.duration) * 100;
        setProgress(currentProgress);
      }
    };

    // Set video attributes for 688x464 video
    video.preload = 'metadata';
    video.playsInline = true;
    video.muted = true;
    video.crossOrigin = 'anonymous'; // Helps with CORS if needed
    
    // Add event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Load video source
    video.src = '/videos/finale-polish.mp4';
    video.load();

    // Fallback timer in case video doesn't load
    const loadTimer = setTimeout(() => {
      if (!isLoaded && !hasError) {
        console.log('Video loading timeout - using fallback');
        setHasError(true);
        setIsLoaded(true);
      }
    }, 5000);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      clearTimeout(loadTimer);
      
      if (video) {
        video.pause();
        video.src = '';
      }
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.log('Play failed:', err);
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true));
          });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoaded(false);
    setProgress(0);
    
    if (videoRef.current) {
      videoRef.current.src = '/videos/finale-polish.mp4';
      videoRef.current.load();
    }
  };

  // Fallback video URL (688x480 similar resolution)
  const fallbackVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-watchmaker-polishing-a-watch-41608-large.mp4';

  const stats = [
    { label: 'Material', value: '316L Steel', desc: 'Surgical Grade' },
    { label: 'Crystal', value: 'Sapphire', desc: 'Anti-Reflective' },
    { label: 'Movement', value: 'Swiss Made', desc: 'Automatic' },
    { label: 'Water', value: '5 ATM', desc: '50m Depth' },
    { label: 'Power', value: '42h', desc: 'Reserve' },
    { label: 'Weight', value: '142g', desc: 'Perfect Balance' }
  ];

  const features = [
    '24k Gold Plated Bezel',
    'Hand-Polished Links',
    'Micro-Adjust Clasp',
    'Luminous Markers',
    'Date Window @ 3',
    'Exhibition Case Back'
  ];

  return (
    <section className='section py-20 md:py-32 relative overflow-hidden'>
      {/* Video Background - OPTIMIZED FOR 688x464 */}
      <div className='absolute inset-0 z-0'>
        {/* Fallback gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black' />
        
        {/* Polish Video Container */}
        <div className='relative w-full h-full'>
          <video
            ref={videoRef}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              w-auto min-w-full h-auto min-h-full object-contain
              transition-opacity duration-1000 ${
              isLoaded && !hasError ? 'opacity-40' : 'opacity-0'
            }`}
            style={{
              // Scale up the 688x464 video to look better
              transform: 'translate(-50%, -50%) scale(1.1)',
              filter: 'brightness(0.9) contrast(1.1) saturate(1.2) blur(1px)'
            }}
            autoPlay
            muted={isMuted}
            playsInline
            loop
            preload='metadata'
            poster='/images/video-poster.jpg'
          >
            {/* PRIMARY VIDEO SOURCE - 688x464 */}
            <source src="/videos/finale-polish.mp4" type="video/mp4" />
            
            {/* FALLBACK VIDEO SOURCE */}
            <source src={fallbackVideoUrl} type="video/mp4" />
            
            Your browser does not support the video tag.
          </video>
          
          {/* Loading state */}
          {!isLoaded && !hasError && (
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black'>
              <div className='relative mb-4'>
                <div className='w-16 h-16 border-3 border-gold/20 rounded-full'></div>
                <div className='absolute top-0 left-0 w-16 h-16 border-t-3 border-gold rounded-full animate-spin'></div>
              </div>
              <p className='text-sm text-gray-400 animate-pulse'>Loading final polish video (688×464)...</p>
              <p className='text-xs text-gray-600 mt-2'>File: finale-polish.mp4</p>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black'>
              <div className='text-center p-8 max-w-md'>
                <div className='text-4xl mb-4'>🎬</div>
                <h4 className='text-xl font-semibold text-gray-200 mb-3'>Video Loading Issue</h4>
                <p className='text-gray-400 mb-6'>
                  The video file (688×464) failed to load. This could be due to:
                </p>
                <ul className='text-left text-sm text-gray-500 mb-6 space-y-2'>
                  <li>• File not found at: <code>/public/videos/finale-polish.mp4</code></li>
                  <li>• Video format/codec issue (try H.264 MP4)</li>
                  <li>• File size too large or corrupted</li>
                  <li>• Browser video playback restrictions</li>
                </ul>
                <div className='flex flex-col sm:flex-row gap-3'>
                  <button
                    onClick={handleRetry}
                    className='px-4 py-2.5 bg-gold/20 hover:bg-gold/30 text-gold rounded-lg border border-gold/30 transition-colors flex items-center justify-center gap-2'
                  >
                    🔄 Retry Loading
                  </button>
                  <button
                    onClick={() => {
                      // Open video in new tab to debug
                      window.open('/videos/finale-polish.mp4', '_blank');
                    }}
                    className='px-4 py-2.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg border border-blue-500/30 transition-colors flex items-center justify-center gap-2'
                  >
                    🔍 Debug Video
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Gradient overlays to hide video edges */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60'></div>
        <div className='absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black'></div>
        
        {/* Blur overlay to improve 688x464 appearance */}
        <div className='absolute inset-0 backdrop-blur-sm opacity-10'></div>
        
        {/* Animated glow effect */}
        <motion.div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 70%)'
          }}
        />
      </div>

      {/* Video Controls */}
      <div className='absolute top-6 right-6 z-20 flex items-center gap-3'>
        <motion.button
          onClick={togglePlay}
          className='w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-black/60 transition-all video-control-button'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </motion.button>
        
        <motion.button
          onClick={toggleMute}
          className='w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-gold/30 flex items-center justify-center text-gold hover:bg-black/60 transition-all video-control-button'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>
        
        {/* Progress bar */}
        <div className='w-32 h-1 bg-black/30 rounded-full overflow-hidden'>
          <motion.div
            className='h-full bg-gold'
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Status indicator */}
        <div className={`px-3 py-1.5 rounded-full text-xs backdrop-blur-md flex items-center gap-2 border ${
          hasError ? 'border-red-500/30 bg-red-500/10' : 
          isLoaded ? 'border-green-500/30 bg-green-500/10' : 
          'border-yellow-500/30 bg-yellow-500/10'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            hasError ? 'bg-red-500' : 
            isLoaded ? 'bg-green-500 animate-pulse' : 
            'bg-yellow-500 animate-pulse'
          }`} />
          <span className={`${
            hasError ? 'text-red-400' : 
            isLoaded ? 'text-green-400' : 
            'text-yellow-400'
          }`}>
            {hasError ? 'Error' : isLoaded ? 'Loaded' : 'Loading'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        {/* Title Section */}
        <div className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className='mb-6'
          >
            <div className='inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-gold/20 mb-4'>
              <div className='w-2 h-2 rounded-full bg-gold animate-pulse'></div>
              <span className='text-sm text-gold tracking-widest uppercase'>Final Assembly</span>
            </div>
            <h2 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight'>
              <span className='bg-gradient-to-r from-gold via-amber-200 to-gold bg-clip-text text-transparent'>
                Reassemble & Shine
              </span>
            </h2>
            <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
              Witness the meticulous final polish where every component finds its perfect place in harmony.
            </p>
          </motion.div>
        </div>

        {/* Rest of the content remains the same as before */}
        {/* ... [Keep all the existing content below] ... */}
      </div>
    </section>
  );
}