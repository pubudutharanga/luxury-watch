// hooks/useVideoPerformance.js - Video optimization hook
import { useEffect, useState, useCallback } from 'react'
import { debounce } from '../lib/utils'

export function useVideoPerformance(videoRef, options = {}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [quality, setQuality] = useState('auto')
  const [bufferProgress, setBufferProgress] = useState(0)
  const [networkSpeed, setNetworkSpeed] = useState(0)
  const [isBuffering, setIsBuffering] = useState(false)

  const detectNetworkSpeed = useCallback(
    debounce(() => {
      if ('connection' in navigator) {
        const connection = navigator.connection
        if (connection && connection.downlink) {
          setNetworkSpeed(connection.downlink)
          // Adjust quality based on network speed
          if (connection.downlink < 2) {
            setQuality('low')
          } else if (connection.downlink < 5) {
            setQuality('medium')
          } else {
            setQuality('high')
          }
        }
      }
    }, 1000),
    []
  )

  const optimizeVideoSettings = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    // Set optimal playback settings
    video.preload = 'auto'
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    
    // Set quality-based settings
    if (quality === 'low') {
      video.defaultPlaybackRate = 1.0
      video.playbackRate = 1.0
    } else if (quality === 'high') {
      video.defaultPlaybackRate = 1.0
      video.playbackRate = 1.0
    }
  }, [videoRef, quality])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    optimizeVideoSettings()
    detectNetworkSpeed()

    const handleCanPlay = () => setIsBuffering(false)
    const handleWaiting = () => setIsBuffering(true)
    const handlePlaying = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const duration = video.duration
        if (duration > 0) {
          setBufferProgress((bufferedEnd / duration) * 100)
        }
      }
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)
    video.addEventListener('progress', handleProgress)

    // Network speed detection
    window.addEventListener('online', detectNetworkSpeed)
    window.addEventListener('offline', detectNetworkSpeed)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('progress', handleProgress)
      window.removeEventListener('online', detectNetworkSpeed)
      window.removeEventListener('offline', detectNetworkSpeed)
    }
  }, [videoRef, detectNetworkSpeed, optimizeVideoSettings])

  return {
    isPlaying,
    quality,
    bufferProgress,
    networkSpeed,
    isBuffering,
    optimizeVideoSettings
  }
}