// components/VideoLoader.jsx - FIXED
import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function VideoLoader({ 
  src, 
  className = '', 
  autoPlay = true, 
  loop = true,
  muted = true,
  playsInline = true
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setIsLoaded(true)

    video.addEventListener('canplay', handleCanPlay)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload='metadata'
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Loading State */}
      {!isLoaded && (
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center'>
          <div className='w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin' />
        </div>
      )}

      {/* Play Button */}
      <button
        onClick={togglePlay}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:border-gold/50 transition-all opacity-0 hover:opacity-100 group-hover:opacity-100 duration-300 flex items-center justify-center'
      >
        {isPlaying ? (
          <Pause className='w-6 h-6 text-white' />
        ) : (
          <Play className='w-6 h-6 text-white ml-1' />
        )}
      </button>
    </div>
  )
}