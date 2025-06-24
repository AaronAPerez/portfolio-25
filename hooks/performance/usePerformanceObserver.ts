/**
 * Performance Observer Hook
 * 
 * Hook for observing performance entries using the Performance Observer API.
 * Provides utilities for monitoring navigation, resource loading, and user timing.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

import { useEffect, useCallback, useState } from 'react'

/**
 * Performance entry interface
 */
export interface ObservedPerformanceEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  timestamp: number;
}

/**
 * Performance observer configuration
 */
interface PerformanceObserverConfig {
  entryTypes: string[];
  buffered?: boolean;
  onEntry?: (entry: ObservedPerformanceEntry) => void;
}

/**
 * Hook for observing performance entries
 * 
 * @param config - Configuration for the performance observer
 * @returns Object with observed entries and utilities
 */
export function usePerformanceObserver(config: PerformanceObserverConfig) {
  const [entries, setEntries] = useState<ObservedPerformanceEntry[]>([]);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if PerformanceObserver is supported
    if (typeof window === 'undefined' || !window.PerformanceObserver) {
      setIsSupported(false);
      return;
    }

    setIsSupported(true);

    try {
      const observer = new PerformanceObserver((list) => {
        const newEntries = list.getEntries().map((entry): ObservedPerformanceEntry => ({
          name: entry.name,
          entryType: entry.entryType,
          startTime: entry.startTime,
          duration: entry.duration,
          timestamp: Date.now(),
        }));

        setEntries(prev => [...prev, ...newEntries]);

        // Call callback for each entry if provided
        if (config.onEntry) {
          newEntries.forEach(config.onEntry);
        }
      });

      observer.observe({
        entryTypes: config.entryTypes,
        buffered: config.buffered
      });

      return () => {
        observer.disconnect();
      };
    } catch (error) {
      console.warn('Failed to initialize PerformanceObserver:', error);
      setIsSupported(false);
    }
  }, [config.entryTypes, config.buffered, config.onEntry]);

  /**
   * Gets entries by type
   */
  const getEntriesByType = useCallback((entryType: string) => {
    return entries.filter(entry => entry.entryType === entryType);
  }, [entries]);

  /**
   * Gets entries by name
   */
  const getEntriesByName = useCallback((name: string) => {
    return entries.filter(entry => entry.name === name);
  }, [entries]);

  /**
   * Clears all observed entries
   */
  const clearEntries = useCallback(() => {
    setEntries([]);
  }, []);

  return {
    entries,
    isSupported,
    getEntriesByType,
    getEntriesByName,
    clearEntries,
  };
}

/**
 * Hook for observing navigation timing
 */
export function useNavigationTiming() {
  return usePerformanceObserver({
    entryTypes: ['navigation'],
    buffered: true,
  });
}

/**
 * Hook for observing resource loading
 */
export function useResourceTiming() {
  return usePerformanceObserver({
    entryTypes: ['resource'],
    buffered: false,
  });
}

export default usePerformanceObserver;