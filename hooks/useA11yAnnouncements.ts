/**
 * Accessibility Announcements Hook
 * 
 * Provides screen reader announcements for dynamic content changes.
 * Uses ARIA live regions to communicate updates to assistive technology.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

import { useCallback, useRef, useEffect } from 'react'

/**
 * Announcement priority levels
 */
type AnnouncementPriority = 'polite' | 'assertive'

/**
 * Configuration options for announcements
 */
interface AnnouncementOptions {
  /** Priority level for the announcement */
  priority?: AnnouncementPriority;
  /** Delay before making the announcement (ms) */
  delay?: number;
  /** Whether to clear previous announcements */
  clearPrevious?: boolean;
  /** How long to keep the announcement visible (ms) */
  duration?: number;
}

/**
 * Default configuration for announcements
 */
const DEFAULT_OPTIONS: Required<AnnouncementOptions> = {
  priority: 'polite',
  delay: 100,
  clearPrevious: true,
  duration: 3000,
};

/**
 * Hook for managing screen reader announcements
 * 
 * Creates and manages ARIA live regions for announcing dynamic content
 * changes to assistive technology users.
 * 
 * @returns Object with announcement methods
 */
export function useA11yAnnouncements() {
  const politeRef = useRef<HTMLDivElement | null>(null);
  const assertiveRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize live regions on mount
  useEffect(() => {
    // Only run on client side
    if (typeof document === 'undefined') return;

    // Create polite live region if it doesn't exist
    if (!politeRef.current) {
      let politeRegion = document.getElementById('a11y-announcements-polite') as HTMLDivElement;
      
      if (!politeRegion) {
        politeRegion = document.createElement('div');
        politeRegion.setAttribute('aria-live', 'polite');
        politeRegion.setAttribute('aria-atomic', 'true');
        politeRegion.setAttribute('class', 'sr-only');
        politeRegion.setAttribute('id', 'a11y-announcements-polite');
        politeRegion.style.cssText = `
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        `;
        document.body.appendChild(politeRegion);
      }
      
      politeRef.current = politeRegion;
    }

    // Create assertive live region if it doesn't exist
    if (!assertiveRef.current) {
      let assertiveRegion = document.getElementById('a11y-announcements-assertive') as HTMLDivElement;
      
      if (!assertiveRegion) {
        assertiveRegion = document.createElement('div');
        assertiveRegion.setAttribute('aria-live', 'assertive');
        assertiveRegion.setAttribute('aria-atomic', 'true');
        assertiveRegion.setAttribute('class', 'sr-only');
        assertiveRegion.setAttribute('id', 'a11y-announcements-assertive');
        assertiveRegion.style.cssText = `
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        `;
        document.body.appendChild(assertiveRegion);
      }
      
      assertiveRef.current = assertiveRegion;
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Announces a message to screen readers
   * 
   * @param message - The message to announce
   * @param options - Configuration options for the announcement
   */
  const announce = useCallback((
    message: string, 
    options: AnnouncementOptions = {}
  ) => {
    if (!message || typeof document === 'undefined') return;

    const config = { ...DEFAULT_OPTIONS, ...options };
    const targetRef = config.priority === 'assertive' ? assertiveRef : politeRef;

    if (!targetRef.current) return;

    // Clear previous announcement if requested
    if (config.clearPrevious) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }
      targetRef.current.textContent = '';
    }

    // Announce after a small delay to ensure screen readers pick it up
    timeoutRef.current = setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.textContent = message;
        
        // Clear the announcement after specified duration
        clearTimeoutRef.current = setTimeout(() => {
          if (targetRef.current) {
            targetRef.current.textContent = '';
          }
        }, config.duration);
      }
    }, config.delay);
  }, []);

  /**
   * Announces success messages with appropriate styling
   * 
   * @param message - Success message to announce
   * @param options - Additional configuration options
   */
  const announceSuccess = useCallback((
    message: string, 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    announce(`Success: ${message}`, { 
      ...options, 
      priority: 'polite' 
    });
  }, [announce]);

  /**
   * Announces error messages with high priority
   * 
   * @param message - Error message to announce
   * @param options - Additional configuration options
   */
  const announceError = useCallback((
    message: string, 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    announce(`Error: ${message}`, { 
      ...options, 
      priority: 'assertive' 
    });
  }, [announce]);

  /**
   * Announces loading states
   * 
   * @param message - Loading message (defaults to "Loading")
   * @param options - Additional configuration options
   */
  const announceLoading = useCallback((
    message: string = 'Loading', 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    announce(message, { 
      ...options, 
      priority: 'polite' 
    });
  }, [announce]);

  /**
   * Announces when loading is complete
   * 
   * @param message - Completion message (defaults to "Loading complete")
   * @param options - Additional configuration options
   */
  const announceLoadingComplete = useCallback((
    message: string = 'Loading complete', 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    announce(message, { 
      ...options, 
      priority: 'polite',
      delay: 200 // Slight delay to ensure it comes after loading announcement
    });
  }, [announce]);

  /**
   * Announces navigation changes
   * 
   * @param pageName - Name of the page navigated to
   * @param options - Additional configuration options
   */
  const announceNavigation = useCallback((
    pageName: string, 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    announce(`Navigated to ${pageName}`, { 
      ...options, 
      priority: 'polite', 
      delay: 200 
    });
  }, [announce]);

  /**
   * Announces form validation results
   * 
   * @param isValid - Whether the form is valid
   * @param errorCount - Number of errors (if invalid)
   * @param options - Additional configuration options
   */
  const announceFormValidation = useCallback((
    isValid: boolean, 
    errorCount: number = 0, 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    if (isValid) {
      announceSuccess('Form is valid and ready to submit', options);
    } else {
      announceError(
        `Form has ${errorCount} error${errorCount === 1 ? '' : 's'}. Please review and correct.`, 
        options
      );
    }
  }, [announceSuccess, announceError]);

  /**
   * Announces search results
   * 
   * @param resultCount - Number of search results
   * @param query - Search query (optional)
   * @param options - Additional configuration options
   */
  const announceSearchResults = useCallback((
    resultCount: number, 
    query?: string, 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    const queryText = query ? ` for "${query}"` : '';
    const message = `Found ${resultCount} result${resultCount === 1 ? '' : 's'}${queryText}`;
    announce(message, { 
      ...options, 
      priority: 'polite' 
    });
  }, [announce]);

  /**
   * Announces filter changes
   * 
   * @param filterName - Name of the filter applied
   * @param resultCount - Number of results after filtering
   * @param options - Additional configuration options
   */
  const announceFilterChange = useCallback((
    filterName: string, 
    resultCount: number, 
    options: Omit<AnnouncementOptions, 'priority'> = {}
  ) => {
    announce(
      `Applied ${filterName} filter. Showing ${resultCount} result${resultCount === 1 ? '' : 's'}.`, 
      { ...options, priority: 'polite' }
    );
  }, [announce]);

  /**
   * Clears all current announcements
   */
  const clearAnnouncements = useCallback(() => {
    if (politeRef.current) {
      politeRef.current.textContent = '';
    }
    if (assertiveRef.current) {
      assertiveRef.current.textContent = '';
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (clearTimeoutRef.current) {
      clearTimeout(clearTimeoutRef.current);
    }
  }, []);

  return {
    // Core announcement method
    announce,
    
    // Specialized announcement methods
    announceSuccess,
    announceError,
    announceLoading,
    announceLoadingComplete,
    announceNavigation,
    announceFormValidation,
    announceSearchResults,
    announceFilterChange,
    
    // Utility methods
    clearAnnouncements,
  };
}

/**
 * Simplified hook for basic announcements
 * 
 * @returns Basic announcement utilities
 */
export function useSimpleA11yAnnouncements() {
  const { announce, announceSuccess, announceError } = useA11yAnnouncements();
  
  return {
    announce,
    announceSuccess,
    announceError,
  };
}

// Type exports
export type { AnnouncementOptions, AnnouncementPriority };

// Default export
export default useA11yAnnouncements;