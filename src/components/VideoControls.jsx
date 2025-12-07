// components/VideoControls.jsx
import React from 'react'
import { Play, Pause, Volume2, VolumeX, RotateCcw, Settings, Maximize2 } from 'lucide-react'

export default function VideoControls({
  isPlaying,
  isMuted,
  progress,
  duration,
  onPlayPause,
  onMuteToggle,
  onSeek,
  onRestart,
  onSettings,
  onFullscreen,
  className = ''
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 ${className}`}>
      {/* Progress Bar */}
      <div className='mb-4'>
        <div className='relative h-1.5 bg-gray-800/50 rounded-full overflow-hidden'>
          <div 
            className='absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-yellow-500 rounded-full'
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
          />
        </div>
        <div className='flex justify-between text-xs text-gray-400 mt-1'>
          <span>{formatTime((progress / 100) * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            onClick={onPlayPause}
            className='w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/30 border border-gold/30 flex items-center justify-center text-gold transition-colors'
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className='ml-1' />}
          </button>

          <button
            onClick={onMuteToggle}
            className='w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 flex items-center justify-center text-gray-300 transition-colors'
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>

          <button
            onClick={onRestart}
            className='w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 flex items-center justify-center text-gray-300 transition-colors'
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={onSettings}
            className='w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 flex items-center justify-center text-gray-300 transition-colors'
          >
            <Settings size={20} />
          </button>

          <button
            onClick={onFullscreen}
            className='w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700 flex items-center justify-center text-gray-300 transition-colors'
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}