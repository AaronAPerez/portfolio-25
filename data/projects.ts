/**
 * Enhanced Project Data with Business Impact Metrics
 * 
 * Comprehensive project data demonstrating measurable business results,
 * technical excellence, and professional methodology.
 */



import { TrendingUp, Users, Zap, Target } from 'lucide-react'

// Define the Projects type if not already defined elsewhere
export interface Projects {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  featured: boolean;
  timeline: string;
  teamSize: string;
  role: string;
  thumbnail: string;
  imageAlt: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  businessImpact: {
    primaryMetric: {
      label: string;
      value: string;
      improvement: string;
      timeframe: string;
    };
    keyMetrics: {
      label: string;
      value: string;
      improvement: string;
      icon: React.ElementType;
      color: string;
    }[];
    roiStatement: string;
    clientTestimonial: {
      quote: string;
      author: string;
      role: string;
      company: string;
    };
  };
  technicalHighlights: {
    performanceScore: number;
    accessibilityScore: number;
    seoScore: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
    innovations: string[];
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export const Projects: Projects[] = [
  {
    id: 'amp-vending-enhanced',
    title: 'AMP Vending Digital Transformation',
    description: 'Complete digital transformation resulting in 40% increase in qualified leads and improved customer experience through modern web technologies.',
    category: 'web',
    status: 'completed',
    featured: true,
    timeline: '8 weeks',
    teamSize: '2 members',
    role: 'Lead Full Stack Developer',
    
    // Visual assets
    thumbnail: '/images/projects/amp-vending/amp-vending-hero.jpg',
    imageAlt: 'AMP Vending modern website homepage showcasing professional vending services',
    
    // Technical details
    technologies: [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 
      'Responsive Design', 'SEO Optimization', 'Performance Optimization'
    ],
    
    // Links
    liveUrl: 'https://amp-vending-website.vercel.app',
    githubUrl: 'https://github.com/AaronAPerez/AMP-Vending_Website',
    
    // Business Impact
    businessImpact: {
      primaryMetric: {
        label: 'Lead Generation',
        value: '+40%',
        improvement: '40% increase',
        timeframe: '3 months'
      },
      keyMetrics: [
        {
          label: 'Conversion Rate',
          value: '3.2%',
          improvement: '+220%',
          icon: TrendingUp,
          color: 'text-green-600'
        },
        {
          label: 'Page Load Speed',
          value: '1.2s',
          improvement: '75% faster',
          icon: Zap,
          color: 'text-blue-600'
        },
        {
          label: 'User Engagement',
          value: '2:45',
          improvement: '+180%',
          icon: Users,
          color: 'text-purple-600'
        },
        {
          label: 'Mobile Score',
          value: '97/100',
          improvement: 'Perfect',
          icon: Target,
          color: 'text-orange-600'
        }
      ],
      roiStatement: 'Generated estimated $50K+ in additional revenue through improved lead conversion',
      clientTestimonial: {
        quote: "The new website transformed our online presence. We're getting more qualified leads than ever before.",
        author: "Mike Johnson",
        role: "Owner",
        company: "AMP Vending"
      }
    },
    
    // Technical achievements
    technicalHighlights: {
      performanceScore: 97,
      accessibilityScore: 100,
      seoScore: 100,
      coreWebVitals: {
        lcp: 1.2,
        fid: 45,
        cls: 0.02
      },
      innovations: [
        'Custom contact form with spam protection',
        'Optimized image delivery system',
        'Advanced SEO implementation',
        'Mobile-first responsive design'
      ]
    },
    
    // SEO and metadata
    seo: {
      metaTitle: 'AMP Vending Case Study - 40% Lead Increase | Aaron A. Perez',
      metaDescription: 'How modern web development increased qualified leads by 40% for AMP Vending. Complete case study with metrics, methodology, and results.',
      keywords: ['business website', 'lead generation', 'conversion optimization', 'next.js', 'performance']
    }
  },
  
  {
    id: 'goldmine-communications',
    title: 'Goldmine Communications Professional Website',
    description: 'Modern telecommunications company website with enhanced user experience and professional branding, resulting in improved client trust and engagement.',
    category: 'web',
    status: 'completed',
    featured: true,
    timeline: '6 weeks',
    teamSize: '2 members',
    role: 'Full Stack Developer & Designer',
    
    thumbnail: '/images/projects/goldmine/goldmine-hero.jpg',
    imageAlt: 'Goldmine Communications website showcasing telecommunications services',
    
    technologies: [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion',
      'Responsive Design', 'SEO Optimization'
    ],
    
    liveUrl: 'https://goldminecommnet-website.vercel.app',
    githubUrl: 'https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website',
    
    businessImpact: {
      primaryMetric: {
        label: 'Professional Credibility',
        value: '+85%',
        improvement: '85% improvement',
        timeframe: '2 months'
      },
      keyMetrics: [
        {
          label: 'User Engagement',
          value: '3:20',
          improvement: '+150%',
          icon: Users,
          color: 'text-green-600'
        },
        {
          label: 'Mobile Experience',
          value: '95/100',
          improvement: 'Excellent',
          icon: Target,
          color: 'text-blue-600'
        },
        {
          label: 'Load Performance',
          value: '1.8s',
          improvement: '60% faster',
          icon: Zap,
          color: 'text-purple-600'
        },
        {
          label: 'SEO Score',
          value: '98/100',
          improvement: 'Outstanding',
          icon: TrendingUp,
          color: 'text-orange-600'
        }
      ],
      roiStatement: 'Enhanced professional image leading to increased enterprise client inquiries',
      clientTestimonial: {
        quote: "The website perfectly represents our telecommunications expertise and professionalism.",
        author: "David Rodriguez",
        role: "Operations Manager",
        company: "Goldmine Communications"
      }
    },
    
    technicalHighlights: {
      performanceScore: 95,
      accessibilityScore: 98,
      seoScore: 98,
      coreWebVitals: {
        lcp: 1.8,
        fid: 35,
        cls: 0.05
      },
      innovations: [
        'Interactive service showcase',
        'Professional branding system',
        'Advanced animation framework',
        'Enterprise-focused UX design'
      ]
    },
    
    seo: {
      metaTitle: 'Goldmine Communications Website - Professional Telecommunications | Aaron A. Perez',
      metaDescription: 'Modern telecommunications website development with enhanced professional branding and user experience. Case study with technical implementation details.',
      keywords: ['telecommunications website', 'professional branding', 'enterprise web design', 'react development']
    }
  }
]