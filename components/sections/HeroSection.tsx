'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/theme-context'
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Star,
  Trophy,
  Code
} from 'lucide-react'
import Image from 'next/image'


// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Enhanced Hero Section with Professional Styling
 * Optimized for recruiter appeal with quantifiable metrics
 */
export default function HeroSection() {
  const { resolvedTheme } = useTheme()
  
  const [mounted, setMounted] = useState(false)
  const [, setCurrentMetric] = useState(0)

  // Professional metrics that recruiters want to see
  const heroMetrics = [
    { 
      label: 'Projects Delivered', 
      value: '15+', 
      icon: Trophy, 
      color: 'text-blue-600 dark:text-blue-400',
      description: 'Successfully completed',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30'
    },
    { 
      label: 'Client Satisfaction', 
      value: '100%', 
      icon: Star, 
      color: 'text-yellow-600 dark:text-yellow-400',
      description: 'Positive feedback',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30'
    },
    { 
      label: 'Years Experience', 
      value: '3+', 
      icon: Calendar, 
      color: 'text-green-600 dark:text-green-400',
      description: 'Professional development',
      bgColor: 'bg-green-50 dark:bg-green-900/30'
    },
    { 
      label: 'Technologies', 
      value: '20+', 
      icon: Code, 
      color: 'text-purple-600 dark:text-purple-400',
      description: 'Modern tech stack',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30'
    }
  ]

  // Rotating technologies with enhanced styling
  const technologies = [
    { name: 'React', color: 'react-blue' },
    { name: 'TypeScript', color: 'typescript-blue' },
    { name: 'Next.js', color: 'text-gray-900 dark:text-white' },
    { name: 'Node.js', color: 'node-green' },
    { name: 'Azure', color: 'azure-blue' },
    { name: 'C#', color: 'csharp-purple' }
  ]
  const [currentTech, setCurrentTech] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Rotate metrics every 3.5 seconds
    const metricInterval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % heroMetrics.length)
    }, 3500)

    // Rotate technologies every 2.5 seconds
    const techInterval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % technologies.length)
    }, 2500)

    return () => {
      clearInterval(metricInterval)
      clearInterval(techInterval)
    }
  }, [heroMetrics.length, technologies.length])

  if (!mounted) return null

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResumeDownload = () => {
    // Track download event for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'hero_section'
      })
    }
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
      <div className={`p-4 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Professional Gradient Orbs with improved animations */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 mt-4"
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/50"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse z-30"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Enhanced Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-display">
                Full Stack Developer
              </h1>
              
              <div className="flex items-center gap-2 text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                <span className="text-professional">Specializing in</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={technologies[currentTech].name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`font-semibold ${technologies[currentTech].color}`}
                  >
                    {technologies[currentTech].name}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Enhanced Value Proposition */}
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-body text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xl"
            >
              I build scalable web applications that drive business growth.
              From concept to deployment, I deliver solutions that perform with
              <span className="font-semibold text-primary-600 dark:text-primary-400"> measurable results</span>.
            </motion.p>

            {/* Professional Metrics Grid 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {heroMetrics.map((metric, index) => {
                const IconComponent = metric.icon
                const isActive = currentMetric === index
                
                return (
                  <motion.div
                    key={metric.label}
                    className={`glass text-center p-4 rounded-xl transition-all duration-500 hover-lift cursor-default ${
                      isActive 
                        ? `${metric.bgColor} border-2 scale-105 shadow-lg` 
                        : 'hover:scale-102'
                    }`}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      y: isActive ? -5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                    <div className={`text-metric text-2xl font-bold mb-1 ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mb-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {metric.description}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div> */}

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={scrollToProjects}
                className="group touch-target px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View my portfolio projects"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </motion.button>

              <motion.a
                href="/A.Perez - Fullstack Resume.pdf"
                download
                onClick={handleResumeDownload}
                className="group touch-target px-8 py-4 glass border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download resume PDF"
              >
                <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Enhanced Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-caption">
                Connect with me:
              </span>
              <div className="flex gap-3">
                {[
                  { 
                    icon: Github, 
                    href: 'https://github.com/AaronAPerez', 
                    label: 'GitHub', 
                    hoverColor: 'hover:text-gray-900 dark:hover:text-white',
                    bgHover: 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  },
                  { 
                    icon: Linkedin, 
                    href: 'https://linkedin.com/in/aaronaperezdev', 
                    label: 'LinkedIn', 
                    hoverColor: 'hover:text-blue-600',
                    bgHover: 'hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  },
                  { 
                    icon: Mail, 
                    href: 'mailto:aaperez06@gmail.com', 
                    label: 'Email', 
                    hoverColor: 'hover:text-red-500',
                    bgHover: 'hover:bg-red-50 dark:hover:bg-red-900/30'
                  }
                ].map((social) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`touch-target p-3 glass rounded-full shadow-md transition-all duration-300 text-gray-600 dark:text-gray-400 ${social.hoverColor} ${social.bgHover}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Professional Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex items-center gap-2 text-caption"
            >
              <MapPin className="w-4 h-4" />
              <span>Stockton, CA • Open to Remote Opportunities</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                className="relative w-80 h-80 md:w-96 md:h-96 gpu-accelerated"
              >
                {/* Enhanced Profile Image Container */}
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-2xl">
                    <div className="w-full h-full glass-strong rounded-full p-2">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full overflow-hidden">
                        <Image
                          src="/images/profile/headshot.png"
                          alt="Aaron A. Perez - Full Stack Developer"
                          width={384}
                          height={384}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Tech Icons */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-6 -right-6 glass w-16 h-16 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
                >
                  <Image
                    src='/icons/frontend/react.svg' 
                    alt='React'
                    width={28} 
                    height={28}
                    className="react-blue"
                  />
                </motion.div>

                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -bottom-6 -left-6 glass w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
                >
                  <Image
                    src='/icons/backend/nodejs.svg' 
                    alt='Node.js'
                    width={24} 
                    height={24}
                    className="node-green"
                  />
                </motion.div>

                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/4 -left-8 glass w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
                >
                  <Image
                    src='/icons/frontend/typescript.svg' 
                    alt='TypeScript'
                    width={24} 
                    height={24}
                    className="typescript-blue"
                  />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/3 -right-8 glass w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md"
                >
                  <Image
                    src='/icons/frontend/javascript.svg' 
                    alt='JavaScript'
                    width={20} 
                    height={20}
                  />
                </motion.div>

                {/* Enhanced Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse gpu-accelerated"></div>
              </motion.div>

              {/* Enhanced Achievement Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2"
              >
                <div className="glass px-4 py-2 rounded-full shadow-md border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-green-800 dark:text-green-300">
                      Available for Hire
                    </span>
                  </div>
                </div>
                
                <motion.button
                  onClick={scrollToContact}
                  className="glass px-4 py-2 rounded-full shadow-md border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                    Let&apos;s Connect
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-caption">Scroll to explore</span>
            <div className="p-2 glass rounded-full">
              <ArrowDown className="w-5 h-5" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </div>
  )
}