
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Star,
  ArrowRight,
  Building,
  Award
} from 'lucide-react'
import { cn } from "@/lib/utils"
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// Enhanced timeline data with more detailed information
const timelineData = {
  education: [
    {
      id: 'codestack',
      title: "Full Stack Development",
      institution: "CodeStack Academy",
      period: "2023 - 2024",
      location: "San Joaquin County, CA",
      type: "certification",
      status: "completed",
      details: [
        "Frontend Development: React, TypeScript, Next.js, Tailwind CSS",
        "Backend Development: C#, .NET, SQL Server, RESTful APIs",
        "Tools & Technologies: Git, Azure, VS Code, Postman",
        "Built multiple full-stack applications including expense trackers, game databases, and business websites",
        "Collaborative development using Agile methodologies"
      ],
      skills: ["React", "TypeScript", "C#", ".NET", "SQL Server", "Azure"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 'itt-tech',
      title: "BS Information Systems & Cyber Security",
      institution: "ITT Technical Institute",
      period: "Graduated 2016",
      location: "Rancho Cordova, CA",
      type: "degree",
      status: "completed",
      details: [
        "Network Systems Administration and Security",
        "Information Security and Risk Management", 
        "Database Design and Management",
        "System Analysis and Design",
        "Graduated with GPA: 3.5"
      ],
      skills: ["Network Security", "Database Management", "System Administration"],
      gradient: "from-purple-500 to-pink-500"
    }
  ],
  experience: [
    {
      id: 'user-support',
      title: "User Support Specialist",
      company: "San Joaquin County Office of Education - CodeStack",
      period: "2017 - Present",
      location: "Stockton, CA",
      type: "work",
      status: "current",
      details: [
        "QA testing and validation for educational software systems",
        "Technical support and troubleshooting for SEIS (Special Education Information System) platform",
        "Compliance validation and data quality assurance for state reporting",
        "Help desk support and ticket management using Freshdesk and Zoho",
        "Training and onboarding new users on system functionality",
        "Database maintenance and user account management"
      ],
      skills: ["QA Testing", "Technical Support", "Database Management", "Freshdesk", "Zoho"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 'systems-analyst',
      title: "Information Systems Analyst",
      company: "San Joaquin County - Information Systems Division",
      period: "2017",
      location: "Stockton, CA",
      type: "work",
      status: "completed",
      details: [
        "Help desk support for county employees across multiple departments",
        "Workstation setup, configuration, and maintenance",
        "Technical troubleshooting and issue resolution",
        "User account management and software deployment",
        "Network troubleshooting and system maintenance"
      ],
      skills: ["Help Desk", "System Administration", "Network Support", "User Management"],
      gradient: "from-orange-500 to-red-500"
    }
  ]
}

interface TimelineCardProps {
  title: string
  company?: string
  institution?: string
  period: string
  location: string
  details: string[]
  skills: string[]
  delay?: number
  type: 'work' | 'education' | 'certification' | 'degree'
  status: 'completed' | 'current'
  gradient: string
}

/**
 * Individual Timeline Card Component
 * 
 * @param props - Timeline card properties
 */
const TimelineCard = ({
  title,
  company,
  institution,
  period,
  location,
  details,
  skills,
  delay = 0,
  type,
  status,
  gradient
}: TimelineCardProps) => {
  // Get appropriate icon based on type
  const getIcon = () => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-6 h-6" />
      case 'education':
      case 'degree':
        return <GraduationCap className="w-6 h-6" />
      case 'certification':
        return <Award className="w-6 h-6" />
      default:
        return <Star className="w-6 h-6" />
    }
  }

  // Get status indicator
  const getStatusBadge = () => {
    if (status === 'current') {
      return (
        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-semibold rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Current
        </div>
      )
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full">
        <CheckCircle className="w-3 h-3" />
        Completed
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
      role="article"
      aria-label={`${type}: ${title}`}
    >
      {/* Main card with glassmorphism effect */}
      <div className="relative h-full bg-white/10 dark:bg-gray-900/50 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
        
        {/* Gradient header */}
        <div className={cn("p-6 bg-gradient-to-r", gradient, "relative overflow-hidden")}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-white/20" />
          </div>
          
          {/* Header content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  {getIcon()}
                </div>
                {getStatusBadge()}
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
              {title}
            </h3>
            
            <div className="space-y-1 text-white/90">
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" />
                {company || institution}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                {period}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full" />
        </div>

        {/* Card content */}
        <div className="p-6">
          {/* Details list */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Key Responsibilities & Achievements
            </h4>
            <ul className="space-y-3">
              {details.map((detail, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + (idx * 0.1), duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Skills tags */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.article>
  )
}

/**
 * Section Header Component
 */
const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-16"
  >
    {/* Decorative line with icon */}
    <div className="flex items-center justify-center gap-4 mb-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500" />
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
        <Calendar className="w-6 h-6 text-white" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500" />
    </div>

    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
      Experience & Education
    </h2>
    
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
      My professional journey and academic background, showcasing continuous learning 
      and growth in technology and software development.
    </p>
  </motion.div>
)

/**
 * Statistics Component
 */
const Statistics = () => {
  const stats = [
    { label: 'Years Experience', value: '7+', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Education Programs', value: '2', color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Current Role', value: '2017', color: 'text-green-600 dark:text-green-400' },
    { label: 'Certifications', value: '1+', color: 'text-orange-600 dark:text-orange-400' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + (index * 0.1), duration: 0.4 }}
          className="text-center p-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/50"
        >
          <div className={cn("text-3xl font-bold mb-2", stat.color)}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

/**
 * Main Timeline Section Component
 */
export const TimelineSection = () => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <Section 
      id="experience" 
      ref={ref} 
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <Container className="relative z-10">
        <SectionHeader />
        
        <Statistics />

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Education Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center lg:justify-start gap-3">
                <GraduationCap className="w-6 h-6 text-purple-600" />
                Education
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Academic foundation and continuous learning
              </p>
            </div>
            
            <div className="space-y-6">
              {timelineData.education.map((item, index) => (
                <TimelineCard
                  key={item.id}
                  title={item.title}
                  institution={item.institution}
                  period={item.period}
                  location={item.location}
                  details={item.details}
                  skills={item.skills}
                  type={item.type as never}
                  status={item.status as never}
                  gradient={item.gradient}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </motion.div>

          {/* Experience Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-8 text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center justify-center lg:justify-start gap-3">
                <Briefcase className="w-6 h-6 text-green-600" />
                Work Experience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Professional experience and career growth
              </p>
            </div>
            
            <div className="space-y-6">
              {timelineData.experience.map((item, index) => (
                <TimelineCard
                  key={item.id}
                  title={item.title}
                  company={item.company}
                  period={item.period}
                  location={item.location}
                  details={item.details}
                  skills={item.skills}
                  type={item.type as never}
                  status={item.status as never}
                  gradient={item.gradient}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-20"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Want to see my skills in action?
          </p>
          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Projects
            <ArrowRight className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </Container>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </Section>
  )
}

export default TimelineSection