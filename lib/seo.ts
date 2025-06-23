// lib/seo.ts
/**
 * SEO Utilities and Constants
 */

export const SEO_CONSTANTS = {
  SITE_NAME: "Aaron A. Perez - Full Stack Developer",
  SITE_URL: "https://aaronaperez.dev",
  DEFAULT_TITLE: "Aaron A. Perez - Full Stack Developer | React, TypeScript, .NET Expert",
  DEFAULT_DESCRIPTION: "Experienced Full Stack Developer in Stockton, CA. Specializing in React, TypeScript, C#, .NET, and modern web applications. Available for hire. 7+ years experience.",
  DEFAULT_KEYWORDS: "full stack developer, react developer, typescript developer, .net developer, c# developer, javascript developer, stockton ca, california, remote developer, web developer, software engineer, frontend developer, backend developer, aaron perez, available for hire",
  AUTHOR: "Aaron A. Perez",
  LOCALE: "en_US",
  SOCIAL: {
    GITHUB: "https://github.com/AaronAPerez",
    LINKEDIN: "https://linkedin.com/in/aaronaperezdev",
    EMAIL: "aaperez06@gmail.com"
  }
}

/**
 * Generate page-specific SEO data
 */
export const generateSEO = (page: {
  title?: string
  description?: string
  keywords?: string
  path?: string
  image?: string
}) => {
  const url = `${SEO_CONSTANTS.SITE_URL}${page.path || ''}`
  
  return {
    title: page.title ? `${page.title} | ${SEO_CONSTANTS.SITE_NAME}` : SEO_CONSTANTS.DEFAULT_TITLE,
    description: page.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
    keywords: page.keywords || SEO_CONSTANTS.DEFAULT_KEYWORDS,
    url,
    image: page.image || `${SEO_CONSTANTS.SITE_URL}/images/profile/headshot.png`,
    canonical: url
  }
}

/**
 * Keywords for different sections - helps with targeted SEO
 */
export const SECTION_KEYWORDS = {
  HOME: "full stack developer portfolio, react typescript developer, .net c# developer, aaron perez developer",
  ABOUT: "software engineer experience, full stack developer skills, web development expertise",
  PROJECTS: "react projects, typescript applications, .net web apps, full stack portfolio examples",
  SKILLS: "react typescript skills, .net development, javascript expertise, web development technologies",
  EXPERIENCE: "software developer experience, full stack engineer background, web development career",
  CONTACT: "hire full stack developer, react developer for hire, .net developer available"
}

