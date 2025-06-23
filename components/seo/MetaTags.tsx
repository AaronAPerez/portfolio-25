// components/seo/MetaTags.tsx
'use client'

import Head from 'next/head'

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

/**
 * Enhanced Meta Tags Component
 * Optimized for recruiter searches and social sharing
 */
export const MetaTags = ({
  title = "Aaron A. Perez - Full Stack Developer | React, TypeScript, .NET Expert",
  description = "Experienced Full Stack Developer in Stockton, CA. Specializing in React, TypeScript, C#, .NET, and modern web applications. Available for hire. 7+ years experience.",
  keywords = "full stack developer, react developer, typescript developer, .net developer, c# developer, javascript developer, stockton ca, california, remote developer, web developer, software engineer, frontend developer, backend developer, aaron perez, available for hire",
  image = "https://aaronaperez.dev/images/profile/headshot.png",
  url = "https://aaronaperez.dev",
  type = "website"
}: MetaTagsProps) => {
  return (
    <Head>
      {/* Enhanced Title Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      
      {/* Meta Description */}
      <meta name="description" content={description} />
      
      {/* Keywords for SEO */}
      <meta name="keywords" content={keywords} />
      
      {/* Author and Copyright */}
      <meta name="author" content="Aaron A. Perez" />
      <meta name="copyright" content="Aaron A. Perez" />
      
      {/* Robots and Indexing */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Geographic and Location Tags */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="Stockton, California" />
      <meta name="geo.position" content="37.9577;-121.2908" />
      <meta name="ICBM" content="37.9577, -121.2908" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Aaron A. Perez Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@aaronaperez" />
      
      {/* LinkedIn specific */}
      <meta property="article:author" content="https://linkedin.com/in/aaronaperezdev" />
      
      {/* Professional Schema hints */}
      <meta name="profession" content="Full Stack Developer" />
      <meta name="skills" content="React, TypeScript, JavaScript, C#, .NET, Node.js, SQL Server, Azure" />
      <meta name="experience-level" content="Senior" />
      <meta name="availability" content="Available for hire" />
      <meta name="location" content="Stockton, CA, Remote" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Additional Links */}
      <link rel="author" href="https://aaronaperez.dev" />
      <link rel="me" href="https://github.com/AaronAPerez" />
      <link rel="me" href="https://linkedin.com/in/aaronaperezdev" />
    </Head>
  )
}

