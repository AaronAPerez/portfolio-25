'use client'

import { useEffect } from 'react'

export const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0]
        
        // Track Core Web Vitals
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            event_category: 'performance',
            value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
          })
        }
      })
    }
  }, [])

  return null
}