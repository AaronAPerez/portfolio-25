'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/theme-context'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { skills } from '@/data/skills'
import { Skill } from '@/types/skills'



// Category configuration
const categories = [
  {
    id: 'all',
    name: 'All Skills',
    color: '#3B82F6',
    description: 'Complete technology stack and development tools',
    icon: '🚀'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#EC4899',
    description: 'User interfaces and web technologies',
    icon: '🎨'
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#10B981',
    description: 'Server-side development and APIs',
    icon: '⚙️'
  },
  {
    id: 'database',
    name: 'Database',
    color: '#8B5CF6',
    description: 'Data storage and management systems',
    icon: '🗄️'
  },
  {
    id: 'tools',
    name: 'Tools',
    color: '#F59E0B',
    description: 'Development tools and workflows',
    icon: '🛠️'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    color: '#06B6D4',
    description: 'Cloud services and deployment',
    icon: '☁️'
  },
  {
    id: 'game',
    name: 'Game Dev',
    color: '#EF4444',
    description: 'Game development and engines',
    icon: '🎮'
  }
] as const

type CategoryId = typeof categories[number]['id']

interface SkillCardProps {
  skill: Skill
  isVisible: boolean
  index: number
}

// Individual skill card component with fixed icon display
const SkillCard = ({ skill, isVisible, index }: SkillCardProps) => {
  const { resolvedTheme } = useTheme()
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Enhanced Skills Display

  return (
    <div className={`p-4 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isVisible ? {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { delay: index * 0.05, duration: 0.5 }
        } : {}}
        className="group cursor-pointer"
        onHoverStart={() => setIsFlipped(true)}
        onHoverEnd={() => setIsFlipped(false)}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative w-full aspect-square"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of card */}
          <div className={cn(
            "absolute inset-0 w-full h-full backface-hidden",
            "bg-card border border-border rounded-xl",
            "flex flex-col items-center justify-center p-4 gap-3",
            "transition-all duration-300 group-hover:shadow-lg",
            "backdrop-blur-sm bg-card/80"
          )}
            style={{
              backfaceVisibility: 'hidden',
              borderColor: skill.color,
              boxShadow: `0 4px 20px ${skill.color}20`
            }}>

            {/* Skill icon */}
            <div className="relative w-12 h-12 flex-shrink-0 z-10">
              {!imageError ? (
                <Image
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  fill
                  className={cn(
                    "object-contain transition-all duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0",
                    "group-hover:scale-110"
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  sizes="64px"
                  priority={index < 6} // Prioritize first 6 images
                />
              ) : (
                // Fallback icon with proper styling
                <div
                  className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-md"
                  style={{ backgroundColor: skill.color }}
                >
                  {skill.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Skill name  */}
            <h3 className="text-md font-semibold text-center text-gray-900 dark:text-white leading-tight px-1">
              {skill.name}
            </h3>

            {/* Category indicator */}
            <div className="flex items-center gap-2 mt-auto">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: skill.color }}
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 capitalize font-medium">
                {skill.category}
              </span>
            </div>
          </div>

          {/* Back of card */}
          <div className={cn(
            "absolute inset-0 w-full h-full",
            "bg-gray-50 dark:bg-gray-700 border-2 rounded-xl shadow-lg",
            "flex flex-col items-center justify-center p-4 pb-2 text-center"
          )}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              borderColor: skill.color,
              backgroundColor: `${skill.color}08`
            }}>
            <div className="space-y-3">
              {/* Category icon */}
              <div
                className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                style={{ backgroundColor: skill.color }}
              >
                {categories.find(cat => cat.id === skill.category)?.icon}
              </div>

              {/* Skill name */}
              <h3 className="font-bold text-sm" style={{ color: skill.color }}>
                {skill.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4 pb-2">
                {skill.description || `Professional experience with ${skill.name} for modern development.`}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Skills grid component
const SkillsGrid = ({ category, isVisible }: { category: CategoryId; isVisible: boolean }) => {
  const { resolvedTheme } = useTheme()
  const filteredSkills = skills.filter(skill =>
    category === 'all' || skill.category === category
  )

  return (
    <div className={`p-4 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`${category}-${skill.id}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                duration: 0.5,
                delay: index * 0.03
              }}
            >
              <SkillCard
                skill={skill}
                isVisible={isVisible}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Category filter button component
const CategoryButton = ({
  category,
  isSelected,
  onClick
}: {
  category: typeof categories[number]
  isSelected: boolean
  onClick: () => void
}) => (
  <motion.button
    onClick={onClick}
    className={cn(
      "relative px-6 py-3 rounded-full font-medium transition-all duration-300",
      "border-2 overflow-hidden group backdrop-blur-sm min-h-[44px] min-w-[44px] touch-manipulation select-none",
      isSelected
        ? "text-white shadow-xl scale-105"
        : "bg-white/10 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
    )}
    style={isSelected ? {
      backgroundColor: category.color,
      borderColor: category.color,
      boxShadow: `0 8px 25px ${category.color}40`
    } : {}}
    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {/* Background glow effect */}
    {isSelected && (
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: `${category.color}30` }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )}

    {/* Content */}
    <div className="relative flex items-center gap-2 z-10">
      <span className="text-lg">{category.icon}</span>
      <span className="font-semibold">{category.name}</span>
      {isSelected && (
        <motion.div
          className="w-2 h-2 bg-white rounded-full"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </div>
  </motion.button>
)

// Main SkillsSection component
export default function SkillsSection() {
  const { resolvedTheme } = useTheme()

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all')
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 })

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)
  const skillCount = skills.filter(skill =>
    selectedCategory === 'all' || skill.category === selectedCategory
  ).length

  return (
    <div className={`p-4 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <Section id="skills" ref={ref} className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="absolute inset-0 bg-grid-small opacity-30" />

        <Container className="relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              A comprehensive showcase of the technologies and tools I use to build
              modern, scalable applications and deliver exceptional user experiences.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{skills.length}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </motion.div>

          {/* Category description */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-2 text-lg">
              {selectedCategoryData?.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Showing {skillCount} {skillCount === 1 ? 'skill' : 'skills'}
            </p>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isIntersecting ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SkillsGrid category={selectedCategory} isVisible={isIntersecting} />
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-20"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
              Want to see these skills in action?
            </p>
            <motion.button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group min-h-[44px] min-w-[44px] touch-manipulation select-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Projects
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}

