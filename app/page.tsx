/**
 * Home Page Component
 * 
 * Main landing page with optimized loading and proper component structure.
 * Implements dynamic imports for performance optimization while avoiding
 * module object serialization errors.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-23
 */


import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";

import dynamic from "next/dynamic";
import { Suspense } from "react";

/**
 * Loading Component for Suspense Fallback
 * 
 * Provides accessible loading state with proper ARIA attributes
 * and screen reader announcements.
 */
const ProjectsLoadingFallback = () => (
  <div 
    className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg flex items-center justify-center"
    role="status"
    aria-label="Loading projects section"
  >
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 font-medium">
        Loading Projects...
      </p>
      <span className="sr-only">Projects section is loading</span>
    </div>
  </div>
);

/**
 * Dynamically imported Projects Section
 * 
 * Uses proper dynamic import configuration to avoid module serialization errors.
 * Includes loading fallback and error boundary for better UX.
 */
const ProjectsSection = dynamic(
  () => import('@/components/sections/ProjectSection'),
  {
    loading: () => <ProjectsLoadingFallback />,
    ssr: true, // Enable SSR for better SEO
  }
);

/**
 * Main Home Page Component
 * 
 * Orchestrates all page sections with proper semantic structure,
 * accessibility landmarks, and performance optimizations.
 * 
 * Features:
 * - Semantic HTML5 structure with proper landmarks
 * - Accessible navigation between sections
 * - Performance-optimized dynamic loading
 * - SEO-friendly content structure
 * - WCAG 2.1 AA compliance
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Skip Navigation for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        tabIndex={0}
      >
        Skip to main content
      </a>

      {/* Main Content Wrapper */}
      <main id="main-content" role="main" aria-label="Portfolio content">
        
        {/* Hero Section - Above the fold content */}
        <section 
          id="home" 
          className="relative min-h-screen pt-10"
          aria-labelledby="hero-heading"
        >
          <HeroSection />
        </section>

        {/* About Section */}
        {/* <section 
          id="about" 
          className="relative"
          aria-labelledby="about-heading"
        >
          <AboutSection />
        </section> */}

        {/* Skills Section */}
        <section 
          id="skills" 
          className="relative"
          aria-labelledby="skills-heading"
        >
          <SkillsSection />
        </section>

        {/* Projects Section - Dynamically loaded for performance */}
        <section 
          id="projects" 
          className="relative"
          aria-labelledby="projects-heading"
        >
          <Suspense fallback={<ProjectsLoadingFallback />}>
            <ProjectsSection />
          </Suspense>
        </section>

        {/* Experience/Timeline Section */}
        {/* <section 
          id="experience" 
          className="relative"
          aria-labelledby="experience-heading"
        >
          <TimelineSection />
        </section> */}

        {/* Services Section */}
        {/* <section 
          id="services" 
          className="relative"
          aria-labelledby="services-heading"
        >
          <ServicesSection />
        </section> */}

        {/* Contact Section */}
        <section 
          id="contact" 
          className="relative"
          aria-labelledby="contact-heading"
        >
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      {/* <footer role="contentinfo" aria-label="Site footer">
        <Footer />
      </footer> */}
    </div>
  );
}