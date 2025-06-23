/**
 * SEO Type Definitions
 * 
 * TypeScript interfaces for SEO-related data structures
 */

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: {
    name: string;
    email: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
  keywords: string[];
}

export interface PageMetadata {
  title?: string;
  description?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
}

export interface PersonSchema {
  name: string;
  givenName: string;
  familyName: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  email: string;
  telephone: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
//   worksFor?: {
//     name: string;
//     url: string;
//   };
//   education?: {
//     institution: string;
//     url: string;
//   }[];
  skills: string[];
  socialProfiles: string[];
  experience: string;
}

export interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    telephone: string;
    email: string;
    contactType: string;
  };
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export interface LocalBusinessData {
  geo: never;
  name: string;
  description: string;
  phone: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
//   geo?: {
//     latitude: number;
//     longitude: number;
//   };
  serviceAreas: string[];
  services: string[];
  priceRange: string;
}

export interface StructuredDataProps {
  type: 'person' | 'organization' | 'localBusiness' | 'website';
  data: PersonSchema | OrganizationSchema | LocalBusinessData | Record<string, never>;
}