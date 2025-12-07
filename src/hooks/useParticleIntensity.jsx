// hooks/useParticleIntensity.jsx
import { useEffect, useState } from 'react'

export default function useParticleIntensity() {
  const [intensity, setIntensity] = useState(0.1)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollY / totalHeight
      setScrollProgress(progress)
      
      // Adjust particle intensity based on scroll position
      if (progress < 0.3) {
        setIntensity(0.1) // Hero section - subtle
      } else if (progress < 0.7) {
        setIntensity(0.15) // Middle sections - medium
      } else {
        setIntensity(0.08) // Finale section - very subtle
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { intensity, scrollProgress }
}