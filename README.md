# Dark Luxury Watch Unboxing Experience

> A cinematic prototype web experience showcasing luxury watch unboxing.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.157.0-000000?logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

This prototype demonstrates a premium digital unboxing experience combining modern web technologies with luxury design principles. Built as a proof-of-concept for high-end product presentations and marketing campaigns.

**⚠️ Note:** This is a prototype/demonstration project and not intended for production use.

## Key Features

- **Interactive 7-Stage Journey** - Guided unboxing experience with progressive storytelling
- **Cinematic Animations** - Movie-quality transitions using Framer Motion
- **Advanced Video Integration** - Multi-player system with adaptive quality and custom controls
- **Luxury Design System** - Premium gold-themed UI with glass morphism effects
- **Responsive Design** - Optimized experience across desktop, tablet, and mobile devices

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks and concurrent features |
| **Vite** | Lightning-fast build tool and development server |
| **Tailwind CSS** | Utility-first styling with custom luxury theme |
| **Framer Motion** | Production-grade animation library |
| **Three.js** | WebGL 3D graphics rendering |
| **React Three Fiber** | React renderer for Three.js |
| **Lucide React** | Modern icon system |

## Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm, yarn, or pnpm
- Modern browser with WebGL support
- ~500MB free disk space for assets

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dark-luxury-unboxing

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Video Assets Setup

Create a `public/videos/` directory and add the following video files:

```
public/videos/
├── hero-bg.mp4             # Hero background loop
├── box-unboxing.mp4        # Initial box presentation
├── seal-break.mp4          # Wax seal breaking
├── lid-open.mp4            # Lid opening sequence
├── watch-rise.mp4          # Watch reveal animation
├── exploded-animation.mp4  # Technical breakdown
└── finale-polish.mp4       # Final polish scene
```

**Alternative:** The project includes fallback URLs to free stock videos from Mixkit that work automatically during development.

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx                    # Cinematic hero section
│   ├── ParallaxBox.jsx             # 3D parallax box viewer
│   ├── SealBreak.jsx               # Interactive seal breaking
│   ├── LidReveal.jsx               # Hydraulic lid animation
│   ├── WatchRise.jsx               # Anti-gravity watch reveal
│   ├── ExplodedView.jsx            # Technical component view
│   ├── 3DWatchView.jsx             # Interactive 3D model
│   ├── Finale.jsx                  # Final polishing scene
│   ├── ParticleBackground.jsx      # Dynamic particle system
│   ├── ScrollProgress.jsx          # Progress indicator
│   ├── VideoControls.jsx           # Custom video controls
│   ├── EnhancedVideoPlayer.jsx     # Advanced video player
│   └── VideoLoader.jsx             # Video loading handler
├── hooks/
│   ├── useParallax.js              # Parallax scroll effects
│   ├── useSmoothScroll.jsx         # Smooth scrolling behavior
│   ├── useVideoPerformance.js      # Video optimization
│   ├── useParticleIntensity.jsx    # Particle density control
│   └── useVideoController.jsx      # Video state management
├── styles/
│   └── globals.css                 # Global styles & animations
├── lib/
│   └── utils.js                    # Utility functions
├── App.jsx                         # Main application component
└── main.jsx                        # Application entry point
```

## Component Overview

### Interactive Stages

1. **Hero Section** - Fullscreen video background with animated particles and lens flares
2. **Parallax Box** - 3D mouse-tracking box with technical specifications
3. **Seal Break** - Click-to-break wax seal with haptic feedback
4. **Lid Reveal** - Hydraulic damper simulation with precise angle control
5. **Watch Rise** - Slow-motion anti-gravity reveal with floating effects
6. **Exploded View** - Technical breakdown with interactive timeline
7. **Finale** - Final polishing scene with cinematic flair

### Custom Hooks

**`useParallax()`** - Advanced parallax effects with mouse tracking and scroll position
```javascript
const { springs, mousePosition, scrollPosition } = useParallax(0.5);
```

**`useVideoController()`** - Complete video playback management
```javascript
const { videoRef, isPlaying, progress, togglePlay, seek } = useVideoController();
```

**`useVideoPerformance()`** - Network-aware video quality optimization

## Development

### Available Scripts

```bash
npm run dev      # Start development server on port 5173
npm run build    # Create optimized production build
npm run preview  # Preview production build locally
```

### Configuration Files

- **`tailwind.config.js`** - Custom color palette, animations, and utilities
- **`vite.config.js`** - Build optimization and code splitting
- **`postcss.config.js`** - CSS processing configuration

### Design System

**Colors:**
- Primary Gold: `#D4AF37`
- Light Gold: `#FFD700`
- Dark Gold: `#B8860B`
- Background: `#000000`
- Text: `#E6E6E6`

**Typography:**
- Headings: DM Serif Display (serif)
- Body: Inter (sans-serif)

**Animations:**
- Float (6s infinite)
- Glow (2s alternate)
- Shimmer (2s infinite)

## Performance Optimizations

- **Lazy loading** for video assets
- **Code splitting** for vendor libraries
- **GPU acceleration** for animations and 3D rendering
- **Debounced scroll handlers** for smooth performance
- **Adaptive quality** based on network conditions
- **Reduced particle density** on mobile devices

## Browser Support

| Browser | Support Level |
|---------|--------------|
| Chrome 90+ | ✅ Full support |
| Firefox 88+ | ✅ Full support |
| Safari 14+ | ⚠️ Limited 3D features |
| Edge 90+ | ✅ Full support |

## Known Limitations

This is a **prototype** and has the following limitations:

- Video assets are placeholders or require manual addition
- Not optimized for production deployment
- Limited accessibility features
- No backend integration or data persistence
- Performance may vary based on hardware capabilities

## Troubleshooting

**Videos not loading?**
- Verify files exist in `public/videos/` directory
- Check video format (MP4/H.264 codec recommended)
- Fallback URLs will load automatically if local files are missing

**Performance issues?**
- Lower video quality settings
- Test on a device with better GPU capabilities


## Contributing

This is a prototype project. For suggestions or improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

MIT License 

## Acknowledgments

- **Icons**: [Lucide](https://lucide.dev/) - Open-source icon library
- **3D Graphics**: [Three.js](https://threejs.org/) - WebGL framework
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Animation library
- **Fonts**: [Google Fonts](https://fonts.google.com/) - DM Serif Display, Inter

---

*This is a prototype project for educational and demonstration purposes only.*