/**
 * Structured Data Component
 * 
 * Implements JSON-LD structured data for enhanced SEO and rich snippets.
 * Supports Person, Organization, LocalBusiness, and WebSite schemas.
 * 
 * @example
 * ```tsx
 * <StructuredData type="person" data={personData} />
 * ```
 */


import Script from 'next/dist/client/script'

type StructuredDataProps = {
  type: 'person' | 'organization' | 'localBusiness' | 'website'
  data?: PersonSchema | OrganizationSchema | LocalBusinessSchema | never
}

// Define PersonSchema, OrganizationSchema, LocalBusinessSchema types below or import them if defined elsewhere.
type PersonSchema = {
  name: string
  givenName?: string
  familyName?: string
  jobTitle?: string
  description?: string
  url?: string
  image?: string
  email?: string
  telephone?: string
  address: {
    city?: string
    state?: string
    country?: string
  }
  worksFor?: {
    name: string
    url?: string
  }
  education?: Array<{
    institution: string
    url?: string
  }>
  skills?: string[]
  socialProfiles?: string[]
  experience?: string
}

type OrganizationSchema = {
  name: string
  url?: string
  logo?: string
  sameAs?: string[]
}

type LocalBusinessSchema = {
  name: string
  address: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  telephone?: string
  url?: string
  image?: string
  priceRange?: string
  openingHours?: string[]
  geo?: {
    latitude?: number
    longitude?: number
  }
}


/**
 * Renders JSON-LD structured data in the document head
 */
export function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    switch (type) {
      case 'person':
        return generatePersonSchema(data as PersonSchema)
      case 'organization':
        return generateOrganizationSchema(data as OrganizationSchema)
      // case 'localBusiness':
      //   return generateLocalBusinessSchema(data)
      case 'website':
        return generateWebsiteSchema()
      default:
        return null
    }
  }

  const schema = generateSchema()
  
  if (!schema) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 0)
      }}
      strategy="beforeInteractive"
    />
  )
}

/**
 * Generates Person schema for individual developer profile
 */
function generatePersonSchema(data: PersonSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#person`,
    name: data.name,
    givenName: data.givenName,
    familyName: data.familyName,
    jobTitle: data.jobTitle,
    description: data.description,
    url: data.url,
    image: data.image,
    email: data.email,
    telephone: data.telephone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: data.address.city,
      addressRegion: data.address.state,
      addressCountry: data.address.country,
    },
    worksFor: data.worksFor ? {
      '@type': 'Organization',
      name: data.worksFor.name,
      url: data.worksFor.url,
    } : undefined,
    alumniOf: data.education?.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
      url: edu.url,
    })),
    knowsAbout: data.skills,
    sameAs: data.socialProfiles,
    hasOccupation: {
      '@type': 'Occupation',
      name: data.jobTitle,
      occupationLocation: {
        '@type': 'City',
        name: data.address.city,
      },
      skills: data.skills,
      experienceRequirements: data.experience,
    },
  }
}

/**
 * Generates Organization schema for company or group profile
 */
function generateOrganizationSchema(data: OrganizationSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#organization`,
    name: data.name,
    url: data.url,
    logo: data.logo,
    sameAs: data.sameAs,
  }
}

/**
 * Generates Website schema for site-wide SEO
 */
function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#website`,
    name: 'Aaron A. Perez - Full Stack Developer Portfolio',
    description: 'Professional portfolio showcasing full-stack development expertise in React, TypeScript, and modern web technologies.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    author: {
      '@type': 'Person',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#person`,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#person`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'Person',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#person`,
    },
  }
}

export default StructuredData