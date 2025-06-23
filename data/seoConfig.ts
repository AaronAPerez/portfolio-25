/**
 * SEO Configuration Data
 * 
 * Centralized configuration for structured data and SEO metadata
 */

import { PersonSchema } from "@/types/seo"

// import { PersonSchema, LocalBusinessData } from '@/types/seo'

// export const personData: PersonSchema = {
//   name: 'Aaron A. Perez',
//   givenName: 'Aaron',
//   familyName: 'Perez',
//   jobTitle: 'Full Stack Developer',
//   description: 'Senior Full Stack Developer with 7+ years experience specializing in React, TypeScript, Next.js, and .NET development. Expert in accessible, high-performance web applications.',
//   url: 'https://aaronaperez.dev',
//   image: 'https://aaronaperez.dev/images/profile/headshot.png',
//   email: 'aaperez06@gmail.com',
//   telephone: '+1-209-470-2061',
//   address: {
//     city: 'Stockton',
//     state: 'CA',
//     country: 'US'
//   },
//   worksFor: {
//     name: 'San Joaquin County Office of Education',
//     url: 'https://www.sjcoe.org'
//   },
//   education: [
//     {
//       institution: 'CodeStack Academy',
//       url: 'https://codestackacademy.org'
//     },
//     {
//       institution: 'ITT Technical Institute',
//       url: 'https://www.itt-tech.edu'
//     }
//   ],
//   skills: [
//     'React',
//     'TypeScript',
//     'Next.js',
//     'JavaScript',
//     'C#',
//     '.NET',
//     'Node.js',
//     'Full Stack Development',
//     'Web Accessibility',
//     'Performance Optimization',
//     'Responsive Design',
//     'API Development',
//     'Database Design',
//     'Testing',
//     'Version Control'
//   ],
//   socialProfiles: [
//     'https://github.com/AaronAPerez',
//     'https://linkedin.com/in/aaronaperezdev',
//     'https://twitter.com/aaronaperezdev'
//   ],
//   experience: '7+ years of professional software development experience'
// }

// export const localBusinessData: LocalBusinessData = {
//   name: 'Aaron A. Perez - Full Stack Developer',
//   description: 'Professional full stack web development services specializing in React, TypeScript, and modern web technologies. Serving Stockton, CA and remote clients worldwide.',
//   phone: '+1-209-470-2061',
//   address: {
//     city: 'Stockton',
//     state: 'CA',
//     country: 'US'
//   },
//   geo: {
//     latitude: 37.9577,
//     longitude: -121.2908
//   },
//   serviceAreas: [
//     'Stockton, CA',
//     'San Joaquin County',
//     'Sacramento Area',
//     'Bay Area',
//     'Remote Worldwide'
//   ],
//   services: [
//     'Full Stack Web Development',
//     'React Application Development',
//     'TypeScript Development',
//     'Next.js Development',
//     'E-commerce Development',
//     'Web Application Modernization',
//     'Performance Optimization',
//     'Accessibility Implementation',
//     'API Development',
//     'Database Design',
//     'Technical Consulting'
//   ],
//   priceRange: '$$'
// }


export const personData: PersonSchema = {
  name: 'Aaron A. Perez',
  givenName: 'Aaron',
  familyName: 'Perez',
  jobTitle: 'Full Stack Developer',
  description: 'Senior Full Stack Developer with 7+ years experience',
  url: 'https://aaronaperez.dev',
  image: '/images/profile/headshot.png',
  email: 'aaperez06@gmail.com',
  telephone: '+1-209-470-2061',
  address: {
    city: 'Stockton',
    state: 'CA',
    country: 'US'
  },
  skills: ['React', 'TypeScript', 'Next.js', 'JavaScript'],
  socialProfiles: [
    'https://github.com/AaronAPerez',
    'https://linkedin.com/in/aaronaperezdev'
  ],
  experience: '7+ years'
}



// Additional SEO configurations
export const siteMetadata = {
  title: 'Aaron A. Perez - Full Stack Developer | React TypeScript Expert',
  description: 'Senior Full Stack Developer with 7+ years experience in React, TypeScript, Next.js, and .NET. Specializing in accessible, high-performance web applications. Available for hire in Stockton, CA and remote opportunities.',
  keywords: [
    'full stack developer',
    'react developer',
    'typescript developer',
    'next.js developer',
    'web developer stockton ca',
    'javascript expert',
    '.net developer',
    'accessible web development',
    'performance optimization',
    'remote developer',
    'freelance developer',
    'consultant'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aaronaperez.dev',
    siteName: 'Aaron A. Perez - Full Stack Developer',
    title: 'Aaron A. Perez - Full Stack Developer | React TypeScript Expert',
    description: 'Senior Full Stack Developer specializing in React, TypeScript, Next.js, and .NET. 7+ years experience building accessible, high-performance web applications.',
    images: [
      {
        url: 'https://aaronaperez.dev/images/og/portfolio-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Aaron A. Perez - Full Stack Developer Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aaron A. Perez - Full Stack Developer',
    description: 'Senior Full Stack Developer specializing in React, TypeScript, Next.js, and .NET',
    creator: '@aaronaperezdev',
    images: ['https://aaronaperez.dev/images/og/portfolio-og.jpg']
  }
}