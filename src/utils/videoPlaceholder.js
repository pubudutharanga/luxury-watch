// utils/videoPlaceholder.js
export const getVideoPlaceholder = (componentName) => {
  const placeholders = {
    'hero': '/videos/hero-bg.mp4',
    'particles': '/videos/particles-loop.mp4',
    'box': '/videos/box-unboxing.mp4',
    'seal': '/videos/seal-break.mp4',
    'lid': '/videos/lid-reveal.mp4',
    'watch': '/videos/watch-rise.mp4',
    'exploded': '/videos/exploded-animation.mp4',
    'finale': '/videos/finale-polish.mp4'
  }
  
  return placeholders[componentName] || '/videos/default.mp4'
}

export const createVideoFallback = (componentName) => {
  const fallbacks = {
    'hero': () => import('../assets/hero-fallback.jpg'),
    'seal': () => import('../assets/seal-fallback.jpg'),
    'lid': () => import('../assets/lid-fallback.jpg')
  }
  
  return fallbacks[componentName]?.() || null
}