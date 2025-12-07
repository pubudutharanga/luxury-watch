// hooks/useVideoController.jsx
import { useRef, useState, useEffect, useCallback } from 'react'

export default function useVideoController(options = {}) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(options.volume || 0.5)
  const [playbackRate, setPlaybackRate] = useState(options.playbackRate || 1.0)
  const [isMuted, setIsMuted] = useState(options.muted || false)

  const play = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [])

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const restart = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      play()
    }
  }, [play])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const seek = useCallback((time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }, [])

  const setVideoVolume = useCallback((newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = Math.max(0, Math.min(1, newVolume))
      setVolume(videoRef.current.volume)
      setIsMuted(videoRef.current.volume === 0)
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }, [])

  const setPlaybackSpeed = useCallback((speed) => {
    if (videoRef.current) {
      const validSpeeds = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0]
      const closestSpeed = validSpeeds.reduce((prev, curr) => 
        Math.abs(curr - speed) < Math.abs(prev - speed) ? curr : prev
      )
      videoRef.current.playbackRate = closestSpeed
      setPlaybackRate(closestSpeed)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100 || 0
      setProgress(currentProgress)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (options.loop) {
        video.currentTime = 0
        video.play()
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleVolumeChange = () => {
      setVolume(video.volume)
      setIsMuted(video.muted)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('volumechange', handleVolumeChange)

    // Initialize volume
    if (options.volume !== undefined) {
      video.volume = options.volume
    }
    if (options.muted !== undefined) {
      video.muted = options.muted
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [options.loop, options.volume, options.muted])

  return {
    videoRef,
    isPlaying,
    progress,
    duration,
    volume,
    playbackRate,
    isMuted,
    play,
    pause,
    restart,
    togglePlay,
    seek,
    setVolume: setVideoVolume,
    toggleMute,
    setPlaybackSpeed
  }
}