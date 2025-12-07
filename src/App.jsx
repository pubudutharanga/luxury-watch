// App.jsx - Fixed and Working
import React from 'react'
import Hero from './components/Hero'
import ParallaxBox from './components/ParallaxBox'
import SealBreak from './components/SealBreak'
import LidReveal from './components/LidReveal'
import WatchRise from './components/WatchRise'
import ExplodedView from './components/ExplodedView'
import Finale from './components/Finale'
import ParticleBackground from './components/ParticleBackground'
import ScrollProgress from './components/ScrollProgress'
import './styles/globals.css'

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <ParticleBackground />
      <ScrollProgress />
      
      <main className='overflow-x-hidden'>
        <Hero />
        <ParallaxBox />
        <SealBreak />
        <LidReveal />
        <WatchRise />
        <ExplodedView />
        <Finale />
      </main>

      {/* Global Footer */}
      <footer className='py-8 border-t border-gray-900/50 bg-black/50 backdrop-blur-sm'>
        <div className='container mx-auto px-6 text-center'>
          <div className='text-sm text-gray-500'>
            <p>© {new Date().getFullYear()} Dark Luxury Timepieces. All rights reserved.</p>
            <p className='mt-2 text-xs text-gray-600'>
              This interactive experience showcases our unboxing ceremony. All videos are for demonstration purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}