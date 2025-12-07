// components/EnhancedVideoPlayer.jsx - Modern video player
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize2, Settings, SkipBack } from 'lucide-react'
import { useVideoPerformance } from '../hooks/useVideoPerformance'
import { cn } from '../lib/utils'

export default function EnhancedVideoPlayer({
  src,
  poster,
  className,
  autoPlay = false,
  loop = true,
  muted = false,
  controls = false,
  onReady,
  onEnd,
  ...props
}) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(muted ? 0 : 0.7)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [quality, setQuality] = useState('auto')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const {
    isPlaying,
    bufferProgress,
    isBuffering
  } = useVideoPerformance(videoRef)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setVolume(videoRef.current.muted ? 0 : 0.7)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const time = percentage * duration
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value)
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value
      videoRef.current.muted = value === 0
    }
  }

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate)
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    const handleEnded = () => onEnd?.()

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    // Auto-hide controls
    let hideTimeout
    const resetHideTimeout = () => {
      clearTimeout(hideTimeout)
      if (isPlaying) {
        hideTimeout = setTimeout(() => setShowControls(false), 2000)
      }
    }

    if (isPlaying) {
      resetHideTimeout()
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
      clearTimeout(hideTimeout)
    }
  }, [isPlaying, onEnd])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative group overflow-hidden rounded-2xl bg-black',
        isFullscreen ? 'fixed inset-0 z-50' : 'relative',
        className
      )}
      onMouseEnter={() => {
        setIsHovering(true)
        setShowControls(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
        if (isPlaying) {
          setTimeout(() => setShowControls(false), 1000)
        }
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload="metadata"
        {...props}
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* Controls Overlay */}
      <AnimatePresence>
        {(showControls || isHovering) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm rounded-md text-gold">
                  4K
                </span>
                <span className="text-sm text-white/80">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlaybackRateChange(0.5)}
                  className={`px-2 py-1 text-xs rounded ${playbackRate === 0.5 ? 'bg-gold text-black' : 'bg-black/50 text-white/80'}`}
                >
                  0.5x
                </button>
                <button
                  onClick={() => handlePlaybackRateChange(1)}
                  className={`px-2 py-1 text-xs rounded ${playbackRate === 1 ? 'bg-gold text-black' : 'bg-black/50 text-white/80'}`}
                >
                  1x
                </button>
                <button
                  onClick={() => handlePlaybackRateChange(1.5)}
                  className={`px-2 py-1 text-xs rounded ${playbackRate === 1.5 ? 'bg-gold text-black' : 'bg-black/50 text-white/80'}`}
                >
                  1.5x
                </button>
              </div>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <motion.button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border-2 border-gold/30 flex items-center justify-center hover:bg-black/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-gold" />
                ) : (
                  <Play className="w-6 h-6 text-gold ml-1" />
                )}
              </motion.button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3 pointer-events-auto">
              {/* Progress Bar */}
              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer" onClick={handleSeek}>
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                <div 
                  className="absolute top-0 left-0 h-full bg-white/30 rounded-full"
                  style={{ width: `${bufferProgress}%` }}
                />
                <motion.div
                  className="absolute top-1/2 w-3 h-3 bg-gold rounded-full -translate-y-1/2"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                  whileHover={{ scale: 1.5 }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                  >
                    {volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-24 accent-gold"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = Math.max(0, currentTime - 10)
                      }
                    }}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                  >
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                  >
                    <Maximize2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quality Indicator */}
      <div className="absolute top-4 right-4">
        <div className="px-2 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm rounded-md text-white/80">
          {quality.toUpperCase()}
        </div>
      </div>
    </div>
  )
}