export interface Skill {
  id: string;
  name: string;
  icon: string;
  color: string;
  category?: string;
  description?: string;
}

export interface SkillCardProps {
  skill: Skill;
  isVisible?: boolean;
}

export const skills = [

  // Frontend Core
  {
    id: 'html5',
    name: "HTML5",
    icon: "/icons/frontend/html5.svg",
    color: "#E34F26",
    category: "frontend", 
  },
  {
    id: 'javascript',
    name: "JavaScript",
    icon: "/icons/frontend/javascript.svg",
    color: "#F7DF1E",
    category: "frontend",
  },
  {
    id: 'react',
    name: "React",
    icon: "/icons/frontend/react.svg",
    category: "frontend",
    color: "#61DAFB",
    description: "Building modern user interfaces"
  },
  {
    id: 'typescript',
    name: "TypeScript",
    icon: "/icons/frontend/typescript.svg",
    color: "#3178C6",
    category: "frontend",
  },
  { id: 'nextjs',
    name: "Next.js",
    icon: "/icons/frontend/nextjs.svg",
    color: "#808080",
    category: "frontend",
  },

  // Frontend UI
  {
    id: 'bootstrap',
    name: "Bootstrap",
    icon: "/icons/frontend/bootstrap.svg",
    color: "#7952B3",
    category: "frontend",
  },
  {
    id: 'css3',
    name: "CSS3",
    icon: "/icons/frontend/css3-original.svg",
    color: "#3178C6",
    category: "frontend",
  },
  {
    id: 'chakra',
    name: "Chakra UI",
    icon: "/icons/frontend/chakra-ui.svg",
    color: "#7fffd4",
    category: "frontend",
  },
  {
    id: 'reactbootstrap',
    name: "React Bootstrap",
    icon: "/icons/frontend/reactbootstrap.svg",
    color: "#61DAFB",
    category: "frontend",
  },
  {
    id: 'tailwind',
    name: "Tailwind",
    icon: "/icons/frontend/tailwind.svg",
    color: "#06B6D4",
    category: "frontend",
  },
  {
    id: 'vite',
    name: "Vite",
    icon: "/icons/frontend/vite.svg",
    color: "#646CFF",
    category: "frontend",
  },
  {
    id: 'vercel',
    name: "Vercel",
    icon: "/icons/frontend/vercel.svg",
    color: "#646CFF",
    category: "frontend",
  },

  // Backend & Tools
  {
    id: 'nodejs',
    name: "Node.js",
    icon: "/icons/backend/nodejs.svg",
    color: "#339933",
    category: "backend",
  },
  {
    id: 'express',
    name: "C#",
    icon: "/icons/backend/csharp.svg",
    color: "#512BD4",
    category: "backend",
  },
  {
    id: 'dotnet',
    name: ".NET",
    icon: "/icons/backend/dotnet.svg",
    color: "#512BD4",
    category: "backend",
  },
  {
    id: 'sqlserver',
    name: "MySQL",
    icon: "/icons/backend/mysql.svg",
    color: "#0074a3",
    category: "backend",
  },

  // API & Tools
  {
    id: 'axios',
    name: "Axios",
    icon: "/icons/tools/axios.svg",
    color: "#671ddf",
    category: "tools",
  },
  {
    id: 'postman',
    name: "Postman",
    icon: "/icons/tools/postman.svg",
    color: "#FF6C37",
    category: "tools",
  },
  {
    id: 'swagger',
    name: "Swagger",
    icon: "/icons/tools/swagger.svg",
    color: "#85EA2D",
    category: "tools",
  },
  {
    id: 'json',
    name: "JSON",
    icon: "/icons/tools/json.svg",
    color: "#808080",
    category: "tools",
  },
  {
    id: 'git',
    name: "Git",
    icon: "/icons/tools/git.svg",
    color: "#F05032",
    category: "tools",
  },
  {
    id: 'azure',
    name: "Azure",
    icon: "/icons/tools/azure.svg",
    color: "#0078D4",
    category: "tools",
  },

  // Game Development
  {
    id: 'unity',
    name: "Unity",
    icon: "/icons/game/unity.svg",
    color: "#808080",
    category: "game",
  },
];
