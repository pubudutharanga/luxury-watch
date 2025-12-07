// lib/utils.js - Modern utility functions
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cubicOut } from 'svelte/easing'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function debounce(fn, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function throttle(fn, delay) {
  let lastCall = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - lastCall >= delay) {
      lastCall = now
      fn(...args)
    }
  }
}

export function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function remap(value, low1, high1, low2, high2) {
  return low2 + ((value - low1) * (high2 - low2)) / (high1 - low1)
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function preloadImages(urls) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = url
        })
    )
  )
}

export function getVideoMetadata(url) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = url
    video.addEventListener('loadedmetadata', () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
        aspectRatio: video.videoWidth / video.videoHeight
      })
    })
    video.addEventListener('error', reject)
  })
}