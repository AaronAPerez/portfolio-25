/**
 * Advanced Analytics Component
 * 
 * Comprehensive analytics tracking including user behavior,
 * performance metrics, business KPIs, and conversion tracking.
 */

'use client'

import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { usePerformanceMonitor } from '@/hooks/performance/usePerformanceMonitor'

// Extended Window interface for analytics
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
    hotjar: (...args: unknown[]) => void;
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

interface ConversionEvent {
  event_name: string;
  event_category: 'engagement' | 'conversion' | 'business_goal';
  value?: number;
  currency?: string;
  items?: unknown[];
  custom_parameters?: Record<string, unknown>;
}

/**
 * Advanced Analytics Tracking Component
 */
export function AdvancedAnalytics() {
  const pathname = usePathname()
  const { getPerformanceScore } = usePerformanceMonitor()

  /**
   * Track custom analytics events
   */
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', event.action, event.custom_parameters)
    }

    // Custom analytics endpoint
    if (process.env.NODE_ENV === 'production') {
      fetch('/api/analytics/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          timestamp: Date.now(),
          url: window.location.href,
          user_agent: navigator.userAgent,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          }
        })
      }).catch(console.warn)
    }
  }, [])

  /**
   * Track conversion events
   */
  const trackConversion = useCallback((event: ConversionEvent) => {
    trackEvent({
      action: event.event_name,
      category: event.event_category,
      value: event.value,
      custom_parameters: {
        currency: event.currency,
        items: event.items
      }
    })

    // Enhanced conversion tracking for business goals
    if (event.event_category === 'business_goal') {
      // Track in specialized business metrics
      fetch('/api/analytics/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversion_type: event.event_name,
          value: event.value,
          timestamp: Date.now(),
          page: pathname,
          performance_score: getPerformanceScore()
        })
      }).catch(console.warn)
    }
  }, [trackEvent, pathname, getPerformanceScore])

  /**
   * Track user engagement patterns
   */
  const trackEngagement = useCallback(() => {
    let timeOnPage = 0
    let scrollDepth = 0
    let interactions = 0

    const startTime = Date.now()

    // Track scroll depth
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScrollDepth = Math.round((scrollTop / docHeight) * 100)
      
      if (currentScrollDepth > scrollDepth) {
        scrollDepth = currentScrollDepth
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90].includes(currentScrollDepth)) {
          trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${currentScrollDepth}%`,
            value: currentScrollDepth
          })
        }
      }
    }

    // Track interactions
    const handleInteraction = () => {
      interactions++
    }

    // Track time on page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        timeOnPage = Date.now() - startTime
        
        trackEvent({
          action: 'time_on_page',
          category: 'engagement',
          value: Math.round(timeOnPage / 1000), // Convert to seconds
          custom_parameters: {
            scroll_depth: scrollDepth,
            interactions,
            page: pathname
          }
        })
      }
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('click', handleInteraction, { passive: true })
    window.addEventListener('keydown', handleInteraction, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [trackEvent, pathname])

  /**
   * Track business-specific KPIs
   */
  const trackBusinessKPIs = useCallback(() => {
    // Track portfolio-specific metrics
    const portfolioMetrics = {
      project_views: 0,
      case_study_opens: 0,
      contact_form_starts: 0,
      resume_downloads: 0,
      external_link_clicks: 0
    }

    // Project card views
    const observeProjectCards = () => {
      const projectCards = document.querySelectorAll('[data-testid*="project-card"]')
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            portfolioMetrics.project_views++
            const projectId = entry.target.getAttribute('data-project-id')
            
            trackEvent({
              action: 'project_view',
              category: 'portfolio_engagement',
              label: projectId || 'unknown',
              custom_parameters: { project_id: projectId }
            })
          }
        })
      }, { threshold: 0.5 })

      projectCards.forEach(card => observer.observe(card))
      return () => observer.disconnect()
    }

    // Case study modal opens
    const trackCaseStudyOpens = () => {
      const caseStudyButtons = document.querySelectorAll('[data-action="open-case-study"]')
      const handleCaseStudyOpen = (event: Event) => {
        portfolioMetrics.case_study_opens++
        const projectId = (event.target as HTMLElement)?.getAttribute('data-project-id')
        
        trackConversion({
          event_name: 'case_study_view',
          event_category: 'engagement',
          custom_parameters: { project_id: projectId }
        })
      }

      caseStudyButtons.forEach(button => {
        button.addEventListener('click', handleCaseStudyOpen)
      })

      return () => {
        caseStudyButtons.forEach(button => {
          button.removeEventListener('click', handleCaseStudyOpen)
        })
      }
    }

    // Contact form interactions
    const trackContactFormEngagement = () => {
      const contactForm = document.querySelector('[data-form="contact"]')
      if (!contactForm) return () => {}

      const handleFormStart = () => {
        portfolioMetrics.contact_form_starts++
        trackConversion({
          event_name: 'contact_form_start',
          event_category: 'conversion'
        })
      }

      const handleFormSubmit = () => {
        trackConversion({
          event_name: 'contact_form_submit',
          event_category: 'business_goal',
          value: 100 // Assign business value to leads
        })
      }

      const firstInput = contactForm.querySelector('input, textarea')
      firstInput?.addEventListener('focus', handleFormStart, { once: true })
      contactForm.addEventListener('submit', handleFormSubmit)

      return () => {
        firstInput?.removeEventListener('focus', handleFormStart)
        contactForm.removeEventListener('submit', handleFormSubmit)
      }
    }

    // Resume downloads
    const trackResumeDownloads = () => {
      const resumeLinks = document.querySelectorAll('[data-action="download-resume"]')
      const handleResumeDownload = () => {
        portfolioMetrics.resume_downloads++
        trackConversion({
          event_name: 'resume_download',
          event_category: 'business_goal',
          value: 50 // Assign business value
        })
      }

      resumeLinks.forEach(link => {
        link.addEventListener('click', handleResumeDownload)
      })

      return () => {
        resumeLinks.forEach(link => {
          link.removeEventListener('click', handleResumeDownload)
        })
      }
    }

    // External link tracking
    const trackExternalLinks = () => {
      const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="aaronaperez.dev"])')
      const handleExternalClick = (event: Event) => {
        portfolioMetrics.external_link_clicks++
        const href = (event.target as HTMLAnchorElement)?.href
        
        trackEvent({
          action: 'external_link_click',
          category: 'engagement',
          label: href,
          custom_parameters: { destination: href }
        })
      }

      externalLinks.forEach(link => {
        link.addEventListener('click', handleExternalClick)
      })

      return () => {
        externalLinks.forEach(link => {
          link.removeEventListener('click', handleExternalClick)
        })
      }
    }

    // Initialize all tracking
    const cleanupFunctions = [
      observeProjectCards(),
      trackCaseStudyOpens(),
      trackContactFormEngagement(),
      trackResumeDownloads(),
      trackExternalLinks()
    ]

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [trackEvent, trackConversion])

  /**
   * Enhanced error tracking
   */
  const trackErrors = useCallback(() => {
    // JavaScript errors
    const handleError = (event: ErrorEvent) => {
      trackEvent({
        action: 'javascript_error',
        category: 'error',
        label: event.message,
        custom_parameters: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        }
      })
    }

    // Unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent({
        action: 'unhandled_promise_rejection',
        category: 'error',
        label: event.reason?.toString(),
        custom_parameters: {
          reason: event.reason,
          page: pathname
        }
      })
    }

    // Resource loading errors
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement
      trackEvent({
        action: 'resource_error',
        category: 'error',
        label: target.tagName,
        custom_parameters: {
          src: target.getAttribute('src') || target.getAttribute('href'),
          type: target.tagName.toLowerCase()
        }
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    document.addEventListener('error', handleResourceError, true)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      document.removeEventListener('error', handleResourceError, true)
    }
  }, [trackEvent, pathname])

  // Initialize all tracking on mount
  useEffect(() => {
    const cleanupFunctions = [
      trackEngagement(),
      trackBusinessKPIs(),
      trackErrors()
    ]

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [trackEngagement, trackBusinessKPIs, trackErrors])

  // Track page views
  useEffect(() => {
    if (pathname) {
      trackEvent({
        action: 'page_view',
        category: 'navigation',
        label: pathname,
        custom_parameters: {
          page_title: document.title,
          referrer: document.referrer
        }
      })
    }
  }, [pathname, trackEvent])

  return null // This component doesn't render unknownthing
}

export default AdvancedAnalytics