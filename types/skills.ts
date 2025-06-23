export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud' | 'game'
  icon: string
  description?: string
  color: string
}

export interface SkillCardProps {
  skill: Skill
  isVisible?: boolean
  index?: number
}

export interface SkillCategory {
  id: string
  name: string
  icon: string
  color: string
  description: string
}
