/**
 * Real-time Analytics Dashboard
 * 
 * Internal dashboard for monitoring portfolio performance,
 * user engagement, and business metrics in real-time.
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  Eye,
  Download,
  MessageSquare,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  Target,
  BarChart3,
  Activity
} from 'lucide-react'
import { usePerformanceMonitor } from '@/hooks/performance/usePerformanceMonitor'
import { cn } from '@/lib/utils'

interface AnalyticsData {
  realTime: {
    activeUsers: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: number;
  };
  business: {
    contactFormSubmissions: number;
    resumeDownloads: number;
    projectViews: number;
    caseStudyOpens: number;
  };
  performance: {
    avgLoadTime: number;
    performanceScore: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
  };
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  topPages: Array<{
    page: string;
    views: number;
    avgTime: number;
  }>;
}

/**
 * Color mapping to avoid dynamic class generation issues
 */
const colorMap = {
  blue: {
    bgLight: 'bg-blue-100',
    bgDark: 'bg-blue-900/30',
    textLight: 'text-blue-600',
    textDark: 'text-blue-400',
    border: 'border-blue-500'
  },
  green: {
    bgLight: 'bg-green-100',
    bgDark: 'bg-green-900/30',
    textLight: 'text-green-600',
    textDark: 'text-green-400',
    border: 'border-green-500'
  },
  purple: {
    bgLight: 'bg-purple-100',
    bgDark: 'bg-purple-900/30',
    textLight: 'text-purple-600',
    textDark: 'text-purple-400',
    border: 'border-purple-500'
  },
  orange: {
    bgLight: 'bg-orange-100',
    bgDark: 'bg-orange-900/30',
    textLight: 'text-orange-600',
    textDark: 'text-orange-400',
    border: 'border-orange-500'
  },
  red: {
    bgLight: 'bg-red-100',
    bgDark: 'bg-red-900/30',
    textLight: 'text-red-600',
    textDark: 'text-red-400',
    border: 'border-red-500'
  }
} as const

type ColorKey = keyof typeof colorMap

/**
 * Metric Card Component
 */
const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
  format = 'number'
}: {
  title: string;
  value: number;
  change?: number;
  icon: React.ElementType;
  color?: ColorKey;
  format?: 'number' | 'percentage' | 'time' | 'currency';
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val}%`
      case 'time':
        return `${val}s`
      case 'currency':
        return `$${val.toLocaleString()}`
      default:
        return val.toLocaleString()
    }
  }

  const getChangeColor = (change?: number) => {
    if (!change) return 'text-gray-500'
    return change > 0 ? 'text-green-500' : 'text-red-500'
  }

  const colors = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-lg", colors.bgLight, `dark:${colors.bgDark}`)}>
          <Icon className={cn("w-6 h-6", colors.textLight, `dark:${colors.textDark}`)} />
        </div>
        {change !== undefined && (
          <div className={cn("flex items-center text-sm", getChangeColor(change))}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change > 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
      
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {formatValue(value)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {title}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Progress Bar Component
 */
const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'blue',
  showValue = true 
}: { 
  value: number; 
  max?: number; 
  color?: ColorKey;
  showValue?: boolean;
}) => {
  const percentage = Math.min((value / max) * 100, 100)
  const colors = colorMap[color]

  return (
    <div className="flex items-center">
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
        <div
          className={cn("h-2 rounded-full transition-all duration-500", colors.border.replace('border', 'bg'))}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {value}{max === 100 ? '%' : ''}
        </span>
      )}
    </div>
  )
}

/**
 * Device Analytics Component
 */
const DeviceAnalytics = ({ devices }: { devices: AnalyticsData['devices'] }) => {
  const deviceData = [
    { name: 'Desktop', value: devices.desktop, icon: Monitor, color: 'blue' as ColorKey },
    { name: 'Mobile', value: devices.mobile, icon: Smartphone, color: 'green' as ColorKey },
    { name: 'Tablet', value: devices.tablet, icon: Globe, color: 'purple' as ColorKey }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Device Breakdown</h3>
      <div className="space-y-4">
        {deviceData.map((device) => {
          const colors = colorMap[device.color]
          return (
            <div key={device.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <device.icon className={cn("w-4 h-4 mr-2", colors.textLight)} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{device.name}</span>
              </div>
              <ProgressBar value={device.value} color={device.color} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Performance Metrics Component
 */
const PerformanceMetrics = ({ performance }: { performance: AnalyticsData['performance'] }) => {
  const coreWebVitalsData = [
    { 
      label: 'LCP', 
      value: performance.coreWebVitals.lcp, 
      unit: 'ms', 
      color: 'green' as ColorKey,
      target: 2500
    },
    { 
      label: 'FID', 
      value: performance.coreWebVitals.fid, 
      unit: 'ms', 
      color: 'blue' as ColorKey,
      target: 100
    },
    { 
      label: 'CLS', 
      value: performance.coreWebVitals.cls, 
      unit: '', 
      color: 'purple' as ColorKey,
      target: 0.1
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Performance Metrics</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Performance Score</span>
          <ProgressBar value={performance.performanceScore} color="green" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Avg Load Time</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {performance.avgLoadTime}s
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {coreWebVitalsData.map((metric) => {
            const colors = colorMap[metric.color]
            const isGood = metric.value <= metric.target
            
            return (
              <div key={metric.label} className="text-center">
                <div className={cn(
                  "text-xl font-bold mb-1",
                  isGood ? colors.textLight : 'text-red-500'
                )}>
                  {metric.value}{metric.unit}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{metric.label}</div>
                <div className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  isGood 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                )}>
                  {isGood ? 'Good' : 'Needs Work'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * Top Pages Table Component
 */
const TopPagesTable = ({ pages }: { pages: AnalyticsData['topPages'] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Top Pages</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Page</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Views</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Avg Time</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Engagement</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page, index) => {
              const engagementScore = Math.min((page.avgTime / 180) * 100, 100) // 3 minutes = 100%
              const engagementColor: ColorKey = engagementScore > 70 ? 'green' : engagementScore > 40 ? 'orange' : 'red'
              
              return (
                <motion.tr 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                    {page.page}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {page.avgTime}s
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <ProgressBar 
                        value={engagementScore} 
                        color={engagementColor} 
                        showValue={false}
                      />
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {Math.round(engagementScore)}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * Main Analytics Dashboard Component
 */
export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const { getPerformanceScore } = usePerformanceMonitor()

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/analytics/dashboard?range=${timeRange}`)
        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data)
          setLastUpdated(new Date())
        } else {
          throw new Error('Failed to fetch analytics')
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
        // Mock data for development/demo
        setAnalyticsData({
          realTime: {
            activeUsers: 23,
            pageViews: 1247,
            bounceRate: 32,
            avgSessionDuration: 165
          },
          business: {
            contactFormSubmissions: 8,
            resumeDownloads: 15,
            projectViews: 89,
            caseStudyOpens: 34
          },
          performance: {
            avgLoadTime: 1.2,
            performanceScore: getPerformanceScore() || 95,
            coreWebVitals: {
              lcp: 1200,
              fid: 45,
              cls: 0.02
            }
          },
          devices: {
            desktop: 45,
            mobile: 40,
            tablet: 15
          },
          topPages: [
            { page: '/projects', views: 456, avgTime: 180 },
            { page: '/', views: 234, avgTime: 120 },
            { page: '/contact', views: 123, avgTime: 90 },
            { page: '/about', views: 98, avgTime: 150 },
            { page: '/skills', views: 76, avgTime: 135 }
          ]
        })
        setLastUpdated(new Date())
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000)
    return () => clearInterval(interval)
  }, [timeRange, getPerformanceScore])

  // Loading skeleton
  if (loading || !analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Portfolio Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-time insights and performance metrics
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1d">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Activity className="w-4 h-4 mr-2 text-green-500 animate-pulse" />
              <span>
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <MetricCard
            title="Active Users"
            value={analyticsData.realTime.activeUsers}
            icon={Users}
            color="green"
          />
          <MetricCard
            title="Page Views"
            value={analyticsData.realTime.pageViews}
            change={12}
            icon={Eye}
            color="blue"
          />
          <MetricCard
            title="Bounce Rate"
            value={analyticsData.realTime.bounceRate}
            change={-8}
            icon={Target}
            color="orange"
            format="percentage"
          />
          <MetricCard
            title="Avg Session"
            value={analyticsData.realTime.avgSessionDuration}
            change={15}
            icon={Clock}
            color="purple"
            format="time"
          />
        </motion.div>

        {/* Business Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <MetricCard
            title="Contact Forms"
            value={analyticsData.business.contactFormSubmissions}
            change={25}
            icon={MessageSquare}
            color="green"
          />
          <MetricCard
            title="Resume Downloads"
            value={analyticsData.business.resumeDownloads}
            change={40}
            icon={Download}
            color="blue"
          />
          <MetricCard
            title="Project Views"
            value={analyticsData.business.projectViews}
            change={18}
            icon={Eye}
            color="purple"
          />
          <MetricCard
            title="Case Studies"
            value={analyticsData.business.caseStudyOpens}
            change={30}
            icon={BarChart3}
            color="orange"
          />
        </motion.div>

        {/* Performance and Device Analytics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <PerformanceMetrics performance={analyticsData.performance} />
          <DeviceAnalytics devices={analyticsData.devices} />
        </motion.div>

        {/* Top Pages */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TopPagesTable pages={analyticsData.topPages} />
        </motion.div>
      </div>
    </div>
  )
}