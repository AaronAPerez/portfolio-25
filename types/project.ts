/**
 * Enhanced Project Type Definitions
 * 
 * Comprehensive type definitions for projects with business impact metrics,
 * technical achievements, and professional presentation data.
 */

export interface BusinessMetric {
  label: string;
  value: string;
  improvement?: string;
  icon: React.ElementType;
  color: string;
}

export interface BusinessImpact {
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
}

export interface TechnicalHighlights {
  performanceScore: number;
  accessibilityScore: number;
  seoScore: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  innovations: string[];
}

export interface ProjectSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'ecommerce' | 'web-app' | 'mobile';
  status: 'live' | 'in-development' | 'completed';
  featured: boolean;
  timeline: string;
  teamSize: string;
  role: string;
  thumbnail: string;
  imageAlt: string;
  gallery?: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl: string;
  caseStudyUrl?: string;
  businessImpact: BusinessImpact;
  technicalHighlights: TechnicalHighlights;
  seo: ProjectSEO;
}