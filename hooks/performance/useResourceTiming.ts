/**
 * Resource Timing Hook
 * 
 * Hook for monitoring resource loading performance including images,
 * scripts, stylesheets, and other assets.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

import { useState, useCallback } from 'react'
import { usePerformanceObserver } from './usePerformanceObserver'

/**
 * Resource timing entry interface
 */
export interface ResourceTimingEntry {
  name: string;
  type: string;
  duration: number;
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
  startTime: number;
  timestamp: number;
}

/**
 * Resource timing statistics
 */
export interface ResourceTimingStats {
  totalResources: number;
  averageLoadTime: number;
  slowestResource: ResourceTimingEntry | null;
  fastestResource: ResourceTimingEntry | null;
  totalTransferSize: number;
  resourcesByType: Record<string, number>;
}

/**
 * Hook for monitoring resource timing
 */
export function useResourceTiming() {
  const [resources, setResources] = useState<ResourceTimingEntry[]>([]);
  
  const { isSupported } = usePerformanceObserver({
    entryTypes: ['resource'],
    buffered: true,
    onEntry: (entry) => {
      if (entry.entryType === 'resource') {
        // Get additional resource timing data
        const resourceEntries = performance.getEntriesByName(entry.name, 'resource');
        const resourceEntry = resourceEntries[resourceEntries.length - 1] as PerformanceResourceTiming;
        
        if (resourceEntry) {
          const resourceData: ResourceTimingEntry = {
            name: entry.name,
            type: getResourceType(entry.name),
            duration: entry.duration,
            transferSize: resourceEntry.transferSize || 0,
            encodedBodySize: resourceEntry.encodedBodySize || 0,
            decodedBodySize: resourceEntry.decodedBodySize || 0,
            startTime: entry.startTime,
            timestamp: entry.timestamp,
          };
          
          setResources(prev => [...prev, resourceData]);
        }
      }
    }
  });

  /**
   * Determines resource type from URL
   */
  const getResourceType = useCallback((url: string): string => {
    const extension = url.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
        return 'script';
      case 'css':
        return 'stylesheet';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
      case 'svg':
        return 'image';
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'otf':
        return 'font';
      case 'mp4':
      case 'webm':
      case 'ogg':
        return 'video';
      case 'mp3':
      case 'wav':
        return 'audio';
      default:
        if (url.includes('api/') || url.includes('/api/')) {
          return 'api';
        }
        return 'other';
    }
  }, []);

  /**
   * Gets resources by type
   */
  const getResourcesByType = useCallback((type: string) => {
    return resources.filter(resource => resource.type === type);
  }, [resources]);

  /**
   * Gets slow loading resources (over threshold)
   */
  const getSlowResources = useCallback((threshold: number = 1000) => {
    return resources.filter(resource => resource.duration > threshold);
  }, [resources]);

  /**
   * Gets large resources (over size threshold)
   */
  const getLargeResources = useCallback((sizeThreshold: number = 100000) => {
    return resources.filter(resource => resource.transferSize > sizeThreshold);
  }, [resources]);

  /**
   * Calculates resource timing statistics
   */
  const getResourceStats = useCallback((): ResourceTimingStats => {
    if (resources.length === 0) {
      return {
        totalResources: 0,
        averageLoadTime: 0,
        slowestResource: null,
        fastestResource: null,
        totalTransferSize: 0,
        resourcesByType: {},
      };
    }

    const totalDuration = resources.reduce((sum, resource) => sum + resource.duration, 0);
    const averageLoadTime = totalDuration / resources.length;
    
    const slowestResource = resources.reduce((slowest, current) =>
      current.duration > slowest.duration ? current : slowest
    );
    
    const fastestResource = resources.reduce((fastest, current) =>
      current.duration < fastest.duration ? current : fastest
    );
    
    const totalTransferSize = resources.reduce((sum, resource) => sum + resource.transferSize, 0);
    
    const resourcesByType = resources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalResources: resources.length,
      averageLoadTime,
      slowestResource,
      fastestResource,
      totalTransferSize,
      resourcesByType,
    };
  }, [resources]);

  /**
   * Gets optimization recommendations based on resource performance
   */
  const getOptimizationRecommendations = useCallback(() => {
    const recommendations: string[] = [];
    const stats = getResourceStats();
    
    // Check for slow resources
    const slowResources = getSlowResources(2000); // 2 seconds
    if (slowResources.length > 0) {
      recommendations.push(`${slowResources.length} resources are loading slowly (>2s). Consider optimization.`);
    }
    
    // Check for large resources
    const largeResources = getLargeResources(500000); // 500KB
    if (largeResources.length > 0) {
      recommendations.push(`${largeResources.length} resources are large (>500KB). Consider compression.`);
    }
    
    // Check for too many resources
    if (stats.totalResources > 100) {
      recommendations.push('Consider reducing the number of resources or implementing bundling.');
    }
    
    // Check average load time
    if (stats.averageLoadTime > 1000) {
      recommendations.push('Average resource load time is high. Consider CDN or caching strategies.');
    }
    
    // Check for unoptimized images
    const images = getResourcesByType('image');
    const largeImages = images.filter(img => img.transferSize > 200000); // 200KB
    if (largeImages.length > 0) {
      recommendations.push(`${largeImages.length} images are large. Consider WebP format or compression.`);
    }
    
    return recommendations;
  }, [getResourceStats, getSlowResources, getLargeResources, getResourcesByType]);

  /**
   * Clears all resource timing data
   */
  const clearResources = useCallback(() => {
    setResources([]);
  }, []);

  return {
    resources,
    isSupported,
    getResourcesByType,
    getSlowResources,
    getLargeResources,
    getResourceStats,
    getOptimizationRecommendations,
    clearResources,
  };
}

/**
 * Hook for monitoring critical resource loading
 */
export function useCriticalResourceTiming() {
  const { resources, getResourcesByType } = useResourceTiming();
  
  const getCriticalResources = useCallback(() => {
    // Critical resources are typically scripts, stylesheets, and above-the-fold images
    const scripts = getResourcesByType('script');
    const stylesheets = getResourcesByType('stylesheet');
    const fonts = getResourcesByType('font');
    
    return [...scripts, ...stylesheets, ...fonts];
  }, [getResourcesByType]);
  
  const getCriticalResourcesPerformance = useCallback(() => {
    const critical = getCriticalResources();
    const slowCritical = critical.filter(resource => resource.duration > 1000);
    
    return {
      total: critical.length,
      slow: slowCritical.length,
      averageLoadTime: critical.length > 0 
        ? critical.reduce((sum, r) => sum + r.duration, 0) / critical.length 
        : 0,
      recommendations: slowCritical.length > 0 
        ? [`${slowCritical.length} critical resources are loading slowly`]
        : []
    };
  }, [getCriticalResources]);
  
  return {
    resources,
    getCriticalResources,
    getCriticalResourcesPerformance,
  };
}

// Default export
export default useResourceTiming;