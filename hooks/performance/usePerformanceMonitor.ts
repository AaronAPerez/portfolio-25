/**
 * Performance Monitor Hook
 * 
 * Provides utilities for tracking, storing, and analyzing performance metrics.
 * Supports Core Web Vitals and custom performance measurements.
 * 
 * @example
 * ```tsx
 * const { recordMetric, getMetrics, getAverages } = usePerformanceMonitor()
 * recordMetric({ name: 'Custom_Metric', value: 123, rating: 'good' })
 * ```
 */

import { useState, useCallback, useEffect } from 'react'

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  url?: string;
}

interface MetricAverages {
  [metricName: string]: {
    average: number;
    count: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    trend: 'improving' | 'stable' | 'declining';
  };
}

const METRIC_STORAGE_KEY = 'portfolio_performance_metrics'
const MAX_STORED_METRICS = 1000

/**
 * Hook for monitoring and analyzing performance metrics
 */
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load stored metrics on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(METRIC_STORAGE_KEY)
      if (stored) {
        const parsedMetrics = JSON.parse(stored)
        setMetrics(parsedMetrics.slice(-MAX_STORED_METRICS))
      }
    } catch (error) {
      console.warn('Failed to load stored performance metrics:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save metrics to localStorage when they change
  useEffect(() => {
    if (!isLoading && metrics.length > 0) {
      try {
        localStorage.setItem(METRIC_STORAGE_KEY, JSON.stringify(metrics))
      } catch (error) {
        console.warn('Failed to save performance metrics:', error)
      }
    }
  }, [metrics, isLoading])

  /**
   * Records a new performance metric
   */
  const recordMetric = useCallback((metric: Omit<PerformanceMetric, 'timestamp'> & { timestamp?: number }) => {
    const newMetric: PerformanceMetric = {
      ...metric,
      timestamp: metric.timestamp || Date.now(),
      url: metric.url || (typeof window !== 'undefined' ? window.location.pathname : undefined),
    }

    setMetrics(prev => {
      const updated = [...prev, newMetric]
      // Keep only the most recent metrics
      return updated.slice(-MAX_STORED_METRICS)
    })
  }, [])

  /**
   * Gets all stored metrics
   */
  const getMetrics = useCallback((metricName?: string, timeRange?: number) => {
    let filtered = metrics

    if (metricName) {
      filtered = filtered.filter(m => m.name === metricName)
    }

    if (timeRange) {
      const cutoff = Date.now() - timeRange
      filtered = filtered.filter(m => m.timestamp > cutoff)
    }

    return filtered
  }, [metrics])

  /**
   * Calculates average values and trends for metrics
   */
  const getAverages = useCallback((timeRange?: number): MetricAverages => {
    const relevantMetrics = getMetrics(undefined, timeRange)
    const grouped = relevantMetrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = []
      }
      acc[metric.name].push(metric)
      return acc
    }, {} as Record<string, PerformanceMetric[]>)

    return Object.entries(grouped).reduce((acc, [name, metricList]) => {
      const values = metricList.map(m => m.value)
      const average = values.reduce((sum, val) => sum + val, 0) / values.length
      
      // Determine overall rating based on most recent metrics
      const recentMetrics = metricList.slice(-5)
      const ratings = recentMetrics.map(m => m.rating)
      const goodCount = ratings.filter(r => r === 'good').length
      const rating = goodCount > ratings.length / 2 ? 'good' : 
                   goodCount > 0 ? 'needs-improvement' : 'poor'

      // Calculate trend (comparing first half vs second half of metrics)
      let trend: 'improving' | 'stable' | 'declining' = 'stable'
      if (metricList.length >= 10) {
        const midPoint = Math.floor(metricList.length / 2)
        const firstHalf = metricList.slice(0, midPoint)
        const secondHalf = metricList.slice(midPoint)
        
        const firstAvg = firstHalf.reduce((sum, m) => sum + m.value, 0) / firstHalf.length
        const secondAvg = secondHalf.reduce((sum, m) => sum + m.value, 0) / secondHalf.length
        
        const change = (secondAvg - firstAvg) / firstAvg
        if (Math.abs(change) > 0.1) { // 10% change threshold
          // For metrics like LCP, CLS - lower is better
          const isLowerBetter = ['LCP', 'CLS', 'FID', 'TTFB'].includes(name)
          trend = isLowerBetter 
            ? (change < 0 ? 'improving' : 'declining')
            : (change > 0 ? 'improving' : 'declining')
        }
      }

      acc[name] = {
        average,
        count: metricList.length,
        rating,
        trend,
      }
      return acc
    }, {} as MetricAverages)
  }, [getMetrics])

  /**
   * Gets performance score based on Core Web Vitals
   */
  const getPerformanceScore = useCallback(() => {
    const recentMetrics = getMetrics(undefined, 24 * 60 * 60 * 1000) // Last 24 hours
    const coreVitals = ['LCP', 'FID', 'CLS']
    
    let score = 0
    let count = 0

    coreVitals.forEach(vital => {
      const vitalMetrics = recentMetrics.filter(m => m.name === vital)
      if (vitalMetrics.length > 0) {
        const latestMetric = vitalMetrics[vitalMetrics.length - 1]
        let metricScore = 0
        
        switch (latestMetric.rating) {
          case 'good':
            metricScore = 100
            break
          case 'needs-improvement':
            metricScore = 75
            break
          case 'poor':
            metricScore = 25
            break
        }
        
        score += metricScore
        count++
      }
    })

    return count > 0 ? Math.round(score / count) : null
  }, [getMetrics])

  /**
   * Clears all stored metrics
   */
  const clearMetrics = useCallback(() => {
    setMetrics([])
    localStorage.removeItem(METRIC_STORAGE_KEY)
  }, [])

  return {
    metrics,
    isLoading,
    recordMetric,
    getMetrics,
    getAverages,
    getPerformanceScore,
    clearMetrics,
  }
}

export default usePerformanceMonitor