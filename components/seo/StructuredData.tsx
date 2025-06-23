'use client'

import Script from 'next/script'
import { StructuredDataProps } from '@/types/seo'

export function StructuredData({ type, data }: StructuredDataProps) {
  if (!data || type === 'website') {
    return null // Skip website schema for now
  }

  let schema = null

  try {
    if (type === 'person' && 'jobTitle' in data) {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name,
        jobTitle: data.jobTitle,
        description: data.description,
        url: data.url,
        email: data.email
      }
    } else if (type === 'localBusiness') {
      schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: data.name,
        description: data.description,
        // telephone: data.telephone
      }
    }
  } catch (error) {
    console.warn('Error generating schema:', error)
    return null
  }

  if (!schema) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
      strategy="afterInteractive"
    />
  )
}