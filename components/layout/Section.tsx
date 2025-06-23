import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'lg', ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          {
            'py-0': spacing === 'none',
            'py-8 md:py-12': spacing === 'sm',
            'py-12 md:py-16': spacing === 'md',
            'py-16 md:py-20': spacing === 'lg',
            'py-20 md:py-24': spacing === 'xl',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Section.displayName = 'Section'
export default Section