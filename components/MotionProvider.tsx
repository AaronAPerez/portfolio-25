'use client';
/**
 * Optimized Motion Components
 * Reduces bundle size by importing only necessary motion components
 * Implements performance best practices for animations
 */

import { 
  LazyMotion, 
  domAnimation, 
  m,
  type MotionProps,
  type Variants 
} from 'framer-motion';
import { memo, type PropsWithChildren } from 'react';

// Motion wrapper with reduced bundle size
export const MotionProvider = memo(({ children }: PropsWithChildren) => (
  <LazyMotion features={domAnimation} strict>
    {children}
  </LazyMotion>
));
MotionProvider.displayName = 'MotionProvider';

// Optimized motion variants for common animations
export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.3 }
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for better performance
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const slideInLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -30,
    transition: { duration: 0.3 }
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const slideInRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 30,
    transition: { duration: 0.3 }
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: 'easeOut'
    }
  }
};

// Stagger container for lists
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Optimized motion components
interface OptimizedMotionProps extends MotionProps {
  className?: string;
  children: React.ReactNode;
}

export const MotionDiv = memo(({ children, ...props }: OptimizedMotionProps) => (
  <m.div {...props}>{children}</m.div>
));
MotionDiv.displayName = 'MotionDiv';

export const MotionSection = memo(({ children, ...props }: OptimizedMotionProps) => (
  <m.section {...props}>{children}</m.section>
));
MotionSection.displayName = 'MotionSection';

export const MotionArticle = memo(({ children, ...props }: OptimizedMotionProps) => (
  <m.article {...props}>{children}</m.article>
));
MotionArticle.displayName = 'MotionArticle';

// Intersection observer hook for performance
export const useInViewAnimation = (variants: Variants = fadeInUp) => ({
  initial: 'initial',
  whileInView: 'animate',
  exit: 'exit',
  variants,
  viewport: { 
    once: true, 
    amount: 0.1,
    margin: '-10% 0px' // Trigger animation earlier
  },
  transition: { duration: 0.5 }
});

// Performance-optimized button with proper accessibility
interface MotionButtonProps extends MotionProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
}

export const MotionButton = memo(({ 
  children, 
  onClick, 
  disabled = false,
  'aria-label': ariaLabel,
  className,
  ...motionProps 
}: MotionButtonProps) => (
  <m.button
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className={className}
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    {...motionProps}
  >
    {children}
  </m.button>
));
MotionButton.displayName = 'MotionButton';