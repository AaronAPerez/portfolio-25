'use client'

import { useState, useEffect, JSX } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Code2, FileText, Mail, Menu, X, FolderOpen } from 'lucide-react'
import { cn } from "@/lib/utils"
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import Image from 'next/image'

const navItems = [
  {
    name: "Home",
    link: "#home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <User className="h-4 w-4" />,
  },
  {
    name: "Skills",
    link: "#skills",
    icon: <Code2 className="h-4 w-4" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <FolderOpen className="h-4 w-4" />,
  },
  {
    name: "Experience",
    link: "#experience",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "Contact",
    link: "#contact",
    icon: <Mail className="h-4 w-4" />,
  },
]

interface NavItemProps {
  item: {
    name: string
    link: string
    icon: JSX.Element
  }
  isActive: boolean
  onClick: () => void
}

const NavItem = ({ item, isActive, onClick }: NavItemProps) => (
  <motion.a
    href={item.link}
    className={cn(
      "flex items-center px-4 py-2 space-x-2",
      "rounded-full transition-colors touch-target",
      "hover:bg-blue-500/10 text-white/90 hover:text-white",
      isActive && "text-blue-400 bg-blue-500/20"
    )}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {item.icon}
    <span className="hidden md:block">{item.name}</span>
  </motion.a>
)

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [mounted])

  return (
    <header className={cn(
      "fixed top-0 w-full z-50",
      "bg-black/20 backdrop-blur-md border-b border-white/10"
    )}>
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.a
            href="#home"
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/images/AP-Designs-Logo.png"
              alt="AP Designs Logo"
              width={100}
              height={100}
              className="h-12 w-auto"
              priority
            />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                isActive={activeSection === item.link.slice(1)}
                onClick={() => setActiveSection(item.link.slice(1))}
              />
            ))}
          </div>

          {/* Desktop Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Only render when mounted */}
            {mounted && (
              <ThemeToggle variant="button" className="hidden sm:block" />
            )}
            
            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden p-2 rounded-full transition-all duration-300 touch-target",
                "bg-white/10 backdrop-blur-sm border border-white/20",
                "hover:bg-white/20 text-white"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  "absolute top-full right-0 mt-2 w-64 py-2",
                  "bg-black/90 backdrop-blur-sm rounded-xl border border-white/20",
                  "shadow-2xl"
                )}
              >
                {/* Mobile Theme Toggle */}
                {mounted && (
                  <div className="px-4 py-2 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white/90">
                        Theme
                      </span>
                      <ThemeToggle variant="dropdown" showLabel />
                    </div>
                  </div>
                )}
                
                {/* Mobile Navigation Items */}
                <div className="py-2">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.name}
                      item={item}
                      isActive={activeSection === item.link.slice(1)}
                      onClick={() => {
                        setActiveSection(item.link.slice(1))
                        setIsMenuOpen(false)
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  )
}

export default Navigation
