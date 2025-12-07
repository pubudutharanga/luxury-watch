// hooks/useParallax.js - Advanced parallax hook
import { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'

export function useParallax(intensity = 0.5, options = {}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    
    const handleMouseMove = (e) => {
      if (isMobile) return
      
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      
      setMousePosition({ x, y })
    }
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollY / maxScroll
      setScrollPosition(progress)
    }
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  const springs = useSpring({
    x: mousePosition.x * intensity * 100,
    y: mousePosition.y * intensity * 100,
    scale: 1 + scrollPosition * 0.1,
    config: {
      mass: 1,
      tension: 280,
      friction: 120,
      precision: 0.001
    }
  })

  return {
    springs,
    mousePosition,
    scrollPosition,
    isMobile,
    ParallaxElement: animated.div
  }
}