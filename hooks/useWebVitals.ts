/**
 * Web Vitals Hook
 * 
 * Custom hook for tracking Core Web Vitals and performance metrics.
 * Provides utilities for measuring, storing, and analyzing performance data.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

import { useState, useEffect, useCallback, useMemo } from 'react'

/**
 * Core Web Vitals metric interface
 */
export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

/**
 * Performance monitoring configuration
 */
interface WebVitalsConfig {
  reportToAnalytics?: boolean;
  enableConsoleLogging?: boolean;
  sampleRate?: number;
  endpoint?: string;
}

/**
 * Web Vitals tracking hook
 * 
 * Provides functionality to track and report Core Web Vitals metrics
 * including LCP, FID, CLS, FCP, and TTFB.
 * 
 * @param config - Configuration options for tracking
 * @returns Object with tracking utilities and current metrics
 */
export function useWebVitals(config: WebVitalsConfig = {}) {
  const [metrics, setMetrics] = useState<WebVitalMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupported, setIsSupported] = useState(false);

  const {
    reportToAnalytics = true,
    enableConsoleLogging = process.env.NODE_ENV === 'development',
    sampleRate = 1,
    endpoint = '/api/web-vitals'
  } = config;

  /**
   * Send metric to analytics and custom endpoints
   */
  const reportMetric = useCallback(async (metric: WebVitalMetric) => {
    // Sample rate check
    if (Math.random() > sampleRate) return;

    // Console logging for development
    if (enableConsoleLogging) {
      console.log(`Web Vital - ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta
      });
    }

    // Send to Google Analytics if available
    if (reportToAnalytics && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.value),
        custom_map: {
          metric_rating: metric.rating,
          metric_delta: metric.delta,
        },
      });
    }

    // Send to custom analytics endpoint
    if (typeof window !== 'undefined' && endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...metric,
            url: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: Date.now(),
          }),
        });
      } catch (error) {
        if (enableConsoleLogging) {
          console.warn('Failed to send web vitals data:', error);
        }
      }
    }

    // Store metric locally
    setMetrics(prev => [...prev, metric]);
  }, [reportToAnalytics, enableConsoleLogging, sampleRate, endpoint]);

  /**
   * Initialize Web Vitals tracking
   */
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    // Check if web-vitals is supported
    const checkSupport = async () => {
      try {
        await import('web-vitals');
        setIsSupported(true);
      } catch (error) {
        if (enableConsoleLogging) {
          console.warn('web-vitals library not available:', error);
        }
        setIsSupported(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSupport();
  }, [enableConsoleLogging]);

  /**
   * Start tracking Web Vitals metrics
   */
  useEffect(() => {
    if (!isSupported || isLoading) return;

    // No cleanup is needed because web-vitals' onCLS, onFID, etc. do not return unsubscribe functions.
    const initializeTracking = async () => {
      try {
        const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import('web-vitals');

        // Track each Core Web Vital
        onCLS((metric) => {
          reportMetric({
            ...metric,
            timestamp: Date.now(),
          });
        });

        onFID((metric) => {
          reportMetric({
            ...metric,
            timestamp: Date.now(),
          });
        });

        onFCP((metric) => {
          reportMetric({
            ...metric,
            timestamp: Date.now(),
          });
        });

        onLCP((metric) => {
          reportMetric({
            ...metric,
            timestamp: Date.now(),
          });
        });

        onTTFB((metric) => {
          reportMetric({
            ...metric,
            timestamp: Date.now(),
          });
        });

      } catch (error) {
        if (enableConsoleLogging) {
          console.error('Failed to initialize Web Vitals tracking:', error);
        }
      }
    };

    initializeTracking();

    // No cleanup necessary for web-vitals listeners
    return undefined;
  }, [isSupported, isLoading, reportMetric, enableConsoleLogging]);

  /**
   * Get metrics by name
   */
  const getMetricsByName = useCallback((metricName: string) => {
    return metrics.filter(metric => metric.name === metricName);
  }, [metrics]);

  /**
   * Get latest metric value
   */
  const getLatestMetric = useCallback((metricName: string) => {
    const metricsList = getMetricsByName(metricName);
    return metricsList[metricsList.length - 1];
  }, [getMetricsByName]);

  /**
   * Calculate performance score based on Core Web Vitals
   */
  const getPerformanceScore = useCallback(() => {
    const coreVitals = ['LCP', 'FID', 'CLS'];
    let totalScore = 0;
    let metricsCount = 0;

    coreVitals.forEach(vital => {
      const latestMetric = getLatestMetric(vital);
      if (latestMetric) {
        let score = 0;
        switch (latestMetric.rating) {
          case 'good':
            score = 100;
            break;
          case 'needs-improvement':
            score = 75;
            break;
          case 'poor':
            score = 25;
            break;
        }
        totalScore += score;
        metricsCount++;
      }
    });

    return metricsCount > 0 ? Math.round(totalScore / metricsCount) : null;
  }, [getLatestMetric]);

  /**
   * Get metrics summary
   */
  const getMetricsSummary = useCallback(() => {
    const summary = {
      totalMetrics: metrics.length,
      uniqueMetrics: [...new Set(metrics.map(m => m.name))].length,
      performanceScore: getPerformanceScore(),
      latestMetrics: {} as Record<string, WebVitalMetric>,
    };

    // Get latest value for each metric type
    [...new Set(metrics.map(m => m.name))].forEach(metricName => {
      const latest = getLatestMetric(metricName);
      if (latest) {
        summary.latestMetrics[metricName] = latest;
      }
    });

    return summary;
  }, [metrics, getPerformanceScore, getLatestMetric]);

  /**
   * Clear all stored metrics
   */
  const clearMetrics = useCallback(() => {
    setMetrics([]);
  }, []);

  return {
    // State
    metrics,
    isLoading,
    isSupported,
    
    // Methods
    getMetricsByName,
    getLatestMetric,
    getPerformanceScore,
    getMetricsSummary,
    clearMetrics,
    
    // Manual reporting (for custom metrics)
    reportMetric,
  };
}

/**
 * Simplified hook for basic Web Vitals tracking
 * 
 * @returns Basic tracking utilities without advanced features
 */
export function useSimpleWebVitals() {
  return useWebVitals({
    reportToAnalytics: true,
    enableConsoleLogging: false,
    sampleRate: 1,
  });
}

/**
 * Additional utility functions for advanced use cases
 */

/**
 * Creates a custom metric for tracking application-specific performance
 * 
 * @param name - Name of the custom metric
 * @param value - Metric value
 * @param rating - Performance rating
 * @returns WebVitalMetric object
 */
export function createCustomMetric(
  name: string, 
  value: number, 
  rating: 'good' | 'needs-improvement' | 'poor'
): WebVitalMetric {
  return {
    name,
    value,
    delta: 0,
    id: `custom-${name}-${Date.now()}`,
    rating,
    timestamp: Date.now(),
  };
}

/**
 * Calculates performance budget status
 * 
 * @param metrics - Array of web vital metrics
 * @param budgets - Performance budgets for each metric
 * @returns Budget status for each metric
 */
export function checkPerformanceBudgets(
  metrics: WebVitalMetric[],
  budgets: Record<string, number>
): Record<string, { withinBudget: boolean; currentValue: number; budget: number }> {
  const result: Record<string, { withinBudget: boolean; currentValue: number; budget: number }> = {};
  
  Object.entries(budgets).forEach(([metricName, budget]) => {
    const latestMetric = metrics
      .filter(m => m.name === metricName)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    
    if (latestMetric) {
      result[metricName] = {
        withinBudget: latestMetric.value <= budget,
        currentValue: latestMetric.value,
        budget
      };
    }
  });
  
  return result;
}

/**
 * Generates a performance report
 * 
 * @param metrics - Array of web vital metrics
 * @returns Formatted performance report
 */
export function generatePerformanceReport(metrics: WebVitalMetric[]): {
  summary: string;
  coreVitals: Record<string, { value: number; rating: string; timestamp: number }>;
  recommendations: string[];
} {
  const coreVitalNames = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];
  const coreVitals: Record<string, { value: number; rating: string; timestamp: number }> = {};
  
  coreVitalNames.forEach(name => {
    const latest = metrics
      .filter(m => m.name === name)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    
    if (latest) {
      coreVitals[name] = {
        value: latest.value,
        rating: latest.rating,
        timestamp: latest.timestamp
      };
    }
  });
  
  const goodMetrics = Object.values(coreVitals).filter(m => m.rating === 'good').length;
  const totalMetrics = Object.keys(coreVitals).length;
  
  let summary = '';
  if (totalMetrics === 0) {
    summary = 'No Core Web Vitals data available yet.';
  } else if (goodMetrics === totalMetrics) {
    summary = 'Excellent! All Core Web Vitals are performing well.';
  } else if (goodMetrics >= totalMetrics * 0.8) {
    summary = 'Good performance with minor areas for improvement.';
  } else {
    summary = 'Performance needs attention. Several metrics require optimization.';
  }
  
  const recommendations: string[] = [];
  
  Object.entries(coreVitals).forEach(([name, data]) => {
    switch (name) {
      case 'LCP':
        if (data.rating === 'poor') {
          recommendations.push('Optimize LCP by improving server response times and optimizing images');
        } else if (data.rating === 'needs-improvement') {
          recommendations.push('Consider implementing image optimization for better LCP');
        }
        break;
      case 'FID':
        if (data.rating === 'poor') {
          recommendations.push('Reduce FID by minimizing JavaScript execution and using code splitting');
        } else if (data.rating === 'needs-improvement') {
          recommendations.push('Optimize JavaScript to improve First Input Delay');
        }
        break;
      case 'CLS':
        if (data.rating === 'poor') {
          recommendations.push('Fix CLS by setting explicit dimensions for images and avoiding layout shifts');
        } else if (data.rating === 'needs-improvement') {
          recommendations.push('Improve visual stability by reserving space for dynamic content');
        }
        break;
    }
  });
  
  return {
    summary,
    coreVitals,
    recommendations
  };
}

/**
 * Hook for managing custom performance metrics
 * 
 * @returns Utilities for tracking custom application metrics
 */
export function useCustomMetrics() {
  const { reportMetric } = useWebVitals();
  
  const trackCustomTiming = useCallback((name: string, startTime: number, endTime?: number) => {
    const duration = (endTime || performance.now()) - startTime;
    const rating: 'good' | 'needs-improvement' | 'poor' = 
      duration < 1000 ? 'good' : duration < 2500 ? 'needs-improvement' : 'poor';
    
    const metric = createCustomMetric(`custom_${name}`, duration, rating);
    reportMetric(metric);
    
    return metric;
  }, [reportMetric]);
  
  const trackResourceLoading = useCallback((resourceName: string, loadTime: number) => {
    const rating: 'good' | 'needs-improvement' | 'poor' = 
      loadTime < 500 ? 'good' : loadTime < 1500 ? 'needs-improvement' : 'poor';
    
    const metric = createCustomMetric(`resource_${resourceName}`, loadTime, rating);
    reportMetric(metric);
    
    return metric;
  }, [reportMetric]);
  
  const trackUserInteraction = useCallback((action: string, responseTime: number) => {
    const rating: 'good' | 'needs-improvement' | 'poor' = 
      responseTime < 100 ? 'good' : responseTime < 300 ? 'needs-improvement' : 'poor';
    
    const metric = createCustomMetric(`interaction_${action}`, responseTime, rating);
    reportMetric(metric);
    
    return metric;
  }, [reportMetric]);
  
  return {
    trackCustomTiming,
    trackResourceLoading,
    trackUserInteraction,
  };
}

/**
 * Hook for performance budget monitoring
 * 
 * @param budgets - Performance budgets for different metrics
 * @returns Budget monitoring utilities
 */
export function usePerformanceBudgets(budgets: Record<string, number>) {
  const { metrics } = useWebVitals();
  
  const budgetStatus = useMemo(() => {
    return checkPerformanceBudgets(metrics, budgets);
  }, [metrics, budgets]);
  
  const getBudgetViolations = useCallback(() => {
    return Object.entries(budgetStatus)
      .filter(([, status]) => !status.withinBudget)
      .map(([metricName, status]) => ({
        metric: metricName,
        budget: status.budget,
        current: status.currentValue,
        overage: status.currentValue - status.budget
      }));
  }, [budgetStatus]);
  
  const getBudgetSummary = useCallback(() => {
    const total = Object.keys(budgetStatus).length;
    const violations = getBudgetViolations().length;
    const passing = total - violations;
    
    return {
      total,
      passing,
      violations,
      percentPassing: total > 0 ? (passing / total) * 100 : 0
    };
  }, [budgetStatus, getBudgetViolations]);
  
  return {
    budgetStatus,
    getBudgetViolations,
    getBudgetSummary,
  };
}

// Default export
export default useWebVitals;