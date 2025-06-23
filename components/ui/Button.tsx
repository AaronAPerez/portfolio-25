import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import React from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  asChild?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    loading, 
    asChild = false,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    
    // If asChild is true, render children directly (for Link components)
    if (asChild) {
      // Clone the child element and add our className and props
      if (React.isValidElement(children)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(children as React.ReactElement<any>, {
          className: cn(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            'ring-offset-background',
            {
              'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
              'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
              'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
              'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
              'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            },
            {
              'h-9 px-3 text-sm': size === 'sm',
              'h-10 px-4 py-2': size === 'md',
              'h-11 px-8 text-lg': size === 'lg',
              'h-10 w-10': size === 'icon',
            },
            className,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (children as React.ReactElement<any>).props.className
          ),
          ref,
          disabled: disabled || loading,
          ...props,
        })
      }
      
      // Fallback if children is not a valid React element
      console.warn('Button with asChild prop requires a single React element child')
      return null
    }
    
    // Normal button rendering
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] min-w-[44px] touch-manipulation select-none',
          'disabled:pointer-events-none disabled:opacity-50',
          'ring-offset-background',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          },
          {
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-11 px-8 text-lg': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
