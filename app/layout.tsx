/**
 * Root Layout Component (Fixed Version)
 */

// import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import { SkipLinks } from "@/components/accessibility/SkipLinks";
import { WebVitalsTracker } from "@/components/monitoring/WebVitalsTracker";
import { ThemeProvider } from "@/lib/theme-context";
import Navigation from "@/components/layout/Navigation";
import {  personData } from "@/data/seoConfig";
import { StructuredData } from "@/lib/seo/StructuredData";
// import { generateSEOMetadata } from "@/lib/seo/generateSEOMetadata";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Improves loading performance
  preload: true,
  fallback: ['system-ui', 'arial'] // Add fallbacks
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only preload primary font
  fallback: ['monospace']
});

// Enhanced metadata generation
// export const metadata: Metadata = generateSEOMetadata({
//   title: "Full Stack Developer | React TypeScript Expert",
//   description: "Senior Full Stack Developer with 7+ years experience. Specializing in React, TypeScript, Next.js, .NET. Available for hire in Stockton, CA and remote opportunities.",
//   path: "/",
//   type: "website",
//   keywords: [
//     "full stack developer stockton ca",
//     "react developer california",
//     "typescript expert remote",
//     "next.js developer hire",
//     ".net developer california",
//     "web developer stockton",
//     "javascript developer remote"
//   ]
// });

// Viewport configuration
// export const viewport: Viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 5,
//   userScalable: true,
//   themeColor: [
//     { media: '(prefers-color-scheme: light)', color: '#ffffff' },
//     { media: '(prefers-color-scheme: dark)', color: '#000000' }
//   ],
// }

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <head>
        {/* Structured Data */}
        <StructuredData type="person" data={personData} />
        {/* <StructuredData type="localBusiness" data={localBusinessData} /> */}
        <StructuredData type="website" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Skip links for accessibility */}
        <SkipLinks />
        
        {/* Web Vitals tracking */}
        <WebVitalsTracker />
        
        <ThemeProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Navigation />
            
            <main 
              id="main-content"
              className="relative"
              role="main"
              aria-label="Main content"
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}