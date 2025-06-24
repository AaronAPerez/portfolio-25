/**
 * Performance Dashboard Component
 * 
 * Real-time performance monitoring dashboard that displays Core Web Vitals,
 * custom metrics, and performance insights in an accessible interface.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

'use client'

import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Activity, 
  Zap, 
  Eye, 
  Clock, 
  Target, 
  BarChart3, 
  TrendingUp,
  X,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react'
import { useWebVitals } from '@/hooks/useWebVitals'
import { cn } from '@/lib/utils'

/**
 * Props for the Performance Dashboard component
 */
interface PerformanceDashboardProps {
  /** Whether the dashboard is visible */
  isOpen: boolean;
  /** Callback to close the dashboard */
  onClose: () => void;
  /** Custom configuration for the dashboard */
  config?: {
    showAdvancedMetrics?: boolean;
    enableExport?: boolean;
    refreshInterval?: number;
  };
}

/**
 * Performance metric card component
 */
const MetricCard = ({ 
  name, 
  value, 
  rating, 
  trend,
  icon: Icon,
  description 
}: {
  name: string;
  value: string;
  rating: 'good' | 'needs-improvement' | 'poor';
  trend?: 'improving' | 'stable' | 'declining';
  icon: React.ElementType;
  description: string;
}) => {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800';
      case 'needs-improvement': return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800';
      case 'poor': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:bg-gray-800/20 dark:border-gray-700';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'declining': return <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />;
      default: return <Target className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
        getRatingColor(rating)
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="font-medium text-sm">{name}</span>
        </div>
        {trend && getTrendIcon(trend)}
      </div>
      
      <div className="text-2xl font-bold mb-1">{value}</div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs opacity-75 capitalize">
          {rating.replace('-', ' ')}
        </span>
        <span className="text-xs opacity-60">{description}</span>
      </div>
    </motion.div>
  );
};

/**
 * Performance insights component
 */
const PerformanceInsights = ({ 
  insights 
}: { 
  insights: {
    summary: string;
    recommendations: string[];
    criticalIssues: string[];
    improvements: string[];
  }
}) => (
  <div className="space-y-4">
    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
      <Info className="w-4 h-4" />
      Performance Insights
    </h4>
    
    {/* Summary */}
    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
      <p className="text-sm text-blue-800 dark:text-blue-300">{insights.summary}</p>
    </div>

    {/* Critical Issues */}
    {insights.criticalIssues.length > 0 && (
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-red-700 dark:text-red-300 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Critical Issues
        </h5>
        {insights.criticalIssues.map((issue, index) => (
          <div key={index} className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
            {issue}
          </div>
        ))}
      </div>
    )}

    {/* Recommendations */}
    {insights.recommendations.length > 0 && (
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-300 flex items-center gap-1">
          <Target className="w-3 h-3" />
          Recommendations
        </h5>
        {insights.recommendations.map((rec, index) => (
          <div key={index} className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-800">
            {rec}
          </div>
        ))}
      </div>
    )}

    {/* Improvements */}
    {insights.improvements.length > 0 && (
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Recent Improvements
        </h5>
        {insights.improvements.map((improvement, index) => (
          <div key={index} className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
            {improvement}
          </div>
        ))}
      </div>
    )}
  </div>
);

/**
 * Main Performance Dashboard Component
 */
export function PerformanceDashboard({ 
  isOpen, 
  onClose, 
  config = {} 
}: PerformanceDashboardProps) {
  const [, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'insights'>('overview');

  const {
    enableExport = true,
    refreshInterval = 10000 // 10 seconds
  } = config;

  // Use our custom hooks
  const {
    metrics: webVitalsMetrics,
    getLatestMetric,
    getPerformanceScore,
    getMetricsSummary
  } = useWebVitals({
    reportToAnalytics: false,
    enableConsoleLogging: false
  });

  // Simple insights calculation
  const getPerformanceInsights = useCallback(() => {
    const summary = getMetricsSummary();
    const insights = {
      summary: 'Performance data is being collected.',
      recommendations: [] as string[],
      criticalIssues: [] as string[],
      improvements: [] as string[],
    };

    if (summary.performanceScore !== null) {
      if (summary.performanceScore >= 90) {
        insights.summary = 'Excellent performance! Your site is performing very well.';
      } else if (summary.performanceScore >= 75) {
        insights.summary = 'Good performance with room for improvement.';
      } else {
        insights.summary = 'Performance needs attention. Several metrics can be improved.';
      }
    }

    // Check individual metrics
    Object.entries(summary.latestMetrics).forEach(([name, metric]) => {
      if (metric.rating === 'poor') {
        switch (name) {
          case 'LCP':
            insights.criticalIssues.push('Largest Contentful Paint is slow - optimize images and server response times');
            break;
          case 'FID':
            insights.criticalIssues.push('First Input Delay is high - reduce JavaScript execution time');
            break;
          case 'CLS':
            insights.criticalIssues.push('Cumulative Layout Shift is high - ensure proper element sizing');
            break;
        }
      } else if (metric.rating === 'needs-improvement') {
        switch (name) {
          case 'LCP':
            insights.recommendations.push('Consider optimizing LCP by improving server response times');
            break;
          case 'FID':
            insights.recommendations.push('Optimize JavaScript to improve First Input Delay');
            break;
          case 'CLS':
            insights.recommendations.push('Reduce layout shifts by setting image dimensions');
            break;
        }
      }
    });

    return insights;
  }, [getMetricsSummary]);

  // Simple export functionality
  const exportMetrics = useCallback((format: 'json' | 'csv' = 'json') => {
    if (format === 'json') {
      return JSON.stringify(webVitalsMetrics, null, 2);
    } else {
      const headers = ['name', 'value', 'rating', 'timestamp'];
      const rows = webVitalsMetrics.map(metric => [
        metric.name,
        metric.value,
        metric.rating,
        new Date(metric.timestamp).toISOString(),
      ]);
      
      return [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
    }
  }, [webVitalsMetrics]);

  // Simple stats calculation
  const getMetricsStats = useCallback(() => {
    const uniqueMetrics = [...new Set(webVitalsMetrics.map(m => m.name))];
    const ratingDistribution = webVitalsMetrics.reduce((acc, metric) => {
      acc[metric.rating] = (acc[metric.rating] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalMetrics: webVitalsMetrics.length,
      uniqueMetrics: uniqueMetrics.length,
      timeRange: 0,
      ratingDistribution,
      averageMetricsPerDay: 0,
      oldestMetric: null,
      newestMetric: null,
    };
  }, [webVitalsMetrics]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!isOpen || refreshInterval <= 0) return;

    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [isOpen, refreshInterval]);

  // Calculate current metrics
  const currentMetrics = useMemo(() => {
    const coreVitalNames = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];
    
    return coreVitalNames.map(name => {
      const latest = getLatestMetric(name);
      if (!latest) {
        return {
          name,
          value: 'N/A',
          rating: 'good' as const,
          icon: getMetricIcon(name),
          description: getMetricDescription(name)
        };
      }

      return {
        name,
        value: formatMetricValue(name, latest.value),
        rating: latest.rating,
        icon: getMetricIcon(name),
        description: getMetricDescription(name)
      };
    });
  }, [getLatestMetric]);

  const performanceScore = getPerformanceScore();
  const insights = getPerformanceInsights();
  const stats = getMetricsStats();

  // Helper functions
  const getMetricIcon = (metricName: string) => {
    switch (metricName) {
      case 'LCP': return Clock;
      case 'FID': return Zap;
      case 'CLS': return Eye;
      case 'FCP': return TrendingUp;
      case 'TTFB': return Activity;
      default: return BarChart3;
    }
  };

  const getMetricDescription = (metricName: string) => {
    switch (metricName) {
      case 'LCP': return 'Loading performance';
      case 'FID': return 'Interactivity';
      case 'CLS': return 'Visual stability';
      case 'FCP': return 'Paint timing';
      case 'TTFB': return 'Server response';
      default: return 'Performance metric';
    }
  };

  const formatMetricValue = (name: string, value: number) => {
    switch (name) {
      case 'CLS':
        return value.toFixed(3);
      case 'LCP':
      case 'FCP':
      case 'TTFB':
      case 'FID':
        return `${Math.round(value)}ms`;
      default:
        return Math.round(value).toString();
    }
  };

  const handleExport = useCallback(() => {
    if (!enableExport) return;

    const data = exportMetrics('json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-metrics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [enableExport, exportMetrics]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Performance Dashboard"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Performance Dashboard
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Real-time Core Web Vitals monitoring
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRefreshKey(prev => prev + 1)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Refresh metrics"
              >
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
              
              {enableExport && (
                <button
                  onClick={handleExport}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Export metrics"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                </button>
              )}
              
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Close dashboard"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'metrics', label: 'Detailed Metrics', icon: Target },
              { id: 'insights', label: 'Insights', icon: Info }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as never)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Performance Score */}
                {performanceScore !== null && (
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Performance Score
                    </h3>
                    <div className={cn(
                      "text-4xl font-bold mb-2",
                      performanceScore >= 90 ? "text-green-600" :
                      performanceScore >= 75 ? "text-yellow-600" : "text-red-600"
                    )}>
                      {performanceScore}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={cn(
                          "h-3 rounded-full transition-all duration-500",
                          performanceScore >= 90 ? "bg-green-500" :
                          performanceScore >= 75 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${performanceScore}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Core Web Vitals */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Core Web Vitals
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentMetrics.map((metric) => (
                      <MetricCard
                        key={metric.name}
                        name={metric.name}
                        value={metric.value}
                        rating={metric.rating}
                        icon={metric.icon}
                        description={metric.description}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.totalMetrics}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Metrics
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stats.uniqueMetrics}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Metric Types
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {stats.ratingDistribution.good || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Good Ratings
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {stats.ratingDistribution.poor || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Poor Ratings
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Detailed Performance Metrics
                  </h3>
                  
                  {webVitalsMetrics.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No metrics collected yet</p>
                      <p className="text-sm">Metrics will appear as you interact with the site</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left p-2">Metric</th>
                            <th className="text-left p-2">Value</th>
                            <th className="text-left p-2">Rating</th>
                            <th className="text-left p-2">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {webVitalsMetrics.slice(-20).map((metric, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-2 font-medium">{metric.name}</td>
                              <td className="p-2">{formatMetricValue(metric.name, metric.value)}</td>
                              <td className="p-2">
                                <span className={cn(
                                  "px-2 py-1 rounded-full text-xs",
                                  metric.rating === 'good' ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" :
                                  metric.rating === 'needs-improvement' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" :
                                  "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                )}>
                                  {metric.rating}
                                </span>
                              </td>
                              <td className="p-2 text-gray-500">
                                {new Date(metric.timestamp).toLocaleTimeString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Insights Tab */}
            {activeTab === 'insights' && (
              <PerformanceInsights insights={insights} />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PerformanceDashboard;