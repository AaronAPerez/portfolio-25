/**
 * Performance Dashboard Toggle Component
 * 
 * Development tool for toggling the performance dashboard.
 * Only renders in development mode for debugging and monitoring.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, X } from 'lucide-react'
import { PerformanceDashboard } from './PerformanceDashboard'

/**
 * Props for the dashboard toggle
 */
interface PerformanceDashboardToggleProps {
  /** Whether to show the toggle (defaults to development mode only) */
  enabled?: boolean;
  /** Position of the toggle button */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

/**
 * Performance Dashboard Toggle Component
 * 
 * Provides a floating action button to open/close the performance dashboard.
 * Useful for development and debugging performance issues.
 */
export function PerformanceDashboardToggle({ 
  enabled = process.env.NODE_ENV === 'development',
  position = 'bottom-left'
}: PerformanceDashboardToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render in production unless explicitly enabled
  if (!enabled) {
    return null;
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      default:
        return 'bottom-4 left-4';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed z-40 p-3 
          bg-blue-600 hover:bg-blue-700 
          text-white rounded-full shadow-lg 
          transition-all duration-200
          ${getPositionClasses()}
        `}
        aria-label={isOpen ? 'Close performance dashboard' : 'Open performance dashboard'}
        title="Performance Dashboard"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Activity className="w-5 h-5" />
        )}
      </motion.button>

      {/* Performance Dashboard */}
      <PerformanceDashboard
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        config={{
          showAdvancedMetrics: true,
          enableExport: true,
          refreshInterval: 5000 // 5 seconds in development
        }}
      />
    </>
  );
}

export default PerformanceDashboardToggle;