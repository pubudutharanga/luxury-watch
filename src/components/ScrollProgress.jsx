// src/components/ScrollProgress.jsx
import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
      setProgress((windowScroll / totalHeight) * 100);
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-gold via-yellow-500 to-gold transition-all duration-300 ease-out progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}