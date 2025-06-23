import { Skill } from "@/types/skills"


export const skills: Skill[] = [
  // Frontend Core Technologies
  {
    id: 'html5',
    name: 'HTML5',
    icon: '/icons/frontend/html5.svg',
    color: '#E34F26',
    category: 'frontend',
    description: 'Semantic markup and modern HTML5 features for web development'
  },
  {
    id: 'css3',
    name: 'CSS3',
    icon: '/icons/frontend/css3-original.svg',
    color: '#1572B6',
    category: 'frontend',
    description: 'Advanced CSS styling, animations, and responsive design techniques'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '/icons/frontend/javascript.svg',
    color: '#F7DF1E',
    category: 'frontend',
    description: 'Modern ES6+ JavaScript for dynamic web applications'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '/icons/frontend/typescript.svg',
    color: '#3178C6',
    category: 'frontend',
    description: 'Type-safe JavaScript development with advanced TypeScript features'
  },

  // Frontend Frameworks & Libraries
  {
    id: 'react',
    name: 'React',
    icon: '/icons/frontend/react.svg',
    color: '#61DAFB',
    category: 'frontend',
    description: 'Modern React development with hooks, context, and component patterns'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: '/icons/frontend/nextjs.svg',
    color: '#000000',
    category: 'frontend',
    description: 'Full-stack React framework with SSR, SSG, and API routes'
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: '/icons/frontend/vite.svg',
    color: '#646CFF',
    category: 'frontend',
    description: 'Lightning-fast build tool and development server'
  },

  // CSS Frameworks & UI Libraries
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: '/icons/frontend/tailwind.svg',
    color: '#06B6D4',
    category: 'frontend',
    description: 'Utility-first CSS framework for rapid UI development'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    icon: '/icons/frontend/bootstrap.svg',
    color: '#7952B3',
    category: 'frontend',
    description: 'Popular CSS framework for responsive web design'
  },
  {
    id: 'react-bootstrap',
    name: 'React Bootstrap',
    icon: '/icons/frontend/reactbootstrap.svg',
    color: '#61DAFB',
    category: 'frontend',
    description: 'Bootstrap components built for React applications'
  },
  {
    id: 'chakra-ui',
    name: 'Chakra UI',
    icon: '/icons/frontend/chakra-ui.svg',
    color: '#319795',
    category: 'frontend',
    description: 'Simple, modular and accessible component library for React'
  },

  // Backend Technologies
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '/icons/backend/nodejs.svg',
    color: '#339933',
    category: 'backend',
    description: 'Server-side JavaScript runtime for scalable network applications'
  },
  {
    id: 'csharp',
    name: 'C#',
    icon: '/icons/backend/csharp.svg',
    color: '#512BD4',
    category: 'backend',
    description: 'Object-oriented programming language for .NET development'
  },
  {
    id: 'dotnet',
    name: '.NET',
    icon: '/icons/backend/dotnet.svg',
    color: '#512BD4',
    category: 'backend',
    description: 'Cross-platform framework for building modern applications'
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    icon: '/icons/frontend/nestjs.svg',
    color: '#E0234E',
    category: 'backend',
    description: 'Progressive Node.js framework for building scalable server-side applications'
  },

  // Database Technologies
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '/icons/backend/mysql.svg',
    color: '#4479A1',
    category: 'database',
    description: 'Popular open-source relational database management system'
  },
  {
    id: 'azure-sql',
    name: 'Azure SQL',
    icon: '/icons/tools/azuresqldatabase-original.svg',
    color: '#0078D4',
    category: 'database',
    description: 'Cloud-based relational database service from Microsoft Azure'
  },

  // Development Tools
  {
    id: 'git',
    name: 'Git',
    icon: '/icons/tools/git.svg',
    color: '#F05032',
    category: 'tools',
    description: 'Distributed version control system for tracking code changes'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: '/icons/tools/vscode.svg',
    color: '#007ACC',
    category: 'tools',
    description: 'Powerful code editor with extensive plugin ecosystem'
  },
  {
    id: 'postman',
    name: 'Postman',
    icon: '/icons/tools/postman.svg',
    color: '#FF6C37',
    category: 'tools',
    description: 'API development and testing platform'
  },
  {
    id: 'swagger',
    name: 'Swagger',
    icon: '/icons/tools/swagger.svg',
    color: '#85EA2D',
    category: 'tools',
    description: 'API documentation and design tools'
  },

  // API & Data Tools
  {
    id: 'axios',
    name: 'Axios',
    icon: '/icons/tools/axios.svg',
    color: '#5A29E4',
    category: 'tools',
    description: 'Promise-based HTTP client for browser and Node.js'
  },
  {
    id: 'json',
    name: 'JSON',
    icon: '/icons/tools/json.svg',
    color: '#000000',
    category: 'tools',
    description: 'Lightweight data interchange format for APIs'
  },

  // Cloud & Deployment
  {
    id: 'azure',
    name: 'Microsoft Azure',
    icon: '/icons/tools/azure.svg',
    color: '#0078D4',
    category: 'cloud',
    description: 'Comprehensive cloud computing platform and services'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: '/icons/frontend/vercel.svg',
    color: '#000000',
    category: 'cloud',
    description: 'Frontend cloud platform for static sites and serverless functions'
  },

  // Game Development
  {
    id: 'unity',
    name: 'Unity',
    icon: '/icons/game/unity.svg',
    color: '#000000',
    category: 'game',
    description: 'Cross-platform game engine for 2D and 3D game development'
  }
]

// Helper functions for working with skills data
export const getSkillsByCategory = (category: string) => {
  if (category === 'all') return skills
  return skills.filter(skill => skill.category === category)
}

export const getSkillById = (id: string) => {
  return skills.find(skill => skill.id === id)
}

export const getSkillCategories = () => {
  const categories = [...new Set(skills.map(skill => skill.category))]
  return ['all', ...categories]
}

export const getSkillsByColor = () => {
  return skills.reduce((acc, skill) => {
    const color = skill.color ?? 'unknown'
    acc[color] = acc[color] || []
    acc[color].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)
}