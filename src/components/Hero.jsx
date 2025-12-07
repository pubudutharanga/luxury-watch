// components/Hero.jsx - Cinematic Luxury Version
import React, { useRef, useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function Hero() {
  const videoRef = useRef(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const controls = useAnimation()
  const particlesRef = useRef([])
  const glintRef = useRef(null)

  // Initialize video with cinematic effects
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
      
      // Subtle floating animation
      controls.start({
        scale: [1, 1.015, 1],
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }
      })
    }

    const handleError = () => {
      console.error('Video failed to load')
      setIsVideoLoaded(true)
    }

    // Set video playback speed
    video.playbackRate = 0.5

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [controls])

  // Create particle system for champagne bubbles effect
  useEffect(() => {
    if (!isVideoLoaded) return

    // Clear existing particles
    particlesRef.current.forEach(clearInterval)
    particlesRef.current = []

    // Create 15-20 particles
    const particleCount = 18
    const container = document.querySelector('.particle-container')
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full pointer-events-none'
      
      // Random properties for natural look
      const size = Math.random() * 3 + 1 // 1-4px
      const left = Math.random() * 100 // 0-100%
      const delay = Math.random() * 6 // 0-6s
      const duration = Math.random() * 4 + 4 // 4-8s
      const opacity = Math.random() * 0.3 + 0.1 // 0.1-0.4
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -20px;
        background: radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0.2) 70%);
        box-shadow: 0 0 ${size * 3}px rgba(212, 175, 55, 0.5);
        opacity: ${opacity};
        filter: blur(${size * 0.5}px);
      `
      
      container.appendChild(particle)
      
      // Animate particle
      const animation = setInterval(() => {
        particle.animate([
          { 
            transform: 'translateY(0) scale(1)',
            opacity: opacity 
          },
          { 
            transform: `translateY(-${window.innerHeight + 100}px) scale(${0.5 + Math.random() * 0.5})`,
            opacity: 0 
          }
        ], {
          duration: duration * 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          delay: delay * 1000
        })
      }, (duration + delay) * 1000)
      
      // Initial animation
      particle.animate([
        { 
          transform: 'translateY(0) scale(1)',
          opacity: opacity 
        },
        { 
          transform: `translateY(-${window.innerHeight + 100}px) scale(${0.5 + Math.random() * 0.5})`,
          opacity: 0 
        }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        delay: delay * 1000
      })
      
      particlesRef.current.push(animation)
    }

    return () => {
      particlesRef.current.forEach(clearInterval)
      const container = document.querySelector('.particle-container')
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [isVideoLoaded])

  // Animate glint effect
  useEffect(() => {
    if (!isVideoLoaded || !glintRef.current) return

    const animateGlint = () => {
      const glint = glintRef.current
      
      // Reset position
      glint.style.left = '-100%'
      glint.style.opacity = '0'
      
      // Animate across screen
      setTimeout(() => {
        glint.animate([
          { 
            left: '-100%',
            opacity: 0,
            transform: 'rotate(15deg) scaleX(0.5)'
          },
          { 
            left: '20%',
            opacity: 0.6,
            transform: 'rotate(15deg) scaleX(1)'
          },
          { 
            left: '120%',
            opacity: 0,
            transform: 'rotate(15deg) scaleX(0.5)'
          }
        ], {
          duration: 2000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards'
        })
      }, 6000) // Start at 6 seconds
    }

    // Initial animation
    animateGlint()
    
    // Repeat every 10 seconds (video length)
    const glintInterval = setInterval(animateGlint, 10000)
    
    return () => clearInterval(glintInterval)
  }, [isVideoLoaded])

  // Scroll indicator animation
  const scrollIndicatorVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 2, 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center">
      
      {/* ==================== VIDEO BACKGROUND ==================== */}
      <div className="absolute inset-0 z-0">
        {/* Video Container */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          animate={controls}
        >
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-30' : 'opacity-0'
            }`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              filter: 'brightness(0.7) contrast(1.2) saturate(1.1)'
            }}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* ==================== CINEMATIC OVERLAYS ==================== */}
        
        {/* Gold Glow Overlay - Subtle rim lighting */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 2,
            delay: 8,
            repeat: Infinity,
            repeatDelay: 8,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/0 to-transparent">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>
        </motion.div>

        {/* Lens Flare Glint */}
        {isVideoLoaded && (
          <div 
            ref={glintRef}
            className="absolute top-1/4 -left-full w-[200%] h-[1px] pointer-events-none z-10"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.8) 50%, transparent 100%)',
              transform: 'rotate(15deg)',
              filter: 'blur(1px)'
            }}
          />
        )}

        {/* Particle Overlay Container */}
        {isVideoLoaded && (
          <div className="particle-container absolute inset-0 pointer-events-none z-5" />
        )}

        {/* ==================== MINIMAL GRADIENTS ==================== */}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/30 to-black/90" />
        
        {/* Center vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_25%,_black_95%)]" />
        
        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* ==================== LOADING STATE ==================== */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative">
            <div className="w-12 h-12 border border-gold/20 rounded-full" />
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-gold rounded-full animate-spin" />
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(212, 175, 55, 0)',
                  '0 0 40px rgba(212, 175, 55, 0.3)',
                  '0 0 20px rgba(212, 175, 55, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      )}

      {/* ==================== HERO CONTENT ==================== */}
      <div className="relative z-20 px-6 max-w-4xl mx-auto text-center">
        
        {/* Logo/Brand Mark (Minimal) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-6 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-xs tracking-[0.4em] text-gray-500 uppercase font-light">
              TIMEPIECE
            </span>
            <div className="w-6 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </motion.div>

        {/* Main Heading with Cinematic Animation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.8, 
            delay: 0.5,
            ease: [0.19, 1.0, 0.22, 1.0] // Custom ease for premium feel
          }}
          className="mb-8"
        >
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-none">
            <motion.span 
              className="block text-gray-100"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                filter: "blur(0px)",
                textShadow: [
                  "0 1px 2px rgba(0,0,0,0.1)",
                  "0 2px 20px rgba(0,0,0,0.3)",
                  "0 1px 2px rgba(0,0,0,0.1)"
                ]
              }}
              transition={{ 
                duration: 1.5,
                delay: 0.7
              }}
            >
              THE ART
            </motion.span>
            <motion.span 
              className="block text-gold mt-4 md:mt-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                textShadow: [
                  "0 0 20px rgba(212, 175, 55, 0)",
                  "0 0 40px rgba(212, 175, 55, 0.3)",
                  "0 0 60px rgba(212, 175, 55, 0.1)",
                  "0 0 20px rgba(212, 175, 55, 0)"
                ]
              }}
              transition={{ 
                duration: 4,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              OF TIME
            </motion.span>
          </h1>
        </motion.div>

        {/* Minimal Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="mb-16"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-gray-500 font-light">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Precision
            </motion.span>
            <span className="mx-4">•</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Craftsmanship
            </motion.span>
            <span className="mx-4">•</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Elegance
            </motion.span>
          </p>
        </motion.div>

        {/* Specification Dots (Minimal) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex justify-center gap-8 mb-20"
        >
          {[
            { label: "SWISS", value: "AUTOMATIC" },
            { label: "316L", value: "STEEL" },
            { label: "SAPPHIRE", value: "CRYSTAL" }
          ].map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.7 + index * 0.15,
                type: "spring",
                stiffness: 200
              }}
              className="text-center group"
            >
              <div className="text-xs tracking-widest text-gray-600 uppercase mb-2 group-hover:text-gold/60 transition-colors duration-300">
                {spec.label}
              </div>
              <div className="text-sm tracking-wider text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {spec.value}
              </div>
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.8 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Edition Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 2.2,
            type: "spring",
            stiffness: 200
          }}
          className="inline-block px-6 py-3 border border-gold/30 rounded-full bg-black/20 backdrop-blur-sm"
        >
          <span className="text-xs tracking-widest text-gold uppercase">
            LIMITED EDITION 2025
          </span>
          <motion.div 
            className="absolute inset-0 rounded-full border border-gold/10 pointer-events-none"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* ==================== ELEGANT SCROLL INDICATOR ==================== */}
      <motion.div
        className="absolute bottom-8 z-30 pointer-events-none"
        variants={scrollIndicatorVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-col items-center gap-3">
          {/* Animated Line */}
          <div className="relative">
            <div className="w-px h-24 bg-gradient-to-b from-gold/20 via-gold/50 to-transparent" />
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[2px] bg-gold rounded-full"
              animate={{
                y: [0, 96, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Label */}
          <div className="text-[10px] tracking-[0.4em] uppercase text-gray-600 font-light">
            EXPLORE
          </div>
        </div>
      </motion.div>

      {/* ==================== SUBTLE DETAILS ==================== */}
      
      {/* Corner Accents */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute top-8 left-8 hidden md:block pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-800" />
          <motion.div 
            className="text-xs text-gray-700"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            01
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="absolute top-8 right-8 hidden md:block pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            className="text-xs text-gray-700"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            TIMEPIECE
          </motion.div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-800" />
        </div>
      </motion.div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      
      {/* Cinematic Edge Glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-15"
        animate={{
          boxShadow: [
            'inset 0 0 100px rgba(0,0,0,0.8)',
            'inset 0 0 80px rgba(0,0,0,0.6)',
            'inset 0 0 100px rgba(0,0,0,0.8)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  )
}