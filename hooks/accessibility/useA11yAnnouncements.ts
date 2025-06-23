/**
 * Accessibility Announcements Hook
 * 
 * Provides screen reader announcements for dynamic content changes.
 * Uses ARIA live regions to communicate updates to assistive technology.
 * 
 * @example
 * ```tsx
 * const { announce } = useA11yAnnouncements()
 * announce('Form submitted successfully', 'polite')
 * ```
 */
import { useCallback, useRef, useEffect } from 'react'

type AnnouncementPriority = 'polite' | 'assertive'

interface AnnouncementOptions {
  priority?: AnnouncementPriority;
  delay?: number;
  clearPrevious?: boolean;
}

/**
 * Hook for managing screen reader announcements
 */
export function useA11yAnnouncements() {
  const politeRef = useRef<HTMLDivElement | null>(null)
  const assertiveRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Create live region elements if they don't exist
    if (!politeRef.current) {
      const politeRegion = document.createElement('div')
      politeRegion.setAttribute('aria-live', 'polite')
      politeRegion.setAttribute('aria-atomic', 'true')
      politeRegion.setAttribute('class', 'sr-only')
      politeRegion.setAttribute('id', 'a11y-announcements-polite')
      document.body.appendChild(politeRegion)
      politeRef.current = politeRegion
    }

    if (!assertiveRef.current) {
      const assertiveRegion = document.createElement('div')
      assertiveRegion.setAttribute('aria-live', 'assertive')
      assertiveRegion.setAttribute('aria-atomic', 'true')
      assertiveRegion.setAttribute('class', 'sr-only')
      assertiveRegion.setAttribute('id', 'a11y-announcements-assertive')
      document.body.appendChild(assertiveRegion)
      assertiveRef.current = assertiveRegion
    }

    return () => {
      // Cleanup on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  /**
   * Announces a message to screen readers
   * 
   * @param message - The message to announce
   * @param options - Announcement configuration
   */
  const announce = useCallback((
    message: string, 
    options: AnnouncementOptions = {}
  ) => {
    const {
      priority = 'polite',
      delay = 100,
      clearPrevious = true
    } = options

    const targetRef = priority === 'assertive' ? assertiveRef : politeRef

    if (!targetRef.current) return

    // Clear previous announcement if requested
    if (clearPrevious && timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      targetRef.current.textContent = ''
    }

    // Announce after a small delay to ensure screen readers pick it up
    timeoutRef.current = setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.textContent = message
        
        // Clear the announcement after it's been read
        setTimeout(() => {
          if (targetRef.current) {
            targetRef.current.textContent = ''
          }
        }, 3000)
      }
    }, delay)
  }, [])

  /**
   * Announces success messages
   */
  const announceSuccess = useCallback((message: string) => {
    announce(`Success: ${message}`, { priority: 'polite' })
  }, [announce])

  /**
   * Announces error messages
   */
  const announceError = useCallback((message: string) => {
    announce(`Error: ${message}`, { priority: 'assertive' })
  }, [announce])

  /**
   * Announces loading states
   */
  const announceLoading = useCallback((message: string = 'Loading') => {
    announce(message, { priority: 'polite' })
  }, [announce])

  /**
   * Announces navigation changes
   */
  const announceNavigation = useCallback((pageName: string) => {
    announce(`Navigated to ${pageName}`, { priority: 'polite', delay: 200 })
  }, [announce])

  return {
    announce,
    announceSuccess,
    announceError,
    announceLoading,
    announceNavigation
  }
}

export default useA11yAnnouncements