/**
 * Project Section Component
 * 
 * Professional project showcase with business impact metrics, accessibility features,
 * and comprehensive filtering. Demonstrates measurable results and technical excellence.
 * 
 * Features:
 * - Business impact metrics display
 * - Advanced filtering and search
 * - Accessibility-first design
 * - Performance optimization
 * - Case study modal integration
 * 
 * @author Aaron A. Perez
 * @created 2025-06-22
 */

'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  ExternalLink, 
  Github,
  Award,
  Target,
  Zap,
  Users,
  Calendar,
  Code2,
  ArrowRight,
  X,
  CheckCircle
} from 'lucide-react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useA11yAnnouncements } from '@/hooks/accessibility/useA11yAnnouncements'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

// Enhanced project data structure with business metrics
interface BusinessMetric {
  label: string;
  value: string;
  improvement?: string;
  icon: React.ElementType;
  color: string;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'ecommerce' | 'web-app' | 'saas';
  status: 'live' | 'in-development' | 'completed';
  featured: boolean;
  timeline: string;
  teamSize: string;
  role: string;
  
  // Visual assets
  thumbnail: string;
  imageAlt: string;
  
  // Technical details
  technologies: string[];
  
  // Links
  liveUrl?: string;
  githubUrl: string;
  caseStudyUrl?: string;
  
  // Business Impact - Key differentiator
  businessImpact: {
    primaryMetric: {
      label: string;
      value: string;
      improvement: string;
      timeframe: string;
    };
    keyMetrics: BusinessMetric[];
    roiStatement: string;
    clientTestimonial?: {
      quote: string;
      author: string;
      role: string;
      company: string;
    };
  };
  
  // Technical achievements
  technicalHighlights: {
    performanceScore: number;
    accessibilityScore: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
    innovations: string[];
  };
}

// Enhanced project data with real business metrics
const enhancedProjects: ProjectData[] = [
  {
    id: 'amp-vending-enhanced',
    title: 'AMP Vending Digital Transformation',
    description: 'Complete digital transformation resulting in 40% increase in qualified leads and improved customer experience through modern web technologies.',
    category: 'business',
    status: 'live',
    featured: true,
    timeline: '8 weeks',
    teamSize: '2 members',
    role: 'Lead Full Stack Developer',
    
    thumbnail: '/images/projects/amp-vending/thumbnail.jpg',
    imageAlt: 'AMP Vending modern website homepage showcasing professional vending services',
    
    technologies: [
      'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 
      'Responsive Design', 'SEO Optimization', 'Performance Optimization'
    ],
    
    liveUrl: 'https://amp-vending-website.vercel.app',
    githubUrl: 'https://github.com/AaronAPerez/AMP-Vending_Website',
    
    businessImpact: {
      primaryMetric: {
        label: 'Lead Generation Increase',
        value: '+40%',
        improvement: '40% increase in qualified leads',
        timeframe: '3 months post-launch'
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
    
    technicalHighlights: {
      performanceScore: 97,
      accessibilityScore: 100,
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
    }
  },
  
  {
    id: 'goldmine-communications',
    title: 'Goldmine Communications Professional Website',
    description: 'Modern telecommunications company website with enhanced user experience and professional branding, resulting in improved client trust and engagement.',
    category: 'business',
    status: 'live',
    featured: true,
    timeline: '6 weeks',
    teamSize: '2 members',
    role: 'Full Stack Developer & Designer',
    
    thumbnail: '/images/projects/goldmine/thumbnail.jpg',
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
        improvement: '85% improvement in perceived professionalism',
        timeframe: '2 months post-launch'
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
    }
  }
];

// Filter categories with icons
const categories = [
  { id: 'all', name: 'All Projects', icon: Code2, count: enhancedProjects.length },
  { id: 'business', name: 'Business Websites', icon: Target, count: enhancedProjects.filter(p => p.category === 'business').length },
  { id: 'ecommerce', name: 'E-commerce', icon: TrendingUp, count: enhancedProjects.filter(p => p.category === 'ecommerce').length },
  { id: 'web-app', name: 'Web Applications', icon: Code2, count: enhancedProjects.filter(p => p.category === 'web-app').length },
  { id: 'saas', name: 'SaaS Products', icon: Zap, count: enhancedProjects.filter(p => p.category === 'saas').length }
];

// Technology filter options
const technologies = [
  'All', 'React', 'TypeScript', 'Next.js', 'Node.js', '.NET', 'Tailwind CSS', 'Framer Motion'
];

/**
 * Enhanced Project Card with Business Metrics
 */
interface ProjectCardProps {
  project: ProjectData;
  index: number;
  onViewCase: (project: ProjectData) => void;
}

const ProjectCard = ({ project, index, onViewCase }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const primaryMetric = project.businessImpact.primaryMetric;
  const keyMetrics = project.businessImpact.keyMetrics;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
      role="article"
      aria-labelledby={`project-title-${project.id}`}
      data-testid={`project-card-${project.id}`}
      data-project-id={project.id}
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
        {!imageError ? (
          <Image
            src={project.thumbnail}
            alt={project.imageAlt}
            fill
            className={cn(
              "object-cover transition-all duration-700 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3} // Prioritize first 3 images
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <Code2 className="w-16 h-16 text-white opacity-50" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 text-xs font-semibold rounded-full",
            project.status === 'live' 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : project.status === 'in-development'
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          )}>
            {project.status === 'live' ? '🟢 Live' : 
             project.status === 'in-development' ? '🔄 In Development' : '✅ Completed'}
          </span>
        </div>

        {/* Primary Metric Overlay */}
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {primaryMetric.value}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {primaryMetric.label}
          </div>
        </div>

        {/* Hover Overlay with CTAs */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  aria-label={`View ${project.title} live site`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm font-medium">Live Site</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  aria-label={`View ${project.title} source code`}
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-medium">Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 
              id={`project-title-${project.id}`}
              className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
            >
              {project.title}
            </h3>
            {project.featured && (
              <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" aria-label="Featured project" />
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {project.description}
          </p>
        </div>

        {/* Business Impact Metrics */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Business Impact
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {keyMetrics.slice(0, 4).map((metric, idx) => {
              const IconComponent = metric.icon;
              return (
                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <IconComponent className={`w-4 h-4 ${metric.color}`} />
                  <div className="min-w-0">
                    <div className={`text-sm font-semibold ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Project Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {project.timeline}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {project.teamSize}
            </div>
          </div>
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 capitalize">
            {project.category.replace('-', ' ')}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => onViewCase(project)}
          className="w-full group/btn"
          data-action="open-case-study"
          data-project-id={project.id}
          aria-label={`View detailed case study for ${project.title}`}
        >
          <span>View Case Study</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.article>
  );
};

/**
 * Case Study Modal Component
 */
interface CaseStudyModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = ({ project, isOpen, onClose }: CaseStudyModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`case-study-title-${project.id}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 
                  id={`case-study-title-${project.id}`}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  {project.title} - Case Study
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close case study"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              {/* Business Impact Section */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Business Impact
                </h3>
                
                {/* Primary Metric */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {project.businessImpact.primaryMetric.value}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {project.businessImpact.primaryMetric.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {project.businessImpact.primaryMetric.improvement} • {project.businessImpact.primaryMetric.timeframe}
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {project.businessImpact.keyMetrics.map((metric, idx) => {
                    const IconComponent = metric.icon;
                    return (
                      <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <IconComponent className={`w-5 h-5 ${metric.color}`} />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {metric.label}
                          </span>
                        </div>
                        <div className={`text-2xl font-bold ${metric.color}`}>
                          {metric.value}
                        </div>
                        {metric.improvement && (
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {metric.improvement} improvement
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ROI Statement */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                    Return on Investment
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200">
                    {project.businessImpact.roiStatement}
                  </p>
                </div>

                {/* Client Testimonial */}
                {project.businessImpact.clientTestimonial && (
                  <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                      &quot;{project.businessImpact.clientTestimonial.quote}&quot;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {project.businessImpact.clientTestimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {project.businessImpact.clientTestimonial.author}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {project.businessImpact.clientTestimonial.role}, {project.businessImpact.clientTestimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Technical Implementation */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  Technical Implementation
                </h3>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {project.technicalHighlights.performanceScore}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Performance Score</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {project.technicalHighlights.accessibilityScore}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accessibility Score</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {project.technicalHighlights.coreWebVitals.lcp}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">LCP Score</div>
                  </div>
                </div>

                {/* Technical Innovations */}
                <div>
                  <h4 className="font-semibold mb-3">Key Technical Innovations</h4>
                  <div className="space-y-2">
                    {project.technicalHighlights.innovations.map((innovation, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{innovation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Technologies Used */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Project Links */}
              <section>
                <h3 className="text-xl font-semibold mb-4">Project Links</h3>
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Site
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Source Code
                  </a>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Main Enhanced Project Section Component
 * 
 * Features:
 * - Business impact focus for recruiter appeal
 * - Advanced filtering and search
 * - Accessibility-first design
 * - Performance optimized
 * - Mobile-responsive layout
 * - Case study modals
 */
export default function ProjectsSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const { announce } = useA11yAnnouncements();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    return enhancedProjects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [selectedCategory, selectedTech, searchQuery]);

  // Handle category change with accessibility announcement
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    const categoryName = categories.find(c => c.id === category)?.name || category;
    announce(`Filtered projects by category: ${categoryName}. Showing ${filteredProjects.length} projects.`);
  }, [announce, filteredProjects.length]);

  // Handle case study modal
  const handleViewCase = useCallback((project: ProjectData) => {
    setSelectedProject(project);
    setShowCaseStudy(true);
    announce(`Opening case study for ${project.title}`);
  }, [announce]);

  const handleCloseCaseStudy = useCallback(() => {
    setShowCaseStudy(false);
    setSelectedProject(null);
    announce('Case study closed');
  }, [announce]);

  // Calculate portfolio statistics
  const portfolioStats = useMemo(() => {
    const totalProjects = enhancedProjects.length;
    const liveProjects = enhancedProjects.filter(p => p.status === 'live').length;
    const avgPerformance = Math.round(
      enhancedProjects.reduce((sum, p) => sum + p.technicalHighlights.performanceScore, 0) / 
      enhancedProjects.length
    );
    const technologiesUsed = [...new Set(enhancedProjects.flatMap(p => p.technologies))].length;

    return {
      totalProjects,
      liveProjects,
      avgPerformance,
      technologiesUsed
    };
  }, []);

  return (
    <Section id="projects" ref={ref} className="relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20" />
      <div className="absolute inset-0 bg-grid-small opacity-30" />
      
      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6"
          >
            <TrendingUp className="w-4 h-4" />
            Portfolio Showcase
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Projects That Drive Results
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Real projects with measurable business impact. Each case study demonstrates technical excellence, 
            user-centered design, and quantifiable results that matter to stakeholders.
          </p>

          {/* Portfolio Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {portfolioStats.totalProjects}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {portfolioStats.liveProjects}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Live Sites</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {portfolioStats.avgPerformance}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Performance</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {portfolioStats.technologiesUsed}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-label="Search projects by name, description, or technology"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300",
                    isSelected
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600 hover:scale-102"
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Filter by ${category.name}. ${category.count} projects.`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                  <span className="text-xs bg-black/10 dark:bg-white/10 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Technology Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={cn(
                  "px-4 py-2 text-sm rounded-full transition-all duration-300",
                  selectedTech === tech
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30"
                )}
                aria-pressed={selectedTech === tech}
                aria-label={`Filter by ${tech} technology`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredProjects.length} of {enhancedProjects.length} projects
            </span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedTech}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            role="grid"
            aria-label="Project portfolio grid"
          >
            {filteredProjects.map((project, index) => (
              <div key={project.id} role="gridcell">
                <ProjectCard
                  project={project}
                  index={index}
                  onViewCase={handleViewCase}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search terms to find relevant projects.
            </p>
            <Button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTech('All');
                setSearchQuery('');
                announce('Filters cleared, showing all projects');
              }}
              variant="outline"
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear All Filters
            </Button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how I can help bring your vision to life with measurable results 
            and technical excellence that drives business growth.
          </p>
          <motion.button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Navigate to contact section to start a project"
          >
            Let&atos;s Work Together
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </Container>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={showCaseStudy}
        onClose={handleCloseCaseStudy}
      />
    </Section>
  );
}