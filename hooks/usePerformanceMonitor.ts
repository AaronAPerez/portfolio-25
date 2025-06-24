/**
 * Performance Monitor Hook
 * 
 * Provides utilities for tracking, storing, and analyzing performance metrics.
 * Supports Core Web Vitals and custom performance measurements.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

import { useState, useCallback, useEffect } from 'react'

/**
 * Performance metric interface
 */
export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  url?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Metric averages and trends interface
 */
export interface MetricAverages {
  [metricName: string]: {
    average: number;
    count: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    trend: 'improving' | 'stable' | 'declining';
    lastUpdated: number;
  };
}

/**
 * Performance monitoring configuration
 */
interface PerformanceMonitorConfig {
  maxStoredMetrics?: number;
  enableLocalStorage?: boolean;
  storageKey?: string;
  enableAnalytics?: boolean;
}

const DEFAULT_CONFIG: PerformanceMonitorConfig = {
  maxStoredMetrics: 1000,
  enableLocalStorage: true,
  storageKey: 'portfolio_performance_metrics',
  enableAnalytics: true,
};

/**
 * Hook for monitoring and analyzing performance metrics
 * 
 * @param config - Configuration options for performance monitoring
 * @returns Object with monitoring utilities and current metrics
 */
export function usePerformanceMonitor(config: PerformanceMonitorConfig = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load stored metrics on mount
  useEffect(() => {
    if (!finalConfig.enableLocalStorage || typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem(finalConfig.storageKey!);
      if (stored) {
        const parsedMetrics = JSON.parse(stored);
        if (Array.isArray(parsedMetrics)) {
          setMetrics(parsedMetrics.slice(-finalConfig.maxStoredMetrics!));
        }
      }
    } catch (error) {
      console.warn('Failed to load stored performance metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [finalConfig.enableLocalStorage, finalConfig.storageKey, finalConfig.maxStoredMetrics]);

  // Save metrics to localStorage when they change
  useEffect(() => {
    if (!isLoading && 
        metrics.length > 0 && 
        finalConfig.enableLocalStorage && 
        typeof window !== 'undefined') {
      try {
        localStorage.setItem(finalConfig.storageKey!, JSON.stringify(metrics));
      } catch (error) {
        console.warn('Failed to save performance metrics:', error);
      }
    }
  }, [metrics, isLoading, finalConfig.enableLocalStorage, finalConfig.storageKey]);

  /**
   * Records a new performance metric
   * 
   * @param metric - The metric to record (timestamp will be added if not provided)
   */
  const recordMetric = useCallback((
    metric: Omit<PerformanceMetric, 'timestamp'> & { timestamp?: number }
  ) => {
    const newMetric: PerformanceMetric = {
      ...metric,
      timestamp: metric.timestamp || Date.now(),
      url: metric.url || (typeof window !== 'undefined' ? window.location.pathname : undefined),
    };

    setMetrics(prev => {
      const updated = [...prev, newMetric];
      // Keep only the most recent metrics
      return updated.slice(-finalConfig.maxStoredMetrics!);
    });

    // Send to analytics if enabled
    if (finalConfig.enableAnalytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        event_category: 'Performance',
        event_label: newMetric.name,
        value: Math.round(newMetric.value),
        custom_map: {
          metric_rating: newMetric.rating,
          metric_url: newMetric.url,
        },
      });
    }
  }, [finalConfig.maxStoredMetrics, finalConfig.enableAnalytics]);

  /**
   * Gets stored metrics with optional filtering
   * 
   * @param metricName - Filter by specific metric name
   * @param timeRange - Time range in milliseconds (from now)
   * @returns Filtered array of metrics
   */
  const getMetrics = useCallback((metricName?: string, timeRange?: number) => {
    let filtered = metrics;

    if (metricName) {
      filtered = filtered.filter(m => m.name === metricName);
    }

    if (timeRange) {
      const cutoff = Date.now() - timeRange;
      filtered = filtered.filter(m => m.timestamp > cutoff);
    }

    return filtered;
  }, [metrics]);

  /**
   * Calculates average values and trends for metrics
   * 
   * @param timeRange - Optional time range to consider (in milliseconds)
   * @returns Object with averages and trends for each metric
   */
  const getAverages = useCallback((timeRange?: number): MetricAverages => {
    const relevantMetrics = getMetrics(undefined, timeRange);
    const grouped = relevantMetrics.reduce((acc, metric) => {
      if (!acc[metric.name]) {
        acc[metric.name] = [];
      }
      acc[metric.name].push(metric);
      return acc;
    }, {} as Record<string, PerformanceMetric[]>);

    return Object.entries(grouped).reduce((acc, [name, metricList]) => {
      const values = metricList.map(m => m.value);
      const average = values.reduce((sum, val) => sum + val, 0) / values.length;
      
      // Determine overall rating based on most recent metrics
      const recentMetrics = metricList.slice(-5);
      const ratings = recentMetrics.map(m => m.rating);
      const goodCount = ratings.filter(r => r === 'good').length;
      const rating = goodCount > ratings.length / 2 ? 'good' : 
                   goodCount > 0 ? 'needs-improvement' : 'poor';

      // Calculate trend (comparing first half vs second half of metrics)
      let trend: 'improving' | 'stable' | 'declining' = 'stable';
      if (metricList.length >= 10) {
        const midPoint = Math.floor(metricList.length / 2);
        const firstHalf = metricList.slice(0, midPoint);
        const secondHalf = metricList.slice(midPoint);
        
        const firstAvg = firstHalf.reduce((sum, m) => sum + m.value, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((sum, m) => sum + m.value, 0) / secondHalf.length;
        
        const change = (secondAvg - firstAvg) / firstAvg;
        if (Math.abs(change) > 0.1) { // 10% change threshold
          // For metrics like LCP, CLS - lower is better
          const isLowerBetter = ['LCP', 'CLS', 'FID', 'TTFB'].includes(name);
          trend = isLowerBetter 
            ? (change < 0 ? 'improving' : 'declining')
            : (change > 0 ? 'improving' : 'declining');
        }
      }

      acc[name] = {
        average,
        count: metricList.length,
        rating,
        trend,
        lastUpdated: Math.max(...metricList.map(m => m.timestamp)),
      };
      return acc;
    }, {} as MetricAverages);
  }, [getMetrics]);

  /**
   * Gets performance score based on Core Web Vitals
   * 
   * @returns Performance score (0-100) or null if no data
   */
  const getPerformanceScore = useCallback(() => {
    const recentMetrics = getMetrics(undefined, 24 * 60 * 60 * 1000); // Last 24 hours
    const coreVitals = ['LCP', 'FID', 'CLS'];
    
    let score = 0;
    let count = 0;

    coreVitals.forEach(vital => {
      const vitalMetrics = recentMetrics.filter(m => m.name === vital);
      if (vitalMetrics.length > 0) {
        const latestMetric = vitalMetrics[vitalMetrics.length - 1];
        let metricScore = 0;
        
        switch (latestMetric.rating) {
          case 'good':
            metricScore = 100;
            break;
          case 'needs-improvement':
            metricScore = 75;
            break;
          case 'poor':
            metricScore = 25;
            break;
        }
        
        score += metricScore;
        count++;
      }
    });

    return count > 0 ? Math.round(score / count) : null;
  }, [getMetrics]);

  /**
   * Gets the latest metric for a specific name
   * 
   * @param metricName - Name of the metric to get
   * @returns Latest metric or undefined if not found
   */
  const getLatestMetric = useCallback((metricName: string) => {
    const metricsList = getMetrics(metricName);
    return metricsList[metricsList.length - 1];
  }, [getMetrics]);

  /**
   * Gets performance insights and recommendations
   * 
   * @returns Object with insights and improvement recommendations
   */
  const getPerformanceInsights = useCallback(() => {
    const averages = getAverages();
    const insights: {
      summary: string;
      recommendations: string[];
      criticalIssues: string[];
      improvements: string[];
    } = {
      summary: '',
      recommendations: [],
      criticalIssues: [],
      improvements: [],
    };

    const performanceScore = getPerformanceScore();
    
    // Generate summary
    if (performanceScore === null) {
      insights.summary = 'No performance data available yet.';
    } else if (performanceScore >= 90) {
      insights.summary = 'Excellent performance! Your site is performing very well.';
    } else if (performanceScore >= 75) {
      insights.summary = 'Good performance with room for improvement.';
    } else {
      insights.summary = 'Performance needs attention. Several metrics can be improved.';
    }

    // Analyze specific metrics
    Object.entries(averages).forEach(([metricName, data]) => {
      switch (metricName) {
        case 'LCP':
          if (data.rating === 'poor') {
            insights.criticalIssues.push('Largest Contentful Paint is slow - optimize images and server response times');
          } else if (data.rating === 'needs-improvement') {
            insights.recommendations.push('Consider optimizing LCP by improving server response times');
          }
          break;
          
        case 'FID':
          if (data.rating === 'poor') {
            insights.criticalIssues.push('First Input Delay is high - reduce JavaScript execution time');
          } else if (data.rating === 'needs-improvement') {
            insights.recommendations.push('Optimize JavaScript to improve First Input Delay');
          }
          break;
          
        case 'CLS':
          if (data.rating === 'poor') {
            insights.criticalIssues.push('Cumulative Layout Shift is high - ensure proper element sizing');
          } else if (data.rating === 'needs-improvement') {
            insights.recommendations.push('Reduce layout shifts by setting image dimensions');
          }
          break;
      }

      // Check for improvements
      if (data.trend === 'improving') {
        insights.improvements.push(`${metricName} is improving over time`);
      }
    });

    return insights;
  }, [getAverages, getPerformanceScore]);

  /**
   * Exports metrics data for analysis
   * 
   * @param format - Export format ('json' | 'csv')
   * @returns Formatted metrics data
   */
  const exportMetrics = useCallback((format: 'json' | 'csv' = 'json') => {
    if (format === 'json') {
      return JSON.stringify(metrics, null, 2);
    } else {
      // CSV format
      const headers = ['name', 'value', 'rating', 'timestamp', 'url'];
      const rows = metrics.map(metric => [
        metric.name,
        metric.value,
        metric.rating,
        new Date(metric.timestamp).toISOString(),
        metric.url || '',
      ]);
      
      return [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
    }
  }, [metrics]);

  /**
   * Clears all stored metrics
   */
  const clearMetrics = useCallback(() => {
    setMetrics([]);
    if (finalConfig.enableLocalStorage && typeof window !== 'undefined') {
      localStorage.removeItem(finalConfig.storageKey!);
    }
  }, [finalConfig.enableLocalStorage, finalConfig.storageKey]);

  /**
   * Gets metrics statistics
   * 
   * @returns Object with various statistics about the metrics
   */
  const getMetricsStats = useCallback(() => {
    const uniqueMetrics = [...new Set(metrics.map(m => m.name))];
    const totalMetrics = metrics.length;
    const timeRange = metrics.length > 0 ? 
      Math.max(...metrics.map(m => m.timestamp)) - Math.min(...metrics.map(m => m.timestamp)) : 0;

    const ratingDistribution = metrics.reduce((acc, metric) => {
      acc[metric.rating] = (acc[metric.rating] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalMetrics,
      uniqueMetrics: uniqueMetrics.length,
      timeRange,
      ratingDistribution,
      averageMetricsPerDay: timeRange > 0 ? totalMetrics / (timeRange / (24 * 60 * 60 * 1000)) : 0,
      oldestMetric: metrics.length > 0 ? Math.min(...metrics.map(m => m.timestamp)) : null,
      newestMetric: metrics.length > 0 ? Math.max(...metrics.map(m => m.timestamp)) : null,
    };
  }, [metrics]);

  return {
    // State
    metrics,
    isLoading,
    
    // Core methods
    recordMetric,
    getMetrics,
    getLatestMetric,
    getAverages,
    getPerformanceScore,
    
    // Analysis methods
    getPerformanceInsights,
    getMetricsStats,
    
    // Utility methods
    exportMetrics,
    clearMetrics,
  };
}

/**
 * Simplified performance monitor hook for basic usage
 * 
 * @returns Basic performance monitoring utilities
 */
export function useSimplePerformanceMonitor() {
  return usePerformanceMonitor({
    maxStoredMetrics: 100,
    enableLocalStorage: true,
    enableAnalytics: false,
  });
}

// Type exports
// (Removed redundant export type statement to avoid conflicts)

// Default export
export default usePerformanceMonitor;