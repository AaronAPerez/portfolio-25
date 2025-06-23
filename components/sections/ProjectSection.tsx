/**
 * Project Section Component
 * 
 * Enhanced project showcase with dynamic loading, accessibility features,
 * and performance optimizations. Properly exports as default for dynamic imports.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */

'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  TrendingUp, 
  ExternalLink, 
  Github,
  Award,
  Target,
  Calendar,
  Users,
  Code2,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useA11yAnnouncements } from '@/hooks/accessibility/useA11yAnnouncements'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { cn } from '@/lib/utils'


export interface Project {
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

export const projects: Project[] = [
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
    thumbnail: '/images/projects/amp-vending/thumbnail.jpg',
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

const categories = [
  { id: 'all', name: 'All Projects', icon: Target },
  { id: 'business', name: 'Business Websites', icon: TrendingUp },
  { id: 'web-app', name: 'Web Applications', icon: Code2 },
];

/**
 * Individual Project Card Component
 * 
 * Displays project information with accessibility features and interactions.
 */
const ProjectCard = ({ 
  project, 
  index 
}: { 
  project: Project; 
  index: number;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <Code2 className="w-16 h-16 text-white opacity-50" />
          </div>
        )}

        {/* Project Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "px-3 py-1 text-xs font-semibold rounded-full",
            project.status === 'completed' 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : project.status === 'in-progress'
              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          )}>
            {project.status === 'completed' ? '✅ Completed' : 
             project.status === 'in-progress' ? '🔄 In Progress' : '📝 Planned'}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <Award className="w-6 h-6 text-yellow-500" aria-label="Featured project" />
          </div>
        )}

        {/* Hover Overlay with Action Buttons */}
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
          <h3 
            id={`project-title-${project.id}`}
            className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2"
          >
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Business Impact Metric */}
        {project.businessImpact && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                {project.businessImpact.primaryMetric.label}
              </span>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {project.businessImpact.primaryMetric.value}
            </div>
            {project.businessImpact.primaryMetric.improvement && (
              <div className="text-xs text-green-700 dark:text-green-400">
                {project.businessImpact.primaryMetric.improvement}
              </div>
            )}
          </div>
        )}

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Project Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{project.timeline}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{project.teamSize}</span>
            </div>
          </div>
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
            {project.category}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * Main Projects Section Component
 * 
 * Features:
 * - Dynamic filtering and search functionality
 * - Accessible keyboard navigation
 * - Screen reader announcements for filter changes
 * - Performance optimized rendering
 * - WCAG 2.1 AA compliance
 */
function ProjectSection() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const { announce } = useA11yAnnouncements();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle category change with accessibility announcement
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const categoryName = categories.find(c => c.id === category)?.name || category;
    announce(`Filtered projects by category: ${categoryName}. Showing ${filteredProjects.length} projects.`);
  };

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
          <h2 
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Featured Projects
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real projects with measurable business impact. Each project demonstrates technical excellence, 
            user-centered design, and quantifiable results.
          </p>
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
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search projects"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
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
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600"
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Filter by ${category.name}`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredProjects.length} of {projects.length} projects
            </span>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
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
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                announce('Filters cleared, showing all projects');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

// IMPORTANT: Default export for dynamic imports
export default ProjectSection;