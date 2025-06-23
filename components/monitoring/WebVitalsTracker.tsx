'use client'

import { useEffect } from 'react'

export function WebVitalsTracker() {
  useEffect(() => {
    // Only load in production and client-side
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return
    }

    // Dynamically import web-vitals to avoid SSR issues
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const sendToAnalytics = (metric: import('web-vitals').Metric) => {
        console.log('Web Vital:', metric)
        
        // Send to Google Analytics if available
        if (window.gtag) {
          window.gtag('event', metric.name, {
            value: Math.round(metric.value),
            event_category: 'Web Vitals'
          })
        }
      }

      onCLS(sendToAnalytics)
      onINP(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
    }).catch(error => {
      console.warn('Failed to load web-vitals:', error)
    })
  }, [])

  return null
}