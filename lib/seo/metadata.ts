/**
 * SEO Metadata Generation Utilities
 * 
 * Provides type-safe metadata generation for enhanced SEO performance.
 * Follows Google's E-A-T guidelines and supports OpenGraph, Twitter Cards,
 * and JSON-LD structured data.
 * 
 * @author Aaron A. Perez
 * @created 2025-06-22
 */

import { Metadata } from 'next'
import { SiteConfig, PageMetadata, LocalBusinessData } from '@/types/seo'

/**
 * Site-wide configuration for consistent SEO
 */
export const siteConfig: SiteConfig = {
  name: 'Aaron A. Perez',
  title: 'Aaron A. Perez - Full Stack Developer | React TypeScript Expert',
  description: 'Senior Full Stack Developer with 7+ years experience in React, TypeScript, Next.js, and .NET. Specializing in accessible, high-performance web applications. Available for hire in Stockton, CA and remote opportunities.',
  url: 'https://aaronaperez.dev',
  ogImage: 'https://aaronaperez.dev/images/og/portfolio-og.jpg',
  author: {
    name: 'Aaron A. Perez',
    email: 'aaperez06@gmail.com',
    twitter: '@aaronaperezdev',
    linkedin: 'https://linkedin.com/in/aaronaperezdev',
    github: 'https://github.com/AaronAPerez'
  },
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
    'remote developer'
  ]
}

/**
 * Generates comprehensive metadata for pages
 * 
 * @param pageData - Page-specific metadata
 * @returns Next.js Metadata object
 */
export function generateMetadata(pageData: PageMetadata): Metadata {
  const title = pageData.title 
    ? `${pageData.title} | ${siteConfig.name}`
    : siteConfig.title

  const description = pageData.description || siteConfig.description
  const url = `${siteConfig.url}${pageData.path || ''}`
  const images = pageData.image ? [pageData.image] : [siteConfig.ogImage]

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...(pageData.keywords || [])],
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: pageData.type || 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: images.map(image => ({
        url: image,
        width: 1200,
        height: 630,
        alt: `${title} - ${siteConfig.name}`,
        type: 'image/jpeg',
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.author.twitter,
      images,
    },
    robots: {
      index: pageData.noIndex !== true,
      follow: pageData.noFollow !== true,
      googleBot: {
        index: pageData.noIndex !== true,
        follow: pageData.noFollow !== true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
  }
}

/**
 * Generates local business structured data
 * 
 * @param businessData - Local business information
 * @returns JSON-LD structured data
 */
export function generateLocalBusinessSchema(businessData: LocalBusinessData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}#business`,
    name: businessData.name,
    description: businessData.description,
    url: siteConfig.url,
    telephone: businessData.phone,
    email: siteConfig.author.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: businessData.address.city,
      addressRegion: businessData.address.state,
      addressCountry: businessData.address.country,
    },
    // geo: businessData.geo ? {
    //   '@type': 'GeoCoordinates',
    //   latitude: businessData.geo.latitude,
    //   longitude: businessData.geo.longitude,
    // } : undefined,
    areaServed: businessData.serviceAreas,
    serviceType: businessData.services,
    priceRange: businessData.priceRange,
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
    ],
  }
}