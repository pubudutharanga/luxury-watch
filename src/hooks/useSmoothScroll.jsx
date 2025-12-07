// hooks/useSmoothScroll.jsx
import { useEffect } from 'react'

export default function useSmoothScroll() {
  useEffect(() => {
    // Enable smooth scrolling on the HTML element
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Handle anchor links with smooth scrolling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const id = target.getAttribute('href').slice(1)
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])
}