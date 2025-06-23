/**
 * Skip Links Component
 * 
 * Provides keyboard users with quick navigation to main content areas.
 * Essential for WCAG 2.1 AA compliance and screen reader accessibility.
 * 
 * @example
 * ```tsx
 * <SkipLinks />
 * ```
 */
'use client';

import { useCallback } from 'react'
import { cn } from '@/lib/utils'

interface SkipLinkItem {
  href: string;
  label: string;
  description?: string;
}

const skipLinks: SkipLinkItem[] = [
  {
    href: '#main-content',
    label: 'Skip to main content',
    description: 'Jump to the primary content of the page'
  },
  {
    href: '#navigation',
    label: 'Skip to navigation',
    description: 'Jump to the main navigation menu'
  },
  {
    href: '#footer',
    label: 'Skip to footer',
    description: 'Jump to the page footer'
  }
]

/**
 * Skip Links component for keyboard accessibility
 */
export function SkipLinks() {
  const handleSkipLinkClick = useCallback((href: string, event: React.MouseEvent) => {
    event.preventDefault()
    
    const targetElement = document.querySelector(href)
    if (targetElement) {
      // Focus the target element
      const focusableElement = targetElement.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement
      
      if (focusableElement) {
        focusableElement.focus()
      } else {
        // If no focusable element, make the target focusable temporarily
        targetElement.setAttribute('tabindex', '-1')
        ;(targetElement as HTMLElement).focus()
        
        // Remove tabindex after blur to maintain semantic meaning
        const handleBlur = () => {
          targetElement.removeAttribute('tabindex')
          targetElement.removeEventListener('blur', handleBlur)
        }
        targetElement.addEventListener('blur', handleBlur)
      }
      
      // Smooth scroll to target
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])

  return (
    <div 
      className="skip-links fixed top-0 left-0 z-[9999]"
      role="navigation"
      aria-label="Skip navigation links"
    >
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleSkipLinkClick(link.href, e)}
          className={cn(
            // Positioning - off-screen by default
            "absolute left-[-9999px] top-auto",
            // Focus styles - visible and styled when focused
            "focus:left-6 focus:top-6 focus:w-auto focus:h-auto",
            // Visual styling
            "bg-primary text-primary-foreground",
            "px-4 py-2 rounded-md shadow-lg",
            "text-sm font-medium",
            "border-2 border-primary-foreground",
            // Animation
            "transition-all duration-150 ease-in-out",
            // Ensure it's above everything
            "z-[10000]"
          )}
          aria-label={link.description || link.label}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

export default SkipLinks