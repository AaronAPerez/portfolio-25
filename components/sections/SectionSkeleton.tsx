import React from 'react'


// Enhanced loading component
const SectionSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      ))}
    </div>
  </div>
)

export default SectionSkeleton