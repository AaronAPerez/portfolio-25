'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, Palette } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'compact'
  className?: string
  showLabel?: boolean
}

/**
 * Professional Theme Toggle Component
 * Supports light, dark, and system themes with smooth animations
 */
export function ThemeToggle({ 
  variant = 'button', 
  className,
  showLabel = false 
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn(
        "p-3 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 animate-pulse",
        variant === 'dropdown' && "w-56 h-10",
        variant === 'compact' && "w-20 h-8",
        className
      )}>
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </div>
    )
  }

  const themes = [
    { 
      value: 'light' as const, 
      label: 'Light', 
      icon: Sun, 
      description: 'Light mode for bright environments'
    },
    { 
      value: 'dark' as const, 
      label: 'Dark', 
      icon: Moon, 
      description: 'Dark mode for low-light environments'
    },
    { 
      value: 'system' as const, 
      label: 'System', 
      icon: Monitor, 
      description: 'Follow system preference'
    }
  ]

  const currentTheme = themes.find(t => t.value === theme) || themes[2]
  const CurrentIcon = currentTheme.icon

  // Simple button toggle (cycles through themes)
  if (variant === 'button') {
    const handleClick = () => {
      const currentIndex = themes.findIndex(t => t.value === theme)
      const nextIndex = (currentIndex + 1) % themes.length
      setTheme(themes[nextIndex].value)
    }

    return (
      <motion.button
        onClick={handleClick}
        className={cn(
          "relative p-3 rounded-full transition-all duration-300",
          "bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm",
          "border border-gray-200 dark:border-gray-700",
          "hover:bg-white/20 dark:hover:bg-gray-700/50",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "touch-target group min-h-[44px] min-w-[44px]",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${themes[(themes.findIndex(t => t.value === theme) + 1) % themes.length].label.toLowerCase()} mode`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon className={cn(
              "w-5 h-5 transition-colors",
              resolvedTheme === 'dark' ? 'text-yellow-400' : 'text-blue-600'
            )} />
          </motion.div>
        </AnimatePresence>
        
        {showLabel && (
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentTheme.label}
          </span>
        )}

        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap">
            {currentTheme.label} mode
          </div>
        </div>
      </motion.button>
    )
  }

  // Compact toggle (just shows current state)
  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg",
        "bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm",
        "border border-gray-200 dark:border-gray-700",
        className
      )}>
        <CurrentIcon className={cn(
          "w-4 h-4",
          resolvedTheme === 'dark' ? 'text-yellow-400' : 'text-blue-600'
        )} />
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentTheme.label}
          </span>
        )}
      </div>
    )
  }

  // Dropdown variant (shows all options)
  return (
    <div className={cn("relative", className)}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
          "bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm",
          "border border-gray-200 dark:border-gray-700",
          "hover:bg-white/20 dark:hover:bg-gray-700/50",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "touch-target min-h-[44px]"
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Theme selector"
        aria-expanded={isOpen}
      >
        <Palette className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <CurrentIcon className={cn(
          "w-4 h-4",
          resolvedTheme === 'dark' ? 'text-yellow-400' : 'text-blue-600'
        )} />
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentTheme.label}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl backdrop-blur-sm z-50"
          >
            <div className="p-2">
              {themes.map((themeOption) => {
                const IconComponent = themeOption.icon
                const isSelected = theme === themeOption.value
                
                return (
                  <motion.button
                    key={themeOption.value}
                    onClick={() => {
                      setTheme(themeOption.value)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left",
                      isSelected 
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100" 
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconComponent className={cn(
                      "w-4 h-4",
                      isSelected 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "text-gray-500 dark:text-gray-400"
                    )} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {themeOption.label}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {themeOption.description}
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}